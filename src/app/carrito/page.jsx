"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";

export default function CarritoPage() {
    const { cart, removeFromCart, updateQuantityInCart } = useContext(CartContext);
    const baseurl = process.env.STRAPI_URL;

    const calculateSubtotal = (price, quantity, additionalService) => {
        const additionalPrice = additionalService ? parseFloat(additionalService.price) : 0;
        return (price * quantity) + additionalPrice; 
    };

    const calculateTotal = () => {
        return cart.reduce(
            (total, item) =>
                total +
                calculateSubtotal(
                    parseFloat(item.attributes?.Precio || item.Precio || 0),
                    item.quantity || 0,
                    item.additionalService
                ),
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

    const formatPrice = (price) => {
        return `$${Number(price).toLocaleString("es-CO", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })}`;
    };

    const containsProducts = cart.some(item => !item.reservationData);

    return (
        <div className="container mx-auto pt-16 pb-14">
            <h1 className="text-5xl -text--dark-green text-center font-bold mb-14">
                Carrito de Compras
            </h1>
            {cart.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <div>
                    <table className="max-w-screen-2xl mx-auto bg-white ">
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
                                    ? `${item.title}`
                                    : attributes.title || "Sin título";
                                const price = parseFloat(attributes.Precio) || item.Precio || 0;
                                const quantity = item.quantity || 1;

                                // Mostrar el precio unitario correctamente
                                const unitPrice = price;

                                // Calcular el subtotal correctamente
                                const subtotal = calculateSubtotal(price, quantity, item.additionalService);

                                return (
                                    <tr key={index} className="text-center">
                                        <td className="py-2 flex items-center px-5">
                                            {!isReservation && imageUrl && (
                                                <img
                                                    src={imageUrl}
                                                    alt={altText}
                                                    className="w-16 h-16 object-cover mr-4"
                                                />
                                            )}
                                            <span className="inline-block break-words max-w-xs text-left">
                                                {title}
                                                {item.additionalService && (
                                                    <div className="text-sm text-gray-600">
                                                        <div>Adicional: {item.additionalService.name}</div>
                                                        <div>+ {formatPrice(item.additionalService.price)}</div>
                                                    </div>
                                                )}
                                            </span>
                                        </td>
                                        <td className="py-2 items-center justify-center">
                                            {formatPrice(unitPrice)} {/* Mostrando solo el precio unitario */}
                                        </td>
                                        <td className="py-2 px-5">
                                            <div className="flex items-center justify-center">
                                                <button
                                                    className="-bg--dark-green/70 text-white px-2 py-2 rounded-l hover:-bg--dark-green focus:outline-none"
                                                    onClick={() => decrementarCantidad(item)}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={quantity}
                                                    readOnly
                                                    className="appearance-none border -border--dark-green/70 w-12 px-3 py-2 text-gray-700 text-center leading-tight focus:outline-none"
                                                />
                                                <button
                                                    className="-bg--dark-green/70 text-white px-2 py-2 rounded-r hover:-bg--dark-green focus:outline-none"
                                                    onClick={() => incrementarCantidad(item)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-2 px-5 items-center justify-center">
                                            {formatPrice(subtotal)}
                                        </td>
                                        <td className="py-2 px-5 items-center justify-center">
                                            <button onClick={() => removeFromCart(item)}>
                                                <span className="icon-[mynaui--trash]" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="max-w-screen-lg mx-auto mt-6 flex justify-between items-center">
                        <div className="flex gap-4">
                            <Link href={containsProducts ? "/productos" : "/visitas"} legacyBehavior>
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
                            <div className="text-xl font-bold flex flex-1 justify-end">
                                Total:{" "}
                                {formatPrice(calculateTotal())}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
