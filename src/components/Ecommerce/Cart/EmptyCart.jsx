import React from "react";
import LottieAnimation from "@/components/LotttieAnimation";
import emptyCart from "../../../../public/empty-cart.json";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="container mx-auto p-5 lg:p-10 mb-16 mt-8">
      <LottieAnimation
        animationData={emptyCart}
        loop={true}
        className="w-48 h-48 mx-auto"
      />
      <div className="text-xl text-center font-semibold -text--dark-green">
        Tu carrito está vacío.
      </div>
      <p className="text-center text-slate-600 py-3">
        Añade productos o haz tus reservas para continuar.
      </p>
      <div className="flex gap-3 justify-center mt-4 ">
        <Link
          href="/productos"
          className="-bg--dark-green text-white px-3 sm:px-6 py-2 rounded-md hover:-bg--light-green hover:scale-[1.03] active:scale-[0.97]   duration-200"
        >
          Ir a productos
        </Link>
        <Link
          href="/visitas"
          className="-bg--dark-green text-white px-3 sm:px-6 py-2 rounded-md hover:-bg--light-green hover:scale-[1.03] active:scale-[0.97]  duration-200"
        >
          Ir a planes
        </Link>
      </div>
    </div>
  );
}
