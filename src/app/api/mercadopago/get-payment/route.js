import fetch from 'node-fetch';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get("payment_id");

    if (!paymentId) {
      return Response.json({ error: "Falta el ID del pago" }, { status: 400 });
    }

    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    });

    const paymentData = await response.json();

    if (!response.ok) {
      return Response.json({ error: paymentData.message || "Error obteniendo el pago" }, { status: response.status });
    }

    return Response.json({
      id: paymentData.id,
      status: paymentData.status,
      amount: paymentData.transaction_amount,
      date: paymentData.date_approved,
      items: paymentData.additional_info?.items || [], // 🔥 Aquí aseguramos que los items lleguen
    });

  } catch (error) {
    return Response.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
