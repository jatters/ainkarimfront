"use client";
import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";

export default function PendingPage() {
  const params = useSearchParams();
  const payment_id = params.get("payment_id");
  const { clearCart } = useContext(CartContext);

  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorFetch, setErrorFetch] = useState(false);

  useEffect(() => {
    if (!payment_id) {
      setLoading(false);
      setErrorFetch(true);
      return;
    }

    fetch(`/api/mercadopago/get-payment?payment_id=${payment_id}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo obtener el pago");
        return res.json();
      })
      .then((data) => {
        setPaymentDetails(data);
        // Solo limpiar carrito si hay datos válidos:
        if (data && data.status === "in_process") {
          clearCart();
        }
      })
      .catch((err) => {
        console.error("Error fetching payment details:", err);
        setErrorFetch(true);
      })
      .finally(() => setLoading(false));
  }, [payment_id, clearCart]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-700">
          Cargando detalles del pago...
        </p>
      </div>
    );
  }

  if (errorFetch || !payment_id) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-yellow-500">
          Pago Pendiente ⏳
        </h1>
        <p className="mt-4">
          No pudimos obtener la información de tu pago. Por favor, inténtalo de
          nuevo o{" "}
          <Link href="/contacto" className="text-blue-600 underline">
            contáctanos
          </Link>
          .
        </p>
      </div>
    );
  }

  const {
    status,
    payer = {},
    items = [],
    amount,
    order = {},
    method = {},
  } = paymentDetails;

  const formatPrice = (val) =>
    `$${Number(val).toLocaleString("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;

  return (
    <div className="max-w-3xl mx-auto py-16 shadow-lg px-5 rounded-t-lg text-gray-700 mt-10">
      <h1 className="text-3xl font-bold text-yellow-500 text-center">
        Pago en verificación ⏳
      </h1>
      <p className="mt-5 text-center">
        {payer.name && (
          <span className="font-bold capitalize">
            {payer.name} {payer.surname}
          </span>
        )}{" "}
        Estamos verificando tu pago. Te avisaremos en cuanto esté aprobado.
      </p>

      <section className="mt-8 border-t pt-4">
        <h2 className="text-xl font-semibold">📦 Resumen de tu pedido</h2>
        {items.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {items.map((item, i) => (
              <li key={i} className="flex justify-between border-b pb-2">
                <span>
                  {item.quantity}× {item.title}
                </span>
                <span className="font-semibold">
                  {formatPrice(item.unit_price * item.quantity)} COP
                </span>
              </li>
            ))}
            <li className="flex justify-between pt-2 font-semibold">
              <span>Total:</span>
              <span>{formatPrice(amount)} COP</span>
            </li>
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No hay detalles de ítems.</p>
        )}
      </section>

      <section className="mt-8 border-t pt-4">
        <h2 className="text-xl font-semibold">💳 Detalles del pago</h2>
        <p>
          <strong>ID:</strong> {payment_id}
        </p>
        <p>
          <strong>Pedido:</strong> {order.external_reference || "No disponible"}
        </p>
        <p>
          <strong>Estado:</strong>{" "}
          <span
            className={`font-semibold ${
              status === "in_process" ? "text-yellow-500" : "text-red-600"
            }`}
          >
            {status === "in_process" ? "En proceso" : status}
          </span>
        </p>
        <p>
          <strong>Método:</strong> {method.id?.toUpperCase() || "No disponible"}
        </p>
      </section>

      <section className="mt-8 border-t pt-4">
        <h2 className="text-xl font-semibold">👤 Datos del cliente</h2>
        <p>
          <strong>Nombre:</strong>{" "}
          {payer.name ? `${payer.name} ${payer.surname}` : "No disponible"}
        </p>
        <p>
          <strong>Email:</strong> {payer.email || "No disponible"}
        </p>
        <p>
          <strong>Teléfono:</strong> {payer.phone || "No disponible"}
        </p>
      </section>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="bg-dark-green text-white px-6 py-3 rounded-md hover:bg-light-green transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
