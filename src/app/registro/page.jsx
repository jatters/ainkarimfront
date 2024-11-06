"use client";
import RegisterForm from "@/components/Forms/RegisterForm";

export default function RegisterPage() {
  return (
    <main>
      <section className="container mx-auto py-16 px-5">
        <h1 className="-text--dark-green text-3xl font-semibold">
          Crea tu cuenta
        </h1>
        <RegisterForm />
      </section>
    </main>
  );
}
