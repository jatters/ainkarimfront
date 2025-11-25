import Link from "next/link";
import PlanGallery from "@/components/Ecommerce/PlanGallery";
import ReservationField from "@/components/Ecommerce/Plans/ReservationField";
import { GetSinglePlan, GetCompanyInfo } from "@/components/GetContentApi";
import PlanRecomendations from "@/components/Ecommerce/Plans/PlanRecomendations";
import BlocksRendererWithStyles from "@/components/Ui/BlocksRendererWithStyles";
import Script from "next/script";
import Image from "next/image";

const formatPrice = (price) => {
  if (!price) return "";
  return `$${Number(price).toLocaleString("es-CO")}`;
};

const extractGallery = (images) => {
  return (
    images?.map((image, index) => ({
      sourceUrl: `${process.env.NEXT_PUBLIC_SITE_URL}${image.url}`,
      altText: image.alternativeText || `Imagen plan ${index + 1}`,
    })) || []
  );
};
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const plan = await GetSinglePlan(slug);

  if (!plan) {
    return {
      title: "Plan no encontrado | Viñedo Ain Karim",
      description: "Información del plan no encontrada.",
    };
  }

  const { name: title, gallery, SEODescription } = plan;

  const canonicalUrl = `https://ainkarim.co/visita/${slug}`;
  const imageUrl = gallery?.[0]
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${gallery[0].url}`
    : "https://manager.ainkarim.co/uploads/pedidos_7d60bc71fd.jpg";

  return {
    title,
    description: SEODescription || "Plan de visita en Viñedo Ain Karim",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: SEODescription || "Plan de visita en Viñedo Ain Karim",
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Viñedo Ain Karim`,
      description: SEODescription || "Plan de visita en Viñedo Ain Karim",
      images: [imageUrl],
    },
  };
}

export default async function SinglePlanPage({ params }) {
  const { slug } = await params;

  try {
    const companyInfo = await GetCompanyInfo();
    const plan = await GetSinglePlan(slug);
    if (!plan) {
      console.error("Error fetching plan data");
      return (
        <div className="container mx-auto py-16 px-5">
          Error cargando información del plan
        </div>
      );
    }
    if (!companyInfo) {
      console.error("Error fetching company info");
      return (
        <div className="container mx-auto py-16 px-5">
          Error cargando información del Viñedo Ain Karim
        </div>
      );
    }

    const {
      documentId,
      name: title,
      gallery,
      price,
      max_reservations,
      image,
      onlyAdults,
      allowChilds,
      horarios,
      servicios_adicionales,
      reglas_planes,
      unitPlan,
      planDescription,
      SEODescription,
    } = plan;

    const { contactEmail, ventasEmail } = companyInfo;

    const canonicalUrl = `https://ainkarim.co/visita/${slug}`;

    const jsonLD = {
      "@context": "https://schema.org",
      "@type": "product",
      name: title,
      description: SEODescription || "Plan de visita en Viñedo Ain Karim",
      image: gallery?.[0]
        ? `${process.env.NEXT_PUBLIC_SITE_URL}${gallery[0].url}`
        : "https://manager.ainkarim.co/uploads/pedidos_7d60bc71fd.jpg",
      brand: {
        "@type": "Organization",
        name: "Viñedo Ain Karim",
      },
      offers: {
        "@type": "Offer",
        url: canonicalUrl,
        priceCurrency: "COP",
        price: price,
        availability:
          Number(price) > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    };

    return (
      <main>
        <Script
          id="json-ld-plan"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
        />
        <section className="container mx-auto py-5 md:py-8 lg:pt-10 lg:pb-16 px-2 sm:px-5">
          <div className="text-sm flex gap-2">
            <Link href="/" className="hover:text-light-green">
              Inicio
            </Link>{" "}
            ›{" "}
            <Link href="/visitas" className="hover:text-light-green">
              Visitas
            </Link>{" "}
            › <span className="capitalize font-medium">{title}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-x-5 gap-y-9">
            <PlanGallery images={extractGallery(gallery)} />

            <div className="px-0 md:px-5">
              <h1 className="text-dark-green px-2.5 md:px-5 text-2xl lg:text-4xl xl:text-5xl font-bold mb-3 uppercase">
                {title}
              </h1>
              {Number(price) > 0 && (
                <div className="text-2xl font-semibold">
                  {formatPrice(price)}{" "}
                  <sup className="font-normal text-base">
                    por {unitPlan.toLowerCase()}
                  </sup>
                </div>
              )}
              {onlyAdults && (
                <div className="flex text-slate-600 gap-x-1 mt-4">
                  <span className="icon-[uil--18-plus] text-2xl"></span>
                  <span>Solo para mayores de edad.</span>
                </div>
              )}
              {allowChilds && (
                <div className="flex text-slate-600 gap-x-1 mt-4">
                  <span className="icon-[material-symbols--child-care-outline] text-2xl"></span>
                  <span>Ingreso de menores de edad permitido sin costo.</span>
                </div>
              )}
              {Number(max_reservations) > 0 && (
                <div className="flex items-center gap-1 py-3 text-slate-600">
                  <span className="icon-[fluent--people-add-20-regular] text-3xl" />
                  Máximo {max_reservations} {unitPlan.toLowerCase()}s por
                  reserva.
                </div>
              )}
              {planDescription && (
                <BlocksRendererWithStyles content={planDescription} className="px-2.5 lg:px-5" />
              )}

              <ReservationField
                documentId={documentId}
                name={title}
                image={image}
                price={price}
                horarios={horarios}
                additionalServices={servicios_adicionales}
                rules={reglas_planes}
                max_reservations={max_reservations}
                unitPlan={unitPlan}
                contactEmail={contactEmail}
              />

              <PlanRecomendations
                max_reservations={max_reservations}
                unitPlan={unitPlan}
                contactEmail={contactEmail}
                ventasEmail={ventasEmail}
              />
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Error cargando el plan", error);
  }
  return (
    <div className="container mx-auto py-16 px-5 ">
      Ha ocurrido un error cargando el plan
    </div>
  );
}
