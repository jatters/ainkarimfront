/* // src/app/api/processOrder/route.js
import { NextResponse } from "next/server";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const mercadopago = require("mercadopago");

// Configura Mercado Pago con tu Access Token
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export async function POST(request) {
  try {
    const data = await request.json();
    const { order, ...customerData } = data;

    // 1. Guardar la orden en Strapi
    const strapiResponse = await fetch(`${process.env.STRAPI_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({ data: { ...order, customer: customerData } }),
    });

    if (!strapiResponse.ok) {
      const errorData = await strapiResponse.json();
      throw new Error(
        errorData.error?.message || "Error al guardar la orden en Strapi."
      );
    }

    const savedOrder = await strapiResponse.json();

    // 2. Crear la preferencia de pago en Mercado Pago
    const preference = {
      items: order.map((item) => ({
        title: item.name || "Producto sin nombre",
        quantity: item.quantity || 1,
        unit_price: Math.round(item.price) || 1, // En COP, enteros
        currency_id: "COP", // Agregar currency_id requerido por Mercado Pago
      })),
      back_urls: {
        success:
          process.env.MP_BACK_URL_SUCCESS || "https://default-success-url.com",
        failure:
          process.env.MP_BACK_URL_FAILURE || "https://default-failure-url.com",
        pending:
          process.env.MP_BACK_URL_PENDING || "https://default-pending-url.com",
      },
      notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/mercadopago/webhook`,
      auto_return: "approved",
      external_reference: savedOrder.data.id, // ID de la orden en Strapi
      payer: {
        name: customerData.firstName,
        surname: customerData.lastname,
        email: customerData.email,
        phone: {
          number: customerData.mobiletwo,
        },
        address: {
          street_name: customerData.address,
          street_number: "0", // Mercado Pago requiere street_number, ajusta según tus datos
          zip_code: "", // Opcional
        },
      },
    };

    const mpResponse = await mercadopago.preferences.create(preference);

    if (mpResponse.status !== 201) {
      throw new Error("Error al crear la preferencia en Mercado Pago.");
    }

    const preferenceId = mpResponse.body.id;
    const init_point = mpResponse.body.init_point;

    // 3. Actualizar la orden en Strapi con el preferenceId (opcional)
    await fetch(`${process.env.STRAPI_URL}/api/orders/${savedOrder.data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({ data: { preferenceId } }),
    });

    // 4. Retornar el preferenceId y init_point al frontend
    return NextResponse.json({
      message: "Orden creada exitosamente.",
      preferenceId,
      init_point,
    });
  } catch (error) {
    console.error("Error en /api/processOrder:", error);
    return NextResponse.json(
      { message: error.message || "Error al procesar la orden." },
      { status: 500 }
    );
  }
}
 */
import React from 'react'

export default function route() {
  return (
    <div>
      
    </div>
  )
}
