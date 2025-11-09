import PlanCard from "@/components/Ecommerce/PlanCard";
import HeaderImage from "@/components/Ui/HeaderImage";
import { GetPlans } from "@/components/GetContentApi";
import Popup from "@/components/Ui/Popup";
import Script from "next/script";

export async function generateMetadata() {
  const title = "Experiencias en Viñedo Ain Karim";
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
  if (!plansData) {
    console.error("Error fetching plans");
    return (
      <div className="container mx-auto py-16 px-5">
        Error cargando planes, intenta más tarde
      </div>
    );
  }
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Experiencias de Visitas en Viñedo Ain Karim",
    itemListElement: plansData.map((plan, index) => ({
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
        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center text-dark-green">
          VIVE ESTAS EXPERIENCIAS CON NOSOTROS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mt-10 gap-x-4 gap-y-7">
          {plansData.map((plan) => {            
            const planId = plan.documentId
            const name = plan.name
            const slug = `/visita/${plan.slug}`;
            const price = plan.price
            const planUnit = plan.unitPlan;
            const planImage = plan.image;
            const planAltImg = plan.image.alternativeText || `Imagen ${plan.name} `;    
            const onlyAdults = plan.onlyAdults;
            const allowChilds = plan.allowChilds;
            const horarios = plan.horarios;
            const rules = plan.reglas_planes;
            const additionalServices = plan.servicios_adicionales;
            const maxReservations = plan.max_reservations;    
            
            const experienciesList = plan.experiencias.map((experiencia) => ({
              id: experiencia.documentId,
              name: experiencia.name,
              alt: `Icono ${experiencia.name}`,
              iconurl: `${process.env.NEXT_PUBLIC_SITE_URL}${experiencia.icon?.url}`,
            }));
            
            

            if (!plan.isActive) return null;
            return (
              <article
                className="flex flex-col pb-9 items-center shadow-lg rounded-md hover:shadow-slate-300 group"
                key={plan.documentId}
                itemScope
                itemType="https://schema.org/Reservation"
              >
                <PlanCard
                  slug={slug}
                  name={name}
                  planId={planId}
                  price={price}
                  experiences={experienciesList}
                  unitPlan={planUnit}
                  image={planImage}
                  altimg={planAltImg}
                  onlyadults={onlyAdults}
                  allowchilds={allowChilds}
                  horarios={horarios}
                  rules={rules}
                  additionalServices={additionalServices}
                  max_reservations={maxReservations}
                />
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
