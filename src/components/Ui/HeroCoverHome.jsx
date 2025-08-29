"use client";
import React from "react";
import { Link } from 'next-view-transitions'

export default function HeroCoverHome() {
  const scrollToContent = () => {
    const content = document.getElementById("content");
    content.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden -bg--dark-green">
      <video
        className="absolute top-0 left-0 z-0 object-cover w-full h-full"
        autoPlay
        playsInline
        webkit-playsinline="true"
        loop
        muted
        aria-label="Video de vinícola"
        role="img"
        aria-hidden="true"                
      >
        <source src="/wine-cover.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-55 z-10" />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 uppercase font-serif">
          Visita Ain Karim
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          Dónde vivirás una experiencia vinícola inolvidable
        </p>
        <div className="flex flex-col md:flex-row gap-4  items-center justify-center mb-8 px-5 ">
          <Link
            href="/visitas"
            className="-bg--dark-green text-white flex gap-1 items-center px-5 py-3 rounded-md text-sm font-medium md:text-base hover:-bg--light-green transition duration-200 "
          >
            <span className="icon-[uil--schedule] text-lg" />
            Ver Planes
          </Link>
          <Link
            href="/productos"
            className="-bg--dark-green text-white flex gap-1 items-center px-5 py-3 rounded-md text-sm font-medium md:text-base hover:-bg--light-green transition duration-200"
          >
            <span className="icon-[material-symbols-light--wine-bar-rounded] text-lg" />
            Ver Productos
          </Link>
        </div>
      </div>
      <div
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
        onClick={scrollToContent}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-white animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
      <div id="content" className="absolute bottom-0 w-full h-0" />
    </section>
  );
}
