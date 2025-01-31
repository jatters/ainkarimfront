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
        success: `${process.env.CURRENT_ENVIRONMENT}/checkout/success`,
        failure: `${process.env.CURRENT_ENVIRONMENT}/checkout/failure`,
        pending: `${process.env.CURRENT_ENVIRONMENT}/checkout/pending`,
      },
      auto_return: "approved",
      //notification_url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/mercadopago/webhook`, // URL de notificaciones
      //notification_url: "https://central-strong-colt.ngrok-free.app/api/mercadopago/webhook", // URL de notificaciones
      notification_url: `${process.env.CURRENT_ENVIRONMENT}/api/mercadopago/webhook`, // URL de notificaciones
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
