"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { Tooltip } from "@mui/material";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include", // 🔥 Necesario para enviar y recibir cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Correo o contraseña incorrectos");
      }

      // Redirigir al usuario a /mi-cuenta después del login exitoso
      router.push("/mi-cuenta");
    } catch (error) {
      console.error("Error en el login:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-items-center space-y-4 mt-5 w-full max-w-xs"
      aria-label="Formulario Iniciar sesión"
    >
      <label htmlFor="email" className="sr-only">Correo</label>
      <input
        type="email"
        id="email"
        placeholder="Correo electrónico"
        aria-label="Correo electrónico"        
        className="border border-gray-300 px-5 py-3 rounded-md"
        {...register("email", {
          required: "El correo es requerido",
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Correo electrónico inválido",
          },
        })}
      />
      {errors.email && (
        <span className="text-sm text-red-600">{errors.email.message}</span>
      )}
      <div className="flex flex-col gap-3 w-full ">
        <div className="relative w-full">
          <label htmlFor="password" className="sr-only">
            Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Contraseña"
            aria-label="Contraseña"
            className="border border-gray-300 px-5 py-3 rounded-md w-full"
            {...register("password", {
              required: "La contraseña es requerida",
            })}
          />
          <Tooltip
            title={showPassword ?  "Ocultar contraseña": "Mostrar contraseña" }            
          >
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? (
                <span
                  className="icon-[ri--eye-close-line]"
                  role="img"
                  aria-hidden="true"
                />
              ) : (
                <span
                  className="icon-[bi--eye]"
                  role="img"
                  aria-hidden="true"
                />
              )}
            </button>
          </Tooltip>
        </div>
        {errors.password && (
          <span className="text-sm text-red-600">
            {errors.password.message}
          </span>
        )}

        {errorMessage && (
          <span className="text-sm text-red-600 text-center">
            {errorMessage}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="-bg--dark-green py-3 px-4 rounded-md text-white"
        disabled={loading}
      >
        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
