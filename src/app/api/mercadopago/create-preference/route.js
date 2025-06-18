import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

function convertTimeString(timeStr) {
  const regex = /^\d{2}:\d{2}:\d{2}\.\d{3}$/;
  if (regex.test(timeStr)) {
    return timeStr;
  }

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

async function getProductConnection(documentId) {
  const res = await fetch(
    `${STRAPI_URL}/api/productos?filters[documentId][$eq]=${documentId}`,
    {
      headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
    }
  );
  const data = await res.json();
  if (data.data && data.data.length > 0) {
    return { documentId };
  }
  console.warn(
    `Producto con documentId ${documentId} no encontrado en Strapi.`
  );
  return null;
}

export async function POST(req) {
  try {
    const { orderData, customer, coupon } = await req.json();

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

    const hasOrderProducts = orderData.some((item) => !item.isReservation);
    const hasReservations = orderData.some((item) => item.isReservation);

    const productConnections = [];
    for (const item of orderData) {
      if (!item.isReservation) {
        const connection = await getProductConnection(item.documentId);
        if (connection) {
          productConnections.push(connection);
        }
      }
    }

    const totalPriceOrder = orderData.reduce((total, item) => {
      const qty = item.quantity || 1;
      const basePrice = parseFloat(item.price) || 0;
      if (
        item.isReservation &&
        item.additionalService &&
        item.additionalService.price
      ) {
        const additionalPrice = parseFloat(item.additionalService.price);
        return total + (basePrice * qty + additionalPrice);
      }
      return total + basePrice * qty;
    }, 0);
    let discountValue = 0;
    if (coupon && coupon.percent) {
      discountValue = totalPriceOrder * (coupon.percent / 100);
    }
    const finalTotalPriceOrder = totalPriceOrder - discountValue;

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
      totalPriceOrder: finalTotalPriceOrder,
      coupon: coupon ? coupon.code : null,
      discount: coupon ? totalPriceOrder * (coupon.percent / 100) : 0,
      numberOrder: null,
      state: "Pendiente",
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

    const orderId = internalOrderData.data.id;
    const orderDocumentId = internalOrderData.data.documentId;

    const externalRef = `P-${orderId}`;
    const updatePayload = { data: { numberOrder: externalRef } };

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
    const mpItems = [];

    orderData.forEach((item) => {
      const qty = item.quantity || 1;

      if (
        item.isReservation &&
        item.additionalService &&
        item.additionalService.price
      ) {
        mpItems.push({
          id: item.documentId
            ? String(item.documentId) + "-base"
            : "sin-id-base",
          title: item.title || item.name || "Reserva sin nombre",
          description: "Reserva",
          picture_url: item.image?.url || "https://via.placeholder.com/150",
          category_id: "reservas",
          quantity: qty,
          currency_id: "COP",
          unit_price: parseFloat(item.price) || 0,
        });

        mpItems.push({
          id: item.documentId
            ? String(item.documentId) + "-addon"
            : "sin-id-addon",
          title: item.additionalService.name || "Servicio adicional",
          description: "Servicio adicional",
          picture_url:
            item.additionalService.image?.url ||
            "https://via.placeholder.com/150",
          category_id: "servicios",
          quantity: 1,
          currency_id: "COP",
          unit_price: parseFloat(item.additionalService.price) || 0,
        });
      } else {
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

    if (discountValue > 0) {
      mpItems.push({
        id: "coupon-discount",
        title: "Descuento",
        description: "Descuento aplicado por cupón",
        picture_url: "https://via.placeholder.com/150",
        category_id: "discount",
        quantity: 1,
        currency_id: "COP",
        unit_price: -discountValue,
      });
    }

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

    for (const item of orderData) {
      if (item.isReservation && item.reservationData) {
        const rawTime = item.reservationData.hour || "10:30 am";
        const reservationTime = convertTimeString(rawTime);
        const qty = item.quantity || 1;
        const basePrice = parseFloat(item.price) || 0;

        const totalPriceReservation =
          item.additionalService && item.additionalService.price
            ? basePrice * qty + parseFloat(item.additionalService.price)
            : basePrice * qty;
        const reservationDiscount = coupon?.percent
          ? totalPriceReservation * (coupon.percent / 100)
          : 0;
        const finalTotalPriceReservation =
          totalPriceReservation - reservationDiscount;

        const reservationPayload = {
          data: {
            plan: item.documentId,
            guests: item.reservationData.persons || qty,
            reservationDate:
              item.reservationData.date ||
              new Date().toISOString().split("T")[0],
            reservationTime,
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
            totalPriceReservation: finalTotalPriceReservation,
            servicios_adicionale: item?.additionalService?.documentId || null,

            pedidos: {
              connect: [{ documentId: orderDocumentId }],
            },
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
        }
      }
    }

    return NextResponse.json({ id: mpData.id }, { status: 200 });
  } catch (error) {
    console.error("Error en la creación de la preferencia:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
