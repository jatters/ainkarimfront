"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../app/hooks/useAuth";
import "@/components/Ecommerce/UseProfile.css";

export default function UserProfile({ user, onUserUpdate, shippingAddress }) {
  const { logout } = useAuth();

  // toggles de edición
  const [changeAddress, setChangeAddress] = useState(false);
  const [changePhone, setChangePhone] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);

  // mensaje de confirmación
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      mobile: user.mobile || "",
      city: user.city || "",
      address: user.address || "",
      allowMarketing: user.allowMarketing || false,
      email: user.email || "",
    },
  });

  // ⬇️ Sincroniza el formulario cuando cambie el user
  useEffect(() => {
    reset({
      mobile: user.mobile || "",
      city: user.city || "",
      address: user.address || "",
      allowMarketing: user.allowMarketing || false,
      email: user.email || "",
    });
  }, [user, reset]);

  // util para mostrar label bonito
  const labelForField = (field) => {
    switch (field) {
      case "mobile":
        return "teléfono";
      case "email":
        return "correo";
      case "address":
        return "dirección";
      case "city":
        return "ciudad";
      case "allowMarketing":
        return "preferencias de marketing";
      default:
        return field;
    }
  };

  const sendUpdate = async (partial) => {
    // llamada a tu API de actualización
    const res = await fetch("/api/updateUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user.id, updatedFields: partial }),
    });
    if (!res.ok) {
      throw new Error("Error al actualizar el usuario");
    }
    const data = await res.json();

    // 🔁 Resetea el formulario con los valores devueltos
    reset({
      mobile: data.mobile ?? user.mobile ?? "",
      city: data.city ?? user.city ?? "",
      address: data.address ?? user.address ?? "",
      allowMarketing:
        data.allowMarketing ?? user.allowMarketing ?? false,
      email: data.email ?? user.email ?? "",
    });

    // 🔼 notifica al padre (PaymentPage) para overlay inmediato
    if (typeof onUserUpdate === "function") {
      onUserUpdate(data);
    }
  };

  // Handlers por secciones
  const onSubmitPhone = async (form) => {
    try {
      await sendUpdate({ mobile: form.mobile });
      setChangePhone(false);
      setSuccessMsg("Has actualizado tu teléfono");
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmitEmail = async (form) => {
    try {
      await sendUpdate({ email: form.email });
      setChangeEmail(false);
      setSuccessMsg("Has actualizado tu correo");
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmitAddress = async (form) => {
    try {
      await sendUpdate({ address: form.address, city: form.city });
      setChangeAddress(false);
      setSuccessMsg("Has actualizado tu dirección");
    } catch (e) {
      console.error(e);
    }
  };

  // Oculta el banner de éxito a los 3s
  useEffect(() => {
    if (!successMsg) return;
    const t = setTimeout(() => setSuccessMsg(""), 3000);
    return () => clearTimeout(t);
  }, [successMsg]);

  const mobile = watch("mobile");
  const email = watch("email");
  const address = watch("address");
  const city = watch("city");

  return (
    <section>
      {/* Mensaje de éxito */}
      {successMsg && (
        <div className="mb-4 rounded border border-green-200 bg-green-50 px-4 py-2 text-green-800">
          {successMsg}
        </div>
      )}

      <div className="text-lg text-slate-600">
        Hola <span className="font-semibold">{user.firstName}</span>, verifica
        los datos con los que se realizará tu pedido:
      </div>

      <div className="mt-4 border border-slate-100 pt-5 pb-5 sm:px-5 rounded">
        {/* Cabecera */}
        <div className="flex items-center gap-2 mb-3">
          {user.gender === "Masculino" ? (
            <div className="flex self-start gap-2 bg-blue-950 rounded-full p-3">
              <span
                className="icon-[fontisto--male] w-5 h-5 text-white"
                role="img"
                aria-hidden="true"
              />
            </div>
          ) : user.gender === "Femenino" ? (
            <div className="flex items-center gap-2 bg-fuchsia-950 rounded-full p-3">
              <span
                className="icon-[icon-park-solid--women] w-5 h-5 text-white"
                role="img"
                aria-hidden="true"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-gray-700 rounded-full p-3">
              <span
                className="icon-[gridicons--user] w-5 h-5 text-white"
                role="img"
                aria-hidden="true"
              />
            </div>
          )}
          <span className="text-2xl font-semibold -text--dark-green font-serif">
            {user.firstName} {user.middleName} {user.lastName}{" "}
            {user.secondLastName}
          </span>
        </div>

        {/* Notificaciones (correo) */}
        <div className="text-sm flex flex-col gap-3 mt-4">
          <div className="font-semibold">Notificaciones:</div>
          <div className="flex flex-wrap items-center gap-2">
            {changeEmail ? (
              <form
                onSubmit={handleSubmit(onSubmitEmail)}
                className="flex flex-wrap gap-3"
              >
                <input
                  type="email"
                  {...register("email")}
                  className="w-fit border rounded px-3 py-2"
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-1 rounded font-medium hover:bg-red-700 duration-200"
                    onClick={() => {
                      setChangeEmail(false);
                      reset({ email: user.email }, { keepValues: false });
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-3 py-1 rounded font-medium hover:bg-green-700 duration-200"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="text-sm py-2 flex items-center gap-1 bg-slate-100 p-2 rounded w-fit">
                  <span
                    className="icon-[material-symbols--notifications-active-rounded] text-slate-600 text-xl"
                    role="img"
                    aria-hidden="true"
                  />
                  {email}
                </div>
                <button
                  className="-text--light-green font-medium hover:-text--dark-green hover:underline duration-200"
                  onClick={() => setChangeEmail(true)}
                >
                  Cambiar correo
                </button>
              </>
            )}
          </div>
        </div>

        {/* Contacto (teléfono) */}
        <div className="text-sm flex flex-col gap-3 mt-4">
          <div className="font-semibold">Contacto:</div>
          <div className="flex items-center gap-2">
            {changePhone ? (
              <form
                onSubmit={handleSubmit(onSubmitPhone)}
                className="flex flex-wrap gap-3"
              >
                <input
                  type="text"
                  {...register("mobile")}
                  className="w-fit border rounded px-3 py-2"
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-1 rounded font-medium hover:bg-red-700 duration-200"
                    onClick={() => {
                      setChangePhone(false);
                      reset({ mobile: user.mobile }, { keepValues: false });
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-3 py-1 rounded font-medium hover:bg-green-700 duration-200"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-sm py-2 flex  items-center gap-1 bg-slate-100 p-2 rounded w-fit">
                  <span
                    className="icon-[topcoat--call] text-slate-600 text-xl"
                    role="img"
                    aria-hidden="true"
                  />
                  {mobile}
                </div>
                <button
                  className="-text--light-green font-medium hover:-text--dark-green hover:underline duration-200"
                  onClick={() => setChangePhone(true)}
                >
                  Cambiar número
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Facturación */}
        <div className="text-sm flex flex-col gap-3 mt-4">
          <div className="font-semibold">Facturación:</div>
          <div className="text-sm py-2 flex items-center gap-1 bg-slate-100 p-2 rounded w-fit">
            <span
              className="icon-[iconamoon--invoice] text-slate-600 text-xl"
              role="img"
              aria-hidden="true"
            />
            <span className="font-semibold">{user.documentType}:</span>{" "}
            {user.document}
          </div>
        </div>

        {/* Entrega (dirección + ciudad) */}
        {shippingAddress === true && (
          <div className="text-sm flex flex-col gap-3 mt-4">
            <div className="font-semibold">Entrega:</div>
            <div className={`flex gap-2 ${changeAddress ? "items-start" : "items-center"}`}>
              {changeAddress ? (
                <form
                  onSubmit={handleSubmit(onSubmitAddress)}
                  className="flex flex-wrap gap-3"
                >
                  <input
                    type="text"
                    placeholder="Ciudad"
                    {...register("city")}
                    className="w-fit border rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Dirección"
                    {...register("address")}
                    className="w-[min(420px,90vw)] border rounded px-3 py-2"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="bg-red-500 text-white px-3 py-1 rounded font-medium hover:bg-red-700 duration-200"
                      onClick={() => {
                        setChangeAddress(false);
                        reset(
                          { city: user.city, address: user.address },
                          { keepValues: false }
                        );
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-3 py-1 rounded font-medium hover:bg-green-700 duration-200"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm py-2 flex items-center gap-1 bg-slate-100 p-2 rounded w-fit">
                    <span
                      className="icon-[la--shipping-fast] text-slate-600 text-xl"
                      role="img"
                      aria-hidden="true"
                    />
                    <span className="font-semibold">{city}:</span> {address}
                  </div>
                  <button
                    className="-text--light-green font-medium hover:-text--dark-green duration-200"
                    onClick={() => setChangeAddress(true)}
                  >
                    Cambiar dirección
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Marketing */}
        {user.allowMarketing !== true && (
          <div className="text-sm flex flex-col gap-3 mt-4">
            <div className="font-semibold">
              Te estás perdiendo nuestras ofertas:
            </div>
            <div className="text-sm py-2 flex items-center gap-2 bg-slate-100 p-2 rounded w-fit">
              <div className="checkbox-wrapper-35">
                <input
                  className="switch"
                  type="checkbox"
                  id="switch"
                  name="switch"
                  {...register("allowMarketing")}
                  onChange={async (e) => {
                    try {
                      await sendUpdate({ allowMarketing: e.target.checked });
                      setSuccessMsg("Has actualizado tus preferencias de marketing");
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                />
                <label htmlFor="switch">
                  <span className="switch-x-text"> </span>
                  <span className="switch-x-toggletext">
                    <span className="switch-x-unchecked">
                      <span className="switch-x-hiddenlabel">Unchecked: </span>
                      No quiero recibir ofertas y novedades
                    </span>
                    <span className="switch-x-checked">
                      <span className="switch-x-hiddenlabel">Checked: </span>
                      Quiero recibir ofertas y novedades
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Cerrar sesión */}
        <div className="flex items-center justify-end text-sm text-slate-700 mt-10">
          No eres <span className="font-semibold ml-1">{user.firstName}</span>?
          <button
            className="ml-1 text-red-500 hover:text-red-700 hover:underline duration-200"
            onClick={logout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </section>
  );
}
