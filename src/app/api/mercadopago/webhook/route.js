import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
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
    console.log("🔔 Webhook MercadoPago recibido =>", JSON.stringify(body, null, 2));

    const topic = request.nextUrl.searchParams.get("topic");
    const id = request.nextUrl.searchParams.get("id");

    let paymentId = null;
    let externalReference = null;

    if (topic === "merchant_order" && id) {
      console.log(`🔍 Buscando detalles de la orden: ${id}`);

      const orderData = await fetchWithRetry(
        `https://api.mercadopago.com/merchant_orders/${id}`,
        { headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` } },
        5, 3000
      );

      if (!orderData.payments || orderData.payments.length === 0) {
        console.warn("⚠️ No hay pagos registrados en la orden. Esperando confirmación...");
        return new Response("Esperando pago", { status: 202 });
      }

      paymentId = orderData.payments.find((p) => p.status === "approved")?.id || null;
      externalReference = orderData.external_reference;
    }

    if (topic === "payment" && body.data?.id) {
      paymentId = body.data.id;
    }

    if (!paymentId) {
      console.warn("⏳ Esperando a que MercadoPago confirme el pago...");
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const paymentResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${body.data?.id}`,
        { headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` } }
      );

      const paymentData = await paymentResponse.json();
      paymentId = paymentData.id || null;
    }

    if (!paymentId) {
      console.error("❌ No se encontró ID de pago válido después de reintentar.");
      return new Response("Error: No se encontró ID de pago", { status: 400 });
    }

    console.log(`🔍 Buscando detalles del pago: ${paymentId}`);
    const paymentData = await fetchWithRetry(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      { headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` } },
      5, 3000
    );

    console.log("📄 Datos del pago recibidos:", JSON.stringify(paymentData, null, 2));

    if (!paymentData.id) {
      console.error("❌ No se pudo obtener el pago.");
      return new Response("Error obteniendo pago", { status: 400 });
    }

    if (!externalReference) {
      externalReference = paymentData.external_reference;
    }

    const paymentStatus = paymentData.status;
    const paymentMethod = paymentData.payment_method_id || "No disponible";

    const payerData = {
      name: paymentData.additional_info?.payer?.first_name || paymentData.payer?.first_name || "No disponible",
      surname: paymentData.additional_info?.payer?.last_name || paymentData.payer?.last_name || "No disponible",
      email: paymentData.payer?.email || "No disponible",
      phone: paymentData.additional_info?.payer?.phone?.number || paymentData.payer?.phone?.number || "No disponible",
      document: paymentData.payer?.identification?.number || "No disponible",
      address: paymentData.additional_info?.payer?.address?.street_name || "No disponible",
    };

    console.log("📢 Datos del cliente correctos:", JSON.stringify(payerData, null, 2));

    let pedidoStatus = "Pendiente";
    let reservaEstado = "Pendiente";
    if (paymentStatus === "approved") {
      pedidoStatus = "Pago";
      reservaEstado = "Confirmada";
    } else if (paymentStatus === "rejected") {
      pedidoStatus = "Fallido";
      reservaEstado = "Cancelada";
    }

    console.log(`🔎 Verificando si el pedido ${externalReference} ya existe en Strapi...`);

    const orderExistsResponse = await fetch(
      `${STRAPI_URL}/api/pedidos?filters[numberOrder][$eq]=${externalReference}`,
      { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
    );

    const orderExistsData = await orderExistsResponse.json();
    if (orderExistsData.data.length > 0) {
      console.log(`✅ Pedido ${externalReference} ya existe en Strapi. No se creará nuevamente.`);
      return new Response("Pedido ya existe", { status: 200 });
    }
    
    console.log(`📧 Enviando correo de confirmación de compra...`);
    await fetch(`${process.env.CURRENT_ENVIRONMENT}/api/sendEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "compraConfirmada",
        name: paymentData.payer?.first_name || "Cliente",
        email: paymentData.payer?.email || "No disponible",
        phone: paymentData.payer?.phone?.number || "No disponible",
        orderId: externalReference,
        total: paymentData.transaction_amount,
        date: new Date().toISOString(),
        orderItems: paymentData.additional_info?.items.map((item) => ({
          productName: item.title,
          quantity: item.quantity,
          unitPrice: item.unit_price,
        })),
      }),
    });

    console.log(`❌ Pedido ${externalReference} no encontrado en Strapi. Creándolo...`);

    const productos = [];
    const reservas = [];

    paymentData.additional_info.items.forEach((item) => {
      if (item.title.toLowerCase().includes("plan") || item.unit_price === 0) {
        const reservationDate = item.reservationData?.date || new Date().toISOString().split("T")[0];
        const reservationTime = item.reservationData?.hour || "10:30:00.000";
        const guests = item.reservationData?.persons || item.quantity || 1;

        reservas.push({
          data: {
            plan: item.id,
            guests,
            reservationDate,
            reservationTime,
            state: reservaEstado,
            payment_status: paymentStatus,
            customerName: payerData.name,
            customerLastname: payerData.surname,
            customerEmail: payerData.email,
            customerPhone: payerData.phone,
            customerDocument: payerData.document,
          },
        });
      } else {
        productos.push({
          documentId: item.id,
          title: item.title,
          quantity: item.quantity,
        });
      }
    });

    console.log("📦 Productos a conectar:", JSON.stringify(productos, null, 2));
    console.log("📦 Reservas a conectar:", JSON.stringify(reservas, null, 2));

    const orderDataJson = {
      data: {
        numberOrder: externalReference,
        creationDate: new Date().toISOString(),
        state: pedidoStatus,
        payment_status: paymentStatus,
        payment_id: String(paymentId),
        payment_method: paymentMethod,
        totalPriceOrder: paymentData.transaction_amount,
        customerName: payerData.name,
        customerLastname: payerData.surname,
        customerEmail: payerData.email,
        customerPhone: payerData.phone,
        customerDocument: payerData.document,
        customerAddress: payerData.address,
        productos: { connect: productos.map((p) => ({ documentId: p.documentId })) },
      },
    };

    console.log("📦 JSON enviado a Strapi para PEDIDO:", JSON.stringify(orderDataJson, null, 2));

    await fetch(`${STRAPI_URL}/api/pedidos`, {
      method: "POST",
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(orderDataJson),
    });

    for (const reserva of reservas) {
      console.log("📦 JSON enviado a Strapi para RESERVA:", JSON.stringify(reserva, null, 2));

      await fetch(`${STRAPI_URL}/api/reservas`, {
        method: "POST",
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(reserva),
      });
    }

    return new Response("OK", { status: 200 });

  } catch (error) {
    console.error("❌ Error en Webhook =>", error);
    return new Response("Error en Webhook", { status: 500 });
  }
}
