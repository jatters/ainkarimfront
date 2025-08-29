"use client";
import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { CartContext } from "@/context/CartContext";

// Material-UI Imports
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

// Asset Imports
import logo from "@/../public/logoainkarim.svg";

// --- Centralized Data for Navigation Links ---
const navLinks = [
  { href: "/productos", label: "Productos" },
  { href: "/visitas", label: "Visitas" },
  { href: "/menu", label: "Carta" },
  { href: "/el-vinedo", label: "El Viñedo" },
  { href: "/informacion", label: "Información" },
  { href: "/contacto", label: "Contacto" },
];

// --- Styled Component for MUI Badge ---
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

// --- Reusable Component for User Actions (Login/Cart) ---
const UserActions = ({ cartCount }) => (
  <div className="flex items-center gap-1 sm:gap-3">
    <Link href="/iniciar-sesion" aria-label="Iniciar sesión">
      <IconButton aria-label="iniciar sesión" sx={{ color: "#ffffff" }}>
        <span
          className="icon-[solar--user-bold-duotone] text-2xl hover:-text--light-green hover:scale-110 duration-200"
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
);

// --- Component for Desktop Navigation ---
const DesktopNav = ({ scrolled }) => (
  <nav role="navigation" aria-label="Menú de navegación">
    <ul
      className={`text-white flex items-center lg:gap-x-2 xl:gap-x-3 uppercase transition-all duration-200 ${
        scrolled ? "text-sm" : "lg:text-sm xl:text-base"
      }`}
    >
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            className="py-3 px-1 hover:-text--light-green duration-200 font-serif"
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

// --- Component for Mobile Navigation Menu ---
const MobileNav = ({ isOpen, closeMenu, scrolled }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`lg:hidden bg-black absolute left-0 w-full z-40 duration-200 transition-all ${
        scrolled ? "top-14" : "top-[70px]"
      }`}
    >
      <nav
        className="px-5 pt-2 pb-4"
        role="navigation"
        aria-label="Menú de navegación mobile"
      >
        <ul className="text-white flex flex-col gap-y-4 text-lg uppercase">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className="py-2 px-1 hover:-text--light-green duration-200 text-sm"
                href={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

// --- Main Header Component ---
export default function Header() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-xl bg-black">
      {/* Mobile Header */}
      <div
        className={`lg:hidden bg-black flex items-center justify-between px-1 sm:px-5 duration-200 transition-all ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <button
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <CloseIcon className="text-white text-3xl ml-2 sm:ml-0" />
          ) : (
            <MenuIcon className="text-white text-3xl ml-2 sm:ml-0" />
          )}
        </button>

        <Link href="/" onClick={closeMenu}>
          <Image
            src={logo}
            alt="Logo Ain Karim"
            width={160}
            height={36}
            className="invert h-10 w-40"
            priority={true}
          />
        </Link>

        <UserActions cartCount={cartCount} />
      </div>

      <MobileNav isOpen={isMenuOpen} closeMenu={closeMenu} scrolled={scrolled} />

      {/* Desktop Header */}
      <div
        className={`hidden lg:flex items-center px-5 justify-between transition-all duration-200 ${
          scrolled ? "py-1" : "py-3"
        }`}
      >
        <Link href="/">
          <Image
            src={logo}
            alt="Logo Ain Karim"
            width={256}
            height={56}
            className={`invert transition-all duration-200 ${
              scrolled ? "h-12 w-44" : "h-[59px] lg:w-52 xl:w-64"
            }`}
            priority={true}
          />
        </Link>
        
        <div className="flex items-center gap-x-6">
          <DesktopNav scrolled={scrolled} />
          <div className="flex items-center gap-x-3">
             <Link
              className={`-bg--dark-green font-medium text-white px-3 py-2 rounded-md hover:-bg--light-green transition-all duration-200 whitespace-nowrap ${
                scrolled ? "text-sm" : "lg:text-sm xl:text-base"
              }`}
              href="/visitas"
            >
              Reserva ahora
            </Link>
            <UserActions cartCount={cartCount} />
          </div>
        </div>
      </div>
    </header>
  );
}