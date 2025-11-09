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
  discount,
  total,
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
          discount,
          total,
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
    <div className="flex flex-col items-center mt-8">
      <button
        onClick={handlePayment}
        className={`bg-light-green text-white py-2 rounded-lg w-full hover:bg-dark-green duration-200 font-medium transition ${
          loading ? "opacity-50" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Redirigiendo al pago..." : "Paga ahora"}
      </button>
    </div>
  );
}
