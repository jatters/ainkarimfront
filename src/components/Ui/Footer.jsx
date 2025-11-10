import Image from "next/image";
import Link from "next/link";
import waze from "@/../public/logo-waze.svg";
import maps from "@/../public/logo-google-maps.svg";
import { GetCompanyInfo } from "../GetContentApi";
import formatPhoneNumber from "../../lib/FormatPhoneNumber";


export default async function Footer() {
  const companyInfo = await GetCompanyInfo();

  return (
    <footer className="bg-linear-to-tl from-black to-dark-green to-50% text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-auto px-5 md:px-12 pt-8 md:pt-16 pb-6 md:pb-12 gap-8">
        <div>
          <div className="text-lg mb-6 after:content-[''] after:bg-light-green after:block after:h-[2px] after:mt-1 after:w-10 font-medium">
            EL VIÑEDO
          </div>
          <ul
            className="flex flex-col gap-3 text-sm"
            aria-label="Datos de contacto del Viñedo Ain Karim"
          >
            <li>
              <div className="flex flex-wrap gap-1 items-center">
                <span className="icon-[gridicons--location] text-xl"></span>
                {companyInfo?.vinedoAddress && (
                  <>
                    <span className="font-semibold">Ubicación: </span>{" "}
                    {companyInfo?.vinedoAddress}
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-3 mb-3">
                {companyInfo?.linkGoogleMaps && (
                  <div className="bg-linear-to-r from-white from-0% to-gray-300 to-100% rounded-md px-3 py-3 text-black font-semibold transition-all duration-500 hover:bg-linear-to-l">
                    <a
                      className="flex flex-col items-center"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Abrir ubicación en Google Maps"
                      href={companyInfo?.linkGoogleMaps}
                    >
                      <Image src={maps} alt="Logo Google Maps" width={15} />
                      <span>Abrir en Google Maps</span>
                    </a>
                  </div>
                )}
                {companyInfo?.linkWaze && (
                  <div className="bg-linear-to-r from-white from-0% to-gray-300 to-100% rounded-md px-3 py-3 text-black font-semibold transition-all duration-500 hover:bg-linear-to-l">
                    <a
                      className="flex flex-col items-center"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Abrir ubicación en Waze"
                      href={companyInfo?.linkWaze}
                    >
                      <Image src={waze} alt="Logo Waze" width={84} />
                      <span>Abrir en Waze</span>
                    </a>
                  </div>
                )}
              </div>
            </li>
            <li className="flex flex-wrap gap-1 items-center">
              <span className="icon-[mdi--phone] text-xl"></span>
              <span className="font-semibold">Teléfono: </span>
              {companyInfo?.vinedoPhone && (
                <a
                  className="hover:text-light-green duration-200"
                  href={`tel:${companyInfo?.vinedoPhone}`}
                >
                  {formatPhoneNumber(companyInfo.vinedoPhone)}
                </a>
              )}
            </li>
            <li className="flex flex-wrap gap-1 items-center">
              <span className="icon-[material-symbols--mail] text-xl"></span>
              <span className="font-semibold">Correo: </span>
              {companyInfo?.contactEmail && (
                <a
                  className="hover:text-light-green duration-200"
                  href={`mailto:${companyInfo?.contactEmail}`}
                >
                  {companyInfo?.contactEmail}
                </a>
              )}
            </li>
          </ul>
        </div>
        <div className="hidden md:block">
          <div className=" text-lg mb-6 after:content-[''] after:bg-light-green after:block after:h-[2px] after:mt-1 after:w-10 font-medium">
            VÍNCULOS DE INTERÉS
          </div>
          <nav role="navigation" aria-label="Vínculos de interés">
            <ul className="flex flex-col space-y-2 text-sm">
              <li>
                <Link
                  className="hover:text-light-green duration-200"
                  href="/el-vinedo"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/advertencias-y-recomendaciones"
                  className="hover:text-light-green duration-200"
                >
                  Advertencias y recomendaciones
                </Link>
              </li>
              <li>
                <Link
                  href="/preguntas-frecuentes"
                  className="hover:text-light-green duration-200"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/reglamento"
                  className="hover:text-light-green duration-200"
                >
                  Reglamento
                </Link>
              </li>
              <li>
                <Link
                  href="/puntos-de-venta"
                  className="hover:text-light-green duration-200"
                >
                  Puntos de venta
                </Link>
              </li>
              <li>
                <Link
                  href="/registro-agencias"
                  className="hover:text-light-green duration-200"
                >
                  Registro de agencias
                </Link>
              </li>
            </ul>
          </nav>
          <nav className="mt-5" role="navigation" aria-label="Legal">
            <div className="text-lg mb-3 after:content-[''] after:bg-light-green after:block after:h-[2px] after:mt-1 after:w-10 font-medium">
              Legal
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/aviso-de-privacidad"
                  className="hover:text-light-green duration-200"
                >
                  Aviso de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-y-condiciones"
                  className="hover:text-light-green duration-200"
                >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-tratamiento-de-datos-personales"
                  className="hover:text-light-green duration-200"
                >
                  Política de tratamiento de datos personales
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <div className="text-lg mb-6 after:content-[''] after:bg-light-green after:block after:h-[2px] after:mt-1 after:w-10 font-medium">
            HORARIOS
          </div>
          <ul
            className="flex flex-col space-y-2 text-sm"
            aria-label="Horarios de atención del Viñedo Ain Karim"
          >
            {companyInfo?.open && (
              <li>
                <span className="font-semibold">Apertura:</span>{" "}
                {companyInfo?.open}
              </li>
            )}
            {companyInfo?.lastTour && (
              <li>
                <span className="font-semibold">Último recorrido:</span>{" "}
                {companyInfo?.lastTour}
              </li>
            )}
            {companyInfo?.close && (
              <li>
                <span className="font-semibold">Cierre:</span>{" "}
                {companyInfo?.close}
              </li>
            )}
            <li>
              <div className="h-px bg-white w-20 my-2" />
            </li>
            <li>
              <span className="font-semibold">Lunes:</span>{" "}
              {companyInfo?.monday}
            </li>
            <li>
              <span className="font-semibold">Martes:</span>{" "}
              {companyInfo?.tuesday}
            </li>
            <li>
              <span className="font-semibold">Miércoles:</span>{" "}
              {companyInfo?.wednesday}
            </li>
            <li>
              <span className="font-semibold">Jueves:</span>{" "}
              {companyInfo?.thursday}
            </li>
            <li>
              <span className="font-semibold">Viernes:</span>{" "}
              {companyInfo?.friday}
            </li>
            <li>
              <span className="font-semibold">Sábado:</span>{" "}
              {companyInfo?.saturday}
            </li>
            <li>
              <span className="font-semibold">Domingo y festivos:</span>{" "}
              {companyInfo?.sunday}
            </li>
          </ul>
        </div>
        <div>
          <div className="text-lg mb-6 after:content-[''] after:bg-light-green after:block after:h-[2px] after:mt-1 after:w-10 font-medium">
            OFICINA
          </div>
          <ul
            className="flex flex-col space-y-2 text-sm gap-3"
            aria-label="Datos de la oficina del Viñedo Ain Karim"
          >
            <li className="flex items-center gap-1 flex-wrap">
              <span className="icon-[gridicons--location] text-xl"></span>
              <span className="font-semibold">Dirección:</span>{" "}
              {companyInfo?.officeAddress}
            </li>
            <li className="flex items-center gap-1 flex-wrap">
              <span className="icon-[basil--mobile-phone-outline] text-xl"></span>
              <span className="font-semibold">Teléfono:</span>
              {companyInfo?.vinedoPhone && (
                <a
                  className="hover:text-light-green duration-200"
                  href={`tel:${companyInfo?.vinedoPhone}`}
                >
                  {formatPhoneNumber(companyInfo?.vinedoPhone)}
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center pb-5">
        <span className="text-lg md:text-xl font-medium">Síguenos</span>
        <ul
          className="flex flex-row  gap-4 my-3"
          aria-label="Redes sociales del Viñedo Ain Karim"
        >
          {companyInfo?.instagram && (
            <li>
              <a
                className="text-3xl"
                href={companyInfo?.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Ir a perfil de Instagram del Viñedo Ain Karim"
              >
                <span className="icon-[mdi--instagram] hover:text-light-green hover:scale-110 duration-200"></span>
              </a>
            </li>
          )}
          {companyInfo?.facebook && (
            <li>
              <a
                className="text-3xl"
                href={companyInfo?.facebook}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Ir a perfil de Facebook del Viñedo Ain Karim"
              >
                <span className="icon-[carbon--logo-facebook] hover:text-light-green hover:scale-110 duration-200"></span>
              </a>
            </li>
          )}
          {companyInfo?.tripAdvisor && (
            <li>
              <a
                className="text-3xl"
                href={companyInfo?.tripAdvisor}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Ir a perfil de Tripadvisor"
              >
                <span className="icon-[simple-icons--tripadvisor] hover:text-light-green hover:scale-110 duration-200"></span>
              </a>
            </li>
          )}
        </ul>
      </div>
      <div className="bg-white text-black">
        <p
          id="footer-text"
          className="items-center flex text-sm m-0 min-h-14 justify-center gap-x-1"
        >
          Desarrollado con ☕ & 💙 por{" "}
          <a
            href="https://einscube.com/?utm_source=ainkarim"
            target="_blank"
            aria-label="Ir a la página del Desarrollador"
            className="text-dark-green hover:text-light-green duration-200 hover:transition-all"
            rel="noopener"
          >
            Einscube
          </a>
        </p>
      </div>
    </footer>
  );
}
