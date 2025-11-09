import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import style from "./PrettyCheckbox.css";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import AuthorizationPersonalData from "@/components/Forms/AuthorizationPersonalData";

export default function CheckoutForm({ showAddressFields, onFormChange }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    trigger,
    watch,
  } = useForm({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    if (typeof onFormChange === "function") {
      onFormChange({
        isValid,
        formData: watch(),
        triggerValidation: () => trigger(),
      });
    }
  }, [isValid, watch]);

  const registerUser = watch("register");

  return (
    <div className="mx-auto lg:p-2 bg-white">
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="col-span-2  sm:col-span-1">
          <label
            htmlFor="firstName"
            className="text-sm font-semibold ml-2 after:content-['*'] after:text-red-500 after:ml-1"
          >
            Primer Nombre
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
            className={`w-full uppercase px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden  ${
              errors.firstName ? "border-red-500" : "border-light-gray"
            } `}
          />
          {errors.firstName && (
            <span className="text-sm text-red-600 mt-1 pl-1 block">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div className="col-span-2  sm:col-span-1">
          <label htmlFor="secondName" className="text-sm font-semibold ml-2">
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
            className={`w-full uppercase px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
              errors.secondName ? "border-red-500" : "border-light-gray"
            } `}
          />
          {errors.secondName && (
            <span className="text-sm text-red-600 mt-1 pl-1 block">
              {errors.secondName.message}
            </span>
          )}
        </div>
        <div className="col-span-2  sm:col-span-1">
          <label
            htmlFor="lastname"
            className="text-sm font-semibold ml-2 after:content-['*'] after:text-red-500 after:ml-1"
          >
            Primer Apellido
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
            className={`w-full uppercase px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
              errors.lastname ? "border-red-500" : "border-light-gray"
            } `}
          />
          {errors.lastname && (
            <span className="text-sm text-red-600 mt-1 pl-1 block">
              {errors.lastname.message}
            </span>
          )}
        </div>
        <div className="col-span-2  sm:col-span-1">
          <label
            htmlFor="secondSurname"
            className="text-sm font-semibold ml-2 "
          >
            Segundo Apellido
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
            className={`w-full uppercase px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
              errors.secondSurname ? "border-red-500" : "border-light-gray"
            } `}
          />
          {errors.secondSurname && (
            <span className="text-sm text-red-600 mt-1 pl-1 block">
              {errors.secondSurname.message}
            </span>
          )}
        </div>
        <div className="col-span-2  sm:col-span-1">
          <label
            htmlFor="documentType"
            className="text-sm font-semibold ml-2 after:content-['*'] after:text-red-500 after:ml-1"
          >
            Tipo de Documento
          </label>
          <select
            type="select"
            id="documentType"
            className={`p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
              errors.documentType ? "border-red-500!" : ""
            }`}
            {...register("documentType", {
              required: {
                value: true,
                message: "Tipo de documento es requerido",
              },
            })}
          >
            <option value="Cédula">Cédula</option>
            <option value="Cédula de extranjería">Cédula de extranjería</option>
            <option value="NIT">NIT</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
          {errors.documentType && (
            <span className="text-sm text-red-600 mt-2 pl-1 block">
              {errors.documentType.message}
            </span>
          )}
        </div>
        <div className="col-span-2  sm:col-span-1">
          <label
            htmlFor="document"
            className="text-sm font-semibold ml-2 after:content-['*'] after:text-red-500 after:ml-1"
          >
            Número de Documento
          </label>
          <input
            type="text"
            id="document"
            className={`p-2 px-3 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
              errors.document ? "border-red-500!" : ""
            }`}
            placeholder="Número de Documento"
            {...register("document", {
              required: {
                value: true,
                message: "Documento es requerido",
              },
              minLength: {
                value: 4,
                message: "El documento es muy corto",
              },
            })}
          />
          {errors.document && (
            <span className="text-sm text-red-600 mt-1 pl-1 block">
              {errors.document.message}
            </span>
          )}
        </div>
        <div className="col-span-2  sm:col-span-1">
          <label
            htmlFor="mobiletwo"
            className="text-sm font-semibold ml-2 after:content-['*'] after:text-red-500 after:ml-1"
          >
            Celular
          </label>
          <input
            type="text"
            id="mobiletwo"
            className={`p-2 px-3 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
              errors.mobiletwo ? "border-red-500!" : ""
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
            <span className="text-sm text-red-600 mt-1 pl-1 block">
              {errors.mobiletwo.message}
            </span>
          )}
        </div>
        {showAddressFields && (
          <>
          <div>
            <label htmlFor="city" className="sr-only">Ciudad</label>
            <select name="city" id="city" {...register("city", {
              required: {
                value: true,
                message: "Ciudad es requerida",
              },
            })} className={`p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
              errors.city ? "border-red-500!" : ""
            }`}>
              <option value="">Selecciona una ciudad</option>
              <option value="Bogota">Bogota</option>
              <option value="Bucaramanga">Bucaramanga</option>
              <option value="Cajica">Cajica</option>
              <option value="Cali">Cali</option>
              <option value="Chia">Chía</option>
              <option value="Medellin">Medellin</option>
              <option value="Yopal">Yopal</option>
              <option value="Zipaquirá">Zipaquira</option>
            </select>
            {errors.city && (
              <span className="text-sm text-red-600 mt-2 pl-1 block">
                {errors.city.message}
              </span>
            )}
          </div>
            {/* <div className="col-span-2  sm:col-span-1">
              <label htmlFor="city" className="sr-only">
                Ciudad
              </label>
              <select
                name="city"
                id="city"
                {...register("city", {
                  required: {
                    value: true,
                    message: "Ciudad es requerida",
                  },
                })}
                className={`p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:-ring--light-green focus:outline-none ${
                  errors.city ? "!border-red-500" : ""
                }`}
              >
                <option value="">Selecciona una ciudad</option>
                <option value="Bogota">Bogotá</option>
                <option value="Bucaramanga">Bucaramanga</option>
                <option value="Cajica">Cajicá</option>
                <option value="Cali">Cali</option>
                <option value="Chia">Chía</option>
                <option value="Medellin">Medellín</option>
                <option value="Yopal">Yopal</option>
                <option value="Zipaquirá">Zipaquira</option>
              </select>
              {errors.city && (
                <span className="text-sm text-red-600 mt-1 pl-1 block">
                  {errors.city.message}
                </span>
              )}
            </div>
            <div className="col-span-2  sm:col-span-1">
              <label
                htmlFor="address"
                className="text-sm font-semibold ml-2 after:content-['*'] after:text-red-500 after:ml-1"
              >
                Dirección
              </label>
              <input
                type="text"
                id="address"
                className={`p-2 px-3 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
                  errors.address ? "border-red-500!" : "border"
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
                <span className="text-sm text-red-600 mt-1 pl-1 block">
                  {errors.address.message}
                </span>
              )}
            </div>
          </>
        )}
        <div className="mb-4 col-span-2  sm:col-span-1">
          <label
            htmlFor="email"
            className="text-sm font-semibold ml-2 after:content-['*'] after:text-red-500 after:ml-1"
          >
            Correo
          </label>
          <input
            type="email"
            id="email"
            className={`p-2 px-3 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
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
            <span className="text-sm text-red-600 mt-1 pl-1 block">
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
            <span htmlFor="register" className="text-slate-600  -ml-2 -mt-[2px]">
              ¿Quieres crear una cuenta?
            </span>
          </label>         
        </div>
        {registerUser === true ? (
          <>
            <div className="col-span-2 md:col-span-1 ">
              <div className="relative">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold ml-2 after:content-['*'] after:text-red-500 after:ml-1"
                >
                  Contraseña
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`p-2 px-3 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
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
                    className="absolute inset-y-0 right-3 top-5 flex items-center text-gray-500"
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
            <div className="col-span-2 md:col-span-1">
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold ml-2 after:content-['*'] after:text-red-500 after:ml-1"
                >
                  Confirmar tu contraseña
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className={`mt-1 p-2 px-3 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
                    errors.confirmPassword ? "border-red-500" : "border"
                  }`}
                  placeholder="Confirma tu contraseña"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Debes confirmar tu contraseña",
                    },
                    validate: (value) =>
                      value === watch("password") ||
                      "Las contraseñas no coinciden",
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
                    className="absolute inset-y-0 right-3 top-5 flex items-center text-gray-500"
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
            <div className="pretty-checkbox mb-3 flex gap-2  items-center text-light-gray col-span-2">
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
            <AuthorizationPersonalData />
            
            <div className="pretty-checkbox flex gap-2  items-center -text--light-gray col-span-2  ">
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
                <span
                  htmlFor="terms"
                  className={`text-xs ${
                    errors.terms ? "bg-red-200 py-2 px-1 rounded-lg" : ""
                  }`}
                >
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
              <span className="text-sm mb-1 -mt-2 ml-4 text-red-600 pl-2 block">
                {"Este campo es requerido"}
              </span>
            )}
            <div className="pretty-checkbox flex gap-2  items-center text-light-gray col-span-2">
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
          </>
        )}
      </form>
    </div>
  );
}
