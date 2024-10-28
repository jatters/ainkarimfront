import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import style from "./PrettyCheckbox.css";

export default function CheckoutForm({ showAddressFields, orderData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
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

  const registerUser = watch("register");

  /* const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    firstLastName: "",
    secondLastName: "",
    documentNumber: "",
    address: "",
    city: "",
    state: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }; */
  // Función para convertir la hora en formato "2:00 pm" a "14:00:00.000"
  /*  function convertToTimeFormat(hourString) {
    const [time, period] = hourString.split(" ");
    let [hours, minutes] = time.split(":");

    if (period.toLowerCase() === "pm" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    } else if (period.toLowerCase() === "am" && hours === "12") {
      hours = "00";
    }

    return `${hours}:${minutes}:00.000`;
  }
  console.log(orderData)
  //const formattedTime = convertToTimeFormat(orderData.time);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crear el usuario en Strapi
      const userResponse = await fetch(
        `${process.env.STRAPI_URL}/api/auth/local/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            username: formData.email,
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            middleName: formData.secondName,
            lastName: formData.firstLastName,
            secondLastName: formData.secondLastName,
            document: formData.documentNumber,
            address: formData.address,
            city: formData.city,
            department: formData.state,
            mobile: formData.mobile,
          }),
        }
      );

      const userData = await userResponse.json();

      if (userResponse.ok) {
        console.log("Usuario creado:", userData);

        // Crear la reserva en Strapi
        const reservationResponse = await fetch(
          `${process.env.STRAPI_URL}/api/reservas`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
            body: JSON.stringify({
              data: {
                plan: orderData[0].plan, // ID del plan seleccionado
                date: orderData[0].date || null, // Fecha seleccionada, asegurando que no sea nula
                //time: formattedTime || null, // Hora seleccionada, asegurando que no sea nula
                time: orderData[0].time,
                guests: orderData[0].guests || null, // Número de personas, asegurando que no sea nula
                estado: "Pendiente", // Estado inicial de la reserva
                users_permissions_user: userData.user.id, // Vincular la reserva con el usuario recién creado
              },
            }),
          }
        );

        const reservationData = await reservationResponse.json();

        if (reservationResponse.ok) {
          console.log("Reserva creada:", reservationData);
          // Redirigir a la página de confirmación o a la pasarela de pago
        } else {
          console.error("Error al crear la reserva:", reservationData);
        }
      } else {
        console.error("Error al crear el usuario:", userData);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  }; */

  return (
    <div className="mx-auto p-8 bg-white shadow-md rounded-lg">
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <div>
          <label htmlFor="firstName" className="sr-only">
            Primer nombre
          </label>
          <input
            type="text"
            id="firstName"
            {...register("firstName", {
              required: {
                value: true,
                message: "El nombre es requerido",
              },
              minLength: {
                value: 2,
                message: "El nombre no es válido",
              },
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "El nombre no es válido",
              },
            })}
            placeholder="Primer Nombre"
            className={`w-full uppercase px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:outline-none focus:-border--dark-green ${
              errors.firstName ? "border-red-500" : "-border--light-gray"
            } `}
          />
          {errors.firstName && (
            <span className="text-sm text-red-600 mt-1 pl-1 block">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="secondName" className="sr-only">
            Segundo Nombre
          </label>
          <input
            type="text"
            id="secondName"
            {...register("secondName", {
              required: {
                value: false,
                message: "El nombre es requerido",
              },
              minLength: {
                value: 2,
                message: "El nombre no es válido",
              },
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "El nombre no es válido",
              },
            })}
            placeholder="Segundo Nombre"
            className={`w-full uppercase px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:outline-none focus:-border--dark-green ${
              errors.secondName ? "border-red-500" : "-border--light-gray"
            } `}
          />
          {errors.secondName && (
            <span className="text-sm text-red-600 mt-1 pl-1 block">
              {errors.secondName.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="lastname" className="sr-only">
            Primer apellido
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
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "El apellido no es válido",
              },
            })}
            placeholder="Primer apellido"
            className={`w-full uppercase px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:outline-none focus:-border--dark-green ${
              errors.lastname ? "border-red-500" : "-border--light-gray"
            } `}
          />
          {errors.lastname && (
            <span className="text-sm text-red-600 mt-1 pl-1 block">
              {errors.lastname.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="secondSurname" className="sr-only">
            Segundo apellido
          </label>
          <input
            type="text"
            id="secondSurname"
            {...register("secondSurname", {
              required: {
                value: false,
                message: "El apellido es requerido",
              },
              minLength: {
                value: 2,
                message: "El apellido no es válido",
              },
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "El apellido no es válido",
              },
            })}
            placeholder="Segundo apellido"
            className={`w-full uppercase px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:outline-none focus:-border--dark-green ${
              errors.secondSurname ? "border-red-500" : "-border--light-gray"
            } `}
          />
          {errors.secondSurname && (
            <span className="text-sm text-red-600 mt-1 pl-1 block">
              {errors.secondSurname.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="document" className="sr-only">
            Número de Documento
          </label>
          <input
            type="text"
            id="document"
            className={`mt-1 p-2 w-full border -border--grey-light/50 rounded-md focus:outline-none focus:ring-2 focus:-ring--grey-light ${
              errors.legalDocument ? "!border-red-500" : ""
            }`}
            placeholder="Número de Documento"
            {...register("document", {
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
          {errors.document && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.document.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="address" className="sr-only">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            className={`mt-1 p-2 w-full border -border--grey-light/50 rounded-md focus:outline-none focus:ring-1 focus:-ring--grey-light ${
              errors.address ? "!border-red-500" : "border"
            }`}
            placeholder="Dirección"
            {...register("address", {
              required: {
                value: true,
                message: "La dirección es requerida",
              },
              minLength: {
                value: 10,
                message: "La dirección es muy corta",
              },
            })}
          />
          {errors.address && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.address.message}
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
            className={`mt-1 p-2 w-full border -border--grey-light/50 rounded-md focus:outline-none focus:ring-2 focus:-ring--grey-light ${
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
          <label htmlFor="departament" className="sr-only">
            Departamento
          </label>
          <input
            type="text"
            id="departament"
            className={`mt-1 p-2 w-full border -border--grey-light/50 rounded-md focus:outline-none focus:ring-2 focus:-ring--grey-light ${
              errors.locality ? "!border-red-500" : ""
            }`}
            placeholder="Departamento"
            {...register("departament", {
              required: {
                value: true,
                message: "El departamento es requerido",
              },
              minLength: {
                value: 2,
                message: "El departamento es muy corto",
              },
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "El departamento no es válido",
              },
            })}
          />
          {errors.departament && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.departament.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="mobiletwo" className="sr-only">
            Celular
          </label>
          <input
            type="text"
            id="mobiletwo"
            className={`mt-1 p-2 w-full border -border--grey-light/50 rounded-md focus:outline-none focus:ring-2 focus:-ring--grey-light ${
              errors.mobiletwo ? "!border-red-500" : "border"
            }`}
            placeholder="Número de celular"
            {...register("mobiletwo", {
              required: "Número de celular requerido",
              minLength: {
                value: 10,
                message: "El celular debe tener al menos 10 dígitos",
              },
              maxLength: {
                value: 10,
                message: "El celular no puede tener más de 10 dígitos",
              },
              pattern: {
                value: /^\d+$/,
                message: "El número de celular no es  válido",
              },
            })}
          />
          {errors.mobiletwo && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.mobiletwo.message}
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
            className={`mt-1 p-2 w-full border -border--grey-light/50 rounded-md focus:outline-none focus:ring-2 focus:-ring--grey-light ${
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
        <div className="pretty-checkbox flex gap-1 items-center col-span-2">
          <label className="checkbox flex items-center gap-0">
            <input
              type="checkbox"
              id="register"
              {...register("register", {
                required: false,
              })}
              className="checkbox__input"
            />
            <span className="checkbox__label"></span>
            <span htmlFor="register" className="text-slate-600">
              ¿Quieres crear una cuenta?
            </span>
          </label>
          {errors.register && (
            <span className="text-sm mb-5 text-red-600 pl-1 block">
              Debes aceptar la política de tratamiento de datos
            </span>
          )}
        </div>
        {registerUser === true ? (
          <>
            <div className="col-span-2">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className={`mt-1 p-2 w-full border -border--grey-light/50 rounded-md focus:outline-none focus:ring-2 focus:-ring--grey-light ${
                  errors.password ? "border-red-500" : "border"
                }`}
                placeholder="Crea tu contraseña"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                })}
              />
              {errors.password && (
                <span className="text-sm text-red-600 mt-2 pl-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="col-span-2">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={`mt-1 p-2 w-full border -border--grey-light/50 rounded-md focus:outline-none focus:ring-2 focus:-ring--grey-light ${
                  errors.confirmPassword ? "border-red-500" : "border"
                }`}
                placeholder="Confirma tu contraseña"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                })}
              />
              {errors.confirmPassword && (
                <span className="text-sm text-red-600 mt-2 pl-1 block">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="max-h-20 overflow-y-auto text-sm mb-4 border p-4 rounded-md col-span-2">
              <div className="space-y-3">
                <div className="font-semibold mb-5 text-center">
                  AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES
                </div>
                <p className="overflow-hidden">
                  El <strong>VIÑEDO AIN KARIM S.A.S.</strong> (NIT. Nº
                  860.010.706-4, calle 127 # 13a-32 Oficina 202 de Btá. y
                  teléfono +57 601 258 9933) recolecta, almacena, usa,
                  transfiere, transmite y en general trata manual o automatizada
                  datos personales como Responsable de acuerdo con la{" "}
                  <Link
                    href="/politica-de-tratamiento-de-datos-personales"
                    target="_blank"
                    className="font-medium hover:-text--light-green duration-200"
                  >
                    Política de Tratamiento de Datos Personales
                  </Link>
                  , disponible para su consulta{" "}
                  <Link
                    href="/politica-de-tratamiento-de-datos-personales"
                    target="_blank"
                    className="underline hover:-text--light-green duration-200"
                  >
                    aquí
                  </Link>
                  . Le informamos que: Todo titular tiene derecho a: conocer,
                  actualizar y rectificar su información personal; acceder de
                  manera gratuita a la misma; ser informado sobre su uso;
                  solicitar prueba de la autorización; acudir ante la
                  Superintendencia de Industria y Comercio y presentar quejas
                  por infracciones a lo dispuesto en la normatividad vigente; y
                  en los casos procedentes, modificar y revocar la autorización
                  y/o solicitar la supresión de sus datos personales. A su vez,
                  le informamos que, es de carácter libre y facultativo entregar
                  datos o responder a preguntas que versen sobre datos de
                  carácter sensibles (Como datos biométricos, relacionados con
                  la salud, o aquellos que afectan su intimidad o cuyo uso
                  indebido pueda generar discriminación), y usted no esta
                  obligado a otorgar su autorización.{" "}
                  <strong>
                    Para información relacionada con el tratamiento de sus datos
                    personales y el ejercicio de su derecho de hábeas data,
                    contáctenos al correo electrónico{" "}
                  </strong>
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
              Con base en la información proporcionada, autorizo de manera
              voluntaria, previa, expresa e informada al VIÑEDO para tratar mis
              datos personales, y en especial:
            </div>
            <div className="pretty-checkbox mb-3 flex gap-2  items-center -text--light-gray col-span-2">
              <label className="checkbox flex items-center gap-1">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms", {
                    required: true,
                  })}
                  className="checkbox__input"
                />
                <span className="checkbox__label"></span>
                <span htmlFor="terms" className="text-xs">
                  Autorizo el tratamiento de mis datos de identificación y
                  contacto para; crear una cuenta personal que permita gestionar
                  mis reservas y/o pedidos; administrar mis direcciones de envío
                  y facturación; enviar comunicaciones vía e-mail relacionadas
                  con mi cuenta, reservas y/o pedidos; y gestionar la contraseña
                  de mi cuenta y su recuperación en caso de perdida.
                </span>
              </label>
            </div>
            {errors.terms && (
              <span className="text-sm mb-1 -mt-2 text-red-600 pl-2 block">
                {"Este campo es requerido"}
              </span>
            )}
            <div className="pretty-checkbox mb-3 flex gap-2  items-center -text--light-gray col-span-2">
              <label className="checkbox flex items-center gap-1">
                <input
                  type="checkbox"
                  id="marketing"
                  {...register("marketing", {
                    required: false,
                  })}
                  className="checkbox__input"
                />
                <span className="checkbox__label"></span>
                <span htmlFor="marketing" className="text-xs">
                  Autorizo el tratamiento de mis datos de contacto para
                  informarme de ofertas y lanzamientos exclusivos; invitarme a
                  eventos y en general realizar actos de marketing y/o
                  publicidad por contacto a través de e-mail, teléfono, y/o
                  mensajería instantánea.{" "}
                  <span className="italic font-medium">(Opcional)</span>
                </span>
              </label>
            </div>
            {errors.marketing && (
              <span className="text-sm mb-1 -mt-2 text-red-600 pl-2 block">
                {"Este campo es requerido"}
              </span>
            )}
          </>
        ) : (
          <>
            <div className="max-h-20 overflow-y-auto text-sm mb-4 border p-4 rounded-md col-span-2">
              <div className="space-y-3">
                <div className="font-semibold text-center mb-5">
                  AUTORIZACIÓN WEB PARA EL TRATAMIENTO DE DATOS PERSONALES
                </div>
                <p className="overflow-hidden">
                  El <strong>VIÑEDO AIN KARIM S.A.S.</strong> (NIT. Nº
                  860.010.706-4, calle 127 # 13a-32 Oficina 202 de Btá. y
                  teléfono +57 601 258 9933) recolecta, almacena, usa,
                  transfiere, transmite y en general trata manual o automatizada
                  datos personales como Responsable de acuerdo con la{" "}
                  <Link
                    href="/politica-de-tratamiento-de-datos-personales"
                    target="_blank"
                    className="font-medium hover:-text--light-green duration-200"
                  >
                    Política de Tratamiento de Datos Personales
                  </Link>
                  , disponible para su consulta{" "}
                  <Link
                    href="/politica-de-tratamiento-de-datos-personales"
                    target="_blank"
                    className="underline hover:-text--light-green duration-200"
                  >
                    aquí
                  </Link>
                  . Le informamos que: Todo titular tiene derecho a: conocer,
                  actualizar y rectificar su información personal; acceder de
                  manera gratuita a la misma; ser informado sobre su uso;
                  solicitar prueba de la autorización; acudir ante la
                  Superintendencia de Industria y Comercio y presentar quejas
                  por infracciones a lo dispuesto en la normatividad vigente; y
                  en los casos procedentes, modificar y revocar la autorización
                  y/o solicitar la supresión de sus datos personales. A su vez,
                  le informamos que, es de carácter libre y facultativo entregar
                  datos o responder a preguntas que versen sobre datos de
                  carácter sensibles (Como datos biométricos, relacionados con
                  la salud, o aquellos que afectan su intimidad o cuyo uso
                  indebido pueda generar discriminación), y usted no esta
                  obligado a otorgar su autorización.{" "}
                  <strong>
                    Para información relacionada con el tratamiento de sus datos
                    personales y el ejercicio de su derecho de hábeas data,
                    contáctenos al correo electrónico{" "}
                  </strong>
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
              Con base en la información proporcionada, autorizo de manera
              voluntaria, previa, expresa e informada al VIÑEDO para tratar mis
              datos personales, y en especial:
            </div>
            <div className="pretty-checkbox mb-3 flex gap-2  items-center -text--light-gray col-span-2">
              <label className="checkbox flex items-center gap-1">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms", {
                    required: true,
                  })}
                  className="checkbox__input"
                />
                <span className="checkbox__label"></span>
                <span htmlFor="terms" className="text-xs">
                  Autorizo el tratamiento de mis datos de identificación y
                  contancto para emitir la factura electrónica y gestionar mi
                  pedido (lo que implica contacto a través de e-mail, teléfono,
                  y/o mensajería instantánea y su transferencia con la
                  respectiva empresa transportadora) y participar de una
                  evaluación de calidad.
                </span>
              </label>
            </div>
            {errors.terms && (
              <span className="text-sm mb-1 -mt-2 text-red-600 pl-2 block">
                {"Este campo es requerido"}
              </span>
            )}
            <div className="pretty-checkbox mb-3 flex gap-2  items-center -text--light-gray col-span-2">
              <label className="checkbox flex items-center gap-1">
                <input
                  type="checkbox"
                  id="marketing"
                  {...register("marketing", {
                    required: false,
                  })}
                  className="checkbox__input"
                />
                <span className="checkbox__label"></span>
                <span htmlFor="marketing" className="text-xs">
                  Autorizo el tratamiento de mis datos de contacto para
                  informarme de ofertas y lanzamientos exclusivos; invitarme a
                  eventos y en general realizar actos de marketing y/o
                  publicidad por contacto a través de e-mail, teléfono, y/o
                  mensajería instantánea.{" "}
                  <span className="italic font-medium">(Opcional)</span>
                </span>
              </label>
            </div>
            {errors.marketing && (
              <span className="text-sm mb-1 -mt-2 text-red-600 pl-2 block">
                {"Este campo es requerido"}
              </span>
            )}
          </>
        )}

        <div className="mb-6 col-span-2">
          <button
            type="submit"
            className="w-full px-4 py-2 mt-3 -bg--dark-green text-white rounded-md hover:-bg--light-green focus:outline-none focus:-bg--dark-gray"
            disabled={submitting}
          >
            {submitting ? "Pagando..." : "Realizar pago"}
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
