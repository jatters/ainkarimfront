import { NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Webhook MercadoPago =>', body);

    const paymentStatus = body?.data?.status || body?.status || null;
    const paymentId = body?.data?.id || body?.id || null;
    const externalReference = body?.data?.external_reference || body?.external_reference || null;

    if (!paymentStatus || !paymentId || !externalReference) {
      console.error('Datos insuficientes en el webhook');
      return new Response('Error: Datos insuficientes', { status: 400 });
    }

    let pedidoStatus = 'Pendiente';

    if (paymentStatus === 'approved') {
      pedidoStatus = 'Pago';
    } else if (paymentStatus === 'rejected') {
      pedidoStatus = 'Fallido';
    }

    // Enviar la actualización a Strapi
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    const response = await fetch(`${STRAPI_URL}/api/pedidos?filters[numberOrder][$eq]=${externalReference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!data || data.data.length === 0) {
      console.error('Pedido no encontrado en Strapi');
      return new Response('Pedido no encontrado', { status: 404 });
    }

    const pedidoId = data.data[0].id;

    await fetch(`${STRAPI_URL}/api/pedidos/${pedidoId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          payment_status: pedidoStatus,
          payment_id: paymentId,
        },
      }),
    });

    console.log(`Pedido ${pedidoId} actualizado en Strapi con estado: ${pedidoStatus}`);

    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error('Error en Webhook =>', error);
    return new Response('Error Webhook', { status: 500 });
  }
}
