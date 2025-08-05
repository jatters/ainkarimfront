"use client";
import { useState, useContext } from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import FormatPrice from "@/components/Ecommerce/FormatPrice";
import { CartContext } from "@/context/CartContext";
import { normalizeProductForCart } from "@/components/Ecommerce/NormalizeCartProduct";
import Script from "next/script";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Tooltip } from "@mui/material";

export default function ProductCard({ product }) {
  const {
    slug,
    title,
    price,
    regularPrice,
    image,
    categorias_de_producto,
    cepas_de_vino,
    isActive,
    isVariable,
    variaciones,
    outOfStock,
  } = product;

  const baseurl = process.env.NEXT_PUBLIC_SITE_URL;
  const categoryName = categorias_de_producto?.name || "Vinos";
  const imageUrl = image?.formats?.small?.url
    ? `${baseurl}${image.formats.small.url}`
    : null;
  const altText = image?.alternativeText || `Producto ${title}`;
  const parsedRegularPrice = parseInt(regularPrice, 10);
  const parsedPrice = parseInt(price, 10);
  const isOnSale = parsedRegularPrice > parsedPrice;

  const [selectedVariation, setSelectedVariation] = useState(null);
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  const handleAddToCart = () => {
    if (outOfStock) return;
    if (isVariable && !selectedVariation) return;
    const cartItem = normalizeProductForCart(product, selectedVariation);
    addToCart(cartItem);
    toast.custom((t) => {
      return (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } relative max-w-sm w-[290px] bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}
        >
          <div className="p-2">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-[2px] text-gray-600">
                <span
                  className="icon-[gridicons--cart] text-2xl -text--light-green"
                  role="img"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-2 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{`Agregaste ${title} al carrito!`}</p>
                <div className="mt-1 flex justify-end space-x-7">
                  <button
                    type="button"
                    className="bg-white rounded-md text-sm font-medium -text--light-green hover:-text--grey-darkest focus:outline-none "
                    onClick={() => router.push("/carrito")}
                  >
                    Ir a mi carrito
                  </button>
                </div>
              </div>
              <div className="ml-3 flex-shrink-0 flex">
                <button
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => toast.dismiss(t.id)}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
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
    });
  };

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    url: `https://ainkarim.co/producto/${slug}`,
    description: `Compra ${title}, parte de la selección exclusiva de Viñedo Ain Karim.`,
    image: imageUrl,
    category: categoryName,
    brand: {
      "@type": "Brand",
      name: "Viñedo Ain Karim",
    },
    offers: {
      "@type": "Offer",
      url: `https://ainkarim.co/producto/${slug}`,
      priceCurrency: "COP",
      price: isOnSale ? parsedPrice : parsedRegularPrice,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: isOnSale ? parsedPrice : parsedRegularPrice,
        priceCurrency: "COP",
      },
      availability: isActive
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Viñedo Ain Karim",
      },
    },
  };

  return (
    <>
      <Script
        id={`json-ld-product-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      {isActive && (
        <article
          className="relative group shadow-md rounded-lg hover:shadow-lg duration-300 flex flex-row sm:flex-col gap-x-2 sm:gap-y-5 sm:border sm:border-slate-100 sm:h-full max-h-[570px] lg:max-h-[520px] xl:max-h-[500px] 2xl:max-h-[480px] justify-items-center"
          itemType="https://schema.org/Product"
          itemScope
        >
          {isOnSale && (
            <div className="hidden sm:flex absolute top-2 left-2 bg-red-600 text-white text-xs py-2 px-3 items-center justify-center rounded-xl font-bold group-hover:bg-red-700 duration-200 z-10">
              OFERTA %
            </div>
          )}

          <div className="relative sm:overflow-hidden rounded-tl-lg rounded-bl-lg sm:rounded-bl-none sm:rounded-t-lg sm:border-b sm:border-slate-100 sm:flex-shrink-0 aspect-square">
            <Link href={`/producto/${slug}`}>
              <Image
                src={imageUrl}
                width={370}
                height={370}
                alt={altText}
                className="rounded-tl-lg rounded-bl-lg sm:rounded-bl-none sm:rounded-t-lg  group-hover:scale-105 duration-200 w-36 h-36 sm:w-full sm:h-full object-contain"
                itemProp="image"
              />
            </Link>
          </div>
          <div className="sm:px-4 flex flex-col sm:flex-1 sm:items-center w-full">
            <h2
              className="font-semibold uppercase text-sm sm:text-base sm:text-center text-gray-800 group-hover:text-green-800 duration-200 line-clamp-1 sm:line-clamp-none"
              itemProp="name"
            >
              <Link href={`/producto/${slug}`}>{title}</Link>
            </h2>
            <div
              className="text-slate-600 text-xs uppercase"
              itemProp="category"
            >
              {categoryName}
            </div>
            <div
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              {isOnSale ? (
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <span className="text-sm text-gray-600 line-through">
                    <FormatPrice price={parsedRegularPrice} />
                  </span>
                  <span
                    className="text-base text-green-800 font-semibold"
                    itemProp="price"
                  >
                    <FormatPrice price={price} />
                  </span>
                </div>
              ) : (
                <div className="mt-2 sm:mt-0 text-base text-green-800 font-semibold">
                  <FormatPrice price={parsedRegularPrice} />
                </div>
              )}
              <meta itemProp="priceCurrency" content="COP" />
              <meta
                itemProp="availability"
                content={isActive ? "InStock" : "OutOfStock"}
              />
            </div>

            {isOnSale && (
              <div className="sm:hidden">
                <div className="bg-red-500 text-white text-xs py-1 px-2 items-center justify-center rounded w-fit">
                  OFERTA %
                </div>
              </div>
            )}

            {isVariable &&
              Array.isArray(variaciones) &&
              variaciones.length > 0 && (
                <div className="w-full mt-2 hidden sm:block">
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
            <div className="gap-3  w-full sm:justify-center sm:pb-5 hidden sm:flex mt-4">
              <Link
                href={`/producto/${slug}`}
                className="text-sm border border-green-800 text-green-800 px-4 py-2 flex items-center gap-1 rounded-md transition-colors duration-200 hover:bg-green-800 hover:text-white"
                aria-label={`Ver producto ${title}`}
              >
                Ver
              </Link>
              <Tooltip
                title={
                  outOfStock
                    ? "Producto agotado"
                    : isVariable && !selectedVariation
                    ? "Selecciona una variación"
                    : ""
                }
                placement="top"
                arrow
              >
                <span>
                  <button
                    onClick={handleAddToCart}
                    disabled={(isVariable && !selectedVariation) || outOfStock}
                    className={`text-sm text-white px-4 py-2 rounded-md transition-colors duration-200 ${
                      (isVariable && !selectedVariation) || outOfStock
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-green-700 hover:bg-green-800"
                    }`}
                    aria-label={
                      isVariable && !selectedVariation
                        ? "Selecciona una variación"
                        : "Añadir al carrito"
                    }
                  >
                    {outOfStock ? "Agotado" : "Añadir al carrito"}
                  </button>
                </span>
              </Tooltip>
            </div>
            <div className="flex-1" />
            <div className="flex justify-between mr-2 mb-2 sm:hidden mt-2">
              <Link
                href={`/producto/${slug}`}
                className="border border-green-800 text-green-800 px-2 py-2 flex items-center gap-1 rounded"
                aria-label={`Ver producto ${title}`}
              >
                <span
                  className="icon-[hugeicons--view] text-lg"
                  role="img"
                  aria-hidden="true"
                />
              </Link>

              {outOfStock ? (
                <div className="bg-black/50 text-white text-xs py-2 px-2 rounded group-hover:bg-black/70 w-fit">
                  Agotado
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={(isVariable && !selectedVariation) || outOfStock}
                  className={`text-sm text-white px-2 py-2 rounded-md transition-colors duration-200 flex items-center gap-1 ${
                    (isVariable && !selectedVariation) || outOfStock
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-700 hover:bg-green-800"
                  }`}
                  aria-label={
                    isVariable && !selectedVariation
                      ? "Selecciona una variación"
                      : "Añadir al carrito"
                  }
                >
                  <span
                    className="icon-[zmdi--shopping-cart-plus] text-lg"
                    role="img"
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
          </div>
        </article>
      )}
    </>
  );
}
