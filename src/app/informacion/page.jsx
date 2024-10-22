import HeaderImage from "@/components/Ui/HeaderImage";
import FAQ from "@/components/Ui/FAQ";
import Image from "next/image";
import waze from "@/../public/logo-waze.svg";
import maps from "@/../public/logo-google-maps.svg";

export default function Informationpage() {
  return (
    <>
      <HeaderImage title="Información" background="/banner-informacion.jpg" />
      <section className="container mx-auto py-16 px-5">
        <h2 className="text-4xl text-center mb-8">¿CÓMO LLEGAR?</h2>
        <div className="text-center mb-8">
          <p>
            <span className="icon-[ion--location-sharp] text-xl -text--light-green"></span>
            <span className="font-bold -text--dark-green">Ubicación:</span> Km
            10 Vía Villa de Leyva – Santa Sofía
          </p>
          <p>Boyacá - Colombia</p>
        </div>
        <p className="text-center">
          Puedes pulsar cualquiera de estas dos opciones para poder recibir las
          indicaciones desde tu aplicación favorita:
        </p>
        <div className="max-w-2xl mx-auto py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-gradient-to-r from-white from-0% to-gray-300 to-100% rounded-md px-3 py-3 text-black font-semibold transition-all duration-200 hover:bg-gradient-to-l">
              <a
                className="flex flex-col items-center"
                target="_blank"
                href="https://www.google.com/maps/place/Viñedo+Ain+Karim/@5.6539568,-73.5901023,17z/data=!3m1!4b1!4m6!3m5!1s0x8e41d09be8b159e5:0x4b74ccd285409a6d!8m2!3d5.6539515!4d-73.5875274!16s%2Fg%2F11c42mqkdf?entry=ttu"
              >
                <Image src={maps} alt="Logo Google Maps" width={15} />
                <span>Abrir en Google Maps</span>
              </a>
            </div>
            <div className="bg-gradient-to-r from-white from-0% to-gray-300 to-100% rounded-md px-3 py-3 text-black font-semibold transition-all duration-200 hover:bg-gradient-to-l">
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
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center">
          <div className="py-5 flex flex-col items-center space-y-5 px-10 shadow-lg rounded-lg">
            <span className="icon-[lucide--car] text-8xl -text--dark-green" />
            <h3 className="-text--dark-green text-xl font-semibold">
              AUTOMÓVIL PARTICULAR
            </h3>
            <p>Para llegar al viñedo se tienen dos vías:</p>
            <ul className="list-disc">
              <li>
                Desde el municipio de villa de Leyva, se debe tomar la vía Villa
                de Leyva – Santa Sofía, estamos ubicados a 10 km, tomando un
                desvío hacia Sutamarchán.
              </li>
              <li>
                Llegar al municipio de Sutamarchán, estando en Sutamarchán tomar
                la vía hacia Santa Sofía, y a tan solo 5 kilómetros de distancia
                nos encontrarás.
              </li>
            </ul>
          </div>
          <div className="py-5 flex flex-col items-center space-y-5 px-10 shadow-lg rounded-lg">
            <span className="icon-[lucide--bus] text-8xl -text--dark-green" />
            <h3 className="-text--dark-green text-xl font-semibold">
              BUS COLECTIVO
            </h3>
            <p>Para llegar en bus podrias:</p>
            <p>
              Llegar al terminal de Villa de Leyva y tomar el bus de salida para
              Santa Sofía, indicar al señor conductor para ir al viñedo Ain
              Karim, en este punto de llegada deberás caminar 1 kilómetro y
              llegarás a tu destino, el Viñedo Ain Karim
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto pb-16 px-5">
        <h2 className="text-3xl text-center mb-8">PREGUNTAS FRECUENTES</h2>
        <FAQ />
      </section>
    </>
  );
}
