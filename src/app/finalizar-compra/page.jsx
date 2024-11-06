"use client";
import React, { useContext } from "react";
import CheckoutForm from "@/components/Forms/CheckoutForm";
import { CartContext } from "@/context/CartContext";

export default function PaymentPage() {
  const { cart, removeFromCart } = useContext(CartContext);

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

  const orderData = cart.map((product) => ({
    id: product.id,
    plan: product.id, // ID del plan (si es reserva)
    name: product.title, // Nombre del producto o plan
    date: product.reservationData?.date || null, // Fecha de la reserva (si aplica)
    time: product.reservationData?.hour || null, // Hora de la reserva (si aplica)
    guests: product.reservationData?.persons || null, // Número de personas (si aplica)
    price: parseFloat(product.Precio || product.price || 0), // Precio del producto o plan
    additionalService: product.additionalService || null, // Servicio adicional si existe
    quantity: product.quantity || 1, // Cantidad
  }));

  return (
    <div className="container mx-auto pt-16 pb-14">
      <h1 className="font-bold text-center text-5xl uppercase -text--dark-green">
        FINALIZAR COMPRA
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 -bg--grey-lightest py-10 px-6 rounded-lg">
        <div className="col-span-1">
          <div>
            {orderData.length > 0 && (
              <CheckoutForm
                showAddressFields={cart.some((item) => !item.reservationData)}
                orderData={orderData}
              />
            )}
          </div>
        </div>
        <div className="col-span-1">
          <h2 className="font-bold text-2xl mb-6 -text--dark-green">
            TU PEDIDO
          </h2>
          <div className="bg-white rounded-lg py-4 px-5 border">
            {cart.map((product, index) => {
              const isReservation = !!product.reservationData;

              let imageUrl = null;
              if (
                !isReservation &&
                product.attributes?.image?.formats?.thumbnail?.url
              ) {
                imageUrl = `${baseurl}${product.attributes.image.formats.thumbnail.url}`;
              }

              const altText = isReservation
                ? "Imagen no disponible para reservas"
                : product.attributes?.image?.alternativeText ||
                  "Imagen del producto";

              const title =
                product.title || product.attributes?.title || "Sin título";
              const pricePerUnit = parseFloat(
                product.Precio || product.price || 0
              );
              const quantity =
                product.reservationData?.persons || product.quantity || 1;

              // Aquí se calcula el subtotal usando la función
              const subtotalPrice = calculateSubtotal(product);

              return (
                <div
                  key={index}
                  className="grid grid-cols-5 py-8 border-t items-center"
                >
                  {!isReservation && (
                    <div className="col-span-1">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={altText}
                          className="h-20 w-20 object-cover"
                        />
                      ) : (
                        <span className="mr-2">Sin imagen</span>
                      )}
                    </div>
                  )}
                  <div className={isReservation ? "col-span-4" : "col-span-3"}>
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
                            Precio:
                          </span>{" "}
                          {formatPrice(pricePerUnit)}
                        </div>
                        <div>
                          <span className="font-semibold -text--dark-green">
                            Subtotal:
                          </span>{" "}
                          {formatPrice(subtotalPrice)}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="col-span-1 text-center">
                    <div>
                      <button onClick={() => removeFromCart(product)}>
                        <span className="icon-[mingcute--delete-2-line] text-xl hover:-text--red-cruz hover:scale-125 hover:-text--light-red duration-300" />
                      </button>
                    </div>
                    <div>
                      {quantity} {quantity > 1 ? "unidades" : "unidad"}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="grid grid-cols-4 py-8 border-t">
              <div className="col-span-2">
                <div className="font-bold text-xl">Total</div>
              </div>
              <div className="col-span-2 text-right text-xl">
                <div>{formatPrice(calculateTotal())}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
