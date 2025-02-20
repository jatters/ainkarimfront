import Image from "next/image";
import { Link } from "next-view-transitions";
import waze from "@/../public/logo-waze.svg";
import maps from "@/../public/logo-google-maps.svg";

export default function Footer() {
  return (
    <footer className="-bg--dark-green text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-auto px-5 md:px-12 pt-8 md:pt-16 pb-6 md:pb-12 gap-8">
        <div>
          <div className="text-xl mb-6 after:content-[''] after:-bg--light-green after:block after:h-[2px] after:w-10">
            EL VIÑEDO
          </div>
          <ul
            className="flex flex-col gap-3 text-sm"
            aria-label="Datos de contacto del Viñedo Ain Karim"
          >
            <li>
              <div className="flex flex-wrap gap-1 items-center">
                <span className="icon-[gridicons--location] text-xl"></span>
                <span className="font-semibold">Ubicación: </span> Km 10 Vía
                Villa de Leyva - Santa Sofía
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-3 mb-3">
                <div className="bg-gradient-to-r from-white from-0% to-gray-300 to-100% rounded-md px-3 py-3 text-black font-semibold transition-all duration-500 hover:bg-gradient-to-l">
                  <a
                    className="flex flex-col items-center"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Abrir ubicación en Google Maps"
                    href="https://www.google.com/maps/place/Viñedo+Ain+Karim/@5.6539568,-73.5901023,17z/data=!3m1!4b1!4m6!3m5!1s0x8e41d09be8b159e5:0x4b74ccd285409a6d!8m2!3d5.6539515!4d-73.5875274!16s%2Fg%2F11c42mqkdf?entry=ttu"
                  >
                    <Image src={maps} alt="Logo Google Maps" width={15} />
                    <span>Abrir en Google Maps</span>
                  </a>
                </div>
                <div className="bg-gradient-to-r from-white from-0% to-gray-300 to-100% rounded-md px-3 py-3 text-black font-semibold transition-all duration-500 hover:bg-gradient-to-l">
                  <a
                    className="flex flex-col items-center"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Abrir ubicación en Waze"
                    href="https://ul.waze.com/ul?preview_venue_id=187695161.1877017141.11201163&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
                  >
                    <Image src={waze} alt="Logo Waze" width={84} />
                    <span>Abrir en Waze</span>
                  </a>
                </div>
              </div>
            </li>
            <li className="flex flex-wrap gap-1 items-center">
              <span className="icon-[mdi--phone] text-xl"></span>
              <span className="font-semibold">Teléfono: </span>
              <a
                className="hover:-text--light-green duration-200"
                href="tel:6012589933"
              >
                (601) 258 9933 Opción 2
              </a>
            </li>
            <li className="flex flex-wrap gap-1 items-center">
              <span className="icon-[basil--mobile-phone-outline] text-xl"></span>
              <span className="font-semibold">Información: </span>
              <a
                className="hover:-text--light-green duration-200"
                href="tel:3174319583"
              >
                317 431 9583
              </a>
            </li>
            <li className="flex flex-wrap gap-1 items-center">
              <span className="icon-[material-symbols--mail] text-xl"></span>
              <span className="font-semibold">Correo: </span>
              <a
                className="hover:-text--light-green duration-200"
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
          <nav role="navigation" aria-label="Vínculos de interés">
            <ul className="flex flex-col space-y-2 text-sm">
              <li>
                <Link
                  className="hover:-text--light-green duration-200"
                  href="/el-vinedo"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/advertencias-y-recomendaciones"
                  className="hover:-text--light-green duration-200"
                >
                  Advertencias y recomendaciones
                </Link>
              </li>
              <li>
                <Link
                  href="/preguntas-frecuentes"
                  className="hover:-text--light-green duration-200"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/reglamento"
                  className="hover:-text--light-green duration-200"
                >
                  Reglamento
                </Link>
              </li>
              <li>
                <Link
                  href="/puntos-de-venta"
                  className="hover:-text--light-green duration-200"
                >
                  Puntos de venta
                </Link>
              </li>
            </ul>
          </nav>
          <nav className="mt-5" role="navigation" aria-label="Legal">
            <div className="text-xl mb-3 after:content-[''] after:-bg--light-green after:block after:h-[2px] after:w-10">
              Legal
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/aviso-de-privacidad"
                  className="hover:-text--light-green duration-200"
                >
                  Aviso de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-y-condiciones"
                  className="hover:-text--light-green duration-200"
                >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-tratamiento-de-datos-personales"
                  className="hover:-text--light-green duration-200"
                >
                  Política de tratamiento de datos personales
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <div className="text-xl mb-6 after:content-[''] after:-bg--light-green after:block after:h-[2px] after:w-10">
            HORARIOS
          </div>
          <ul
            className="flex flex-col space-y-2 text-sm"
            aria-label="Horarios de atención del Viñedo Ain Karim"
          >
            <li>
              <span className="font-semibold">Lunes:</span> 10:30 am a 5:30 pm
            </li>
            <li>
              <span className="font-semibold">Martes:</span> Cerrado
            </li>
            <li>
              <span className="font-semibold">Miércoles:</span> 10:30 am a 5:30
              pm
            </li>
            <li>
              <span className="font-semibold">Jueves:</span> 10:30 am a 5:30 pm
            </li>
            <li>
              <span className="font-semibold">Viernes:</span> 10:30 am a 5:30 pm
            </li>
            <li>
              <span className="font-semibold">Sábado:</span> 10:30 am a 5:30 pm
            </li>
            <li>
              <span className="font-semibold">Domingo y festivos:</span> 10:30
              am a 5:30 pm
            </li>
            <li>
              <span className="font-semibold">Último recorrido:</span> 3:30pm
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xl mb-6 after:content-[''] after:-bg--light-green after:block after:h-[2px] after:w-10">
            OFICINA
          </div>
          <ul
            className="flex flex-col space-y-2 text-sm gap-3"
            aria-label="Datos de la oficina del Viñedo Ain Karim"
          >
            <li className="flex items-center gap-1 flex-wrap">
              <span className="icon-[gridicons--location] text-xl"></span>
              <span className="font-semibold">Dirección:</span> Av. Calle 127 #
              13A-32 Ofi. 202
            </li>
            <li className="flex items-center gap-1 flex-wrap">
              <span className="icon-[basil--mobile-phone-outline] text-xl"></span>
              <span className="font-semibold">Teléfono:</span>
              <a
                className="hover:-text--light-green duration-200"
                href="tel:6012589933"
              >
                (601) 258 9933
              </a>
            </li>
            <li className="flex items-center gap-1">Bogotá, Colombia.</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center pb-5">
        <span className="text-lg md:text-xl font-semibold">Síguenos</span>
        <ul
          className="flex flex-row  gap-4 my-3"
          aria-label="Redes sociales del Viñedo Ain Karim"
        >
          <li>
            <a
              className="text-3xl"
              href="https://www.instagram.com/vinedoainkarim"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Ir a perfil de Instagram del Viñedo Ain Karim"
            >
              <span className="icon-[mdi--instagram] hover:-text--light-green hover:scale-110 duration-200"></span>
            </a>
          </li>
          <li>
            <a
              className="text-3xl"
              href="https://web.facebook.com/Vinedoainkarim"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Ir a perfil de Facebook del Viñedo Ain Karim"
            >
              <span className="icon-[carbon--logo-facebook] hover:-text--light-green hover:scale-110 duration-200"></span>
            </a>
          </li>
          <li>
            <a
              className="text-3xl"
              href="https://www.tripadvisor.co/Attraction_Review-g676524-d5888335-Reviews-Vinedo_Ain_Karim-Villa_de_Leyva_Boyaca_Department.html"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Ir a perfil de Tripadvisor"
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
            aria-label="Ir a la página del Desarrollador"
            className="-text--red-cruz hover:-text--grey-dark hover:font-semibold hover:transition-all"
            rel="noopener"
          >
            Einscube
          </a>
        </p>
      </div>
    </footer>
  );
}
