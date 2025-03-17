import React from "react";
import { Link } from "next-view-transitions";

export const metadata = {
  title: "404 - Página no encontrada",
  description: "La página que estás buscando no existe o ha sido movida.",
  
  openGraph: {
    title: "404 - Página no encontrada",
    description: "La página que estás buscando no existe o ha sido movida.",  
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "404 - Página no encontrada",
    description: "La página que estás buscando no existe o ha sido movida.",
  },
};

export default function notFound() {
  return (
    <div className="container mx-auto py-10 lg:py-16 xl:py-28 px-5 text-center ">
      <h1 className="text-3xl font-bold mb-5">404 - Página no encontrada</h1>
      <p className="">
        La página que estás buscando no existe o ha sido movida.
      </p>
      <p>
        Te invitamos a regresar al <a href="/">inicio</a> y explorar nuestras
        experiencias.
      </p>

      <div className="flex gap-3 mt-5 justify-center items-center">
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
