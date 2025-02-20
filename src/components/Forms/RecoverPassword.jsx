import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function RecoverPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/auth/recover-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setMessage("Correo enviado con instrucciones para recuperar tu contraseña.");
      reset();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-10 flex flex-col items-center gap-3 justify-center">
      <div className="flex  w-full min-w-64">
        <label htmlFor="email" className="sr-only">
          Correo
        </label>
        <input
          type="email"
          id="email"
          className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
            errors.email ? "border-red-500" : "border"
          }`}
          placeholder="Ingresa tu correo electrónico"
          {...register("email", {
            required: {
              value: true,
              message: "El correo es requerido",
            },
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "El correo no es válido",
            },
          })}
        />
        {errors.email && (
          <span className="text-sm text-red-600 mt-2 pl-1 block">
            {errors.email.message}
          </span>
        )}
      </div>

      {message && <p className="text-green-600 text-center">{message}</p>}
      {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}

      <button type="submit" className="-bg--dark-green text-white py-2 px-4 rounded-md hover:-bg--light-green transition duration-200" disabled={loading}>
        {loading ? "Enviando..." : "Recuperar contraseña"}
      </button>
    </form>
  );
}
