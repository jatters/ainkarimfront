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
          className="relative group shadow-md rounded-lg hover:shadow-lg duration-300 flex flex-col gap-5 border border-slate-100 h-full max-h-[570px] lg:max-h-[520px] xl:max-h-[480px] 2xl:max-h-[480px] justify-items-center"
          itemType="https://schema.org/Product"
          itemScope
        >
          {isOnSale && (
            <div className="absolute top-3 right-4 bg-red-600 text-white text-xs py-2 px-3 flex items-center justify-center rounded-xl font-bold group-hover:bg-red-700 duration-200 z-10">
              OFERTA %
            </div>
          )}

          {outOfStock && (
            <div className="absolute top-3 left-4 bg-black/50 text-white text-xs py-2 px-3 flex items-center justify-center rounded-xl font-bold group-hover:bg-black/70 duration-200 z-10">
              Agotado
            </div>
          )}

          <div className="relative overflow-hidden rounded-t-lg border-b border-slate-100 flex-shrink-0">
            <Link href={`/producto/${slug}`}>
              <Image
                src={imageUrl}
                width={370}
                height={370}
                alt={altText}
                className="rounded-t-lg group-hover:scale-105 duration-200 w-full h-full object-contain"
                itemProp="image"
              />
            </Link>
          </div>
          <div className="px-4 flex flex-col flex-1 items-center">
            <h2
              className="font-semibold uppercase text-center text-gray-800 group-hover:text-green-800 duration-200"
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
                <div className="flex items-center gap-2">
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
                <div className="mb-3 text-base text-green-800 font-semibold">
                  <FormatPrice price={parsedRegularPrice} />
                </div>
              )}
              <meta itemProp="priceCurrency" content="COP" />
              <meta
                itemProp="availability"
                content={isActive ? "InStock" : "OutOfStock"}
              />
            </div>
            <div className="flex-1"></div>

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

            <div className="flex  gap-3 mt-auto w-full justify-center pb-5">
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
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-700 hover:bg-green-800"
                    }`}
                    aria-label={
                      isVariable && !selectedVariation
                        ? "Selecciona una variación"
                        : "Agregar al carrito"
                    }
                  >
                    Añadir a carrito
                  </button>
                </span>
              </Tooltip>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
