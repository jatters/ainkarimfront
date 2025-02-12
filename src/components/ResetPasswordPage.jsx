"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("code"); // 🔥 Obtiene el token de la URL

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    console.log("📢 Token recibido desde la URL:", token);
    if (!token) {
      setErrorMessage("El código de recuperación no es válido o ha expirado.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (!token) {
      setErrorMessage("Código de recuperación no válido o ha expirado.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    try {
      console.log("🔹 Enviando solicitud a Strapi con token:", token);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: token, // 🔥 Token de validación de Strapi
            password: password,
            passwordConfirmation: confirmPassword,
          }),
        }
      );

      const result = await response.json();
      console.log("📢 Respuesta de Strapi:", result);

      if (!response.ok) {
        if (result.error?.message === "Incorrect code provided") {
          throw new Error("Código de recuperación no válido o ha expirado.");
        }

        throw new Error(
          result.error?.message || "Error al restablecer la contraseña."
        );
      }

      setSuccessMessage(
        "Contraseña restablecida correctamente. Redirigiendo al inicio de sesión..."
      );
      setTimeout(() => {
        router.push("/iniciar-sesion"); // 🔥 Redirigir al login
      }, 3000);
    } catch (error) {
      console.error("❌ Error:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-screen-lg mx-auto py-16 px-5">
      <h1 className="text-center font-bold text-3xl -text--dark-green">
        Restablecer Contraseña
      </h1>
      <p className="text-center mt-3">Ingresa tu nueva contraseña</p>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 space-y-4 bg-white  rounded-md p-6"
      >
        {errorMessage && (
          <p className="text-center text-red-500 bg-red-100 p-3 rounded-md">
            {errorMessage}
          </p>
        )}

        {!token ? (
          <p className="text-center text-red-600 font-semibold">
            No tienes un código válido. Solicita un nuevo enlace de
            recuperación.
          </p>
        ) : (
          <>
            <div className="relative">
              <label className="block font-semibold -text--dark-green">Nueva Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
               <Tooltip
                title={
                  showPassword ?  "Ocultar contraseña" : "Mostrar contraseña" 
                }                
              >
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute pt-5 inset-y-0 right-3 flex items-center text-gray-500"
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

            <div className="relative">
              <label className="block font-semibold -text--dark-green">
                Confirmar Contraseña
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <Tooltip
                title={
                  showConfirmPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }                
              >
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute pt-5 inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? (
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

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? "Restableciendo..." : "Restablecer Contraseña"}
            </button>
          </>
        )}
      </form>
    </main>
  );
}
