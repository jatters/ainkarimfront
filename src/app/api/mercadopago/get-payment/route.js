export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get("payment_id");

    if (!paymentId) {
      return Response.json({ error: "Falta el ID del pago" }, { status: 400 });
    }

    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    const paymentData = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: paymentData.message || "Error obteniendo el pago" },
        { status: response.status }
      );
    }

    return Response.json({
      id: paymentData.id,
      status: paymentData.status,
      amount: paymentData.transaction_amount,
      date: paymentData.date_approved || paymentData.date_created,
      method: {
        id: paymentData.payment_method_id || "No disponible",
        type: paymentData.payment_type_id || "No disponible",
      },
      payer: {
        name:
          paymentData.additional_info?.payer?.first_name ||
          paymentData.payer?.first_name ||
          "No disponible",
        surname:
          paymentData.additional_info?.payer?.last_name ||
          paymentData.payer?.last_name ||
          "No disponible",
        email: paymentData.payer?.email || "No disponible",
        phone:
          paymentData.additional_info?.payer?.phone?.number ||
          paymentData.payer?.phone?.number ||
          "No disponible",
        address:
          paymentData.additional_info?.payer?.address?.street_name ||
          "No disponible",
      },
      items: paymentData.additional_info?.items || [],
      card: {
        last_four_digits: paymentData.card?.last_four_digits || "No disponible",
      },
      order: {
        external_reference: paymentData.external_reference || "No disponible",
      },
    });
  } catch (error) {
    return Response.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
