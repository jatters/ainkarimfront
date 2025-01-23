import { NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

if (!MP_ACCESS_TOKEN) {
  console.error("❌ ERROR: MP_ACCESS_TOKEN no está configurado en las variables de entorno.");
} else {
  // ✅ Nueva forma de configuración del SDK de Mercado Pago
  mercadopago.configurations = {
    access_token: MP_ACCESS_TOKEN,
  };
}

export async function POST(request) {
  try {
    const { orderData } = await request.json();

    if (!Array.isArray(orderData) || orderData.length === 0) {
      return NextResponse.json({ error: "Datos de la orden no válidos" }, { status: 400 });
    }

    // ✅ Transformar los datos para Mercado Pago
    const items = orderData.map((item) => ({
      title: item.name || "Producto sin nombre",
      quantity: item.quantity || 1,
      unit_price: Math.round(item.price) || 1,
      currency_id: "COP",
    }));

    console.log("🟢 Enviando a MercadoPago:", items);

    // ✅ Crear preferencia de pago usando la API de Mercado Pago
    const preferenceResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        back_urls: {
          success: process.env.MP_BACK_URL_SUCCESS || "https://default-success-url.com",
          failure: process.env.MP_BACK_URL_FAILURE || "https://default-failure-url.com",
          pending: process.env.MP_BACK_URL_PENDING || "https://default-pending-url.com",
        },
        auto_return: "approved",
      }),
    });

    const preferenceData = await preferenceResponse.json();

    if (!preferenceData.id) {
      throw new Error("No se pudo obtener la preferencia de pago.");
    }

    console.log("✅ Preferencia creada:", preferenceData);

    return NextResponse.json({ id: preferenceData.id }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en MercadoPago API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
