"use client";
import React, { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY);

export default function CheckoutButton({ orderData }) {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!orderData || orderData.length === 0) return;

    const createPreference = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/mercadopago/create-preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderData }),
        });

        const data = await res.json();
        if (data.id) {
          setPreferenceId(data.id);
        } else {
          console.error("No preference ID received", data);
        }
      } catch (error) {
        console.error("Error al crear preferencia:", error);
      } finally {
        setLoading(false);
      }
    };

    createPreference();
  }, [orderData]);

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <p className="text-gray-500">Generando orden de pago...</p>
      ) : preferenceId ? (
        <Wallet initialization={{ preferenceId }} />
      ) : (
        <p className="text-red-500">No se pudo generar la preferencia</p>
      )}
    </div>
  );
}
