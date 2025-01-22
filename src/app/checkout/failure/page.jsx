"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function FailureContent() {
  const searchParams = useSearchParams();

  const collection_id = searchParams.get("collection_id");
  const status = searchParams.get("status");
  const external_reference = searchParams.get("external_reference");

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Pago Fallido</h1>
      <p>
        Lamentablemente, hubo un problema con tu pago. Por favor, intenta nuevamente o contacta con 
        soporte si el problema persiste.
      </p>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Detalles del Intento de Pago</h2>
        <ul className="list-disc list-inside">
          <li><strong>ID de Colección:</strong> {collection_id || "N/A"}</li>
          <li><strong>Estado:</strong> {status || "N/A"}</li>
          <li><strong>Referencia Externa:</strong> {external_reference || "N/A"}</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Instrucciones Adicionales</h2>
        <p>
          Por favor, revisa tus datos de pago o intenta usar otro método de pago. Si necesitas ayuda, 
          contáctanos para asistirte en el proceso.
        </p>
      </section>
    </main>
  );
}

export default function FailurePage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-500">Cargando detalles del pago...</p>}>
      <FailureContent />
    </Suspense>
  );
}
