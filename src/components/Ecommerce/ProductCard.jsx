"use client";
import { useState, useContext } from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import FormatPrice from "@/components/Ecommerce/FormatPrice";
import { CartContext } from "@/context/CartContext";
import { normalizeProductForCart } from "@/components/Ecommerce/NormalizeCartProduct";

export default function ProductCard({ product }) {
  // Extraemos las propiedades necesarias del objeto product
  const {
    slug,
    title,
    price,
    regularPrice,
    image,
    categorias_de_producto,
    isActive,
    isVariable,
    variaciones,
  } = product;
  const categoryName = categorias_de_producto?.name || "Sin categoría";
  const imageUrl = image?.url
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${image.url}`
    : null;
  const altText = image?.alternativeText || `Imagen ${title}`;
  const parsedRegularPrice = parseInt(regularPrice, 10);

  // Estado local para la variación seleccionada (solo para productos variables)
  const [selectedVariation, setSelectedVariation] = useState(null);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    // Para productos variables, no se permite agregar sin selección
    if (isVariable && !selectedVariation) return;
    const cartItem = normalizeProductForCart(product, selectedVariation);
    addToCart(cartItem);
  };

  return (
    <>
      {isActive && (
        <div className="relative group shadow-md rounded-lg hover:shadow-lg duration-300 flex flex-col gap-5 border border-slate-100 h-full max-h-[570px] lg:max-h-[520px] xl:max-h-[480px] 2xl:max-h-[480px] justify-items-center">
          {parsedRegularPrice > price && (
            <div className="absolute top-3 right-4 bg-red-600 text-white text-xs py-2 px-3 flex items-center justify-center rounded-xl font-bold group-hover:bg-red-700 duration-200 z-10">
              OFERTA %
            </div>
          )}
          {/* Asignamos una altura fija al contenedor de imagen y evitamos que se encoja */}
          <div className="relative overflow-hidden rounded-t-lg border-b border-slate-100 flex-shrink-0">
            <Link href={`/producto/${slug}`}>
              <Image
                src={imageUrl}
                width={370}
                height={370}
                alt={altText}
                className="rounded-t-lg group-hover:scale-105 duration-200 w-full h-full object-contain"
              />
            </Link>
          </div>
          <div className="px-4 flex flex-col flex-1 items-center">
            <h2 className="font-semibold uppercase text-center text-gray-800 group-hover:text-green-800 duration-200">
              <Link href={`/producto/${slug}`}>{title}</Link>
            </h2>
            <div className="text-slate-600 text-xs uppercase">
              {categoryName}
            </div>
            {parsedRegularPrice > price ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 line-through">
                  <FormatPrice price={parsedRegularPrice} />
                </span>
                <span className="text-base text-green-800 font-semibold">
                  <FormatPrice price={price} />
                </span>
              </div>
            ) : (
              <div className="mb-3 text-base text-green-800 font-semibold">
                <FormatPrice price={parsedRegularPrice} />
              </div>
            )}
            <div className="flex-1"></div>

            {/* Bloque de variaciones: para productos variables se usa un contenedor con scroll horizontal */}
            {isVariable &&
              Array.isArray(variaciones) &&
              variaciones.length > 0 && (
                <div className="w-full mt-2">
                  <div className="flex gap-2 overflow-x-auto whitespace-nowrap mb-5  w-full">
                    {variaciones.map((variation) => (
                      <button
                        key={variation.id}
                        onClick={() => setSelectedVariation(variation)}
                        className={`px-2 py-1 border rounded text-xs transition-colors duration-200 ${
                          selectedVariation?.id === variation.id
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white text-gray-700"
                        }`}
                      >
                        {variation.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            {/* Contenedor de botones */}
            <div className="flex gap-3 mt-auto w-full justify-center pb-5">
              <Link
                href={`/producto/${slug}`}
                className="text-sm border border-green-800 text-green-800 px-3 flex items-center gap-1 py-1 rounded-md transition-colors duration-200 hover:bg-green-800 hover:text-white"
              >
                Ver
              </Link>
              <button
                onClick={handleAddToCart}
                disabled={isVariable && !selectedVariation}
                className={`text-sm text-white px-3 py-1 rounded-md transition-colors duration-200 ${
                  isVariable && !selectedVariation
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-700 hover:bg-green-800"
                }`}
              >
                Añadir a carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
