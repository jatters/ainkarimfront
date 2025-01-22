/* "use client";
import React, { useContext } from "react";
import Image from "next/image";
import logo from "@/../public/logoainkarim.svg";
//import Link from "next/link";
import { Link } from 'next-view-transitions'
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
        <nav className="" role="navigation" aria-label="Menú de navegación">
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
        </nav>
        <div>
          <ul className="text-white flex shrink-0 grow-0 text-2xl gap-3" aria-label="Menú de usuario">
            <li className="flex items-center">
              <Link
                className="-bg--dark-green text-base font-medium text-white px-3 py-2 rounded-md hover:-bg--light-green duration-300"
                href="/visitas"
              >
                Reserva tu visita
              </Link>
            </li>
            <li className="flex items-center">
              <Link href="/iniciar-sesion" aria-label="Iniciar sesión">
                <span
                  className="icon-[solar--user-bold-duotone] h-6 w-6 hover:-text--light-green hover:scale-110 duration-300"
                  role="img"
                  aria-hidden="true"
                />
              </Link>
            </li>
            <li className="flex items-center relative" >
              <Link href="/carrito" aria-label="Ir al carrito de compras">
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
 */
"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import logo from "@/../public/logoainkarim.svg";
//import Link from "next/link";
import { Link } from 'next-view-transitions'
import { CartContext } from "@/context/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu"; // Importamos el ícono de hamburguesa
import CloseIcon from "@mui/icons-material/Close"; // Icono para cerrar el menú

export default function Header() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.length;
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú móvil

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alternar el estado del menú
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Cerrar el menú
  };

  return (
    <header className="sticky top-0 z-50 shadow-xl bg-black">
      {/* Menú móvil */}
      <div className="lg:hidden bg-black items-center justify-between px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo Ain Karim"
              width={256}
              height={56}
              className="invert h-14 w-64"
            />
          </Link>
          {/* Ícono para abrir/cerrar el menú */}
          <button onClick={toggleMenu} aria-label="Abrir menú">
            {isMenuOpen ? (
              <CloseIcon className="text-white text-2xl" />
            ) : (
              <MenuIcon className="text-white text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Menú desplegable para móvil */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black absolute top-16 left-0 w-full z-40 mt-5">
          <nav className="px-6 py-4" role="navigation" aria-label="Menú de navegación mobile">
            <ul className="text-white flex flex-col gap-y-4 text-lg uppercase">
              <li>
                <Link
                  className="py-2 px-1 hover:-text--light-green duration-200 font-serif"
                  href="/productos"
                  onClick={closeMenu} // Cerrar el menú al hacer clic
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  className="py-2 px-1 hover:-text--light-green duration-200 font-serif"
                  href="/visitas"
                  onClick={closeMenu} // Cerrar el menú al hacer clic
                >
                  Visitas
                </Link>
              </li>
              <li>
                <Link
                  className="py-2 px-1 hover:-text--light-green duration-200 font-serif"
                  href="/el-vinedo"
                  onClick={closeMenu} // Cerrar el menú al hacer clic
                >
                  El Viñedo
                </Link>
              </li>
              <li>
                <Link
                  className="py-2 px-1 hover:-text--light-green duration-200 font-serif"
                  href="/informacion"
                  onClick={closeMenu} // Cerrar el menú al hacer clic
                >
                  Información
                </Link>
              </li>
              <li>
                <Link
                  className="py-2 px-1 hover:-text--light-green duration-200 font-serif"
                  href="/contacto"
                  onClick={closeMenu} // Cerrar el menú al hacer clic
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Menú de escritorio */}
      <div className="items-center px-12 py-3 justify-between hidden lg:flex">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo Ain Karim"
            width={256}
            height={56}
            className="invert grow-0 shrink h-14 w-64"
          />
        </Link>
        <nav role="navigation" aria-label="Menú de navegación">
          <ul className="text-white flex flex-1 shrink-0 text-base lg:gap-x-2 xl:gap-x-3 uppercase lg:text-sm xl:text-base">
            <li>
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
        </nav>
        <div>
          <ul className="text-white flex shrink-0 grow-0 text-2xl md:gap-1 xl:gap-3" aria-label="Menú de usuario">
            <li className="flex items-center">
              <Link
                className="-bg--dark-green lg:text-sm xl:text-base font-medium text-white lg:px-1 xl:px-3  py-2 rounded-md hover:-bg--light-green duration-300"
                href="/visitas"
              >
                Reserva tu visita
              </Link>
            </li>
            <li className="flex items-center">
              <Link href="/iniciar-sesion" aria-label="Iniciar sesión" className="h-6 w-6" >
                <span
                  className="icon-[solar--user-bold-duotone] hover:-text--light-green hover:scale-110 duration-300"
                  role="img"
                  aria-hidden="true"
                />
              </Link>
            </li>
            <li className="flex items-center relative">
              <Link href="/carrito" aria-label="Ir al carrito de compras" className="h-6 w-6">
                <ShoppingCartIcon />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-block w-5 h-5 text-center text-sm font-bold bg-red-600 text-white rounded-full">
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
