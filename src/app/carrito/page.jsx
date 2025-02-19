"use client";
import React, { useContext } from "react";
import { Link } from "next-view-transitions";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";

export default function CarritoPage() {
  const { cart, removeFromCart, updateQuantityInCart } =
    useContext(CartContext);

  const baseurl = process.env.NEXT_PUBLIC_STRAPI_URL;

  const calculateSubtotal = (item) => {
    const unitPrice = parseFloat(item.price) || 0;
    const additionalPrice = item.additionalService
      ? parseFloat(item.additionalService.price) || 0
      : 0;
    const quantity = parseInt(item.quantity, 10) || 1;
    return unitPrice * quantity + additionalPrice;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const incrementarCantidad = (product) => {
    if (product.isReservation && product.maxQuantity && product.availableSpots) {
      const maxAllowed = Math.min(product.maxQuantity, product.availableSpots);
      if (product.quantity >= maxAllowed) {
        return; // No permite incrementar más
      }
    }
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
      <section className="max-w-screen-lg mx-auto py-8 lg:py-16 px-5">
        <h1 className=" text-2xl lg:text-5xl -text--dark-green text-center font-bold mb-14">
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
                  {console.log("cart:", cart)}
                  {cart.map((item, index) => {
                    // Dado que los datos están normalizados, usamos directamente item.title, item.price, item.quantity y item.image.
                    // Si el producto es variable, concatenamos el título con el nombre de la variación.
                    const displayTitle = item.isReservation
                      ? `${item.attributes?.name || item.title} - ${
                          item.reservationData.date
                        } - ${
                          parseInt(item.reservationData.persons, 10) > 1
                            ? item.reservationData.persons + " personas"
                            : "1 persona"
                        } - ${item.reservationData.hour}`
                      : item.isVariable && item.variation
                      ? `${item.title} - ${item.variation.name}`
                      : item.title || "Sin título";
                    const subtotal = calculateSubtotal(item);

                    // La imagen ya es una URL completa.
                    const imageUrl =
                      typeof item.image === "string"
                        ? item.image
                        : item.image &&
                          item.image.formats &&
                          item.image.formats.thumbnail
                        ? `${baseurl}${item.image.formats.thumbnail.url}`
                        : null;
                    const altText = imageUrl
                      ? `Imagen de ${displayTitle}`
                      : "Imagen del producto";

                    return (
                      <tr
                        key={index}
                        className="text-center even:bg-gray-100 rounded-md hover:bg-gray-200 duration-200 border-b"
                      >
                        <td className="py-2 flex items-center px-5  ">
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt={altText}
                              height={64}
                              width={64}
                              className="w-16 h-16 object-cover mr-4"
                            />
                          )}
                          <span className="inline-block break-words max-w-xs text-left">
                            {displayTitle}
                            {item.additionalService && (
                              <div className="text-sm text-gray-600">
                                <div>
                                  Adicional: {item.additionalService.name}
                                </div>
                                <div>
                                  + {formatPrice(item.additionalService.price)}
                                </div>
                              </div>
                            )}
                          </span>
                        </td>
                        <td className="py-2 items-center justify-center">
                          {formatPrice(item.price)}
                        </td>
                        <td className="py-2 px-5">
                          <div className="flex items-center justify-center">
                            <button
                              className="-bg--dark-green/70 text-white px-2 py-2 rounded-l hover:-bg--dark-green focus:outline-none"
                              onClick={() => decrementarCantidad(item)}
                              aria-label={`Disminuir cantidad de ${displayTitle}`}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              readOnly
                              className="appearance-none border -border--dark-green/70 w-12 h-10 px-0 py-2 text-gray-700 text-center focus:outline-none "
                              aria-label={`Cantidad de ${displayTitle}`}
                            />
                            <button
                              className="-bg--dark-green/70 text-white px-2 py-2 rounded-r hover:-bg--dark-green focus:outline-none"
                              onClick={() => incrementarCantidad(item)}
                              disabled={
                                item.reservationData &&
                                item.maxQuantity &&
                                item.availableSpots &&
                                item.quantity >=
                                  Math.min(
                                    item.maxQuantity,
                                    item.availableSpots
                                  )
                              }
                              aria-label={`Aumentar cantidad de ${displayTitle}`}
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
                            aria-label={`Eliminar ${displayTitle}`}
                          >
                            <span className="icon-[mynaui--trash] hover:-text--light-red hover:scale-125 duration-200" />
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
