"use client";
import React, { useContext } from "react";
import { Link } from "next-view-transitions";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import CouponInput from "@/components/Ecommerce/CouponInput";
import Tooltip from "@mui/material/Tooltip";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  const day = date.getDate().toString().padStart(2, "0");
  const month = capitalize(date.toLocaleString("es-ES", { month: "long" }));
  const year = date.getFullYear();
  return `${month} ${day} de ${year}`;
}

const calculateProductDiscount = (cart, coupon, rate) => {
  if (!coupon || coupon.appliesTo !== "Productos") return 0;

  const validProductIds = coupon.products?.map((p) => p.documentId) || [];

  return cart
    .filter(
      (item) => !item.isReservation && validProductIds.includes(item.documentId)
    )
    .reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity * rate,
      0
    );
};

export default function CarritoPage() {
  const { cart, removeFromCart, updateQuantityInCart, coupon } =
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
  const subtotalProductos = cart
    .filter((item) => !item.reservationData)
    .reduce((sum, item) => sum + calculateSubtotal(item), 0);

  const subtotalReservas = cart
    .filter((item) => item.reservationData)
    .reduce((sum, item) => sum + calculateSubtotal(item), 0);

  const subtotalTotal = subtotalProductos + subtotalReservas;

  //const subtotal = cart.reduce((sum, item) => sum + calculateSubtotal(item), 0);
  const rawPercent = Number(coupon?.percent) || 0;
  const rate = Math.min(
    Math.max(rawPercent > 1 ? rawPercent / 100 : rawPercent, 0),
    1
  );

  let descuento = 0;
  if (coupon) {
    switch (coupon.appliesTo) {
      case "Productos":
        descuento = calculateProductDiscount(cart, coupon, rate);
        break;
      case "Reservas":
        descuento = subtotalReservas * rate;
        break;
      case "Valor total del carrito":
      default:
        descuento = subtotalTotal * rate;
        break;
    }
  }
  const total = Math.max(subtotalTotal - descuento, 0);

  const incrementarCantidad = (product) => {
    if (
      product.isReservation &&
      product.maxQuantity &&
      product.availableSpots
    ) {
      const maxAllowed = Math.min(product.maxQuantity, product.availableSpots);
      if (product.quantity >= maxAllowed) {
        return;
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

  const containsProducts = cart.some((item) => !item.reservationData);
  const containsReservations = cart.some((item) => item.reservationData);

  const continuarComprandoLink = containsProducts
    ? "/productos"
    : containsReservations
    ? "/visitas"
    : "/";

  return (
    <main>
      <section className="max-w-screen-xl mx-auto py-8 lg:pt-12 lg:pb-16 px-5 lg:px-2">
        <h1 className=" text-2xl lg:text-3xl -text--dark-green text-center font-bold mb-5 lg:mb-14 lg:col-span-8">
          Carrito de Compras
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
          {cart.length === 0 ? (
            <>
              <p className="text-xl text-center">Tu carrito está vacío.</p>
              <div className="flex gap-3 justify-center mt-12 lg:col-span-8">
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
            <div className="lg:col-span-6">
              <div className="overflow-x-auto hidden lg:block">
                <table className="min-w-full bg-white">
                  <thead className="border-b border-gray-100">
                    <tr className="-text--light-green">
                      <th className="py-2 font-semibold">Producto</th>
                      <th className="py-2 font-semibold">Precio</th>
                      <th className="py-2 font-semibold">Cantidad</th>
                      <th className="py-2 font-semibold">Subtotal</th>
                      <th className="py-2 font-semibold">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => {
                      const displayTitle = item.isReservation
                        ? `${
                            item.attributes?.name || item.title
                          } - ${formatDate(item.reservationData.date)} - ${
                            parseInt(item.reservationData.persons, 10) > 1
                              ? `${item.reservationData.persons} ${item.unitPlan}s`
                              : `1 ${item.unitPlan}`
                          } - ${item.reservationData.hour}`
                        : item.isVariable && item.variation
                        ? `${item.title} - ${item.variation.name}`
                        : item.title || "Sin título";
                      const subtotal = calculateSubtotal(item);

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
                          className="text-center even:bg-gray-50 rounded-md border-b"
                        >
                          <td className="py-2 flex items-center px-5  ">
                            {imageUrl && (
                              <Image
                                src={imageUrl}
                                alt={altText}
                                height={64}
                                width={64}
                                className="w-16 h-16 object-cover mr-3 rounded-md"
                              />
                            )}
                            <span className="inline-block max-w-xs text-left">
                              <span className="font-semibold text-sm -text--dark-green">
                                {displayTitle}
                              </span>
                              {item.additionalService && (
                                <div className="text-sm text-gray-600">
                                  <div>
                                    <span className="font-semibold">
                                      Adicional:
                                    </span>{" "}
                                    {item.additionalService.name} +{" "}
                                    {formatPrice(item.additionalService.price)}
                                  </div>
                                </div>
                              )}
                            </span>
                          </td>
                          <td className="py-2 items-center justify-center font-bold -text--dark-green">
                            {formatPrice(item.price)}
                          </td>
                          <td className="py-2 px-5">
                            <div className="flex items-center justify-center">
                              <button
                                className="border px-2 py-2 rounded-l hover:-bg--dark-green hover:text-white focus:outline-none duration-200"
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
                                className="appearance-none border  w-12 h-[42px] px-0 py-2 text-gray-700 text-center focus:outline-none rounded-none "
                                aria-label={`Cantidad de ${displayTitle}`}
                              />
                              <button
                                className="border px-2 py-2 rounded-r hover:-bg--dark-green hover:text-white focus:outline-none duration-200"
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
                          <td className="py-2 px-2 items-center justify-center">
                            <span className="font-semibold -text--dark-green">
                              {formatPrice(subtotal)}
                            </span>
                            {calculateItemDiscount(item) > 0 && (
                              <div className="text-white bg-lime-600 px-1 py-1 rounded-md flex items-center text-xs w-fit mx-auto">
                                <span className="icon-[ri--discount-percent-fill] mr-[1px] " />{" "}
                                -{formatPrice(calculateItemDiscount(item))}
                              </div>
                            )}
                          </td>
                          <td className="py-2 px-5 items-center justify-center">
                            <button
                              onClick={() => removeFromCart(item)}
                              aria-label={`Eliminar ${displayTitle}`}
                            >
                              <span className="icon-[si--remove-circle-line] hover:-text--light-red hover:scale-125 duration-200" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {
                // Mobile view
              }
              <div className="lg:hidden">
                {cart.map((item, index) => {
                  const displayTitle = item.isReservation
                    ? `${item.attributes?.name || item.title} - ${formatDate(
                        item.reservationData.date
                      )} - ${
                        parseInt(item.reservationData.persons, 10) > 1
                          ? item.reservationData.persons + ` ${item.unitPlan}s`
                          : `1 ${item.unitPlan}`
                      } - ${item.reservationData.hour}`
                    : item.isVariable && item.variation
                    ? `${item.title} - ${item.variation.name}`
                    : item.title || "Sin título";
                  const subtotal = calculateSubtotal(item);

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
                    <div key={index} className="text-center py-3 border-b">
                      <div className="py-2 flex flex-wrap justify-between sm:items-center flex-col sm:flex-row  ">
                        <div className="flex items-center">
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt={altText}
                              height={64}
                              width={64}
                              className="w-16 h-16 object-cover mr-4 hidden sm:block rounded-md"
                            />
                          )}
                          <span className="inline-block break-words text-left">
                            <span className="font-bold -text--dark-green">{displayTitle}</span>
                            {item.additionalService && (
                              <div className="text-sm text-gray-600 mt-3 sm:mt-0">
                                <div>
                                  <span className="font-semibold">
                                    Adicional:
                                  </span>{" "}
                                  {item.additionalService.name} +{" "}
                                  {formatPrice(item.additionalService.price)}
                                </div>
                              </div>
                            )}
                          </span>
                        </div>
                        <div className="py-2 flex flex-col items-start gap-2">
                          {item.quantity > 1 && (
                            <div>
                              <span className="font-semibold text-sm ">
                                Precio Unitario:
                              </span>{" "}
                              {formatPrice(item.price)}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-sm ">
                              Subtotal:
                            </span>{" "}
                            {formatPrice(subtotal)}
                          </div>
                          <div>
                            {calculateItemDiscount(item) > 0 && (
                              <div className="text-lime-700 flex items-center text-sm gap-1">
                                <span className="font-bold">Descuento:</span>
                                <span className="icon-[ri--discount-percent-fill]" />{" "}
                                - {formatPrice(calculateItemDiscount(item))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-between items-center">
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
                            className="appearance-none border -border--dark-green/70 w-12 h-10 px-0 py-2 text-gray-700 text-center focus:outline-none rounded-none"
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
                                Math.min(item.maxQuantity, item.availableSpots)
                            }
                            aria-label={`Aumentar cantidad de ${displayTitle}`}
                          >
                            +
                          </button>
                        </div>

                        <Tooltip
                          title={`Eliminar ${item.title}`}
                          placement="top"
                          arrow
                        >
                          <span>
                            <button
                              onClick={() => removeFromCart(item)}
                              aria-label={`Eliminar ${displayTitle}`}
                            >
                              <span className="text-sm font-medium -text--light-red">
                                Eliminar
                              </span>
                            </button>
                          </span>
                        </Tooltip>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="max-w-screen-lg mx-auto mt-6 flex flex-col md:flex-row justify-center items-center">
                {/*   <div className="flex gap-4 mb-5">
                <Link
                    href={continuarComprandoLink}
                    className="border-2 border-lime-700 text-sm lg:text-base text-gray-800 text-center px-2 sm:px-4 py-2 rounded-md hover:-bg--dark-green hover:-border--dark-green hover:text-white duration-200"
                  >
                    Continuar comprando
                  </Link> */}
                {/*  <Link
                    href="/finalizar-compra"
                    className="bg-green-500 text-sm lg:text-base text-white text-center px-2 sm:px-4 py-2 rounded-md hover:bg-green-600 duration-200 lg:hidden"
                  >
                    Finalizar compra
                  </Link> 
                </div>*/}
                {/* <div className="flex flex-col items-end mt-4 md:mt-0">*/}
                {/* <div className="text-gray-600">
                  <span className="font-semibold">Subtotal: </span>
                  {formatPrice(subtotalTotal)}
                </div> */}
                {/*{coupon && (
                  <div className="text-gray-600">
                    <span className="font-semibold">Descuento: - </span>
                    {formatPrice(descuento)}
                  </div>
                )}
                <div className="text-gray-600 text-lg">
                  <span className="font-semibold">Total: </span>
                  {formatPrice(total)}
                </div>
              </div> */}
                <div className="max-w-[400px] min-w-[300px] w-full">
                  <CouponInput />
                </div>
              </div>
            </div>
          )}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="border border-gray-200 py-5 px-3 rounded-md flex flex-col gap-2">
              <div className="font-bold mb-4 border-b pb-2 flex items-center gap-2">
                <span
                  className="icon-[ps--cart] -text--dark-red"
                  role="img"
                  aria-hidden="true"
                />
                Total carrito
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-semibold -text--dark-green">
                  Subtotal
                </span>
                {formatPrice(subtotalTotal)}
              </div>
              {coupon && (
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="font-semibold -text--light-green">
                    Descuento
                  </span>
                  <span>- {formatPrice(descuento)}</span>
                </div>
              )}
              <div className="flex items-center justify-between py-3">
                <span className="font-semibold -text--dark-green">Total</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
              <div className="flex  mt-10">
                <Link
                  href="/finalizar-compra"
                  className="-bg--light-green text-sm lg:text-base text-white text-center px-2 sm:px-4 py-2 w-full rounded-md hover:bg-green-600 duration-200"
                >
                  Finalizar compra
                </Link>
              </div>
            </div>
          </aside>
          <div className="lg:hidden bg-white fixed bottom-0 left-0 right-0 h-20 flex w-full justify-center border-t border-gray-200 z-50">
            <div className="flex justify-between items-center w-full px-3">
              <div className="after:[content:''] after:w-32 after:-bg--light-green after:h-[2px] after:block after:mt-2">
                <span className="font-semibold ">Total: </span>
                {formatPrice(total)}
              </div>
              <Link
                href="/finalizar-compra"
                className="-bg--light-green text-base lg:text-base text-white text-center px-2 sm:px-4 py-2  rounded-md hover:bg-green-600 duration-200"
              >
                Finalizar compra
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
