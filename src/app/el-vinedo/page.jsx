import HeaderImage from "@/components/Ui/HeaderImage";
import Timeline from "@/components/Ui/Timeline";
import Viticultura from "@/components/Ui/Viticultura";
import Filantropia from "@/components/Ui/Filantropia";
import SliderReconocimientos from "@/components/SliderReconocimientos";
import { GetAboutUs } from "@/components/GetContentApi";
import Script from "next/script";

export async function generateMetadata() {
  const data = await GetAboutUs();
  // Si no se encuentra información, se usan valores por defecto
  if (!data || !data.data) {
    return {
      title: "Nosotros ",
      description:
        "Conoce la historia, proyectos y compromiso social de Viñedo Ain Karim.",
    };
  }
  const { title, cover } = data.data;
  const metaTitle = `${title} `;
  const description =
    "Conoce la historia de Viñedo Ain Karim, nuestros proyectos en viticultura, y nuestro compromiso filantrópico.";
  const canonicalUrl = "https://ainkarim.co/nosotros";
  const imageUrl = cover
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${cover.url}`
    : "https://ainkarim.co/default-cover.jpg";

  return {
    title: metaTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [imageUrl],
    },
  };
}

export default async function vinedoPage() {
  const data = await GetAboutUs();
  if (!data || !data.data) {
    console.error("Error fetching about us info page");
    return <div>Error cargando la información</div>;
  }

  const { title, timeline, viticultura, filantropia, slider, cover } =
    data.data;

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: "https://ainkarim.co/nosotros",
    name: title,
    description:
      "Conoce la historia de Viñedo Ain Karim, nuestros proyectos en viticultura y nuestro compromiso filantrópico.",
    mainEntity: {
      "@type": "Organization",
      name: "Viñedo Ain Karim",
      url: "https://ainkarim.co",
      logo: "https://manager.ainkarim.co/uploads/logo_ainkarim_9987562b80.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+57 317 431 9583",
        contactType: "customer service",
        email: "ventas@marquesvl.com",
      },
    },
  };
  return (
    <main>
      <Script
        id="json-ld-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <HeaderImage
        title={title}
        background={`${process.env.NEXT_PUBLIC_SITE_URL}${cover.url}`}
      />
      <section className="container mx-auto py-16 px-5 lg:px-10">
        <h2 className="text-2xl lg:text-4xl -text--dark-green text-center mb-14 uppercase">
          {"Nuestra Historia"}
        </h2>
        {timeline && <Timeline timeline={timeline} />}
      </section>

      {viticultura && <Viticultura viticultura={viticultura} />}

      {filantropia && <Filantropia filantropia={filantropia} />}

      {slider && <SliderReconocimientos reconocimientos={slider} />}
    </main>
  );
}
