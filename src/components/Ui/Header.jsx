"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import logo from "@/../public/logoainkarim.svg";
import { Link } from "next-view-transitions";
import { CartContext } from "@/context/CartContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -1,
    top: 3,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "red",
    color: "white",
  },
}));

// Supongamos que tienes alguna forma de saber si el usuario está logeado y sus datos.
// cambiar según el estado real
const userProfileImage = ""; // URL de la imagen del usuario, si está logeado
const userName = "Usuario"; // Nombre o iniciales

export default function Header() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 shadow-xl bg-black">
      {/* Versión móvil */}
      <div className="lg:hidden bg-black flex items-center justify-between px-1 sm:px-5 py-4">
        {/* Botón de menú */}
        <button onClick={toggleMenu} aria-label="Abrir menú">
          {isMenuOpen ? (
            <CloseIcon className="text-white text-2xl ml-2 sm:ml-0" />
          ) : (
            <MenuIcon className="text-white text-2xl ml-2 sm:ml-0" />
          )}
        </button>
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="Logo Ain Karim"
            width={256}
            height={56}
            className="invert h-14 w-64"
          />
        </Link>
        {/* Íconos de carrito y usuario */}
        <div className="flex items-center gap-1 sm:gap-3">
          <Link href="/iniciar-sesion" aria-label="Iniciar sesión">
            <IconButton aria-label="iniciar sesión" sx={{ color: "#ffffff" }}>
              <span
                className="icon-[solar--user-bold-duotone] hover:-text--light-green hover:scale-110 duration-300"
                role="img"
                aria-hidden="true"
              />
            </IconButton>
          </Link>

          <Link href="/carrito" aria-label="Ir al carrito">
            <IconButton aria-label="carrito" sx={{ color: "#ffffff" }}>
              <StyledBadge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </div>
      </div>

      {/* Menú desplegable para móvil */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black absolute top-16 left-0 w-full z-40 mt-3">
          <nav
            className="px-5 pt-2 pb-4"
            role="navigation"
            aria-label="Menú de navegación mobile"
          >
            <ul className="text-white flex flex-col gap-y-4 text-lg uppercase">
              <li>
                <Link
                  className="py-2 px-1 hover:-text--light-green duration-200 text-sm"
                  href="/productos"
                  onClick={closeMenu}
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  className="py-2 px-1 hover:-text--light-green duration-200 text-sm"
                  href="/visitas"
                  onClick={closeMenu}
                >
                  Visitas
                </Link>
              </li>
              <li>
                <Link
                  className="py-2 px-1 hover:-text--light-green duration-200 text-sm"
                  href="/menu"
                  onClick={closeMenu}
                >
                  Menú
                </Link>
              </li>
              <li>
                <Link
                  className="py-2 px-1 hover:-text--light-green duration-200 text-sm"
                  href="/el-vinedo"
                  onClick={closeMenu}
                >
                  El Viñedo
                </Link>
              </li>
              <li>
                <Link
                  className="py-2 px-1 hover:-text--light-green duration-200 text-sm"
                  href="/informacion"
                  onClick={closeMenu}
                >
                  Información
                </Link>
              </li>
              <li>
                <Link
                  className="py-2 px-1 hover:-text--light-green duration-200 text-sm"
                  href="/contacto"
                  onClick={closeMenu}
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Menú de escritorio */}
      <div className="items-center px-5 py-3 justify-between hidden lg:flex">
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
                href="/menu"
              >
                Menú
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
          <ul
            className="text-white flex shrink-0 grow-0 text-2xl md:gap-1 xl:gap-3"
            aria-label="Menú de usuario"
          >
            <li className="flex items-center">
              <Link
                className="-bg--dark-green lg:text-sm xl:text-base font-medium text-white lg:px-1 xl:px-3 py-2 rounded-md hover:-bg--light-green duration-300"
                href="/visitas"
              >
                Reserva tu visita
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                href="/iniciar-sesion"
                aria-label="Iniciar sesión"
                className="h-6 w-6"
              >
                <span
                  className="icon-[solar--user-bold-duotone] hover:-text--light-green hover:scale-110 duration-300"
                  role="img"
                  aria-hidden="true"
                />
              </Link>
            </li>
            <li className="flex items-center relative">
              <Link
                href="/carrito"
                aria-label="Ir al carrito de compras"
                className="h-10 w-10"
              >
                <IconButton aria-label="cart" sx={{ color: "#ffffff" }}>
                  <StyledBadge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
