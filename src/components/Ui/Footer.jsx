import Image from "next/image";
import Link from "next/link";
import waze from "@/../public/logo-waze.svg";
import maps from "@/../public/logo-google-maps.svg";

export default function Footer() {
  return (
    <footer className="-bg--dark-green text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-auto px-12 pt-16 pb-12 gap-8">
        <div>
          <div className="text-xl mb-6 after:content-[''] after:-bg--light-green after:block after:h-[2px] after:w-10">
            EL VIÑEDO
          </div>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <div className="flex gap-1 items-center">
                <span className="icon-[gridicons--location] text-xl"></span>
                <span className="font-bold">Ubicación: </span> Km 10 Vía Villa
                de Leyva - Santa Sofía
              </div>
              <div className="flex gap-2 justify-center mt-3 mb-3">
                <div className="shrink-0 grow-0 bg-gradient-to-r from-white from-0% to-gray-300 to-100% rounded-md px-3 py-3 text-black font-semibold hover:bg-gradient-to-l from-white from-0% to-gray-300 to-100%">
                  <a
                    className="flex flex-col items-center"
                    target="_blank"
                    href="https://www.google.com/maps/place/Viñedo+Ain+Karim/@5.6539568,-73.5901023,17z/data=!3m1!4b1!4m6!3m5!1s0x8e41d09be8b159e5:0x4b74ccd285409a6d!8m2!3d5.6539515!4d-73.5875274!16s%2Fg%2F11c42mqkdf?entry=ttu"
                  >
                    <Image src={maps} alt="Logo Google Maps" width={15} />
                    <span>Abrir en Google Maps</span>
                  </a>
                </div>
                <div className="shrink-0 grow-0 bg-gradient-to-r from-white from-0% to-gray-300 to-100% rounded-md px-3 py-3 text-black font-semibold hover:bg-gradient-to-l from-white from-0% to-gray-300 to-100%">
                  <a
                    className="flex flex-col items-center"
                    target="_blank"
                    href="https://ul.waze.com/ul?preview_venue_id=187695161.1877017141.11201163&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
                  >
                    <Image src={waze} alt="Logo Waze" width={84} />
                    <span>Abrir en Waze</span>
                  </a>
                </div>
              </div>
            </li>
            <li className="flex gap-1 items-center">
              <span className="icon-[mdi--phone] text-xl"></span>
              <span className="font-bold">Teléfono: </span>
              <a className="hover:-text--light-green" href="tel:6012589933">
                (601) 258 9933 Opción 2
              </a>
            </li>
            <li className="flex gap-1 items-center">
              <span className="icon-[basil--mobile-phone-outline] text-xl"></span>
              <span className="font-bold">Información: </span>
              <a className="hover:-text--light-green" href="tel:3174319583">
                317 431 9583
              </a>
            </li>
            <li className="flex gap-1 items-center">
              <span className="icon-[material-symbols--mail] text-xl"></span>
              <span className="font-bold">Correo: </span>
              <a
                className="hover:-text--light-green"
                href="mailto:ventas@marquesvl.com"
              >
                ventas@marquesvl.com
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xl mb-6 after:content-[''] after:-bg--light-green after:block after:h-[2px] after:w-10">
            VÍNCULOS DE INTERÉS
          </div>
          <ul className="flex flex-col space-y-2 text-sm">
            <li>
              <a className="hover:-text--light-green" href="">
                Nosotros
              </a>
            </li>
            <li>
              <Link
                href="/politica-de-privacidad"
                className="hover:-text--light-green"
              >
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link
                href="/politica-de-tratamiento-de-datos-personales"
                className="hover:-text--light-green"
              >
                Política de tratamiento de datos
              </Link>
            </li>
            <li>
              <Link
                href="/preguntas-frecuentes"
                className="hover:-text--light-green"
              >
                Preguntas Frecuentes
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xl mb-6 after:content-[''] after:-bg--light-green after:block after:h-[2px] after:w-10">
            HORARIOS
          </div>
          <ul className="flex flex-col space-y-2 text-sm">
            <li>
              <span className="font-bold">Lunes:</span> 10:30 am a 5:30 pm
            </li>
            <li>
              <span className="font-bold">Martes:</span> Cerrado
            </li>
            <li>
              <span className="font-bold">Miércoles:</span> 10:30 am a 5:30 pm
            </li>
            <li>
              <span className="font-bold">Jueves:</span> 10:30 am a 5:30 pm
            </li>
            <li>
              <span className="font-bold">Viernes:</span> 10:30 am a 5:30 pm
            </li>
            <li>
              <span className="font-bold">Sábado:</span> 10:30 am a 5:30 pm
            </li>
            <li>
              <span className="font-bold">Domingo y festivos:</span> 10:30 am a
              5:30 pm
            </li>
            <li>Ultimo recorrido 3:30pm</li>
          </ul>
        </div>
        <div>
          <div className="text-xl mb-6 after:content-[''] after:-bg--light-green after:block after:h-[2px] after:w-10">
            OFICINA
          </div>
          <ul className="flex flex-col space-y-2 text-sm">
            <li className="flex items-center gap-1">
              <span className="icon-[gridicons--location] text-xl"></span>
              <span className="font-bold">Dirección:</span> Av. Calle 127 #
              13A-32 Ofi. 202
            </li>
            <li className="flex items-center gap-1">
              <span className="icon-[basil--mobile-phone-outline] text-xl"></span>
              <span className="font-bold">Teléfono:</span>
              <a className="hover:-text--light-green" href="tel:6012589933">
                (601) 258 9933
              </a>
            </li>
            <li className="flex items-center gap-1">Bogotá, Colombia.</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center pb-5">
        <span className="text-xl font-semibold">Síguenos</span>
        <ul className="flex flex-row  gap-4 my-3">
          <li>
            <a
              className="text-3xl"
              href="https://www.instagram.com/vinedoainkarim"
              target="_blank"
            >
              <span className="icon-[mdi--instagram] hover:-text--light-green hover:scale-110 duration-200"></span>
            </a>
          </li>
          <li>
            <a
              className="text-3xl"
              href="https://web.facebook.com/Vinedoainkarim"
              target="_blank"
            >
              <span className="icon-[carbon--logo-facebook] hover:-text--light-green hover:scale-110 duration-200"></span>
            </a>
          </li>
          <li>
            <a
              className="text-3xl"
              href="https://www.tripadvisor.co/Attraction_Review-g676524-d5888335-Reviews-Vinedo_Ain_Karim-Villa_de_Leyva_Boyaca_Department.html"
              target="_blank"
            >
              <span className="icon-[simple-icons--tripadvisor] hover:-text--light-green hover:scale-110 duration-200"></span>
            </a>
          </li>
        </ul>
      </div>
      <div className="bg-white text-black">
        <p
          id="footer-text"
          className="items-center flex text-sm m-0 min-h-14 justify-center gap-x-1"
        >
          Desarrollado con ☕ & 💙 por{" "}
          <a
            href="https://einscube.com"
            target="_blank"
            className="-text--red-cruz hover:-text--grey-dark hover:font-semibold hover:transition-all"
          >
            Einscube
          </a>
        </p>
      </div>
    </footer>
  );
}
