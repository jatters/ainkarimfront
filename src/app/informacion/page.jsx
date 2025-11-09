import HeaderImage from "@/components/Ui/HeaderImage";
import FAQ from "@/components/Ui/FAQ";
import Image from "next/image";
import waze from "@/../public/logo-waze.svg";
import maps from "@/../public/logo-google-maps.svg";
import Script from "next/script";
import LottieAnimation from "@/components/LotttieAnimation";
import BusTransport from "../../../public/bustransport.json";
import CarTransport from "../../../public/car-transport.json";

export async function generateMetadata() {
  const title = "Información | Viñedo Ain Karim";
  const description =
    "Conoce cómo llegar al Viñedo Ain Karim, ubicado en Boyacá, Colombia. Encuentra indicaciones para llegar en automóvil particular o bus colectivo y consulta las preguntas frecuentes.";
  const canonicalUrl = "https://ainkarim.co/informacion";
  const imageUrl = "https://ainkarim.co/banner-informacion.webp";

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Información - Viñedo Ain Karim",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function Informationpage() {
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Información - Viñedo Ain Karim",
    url: "https://ainkarim.co/informacion",
    description:
      "Conoce cómo llegar al Viñedo Ain Karim, ubicado en Boyacá, Colombia. Encuentra indicaciones para llegar en automóvil particular o bus colectivo y consulta las preguntas frecuentes.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: "https://ainkarim.co",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Información",
          item: "https://ainkarim.co/informacion",
        },
      ],
    },
  };

  return (
    <main>
      <Script
        id="json-ld-information"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <HeaderImage title="Información" background="/banner-informacion.webp" />
      <section className="container mx-auto py-8 lg:py-16 px-5">
        <h2 className="text-3xl lg:text-4xl text-center mb-8">¿CÓMO LLEGAR?</h2>
        <div className="text-center mb-8">
          <p>
            <span className="icon-[ion--location-sharp] text-xl text-light-green"></span>
            <span className="font-bold text-dark-green">Ubicación:</span> Km
            10 Vía Villa de Leyva - Santa Sofía
          </p>
          <p>Boyacá - Colombia</p>
        </div>
        <p className="text-center">
          Puedes pulsar cualquiera de estas dos opciones para poder recibir las
          indicaciones desde tu aplicación favorita:
        </p>
        <div className="max-w-2xl mx-auto py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-linear-to-r from-white from-0% to-gray-300 to-100% rounded-md px-3 py-3 text-black font-semibold transition-all duration-200 hover:bg-linear-to-l">
              <a
                className="flex flex-col items-center"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir ubicación en Google Maps"
                href="https://www.google.com/maps/place/Viñedo+Ain+Karim/@5.6539568,-73.5901023,17z/data=!3m1!4b1!4m6!3m5!1s0x8e41d09be8b159e5:0x4b74ccd285409a6d!8m2!3d5.6539515!4d-73.5875274!16s%2Fg%2F11c42mqkdf?entry=ttu"
              >
                <Image src={maps} alt="Logo Google Maps" width={15} />
                <span>Abrir en Google Maps</span>
              </a>
            </div>
            <div className="bg-linear-to-r from-white from-0% to-gray-300 to-100% rounded-md px-3 py-3 text-black font-semibold transition-all duration-200 hover:bg-linear-to-l">
              <a
                className="flex flex-col items-center"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir ubicación en Waze"
                href="https://ul.waze.com/ul?preview_venue_id=187695161.1877017141.11201163&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"
              >
                <Image src={waze} alt="Logo Waze" width={84} />
                <span>Abrir en Waze</span>
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center">
          <div className="py-5 flex flex-col items-center px-10 shadow-lg rounded-lg border border-gray-200">
            <h3 className="text-dark-green text-xl font-semibold">
              AUTOMÓVIL PARTICULAR
            </h3>

            <LottieAnimation
              animationData={CarTransport}
              loop={true}
              className="w-48 h-32"
            />
            <p className="font-semibold mb-3">
              Para llegar al Viñedo se tienen dos vías
            </p>
            <ul className="list-disc prose">
              <li>
                Desde el municipio de Villa de Leyva, se debe tomar la vía Villa
                de Leyva - Santa Sofía, estamos ubicados a 10 km, tomando un
                desvío hacia Sutamarchán.
              </li>
              <li>
                Llegar al municipio de Sutamarchán, estando en Sutamarchán tomar
                la vía hacia Santa Sofía, y a tan solo 5 kilómetros de distancia
                nos encontrarás.
              </li>
            </ul>
          </div>
          <div className="py-5 flex flex-col items-center px-10 shadow-lg rounded-lg border border-gray-200">
            <h3 className="text-dark-green text-xl font-semibold">
              BUS COLECTIVO
            </h3>
            <LottieAnimation
              animationData={BusTransport}
              loop={true}
              className="w-48 h-32! -mt-12! mb-12"
            />
            <p className="font-semibold mb-3">Para llegar en bus podrias</p>
            <p className="prose">
              Llegar al terminal de Villa de Leyva y tomar el bus de salida para
              Santa Sofía, indicar al señor conductor que vas para el{" "}
              <span className="text-dark-green font-semibold">
                Viñedo Ain Karim
              </span>
              , en este punto de llegada deberás caminar 1 kilómetro y llegarás
              a tu destino, el{" "}
              <span className="text-dark-green font-semibold">
                Viñedo Ain Karim
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto pb-16 px-5">
        <h2 className="text-3xl text-center mb-8">PREGUNTAS FRECUENTES</h2>
        <FAQ />
      </section>
    </main>
  );
}
