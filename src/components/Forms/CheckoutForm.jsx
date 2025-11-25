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
            className={`text-xs font-semibold  after:content-['*'] after:text-red-500 after:ml-0.5 ${
              errors.firstName ? "text-red-500" : "text-gray-500"
            }`}
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
            className={`w-full uppercase px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden  ${
              errors.firstName ? "border-red-500" : "border-light-gray"
            } `}
          />
          {errors.firstName && (
            <span className="text-xs text-red-600 mt-1 pl-1 block">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div className="col-span-2  sm:col-span-1">
          <label
            htmlFor="secondName"
            className="text-xs font-semibold text-gray-500 "
          >
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
            className={`w-full uppercase px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
              errors.secondName ? "border-red-500" : "border-light-gray"
            } `}
          />
          {errors.secondName && (
            <span className="text-xs text-red-600 mt-1 pl-1 block">
              {errors.secondName.message}
            </span>
          )}
        </div>
        <div className="col-span-2  sm:col-span-1">
          <label
            htmlFor="lastname"
            className={`text-xs  font-semibold after:content-['*'] after:text-red-500 after:ml-0.5 ${
              errors.lastname ? "text-red-500" : "text-gray-500"
            }`}
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
            className={`w-full uppercase px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
              errors.lastname ? "border-red-500" : "border-light-gray"
            } `}
          />
          {errors.lastname && (
            <span className="text-xs text-red-600 mt-1 pl-1 block">
              {errors.lastname.message}
            </span>
          )}
        </div>
        <div className="col-span-2  sm:col-span-1">
          <label
            htmlFor="secondSurname"
            className="text-xs text-gray-500 font-semibold"
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
            className="text-xs text-gray-500 font-semibold after:content-['*'] after:text-red-500 after:ml-0.5"
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
            className={`text-xs font-semibold after:content-['*'] after:text-red-500 after:ml-0.5 ${errors.document ? "text-red-500" : "text-gray-500"}`}
          >
            Número de Documento
          </label>
          <input
            type="text"
            id="document"
            className={`p-2 px-3 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
              errors.document ? "border-red-500!" : ""
            }`}
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
            <span className="text-xs text-red-600 mt-1 pl-1 block">
              {errors.document.message}
            </span>
          )}
        </div>
        <div className="col-span-2  sm:col-span-1">
          <label
            htmlFor="mobiletwo"
            className={`text-xs font-semibold after:content-['*'] after:text-red-500 after:ml-0.5 ${errors.mobiletwo ? "text-red-500" : "text-gray-500"}`}
          >
            Celular
          </label>
          <input
            type="text"
            id="mobiletwo"
            className={`p-2 px-3 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
              errors.mobiletwo ? "border-red-500!" : ""
            }`}
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
            <span className="text-xs text-red-600 mt-1 pl-1 block">
              {errors.mobiletwo.message}
            </span>
          )}
        </div>
        {showAddressFields && (
          <>
            <div>
              <label
                htmlFor="city"
                className={`text-xs font-semibold after:content-['*'] after:text-red-500 after:ml-0.5 ${errors.city ? "text-red-500" : "text-gray-500"}`}
              >
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
                className={`p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
                  errors.city ? "border-red-500!" : ""
                }`}
              >
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
                <span className="text-xs text-red-600 mt-2 pl-1 block">
                  {errors.city.message}
                </span>
              )}
            </div>
            <div className="col-span-2  sm:col-span-1">
              <label
                htmlFor="address"
                className={`text-xs font-semibold after:content-['*'] after:text-red-500 after:ml-0.5 ${errors.address ? "text-red-500" : "text-gray-500"}`}
              >
                Dirección
              </label>
              <input
                type="text"
                id="address"
                className={`p-2 px-3 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
                  errors.address ? "border-red-500!" : "border"
                }`}
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
                <span className="text-xs text-red-600 mt-1 pl-1 block">
                  {errors.address.message}
                </span>
              )}
            </div>
          </>
        )}
        <div className="mb-4 col-span-2  sm:col-span-1">
          <label
            htmlFor="email"
            className={`text-xs font-semibold after:content-['*'] after:text-red-500 after:ml-0.5 ${errors.email ? "text-red-500" : "text-gray-500"}`}
          >
            Correo
          </label>
          <input
            type="email"
            id="email"
            className={`p-2 px-3 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
              errors.email ? "border-red-500" : "border"
            }`}
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
            <span className="text-xs text-red-600 mt-1 pl-1 block">
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
              className="checkbox__input "
            />
            <span className="checkbox__label w-2!"></span>
            <span htmlFor="register" className="text-gray-600 text-sm">
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
                  className={`text-xs font-semibold after:content-['*'] after:text-red-500 after:ml-0.5 ${errors.password ? "text-red-500" : "text-gray-500"}`}
                >
                  Contraseña
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`p-2 px-3 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
                    errors.password ? "border-red-500" : "border"
                  }`}
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
                <span className="text-xs text-red-600 mt-2 pl-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className={`text-xs font-semibold after:content-['*'] after:text-red-500 after:ml-0.5 ${errors.confirmPassword ? "text-red-500" : "text-gray-500"}`}
                >
                  Confirmar tu contraseña
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className={`p-2 px-3 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-hidden ${
                    errors.confirmPassword ? "border-red-500" : "border"
                  }`}
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
                <span className="text-xs text-red-600 mt-2 pl-1 block">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="pretty-checkbox mb-3 flex gap-2  items-center text-light-gray col-span-2">
              <label className="checkbox flex items-center">
                <input
                  type="checkbox"
                  id="policy"
                  {...register("policy", {
                    required: true,
                  })}
                  className="checkbox__input"
                />
                <span className="checkbox__label"></span>
                <span htmlFor="policy" className={`text-sm ${errors.policy ? "text-red-600" : "text-gray-500"}`}>
                  He leído y Acepto los{" "}
                  <Link href="/terminos-y-condiciones" target="_blank">
                    Términos y Condiciones
                  </Link>{" "}
                  del servicio.
                </span>
              </label>
            </div>
            {errors.policy && (
              <span className="text-xs mb-1 -mt-2 text-red-600 pl-2 block">
                {"Este campo es requerido"}
              </span>
            )}
            <AuthorizationPersonalData />

            <div className="pretty-checkbox  flex gap-2  items-center text-light-gray col-span-2">
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
                <span htmlFor="terms" className={`text-xs ${errors.terms ? "text-red-600" : "text-gray-500"}`}>
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
              <span className="text-xs mb-1 ml-4 text-red-600 pl-2 block">
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
            <div className="pretty-checkbox flex gap-2  items-center text-light-gray col-span-2">
              <label className="checkbox flex items-center">
                <input
                  type="checkbox"
                  id="policy"
                  {...register("policy", {
                    required: true,
                  })}
                  className="checkbox__input"
                />
                <span className="checkbox__label w-2!"></span>
                <span htmlFor="policy" className="text-sm text-gray-600">
                  He leído y Acepto los{" "}
                  <Link
                    href="/terminos-y-condiciones"
                    target="_blank"
                    className="text-light-green hover:text-dark-green hover:underline transition-all duration-200"
                  >
                    Términos y Condiciones
                  </Link>{" "}
                  del servicio.
                </span>
              </label>
            </div>
            {errors.policy && (
              <span className="text-xs mb-1 ml-4  text-red-600 pl-2 block">
                {"Este campo es requerido"}
              </span>
            )}
            <AuthorizationPersonalData />

            <div className="pretty-checkbox flex gap-2  items-center text-light-gray col-span-2  ">
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
              <span className="text-xs mb-1 -mt-2 ml-4 text-red-600 pl-2 block">
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
