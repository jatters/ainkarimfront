"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function FailurePage() {
  const params = useSearchParams();
  const router = useRouter();
  const payment_id = params.get("payment_id");

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorFetch, setErrorFetch] = useState(false);

  const formatPrice = (val) =>
    `$${Number(val).toLocaleString("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;

  useEffect(() => {
    if (!payment_id) {
      setErrorFetch(true);
      setLoading(false);
      return;
    }
    fetch(`/api/mercadopago/get-payment?payment_id=${payment_id}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo obtener el pago");
        return res.json();
      })
      .then((data) => setDetails(data))
      .catch(() => setErrorFetch(true))
      .finally(() => setLoading(false));
  }, [payment_id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-700">
          Cargando detalles del pago...
        </p>
      </div>
    );
  }

  if (errorFetch || !details) {
    return (
      <div className="container min-h-96 mx-auto p-6 text-center flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">Pago Rechazado</h1>
        <p className="mt-4">
          No pudimos obtener la información de tu pago. Por favor, inténtalo de
          nuevo o{" "}
          <Link href="/finalizar-compra" className="text-blue-600 underline">
            vuelve a la página de pago
          </Link>
          .
        </p>
      </div>
    );
  }

  const {
    payer = {},
    items = [],
    amount,
    order = {},
    id: paymentIdResponse,
    status,
    method = {},
    card,
    date,
  } = details;

  return (
    <div className="max-w-3xl mx-auto py-16 shadow-lg px-5 rounded-t-lg text-gray-700 mt-10 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-red-600">Pago Rechazado</h1>
      <p className="mt-5">
        {payer.name || payer.surname ? (
          <span className="font-bold capitalize">
            {payer.name} {payer.surname}
          </span>
        ) : (
          "Estimado cliente"
        )}{" "}
        Tu pago no pudo procesarse. Por favor revisa los datos e intenta de
        nuevo.
      </p>

      <section className="mt-6 border-t pt-4 w-full">
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
          <p className="text-gray-500 mt-2">No hay información de ítems.</p>
        )}
      </section>

      <section className="mt-6 border-t pt-4 w-full">
        <h2 className="text-xl font-semibold">💳 Detalles del pago</h2>
        <p>
          <strong>ID:</strong> {paymentIdResponse}
        </p>
        <p>
          <strong>Pedido:</strong> {order.external_reference || "No disponible"}
        </p>
        <p>
          <strong>Estado:</strong>{" "}
          <span
            className={`font-semibold ${
              status === "rejected" ? "text-red-600" : "text-gray-800"
            }`}
          >
            {status}
          </span>
        </p>
        <p>
          <strong>Método:</strong> {method.id?.toUpperCase() || "No disponible"}
        </p>
        {card && (
          <>
            <p>
              <strong>Tarjeta:</strong> **** **** **** {card.last_four_digits}
            </p>
            <p>
              <strong>Tipo:</strong>{" "}
              {card.tags?.includes("credit") ? "Crédito" : "Débito"}
            </p>
          </>
        )}
        <p>
          <strong>Fecha:</strong>{" "}
          {date
            ? new Date(date).toLocaleString("es-CO", {
                dateStyle: "medium",
                timeStyle: "short",
              })
            : "No disponible"}
        </p>
      </section>

      <div className="mt-8 flex justify-center items-center gap-4 w-full">
        <button
          onClick={() => router.push("/finalizar-compra")}
          className="-bg--dark-green text-white px-6 py-2 rounded hover:-bg--light-green transition duration-200"
        >
          Reintentar pago
        </button>
        <Link
          href="/contacto"
          className="text-gray-700 hover:text-gray-900 duration-200 hover:underline"
        >
          ¿Necesitas ayuda?
        </Link>
      </div>
    </div>
  );
}
