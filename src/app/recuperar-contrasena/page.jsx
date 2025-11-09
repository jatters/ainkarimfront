"use client";
import React, { useState } from "react";
import RecoverPassword from "@/components/Forms/RecoverPassword";
import Link from "next/link";

export default function RecoveryPassword() {
  const [response, setResponse] = useState({ message: "" });

  return (
    <main>
      <section className="max-w-(--breakpoint-lg) mx-auto py-16 px-5 flex justify-center items-center flex-col">
        <h1 className="text-dark-green text-3xl font-semibold mb-10 text-center">
          Restablecer contraseña
        </h1>
        <p className="text-center">Ingresa tu correo electrónico para recuperar tu contraseña</p>
        <RecoverPassword setResponse={setResponse} />
        <div className="flex flex-col items-center mt-5">
        <p>
          ¿Ya tienes una cuenta? <Link href="/iniciar-sesion" className="font-semibold hover:text-light-green duration-200">Inicia sesión</Link>
        </p>
        <p>
          ¿No tienes una cuenta? <Link href="/registro" className="font-semibold hover:text-light-green duration-200">Regístrate</Link>
        </p>
        </div>
      </section>
    </main>
  );
}
