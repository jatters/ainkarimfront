import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN || "",
    });
    const preferenceClient = new Preference(client);

    const body = await request.json();
    const { items, backUrls } = body;

    const preferenceData = {
      items: items.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
      })),
      back_urls: {
        success: process.env.MP_BACK_URL_SUCCESS || "https://default-success-url.com",
        failure: process.env.MP_BACK_URL_FAILURE || "https://default-failure-url.com",
        pending: process.env.MP_BACK_URL_PENDING || "https://default-pending-url.com",
      },
      notification_url: `${process.env.CURRENT_ENVIRONMENT}/api/mercadopago/webhook`,      
      auto_return: "approved",
    };

    const response = await preferenceClient.create({
      body: preferenceData,
    });

    console.log("Respuesta completa de Mercado Pago:", response);

    const { init_point, id: preferenceId } = response || {};

    if (!init_point) {
      console.error("Datos de respuesta:", response.result);
      throw new Error("No se recibió init_point en la respuesta de Mercado Pago");
    }

    return NextResponse.json({
      init_point,
      preferenceId,
    });
  } catch (error) {
    console.error("Error creando preferencia", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
