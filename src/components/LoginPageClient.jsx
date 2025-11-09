"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../app/hooks/useAuth";
import Link from "next/link";
import banner from "../../public/login-image.webp";
import LoginForm from "@/components/Forms/LoginForm";

export default function LoginPageClient() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/mi-cuenta");
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="container mx-auto py-16 px-5">
        <p className="text-center text-2xl py-10">Cargando...</p>
      </div>
    );
  if (user) return null;
  return (
    <main>
      <section className="grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center">
        <Image
          src={banner}
          alt="Banner Login"
          className="hidden lg:block h-screen object-cover"
        />
        <div className="py-20 md:py-10 px-5 flex flex-col justify-center items-center">
          <h1 className="text-dark-green text-3xl text-center font-bold">
            Iniciar Sesión
          </h1>
          <p className="font-semibold py-5 text-center">
            Inicia sesión para acceder a tu cuenta
          </p>
          <LoginForm />
          <div>
            <p className="text-center py-5">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/registro"
                className="text-dark-green font-semibold"
              >
                Registrate
              </Link>
            </p>
            <p className="text-center py-5">
              <Link
                href={"/recuperar-contrasena"}
                className="text-dark-green hover:underline duration-200"
              >
                Olvidaste tu contraseña{" "}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
