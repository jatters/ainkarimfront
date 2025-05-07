"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tooltip } from "@mui/material";
import useAuth from "../hooks/useAuth";

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
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/iniciar-sesion");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName?.toUpperCase() || "",
        middleName: user.middleName?.toUpperCase() || "",
        lastName: user.lastName?.toUpperCase() || "",
        secondLastName: user.secondLastName?.toUpperCase() || "",
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

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-5">
        <p className="text-center py-10 text-2xl">Cargando...</p>
      </div>
    );
  }

  if (!formData) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (data) => {
    const newErrors = {};

    const today = new Date();
    const birthDate = new Date(data.bornDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (!data.firstName.trim()) {
      newErrors.firstName = "El nombre es obligatorio.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúüÜñÑ\s]+$/.test(data.firstName.trim())) {
      newErrors.firstName = "El nombre solo debe contener letras.";
    }
    if (!data.lastName.trim()) {
      newErrors.lastName = "El apellido es obligatorio.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúüÜñÑ\s]+$/.test(data.lastName.trim())) {
      newErrors.lastName = "El apellido solo debe contener letras.";
    }
    if (!data.email.trim()) {
      newErrors.email = "El correo es obligatorio.";
    } else if (
      !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(data.email.trim())
    ) {
      newErrors.email = "Ingresa un correo válido.";
    }
    if (!data.gender.trim()) {
      newErrors.gender = "El género es obligatorio.";
    }
    if (!data.mobile.trim()) {
      newErrors.mobile = "El celular es obligatorio.";
    } else if (!/^[0-9]{10,}$/.test(data.mobile.trim())) {
      newErrors.mobile = "El celular debe tener al menos 10 dígitos numéricos.";
    }
    if (!data.document.trim()) {
      newErrors.document = "El documento es obligatorio.";
    }
    if (!data.city.trim()) {
      newErrors.city = "La ciudad es obligatoria.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúüÜñÑ\s]+$/.test(data.city.trim())) {
      newErrors.city = "La ciudad solo debe contener letras.";
    }
    if (!data.address.trim()) {
      newErrors.address = "La dirección es obligatoria.";
    }
    if (!data.department.trim()) {
      newErrors.department = "El departamento es obligatorio.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúüÜñÑ\s]+$/.test(data.department.trim())) {
      newErrors.department = "El departamento solo debe contener letras.";
    }
    if (!data.bornDate) {
      newErrors.bornDate = "La fecha de nacimiento es obligatoria.";
    } else if (isNaN(birthDate.getTime())) {
      newErrors.bornDate = "La fecha de nacimiento no es válida.";
    } else if (age < 18) {
      newErrors.bornDate = "Debes ser mayor de 18 años.";
    }

    return newErrors;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setUpdating(true);

    const dataToValidate = {
      ...formData,

      firstName: formData.firstName.trim(),
      middleName: formData.middleName.trim(),
      lastName: formData.lastName.trim(),
      secondLastName: formData.secondLastName.trim(),
      email: formData.email.trim(),
    };
    const newErrors = validateForm(dataToValidate);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setUpdating(false);
      return;
    }

    const finalData = {
      ...formData,
      firstName: formData.firstName.toUpperCase(),
      middleName: formData.middleName.toUpperCase(),
      lastName: formData.lastName.toUpperCase(),
      secondLastName: formData.secondLastName.toUpperCase(),
      email: formData.email.trim().toLowerCase(),
      password: password || undefined,
    };

    if (password && password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      setUpdating(false);
      return;
    }

    try {
      const response = await fetch(`/api/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
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
    <main className="max-w-screen-lg mx-auto py-16 px-5">
      <h1 className="font-bold text-4xl -text--dark-green mb-5">
        Hola,{" "}
        <span className="capitalize font-bold">
          {formData?.firstName
            ? formData.firstName
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())
            : ""}
        </span>{" "}
        <span className="capitalize font-bold">
          {formData?.lastName
            ? formData.lastName
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())
            : ""}
        </span>
      </h1>
      <p className="prose-base">
        En esta sección encuentras la información de tu perfil. Mantenla
        actualizada para disfrutar de todos los beneficios que el{" "}
        <span className="text--dark-green font-semibold">Viñedo Ain Karim</span>{" "}
        tiene para ti.
      </p>

      <div className="mx-auto bg-white shadow-md border border-slate-100 rounded-md p-6 mt-8">
        {!editMode ? (
          <div className="grid grid-cols-1 gap-3">
            <p>
              <span className="font-semibold">Nombre:</span>{" "}
              <span className="uppercase">
                {`${formData?.firstName} ${formData?.middleName || ""} ${
                  formData?.lastName
                } ${formData?.secondLastName || ""}`}
              </span>
            </p>
            <p>
              <span className="font-semibold">Correo electrónico:</span>{" "}
              {formData?.email || ""}
            </p>
            <p>
              <span className="font-semibold">Documento:</span>{" "}
              {`${formData?.documentType} ${formData?.document}`}
            </p>
            <p>
              <span className="font-semibold">Celular:</span>{" "}
              {formData?.mobile || ""}
            </p>
            <p>
              <span className="font-semibold">Dirección:</span>{" "}
              {`${formData?.address || ""} - ${formData?.city || ""}, ${
                formData?.department || ""
              }`}
            </p>
            <p>
              <span className="font-semibold">Fecha de nacimiento:</span>{" "}
              {formData?.bornDate || ""}
            </p>
            <p>
              <span className="font-semibold">Género:</span>{" "}
              {formData?.gender || ""}
            </p>
            <p>
              <span className="font-semibold">
                Autorizas recibir mensajes de marketing:
              </span>{" "}
              {formData?.allowMarketing ? (
                <span className="-text--light-green font-semibold">
                  Sí autorizo
                </span>
              ) : (
                <span className="-text--light-red font-semibold">
                  No autorizo
                </span>
              )}
            </p>
            <div className="flex items-center flex-wrap gap-5 mt-5">
              <button
                onClick={() => setEditMode(true)}
                className=" -bg--dark-green text-white py-2 px-6 rounded-md hover:-bg--light-green duration-200 text-sm"
              >
                Actualizar mi perfil
              </button>
              <button
                onClick={logout}
                className="-text--light-red font-semibold rounded-md hover:underline transition duration-200"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleUpdateProfile}
            className="grid grid-cols-2 gap-5 items-center"
          >
            <div>
              <label className="block font-semibold">Nombre</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md uppercase ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Segundo Nombre</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md uppercase ${
                  errors.middleName ? "border-red-500" : ""
                }`}
              />
              {errors.middleName && (
                <p className="text-red-500 text-sm">{errors.middleName}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Apellido</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md uppercase ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Segundo Apellido</label>
              <input
                type="text"
                name="secondLastName"
                value={formData.secondLastName}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md uppercase ${
                  errors.secondLastName ? "border-red-500" : ""
                }`}
              />
              {errors.secondLastName && (
                <p className="text-red-500 text-sm">{errors.secondLastName}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Tipo de Documento</label>
              <input
                type="text"
                name="documentType"
                value={formData.documentType}
                readOnly
                className="w-full border px-3 py-2 rounded-md bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-semibold">Documento</label>
              <input
                type="text"
                name="document"
                value={formData.document}
                readOnly
                className="w-full border px-3 py-2 rounded-md bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-semibold">Género</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md ${
                  errors.gender ? "border-red-500" : ""
                }`}
              >
                <option value="">Selecciona tu género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Celular</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md ${
                  errors.mobile ? "border-red-500" : ""
                }`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm">{errors.mobile}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Fecha de nacimiento</label>
              <input
                type="date"
                name="bornDate"
                value={formData.bornDate}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md ${
                  errors.bornDate ? "border-red-500" : ""
                }`}
              />
              {errors.bornDate && (
                <p className="text-red-500 text-sm">{errors.bornDate}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Ciudad</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md ${
                  errors.city ? "border-red-500" : ""
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Departamento</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md ${
                  errors.department ? "border-red-500" : ""
                }`}
              />
              {errors.department && (
                <p className="text-red-500 text-sm">{errors.department}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Dirección</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md ${
                  errors.address ? "border-red-500" : ""
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            <div className="flex items-center">
              <label className="block font-semibold mr-2">
                Autorizas a recibir mensajes de marketing
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="allowMarketing"
                  checked={formData.allowMarketing}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded-md"
                />
                <span className="text-sm">
                  {formData.allowMarketing ? (
                    <span className="-text--light-green font-semibold">
                      Sí autorizo
                    </span>
                  ) : (
                    <span className="-text--light-red font-semibold">
                      No autorizo
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="relative">
              <label className="block font-semibold">Nueva Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  setErrorMessage("");
                }}
                className="w-full border px-3 py-2 rounded-md"
              />
              <Tooltip
                title={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
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
              <label className="block font-semibold">
                Confirmar Contraseña
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);

                  setErrorMessage("");
                }}
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

            <div className="flex flex-col gap-2 col-span-2">
              {errorMessage && (
                <p className="text-red-500 font-semibold">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-green-500">{successMessage}</p>
              )}
            </div>

            <div className="flex gap-5 justify-end col-span-2">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="text-sm -text--light-red font-semibold py-2 px-4 rounded-md hover:underline transition duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="-bg--light-green text-sm text-white py-1.5 px-4 rounded-md hover:bg-green-700 transition duration-200"
                disabled={updating}
              >
                {updating ? "Actualizando..." : "Guardar Cambios"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
