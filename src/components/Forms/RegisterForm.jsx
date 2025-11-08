import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "next-view-transitions";
import style from "./PrettyCheckbox.css";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AuthorizationPersonalData from "./AuthorizationPersonalData";


export default function CheckoutForm({ showAddressFields, orderData }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password", "");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);

    try {
      const registerResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.document,
            email: data.email,
            password: data.password,
          }),
        }
      );

      const registerResult = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(
          registerResult.error.message || "Error al registrar usuario"
        );
      }

      const userId = registerResult.user.id;

      const updateResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
          body: JSON.stringify({
            firstName: data.firstName.toUpperCase(),
            middleName: data.secondName.toUpperCase() || "",
            lastName: data.lastname.toUpperCase(),
            secondLastName: data.secondSurname.toUpperCase() || "",
            documentType: data.documentType,
            document: data.document,
            mobile: data.mobiletwo,
            gender: data.gender,
            bornDate: data.bornDate,
            city: data.city,
            department: data.departament,
            address: data.address,
            allowMarketing: data.marketing,
            confirmed: false,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Error al actualizar los datos adicionales");
      }

      setResponse({
        message: "Te has registrado exitosamente",
        name: data.firstName,
      });
      reset();
    } catch (error) {
      console.error("Error en el registro:", error);
      setResponse({ message: error.message });
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <div className="mx-auto my-10 p-8 bg-white shadow-md rounded-lg">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              className={`w-full capitalize px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
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
              className={`w-full capitalize px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
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
              className={`w-full capitalize px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
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
              className={`w-full capitalize px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
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
            <label htmlFor="documentType" className="sr-only">
              Tipo de Documento
            </label>
            <select
              type="select"
              id="documentType"
              className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
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
              <option value="Cédula de extranjería">
                Cedula de extranjeria
              </option>
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
            <label htmlFor="document" className="sr-only">
              Número de Documento
            </label>
            <input
              type="text"
              id="document"
              className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
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
            <label htmlFor="mobiletwo" className="sr-only">
              Celular
            </label>
            <input
              type="text"
              id="mobiletwo"
              className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
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
          <div>
            <label htmlFor="gender" className="sr-only">
              Género
            </label>
            <select
              type="select"
              id="gender"
              className={`mt-1 p-2 py-4 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
                errors.gender ? "!border-red-500" : ""
              }`}
              {...register("gender", {
                required: {
                  value: false,
                  message: "Género es requerido",
                },
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\s]+$/,
                  message: "Selecciona un género",
                },
              })}
            >
              <option value="0">Género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.gender && (
              <span className="text-sm text-red-600 mt-2 pl-1 block">
                {errors.gender.message}
              </span>
            )}
          </div>
          <div className="">
            <label htmlFor="bornDate" className="sr-only">
              Fecha de Nacimiento
            </label>
            <Controller
              control={control}
              name="bornDate"
              rules={{
                required: "Debes ingresar tu fecha de nacimiento",
                validate: (value) => {
                  if (!value) return "Fecha inválida";
                  const birthDate = dayjs(value);
                  const today = dayjs();
                  const age = today.diff(birthDate, "year");

                  if (birthDate.isAfter(today, "day")) {
                    return "La fecha no puede estar en el futuro";
                  }
                  return age >= 18 || "Debes ser mayor de 18 años";
                },
              }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Fecha de nacimiento"
                  format="YYYY-MM-DD"
                  disableFuture
                  className="w-full"
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      className: `mt-1 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
                        errors.bornDate
                          ? "border-red-500"
                          : "border-gray-400/40"
                      }`,
                    },
                  }}
                />
              )}
            />
            {errors.bornDate && (
              <span className="text-sm text-red-600 mt-2 pl-1 block">
                {errors.bornDate.message}
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
            <label htmlFor="departament" className="sr-only">
              Departamento
            </label>
            <input
              type="text"
              id="departament"
              className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
                errors.departament ? "!border-red-500" : ""
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
          <div className="col-span-2">
            <label htmlFor="address" className="sr-only">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
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
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
                  errors.password ? "border-red-500" : "border"
                }`}
                placeholder="Crea tu contraseña"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    message:
                      "Debe incluir al menos una mayúscula, un número y un carácter especial",
                  },
                })}
              />
              <Tooltip
                title={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                slotProps={{
                  popper: {
                    sx: {
                      [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                        {
                          marginTop: "0px",
                        },
                      [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                        {
                          marginBottom: "0px",
                        },
                      [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                        {
                          marginLeft: "0px",
                        },
                      [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                        {
                          marginRight: "0px",
                        },
                    },
                  },
                }}
              >
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
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
            {errors.password && (
              <span className="text-sm text-red-600 mt-2 pl-1 block">
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirmar Contraseña
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
                  errors.confirmPassword ? "border-red-500" : "border"
                }`}
                placeholder="Confirma tu contraseña"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Debes confirmar tu contraseña",
                  },
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                })}
              />
              <Tooltip
                title={
                  showConfirmPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
                slotProps={{
                  popper: {
                    sx: {
                      [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                        {
                          marginTop: "0px",
                        },
                      [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                        {
                          marginBottom: "0px",
                        },
                      [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                        {
                          marginLeft: "0px",
                        },
                      [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                        {
                          marginRight: "0px",
                        },
                    },
                  },
                }}
              >
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
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
            {errors.confirmPassword && (
              <span className="text-sm text-red-600 mt-2 pl-1 block">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <AuthorizationPersonalData />          
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
                mis reservas y/o pedidos; administrar mis direcciones de envío y
                facturación; enviar comunicaciones vía e-mail relacionadas con
                mi cuenta, reservas y/o pedidos; y gestionar la contraseña de mi
                cuenta y su recuperación en caso de perdida.
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

          <div className="mb-6 col-span-2">
            <button
              type="submit"
              className="w-full px-4 py-2 mt-3 -bg--dark-green text-white rounded-md hover:-bg--light-green focus:outline-none focus:-bg--dark-gray"
              disabled={submitting}
            >
              {submitting ? "Registrando..." : "Registrarme"}
            </button>
            {response && (
              <div
                className={`col-span-2 text-center font-semibold py-4 rounded ${
                  response.message === "Te has registrado exitosamente"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {response.message === "Te has registrado exitosamente"
                  ? `Gracias ${response.name}, te has registrado exitosamente.`
                  : response.message}
              </div>
            )}
          </div>
        </form>
      </LocalizationProvider>
    </div>
  );
}
