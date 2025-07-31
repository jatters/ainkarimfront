import React from "react";
import { Link } from "next-view-transitions";
import imageNotFound from "@/../public/404.svg";
import Image from "next/image";

export const metadata = {
  title: "404 - Página no encontrada",
  description: "La página que estás buscando no existe o cambió de dirección.",

  openGraph: {
    title: "404 - Página no encontrada",
    description: "La página que estás buscando no existe o cambió de dirección.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "404 - Página no encontrada",
    description: "La página que estás buscando no existe o cambió de dirección.",
  },
};

export default function notFound() {
  return (
    <div className="container mx-auto py-10 lg:py-16 xl:py-28 px-5 text-center ">
      <div className="flex justify-center mb-10">
        <Image src={imageNotFound} alt="404" width={250} height={250} />
      </div>
      <h1 className="text-3xl font-bold mb-5">404 - Página no encontrada</h1>
      <p className="">
        La página que estás buscando no existe o cambió de dirección.
      </p>
      <p>
        Te invitamos a regresar al <Link href="/">inicio</Link> y explorar nuestras
        experiencias.
      </p>
      <div className="flex flex-wrap gap-3 mt-5 justify-center items-center">
        <Link
          href="/"
          className="-bg--dark-green text-white py-2 px-4 rounded-md font-semibold hover:-bg--light-green duration-200"
        >
          Volver al inicio
        </Link>
        <Link
          href={"/visitas"}
          className="-bg--dark-green text-white py-2 px-4 rounded-md font-semibold hover:-bg--light-green duration-200"
        >
          Conoce nuestros planes
        </Link>
        <Link
          href={"/productos"}
          className="-bg--dark-green text-white py-2 px-4 rounded-md font-semibold hover:-bg--light-green duration-200"
        >
          Ver nuestros productos
        </Link>
      </div>
    </div>
  );
}
