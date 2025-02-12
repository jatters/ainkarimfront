import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

/**
 * Opcional: reintenta la misma fetch varias veces si falla,
 * útil porque a veces MercadoPago tarda en reflejar la info del pago.
 */
async function fetchWithRetry(url, options, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, options);
    if (response.ok) return response.json();
    console.warn(`🔄 Reintentando (${i + 1}/${retries}) ${url}...`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  throw new Error(`❌ Error: No se pudo obtener respuesta de ${url}`);
}

export async function POST(request) {
  try {
    // 1. Parsear los parámetros de la URL y el body
    const body = await request.json();
    console.log("🔔 Webhook MercadoPago recibido =>", JSON.stringify(body, null, 2));

    const topic = request.nextUrl.searchParams.get("topic");
    const queryId = request.nextUrl.searchParams.get("id");

    let paymentId = null;
    let externalReference = null;

    // 2. Dependiendo del 'topic', buscamos la info en MP
    //    (merchant_order o payment).
    if (topic === "merchant_order" && queryId) {
      console.log(`🔍 Buscando detalles de la orden: ${queryId}`);
      const orderData = await fetchWithRetry(
        `https://api.mercadopago.com/merchant_orders/${queryId}`,
        { headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` } },
        5,
        3000
      );

      if (!orderData.payments || orderData.payments.length === 0) {
        console.warn("⚠️ No hay pagos registrados en la orden. Esperando confirmación...");
        return new Response("Esperando pago", { status: 202 });
      }

      // Tomamos el primer pago 'approved' (o el primero que exista)
      paymentId =
        orderData.payments.find((p) => p.status === "approved")?.id ||
        orderData.payments[0].id ||
        null;
      externalReference = orderData.external_reference || null;
    }

    if (topic === "payment" && body.data?.id) {
      // Si el topic es 'payment', ya tenemos el ID de pago directo
      paymentId = body.data.id;
    }

    // Si no tenemos paymentId todavía, reintentamos un par de veces (opcional)
    if (!paymentId) {
      console.warn("⏳ Esperando a que MercadoPago confirme el ID de pago...");
      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (body.data?.id) {
        const paymentResponse = await fetch(
          `https://api.mercadopago.com/v1/payments/${body.data?.id}`,
          { headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` } }
        );
        const paymentDataTemp = await paymentResponse.json();
        paymentId = paymentDataTemp.id || null;
      }
    }

    if (!paymentId) {
      console.error("❌ No se encontró ID de pago válido después de reintentar.");
      return new Response("Error: No se encontró ID de pago", { status: 400 });
    }

    console.log(`🔍 Buscando detalles del pago: ${paymentId}`);
    const paymentData = await fetchWithRetry(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      { headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` } },
      5,
      3000
    );
    console.log("📄 Datos del pago recibidos:", JSON.stringify(paymentData, null, 2));

    if (!paymentData.id) {
      console.error("❌ No se pudo obtener el pago desde MercadoPago.");
      return new Response("Error obteniendo pago", { status: 400 });
    }

    // Si la merchant_order no traía externalReference, lo sacamos del propio pago
    if (!externalReference) {
      externalReference = paymentData.external_reference;
    }

    // 3. Determinar el status global del pago
    const paymentStatus = paymentData.status; // "approved", "rejected", "pending", etc.
    const paymentMethod = paymentData.payment_method_id || "No disponible";

    // 4. Mapeamos el estado del pedido vs. estado del pago
    //    Aquí es tu lógica de negocio. Ejemplo:
    let pedidoState = "Pendiente";
    if (paymentStatus === "approved") {
      pedidoState = "Pago"; // o "Completado"
    } else if (paymentStatus === "rejected") {
      pedidoState = "Fallido"; // o "Cancelado"
    }

    // 5. Actualizar el Pedido en Strapi, buscando su numberOrder = externalReference
    //    p.ej.: numberOrder = "pedido-XYZ"
    if (externalReference?.startsWith("pedido-")) {
      const updateOrderPayload = {
        data: {
          state: pedidoState,
          payment_status: paymentStatus, // "approved", "rejected", etc.
          payment_id: String(paymentId),
          payment_method: paymentMethod,
          // Ej. si quieres guardar el monto final
          // totalPriceOrder: paymentData.transaction_amount,
        },
      };

      console.log(
        `🔎 Buscando pedido por numberOrder = ${externalReference}...`
      );
      const resBuscarPedido = await fetch(
        `${STRAPI_URL}/api/pedidos?filters[numberOrder][$eq]=${externalReference}`,
        {
          headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
        }
      );
      const pedidosData = await resBuscarPedido.json();

      if (pedidosData.data && pedidosData.data.length > 0) {
        const pedidoId = pedidosData.data[0].documentId; // ID numérico interno
        console.log(
          `📝 Actualizando el pedido (ID ${pedidoId}) con payload:`,
          JSON.stringify(updateOrderPayload, null, 2)
        );

        const updatePedidoRes = await fetch(
          `${STRAPI_URL}/api/pedidos/${pedidoId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${STRAPI_API_TOKEN}`,
            },
            body: JSON.stringify(updateOrderPayload),
          }
        );

        if (!updatePedidoRes.ok) {
          const errorText = await updatePedidoRes.text();
          console.error("❌ Error al actualizar pedido:", errorText);
        } else {
          console.log(`✅ Pedido ${externalReference} actualizado correctamente.`);
        }
      } else {
        console.warn(`No se encontró Pedido con numberOrder = ${externalReference}.`);
      }
    }

    // 6. Actualizar las Reservas asociadas (todas las que tengan reservationNumber = externalReference)
    //    Por ejemplo, en el create-preference se guardó: reservationNumber: "pedido-XYZ"
    let reservaState = "Pendiente";
    if (paymentStatus === "approved") {
      reservaState = "Confirmada";
    } else if (paymentStatus === "rejected") {
      reservaState = "Cancelada";
    }

    console.log(
      `🔎 Buscando reservas con reservationNumber = ${externalReference}`
    );
    const resBuscarReservas = await fetch(
      `${STRAPI_URL}/api/reservas?filters[reservationNumber][$eq]=${externalReference}`,
      {
        headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
      }
    );
    const reservasData = await resBuscarReservas.json();

    if (reservasData.data && reservasData.data.length > 0) {
      for (const r of reservasData.data) {
        const reservaId = r.documentId;
        const updateReservaPayload = {
          data: {
            state: reservaState,
            payment_status: paymentStatus,
            payment_id: String(paymentId),
            payment_method: paymentMethod,
            // totalPriceReservation: paymentData.transaction_amount // si aplica
          },
        };

        console.log(
          `📝 Actualizando la reserva (ID ${reservaId}) con payload:`,
          JSON.stringify(updateReservaPayload, null, 2)
        );

        const updateReservaRes = await fetch(
          `${STRAPI_URL}/api/reservas/${reservaId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${STRAPI_API_TOKEN}`,
            },
            body: JSON.stringify(updateReservaPayload),
          }
        );

        if (!updateReservaRes.ok) {
          const errorText = await updateReservaRes.text();
          console.error(
            `❌ Error al actualizar la reserva con ID ${reservaId}:`,
            errorText
          );
        } else {
          console.log(`✅ Reserva (ID ${reservaId}) actualizada correctamente.`);
        }
      }
    } else {
      console.log("No se encontraron reservas con ese reservationNumber.");
    }

    // 7. (Opcional) Enviar un correo de confirmación/fallo/lo que requieras
    //    con la info final. Por ejemplo:
    /*
    console.log("📧 Enviando correo de confirmación...");
    await fetch(`${process.env.CURRENT_ENVIRONMENT}/api/sendEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: paymentStatus === "approved"
          ? "compraConfirmada"
          : "compraFallida",
        orderId: externalReference,
        paymentStatus,
        // ...
      }),
    });
    */

    // Responder OK para que MercadoPago no reintente indefinidamente
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("❌ Error en Webhook =>", error);
    return new Response("Error en Webhook", { status: 500 });
  }
}
