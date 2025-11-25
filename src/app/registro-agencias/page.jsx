"use client";
import React, { useState } from "react";
import AgencyRegisterForm from "@/components/Forms/AgencyRegisterForm";

export default function RegistroAgencias() {
  const [isRegistered, setIsRegistered] = useState(false);

  if (isRegistered) {
    return (
      <main>
        <section className="container min-h-[calc(100vh-30rem)] mx-auto py-24 max-w-3xl px-5 text-center text-gray-700 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold text-dark-green mb-4">
            ¡Gracias por registrarte!
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Hemos recibido tu información correctamente. Nuestro equipo validará
            los datos de tu agencia y, una vez aprobada, te informaremos por
            correo electrónico.
          </p>
          <p className="text-gray-500 text-sm mt-6">
            Este proceso puede tardar hasta 2 días hábiles.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="container mx-auto py-12 max-w-5xl px-5 md:px-10 text-gray-600">
        <h1 className="text-2xl lg:text-4xl font-bold text-dark-green mb-5 text-center">
          Conviértete en Agencia Aliada del Viñedo Ain Karim
        </h1>
        <div className="prose-base">
          <p className="mb-5">
            En <strong className="text-dark-green">Viñedo Ain Karim</strong>{" "}
            trabajamos de la mano con agencias de viajes para ofrecer
            experiencias inolvidables a nuestros visitantes. Si eres una agencia
            registrada, completa el siguiente formulario y adjunta los
            documentos solicitados para validar tu información.
          </p>
          <p>
            Una vez verificada tu inscripción, podrás acceder a beneficios
            exclusivos, incluyendo descuentos especiales en todas las reservas.
            Todas las solicitudes están sujetas a verificación de los requisitos
            legales y comerciales por parte de nuestro equipo antes de la
            aprobación final, de la cual te notificaremos a través de correo
            electrónico.
          </p>
          <p className="font-semibold">Documentos requeridos:</p>
          <ul className="list-disc">
            <li>RUT (Actualizado)</li>
            <li>Cámara de Comercio (No mayor a 30 días)</li>
            <li>
              Registro Nacional de Turismo (Vigente)
            </li>
          </ul>
        </div>
        <AgencyRegisterForm onSuccess={() => setIsRegistered(true)} />
      </section>
    </main>
  );
}
