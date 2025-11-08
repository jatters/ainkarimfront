"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "./PrettyCheckbox.css";
import { v4 as uuidv4 } from "uuid";
import AuthorizationPersonalData from "@/components/Forms/AuthorizationPersonalData";

export default function ReembolsoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const uuid = uuidv4();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "Reembolso",
          ...data,
          uuid: uuid,
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
        className="grid grid-cols-2 gap-x-3 gap-y-3"
      >
        <div className="col-span-2">
          <label htmlFor="name" className="sr-only">
            Nombre y apellido
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
            placeholder="Nombre y apellido"
            className={`w-full p-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
              errors.name ? "border-red-500" : "-border--light-gray"
            } `}
          />
          {errors.name && (
            <span className="text-sm text-red-600 mt-1 pl-1 block">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="documentType" className="sr-only">
            Tipo de Documento
          </label>
          <select
            type="select"
            id="documentType"
            className={`w-full p-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
              errors.documentType ? "!border-red-500" : ""
            }`}
            {...register("documentType", {
              required: {
                value: true,
                message: "Tipo de documento es requerido",
              },
            })}
          >
            <option value="Cédula">Cédula</option>
            <option value="Cédula de extranjería">Cedula de extranjeria</option>
            <option value="NIT">NIT</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
          {errors.documentType && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.documentType.message}
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
            className={`p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
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
        <div>
          <label htmlFor="phone" className="sr-only">
            Celular
          </label>
          <input
            type="tel"
            id="phone"
            className={`w-full p-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
              errors.phone ? "border-red-500" : "border"
            }`}
            placeholder="Celular"
            {...register("phone", {
              required: {
                value: true,
                message: "El número de celular es requerido",
              },
              pattern: {
                value: /^\d{10,12}$/,
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
        <div>
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
                value: /^R-\d{4,5}$/,
                message: "El número de reserva no es válido.",
              },
            })}
          />
          {errors.reservation && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.reservation.message}
            </span>
          )}
        </div>
        <div>
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
            })}
          />
          {errors.reservationDate && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.reservationDate.message}
            </span>
          )}
        </div>
        <div>
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
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "El nombre del plan no es válido",
              },
            })}
          />
          {errors.planName && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.planName.message}
            </span>
          )}
        </div>
        <div>
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
                value: /^\d{5,12}$/,
                message: "Solo debe ingresar números.",
              },
            })}
          />
          {errors.paymentValue && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.paymentValue.message}
            </span>
          )}
        </div>
        <div>
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
        <AuthorizationPersonalData />

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
        </div>
        {errors.terms && (
          <span className="text-sm text-red-600 mt-1">
            Este campo es requerido
          </span>
        )}

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
  );
}
