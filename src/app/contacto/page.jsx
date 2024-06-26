import ContactForm from "@/components/Forms/ContactForm";
import Image from "next/image";
import waze from "@/../public/logo-waze.svg";
import maps from "@/../public/logo-google-maps.svg";
import banner from "@/../public/banner-contacto.jpg";
import Link from "next/link";
import HeaderImage from "@/components/Ui/HeaderImage";

export default function contactPage() {
  return (
    <>
      <HeaderImage title="Contacto" background="/banner-contacto.jpg"/>
      <div className="container mx-auto pt-16 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-5 mb-14">
          <div>
            <h2 className="font-bold text-4xl mb-6 -text--dark-green">ESCRÍBENOS</h2>
            <ContactForm />
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="shadow-xl rounded-lg p-8">
              <h2 className="font-bold text-4xl mb-6 -text--dark-green">EL VIÑEDO</h2>
              <ul>
                <li>
                <span className="icon-[ion--location-sharp] -text--dark-green"></span><span className="font-bold -text--dark-green"> Ubicación:</span> Km 10 Vía Villa
                  de Leyva – Santa Sofía
                </li>
                <li>
                <span className="icon-[material-symbols--phonelink-ring-rounded] -text--dark-green"></span><span className="font-bold -text--dark-green"> Teléfono:</span>{" "}
                  <a href="tel:3174319583">317 431 9583</a>
                </li>
                <li>
                <span className="icon-[solar--clock-square-broken] -text--dark-green"></span><span className="font-bold -text--dark-green"> Horarios:</span> Abierto todos los
                  días de 10:00 am a 4:00 pm, excepto los martes.
                </li>
                <li>
                <span className="icon-[ion--mail-outline] -text--dark-green"></span><span className="font-bold -text--dark-green"> Correo:</span><a href="mailto:ventas@marquesvl.com"> ventas@marquesvl.com</a>
                </li>
              </ul>
            </div>
            <div className="shadow-xl rounded-lg p-8">
              <h2 className="font-bold text-4xl mb-6 -text--dark-green">OFICINA</h2>
              <ul>
                <li>
                <span className="icon-[ion--location-sharp] -text--dark-green"></span><span className="font-bold -text--dark-green">Dirección:</span> Av. Calle 127 #
                  13A-32 Ofi. 202 | Bogotá, Colombia
                </li>                
                <li>
                <span className="icon-[material-symbols-light--phone-in-talk] -text--dark-green"></span><span className="font-bold -text--dark-green"> Teléfono:</span>
                  <a href="tel:6012589933"> (601) 258 9933</a>
                </li>
                <li>
                <span className="icon-[mdi--moped] -text--dark-green"></span><span className="font-bold -text--dark-green"> Pedidos:</span>
                  <a href="tel:3175182745"> 317 518 2745</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-4xl text-center mb-6 -text--dark-green">¿CÓMO LLEGAR?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-5 items-center">
            <div className="flex flex-col gap-5">
              <div>
              <span className="icon-[ion--location-sharp] text-xl -text--light-green"></span><span className="font-bold -text--dark-green">Ubicación:</span> Km 10 Vía Villa de
                Leyva – Santa Sofía
              </div>
              <div className="flex-1 shrink-0 grow-0 bg-gradient-to-r from-white from-0% to-gray-300 to-100% rounded-md px-3 py-3 text-black font-semibold hover:bg-gradient-to-l from-white from-0% to-gray-300 to-100%">
                <a
                  className="flex flex-col items-center"
                  target="_blank"
                  href="https://www.google.com/maps/place/Viñedo+Ain+Karim/@5.6539568,-73.5901023,17z/data=!3m1!4b1!4m6!3m5!1s0x8e41d09be8b159e5:0x4b74ccd285409a6d!8m2!3d5.6539515!4d-73.5875274!16s%2Fg%2F11c42mqkdf?entry=ttu"
                >
                  <Image src={maps} alt="Logo Google Maps" width={15} />
                  <span>Abrir en Google Maps</span>
                </a>
              </div>
              <div className="flex-1 shrink-0 grow-0 bg-gradient-to-r from-white from-0% to-gray-300 to-100% rounded-md px-3 py-3 text-black font-semibold hover:bg-gradient-to-l from-white from-0% to-gray-300 to-100%">
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
            <div>
              <iframe
                title="Viñedo Ain Karim Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15881.664845343797!2d-73.59622766183533!3d5.652774901465026!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e41d09be8b159e5%3A0x4b74ccd285409a6d!2sVi%C3%B1edo%20Ain%20Karim!5e0!3m2!1ses!2sve!4v1714492685787!5m2!1ses!2sve"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
