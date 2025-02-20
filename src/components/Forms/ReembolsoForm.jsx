"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from 'next-view-transitions'
import { useState } from "react";
import styles from "./PrettyCheckbox.css"

export default function ReembolsoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState(null);

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
    <div className="max-w-screen-md mx-auto shadow-md p-10">
      <form
        method="POST"
        onSubmit={onSubmit}
        className="grid grid-cols-2 gap-x-3 gap-y-1"
      >
        <div className="mb-3">
          <label htmlFor="name" className="sr-only">
            Nombres
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
            className={`w-full px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
              errors.name ? "border-red-500" : "-border--light-gray"
            } `}
          />
          {errors.name && (
            <span className="text-sm text-red-600 mt-1 pl-1 block">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="sr-only">
            Apellidos
          </label>
          <input
            type="text"
            id="lastname"
            {...register("lastname", {
              required: {
                value: true,
                message: "El apellido es requerido",
              },
              minLength: {
                value: 2,
                message: "El apellido no es válido",
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
            placeholder="Apellidos"
            className={`w-full px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
              errors.lastname ? "border-red-500" : "-border--light-gray"
            } `}
          />
          {errors.lastname && (
            <span className="text-sm text-red-600 mt-1 pl-1 block">
              {errors.lastname.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="sr-only">
            Celular
          </label>
          <input
            type="tel"
            id="phone"
            className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
              errors.phone ? "border-red-500" : "border"
            }`}
            placeholder="Celular"
            {...register("phone", {
              required: {
                value: true,
                message: "El número de celular es requerido",
              },
              pattern: {
                value: /^\d{7,12}$/,
                message: "El número de celular no es válido",
              },
            })}
          />
          {errors.phone && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.phone.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="city" className="sr-only">
            Ciudad
          </label>
          <input
            type="text"
            id="city"
            className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
              errors.city ? "!border-red-500" : ""
            }`}
            placeholder="Ciudad"
            {...register("city", {
              required: {
                value: true,
                message: "La ciudad es requerida",
              },
              minLength: {
                value: 2,
                message: "El nombre de ciudad es muy corto",
              },
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "El nombre no es válido",
              },
            })}
          />
          {errors.city && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.city.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="legalDocument" className="sr-only">
            Número de Documento
          </label>
          <input
            type="text"
            id="legalDocument"
            className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
              errors.legalDocument ? "!border-red-500" : ""
            }`}
            placeholder="Número de Documento"
            {...register("legalDocument", {
              required: {
                value: true,
                message: "Documento es requerido",
              },
              minLength: {
                value: 5,
                message: "El documento es muy corto",
              },
              maxLength: {
                value: 10,
                message: "El documento es muy largo",
              },
              pattern: {
                value: /^\d+$/,
                message: "El documento no es válido",
              },
            })}
          />
          {errors.legalDocument && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.legalDocument.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="sr-only">
            Correo
          </label>
          <input
            type="email"
            id="email"
            className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
              errors.email ? "border-red-500" : "border"
            }`}
            placeholder="Tu correo electrónico"
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
        <div className="mb-4">
          <label htmlFor="reservation" className="sr-only">
            Número de reserva
          </label>
          <input
            type="tel"
            id="reservation"
            className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
              errors.reservation ? "border-red-500" : "border"
            }`}
            placeholder="Número de reserva"
            {...register("reservation", {
              required: {
                value: true,
                message: "El número de reserva es requerido",
              },
              pattern: {
                value: /^\d{7,12}$/,
                message: "El número de reserva no es válido",
              },
            })}
          />
          {errors.reservation && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.reservation.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="reservationDate" className="sr-only">
            Fecha de reserva
          </label>
          <input
            type="tel"
            id="reservationDate"
            className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
              errors.reservationDate ? "border-red-500" : "border"
            }`}
            placeholder="Fecha de reserva"
            {...register("reservationDate", {
              required: {
                value: true,
                message: "La fecha de reserva es requerida",
              },
              pattern: {
                value: /^\d{7,12}$/,
                message: "El número de reserva no es válido",
              },
            })}
          />
          {errors.reservationDate && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.reservationDate.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="paymentValue" className="sr-only">
            Valor pagado
          </label>
          <input
            type="tel"
            id="paymentValue"
            className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
              errors.paymentValue ? "border-red-500" : "border"
            }`}
            placeholder="Valor pagado"
            {...register("paymentValue", {
              required: {
                value: true,
                message: "El valor pagado es requerido",
              },
              pattern: {
                value: /^\d{7,12}$/,
                message: "El número de reserva no es válido",
              },
            })}
          />
          {errors.paymentValue && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.paymentValue.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="planName" className="sr-only">
            Plan
          </label>
          <input
            type="tel"
            id="planName"
            className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
              errors.planName ? "border-red-500" : "border"
            }`}
            placeholder="Plan"
            {...register("planName", {
              required: {
                value: true,
                message: "El nombre del plan es requerido",
              },
              pattern: {
                value: /^\d{7,12}$/,
                message: "El número de reserva no es válido",
              },
            })}
          />
          {errors.planName && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.planName.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="paymentMehotd" className="sr-only">
            Medio de pago
          </label>
          <input
            type="text"
            id="paymentMehotd"
            className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
              errors.paymentMehotd ? "border-red-500" : "border"
            }`}
            placeholder="Medio de pago"
            {...register("paymentMehotd", {
              required: {
                value: true,
                message: "El medio de pago es requerido",
              },
            })}
          />
          {errors.paymentMehotd && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.paymentMehotd.message}
            </span>
          )}
        </div>
        <div className="max-h-20 overflow-y-auto text-sm mb-4 border p-4 rounded-md col-span-2">
          <div className="space-y-3">
            <div className="font-semibold text-center mb-5">
              AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES
            </div>
            <p className="overflow-hidden">
              El <strong>VIÑEDO AIN KARIM S.A.S.</strong> (NIT. Nº
              860.010.706-4, calle 127 # 13a-32 Oficina 202 de Btá. y teléfono
              +57 601 258 9933) recolecta, almacena, usa, transfiere, transmite
              y en general trata manual o automatizada datos personales como
              Responsable de acuerdo con la{" "}
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
              actualizar y rectificar su información personal; acceder de manera
              gratuita a la misma; ser informado sobre su uso; solicitar prueba
              de la autorización; acudir ante la Superintendencia de Industria y
              Comercio y presentar quejas por infracciones a lo dispuesto en la
              normatividad vigente; y en los casos procedentes, modificar y
              revocar la autorización y/o solicitar la supresión de sus datos
              personales. También le informamos que, es de carácter libre y
              facultativo entregar datos o responder a preguntas que versen
              sobre datos de carácter sensibles (Como datos biométricos,
              relacionados con la salud, o aquellos que afectan su intimidad o
              cuyo uso indebido pueda generar discriminación), y usted no esta
              obligado a otorgar su autorización.{" "}
              <strong>
                Para información relacionada con el tratamiento de sus datos
                personales y el ejercicio de su derecho de hábeas data,
                contáctenos al correo electrónico
              </strong>{" "}
              <a
                href="mailto:smartinez@marquesvl.com"
                className="hover:-text--light-green duration-200 font-medium"
              >
                smartinez@marquesvl.com.
              </a>
            </p>
          </div>
        </div>
        <div className="text-xs font-medium mb-3 col-span-2">
          Para información relacionada con el tratamiento de sus datos
          personales y el ejercicio de su derecho de hábeas data, contáctenos al
          correo electrónico
        </div>
        <div className="pretty-checkbox mb-3 flex items-center col-span-2">
          <label className="checkbox flex items-center gap-1">
            <input
              type="checkbox"
              id="terms"
              className="checkbox__input"
              {...register("terms", { required: true })}
            />
            <span className="checkbox__label"></span>
            <span className="text-xs">
              Autorizo el tratamiento de mis datos proporcionados en este
              formulario para tramitar la solicitud de devolución de dinero por
              reservas, lo que implica la autorización de contacto a través de
              e-mail, teléfono, o mensajería instantánea.
            </span>
          </label>

          {errors.terms && (
            <span className="text-sm text-red-600 mt-1">
              Este campo es requerido
            </span>
          )}
        </div>

        <div className="mb-6 col-span-2">
          <button
            type="submit"
            className="w-full px-4 py-2 mt-3 -bg--dark-green text-white rounded-md hover:-bg--light-green focus:outline-none focus:-bg--dark-gray"
            disabled={submitting}
          >
            {submitting ? "Solicitando..." : "Solicitar Reembolso"}
          </button>
          {response && (
            <div
              className={`col-span-2 text-center font-semibold py-4 rounded ${
                response.message === "Tu mensaje ha sido enviado"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {response.message === "Tu mensaje ha sido enviado"
                ? `Gracias ${response.name}, el mensaje ha sido enviado.`
                : response.message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
