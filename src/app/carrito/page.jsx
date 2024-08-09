"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";

export default function CarritoPage() {
  const { cart, removeFromCart, updateQuantityInCart } = useContext(CartContext);
  const baseurl = process.env.STRAPI_URL;

  // Calcular el subtotal de cada producto y el total general
  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) =>
        total + calculateSubtotal(parseFloat(item.attributes.Precio) || 0, item.quantity || 0),
      0
    );
  };

  const incrementarCantidad = (product) => {
    updateQuantityInCart(product, product.quantity + 1);
  };

  const decrementarCantidad = (product) => {
    if (product.quantity > 1) {
      updateQuantityInCart(product, product.quantity - 1);
    }
  };

  return (
    <div className="container mx-auto pt-16 pb-14">
      <h1 className="text-5xl -text--dark-green text-center font-bold mb-14">Carrito de Compras</h1>
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
                const imageUrl = attributes.Imagen?.data?.attributes?.formats
                  ?.thumbnail?.url
                  ? `${baseurl}${attributes.Imagen.data.attributes.formats.thumbnail.url}`
                  : null;
                const altText =
                  attributes.Imagen?.data?.attributes?.alternativeText ||
                  "Imagen del producto";
                const title = isReservation
                  ? `${item.title} - ${item.reservationData.fecha} - ${item.reservationData.personas} personas`
                  : attributes.title || "Sin título";
                const price = parseFloat(attributes.Precio) || 0;
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
                    <td className="py-2">{price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                    <td className="py-2">
                      <div className="flex items-center justify-center">
                        <button
                          className="-bg--grey-lightest text-gray-700 px-2 py-1 rounded-l focus:outline-none"
                          onClick={() => decrementarCantidad(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          readOnly
                          className="appearance-none border -border--grey-lightest w-12 px-3 py-1 text-gray-700 text-center leading-tight focus:outline-none"
                        />
                        <button
                          className="-bg--grey-lightest text-gray-700 px-2 py-1 rounded-r focus:outline-none"
                          onClick={() => incrementarCantidad(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-2">
                      {(calculateSubtotal(price, quantity)).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                    </td>
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
                  placeholder="¿Tienes un cupón?"
                  className="border px-2 py-1 rounded-md"
                />
                <button className="-bg--dark-green text-white px-4 py-1 rounded-md hover:-bg--light-green duration-300">
                  Aplicar
                </button>
              </div>
              <div className="text-xl font-bold">
                Total: {calculateTotal().toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
