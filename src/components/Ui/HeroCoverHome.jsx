"use client"
import React from "react";
import Link from "next/link";

export default function HeroCoverHome() {  
  const scrollToContent = () => {    
    const content = document.getElementById('content');    
    content.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 z-0 object-cover w-full h-full"
        autoPlay
        loop
        muted
      >
        <source src="/wine-cover.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-55 z-10" />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 uppercase">
          Explora Ain Karim
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 uppercase">
          Dónde vivirás una experiencia vinícola inolvidable
        </p>
        <div className="flex justify-center mb-8">
          <Link href="/visitas" className="-bg--dark-green text-white flex gap-1 items-center px-7 py-4 rounded-md text-sm font-medium md:text-base mr-4 hover:-bg--light-green transition duration-300" >
            <span className="icon-[uil--schedule] text-lg" />Ver Planes
          </Link>
          <Link href="/productos" className="-bg--light-green text-white flex gap-1 items-center px-7 py-4 rounded-md text-sm font-medium md:text-base hover:-bg--dark-green transition duration-300">
            <span className="icon-[material-symbols-light--wine-bar-rounded] text-lg" />Ver Productos
          </Link>
        </div>
      </div>      
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer" onClick={scrollToContent}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-white animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>      
      <div id="content" className="absolute bottom-0 w-full h-0" />
    </section>
  );
}
