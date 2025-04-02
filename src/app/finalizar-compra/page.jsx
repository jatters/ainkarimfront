"use client";
import React, { useContext, useState } from "react";
import CheckoutForm from "@/components/Forms/CheckoutForm";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import CheckoutButton from "@/components/Ecommerce/CheckoutButton";
import Tooltip from "@mui/material/Tooltip";
import Head from "next/head";
import CouponInput from "@/components/Ecommerce/CouponInput";

export default function PaymentPage() {
  const { cart, removeFromCart, coupon } = useContext(CartContext);
  const [formState, setFormState] = useState({ isValid: false, formData: {} });
  const [processing, setProcessing] = useState(false);

  const handleFormChange = (updatedFormState) => {
    setFormState(updatedFormState);
  };
  const processOrder = async () => {
    setProcessing(true);
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
      console.error("❌ Error en el registro:", error);
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  const calculateSubtotal = (item) => {
    const price = parseFloat(item.Precio || item.price || 0);
    const additionalPrice = item.additionalService
      ? parseFloat(item.additionalService.price)
      : 0;
    const quantity = item.reservationData?.persons || item.quantity || 1;
    return price * quantity + additionalPrice;
  };

  const calculateTotal = () => {
    if (coupon) {
      return (
        cart.reduce((total, item) => total + calculateSubtotal(item), 0) -
        cart.reduce((total, item) => total + calculateSubtotal(item), 0) *
          (coupon.percent / 100)
      );
    }
    return cart.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const formatPrice = (price) => {
    return `$${Number(price).toLocaleString("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const baseurl = process.env.NEXT_PUBLIC_STRAPI_URL;

  const orderData = cart.map((product) => ({
    id: product.documentId ? String(product.documentId) : "sin-id",
    name: product.title || product.attributes?.title || "Producto sin nombre",
    date: product.reservationData?.date || null,
    time: product.reservationData?.hour || null,
    guests: product.reservationData?.persons || null,
    price: parseFloat(product.Precio || product.price || 0),
    additionalService: product.additionalService || null,
    quantity: product.quantity || 1,
    image: product.image ? { url: product.image.url } : null,
  }));
  const subtotal = cart.reduce(
    (total, item) => total + calculateSubtotal(item),
    0
  );
  const discountValue = coupon ? subtotal * (coupon.percent / 100) : 0;
  const total = subtotal - discountValue;

  return (
    <>
      <main>
        <div className="container mx-auto py-8 lg:py-16 px-5">
          <h1 className="font-bold text-center text-2xl lg:text-4xl uppercase -text--dark-green">
            FINALIZAR COMPRA
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-9 -bg--grey-lightest py-5 lg:py-10 rounded-lg ">
            <div className="mt-6">
              {orderData.length > 0 && (
                <CheckoutForm
                  showAddressFields={cart.some((item) => !item.reservationData)}
                  onFormChange={handleFormChange}
                />
              )}
            </div>

            {/* Columna derecha: Resumen del pedido */}
            <div className="col-span-1">
              <h2 className="font-bold text-2xl mb-6 -text--dark-green">
                TU PEDIDO
              </h2>
              <div className="bg-white rounded-lg py-4 px-5 border">
                {cart.map((product, index) => {
                  const isReservation = !!product.reservationData;

                  const title =
                    product.title || product.attributes?.title || "Sin título";
                  const pricePerUnit = parseFloat(
                    product.Precio || product.price || 0
                  );
                  const quantity =
                    product.reservationData?.persons || product.quantity || 1;

                  const subtotalPrice = calculateSubtotal(product);

                  return (
                    <div
                      key={index}
                      className="grid grid-cols-5 py-3 pl-4 gap-5 border-b items-center hover:bg-slate-100 duration-200"
                    >
                      <div className="col-span-4">
                        <div className="font-bold -text--dark-green">
                          {title}
                        </div>
                        {isReservation ? (
                          <div className="text-sm text-gray-600">
                            <div>
                              <span className="font-semibold -text--dark-green">
                                Fecha:
                              </span>{" "}
                              {product.reservationData?.date || "N/A"}
                            </div>
                            <div>
                              <span className="font-semibold -text--dark-green">
                                Hora:
                              </span>{" "}
                              {product.reservationData?.hour || "N/A"}
                            </div>
                            <div>
                              <span className="font-semibold -text--dark-green">
                                {`${product.unitPlan}s`}:
                              </span>{" "}
                              {product.reservationData?.persons || "N/A"}
                            </div>
                            <div>
                              <span className="font-semibold -text--dark-green">
                                Precio por{" "}
                                {`${product?.unitPlan.toLowerCase()}` ||
                                  "unidad"}
                                :
                              </span>{" "}
                              {formatPrice(pricePerUnit)}
                            </div>
                            {product.additionalService && (
                              <div>
                                <span className="font-semibold -text--dark-green">
                                  Adicional:
                                </span>{" "}
                                {product.additionalService.name} -{" "}
                                {formatPrice(product.additionalService.price)}
                              </div>
                            )}
                            <div>
                              <span className="font-semibold -text--dark-green">
                                Subtotal:
                              </span>{" "}
                              {formatPrice(subtotalPrice)}
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="text-sm">
                              <span className="font-semibold -text--dark-green">
                                Precio unitario:
                              </span>{" "}
                              {`${formatPrice(pricePerUnit)} x ${quantity}`}
                            </div>
                            <div>
                              <span className="font-semibold -text--dark-green">
                                Valor:
                              </span>{" "}
                              {formatPrice(subtotalPrice)}
                            </div>
                          </>
                        )}
                      </div>

                      <div className="col-span-2 sm:col-span-1 sm:text-center gap-5">
                        <div className="mb-5 sm:mb-1">
                          {quantity} {quantity > 1 ? "unidades" : "unidad"}
                        </div>
                        <div>
                          <Tooltip
                            title="Eliminar producto"
                            placement="top"
                            arrow
                          >
                            <button onClick={() => removeFromCart(product)}>
                              <span className="icon-[mingcute--delete-2-line] text-xl hover:-text--red-cruz hover:scale-125 hover:-text--light-red duration-300 hidden sm:block" />
                              <span className="-text--light-red font-semibold sm:hidden">
                                Eliminar
                              </span>
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Total */}
                {coupon && (
                  <div className="my-3">
                    <div className="grid grid-cols-4">
                      <div className="col-span-2">
                        <div className="font-bold text-lg">Subtotal</div>
                      </div>
                      <div className="col-span-2 text-right text-lg">
                        {formatPrice(subtotal)}
                      </div>
                    </div>
                    <div className="grid grid-cols-4">
                      <div className="col-span-2">
                        <div className="font-bold text-lg">Descuento</div>
                      </div>
                      <div className="col-span-2 text-right text-lg">
                        {"-"}

                        {formatPrice(discountValue)}
                      </div>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-4 py-8 border-t">
                  <div className="col-span-2">
                    <div className="font-bold text-xl">Total</div>
                  </div>
                  <div className="col-span-2 text-right text-xl">
                    <div>{formatPrice(total)}</div>
                  </div>
                </div>

                <div>
                  <CheckoutButton
                    orderData={cart}
                    formData={formState.formData}
                    formValid={formState.isValid}
                    triggerValidation={formState.triggerValidation}
                    onBeforePayment={processOrder}
                    coupon={coupon}
                  />
                </div>
                <div className="mt-8">
                  <CouponInput />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
