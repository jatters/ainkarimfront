"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PendingContent() {
  const searchParams = useSearchParams();

  const collection_id = searchParams.get("collection_id");
  const status = searchParams.get("status");
  const external_reference = searchParams.get("external_reference");

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Pago Pendiente</h1>
      <p>
        Tu pago está pendiente de confirmación. Recibirás una notificación una vez que se 
        procese el pago.
      </p>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Detalles del Pago Pendiente</h2>
        <ul className="list-disc list-inside">
          <li><strong>ID de Colección:</strong> {collection_id || "N/A"}</li>
          <li><strong>Estado:</strong> {status || "N/A"}</li>
          <li><strong>Referencia Externa:</strong> {external_reference || "N/A"}</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Instrucciones Adicionales</h2>
        <p>
          Una vez que tu pago sea confirmado, recibirás un correo electrónico con la confirmación 
          y los detalles de tu pedido. Si tienes preguntas, por favor contáctanos.
        </p>
      </section>
    </main>
  );
}

export default function PendingPage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-500">Cargando detalles del pago...</p>}>
      <PendingContent />
    </Suspense>
  );
}
