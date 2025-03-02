"use client";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { Link } from "next-view-transitions";

export default function PendingPage({ searchParams }) {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useContext(CartContext);
  useEffect(() => {
    async function fetchPaymentDetails() {
      try {
        const response = await fetch(
          `/api/mercadopago/get-payment?payment_id=${searchParams.payment_id}`
        );
        const data = await response.json();
        setPaymentDetails(data);
        clearCart();
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
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-700">
          Cargando detalles del pago...
        </p>
      </div>
    );
  }

  if (!paymentDetails) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-yellow-500">
          Pago Pendiente ⏳
        </h1>
        <p>
          No se encontraron detalles del pago. Por favor, revisa nuevamente más
          tarde.
        </p>
      </div>
    );
  }
  const {
    id: paymentIdResponse,
    status,
    payer,
    items,
    method,
    card,
    date,
    amount,
    order,
  } = paymentDetails;

  return (
    <div className="max-w-3xl mx-auto py-16 shadow-lg px-5 rounded-t-lg text-gray-700 mt-10">
      <h1 className="text-3xl font-bold text-yellow-500 text-center">
        Pago en verificación ⏳
      </h1>
      <p className="mt-5">
        {payer?.name ? (
          <span className="font-bold">
            {payer.name} {payer.surname || ""}
          </span>
        ) : (
          ""
        )}{" "}
        Estamos verificando tu pago, recibirás una confirmación tan pronto se
        apruebe.
      </p>
      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold text-gray-800">
          📦 Resumen de tu pedido
        </h2>
        {items.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex justify-between border-b pb-2">
                <span>
                  {item.quantity}x {item.title || "Producto"}
                </span>
                <span className="font-semibold">
                  ${parseInt(item.unit_price * item.quantity).toLocaleString()}{" "}
                  <sup>COP</sup>
                </span>
              </li>
            ))}
            <li className="flex justify-between  pb-2">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">
                ${amount?.toLocaleString()} <sup>COP</sup>
              </span>
            </li>
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No hay información del pedido.</p>
        )}
      </div>

      {/* Detalles del Pago */}
      <div className="mt-6 border-t pt-4">
        <div className="flex items-center mb-3">
          <span className="text-xl">💳 </span>
          <h2 className="text-xl font-semibold text-gray-800">
            Detalles del Pago
          </h2>
        </div>
        <p>
          <strong>ID del Pago:</strong> {paymentIdResponse || "No disponible"}
        </p>
        <p>
          <strong>Pedido:</strong> {order.external_reference || "No disponible"}
        </p>
        <p>
          <strong>Estado: </strong>
          <span
            className={`font-semibold ${
              status === "in_process" ? "text-yellow-500" : "text-red-600"
            }`}
          >
            {status === "in_process" ? "En proceso" : "No disponible"}
          </span>
        </p>
        <p>
          <strong>Monto:</strong> ${amount?.toLocaleString()} COP
        </p>
        <p>
          <strong>Método de pago:</strong>{" "}
          {method.id?.toUpperCase() || "No disponible"}
        </p>
        {card && (
          <>
            <p>
              <strong>Tarjeta:</strong> ******
              {card?.last_four_digits || "****"}
            </p>
            <p>
              <strong>Tipo:</strong>{" "}
              {card?.tags?.includes("credit")
                ? "Tarjeta de Crédito"
                : "Tarjeta de Débito"}
            </p>
          </>
        )}
        <p>
          <strong>Fecha de compra:</strong>{" "}
          {date ? new Date(date).toLocaleString("es-CO") : "No disponible"}
        </p>
      </div>
      {/* Datos del Cliente */}
      <div className="mt-6 border-t pt-4">
        <div className="flex items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            👤 Datos de Cliente
          </h2>
        </div>
        <p>
          <strong>Nombre:</strong>{" "}
          <span className="capitalize">
            {payer?.name || "Cliente"} {payer?.surname || ""}
          </span>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <span className="lowercase">{payer?.email || "No disponible"}</span>
        </p>
        <p>
          <strong>Teléfono:</strong> {payer?.phone || "No disponible"}
        </p>
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="-bg--dark-green text-white px-6 py-3 rounded-md hover:-bg--light-green transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
