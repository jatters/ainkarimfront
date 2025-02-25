import PlanCard from "@/components/Ecommerce/PlanCard";
import HeaderImage from "@/components/Ui/HeaderImage";
import { GetPlans } from "@/components/GetContentApi";
import Popup from "@/components/Ui/Popup";
import Script from "next/script";

export async function generateMetadata() {
  const title = "Visitas | Experiencias en Viñedo Ain Karim";
  const description =
    "Descubre y reserva experiencias únicas en Viñedo Ain Karim. Vive visitas, recorridos y momentos inolvidables en nuestro enoturismo en Villa de Leyva.";
  const canonicalUrl = "https://ainkarim.co/visitas";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: "https://ainkarim.co/banner-visitas.webp",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://ainkarim.co/banner-visitas.webp"],
    },
  };
}

export default async function VisitasPage() {
  const plansData = await GetPlans();
  if (!plansData || !plansData.data) {
    console.error("Error fetching plans data");
    return (
      <div className="container mx-auto py-16 px-5">Error cargando planes</div>
    );
  }
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Experiencias de Visitas en Viñedo Ain Karim",
    itemListElement: plansData.data.map((plan, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://ainkarim.co/visita/${plan.slug}`,
      name: plan.name,
      image: plan.image
        ? `${process.env.NEXT_PUBLIC_SITE_URL}${plan.image.url}`
        : "",
      offers: {
        "@type": "Offer",
        priceCurrency: "COP",
        price: plan.price,
        availability: "https://schema.org/InStock",
      },
    })),
  };

  return (
    <main>
       <Script
        id="json-ld-plans"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <Popup location="plans" />
      <HeaderImage title="Visitas" background="/banner-visitas.webp" />
      <section className="container mx-auto py-8 lg:py-16 px-5">
        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center -text--dark-green">
          VIVE ESTAS EXPERIENCIAS CON NOSOTROS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mt-10 gap-x-4 gap-y-7">
          {plansData.data.map((plan) => {
            const experienciesList = plan.experiencias.map((experiencia) => ({
              id: experiencia.documentId,
              name: experiencia.name,
              alt: `Icono ${experiencia.name}`,
              iconurl: `${process.env.NEXT_PUBLIC_SITE_URL}${experiencia.icon?.url}`,
            }));

            return (
              <PlanCard
                key={plan.documentId}
                slug={`/visita/${plan.slug}`}
                name={plan.name}
                documentId={plan.documentId}
                price={plan.price}
                experiences={experienciesList}
                image={`${process.env.NEXT_PUBLIC_SITE_URL}${
                  plan.image?.formats.small.url || plan.image.url
                }`}
                altimg={
                  plan.image.alternativeText || `Imagen ${plan.name} `
                }
                onlyadults={plan.onlyAdults}
                allowchilds={plan.allowChilds}
                horarios={plan.horarios}
                rules={plan.reglas_planes}
                additionalServices={plan.servicios_adicionales}
                max_reservations={plan.max_reservations}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
