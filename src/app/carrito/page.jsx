"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";

export default function CarritoPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  const baseurl = process.env.STRAPI_URL;

  // Calcular el subtotal de cada producto y el total general
  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + calculateSubtotal(item.Precio || 0, item.quantity || 0),
      0
    );
  };

  return (
    <div className="container mx-auto pt-16 pb-14">
      <h1 className="text-3xl mb-6">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Producto</th>
                <th className="py-2">Precio</th>
                <th className="py-2">Cantidad</th>
                <th className="py-2">Subtotal</th>
                <th className="py-2">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                const isReservation = item.reservationData !== undefined;
                const attributes = item.attributes || {};
                const imageUrl = attributes.Imagen?.data?.attributes?.formats?.thumbnail?.url
                  ? `${baseurl}${attributes.Imagen.data.attributes.formats.thumbnail.url}`
                  : null;
                const altText = attributes.Imagen?.data?.attributes?.alternativeText || "Imagen del producto";
                const title = isReservation
                  ? `${item.title} - ${item.reservationData.fecha} - ${item.reservationData.personas} personas`
                  : attributes.title || "Sin título";
                const price = item.Precio || 0;
                const quantity = item.quantity || 1;

                return (
                  <tr key={index} className="text-center">
                    <td className="py-2 flex items-center justify-center">
                      {!isReservation && imageUrl && (
                        <img
                          src={imageUrl}
                          alt={altText}
                          className="w-16 h-16 object-cover mr-4"
                        />
                      )}
                      {title}
                    </td>
                    <td className="py-2">{price}</td>
                    <td className="py-2">{quantity}</td>
                    <td className="py-2">{calculateSubtotal(price, quantity)}</td>
                    <td className="py-2">
                      <button onClick={() => removeFromCart(item)}>
                        <span className="icon-[mynaui--trash]" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-6 flex justify-between items-center">
            <div className="flex gap-4">
              <Link href="/productos" legacyBehavior>
                <a className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                  Continuar comprando
                </a>
              </Link>
              <Link href="/finalizar-compra" legacyBehavior>
                <a className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                  Finalizar compra
                </a>
              </Link>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Código de cupón"
                  className="border px-2 py-1 rounded-md"
                />
                <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                  Aplicar
                </button>
              </div>
              <div className="text-xl font-bold">
                Total: ${calculateTotal().toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
