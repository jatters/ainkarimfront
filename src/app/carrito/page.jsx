"use client";
import React, { useContext } from "react";
import Link from "next/link"; // Considera usar 'next/link' estándar
import { CartContext } from "@/context/CartContext";
import Image from "next/image";

export default function CarritoPage() {
  const { cart, removeFromCart, updateQuantityInCart } =
    useContext(CartContext);
  const baseurl = process.env.NEXT_PUBLIC_STRAPI_URL;

  const calculateSubtotal = (item) => {
    const price = parseFloat(item.Precio || item.price) || 0;
    const additionalPrice = item.additionalService
      ? parseFloat(item.additionalService.price) || 0
      : 0;

    if (item.reservationData) {
      const persons = parseInt(item.reservationData.persons, 10) || 1;
      return price * persons + additionalPrice;
    } else {
      const quantity = parseInt(item.quantity, 10) || 1;
      return price * quantity + additionalPrice;
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const incrementarCantidad = (product) => {
    updateQuantityInCart(product, product.quantity + 1);
  };

  const decrementarCantidad = (product) => {
    if (product.quantity > 1) {
      updateQuantityInCart(product, product.quantity - 1);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const containsProducts = cart.some((item) => !item.reservationData);
  const containsReservations = cart.some((item) => item.reservationData);

  const continuarComprandoLink = containsProducts
    ? "/productos"
    : containsReservations
    ? "/visitas"
    : "/";

  return (
    <main>
      <section className="max-w-screen-lg mx-auto py-16 px-5">
        <h1 className="text-5xl -text--dark-green text-center font-bold mb-14">
          Carrito de Compras
        </h1>
        {cart.length === 0 ? (
          <>
            <p className="text-xl text-center">Tu carrito está vacío.</p>
            <div className="flex gap-3 justify-center mt-12">
              <Link
                href="/productos"
                className="-bg--dark-green text-white px-6 py-3 rounded-md hover:-bg--light-green duration-200"
              >
                Ir a la página de productos
              </Link>
              <Link
                href="/visitas"
                className="-bg--dark-green text-white px-6 py-3 rounded-md hover:-bg--light-green duration-200"
              >
                Ir a la lista de planes
              </Link>
            </div>
          </>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2">Producto</th>
                    <th className="py-2">Precio Unitario</th>
                    <th className="py-2">Cantidad</th>
                    <th className="py-2">Subtotal</th>
                    <th className="py-2">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const {
                      id,
                      Precio,
                      price,
                      quantity = 1,
                      additionalService,
                      reservationData,
                      image,
                      title: itemTitle,
                    } = item;
                    const isReservation = !!reservationData;
                    const displayPrice = parseFloat(Precio || price) || 0;
                    const displayQuantity = quantity;
                    const subtotal = calculateSubtotal(item);

                    const imageUrl = image?.formats?.thumbnail?.url
                      ? `${baseurl}${image.formats.thumbnail.url}`
                      : null;
                    const altText =
                      image?.alternativeText || "Imagen del producto";
                    const title = isReservation
                      ? itemTitle
                      : itemTitle || "Sin título";

                    return (
                      <tr key={id} className="text-center">
                        <td className="py-2 flex items-center px-5">
                          {!isReservation && imageUrl && (
                            <Image
                              src={imageUrl || "/default-image.jpg"}
                              alt={altText}
                              height={64}
                              width={64}
                              className="w-16 h-16 object-cover mr-4"
                            />
                          )}
                          <span className="inline-block break-words max-w-xs text-left">
                            {title}
                            {additionalService && (
                              <div className="text-sm text-gray-600">
                                <div>Adicional: {additionalService.name}</div>
                                <div>
                                  + {formatPrice(additionalService.price)}
                                </div>
                              </div>
                            )}
                          </span>
                        </td>
                        <td className="py-2 items-center justify-center">
                          {formatPrice(displayPrice)}
                        </td>
                        <td className="py-2 px-5">
                          <div className="flex items-center justify-center">
                            <button
                              className="-bg--dark-green/70 text-white px-2 py-2 rounded-l hover:-bg--dark-green focus:outline-none"
                              onClick={() => decrementarCantidad(item)}
                              aria-label={`Disminuir cantidad de ${title}`}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={displayQuantity}
                              readOnly
                              className="appearance-none border -border--dark-green/70 w-14 px-3 py-2 text-gray-700 text-center leading-tight focus:outline-none"
                              aria-label={`Cantidad de ${title}`}
                            />
                            <button
                              className="-bg--dark-green/70 text-white px-2 py-2 rounded-r hover:-bg--dark-green focus:outline-none"
                              onClick={() => incrementarCantidad(item)}
                              aria-label={`Aumentar cantidad de ${title}`}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-2 px-5 items-center justify-center">
                          {formatPrice(subtotal)}
                        </td>
                        <td className="py-2 px-5 items-center justify-center">
                          <button
                            onClick={() => removeFromCart(item)}
                            aria-label={`Eliminar ${title}`}
                          >
                            <span className="icon-[mynaui--trash]" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="max-w-screen-lg mx-auto mt-6 flex flex-col md:flex-row justify-between items-center">
              <div className="flex gap-4">
                <Link
                  href={continuarComprandoLink}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Continuar comprando
                </Link>
                <Link
                  href="/finalizar-compra"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Finalizar compra
                </Link>
              </div>
              <div className="flex flex-col items-end mt-4 md:mt-0">
                <div className="text-xl font-bold">
                  Total: {formatPrice(calculateTotal())}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
