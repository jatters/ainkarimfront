"use client";
import React, { useContext, useState, useMemo } from "react";
import CheckoutForm from "@/components/Forms/CheckoutForm";
import { CartContext } from "@/context/CartContext";
import CheckoutButton from "@/components/Ecommerce/CheckoutButton";
import Tooltip from "@mui/material/Tooltip";
import CouponInput from "@/components/Ecommerce/CouponInput";
import Image from "next/image";
import logoMercadoPago from "../../../public/logo-mercado-pago.svg";
import Link from "next/link";
import UserProfile from "@/components/Ecommerce/UserProfile";
import useAuth from "@/app/hooks/useAuth";
import userlogin from "../../../public/user-login.json";
import LottieAnimation from "@/components/LotttieAnimation";
import EmptyCart from "@/components/Ecommerce/Cart/EmptyCart";
import { useForm } from "react-hook-form";

const formatPrice = (value) =>
  `$${Number(value).toLocaleString("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

export default function PaymentPage() {
  const { cart, removeFromCart, coupon } = useContext(CartContext);
  const { user: authUser, loading: authLoading } = useAuth();

  const [updatedUser, setUpdatedUser] = useState(null);

  const [login, setLogin] = useState(false);
  const { register, handleSubmit } = useForm();

  const [formState, setFormState] = useState({
    isValid: false,
    formData: {},
    triggerValidation: () => {},
  });

  const visibleUser = updatedUser || authUser;

  const handleFormChange = ({ isValid, formData, triggerValidation }) => {
    setFormState({ isValid, formData, triggerValidation });
  };

  const handleUserUpdate = (partialFields) => {
    // fusiona con lo que tengamos (authUser o updatedUser)
    setUpdatedUser((prev) => {
      const base = prev || authUser || {};
      return { ...base, ...partialFields };
    });

    // mantiene sincronizado el "formData" para el botón de pago
    setFormState((f) => ({
      ...f,
      formData: {
        ...f.formData,
        mobiletwo: partialFields.mobile ?? f.formData.mobiletwo,
        city: partialFields.city ?? f.formData.city,
        address: partialFields.address ?? f.formData.address,
        marketing:
          partialFields.allowMarketing ?? f.formData.marketing,
        email: partialFields.email ?? f.formData.email,
      },
      isValid: true,
    }));
  };

  const calculateSubtotal = (item) => {
    const price = parseFloat(item.Precio || item.price || 0);
    const additional = item.additionalService
      ? parseFloat(item.additionalService.price || 0)
      : 0;
    const quantity = item.reservationData?.persons || item.quantity || 1;
    return (price + additional) * quantity;
  };

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const effectiveFormValid = authUser ? true : formState.isValid;
  const effectiveFormData = visibleUser
    ? {
        // Mapea sólo los campos que el checkout necesita (mínimo email)
        firstName: visibleUser.firstName,
        middleName: visibleUser.middleName,
        lastName: visibleUser.lastName,
        secondLastName: visibleUser.secondLastName,
        documentType: visibleUser.documentType,
        document: visibleUser.document,
        mobiletwo: visibleUser.mobile,
        city: visibleUser.city,
        address: visibleUser.address,
        marketing: visibleUser.allowMarketing,
        email: visibleUser.email,
      }
    : formState.formData;

  const calculateProductDiscount = (cart, coupon, rate) => {
    if (!coupon || coupon.appliesTo !== "Productos") return 0;

    const validProductIds = coupon.products?.map((p) => p.documentId) || [];

    return cart
      .filter(
        (item) =>
          !item.isReservation && validProductIds.includes(item.documentId)
      )
      .reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantity * rate,
        0
      );
  };

  // Subtotales
  const subtotalProductos = useMemo(
    () =>
      cart
        .filter((item) => !item.reservationData)
        .reduce((sum, item) => sum + calculateSubtotal(item), 0),
    [cart]
  );

  const subtotalReservas = useMemo(
    () =>
      cart
        .filter((item) => item.reservationData)
        .reduce((sum, item) => sum + calculateSubtotal(item), 0),
    [cart]
  );

  const subtotalTotal = subtotalProductos + subtotalReservas;

  // Porcentaje de descuento
  const rawPercent = Number(coupon?.percent) || 0;
  const rate = Math.min(
    Math.max(rawPercent > 1 ? rawPercent / 100 : rawPercent, 0),
    1
  );

  const discount = useMemo(() => {
    if (!coupon) return 0;
    if (coupon.appliesTo === "Productos") {
      return calculateProductDiscount(cart, coupon, coupon.percent / 100);
    } else if (coupon.appliesTo === "Reservas") {
      return subtotalReservas * (coupon.percent / 100);
    }
    return subtotalTotal * (coupon.percent / 100);
  }, [coupon, cart, subtotalReservas, subtotalTotal]);

  const total = subtotalTotal - discount;

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + calculateSubtotal(item), 0),
    [cart]
  );

  const calculateItemDiscount = (item) => {
    if (!coupon) return 0;
    const subtotalItem = calculateSubtotal(item);

    if (coupon.appliesTo === "Productos") {
      if (item.reservationData) return 0;
      const validProductIds = coupon.products?.map((p) => p.documentId) || [];
      if (!validProductIds.includes(item.documentId)) return 0;
      return subtotalItem * rate;
    }

    if (coupon.appliesTo === "Reservas") {
      if (!item.reservationData) return 0;
      return subtotalItem * rate;
    }

    return subtotalItem * rate;
  };

  const orderData = useMemo(
    () =>
      cart.map((item) => ({
        id: item.documentId ? String(item.documentId) : "sin-id",
        documentId: item.documentId || null,
        title: item.title || item.attributes?.title || "Sin título",
        quantity: item.reservationData?.persons || item.quantity || 1,
        unitPrice: parseFloat(item.Precio || item.price || 0),
        isReservation: Boolean(item.reservationData),
        date: item.reservationData?.date || null,
        time: item.reservationData?.hour || null,
        additionalService: item.additionalService || null,
        image: item.image ? { url: item.image.url } : null,
      })),
    [cart]
  );

  /* const handleFormChange = ({ isValid, formData, triggerValidation }) => {
    setFormState({ isValid, formData, triggerValidation });
    setError("");
  }; */

  const onError = (message) => setError(message);
  /* 
  const processOrder = async () => {
    try {
      const data = formState.formData;
      let userId = null;

      if (data.register) {
        const registerResponse = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
            registerResult.error?.message || "Error al registrar usuario"
          );
        }
        userId = registerResult.user.id;
      }

      const customerData = {
        firstName: data.firstName.toUpperCase(),
        middleName: data.secondName?.toUpperCase() || "",
        lastName: data.lastname.toUpperCase(),
        secondLastName: data.secondSurname?.toUpperCase() || "",
        documentType: data.documentType,
        document: data.document,
        mobile: data.mobiletwo,
        gender: data.gender || null,
        bornDate: data.bornDate || null,
        city: data?.city,
        department: data.departament,
        address: data.address,
        email: data.email,
        allowMarketing: data.marketing,
        confirmed: false,
      };

      if (userId) {
        await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
            },
            body: JSON.stringify(customerData),
          }
        );
      }

      return customerData;
    } catch (error) {
      onError(error.message || "Error en el registro de usuario");
      throw error;
    }
  }; */

  // onBeforePayment: si authUser existe, actualizamos teléfono/dirección/ciudad/marketing
  const processOrder = async () => {
    const data = visibleUser ? effectiveFormData : formState.formData;
    const customerData = {
      firstName: visibleUser?.firstName || data.firstName?.toUpperCase(),
      middleName:
        visibleUser?.middleName || data.secondName?.toUpperCase() || "",
      lastName: visibleUser?.lastName || data.lastname?.toUpperCase(),
      secondLastName:
        visibleUser?.secondLastName ||
        data.secondSurname?.toUpperCase() ||
        "",
      documentType: visibleUser?.documentType || data.documentType,
      document: visibleUser?.document || data.document,
      mobile: data.mobiletwo,
      city: data.city,
      address: data.address,
      allowMarketing: data.marketing,
      email: visibleUser?.email || data.email,
      confirmed: !!visibleUser,
    };

    if (visibleUser) {
      await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${visibleUser.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
          body: JSON.stringify({
            mobile: customerData.mobile,
            city: customerData.city,
            address: customerData.address,
            allowMarketing: customerData.allowMarketing,
            email: customerData.email,
          }),
        }
      );
    }

    return customerData;
  };

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <>
      <main>
        <div className="container mx-auto p-5 lg:p-10">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-sm my-6 ">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 rounded-lg ">
            <div className="">
              <h1 className="font-bold text-2xl lg:text-4xl text-dark-green mb-8">
                Finaliza tu compra
              </h1>
              {authLoading ? (
                <div className="text-center flex flex-col items-center justify-center h-full">
                  <LottieAnimation
                    animationData={userlogin}
                    loop={true}
                    className="w-20 h-20"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Cargando información de usuario…
                  </p>
                </div>
              ) : authUser ? (
                <UserProfile
                  user={visibleUser}
                  onUserUpdate={handleUserUpdate}
                  shippingAddress={cart.some((item) => !item.reservationData)}
                />
              ) : (
                <>
                  <div className=" text-slate-600 border border-gray-200 p-5 rounded-lg flex items-center gap-2">
                    <div>
                      <LottieAnimation
                        animationData={userlogin}
                        loop={false}
                        className="w-20 h-20"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">¿Tienes una cuenta?</div>
                      <p>Haz más rápido tus pagos iniciando sesión</p>

                      {login ? (
                        <div>
                          <form className="flex flex-col gap-2 mt-5">
                            <input
                              type="text"
                              {...register("username")}
                              className="w-full border rounded px-3 py-2"
                            />
                            <input
                              type="password"
                              {...register("password")}
                              className="w-full border rounded px-3 py-2"
                            />
                            <div className="flex items-center gap-2 mt-5">
                              <button
                                type="submit"
                                className="bg-green-500 text-white px-3 py-1 rounded font-medium hover:bg-green-700 hover:scale-[1.03] active:scale-[0.97] duration-200"
                              >
                                Iniciar sesión
                              </button>
                              <button
                                onClick={() => setLogin(false)}
                                className="bg-red-500 text-white px-3 py-1 rounded font-medium hover:bg-red-700 hover:scale-[1.03] active:scale-[0.97] duration-200"
                              >
                                Cancelar
                              </button>
                            </div>
                          </form>{" "}
                        </div>
                      ) : (
                        <div className="mt-2 -text--light-green hover:-text--dark-green duration-200">
                          <Link href="#" onClick={() => setLogin(true)}>
                            Iniciar sesión
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <CheckoutForm
                    showAddressFields={cart.some((i) => !i.reservationData)}
                    onFormChange={handleFormChange}
                  />
                </>
              )}
            </div>

            <div className="col-span-1 pt-5 border-t border-gray-200 bg-slate-100/80 p-5 border-2 rounded-xl">
              <h2 className="font-bold text-2xl mb-6 text-dark-green text-center sm:text-left">
                Resumen de tu pedido
              </h2>
              <div className="rounded-lg py-4 p-2">
                {cart.map((item, index) => {
                  const {
                    title = "Sin título",
                    price: pricePerUnit = 0,
                    quantity = 1,
                    reservationData,
                  } = item;
                  const isReservation = !!reservationData;
                  const subtotalPrice = calculateSubtotal(item);

                  return (
                    <div
                      key={index}
                      className="grid grid-cols-5 py-3 gap-5 border-b border-gray-200 items-center"
                    >
                      <div className="col-span-4">
                        <div className="font-semibold text-gray-800">
                          {title}
                        </div>
                        {isReservation ? (
                          <div className="text-sm text-gray-600">
                            <div className="text-gray-700 text-xs">
                              <span className="font-semibold">Fecha: </span>
                              <span>{reservationData.date || "N/A"}</span>
                            </div>
                            <div className="text-gray-700 text-xs">
                              <span className="font-semibold">Hora: </span>
                              <span>{reservationData.hour || "N/A"}</span>
                            </div>
                            <div className="text-gray-700 text-xs">
                              <span className="font-semibold">
                                {item?.unitPlan
                                  ? `${item.unitPlan}s`
                                  : "Unidades"}
                                :{" "}
                              </span>
                              <span>{reservationData.persons || "N/A"}</span>
                            </div>
                            <div className="text-gray-700 text-xs">
                              <span className="font-semibold text-xs ">
                                Precio por{" "}
                                {item?.unitPlan
                                  ? `${item.unitPlan.toLowerCase()}`
                                  : "unidad"}
                                :{" "}
                              </span>
                              <span>{formatPrice(pricePerUnit)}</span>
                            </div>
                            {reservationData.additionalService && (
                              <div className="text-gray-700 text-xs">
                                <span className="font-semibold">
                                  Adicional:{" "}
                                </span>
                                <span>
                                  {reservationData.additionalService.name} -{" "}
                                  {formatPrice(
                                    reservationData.additionalService.price
                                  )}
                                </span>
                              </div>
                            )}

                            <div className="text-gray-700 text-xs">
                              <span className="font-semibold">Subtotal: </span>
                              <span>{formatPrice(subtotalPrice)}</span>
                              {calculateItemDiscount(item) > 0 && (
                                <div className="text-lime-600 text-xs mt-1">
                                  <span className="font-semibold">
                                    Descuento:{" "}
                                  </span>
                                  - {formatPrice(calculateItemDiscount(item))}
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="text-xs text-gray-700">
                              <span className="font-semibold ">
                                Precio unitario:{" "}
                              </span>
                              <span>
                                {`${formatPrice(pricePerUnit)} x ${quantity}`}
                              </span>
                            </div>
                            <div className="text-gray-700 text-xs">
                              <span className="font-semibold">Valor: </span>
                              <span>{formatPrice(subtotalPrice)}</span>
                            </div>
                            {calculateItemDiscount(item) > 0 && (
                              <div className="text-lime-600 text-xs mt-1">
                                <span className="font-semibold">
                                  Descuento:{" "}
                                </span>
                                - {formatPrice(calculateItemDiscount(item))}
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <div className="col-span-2 sm:col-span-1 sm:text-right gap-5">
                        <div className="">
                          <Tooltip
                            title={`Remover ${
                              item.title || "producto"
                            } de tu compra`}
                            placement="top"
                            arrow
                          >
                            <button
                              onClick={() => removeFromCart(item)}
                              className=""
                            >
                              <span className="icon-[si--remove-circle-line] text-xl hover:-text--red-cruz hover:scale-125 hover:text-light-red duration-300 hidden sm:block" />
                              <span className="text-light-red font-semibold sm:hidden text-sm">
                                Eliminar
                              </span>
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {coupon && (
                  <div className="space-y-5 text-gray-500 mt-5">
                    <div className="grid grid-cols-4">
                      <div className="col-span-2">
                        <div className="font-semibold">Subtotal</div>
                      </div>
                      <div className="col-span-2 text-right ">
                        {formatPrice(subtotal)}
                      </div>
                    </div>
                    <div className="grid grid-cols-4">
                      <div className="col-span-2">
                        <div className="font-semibold">Descuento</div>
                      </div>
                      <div className="col-span-2 text-right ">
                        {"-"}

                        {formatPrice(discount)}
                      </div>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-4 mt-5 text-gray-700">
                  <div className="col-span-2">
                    <div className="font-semibold">Total</div>
                  </div>
                  <div className="col-span-2 text-right font-semibold ">
                    <div>{formatPrice(total)}</div>
                  </div>
                </div>
                <div className="mt-10">
                  <CouponInput />
                </div>
                <CheckoutButton
                  orderData={orderData}
                  formData={effectiveFormData}
                  formValid={effectiveFormValid}
                  triggerValidation={formState.triggerValidation}
                  onBeforePayment={processOrder}
                  coupon={coupon}
                  onError={(msg) => console.error(msg)}
                  discount={discount}
                  total={total}
                />
              </div>
              <div className="flex flex-col text-center sm:flex-row sm:text-left items-center justify-center border border-gray-100 rounded-lg p-2">
                <Image
                  src={logoMercadoPago}
                  alt="Logo Mercado Pago"
                  className="w-44"
                />
                <p className="font-semibold text-sm text-gray-700">
                  Todos nuestros pagos son seguros y procesados por Mercado Pago
                </p>
              </div>
              <div className="mt-5 flex items-center justify-center gap-1">
                ¿Necesitas ayuda?
                <Link
                  href="/contacto"
                  className="text-dark-green font-semibold hover:text-light-green duration-200"
                >
                  Contáctanos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
