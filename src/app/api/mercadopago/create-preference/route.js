/* import { NextResponse } from 'next/server';
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
 */
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { orderData, customer } = await req.json();

    if (!orderData || orderData.length === 0) {
      return NextResponse.json({ error: "No hay productos en la orden" }, { status: 400 });
    }

    if (!customer || !customer.email) {
      return NextResponse.json({ error: "Datos del cliente incompletos" }, { status: 400 });
    }

    const items = orderData.map((product) => {
      //console.log("📌 Producto antes de enviar a MercadoPago:", product); // Agregamos log
    
      return {
        id: product.documentId ? String(product.documentId) : "sin-id",
        title: product.name || product.title || "Producto sin nombre",
        description: product.additionalService ? `Incluye: ${product.additionalService.name}` : "",
        picture_url: product.image?.url || "https://via.placeholder.com/150",
        category_id: "services",
        quantity: product.quantity || 1,
        currency_id: "COP",
        unit_price: parseFloat(product.price) || 0,
      };
    });
    
    //console.log("🟢 Enviando preferencia a MercadoPago:", JSON.stringify(items, null, 2));
    const additionalInfo = orderData.map((item) => `${item.quantity}x ${item.title}`).join(" | ");

    
    const preference = {
      items,
      payer: {
        name: customer.firstName,
        surname: customer.lastname || "",
        email: customer.email,
        phone: {
          area_code: "",
          number: customer.mobiletwo || "",
        },
        identification: {
          type: "CC",
          number: customer.document || "",
        },
        address: {
          zip_code: "",
          street_name: customer.address || "Sin dirección",
          street_number: null,
        },
      },
      back_urls: {
        success: process.env.MP_BACK_URL_SUCCESS,
        failure: process.env.MP_BACK_URL_FAILURE,
        pending: process.env.MP_BACK_URL_PENDING,
      },
      auto_return: "approved",
      //notification_url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/mercadopago/webhook`, // URL de notificaciones
      notification_url: "https://central-strong-colt.ngrok-free.app/api/mercadopago/webhook", // URL de notificaciones
      external_reference: `pedido-${Date.now()}`,
      additional_info: additionalInfo, // 🔹 Agregar nombres de productos en la preferencia
    };

    console.log("🟢 Enviando preferencia a MercadoPago:", JSON.stringify(preference, null, 2));

    const mercadoPagoRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preference),
    });

    const responseData = await mercadoPagoRes.json();

    if (!mercadoPagoRes.ok) {
      throw new Error(`Error al crear preferencia: ${responseData.message || "Desconocido"}`);
    }

    console.log("✅ Preferencia creada:", responseData);

    return NextResponse.json({ id: responseData.id }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en la creación de la preferencia:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
