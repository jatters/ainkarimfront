"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Tooltip } from "@mui/material";
import FormatPrice from "@/components/Ecommerce/FormatPrice";
import { CartContext } from "@/context/CartContext";
import { normalizeProductForCart } from "@/components/Ecommerce/NormalizeCartProduct";

// Componente para el Toast de "Añadido al carrito" para mantener el ProductCard más limpio.
const AddedToCartToast = ({ t, title, onGoToCart, onDismiss }) => (
  <div
    className={`${
      t.visible ? "animate-enter" : "animate-leave"
    } relative max-w-sm w-[290px] bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-gray-100 ring-opacity-5 overflow-hidden`}
  >
    <div className="p-2">
      <div className="flex items-start">
        <div className="shrink-0 pt-[2px] text-gray-600">
          <span
            className="icon-[gridicons--cart] text-2xl text-light-green"
            role="img"
            aria-hidden="true"
          />
        </div>
        <div className="ml-2 w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium text-gray-900">{`¡Agregaste ${title} al carrito!`}</p>
          <div className="mt-1 flex justify-end space-x-7">
            <button
              type="button"
              className="bg-white rounded-md text-sm font-medium text-light-green hover:text-grey-darkest focus:outline-hidden"
              onClick={onGoToCart}
            >
              Ir a mi carrito
            </button>
          </div>
        </div>
        <div className="ml-3 shrink-0 flex">
          <button
            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={onDismiss}
          >
            <span className="sr-only">Cerrar</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function ProductCard({ product }) {
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
    outOfStock,
  } = product;

  // --- VARIABLES Y ESTADOS ---
  const [selectedVariation, setSelectedVariation] = useState(null);
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  const baseurl = process.env.NEXT_PUBLIC_SITE_URL;
  const categoryName = categorias_de_producto?.name || "Vinos";
  const imageUrl = image?.formats?.small?.url ? `${baseurl}${image.formats.small.url}` : "/placeholder.png";
  const altText = image?.alternativeText || `Producto ${title}`;
  const parsedRegularPrice = parseInt(regularPrice, 10);
  const parsedPrice = parseInt(price, 10);
  const isOnSale = parsedRegularPrice > parsedPrice;

  // --- MANEJADORES DE EVENTOS ---
  const handleAddToCart = () => {
    if (outOfStock || (isVariable && !selectedVariation)) return;
    
    const cartItem = normalizeProductForCart(product, selectedVariation);
    addToCart(cartItem);

    toast.custom((t) => (
      <AddedToCartToast
        t={t}
        title={title}
        onGoToCart={() => router.push("/carrito")}
        onDismiss={() => toast.dismiss(t.id)}
      />
    ));
  };

  // --- DATOS ESTRUCTURADOS (SEO) ---
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    url: `${baseurl}/producto/${slug}`,
    image: imageUrl,
    description: `Compra ${title}, parte de la selección exclusiva de Viñedo Ain Karim.`,
    category: categoryName,
    brand: { "@type": "Brand", name: "Viñedo Ain Karim" },
    offers: {
      "@type": "Offer",
      url: `${baseurl}/producto/${slug}`,
      priceCurrency: "COP",
      price: isOnSale ? parsedPrice : parsedRegularPrice,
      availability: isActive ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "Viñedo Ain Karim" },
    },
  };

  if (!isActive) return null;

  // --- RENDERIZADO DEL COMPONENTE ---
  return (
    <>
      <Script
        id={`json-ld-product-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <article
        className="group relative flex h-full flex-row rounded-lg shadow-md duration-300 hover:shadow-lg sm:flex-col border border-gray-100"
        itemScope
        itemType="https://schema.org/Product"
      >
        {/* Badge de Oferta (Unificado para mobile y desktop) */}
        {isOnSale && (
          <div className="absolute top-2 left-2 z-10 rounded-full bg-red-600 px-2 py-1 text-[10px] font-bold text-white sm:px-3 sm:py-2 sm:text-xs">
            OFERTA
          </div>
        )}

        {/* Columna de la Imagen */}        
        <div className="relative aspect-square w-32 shrink-0 overflow-hidden lg:rounded-tl-lg sm:w-full sm:rounded-t-lg border-b border-gray-100">
          <Link href={`/producto/${slug}`}>
            <Image
              src={imageUrl}
              fill // Usar 'fill' es más moderno y se adapta mejor al contenedor
              alt={altText}
              className="object-cover duration-200 group-hover:scale-110" // Cambiado a object-cover y sin clases de redondeo
              itemProp="image"
              sizes="(max-width: 640px) 128px, 370px" // Ayuda a Next.js a cargar la imagen óptima
            />
          </Link>
        </div>

        {/* Columna de Contenido */}
        <div className="flex flex-1 flex-col p-2 sm:p-4 min-w-0 bg-white rounded-b-lg">
          
          {/* Sección de Información (crece para ocupar espacio) */}
          <div className="grow">
            <div className="text-xs uppercase text-slate-600" itemProp="category">
              {categoryName}
            </div>
            <h2 className="mt-1 font-semibold uppercase text-gray-800 duration-200 line-clamp-2 group-hover:text-green-800 sm:text-base" itemProp="name">
              <Link href={`/producto/${slug}`}>{title}</Link>
            </h2>

            {/* Precios */}
            <div className="mt-2" itemProp="offers" itemScope itemType="https://schema.org/Offer">
              {isOnSale ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-500 line-through">
                    <FormatPrice price={parsedRegularPrice} />
                  </span>
                  <span className="text-lg font-semibold text-green-800" itemProp="price">
                    <FormatPrice price={parsedPrice} />
                  </span>
                </div>
              ) : (
                <div className="text-lg font-semibold text-green-800">
                  <FormatPrice price={parsedRegularPrice} />
                </div>
              )}
              <meta itemProp="priceCurrency" content="COP" />
              <meta itemProp="availability" content={isActive ? "InStock" : "OutOfStock"} />
            </div>

            {/* Variaciones (Ahora visibles en mobile) */}
            {isVariable && Array.isArray(variaciones) && variaciones.length > 0 && (
                <div className="mt-2 flex min-w-0 gap-2 overflow-x-auto whitespace-nowrap pb-2">
                  {variaciones.map((variation) => (
                    <button
                      key={variation.id}
                      onClick={() => setSelectedVariation(variation)}
                      className={`rounded border px-2 py-1 text-xs transition-colors duration-200 ${
                        selectedVariation?.id === variation.id
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
                      }`}
                    >
                      {variation.name}
                    </button>
                  ))}
                </div>
            )}
          </div>

          {/* Sección de Acciones (siempre al fondo gracias a mt-auto) */}
          <div className="mt-auto pt-2">
            {/* Acciones para Desktop */}
            <div className="hidden gap-3 sm:flex">
              <Link
                href={`/producto/${slug}`}
                className="flex flex-1 items-center justify-center rounded-md border border-green-800 px-4 py-2 text-sm text-green-800 transition-all duration-200 hover:bg-green-800 hover:text-white"
                aria-label={`Ver producto ${title}`}
              >
                Ver
              </Link>
              <Tooltip title={outOfStock ? "Producto agotado" : isVariable && !selectedVariation ? "Selecciona una variación" : ""} placement="top" arrow>
                <span>
                  <button
                    onClick={handleAddToCart}
                    disabled={(isVariable && !selectedVariation) || outOfStock}
                    className="flex flex-1 items-center justify-center rounded-md px-4 py-2 text-sm text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-600 bg-green-700 hover:bg-green-800"
                    aria-label={isVariable && !selectedVariation ? "Selecciona una variación" : "Añadir al carrito"}
                  >
                    {outOfStock ? "Agotado" : "Comprar"}
                  </button>
                </span>
              </Tooltip>
            </div>

            {/* Acciones para Mobile */}
            <div className="flex items-center justify-between sm:hidden">
                {outOfStock ? (
                  <div className="rounded-sm bg-gray-500 px-3 py-2 text-xs font-bold text-white">
                    Agotado
                  </div>
                ) : (
                  <>
                    <Link href={`/producto/${slug}`} className="rounded-sm border border-green-800 p-2 text-green-800" aria-label={`Ver producto ${title}`}>
                      <span className="icon-[hugeicons--view] text-lg" />
                    </Link>
                    <Tooltip title={isVariable && !selectedVariation ? "Selecciona una variación" : ""} placement="top" arrow>
                        <span>
                            <button
                                onClick={handleAddToCart}
                                disabled={isVariable && !selectedVariation}
                                className="flex items-center gap-1 rounded-md bg-green-700 px-3 py-2 text-sm text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-400"
                                aria-label={isVariable && !selectedVariation ? "Selecciona una variación" : "Añadir al carrito"}
                            >
                                <span className="icon-[zmdi--shopping-cart-plus] text-lg" />
                            </button>
                        </span>
                    </Tooltip>
                  </>
                )}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}