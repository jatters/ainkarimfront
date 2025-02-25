import HeroCoverHome from "@/components/Ui/HeroCoverHome";
import { Link } from 'next-view-transitions'
import PlansHome from "@/components/Ui/PlansHome";
import ProductsHome from "@/components/Ui/ProductsHome";
import Popup from "@/components/Ui/Popup";
import Script from "next/script";

export const metadata = {
  title: "Viñedo Ain Karim | Turismo enológico en Villa de Leyva",
  description:
    "Descubre Viñedo Ain Karim en Villa de Leyva. Disfruta de catas de vino, recorridos guiados y experiencias enoturísticas únicas en Colombia.",
  keywords: [
    "Viñedo Ain Karim",
    "Viñedo en Villa de Leyva",
    "Turismo enológico Colombia",
    "Vino colombiano",
    "Catas de vino Villa de Leyva",
    "Experiencia en viñedos",
    "Planes turísticos Villa de Leyva",
    "Visitas guiadas viñedo",
  ],
  alternates: {
    canonical: "https://ainkarim.co",
  },
  openGraph: {
    title: "Viñedo Ain Karim | Turismo enológico en Villa de Leyva",
    description:
      "Explora Viñedo Ain Karim y vive una experiencia única con nuestros vinos, catas y visitas guiadas en un entorno natural inigualable.",
    url: "https://ainkarim.co",
    siteName: "Viñedo Ain Karim",
    images: [
      {
        url: "https://ainkarim.co/images/viñedo-ainkarim-og.jpg",
        width: 1200,
        height: 630,
        alt: "Vista del Viñedo Ain Karim en Villa de Leyva con viñedos y montañas",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viñedo Ain Karim | Turismo enológico en Villa de Leyva",
    description:
      "Descubre Viñedo Ain Karim y disfruta de catas de vino y experiencias enoturísticas en Villa de Leyva, Colombia.",
    site: "@ainskarim",
    creator: "@einscube",
    images: ["https://ainkarim.co/images/viñedo-ainkarim-og.jpg"],
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Viñedo Ain Karim",
    url: "https://ainkarim.co",
    description:
      "Descubre Viñedo Ain Karim en Villa de Leyva. Disfruta de catas de vino, recorridos guiados y experiencias enoturísticas únicas en Colombia.",
    image: "https://ainkarim.co/images/viñedo-ainkarim-og.jpg",
    mainEntity: {
      "@type": "ItemList",
      name: "Experiencias y Productos en Viñedo Ain Karim",
      itemListElement: [
        {
          "@type": "Product",
          name: "Cata de Vinos",
          description: "Disfruta de una cata guiada con nuestros mejores vinos.",
          url: "https://ainkarim.co/visitas",
        },
        {
          "@type": "Product",
          name: "Visita al Viñedo",
          description:
            "Un recorrido completo por el viñedo con explicaciones detalladas.",
          url: "https://ainkarim.co/visitas",
        },
        {
          "@type": "Product",
          name: "Vinos Exclusivos",
          description: "Explora nuestra selección de vinos artesanales.",
          url: "https://ainkarim.co/productos",
        },
      ],
    },
  },
};
 
const jsonLD = {
  "@context": "https://schema.org",
  "@type": "Winery",
  name: "Viñedo Ain Karim",
  url: "https://ainkarim.co",
  logo: "https://manager.ainkarim.co/uploads/logo_ain_karim_9987562b80.png",
  image: "https://ainkarim.co/images/viñedo-ainkarim-og.jpg",
  description:
    "Viñedo Ain Karim, ubicado en Villa de Leyva, ofrece catas de vino, recorridos guiados y experiencias gastronómicas en un ambiente espectacular.",
  telephone: "+57 317 431 9583",
  email: "ventas@marquesvl.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sutamarchán, Villa de Leyva",
    addressLocality: "Villa de Leyva",
    addressRegion: "Boyacá",
    postalCode: "154001",
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "5.653951",
    longitude: "-73.590102",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday"],
      opens: "10:30",
      closes: "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "10:30",
      closes: "17:30",
    },
  ],
  sameAs: [
    "https://www.facebook.com/Vinedoainkarim",
    "https://www.instagram.com/Vinedoainkarim",
    "https://www.tripadvisor.co/Attraction_Review-g676524-d5888335-Reviews-Vinedo_Ain_Karim-Villa_de_Leyva_Boyaca_Department.html",
  ],
  hasPart: [
    {
      "@type": "WebPage",
      name: "Acerca de",
      url: "https://ainkarim.co/el-vinedo",
    },
    {
      "@type": "WebPage",
      name: "Preguntas Frecuentes",
      url: "https://ainkarim.co/preguntas-frecuentes",
    },
  ],
  servesCuisine: "Vinos, Gastronomía local",
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios y Productos de Viñedo Ain Karim",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cata de Vinos",
          description:
            "Disfruta de una cata guiada con nuestros mejores vinos en un entorno natural único.",
          url: "https://ainkarim.co/visitas",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Recorrido por el Viñedo",
          description:
            "Explora nuestros viñedos con un guía experto y conoce el proceso de elaboración del vino.",
          url: "https://ainkarim.co/visitas",
        },
      },
      {
        "@type": "Product",
        name: "Vino Reserva Especial",
        description:
          "Una selección exclusiva de nuestros mejores vinos producidos en Villa de Leyva.",
        url: "https://ainkarim.co/productos",
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "321",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Carlos Rodríguez" },
      reviewBody: "Una experiencia increíble, los vinos son excelentes.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Ana Gómez" },
      reviewBody: "Hermoso lugar, buena atención y catas muy completas.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "4.5",
        bestRating: "5",
      },
    },
  ],
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Viñedo Ain Karim",
    url: "https://ainkarim.co",
    logo: "https://manager.ainkarim.co/uploads/logo_ainkarim_9987562b80.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://ainkarim.co/contacto",
      telephone: "+57 317 431 9583",
      email: "ventas@marquesvl.com",
    },
    hasPart: [
      {
        "@type": "WebPage",
        name: "Acerca de",
        url: "https://ainkarim.co/el-vinedo",
      },
      {
        "@type": "WebPage",
        name: "Preguntas Frecuentes",
        url: "https://ainkarim.co/preguntas-frecuentes",
      },
    ],
  },
};

export default function homepage() {
  return (
    <main>
      <Script
        id="json-ld-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <Popup location="home" />
      <HeroCoverHome />
      <section className="container mx-auto py-8 lg:py-16 ">
        <h2 className="text-3xl md:text-5xl font-bold text-center -text--dark-green font-serif">
          VIVE NUESTRAS EXPERIENCIAS
        </h2>
        <p className="text-xl text-center mt-5">Conoce nuestros planes</p>
        <PlansHome />
        <div className="flex justify-center">          
          <Link
            href="/visitas"
            className="-bg--dark-green rounded-md text-white px-6 py-4 text-sm md:text-lg font-medium mt-8 hover:-bg--light-green transition duration-300"
          >
            Ver todos nuestros planes
          </Link>
        </div>
      </section>
      <section className="bg-slate-100">
        <div className="container mx-auto pt-16 pb-14">
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-center -text--dark-green mb-10">
            CONOCE NUESTROS PRODUCTOS
          </h2>
          <ProductsHome />
          <div className="flex justify-center">
            <Link href="/productos" className="-bg--dark-green rounded-md text-white px-6 py-4 text-sm md:text-lg font-medium mt-8 hover:-bg--light-green transition duration-300">
              Ver todos nuestros productos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
