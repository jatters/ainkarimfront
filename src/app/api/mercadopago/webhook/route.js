import { NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Webhook MercadoPago =>', body);

    // 1. Podrías validar la info:
    // mercadopago.configure({
    //   access_token: process.env.MP_ACCESS_TOKEN || '',
    // });
    // if (body.type === 'payment') {
    //   const paymentInfo = await mercadopago.payment.findById(body.data.id);
    //   console.log(paymentInfo);
    //   // Actualiza en Strapi (pedido -> pagado) ...
    // }

    // 2. Llamar a Strapi para cambiar estado del pedido:
    // fetch(`${process.env.STRAPI_URL}/api/pedidos/${body.orderId}`, {
    //   method: 'PUT',
    //   headers: { Authorization: 'Bearer <token>'},
    //   body: JSON.stringify({ data: { state: 'Pagado' } })
    // })

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Error en Webhook =>', error);
    return new Response('Error Webhook', { status: 500 });
  }
}
