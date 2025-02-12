"use client";
import React, { useContext, useState } from "react";
import CheckoutForm from "@/components/Forms/CheckoutForm";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import CheckoutButton from "@/components/Ecommerce/CheckoutButton";
import Tooltip from "@mui/material/Tooltip";

export default function PaymentPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  const [formState, setFormState] = useState({ isValid: false, formData: {} });
  /* const handleFormSubmit = (formData) => {
    setFormState({ isValid: true, formData });
  }; */

  const handleFormChange = (updatedFormState) => {
    setFormState(updatedFormState);
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
    return cart.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const formatPrice = (price) => {
    return `$${Number(price).toLocaleString("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const baseurl = process.env.NEXT_PUBLIC_STRAPI_URL;

  // orderData se usa para registrar/mostrar info de lo que se va a pagar
  const orderData = cart.map((product) => ({
    id: product.documentId ? String(product.documentId) : "sin-id",
    name: product.title || product.attributes?.title || "Producto sin nombre",
    date: product.reservationData?.date || null,
    time: product.reservationData?.hour || null,
    guests: product.reservationData?.persons || null,
    price: parseFloat(product.Precio || product.price || 0),
    additionalService: product.additionalService || null,
    quantity: product.quantity || 1,
    image: product.image ? { url: product.image.url } : null, // ✅ Agregar imagen si existe
  }));
  
  //console.log("🛒 Datos de `orderData` antes de enviar:", orderData);
  //{//console.log("cart es:", cart)}
  //{//console.log("orderdata es:", orderData)}
  
  
  return (
    <main>
      <div className="container mx-auto py-8 lg:py-16 px-5">
        <h1 className="font-bold text-center text-2xl lg:text-4xl uppercase -text--dark-green">
          FINALIZAR COMPRA
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-9 -bg--grey-lightest py-5 lg:py-10 rounded-lg ">
          {/* Columna izquierda: Formulario de datos cliente */}
          <div className="col-span-1 mt-6">
              {orderData.length > 0 && (
                <CheckoutForm
                  showAddressFields={cart.some((item) => !item.reservationData)}
                  orderData={orderData}
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
                    className="grid grid-cols-5 py-3 pl-4 border-b items-center hover:bg-slate-100 duration-200"
                  >{console.log("El carrito actual es:", cart)}
                    <div className="col-span-4">
                      <div className="font-bold -text--dark-green">{title}</div>
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
                              Personas:
                            </span>{" "}
                            {product.reservationData?.persons || "N/A"}
                          </div>
                          <div>
                            <span className="font-semibold -text--dark-green">
                              Precio por persona:
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

                    <div className="col-span-1 text-center">
                      <div>
                        <Tooltip
                          title="Eliminar producto"
                          placement="top"
                          arrow
                        >
                          <button onClick={() => removeFromCart(product)}>
                            <span className="icon-[mingcute--delete-2-line] text-xl hover:-text--red-cruz hover:scale-125 hover:-text--light-red duration-300" />
                          </button>
                        </Tooltip>
                      </div>
                      <div>
                        {quantity} {quantity > 1 ? "unidades" : "unidad"}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Total */}
              <div className="grid grid-cols-4 py-8 border-t">
                <div className="col-span-2">
                  <div className="font-bold text-xl">Total</div>
                </div>
                <div className="col-span-2 text-right text-xl">
                  <div>{formatPrice(calculateTotal())}</div>
                </div>
              </div>

              {/* Botón de pago Mercado Pago */}
              <div>
                <CheckoutButton
                  orderData={cart}
                  formData={formState.formData}
                  formValid={formState.isValid}
                  triggerValidation={formState.triggerValidation} // ✅ Pasamos la validación al botón
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
