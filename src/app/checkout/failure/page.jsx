"use client";
import { useEffect, useState } from "react";

export default function FailurePage({ searchParams }) {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPaymentDetails() {
      try {
        const response = await fetch(
          `/api/mercadopago/get-payment?payment_id=${searchParams.payment_id}`
        );
        const data = await response.json();
        setPaymentDetails(data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      } finally {
        setLoading(false);
      }
    }

    if (searchParams.payment_id) {
      fetchPaymentDetails();
    }
  }, [searchParams.payment_id]);

  if (loading) {
    return <p>Cargando detalles del pago...</p>;
  }

  if (!paymentDetails) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-red-600">Pago Rechazado ❌</h1>
        <p>
          No se encontraron detalles del pago. Por favor, intenta nuevamente más
          tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto py-16 px-5">
      <h1 className="text-2xl font-bold text-red-600">Pago Rechazado ❌</h1>
      <p>
        Tu pago no se pudo procesar correctamente. Por favor, revisa los
        detalles y vuelve a intentarlo.
      </p>

      <h2 className="text-xl font-semibold mt-6">Detalles del Pago:</h2>
      <p>
        <strong>ID del Pago:</strong> {paymentDetails.id}
      </p>
      <p>
        <strong>Estado:</strong> {paymentDetails.status}
      </p>
      <p>
      {paymentDetails.amount ? paymentDetails.amount.toLocaleString() : "No disponible"} COP

      </p>
      <p>
        <strong>Fecha:</strong>{" "}
        {paymentDetails.date
          ? new Date(paymentDetails.date).toLocaleString("es-CO")
          : "No disponible"}
      </p>

      <h2 className="text-xl font-semibold mt-6">Resumen del Pedido:</h2>
      {paymentDetails.items?.length > 0 ? (
        <ul className="mt-2 list-disc list-inside">
          {paymentDetails.items.map((item, index) => (
            <li key={index}>
              {item.quantity}x {item.title} -{" "}
              {parseInt(item.unit_price).toLocaleString()} COP
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay información del pedido.</p>
      )}

      <div className="mt-6">
        <a
          href="/finalizar-compra"
          className="-bg--dark-green text-white px-4 py-2 rounded hover:-bg--light-green duration-200"
        >
          Intentar pagar de nuevo
        </a>
      </div>
    </div>
  );
}
