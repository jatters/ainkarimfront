"use client";
import { useForm } from "react-hook-form";
import { Link } from "next-view-transitions";
import { useState } from "react";
import style from "./PrettyCheckbox.css";
import { v4 as uuidv4 } from "uuid";

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
          <div className="max-h-20 overflow-y-auto text-sm mb-4 border p-4 rounded-md">
            <div className="prose-sm">
              <div className="font-semibold">
                AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES
              </div>
              <p className="overflow-hidden">
                El <strong>VIÑEDO AIN KARIM S.A.S.</strong> (NIT. Nº
                860.010.706-4, calle 127 # 13a-32 Oficina 202 de Btá. y teléfono
                +57 601 258 9933) recolecta, almacena, usa, transfiere,
                transmite y en general trata manual o automatizada datos
                personales como Responsable de acuerdo con la{" "}
                <Link
                  href="/politica-de-tratamiento-de-datos-personales"
                  target="_blank"
                  rel="noopener"
                  className="font-medium hover:-text--light-green duration-200"
                >
                  Política de Tratamiento de Datos Personales
                </Link>
                , disponible para su consulta{" "}
                <Link
                  href="/politica-de-tratamiento-de-datos-personales"
                  target="_blank"
                  rel="noopener"
                  className="underline hover:-text--light-green duration-200"
                >
                  aquí
                </Link>
                . Le informamos que: Todo titular tiene derecho a: conocer,
                actualizar y rectificar su información personal; acceder de
                manera gratuita a la misma; ser informado sobre su uso;
                solicitar prueba de la autorización; acudir ante la
                Superintendencia de Industria y Comercio y presentar quejas por
                infracciones a lo dispuesto en la normatividad vigente; y en los
                casos procedentes, modificar y revocar la autorización y/o
                solicitar la supresión de sus datos personales. También le
                informamos que, es de carácter libre y facultativo entregar
                datos o responder a preguntas que versen sobre datos de carácter
                sensibles (Como datos biométricos, relacionados con la salud, o
                aquellos que afectan su intimidad o cuyo uso indebido pueda
                generar discriminación), y usted no esta obligado a otorgar su
                autorización. Para información relacionada con el tratamiento de
                sus datos personales y el ejercicio de su derecho de hábeas
                data, contáctenos al correo electrónico{" "}
                <a
                  href="mailto:smartinez@marquesvl.com"
                  className="hover:-text--light-green duration-200 hover:underline  font-medium"
                >
                  smartinez@marquesvl.com.
                </a>
              </p>
            </div>
          </div>
          <div className="text-xs font-medium mb-3">
            Con base en la información proporcionada, autorizo de manera
            voluntaria, previa, expresa e informada al VIÑEDO para tratar mis
            datos personales, y en especial:
          </div>
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
