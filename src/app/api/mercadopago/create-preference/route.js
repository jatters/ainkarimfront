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
 * (Opcional) Obtener la conexión de un producto en Strapi a partir de su documentId.
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
        { error: "No hay productos o reservas en la orden" },
        { status: 400 }
      );
    }
    if (!customer || !customer.email) {
      return NextResponse.json(
        { error: "Datos del cliente incompletos" },
        { status: 400 }
      );
    }

    // Determinar si existen productos y/o reservas
    const hasOrderProducts = orderData.some((item) => !item.isReservation);
    const hasReservations = orderData.some((item) => item.isReservation);

    // 1. Crear el pedido interno en Strapi
    // Se crean conexiones solo para los productos (no para reservas)
    const productConnections = [];
    for (const item of orderData) {
      if (!item.isReservation) {
        const connection = await getProductConnection(item.documentId);
        if (connection) {
          productConnections.push(connection);
        }
      }
    }

    // Calcular el total del pedido.
    // Para reservas con servicio adicional: (precio base * cantidad) + precio del servicio adicional (solo una vez)
    const totalPriceOrder = orderData.reduce((total, item) => {
      const qty = item.quantity || 1;
      const basePrice = parseFloat(item.price) || 0;
      if (item.isReservation && item.additionalService && item.additionalService.price) {
        const additionalPrice = parseFloat(item.additionalService.price);
        return total + (basePrice * qty + additionalPrice);
      }
      return total + (basePrice * qty);
    }, 0);

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
      customerCity: customer.city,
      customerDeparment: customer.departament || "",
      customerAddress: customer.address || "",
      items: JSON.stringify(orderData),
      totalPriceOrder: totalPriceOrder,
      numberOrder: null, // Se actualizará luego con el external_reference
      state: "Pendiente", // Se crea el pedido con estado "Pendiente"
      payment_status: "Pendiente",
      payment_method: "MercadoPago",
      payment_id: null,
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
    console.log("✅ Pedido interno creado:", internalOrderData);

    // Obtener el id incremental y el documentId
    const orderId = internalOrderData.data.id; // ID incremental (para el número de pedido)
    const orderDocumentId = internalOrderData.data.documentId; // Usado para el endpoint
    console.log("✅ Pedido creado. ID:", orderId, "DocumentID:", orderDocumentId);

    // 2. Generar externalRef usando el formato "P-{orderId}" y actualizar el pedido
    const externalRef = `P-${orderId}`;
    const updatePayload = { data: { numberOrder: externalRef } };
    // Se actualiza el pedido mediante su documentId
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
      console.error(
        "❌ Error al actualizar el pedido con numberOrder. Response:",
        await updateOrderRes.text()
      );
      throw new Error("Error al actualizar el pedido interno con numberOrder");
    }
    console.log("✅ Pedido actualizado con numberOrder:", externalRef);

    // 3. Construir la preferencia para MercadoPago usando externalRef.
    // Si el item es una reserva y tiene servicio adicional, se crean dos items:
    // - Uno para el precio base multiplicado por la cantidad.
    // - Otro para el servicio adicional (cantidad = 1).
    const mpItems = [];
    orderData.forEach((item) => {
      const qty = item.quantity || 1;
      // Para reservas con servicio adicional
      if (item.isReservation && item.additionalService && item.additionalService.price) {
        // Item base de la reserva
        mpItems.push({
          id: item.documentId ? String(item.documentId) + "-base" : "sin-id-base",
          title: item.title || item.name || "Reserva sin nombre",
          description: "Reserva",
          picture_url: item.image?.url || "https://via.placeholder.com/150",
          category_id: "reservas",
          quantity: qty,
          currency_id: "COP",
          unit_price: parseFloat(item.price) || 0,
        });
        // Item para el servicio adicional (se suma una sola vez)
        mpItems.push({
          id: item.documentId ? String(item.documentId) + "-addon" : "sin-id-addon",
          title: item.additionalService.name || "Servicio adicional",
          description: "Servicio adicional",
          picture_url: item.additionalService.image?.url || "https://via.placeholder.com/150",
          category_id: "servicios",
          quantity: 1,
          currency_id: "COP",
          unit_price: parseFloat(item.additionalService.price) || 0,
        });
      } else {
        // Para productos o reservas sin servicio adicional
        mpItems.push({
          id: item.documentId ? String(item.documentId) : "sin-id",
          title: item.title || item.name || "Producto sin nombre",
          description:
            item.additionalService && !item.isReservation
              ? `Incluye: ${item.additionalService.name}`
              : "",
          picture_url: item.image?.url || "https://via.placeholder.com/150",
          category_id: item.isReservation ? "reservas" : "services",
          quantity: qty,
          currency_id: "COP",
          unit_price: parseFloat(item.price) || 0,
        });
      }
    });
    console.log("✅ Items para MercadoPago:", mpItems);

    const additionalInfo = orderData
      .map((item) => `${item.quantity}x ${item.title || item.name}`)
      .join(" | ");

    const preference = {
      items: mpItems,
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
      external_reference: externalRef,
      additional_info: additionalInfo,
      notification_url: `${process.env.CURRENT_ENVIRONMENT}/api/mercadopago/webhook`,
    };

    // 4. Crear la preferencia en MercadoPago
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
    console.log("✅ Preferencia de MercadoPago creada:", mpData);

    // 5. Actualizar el pedido con payment_id y demás datos de pago
    const updatedOrderPayload = {
      payment_id: mpData.id,
      payment_method: "MercadoPago",
      state: "Pendiente",
      payment_status: "Pendiente",
    };
    const paymentUpdateRes = await fetch(
      `${STRAPI_URL}/api/pedidos/${orderDocumentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({ data: updatedOrderPayload }),
      }
    );
    if (!paymentUpdateRes.ok) {
      console.error(
        "❌ Error al actualizar el pedido con datos de pago. Response:",
        await paymentUpdateRes.text()
      );
      throw new Error("Error al actualizar el pedido con datos de pago");
    }
    console.log("✅ Pedido actualizado con datos de pago");

    // 6. Crear reservas para cada ítem que corresponda a una reserva
    for (const item of orderData) {
      if (item.isReservation && item.reservationData) {
        const rawTime = item.reservationData.hour || "10:30 am";
        const reservationTime = convertTimeString(rawTime);
        const qty = item.quantity || 1;
        const basePrice = parseFloat(item.price) || 0;
        // Para reservas con servicio adicional, se suma el precio adicional una sola vez.
        const totalPriceReservation =
          item.additionalService && item.additionalService.price
            ? basePrice * qty + parseFloat(item.additionalService.price)
            : basePrice * qty;

        // Construir la carga útil de la reserva.
        // Se vincula la reserva con el pedido creado utilizando el campo "pedidos".
        const reservationPayload = {
          data: {
            plan: item.documentId, // Se asume que este documentId corresponde al plan a reservar.
            guests: item.reservationData.persons || qty,
            reservationDate:
              item.reservationData.date ||
              new Date().toISOString().split("T")[0],
            reservationTime, // Formato "HH:mm:ss.SSS"
            state: "Pendiente",
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
            totalPriceReservation: totalPriceReservation,
            servicios_adicionale: item?.additionalService?.documentId || null,
            // Vinculación con el pedido a partir del documentId (para acceder al endpoint)
            pedidos: {
              connect: [{ documentId: orderDocumentId }],
            },
            // Se omite el campo reservationNumber, ya que se generará automáticamente desde un lifecycle en Strapi.
          },
        };

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
            "✅ Reserva creada correctamente. DocumentID:",
            reservaJson.data.documentId
          );
        }
      }
    }

    return NextResponse.json({ id: mpData.id }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en la creación de la preferencia:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
