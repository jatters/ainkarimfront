"use client";
import RegisterForm from "@/components/Forms/RegisterForm";

export default function RegisterPage() {
  return (
    <main>
      <section className="max-w-5xl mx-auto py-16 px-5">
        <h1 className="text-dark-green text-3xl font-semibold mb-10">
          Crea tu cuenta
        </h1>
        <p>Diligencia el siguiente formulario para crear tu cuenta</p>
        <RegisterForm />
      </section>
    </main>
  );
}