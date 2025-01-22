"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();

  const collection_id = searchParams.get("collection_id");
  const collection_status = searchParams.get("collection_status");
  const payment_id = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const external_reference = searchParams.get("external_reference");
  const payment_type = searchParams.get("payment_type");
  const merchant_order_id = searchParams.get("merchant_order_id");
  const preference_id = searchParams.get("preference_id");
  const site_id = searchParams.get("site_id");
  const processing_mode = searchParams.get("processing_mode");

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Pago Exitoso</h1>
      <p>¡Gracias por tu compra! Tu pago se ha realizado correctamente.</p>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Detalles del Pago</h2>
        <ul className="list-disc list-inside">
          <li><strong>ID de Colección:</strong> {collection_id || "N/A"}</li>
          <li><strong>Estado de la Colección:</strong> {collection_status || "N/A"}</li>
          <li><strong>ID de Pago:</strong> {payment_id || "N/A"}</li>
          <li><strong>Estado:</strong> {status || "N/A"}</li>
          <li><strong>Referencia Externa:</strong> {external_reference || "N/A"}</li>
          <li><strong>Tipo de Pago:</strong> {payment_type || "N/A"}</li>
          <li><strong>ID de Orden del Comerciante:</strong> {merchant_order_id || "N/A"}</li>
          <li><strong>ID de Preferencia:</strong> {preference_id || "N/A"}</li>
          <li><strong>ID del Sitio:</strong> {site_id || "N/A"}</li>
          <li><strong>Modo de Procesamiento:</strong> {processing_mode || "N/A"}</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Instrucciones Adicionales</h2>
        <p>
          Tu pago ha sido procesado con éxito. Recibirás un correo electrónico con la confirmación y los detalles de tu pedido. 
          Si tienes alguna pregunta, no dudes en contactarnos.
        </p>
      </section>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-500">Cargando detalles del pago...</p>}>
      <SuccessContent />
    </Suspense>
  );
}
