import React from "react";
import Image from "next/image";
import Logo from "@/../public/logoainkarim.svg";
import WineHarvest from "@/../public/vinedo-maintenance.svg";

export default function Maintenance() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-white from-30% to-dark-green px-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="order-2 md:order-1">
          <div className="mb-8 flex items-center justify-center md:justify-start">
            <Image
              src={Logo}
              alt="Logo Ulai Pilates Reformer"
              width={350}
              height={100}
              className="w-[350px] mx-auto lg:mx-0"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold  mb-4 text-center lg:text-left">
              ESTAMOS EN MANTENIMIENTO
            </h1>
            <p className="text-xl lg:text-black mb-2 max-w-xl mx-auto font-medium text-center lg:text-left">
              Disculpa las molestias, estamos actualizando nuestro sitio para
              brindarte la mejor experiencia.
            </p>
            <p className="text-xl lg:text-black max-w-xl mx-auto font-medium text-center lg:text-left">
              No tardaremos mucho, por favor, vuelve a intentarlo pronto.
            </p>
          </div>
        </div>
        <div className="mb-8 flex items-center justify-center order-1 md:order-2 mt-8 lg:mt-0">
          <Image
            src={WineHarvest}
            alt="Mantenimiento"
            width={520}
            height={100}
            className="w-[250px] lg:w-[350px]"
          />
        </div>
      </div>
    </div>
  );
}
