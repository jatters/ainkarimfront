import Image from "next/image";
import logo from "@/../public/logoainkarim.svg";
import Link from "next/link";

export default function Header() {
  return (
    <header>
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

      <div className="bg-black items-center px-12 py-3 justify-between hidden lg:flex">
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
            <li>
              <Link
                className="py-3 px-1 hover:-text--light-green duration-300"
                href="/productos"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                className="py-3 px-1 hover:-text--light-green duration-300"
                href="/visitas"
              >
                Visitas
              </Link>
            </li>
            <li>
              <Link
                className="py-3 px-1 hover:-text--light-green duration-300"
                href="/el-vinedo"
              >
                El Viñedo
              </Link>
            </li>
            <li>
              <Link
                className="py-3 px-1 hover:-text--light-green duration-300"
                href="/informacion"
              >
                Información
              </Link>
            </li>
            <li>
              <Link
                className="py-3 px-1 hover:-text--light-green duration-300"
                href="/contacto"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="text-white flex shrink-0 grow-0 text-2xl gap-3 ">
            <li className="flex items-center">
              <Link
                className="-bg--light-green text-base font-medium text-white px-3 py-2 rounded-md hover:-bg--dark-green duration-300"
                href="/visitas"
              >
                Reserva tu visita
              </Link>
            </li>
            <li className="flex items-center">
              <Link href="/"><span className="icon-[lets-icons--search-alt-light]"></span></Link>
            </li>
            <li className="flex items-center">
              <Link href="/iniciar-sesion"><span className="icon-[solar--user-bold-duotone] hover:-text--light-green hover:scale-110 duration-300"></span></Link>
            </li>
            <li className="flex items-center">
              <Link href="/carrito"><span className="icon-[bytesize--cart]"></span></Link>
            </li>
          </ul>
        </div>
      </div>         
    </header>
  );
}
