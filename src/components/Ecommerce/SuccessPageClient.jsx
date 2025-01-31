"use client";
import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { CartContext } from "@/context/CartContext";
import ConfettiWrapper from "@/components/Ecommerce/ConfettiWrapper"; 

export default function SuccessPageClient() {
  const searchParams = useSearchParams();
  const { clearCart } = useContext(CartContext);

  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPaymentDetails() {
      try {
        const paymentId = searchParams.get("payment_id");
        if (!paymentId) {
          setError("No se encontró el ID del pago.");
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/mercadopago/get-payment?payment_id=${paymentId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Error al obtener los detalles del pago."
          );
        }

        setPaymentDetails(data);

        // Limpia el carrito al confirmar
        if (typeof clearCart === "function") {
          clearCart();
        } else {
          console.warn("⚠️ clearCart no está definido en el contexto.");
        }
      } catch (error) {
        console.error("Error obteniendo detalles del pago:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPaymentDetails();
  }, [searchParams, clearCart]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-700">
          Cargando detalles del pago...
        </p>
      </div>
    );
  }

  if (error || !paymentDetails) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-red-600">
          ¡Oops! Hubo un problema ❌
        </h1>
        <p className="text-gray-600 mt-2">
          {error || "No se encontraron detalles del pago."}
        </p>
        <a
          href="/"
          className="mt-4 inline-block bg-blue-500 text-white px-5 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Volver al inicio
        </a>
      </div>
    );
  }

  const {
    id: paymentId,
    status,
    amount,
    date,
    method,
    payer,
    card,
    items = [],
  } = paymentDetails;

  return (
    <div className="max-w-3xl mx-auto py-16 px-5 bg-white shadow-lg rounded-t-lg text-gray-700 mt-10 relative">
      <h1 className="text-3xl font-sans font-bold text-green-600 text-center">
        ¡Gracias{" "}
        <span className="capitalize font-bold">
          {payer?.name || "Cliente"} {payer?.surname || ""}
        </span>! 🎉
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Tu pago ha sido procesado con éxito.
      </p>

      {/* Confetti animation */}
      <ConfettiWrapper
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold text-gray-800">📦 Resumen de tu pedido</h2>
        {items.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex justify-between border-b pb-2">
                <span>
                  {item.quantity}x {item.title || "Producto"}
                </span>
                <span className="font-semibold">
                  ${parseInt(item.unit_price).toLocaleString()} <sup>COP</sup>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">
            No hay información del pedido.
          </p>
        )}
      </div>

      {/* 💳 Detalles del Pago */}
      <div className="mt-6 border-t pt-4">
        <div className="flex items-center mb-3">
          <span className="text-xl">💳 </span>
          <h2 className="text-xl font-semibold text-gray-800">
            Detalles del Pago
          </h2>
        </div>
        <p>
          <strong>ID del Pago:</strong> {paymentId || "No disponible"}
        </p>
        <p>
          <strong>Estado: </strong>
          <span
            className={`font-semibold ${
              status === "approved" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status === "approved" ? "Aprobado" : "No disponible"}
          </span>
        </p>
        <p>
          <strong>Monto:</strong> ${amount?.toLocaleString()} COP
        </p>
        <p>
          <strong>Método de pago:</strong>{" "}
          {method?.toUpperCase() || "No disponible"}
        </p>
        <p>
          <strong>Tarjeta:</strong>{" "}
          {card?.first_six_digits || "XXXX"}******{card?.last_four_digits || "****"}
        </p>
        <p>
          <strong>Tipo:</strong>{" "}
          {card?.tags?.includes("credit") ? "Tarjeta de Crédito" : "Tarjeta de Débito"}
        </p>
        <p>
          <strong>Fecha de compra:</strong>{" "}
          {date ? new Date(date).toLocaleString("es-CO") : "No disponible"}
        </p>
      </div>

      {/* 👤 Datos del Cliente */}
      <div className="mt-6 border-t pt-4">
        <div className="flex items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-800">👤 Datos de Cliente</h2>
        </div>
        <p>
          <strong>Nombre:</strong>{" "}
          <span className="capitalize">
            {payer?.name || "Cliente"} {payer?.surname || ""}
          </span>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <span className="lowercase">
            {payer?.email || "No disponible"}
          </span>
        </p>
        <p>
          <strong>Teléfono:</strong> {payer?.phone || "No disponible"}
        </p>
      </div>
      <div className="mt-8 text-center">
        <a
          href="/"
          className="-bg--dark-green text-white px-6 py-3 rounded-md hover:-bg--light-green transition"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
