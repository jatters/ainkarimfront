"use client";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";

export default function ProductCard({
  slug,
  title,
  image,
  altimg,
  price,
  category,
  product,
}) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      attributes: product.attributes,
      Precio: parseInt(product.Precio, 10), 
      quantity: 1, 
    });
  };

  return (
    <div className="flex flex-col items-center shadow-md pb-4 hover:shadow-lg rounded-md group">
      <div className="relative overflow-hidden rounded-t-lg">
        <Link href={slug}>
          <Image
            src={image}
            width={369}
            height={369}
            alt={altimg}
            className="rounded-t-lg group-hover:scale-105 duration-200"
          />
        </Link>
      </div>
      <div className="px-4 flex flex-col items-center">
        <h3 className="font-bold mt-4 mb-1 uppercase -text--dark-red text-center group-hover:-text--dark-green duration-200 h-11">
          <Link href={slug}>{title}</Link>
        </h3>
        <div className="-text--dark-green italic">{category}</div>
        <div className="mb-3 font-semibold">{price}</div>
        <div className="flex gap-3">
          <Link
            href={slug}
            className="flex items-center gap-1 -text--dark-green -border--dark-green border-solid border-2 px-3 py-2 rounded hover:-bg--dark-green hover:text-white duration-200"
          >
            <span className="icon-[ph--eye]"></span> Ver
          </Link>
          <button
            className="flex items-center gap-1 -bg--dark-green text-white px-6 py-3 rounded hover:-bg--light-green duration-200"
            onClick={handleAddToCart}
          >
            <span className="icon-[iconoir--cart-plus]"></span> Añadir al
            carrito
          </button>
        </div>
      </div>
    </div>
  );
}
