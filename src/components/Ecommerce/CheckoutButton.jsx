"use client";
import React, { useState } from "react";


export default function CheckoutButton({ orderData }) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      // 1. Construir el array de items para la preferencia
      //    De la doc oficial: { title, quantity, unit_price }
      const items = orderData.map((item) => ({
        title: item.name || "Producto sin nombre",
        quantity: item.quantity || 1,
        unit_price: Math.round(item.price) || 1, // En COP, enteros
      }));

      const res = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          backUrls: {
            success: process.env.MP_BACK_URL_SUCCESS || "https://default-success-url.com",
            failure: process.env.MP_BACK_URL_FAILURE || "https://default-failure-url.com",
            pending: process.env.MP_BACK_URL_PENDING || "https://default-pending-url.com",
          },
        }),
      });

      const data = await res.json();
      if (data.init_point) {
        // 2. Redireccionar a la URL de pago de MP
        window.location.href = data.init_point;
      } else {
        console.error("No init_point recibido", data);
      }
    } catch (error) {
      console.error("Error al crear preferencia:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition"
    >
      {loading ? "Procesando..." : "Pagar con Mercado Pago"}
    </button>
  );
}

