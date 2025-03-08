import { Link } from "next-view-transitions";
import PlanGallery from "@/components/Ecommerce/PlanGallery";
import ReactMarkdown from "react-markdown";
import ReservationField from "@/components/Ecommerce/Plans/ReservationField";
import { GetSinglePlan } from "@/components/GetContentApi";
import PlanRecomendations from "@/components/Ecommerce/Plans/PlanRecomendations";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Script from "next/script";

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
  const planData = await GetSinglePlan(params.slug);
  if (!planData || !planData.data[0]) {
    return {
      title: "Plan no encontrado | Viñedo Ain Karim",
      description: "Información del plan no encontrada.",
    };
  }
  const plan = planData.data[0];
  const title = plan.name;
  const description =
    plan.description || plan.planDescription || "Plan de visita en Viñedo Ain Karim";
  const canonicalUrl = `https://ainkarim.co/visita/${params.slug}`;
  const imageUrl = plan.image
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${plan.image.url}`
    : "https://ainkarim.co/default-image.jpg";

  return {
    title: `${title} | Visita en Viñedo Ain Karim`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | Visita en Viñedo Ain Karim`,
      description,
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
      description,
      images: [imageUrl],
    },
  };
}


export default async function SinglePlanPage({ params }) {
  try {
    const planData = await GetSinglePlan(params.slug);
    if (!planData || !planData.data[0]) {
      console.error("Error fetching plan data");
      return (
        <div className="container mx-auto py-16 px-5">
          Error cargando información del plan
        </div>
      );
    }
    const {
      documentId,
      name,
      gallery,
      price,
      description,
      max_reservations,
      image,
      onlyAdults,
      allowChilds,
      horarios,
      servicios_adicionales,
      reglas_planes,
      unitPlan,
      planDescription,
    } = planData?.data[0];

    const canonicalUrl = `https://ainkarim.co/visita/${params.slug}`;
    // Construcción del JSON‑LD para el plan
    const jsonLD = {
      "@context": "https://schema.org",
      "@type": "product",
      name: name,
      description:
        planDescription ||
        (description ? description.replace(/<\/?[^>]+(>|$)/g, "") : ""),
      image: image ? `${process.env.NEXT_PUBLIC_SITE_URL}${image.url}` : "",
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
        <section className="container mx-auto py-8 lg:py-16 px-2 sm:px-5">
          <div className="text-sm lg:text-base">
            <Link href="/" className="hover:-text--light-green">
              Inicio
            </Link>{" "}
            /{" "}
            <Link href="/visitas" className="hover:-text--light-green">
              Visitas
            </Link>{" "}
            / <span className="capitalize">{name}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-x-3 gap-y-9">
            <div className="max-w-3xl">
              <PlanGallery images={extractGallery(gallery)} />
            </div>
            <div className="px-0 md:px-5">
              <h1 className="-text--dark-green text-2xl lg:text-5xl font-bold mb-3 uppercase">
                {name}
              </h1>

              {Number(price) > 0 && (
                <div className="text-2xl font-semibold">
                  {formatPrice(price)}{" "}
                  <sup className="font-normal text-base">por {unitPlan.toLowerCase()}</sup>{" "}
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
                  Máximo {max_reservations} {unitPlan.toLowerCase()}s por reserva.
                </div>
              )}
              {planDescription && (
                <div className="[&>p]:leading-7 prose [&>p]:mb-4 [&>p]:-text--dark-gray [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:-text--dark-gray [&>h3]:mb-2 [&>h3]:font-semibold [&>h3]:-text--dark-gray [&>h3]:text-xl [&>h4]:text-lg [&>h4]:-text--dark-gray [&>h4]:mb-1 [&>h4]:font-semibold [&>img]:mx-auto [&>strong]:-text--dark-gray [&>p>a]:-text--dark-green [&>p>a]:underline [&>p>a]:hover:-text--light-green [&>ul]:list-disc [&>ul]:list-inside [&>ul]:pl-5 [&>ul]:mb-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:list-inside ">
                  <BlocksRenderer content={planDescription} />
                </div>
              )}              
              <ReservationField
                horarios={horarios}
                additionalServices={servicios_adicionales}
                price={price}
                name={name}
                image={image}
                documentId={documentId}
                rules={reglas_planes}
                max_reservations={max_reservations}
                unitPlan={unitPlan}
              />

              <PlanRecomendations max_reservations={max_reservations} unitPlan={unitPlan} />
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error cargando el plan", error);
    }
    return (
      <div className="container mx-auto py-16 px-5 ">
        Ha ocurrido un error cargando el plan
      </div>
    );
  }
}
