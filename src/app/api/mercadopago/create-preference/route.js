import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

/**
 * Convierte un string de hora en formato "hh:mm am/pm" a "HH:mm:ss.SSS".
 * Si el string ya está en el formato correcto, se retorna tal cual.
 */
function convertTimeString(timeStr) {
  const regex = /^\d{2}:\d{2}:\d{2}\.\d{3}$/;
  if (regex.test(timeStr)) {
    return timeStr;
  }
  // Se asume que el formato es "hh:mm am" o "hh:mm pm"
  const parts = timeStr.split(" ");
  if (parts.length < 2) {
    return timeStr;
  }
  const [time, modifier] = parts;
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier.toLowerCase() === "pm" && hours < 12) {
    hours += 12;
  }
  if (modifier.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:00.000`;
}

/**
 * (Ejemplo opcional) Obtener un producto en Strapi, si es que
 * en tu modelo buscas la relación por documentId. Si no lo usas, puedes omitirlo.
 */
async function getProductConnection(documentId) {
  const res = await fetch(
    `${STRAPI_URL}/api/productos?filters[documentId][$eq]=${documentId}`,
    {
      headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
    }
  );
  const data = await res.json();
  if (data.data && data.data.length > 0) {
    // Retorna lo que Strapi necesita para vincular el producto a "pedido"
    return { documentId };
  }
  console.warn(`Producto con documentId ${documentId} no encontrado en Strapi.`);
  return null;
}

export async function POST(req) {
  try {
    const { orderData, customer } = await req.json();

    // Validar datos mínimos
    if (!orderData || orderData.length === 0) {
      return NextResponse.json(
        { error: "No hay productos en la orden" },
        { status: 400 }
      );
    }
    if (!customer || !customer.email) {
      return NextResponse.json(
        { error: "Datos del cliente incompletos" },
        { status: 400 }
      );
    }

    // Opcional: Si tu modelo de "Pedido" guarda relación con los productos, preparamos el connect:
    const productConnections = [];
    for (const p of orderData) {
      const connection = await getProductConnection(p.documentId);
      if (connection) {
        productConnections.push(connection);
      }
    }

    // 1. Crear el pedido interno en Strapi (inicialmente sin numberOrder)
    const internalOrderPayload = {
      creationDate: new Date().toISOString(),
      customerName: customer.firstName.toUpperCase(),
      customerMiddleName: customer.secondName?.toUpperCase() || "",
      customerLastname: customer.lastname.toUpperCase(),
      customerSecondLastname: customer.secondSurname?.toUpperCase() || "",
      customerDocumentType: customer.documentType,
      customerDocument: customer.document,
      customerPhone: customer.mobiletwo,
      customerEmail: customer.email,
      customerDeparment: customer.departament || "",
      customerAddress: customer.address || "",
      // Guardamos el detalle de los items en formato JSON (para referencia interna)
      items: JSON.stringify(orderData),
      totalPriceOrder: orderData.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
      ),
      // Se asigna null; se actualizará luego
      numberOrder: null,
      state: "Borrador",
      payment_status: "Pendiente",
      payment_method: "MercadoPago",
      payment_id: null,
      // Vinculación de productos (opcional, depende de tu modelo)
      productos: { connect: productConnections },
    };

    const internalOrderRes = await fetch(`${STRAPI_URL}/api/pedidos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({ data: internalOrderPayload }),
    });

    if (!internalOrderRes.ok) {
      throw new Error("Error al crear el pedido interno");
    }

    const internalOrderData = await internalOrderRes.json();
    console.log("Pedido interno creado:", internalOrderData);

    // Supongamos que tu "Pedido" usa 'documentId' como "id" textual
    // (si no, podrías usar internalOrderData.data.id en vez de documentId)
    const orderDocumentId = internalOrderData.data.documentId;

    // Generamos el externalRef y lo usaremos TANTO en el pedido como en cada reserva
    const externalRef = `pedido-${orderDocumentId}`;

    // 2. Actualizar el pedido para asignar numberOrder = "pedido-<documentId>"
    const updatePayload = { data: { numberOrder: externalRef } };
    console.log(
      "Actualizando número de orden interno con payload:",
      JSON.stringify(updatePayload, null, 2)
    );
    const updateOrderRes = await fetch(
      `${STRAPI_URL}/api/pedidos/${orderDocumentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify(updatePayload),
      }
    );
    if (!updateOrderRes.ok) {
      throw new Error("Error al actualizar el número de orden interno");
    }

    // 3. Construir el objeto de preferencia para Mercado Pago
    //    (puede contener tanto productos como reservas)
    const items = orderData.map((product) => ({
      // Podrías hacer "pedido-<id>" o "reserva-<id>", pero aquí sigues usando documentId
      id: product.documentId ? String(product.documentId) : "sin-id",
      title: product.title || product.name || "Producto sin nombre",
      description: product.additionalService
        ? `Incluye: ${product.additionalService.name}`
        : "",
      picture_url: product.image?.url || "https://via.placeholder.com/150",
      category_id: "services",
      quantity: product.quantity || 1,
      currency_id: "COP",
      unit_price: parseFloat(product.price) || 0,
    }));

    const additionalInfo = orderData
      .map((item) => `${item.quantity}x ${item.title || item.name}`)
      .join(" | ");

    const preference = {
      items,
      payer: {
        name: customer.firstName.toUpperCase() || "",
        surname: customer.lastname.toUpperCase() || "",
        email: customer.email,
        phone: {
          area_code: "",
          number: customer.mobiletwo || "",
        },
        identification: {
          type: customer.documentType || "",
          number: customer.document || "",
        },
        address: {
          zip_code: "",
          street_name: customer.address || "Sin dirección",
          street_number: null,
        },
      },
      back_urls: {
        success: `${process.env.CURRENT_ENVIRONMENT}/checkout/success`,
        failure: `${process.env.CURRENT_ENVIRONMENT}/checkout/failure`,
        pending: `${process.env.CURRENT_ENVIRONMENT}/checkout/pending`,
      },
      auto_return: "approved",
      external_reference: externalRef, // <--- USAMOS "pedido-<docId>" como externalRef
      additional_info: additionalInfo,
      notification_url: `${process.env.CURRENT_ENVIRONMENT}/api/mercadopago/webhook`,
    };

    // 4. Crear la preferencia en Mercado Pago
    const mercadoPagoRes = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preference),
      }
    );

    const mpData = await mercadoPagoRes.json();
    if (!mercadoPagoRes.ok) {
      throw new Error(
        `Error al crear preferencia: ${mpData.message || "Desconocido"}`
      );
    }

    // 5. Actualizar nuevamente el pedido con el payment_id (opcional)
    const updatedOrderPayload = {
      payment_id: mpData.id,
      payment_method: "MercadoPago",
      state: "Pendiente",
      payment_status: "Pendiente",
    };
    console.log(
      "Actualizando pedido interno con payload:",
      JSON.stringify({ data: updatedOrderPayload }, null, 2)
    );
    await fetch(`${STRAPI_URL}/api/pedidos/${orderDocumentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({ data: updatedOrderPayload }),
    });

    // 6. Crear reserva(s) en Strapi (si el carrito incluye items de reserva).
    //    Aquí es donde asignamos el MISMO "pedido-<documentId>" en `reservationNumber`.
    for (const product of orderData) {
      if (product.isReservation && product.reservationData) {
        const rawTime = product.reservationData.hour || "10:30 am";
        const reservationTime = convertTimeString(rawTime);

        const reservationPayload = {
          data: {
            plan: product.documentId, // Depende de tu modelo. A veces es la ID del plan, etc.
            guests: product.reservationData.persons || product.quantity || 1,
            reservationDate:
              product.reservationData.date ||
              new Date().toISOString().split("T")[0],
            reservationTime, // "HH:mm:ss.SSS"
            state: "Pendiente",      // se actualizará en el webhook
            payment_status: "Pendiente",
            creationDate: new Date().toISOString(),
            customerName: customer.firstName.toUpperCase(),
            customerMiddleName: customer.secondName?.toUpperCase() || "",
            customerLastname: customer.lastname.toUpperCase(),
            customerSecondLastname: customer.secondSurname?.toUpperCase() || "",
            customerDocumentType: customer.documentType,
            customerDocument: customer.document,
            customerEmail: customer.email,
            customerPhone: customer.mobiletwo,
            totalPriceReservation: product.price * product.quantity,

            // **Clave**: le ponemos el MISMO `reservationNumber` que `externalRef`
            reservationNumber: externalRef,
          },
        };

        console.log(
          "📦 Creando reserva con payload:",
          JSON.stringify(reservationPayload, null, 2)
        );
        const reservaRes = await fetch(`${STRAPI_URL}/api/reservas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify(reservationPayload),
        });

        if (!reservaRes.ok) {
          const errorText = await reservaRes.text();
          console.error("❌ Error al crear reserva:", errorText);
        } else {
          const reservaJson = await reservaRes.json();
          console.log(
            "✅ Reserva creada correctamente. DocumentId:",
            reservaJson.data.documentId,
            "ReservationNumber:",
            reservaJson.data.reservationNumber
          );
        }
      }
    }

    // 7. Enviar correo de confirmación de compra (si lo deseas)
    console.log("📧 Enviando correo de confirmación de compra...");
    await fetch(`${process.env.CURRENT_ENVIRONMENT}/api/sendEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "compraConfirmada",
        name: customer.firstName,
        email: customer.email,
        phone: customer.mobiletwo,
        orderId: externalRef,
        total: mpData.transaction_amount || 0,
        date: new Date().toISOString(),
        orderItems: orderData.map((item) => ({
          productName: item.title || item.name,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
      }),
    });

    return NextResponse.json({ id: mpData.id }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en la creación de la preferencia:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
