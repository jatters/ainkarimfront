"use client";
import { useForm } from "react-hook-form";
import { Link } from "next-view-transitions";
import { useState } from "react";
import style from "./PrettyCheckbox.css";
import { v4 as uuidv4 } from "uuid";
import AuthorizationPersonalData from "./AuthorizationPersonalData";

export default function ContactForm({ ipAddress, useragent }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState(null);

  const uuid = uuidv4();
  const ip = ipAddress;
  const date = new Date().toISOString();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "contacto",
          ...data,
          user_agent: useragent,
          uuid: uuid,
          ip_address: ip,
          date: date,
        }),
      });
      const result = await res.json();

      setResponse({
        message: result.message || t("failure"),
        name: data.name,
      });
      reset();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setResponse({ message: t("failure") });
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <div className="max-w-screen-sm mt-5 rounded-xl shadow-md px-5">
      <div className="sm:px-4 py-5">
        <form method="POST" onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="sr-only">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "El nombre es requerido",
                },
                minLength: {
                  value: 2,
                  message: "El nombre no es válido",
                },
                maxLength: {
                  value: 30,
                  message: "El nombre no es válido",
                },
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\s]+$/,
                  message: "El nombre no es válido",
                },
              })}
              placeholder="Nombre"
              aria-label="Ingresa tu nombre"
              className={`w-full px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-400/40"
              } `}
            />
            {errors.name && (
              <span className="text-sm text-red-600 mt-1 pl-1 block">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="mb-3">
              <label htmlFor="email" className="sr-only">
                Correo
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Correo requerido",
                  },
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "El correo no es válido",
                  },
                })}
                placeholder="Correo"
                aria-label="Ingresa tu correo electrónico"
                className={`w-full px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-400/40"
                }`}
              />
              {errors.email && (
                <span className="text-sm text-red-600 mt-1 pl-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="sr-only">
                Teléfono
              </label>
              <input
                type="text"
                id="phone"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "El teléfono es requerido",
                  },
                  pattern: {
                    value: /^\d{7,10}$/,
                    message: "El teléfono no es válido",
                  },
                })}
                placeholder="Teléfono"
                aria-label="Ingresa tu número de teléfono"
                className={`w-full px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
                  errors.phone ? "border-red-500" : "border-gray-400/40"
                }`}
              />
              {errors.phone && (
                <span className="text-sm text-red-600 mt-1 pl-2 block">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="sr-only">
              Mensaje
            </label>
            <textarea
              {...register("message", {
                required: {
                  value: true,
                  message: "El Mensaje es requerido",
                },
                minLength: {
                  value: 15,
                  message: "El mensaje es muy corto",
                },
              })}
              rows="4"
              id="message"
              placeholder="Mensaje"
              aria-label="Escribe tu mensaje"
              className={`w-full px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
                errors.message ? "border-red-500" : "border-gray-400/40"
              }`}
            ></textarea>
            {errors.message && (
              <span className="text-sm text-red-600 pl-2 block">
                {errors.message.message}
              </span>
            )}
          </div>
          <AuthorizationPersonalData />
          
          <div className="pretty-checkbox mb-3 flex items-center">
            <label className="checkbox flex items-center gap-1  ">
              <input
                type="checkbox"
                id="terms"
                {...register("terms", {
                  required: true,
                })}
                className="checkbox__input"
                aria-label="Autorizo el tratamiento de mis datos para responder a mi mensaje y/o requerimiento presentado por este medio, lo que implica la autorización de contacto a través de e-mail, teléfono, o mensajería instantánea."
              />
              <span className="checkbox__label"></span>
              <span htmlFor="terms" className="text-xs">
                Autorizo el tratamiento de mis datos para responder a mi mensaje
                y/o requerimiento presentado por este medio, lo que implica la
                autorización de contacto a través de e-mail, teléfono, o
                mensajería instantánea.
              </span>
            </label>
          </div>
          {errors.terms && (
            <span className="text-sm mb-1 -mt-2 text-red-600 pl-2 block">
              {"Este campo es requerido"}
            </span>
          )}
          <div className="pretty-checkbox mb-3 flex gap-2  items-center">
            <label className="checkbox flex items-center gap-1">
              <input
                type="checkbox"
                id="marketing"
                {...register("marketing", {
                  required: false,
                })}
                className="checkbox__input"
                aria-label="Autorizo el tratamiento de mis datos de contacto para informarme de ofertas y lanzamientos exclusivos; invitarme a eventos y en general realizar actos de marketing y/o publicidad por contacto a través de e-mail, teléfono, y/o mensajería instantánea."
              />
              <span className="checkbox__label"></span>
              <span htmlFor="marketing" className="text-xs">
                Autorizo el tratamiento de mis datos de contacto para informarme
                de ofertas y lanzamientos exclusivos; invitarme a eventos y en
                general realizar actos de marketing y/o publicidad por contacto
                a través de e-mail, teléfono, y/o mensajería instantánea.{" "}
                <span className="italic font-medium">(Opcional)</span>
              </span>
            </label>
          </div>
          {errors.marketing && (
            <span className="text-sm mb-1 -mt-2 text-red-600 pl-2 block">
              {"Este campo es requerido"}
            </span>
          )}

          <div className="mb-6">
            <button
              type="submit"
              className="w-full px-4 py-2 mt-3 -bg--dark-green text-white rounded-md hover:-bg--light-green focus:outline-none focus:-bg--dark-gray"
              disabled={submitting}
              aria-label="Enviar mensaje"
            >
              {submitting ? "Enviando..." : "Enviar"}
            </button>
            {response && (
              <div
                className={`col-span-2 text-center font-semibold py-4 rounded ${
                  response.message === "Correo enviado correctamente"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {response.message === "Correo enviado correctamente"
                  ? `Gracias ${response.name}, el mensaje ha sido enviado.`
                  : response.message}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
