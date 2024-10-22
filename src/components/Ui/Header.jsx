"use client";
import React, { useContext } from "react";
import Image from "next/image";
import logo from "@/../public/logoainkarim.svg";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Header() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.length;

  return (
    <header className="sticky top-0 z-50 shadow-xl bg-black">
      <div className="flex lg:hidden bg-black items-center justify-between px-6 py-4">
        <div className="flex items-center justify-center w-full">
          <div className="mx-auto">
            <Link href="/">
              <Image
                src={logo}
                alt="Logo Ain Karim"
                width={260}
                height={57}
                className="invert grow-0"
              />
            </Link>
          </div>
        </div>
        <span className="icon-[fluent--navigation-24-filled] text-white text-2xl"></span>
      </div>

      <div className="items-center px-12 py-3 justify-between hidden lg:flex">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo Ain Karim"
            width={260}
            height={57}
            className="invert grow-0 shrink"
          />
        </Link>
        <div className="">
          <ul className="text-white flex flex-1 shrink-0 text-base gap-x-3 uppercase">
            <li className="">
              <Link
                className="py-3 px-1 hover:-text--light-green duration-200 font-serif"
                href="/productos"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                className="py-3 px-1 hover:-text--light-green duration-200 font-serif"
                href="/visitas"
              >
                Visitas
              </Link>
            </li>
            <li>
              <Link
                className="py-3 px-1 hover:-text--light-green duration-200 font-serif"
                href="/el-vinedo"
              >
                El Viñedo
              </Link>
            </li>
            <li>
              <Link
                className="py-3 px-1 hover:-text--light-green duration-200 font-serif"
                href="/informacion"
              >
                Información
              </Link>
            </li>
            <li>
              <Link
                className="py-3 px-1 hover:-text--light-green duration-200 font-serif"
                href="/contacto"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="text-white flex shrink-0 grow-0 text-2xl gap-3">
            <li className="flex items-center">
              <Link
                className="-bg--light-green text-base font-medium text-white px-3 py-2 rounded-md hover:-bg--dark-green duration-300"
                href="/visitas"
              >
                Reserva tu visita
              </Link>
            </li>
            <li className="flex items-center">
              <Link href="/iniciar-sesion">
                <span className="icon-[solar--user-bold-duotone] hover:-text--light-green hover:scale-110 duration-300"></span>
              </Link>
            </li>
            <li className="flex items-center relative">
              <Link href="/carrito">
                <ShoppingCartIcon />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-block w-6 h-6 text-center text-sm font-bold bg-red-600 text-white rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
