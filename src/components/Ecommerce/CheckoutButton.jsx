"use client";
import React, { useState } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";

initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY);

export default function CheckoutButton({
  orderData,
  formData,
  formValid,
  triggerValidation,
  onBeforePayment,
  coupon,
}) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!formValid) {
      triggerValidation();
      return;
    }

    setLoading(true);
    try {
      const customerData =
        typeof onBeforePayment === "function"
          ? await onBeforePayment()
          : formData;

      if (!customerData || !customerData.email) {
        throw new Error(
          "Los datos del cliente son inválidos o están incompletos."
        );
      }

      const res = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderData,
          customer: formData,
          coupon,
        }),
      });

      const data = await res.json();

      if (data.id) {
        window.location.href = `https://www.mercadopago.com.co/checkout/v1/redirect?preference-id=${data.id}`;
      } else {
        console.error("❌ No se recibió un ID de preferencia", data);
      }
    } catch (error) {
      console.error("❌ Error en el proceso de pago:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handlePayment}
        className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${
          loading ? "opacity-50" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Generando orden de pago..." : "Pagar con Mercado Pago"}
      </button>
    </div>
  );
}
