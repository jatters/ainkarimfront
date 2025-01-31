"use client";
//import Link from "next/link";
import { Link } from "next-view-transitions";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import FormatPrice from "@/components/Ecommerce/FormatPrice";

export default function ProductCard({
  slug,
  title,
  image,
  altimg,
  price,
  regularprice,
  category,
  product,
  isActive,
}) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({
      id: product.documentId,
      attributes: product,
      Precio: parseInt(product.price, 10),
      quantity: 1,
    });
  };

  return (
    <>
      {isActive ? (
        <div className="relative group shadow-md rounded-lg hover:shadow-lg duration-300 flex flex-col gap-5 border border-slate-100 h-full max-h-[570px] lg:max-h-[475px] 2xl:max-h-[445px]">
          {regularprice > price && (
            <div className="absolute top-3 right-4 -bg--dark-red text-white text-xs py-4 px-2 flex items-center justify-center rounded-xl font-bold group-hover:-bg--light-red  duration-200 z-10">
              OFERTA %
            </div>
          )}
          <div className="relative overflow-hidden rounded-t-lg border-b border-slate-100">
            <Link href={slug}>
              <Image
                src={image}
                width={370}
                height={370}
                alt={altimg}
                className="rounded-t-lg group-hover:scale-105 duration-200 h-full w-full object-contain"
              />
            </Link>
          </div>
          <div className="px-4 flex flex-col flex-1 items-center">
            <h2 className="font-semibold  uppercase -text--dark-red text-center group-hover:-text--dark-green duration-200 ">
              <Link href={slug}>{title}</Link>
            </h2>
            <div className="text-slate-600 text-xs py-1 uppercase ">{category}</div>
            {regularprice > price ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 line-through">
                  <FormatPrice price={regularprice} />
                </span>
                <span className="text-base text-green-800 font-semibold">
                  <FormatPrice price={price} />
                </span>
              </div>
            ) : (
              <div className="mb-3 text-base text-green-800 font-semibold">
                <FormatPrice price={regularprice} />
              </div>
            )}
            <div className="flex-1"></div>

            {/* Contenedor de botones con mt-auto para mantenerse al fondo */}
            <div className="flex gap-3 mt-auto w-full justify-center pb-5">
              <Link
                href={slug}
                className="text-sm border border-green-800 text-green-800 px-3 flex items-center gap-1 py-1 rounded-md transition-colors duration-200 hover:bg-green-800 hover:text-white"
              >
                Ver
              </Link>
              <button
                className="add-to-cart-button -bg--dark-green text-sm text-white px-3 py-1 rounded-md transition-colors hover:-bg--light-green duration-200"
                onClick={() => addToCart(product)}
              >
                Añadir a carrito
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
