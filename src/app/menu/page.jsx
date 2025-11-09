import React from "react";
import SliderMenu from "@/components/Ui/SliderMenu";
import Script from "next/script";
import HeaderImage from "@/components/Ui/HeaderImage";
import { GetPage } from "@/components/GetContentApi";
import BlocksRendererWithStyles from "@/components/Ui/BlocksRendererWithStyles";

export const metadata = {
  title: "Carta | Viñedo Ain Karim",
  description:
    "Explora nuestro menú de temporada con platillos únicos y deliciosas opciones gastronómicas en el Viñedo Ain Karim. Descubre sabores auténticos y experiencias culinarias memorables.",
  openGraph: {
    title: "Carta | Viñedo Ain Karim",
    description:
      "Explora nuestro menú de temporada con platillos únicos y deliciosas opciones gastronómicas en el Viñedo Ain Karim.",
    type: "website",
    locale: "es_CO",
    siteName: "Viñedo Ain Karim",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-menu.jpg`,
        width: 1200,
        height: 630,
        alt: "Menú del Viñedo Ain Karim",
      },
    ],
  },
  alternates: {
    canonical: "https://ainkarim.co/menu",
  },
  keywords:
    "menú, restaurante, viñedo, gastronomía, Ain Karim, comida, vinos, experiencia culinaria",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function MenuPage() {
  const data = await GetPage({ page: "menu" });

  const { title, content, images, cover } = data;

  if (!data) {
    console.error("Error fetching menu");
    return (
      <div className="container mx-auto py-16 px-5 text-center">
        No hemos podido cargar la información solicitada, regresa en un momento
      </div>
    );
  }

  const firstImageUrl =
    images && images.length > 0 && images[0].url
      ? `${process.env.NEXT_PUBLIC_SITE_URL}${images[0].url}`
      : "";

  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Viñedo Ain Karim",
    image: firstImageUrl,
    "@id": "https://ainkarim.co",
    url: "https://ainkarim.co/menu",
    telephone: "+573174319583",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Km 10 Vía Villa de Leyva - Santa Sofía",
      addressLocality: "Villa de Leyva",
      addressRegion: "Boyacá",
      postalCode: "154001",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 5.6539457,
      longitude: -73.6699294,
    },
    servesCuisine: "Cocina Colombiana",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday",
          "Sunday",
          "Monday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "10:00",
        closes: "17:00",
      },
    ],
  };

  return (
    <>
      <Script
        id="menu-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />
      <main>
        <HeaderImage
          title={title}
          background={
            cover?.url
              ? `${process.env.NEXT_PUBLIC_SITE_URL}${cover.url}`
              : "/banner-puntos-de-venta.webp"
          }
        />
        <section className="max-w-5xl mx-auto pt-8 pb-12 px-5">
          <BlocksRendererWithStyles content={content} />
          <div className="max-w-5xl mx-auto my-5">
            <SliderMenu images={images} />
          </div>
        </section>
      </main>
    </>
  );
}
