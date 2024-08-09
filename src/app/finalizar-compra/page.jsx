"use client";
import React, { useContext } from "react";
import CheckoutForm from "@/components/Forms/CheckoutForm";
import { CartContext } from "@/context/CartContext";

export default function PaymentPage() {
  const { cart, removeFromCart } = useContext(CartContext);

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) =>
        total +
        calculateSubtotal(
          product.attributes?.Precio || 0,
          product.quantity || 0
        ),
      0
    );
  };

  const baseurl = process.env.STRAPI_URL;

  return (
    <div className="container mx-auto pt-16 pb-14">
      <h1 className="font-bold text-center text-5xl uppercase -text--dark-green">
        FINALIZAR COMPRA
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 -bg--grey-lightest py-10 px-6 rounded-lg">
        <div className="col-span-1">
          <div>
            <CheckoutForm />
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
              const title = attributes.title || "Sin título";
              const price = attributes.Precio || 0;
              const quantity = product.quantity || 1;

              return (
                <div
                  key={index}
                  className="grid grid-cols-4 py-8 border-t justify-items-center items-center"
                >
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
                  <div className="col-span-2">
                    <div className="font-bold">{title}</div>
                    <div className="">{attributes.slug}</div>
                    <div className="">
                      <div>Precio: ${price}</div>
                    </div>
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
                <div>${calculateTotal()}</div>
                <div>$0</div>
              </div>
            </div>
            <div className="grid grid-cols-4 py-8 border-t">
              <div className="col-span-2">
                <div className="font-bold">Total</div>
              </div>
              <div className="col-span-2 text-right">
                <div>${calculateTotal()}</div>
              </div>
            </div>
            <div className="py-8 border-t">
              <button className="-bg--light-green text-white font-bold py-3 rounded-lg w-full hover:-bg--dark-green duration-200">
                REALIZAR PAGO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
