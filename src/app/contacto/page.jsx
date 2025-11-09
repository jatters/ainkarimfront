import ContactForm from "@/components/Forms/ContactForm";
import Image from "next/image";
import waze from "@/../public/logo-waze.svg";
import maps from "@/../public/logo-google-maps.svg";
import HeaderImage from "@/components/Ui/HeaderImage";
import { headers } from "next/headers";
import Script from "next/script";
import { GetCompanyInfo } from "@/components/GetContentApi";

export async function getIPAddress() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch (error) {
    console.error("Error obteniendo la IP:", error);
    return "IP desconocida";
  }
}

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "";
  const cleaned = phoneNumber.toString().replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]} ${match[3]}`;
  }
  return phoneNumber;
};

export async function generateMetadata() {
  const title = "Contacto | Viñedo Ain Karim";
  const description =
    "Ponte en contacto con Viñedo Ain Karim. Escríbenos para solicitar información, realizar reservas o conocer nuestra ubicación en Boyacá, Colombia.";
  const canonicalUrl = "https://ainkarim.co/contacto";
  const imageUrl = "https://ainkarim.co/banner-contacto.webp";

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
          alt: "Contacto | Viñedo Ain Karim",
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

export default async function contactPage() {
  const ipAddress = await getIPAddress();
  const userAgent = await (await headers()).get("user-agent");
  const companyInfo = await GetCompanyInfo();

  if (!companyInfo) {
    return (
      <div>Lo sentimos, no se pudo cargar la información de la empresa.</div>
    );
  }

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contacto | Viñedo Ain Karim",
    url: "https://ainkarim.co/contacto",
    description:
      "Ponte en contacto con Viñedo Ain Karim para solicitar información, hacer reservas o resolver tus consultas. Conoce nuestra ubicación, teléfonos y correo.",
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
          name: "Contacto",
          item: "https://ainkarim.co/contacto",
        },
      ],
    },
    mainEntity: {
      "@type": "Organization",
      name: "Viñedo Ain Karim",
      url: "https://ainkarim.co",
      logo: "https://ainkarim.co/uploads/logo_ainkarim_9987562b80.png",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+57 317 431 9583",
          contactType: "customer service",
          email: "ventas@marquesvl.com",
        },
        {
          "@type": "ContactPoint",
          telephone: "(601) 258 9933",
          contactType: "office",
        },
      ],
    },
  };
  return (
    <main>
      <Script
        id="json-ld-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <HeaderImage title="Contacto" background="/banner-contacto.webp" />
      <section className="container mx-auto pt-8 lg:pt-16 pb-8 px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-5 mb-14">
          <div>
            <h2 className="font-bold text-2xl lg:text-4xl my-3 text-dark-green">
              ESCRÍBENOS
            </h2>
            <ContactForm ipAddress={ipAddress} useragent={userAgent} />
          </div>
          <div className="flex flex-col gap-y-10 justify-center px-5">
            <div className="shadow-xl rounded-lg p-8">
              <h2 className="font-bold text-2xl lg:text-4xl mb-6 text-dark-green">
                EL VIÑEDO
              </h2>
              <ul>
                <li>
                  <span className="icon-[ion--location-sharp] text-dark-green"></span>
                  <span className="font-bold text-dark-green">
                    {" "}
                    Ubicación:
                  </span>{" "}
                  {companyInfo?.vinedoAddress}
                </li>
                <li>
                  <span className="icon-[material-symbols--phonelink-ring-rounded] text-dark-green"></span>
                  <span className="font-bold text-dark-green">
                    {" "}
                    Teléfono:
                  </span>{" "}
                  <a href={`tel:${companyInfo?.vinedoPhone}`}>
                    {formatPhoneNumber(companyInfo?.vinedoPhone)}
                  </a>
                </li>
                <li>
                  <span className="icon-[solar--clock-square-broken] text-dark-green"></span>
                  <span className="font-bold text-dark-green">
                    {" "}
                    Horarios:
                  </span>{" "}
                  Abierto todos los días de 10:30 am a 5:00 pm, excepto los
                  martes.
                </li>
                <li className="ml-5">Ultimo recorrido 3:30pm</li>
                <li>
                  <span className="icon-[ion--mail-outline] text-dark-green"></span>
                  <span className="font-bold text-dark-green"> Correo:</span>
                  <a href={`mailto:${companyInfo?.contactEmail}`}>
                    {" "}
                    {companyInfo?.contactEmail}
                  </a>
                </li>
              </ul>
            </div>
            <div className="shadow-xl rounded-lg p-8">
              <h2 className="font-bold text-2xl lg:text-4xl mb-6 text-dark-green">
                OFICINA
              </h2>
              <ul>
                <li>
                  <span className="icon-[ion--location-sharp] text-dark-green"></span>
                  <span className="font-bold text-dark-green">
                    Dirección:
                  </span>{" "}
                  {companyInfo?.officeAddress}
                </li>
                <li>
                  <span className="icon-[material-symbols-light--phone-in-talk] text-dark-green"></span>
                  <span className="font-bold text-dark-green">
                    {" "}
                    Teléfono:
                  </span>
                  <a href={`tel:${companyInfo?.vinedoPhone}`}>
                    {formatPhoneNumber(companyInfo?.vinedoPhone)}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto pb-16 px-5">
        <h2 className="font-bold text-2xl lg:text-4xl text-center mb-10 text-dark-green">
          ¿CÓMO LLEGAR?
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-5 flex-wrap items-center">
            <div className="flex items-center flex-wrap justify-center gap-1 text-center">
              <span className="icon-[ion--location-sharp] text-xl text-light-green"></span>
              <span className="font-bold text-dark-green">Ubicación:</span>{" "}
              {companyInfo?.vinedoAddress}
            </div>
            <div className="flex flex-wrap gap-5 justify-center">
              <div className="bg-linear-to-r from-white from-0% to-gray-300 to-100% rounded-md px-3 py-3 text-black font-semibold transition-all duration-200 hover:bg-linear-to-l">
                <a
                  className="flex flex-col items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir ubicación en Google Maps"
                  href={companyInfo?.linkGoogleMaps}
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
                  href={companyInfo?.linkWaze}
                >
                  <Image src={waze} alt="Logo Waze" width={84} />
                  <span>Abrir en Waze</span>
                </a>
              </div>
            </div>
          </div>
          <div className="relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15881.664845343797!2d-73.59622766183533!3d5.652774901465026!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e41d09be8b159e5%3A0x4b74ccd285409a6d!2sVi%C3%B1edo%20Ain%20Karim!5e0!3m2!1ses!2sve!4v1714492685787!5m2!1ses!2sve"
              width="100%"
              height="450"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
