"use client";

import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";

export default function MyAccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/iniciar-sesion");
    }
  }, [user, loading, router]);

  // ✅ Asegurar que `formData` se llene cuando `user` está disponible
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName.toUpperCase() || "",
        middleName: user.middleName.toUpperCase() || "",
        lastName: user.lastName.toUpperCase() || "",
        secondLastName: user.secondLastName.toUpperCase() || "",
        email: user.email || "",
        document: user.document || "",
        documentType: user.documentType || "",
        mobile: user.mobile || "",
        address: user.address || "",
        department: user.department || "",
        city: user.city || "",
        bornDate: user.bornDate || "",
        gender: user.gender || "",
        allowMarketing: user.allowMarketing || false,
      });
    }
  }, [user]);

  if (loading)
    return (
      <div className="container mx-auto py-16 px-5">
        <p className="text-center py-10 text-2xl">Cargando...</p>
      </div>
    );

  if (!formData) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (password && password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      setUpdating(false);
      return;
    }

    try {
      const response = await fetch(`/api/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, password: password || undefined }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el perfil");
      }

      setSuccessMessage("Perfil actualizado correctamente.");
      setEditMode(false);
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <main className="container mx-auto py-16 px-5 min-h-1.5">
      <h1 className="text-center font-bold text-4xl -text--dark-green">
        Hola,{" "}
        <span className="capitalize font-bold">
          {formData?.firstName
            ? formData?.firstName
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())
            : ""}
        </span>{" "}
        <span className="capitalize font-bold">
          {formData?.lastName
            ? formData?.lastName
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())
            : ""}
        </span>
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6 mt-8">
        {!editMode ? (
          // 🔹 Vista de solo lectura
          <>
            <p>
              <strong>Email:</strong> {formData?.email}
            </p>
            <p>
              <strong>Documento:</strong> {formData?.documentType}:{" "}
              {formData?.document}{" "}
            </p>
            <p>
              <strong>Celular:</strong> {formData?.mobile}
            </p>
            <p>
              <strong>Dirección:</strong> {formData?.address}, {formData?.city},{" "}
              {formData?.department}
            </p>
            <p>
              <strong>Fecha de Nacimiento:</strong> {formData?.bornDate}
            </p>
            <p>
              <strong>Género:</strong> {formData?.gender}
            </p>
            <p>
              <strong>Permitir envío de mensajes de marketing:</strong>{" "}
              {formData?.allowMarketing ? "Sí" : "No"}
            </p>
            <div className="flex items-center gap-5">
              <button
                onClick={() => setEditMode(true)}
                className="mt-5 -bg--dark-green text-white py-2 px-5 rounded-md hover:-bg--light-green duration-200"
              >
                Editar mi perfil
              </button>
              <button
                onClick={logout}
                className="mt-5 bg-red-600 text-white py-2 px-5 rounded-md hover:bg-red-700 transition"
              >
                Cerrar Sesión
              </button>
            </div>
          </>
        ) : (
          // 🔹 Formulario de edición
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block font-semibold">Nombre</label>
              <input
                type="text"
                name="firstName"
                value={formData?.firstName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md uppercase"
              />
            </div>

            <div>
              <label className="block font-semibold">Segundo Nombre</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md uppercase"
              />
            </div>

            <div>
              <label className="block font-semibold">Apellido</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md uppercase"
              />
            </div>

            <div>
              <label className="block font-semibold">Segundo Apellido</label>
              <input
                type="text"
                name="secondLastName"
                value={formData.secondLastName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md uppercase"
              />
            </div>

            <div>
              <label className="block font-semibold">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <div className="relative ">
                <label className="block font-semibold">Nueva Contraseña</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md"
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
            </div>

            <div className="relative">
              <label className="block font-semibold">
                Confirmar Contraseña
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
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

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                disabled={updating}
              >
                {updating ? "Guardando..." : "Guardar Cambios"}
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
