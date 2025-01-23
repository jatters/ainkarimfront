"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>Cargando detalles del pago...</p>}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPaymentDetails() {
      try {
        const paymentId = searchParams.get("payment_id");
        if (!paymentId) return;

        const response = await fetch(`/api/mercadopago/get-payment?payment_id=${paymentId}`);
        const data = await response.json();
        setPaymentDetails(data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPaymentDetails();
  }, [searchParams]);

  if (loading) {
    return <p>Cargando detalles del pago...</p>;
  }

  if (!paymentDetails) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-red-600">Error en el pago ❌</h1>
        <p>No se encontraron detalles del pago. Por favor, revisa nuevamente más tarde.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-600">¡Pago exitoso! 🎉</h1>
      <p>Gracias por tu compra. Aquí están los detalles:</p>

      <h2 className="text-xl font-semibold mt-6">Detalles del Pago:</h2>
      <p><strong>ID del Pago:</strong> {paymentDetails.id}</p>
      <p><strong>Estado:</strong> {paymentDetails.status}</p>
      <p><strong>Monto:</strong> {paymentDetails.amount?.toLocaleString()} COP</p>
      <p><strong>Fecha:</strong> {paymentDetails.date ? new Date(paymentDetails.date).toLocaleString("es-CO") : "No disponible"}</p>

      <h2 className="text-xl font-semibold mt-6">Resumen del Pedido:</h2>
      {paymentDetails.items?.length > 0 ? (
        <ul className="mt-2 list-disc list-inside">
          {paymentDetails.items.map((item, index) => (
            <li key={index}>
              {item.quantity}x {item.title} - {parseInt(item.unit_price).toLocaleString()} COP
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay información del pedido.</p>
      )}

      <div className="mt-6">
        <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
