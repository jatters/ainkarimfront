import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

/**
 * Reintenta una misma fetch varias veces en caso de fallo,
 * útil cuando MercadoPago tarda en reflejar la info del pago.
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
    // 1. Parsear parámetros del body y query string
    const body = await request.json();
    console.log("🔔 Webhook MercadoPago recibido =>", JSON.stringify(body, null, 2));

    const topic = request.nextUrl.searchParams.get("topic");
    const queryId = request.nextUrl.searchParams.get("id");

    let paymentId = null;
    let externalReference = null;

    // 2. Según el 'topic', obtenemos info de MP
    if (topic === "merchant_order" && queryId) {
      console.log(`🔍 Buscando detalles de la merchant_order: ${queryId}`);
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
      paymentId = body.data.id;
    }

    // Si aún no tenemos paymentId, reintentamos obtenerlo
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

    // Si la merchant_order no trae externalReference, lo sacamos del propio pago
    if (!externalReference) {
      externalReference = paymentData.external_reference;
    }

    // 3. Determinar el estado global del pago
    const paymentStatus = paymentData.status; // "approved", "rejected", "pending", etc.
    const paymentMethod = paymentData.payment_method_id || "No disponible";

    // 4. Mapear estados para pedido y reserva según el pago
    let pedidoState = "Pendiente";
    let reservaState = "Pendiente";
    if (paymentStatus === "approved") {
      pedidoState = "Pago";
      reservaState = "Confirmada";
    } else if (paymentStatus === "rejected") {
      pedidoState = "Cancelado";
      reservaState = "Cancelada";
    }

    // 5. Actualizar el Pedido en Strapi
    // Ahora el externalReference de pedidos tiene el prefijo "P-"
    if (externalReference?.startsWith("P-")) {
      const updateOrderPayload = {
        data: {
          state: pedidoState,
          payment_status: paymentStatus,
          payment_id: String(paymentId),
          payment_method: paymentMethod,
          // Puedes incluir otros campos si es necesario
        },
      };

      console.log(`🔎 Buscando pedido por numberOrder = ${externalReference}...`);
      const resBuscarPedido = await fetch(
        `${STRAPI_URL}/api/pedidos?filters[numberOrder][$eq]=${externalReference}&populate=reservas`,
        {
          headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
        }
      );
      const pedidosData = await resBuscarPedido.json();

      if (pedidosData.data && pedidosData.data.length > 0) {
        // Se asume que se encuentra un único pedido
        const pedidoRecord = pedidosData.data[0];
        const orderDocumentId = pedidoRecord.documentId; // Usamos el documentId para actualizar

        console.log(
          `📝 Actualizando el pedido (DocumentID ${orderDocumentId}) con payload:`,
          JSON.stringify(updateOrderPayload, null, 2)
        );

        const updatePedidoRes = await fetch(
          `${STRAPI_URL}/api/pedidos/${orderDocumentId}`,
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

        // 6. Actualizar reservas asociadas al pedido (si existen)
        // Dado que el pedido tiene una relación con reservas, aprovechamos el populate=reservas
        if (pedidoRecord.reservas && Array.isArray(pedidoRecord.reservas) && pedidoRecord.reservas.length > 0) {
          for (const reserva of pedidoRecord.reservas) {
            const reservaDocumentId = reserva.documentId;
            const updateReservaPayload = {
              data: {
                state: reservaState,
                payment_status: paymentStatus,
                payment_id: String(paymentId),
                payment_method: paymentMethod,
                // Puedes actualizar totalPriceReservation u otros campos si es necesario
              },
            };

            console.log(
              `📝 Actualizando la reserva (DocumentID ${reservaDocumentId}) con payload:`,
              JSON.stringify(updateReservaPayload, null, 2)
            );

            const updateReservaRes = await fetch(
              `${STRAPI_URL}/api/reservas/${reservaDocumentId}`,
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
                `❌ Error al actualizar la reserva con DocumentID ${reservaDocumentId}:`,
                errorText
              );
            } else {
              console.log(`✅ Reserva (DocumentID ${reservaDocumentId}) actualizada correctamente.`);
            }
          }
        } else {
          console.log("ℹ️ No se encontraron reservas asociadas a este pedido.");
        }
      } else {
        console.warn(`No se encontró pedido con numberOrder = ${externalReference}.`);
      }
    } else {
      console.warn("El external_reference no corresponde a un pedido con prefijo 'P-'.");
    }

   

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("❌ Error en Webhook =>", error);
    return new Response("Error en Webhook", { status: 500 });
  }
}
