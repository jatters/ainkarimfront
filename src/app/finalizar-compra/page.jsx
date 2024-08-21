"use client";
import React, { useContext } from "react";
import CheckoutForm from "@/components/Forms/CheckoutForm";
import { CartContext } from "@/context/CartContext";

export default function PaymentPage() {
  const { cart, removeFromCart } = useContext(CartContext);

  const calculateSubtotal = (price, quantity, additionalService) => {
    const additionalPrice = additionalService ? parseFloat(additionalService.price) : 0;
    return (price * quantity) + additionalPrice;
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) =>
        total +
        calculateSubtotal(
          product.attributes?.Precio || product.Precio || 0,
          product.quantity || 0,
          product.additionalService
        ),
      0
    );
  };

  const formatPrice = (price) => {
    return `$${Number(price).toLocaleString("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const baseurl = process.env.STRAPI_URL;

  const orderData = cart.map(product => ({
    plan: product.id,  // ID del plan
    date: product.reservationData?.date,  // Fecha de la reserva
    time: product.reservationData?.hour,  // Hora de la reserva
    guests: product.reservationData?.persons,  // Número de personas
    additionalService: product.additionalService,  // Servicio adicional si existe
  }));

  return (
    
    <div className="container mx-auto pt-16 pb-14">
      {/* {console.log("carrito actual", orderData[0].plan)} */}
      <h1 className="font-bold text-center text-5xl uppercase -text--dark-green">
        FINALIZAR COMPRA
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 -bg--grey-lightest py-10 px-6 rounded-lg">
        <div className="col-span-1">
          <div>
            <CheckoutForm showAddressFields={cart.some(item => !item.reservationData)} orderData={orderData} />
          </div>
        </div>
        <div className="col-span-1">
          <h2 className="font-bold text-2xl mb-6">TU PEDIDO</h2>
          <div className="bg-white rounded-lg py-4 px-5 border">
            {cart.map((product, index) => {
              const attributes = product?.attributes || {};
              const imageUrl = attributes.Imagen?.data?.attributes?.formats
                ?.thumbnail?.url
                ? `${baseurl}${attributes.Imagen.data.attributes.formats.thumbnail.url}`
                : null;
              const altText =
                attributes.Imagen?.data?.attributes?.alternativeText ||
                "Imagen del producto";
              const title = attributes.title || product.title || "Sin título";
              const pricePerUnit = attributes.Precio || product.Precio || 0;
              const quantity = product.quantity || 1;
              const isReservation = !!product.reservationData;
              const subtotalPrice = calculateSubtotal(pricePerUnit, quantity, product.additionalService);

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
                    <div className="font-bold">{title}</div>
                    {isReservation ? (
                      <div className="text-sm text-gray-600">
                        <div>Fecha: {product.reservationData?.date || "N/A"}</div>
                        <div>Hora: {product.reservationData?.hour || "N/A"}</div>
                        <div>Personas: {product.reservationData?.persons || "N/A"}</div>
                        <div>Precio por persona: {formatPrice(pricePerUnit)}</div>
                        {product.additionalService && (
                          <div>Adicional: {product.additionalService.name} - {formatPrice(product.additionalService.price)}</div>
                        )}
                        <div>Subtotal: {formatPrice(subtotalPrice)}</div>
                      </div>
                    ) : (
                      <>
                        <div className="">{attributes.slug}</div>
                        <div>Precio: {formatPrice(pricePerUnit)}</div>
                      </>
                    )}
                  </div>
                  <div className="col-span-1 text-center">
                    <div>
                      <button onClick={() => removeFromCart(product)}>
                        <span className="icon-[mingcute--delete-2-line] text-xl hover:-text--red-cruz hover:scale-125 duration-300" />
                      </button>
                    </div>
                    <div>{quantity} unidad(es)</div>
                  </div>
                </div>
              );
            })}
            <div className="grid grid-cols-4 py-8 border-t">
              <div className="col-span-2">
                <div>Subtotal</div>
                <div>Impuestos</div>
              </div>
              <div className="col-span-2 text-right">
                <div>{formatPrice(calculateTotal())}</div>
                <div>$0</div>
              </div>
            </div>
            <div className="grid grid-cols-4 py-8 border-t">
              <div className="col-span-2">
                <div className="font-bold">Total</div>
              </div>
              <div className="col-span-2 text-right">
                <div>{formatPrice(calculateTotal())}</div>
              </div>
            </div>
           {/*  <div className="py-8 border-t">
              <button className="-bg--light-green text-white font-bold py-3 rounded-lg w-full hover:-bg--dark-green duration-200">
                REALIZAR PAGO
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
