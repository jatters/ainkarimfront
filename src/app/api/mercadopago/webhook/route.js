import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

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
    const body = await request.json();

    const topic = request.nextUrl.searchParams.get("topic");
    const queryId = request.nextUrl.searchParams.get("id");

    let paymentId = null;
    let externalReference = null;

    if (topic === "merchant_order" && queryId) {
      const orderData = await fetchWithRetry(
        `https://api.mercadopago.com/merchant_orders/${queryId}`,
        { headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` } },
        5,
        3000
      );

      if (!orderData.payments || orderData.payments.length === 0) {
        console.warn(
          "⚠️ No hay pagos registrados en la orden. Esperando confirmación..."
        );
        return new Response("Esperando pago", { status: 202 });
      }

      paymentId =
        orderData.payments.find((p) => p.status === "approved")?.id ||
        orderData.payments[0].id ||
        null;
      externalReference = orderData.external_reference || null;
    }

    if (topic === "payment" && body.data?.id) {
      paymentId = body.data.id;
    }

    if (!paymentId) {
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
      console.error("No se encontró ID de pago válido después de reintentar.");
      return new Response("Error: No se encontró ID de pago", { status: 400 });
    }

    const paymentData = await fetchWithRetry(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      { headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` } },
      5,
      3000
    );

    if (!paymentData.id) {
      console.error("No se pudo obtener el pago desde MercadoPago.");
      return new Response("Error obteniendo pago", { status: 400 });
    }

    if (!externalReference) {
      externalReference = paymentData.external_reference;
    }

    const paymentStatus = paymentData.status;
    const paymentMethod = paymentData.payment_method_id || "No disponible";

    let pedidoState = "Pendiente";
    let reservaState = "Pendiente";
    if (paymentStatus === "approved") {
      pedidoState = "Pago";
      reservaState = "Confirmada";
    } else if (paymentStatus === "rejected") {
      pedidoState = "Cancelado";
      reservaState = "Cancelada";
    }

    if (externalReference?.startsWith("P-")) {
      const updateOrderPayload = {
        data: {
          state: pedidoState,
          payment_status: paymentStatus,
          payment_id: String(paymentId),
          payment_method: paymentMethod,
        },
      };

      const resBuscarPedido = await fetch(
        `${STRAPI_URL}/api/pedidos?filters[numberOrder][$eq]=${externalReference}&populate=reservas`,
        {
          headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
        }
      );
      const pedidosData = await resBuscarPedido.json();

      if (pedidosData.data && pedidosData.data.length > 0) {
        const pedidoRecord = pedidosData.data[0];
        const orderDocumentId = pedidoRecord.documentId;

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
        }

        if (
          pedidoRecord.reservas &&
          Array.isArray(pedidoRecord.reservas) &&
          pedidoRecord.reservas.length > 0
        ) {
          for (const reserva of pedidoRecord.reservas) {
            const reservaDocumentId = reserva.documentId;
            const updateReservaPayload = {
              data: {
                state: reservaState,
                payment_status: paymentStatus,
                payment_id: String(paymentId),
                payment_method: paymentMethod,
              },
            };

            const updateReservaRes = await fetch(
              `${STRAPI_URL}/api/reservas/${reservaDocumentId}?populate=*`,
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
            }
          }
        } else {
          console.error("No se encontraron reservas asociadas a este pedido.");
        }
      } else {
        console.warn(
          `No se encontró pedido con numberOrder = ${externalReference}.`
        );
      }
    } else {
      console.warn(
        "El external_reference no corresponde a un pedido con prefijo 'P-'."
      );
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("❌ Error en Webhook =>", error);
    return new Response("Error en Webhook", { status: 500 });
  }
}
