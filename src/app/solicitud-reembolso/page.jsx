import ReembolsoForm from "@/components/Forms/ReembolsoForm";
import HeaderImage from "@/components/Ui/HeaderImage";
import Script from "next/script";

// Metadatos dinámicos para la página de reembolso
export async function generateMetadata() {
  const title = "Solicitud de Reembolso | Viñedo Ain Karim";
  const description =
    "Completa el formulario para solicitar la devolución de tu dinero. El proceso de reembolso tarda hasta 15 días.";
  const canonicalUrl = "https://ainkarim.co/solicitud-reembolso";
  const imageUrl = "https://ainkarim.co/banner-reembolso.webp"; // Asegúrate de que esta imagen exista

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
          alt: title,
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

export default function ReembolsoPage() {
  const canonicalUrl = "https://ainkarim.co/reembolso";
  // JSON‑LD para estructurar la página (tipo WebPage) e incluir breadcrumbs
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Solicitud de Reembolso | Viñedo Ain Karim",
    url: canonicalUrl,
    description:
      "Completa el formulario para solicitar la devolución de tu dinero. El proceso de reembolso tarda hasta 15 días.",
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
          name: "Solicitud de Reembolso",
          item: canonicalUrl,
        },
      ],
    },
  };
  return (
    <main>
      {/* Inyección de JSON‑LD para SEO */}
      <Script
        id="json-ld-reembolso"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <HeaderImage
        title="Solicitud de Reembolso"
        background="/banner-contacto.webp"
      />
      <section className="container mx-auto pt-10 pb-16 px-5">
        <p className="max-w-screen-md mx-auto mb-10 text-center">
          Diligencia el siguiente formulario para realizar la solicitu del
          tramite de tu dinero, es importante tener en cuenta que el tiempo
          estimado para realizar la devolución de tu dinero es de 15 días:
        </p>
        <p className="max-w-screen-md mx-auto mb-10 text-center">
          <strong>
            El dinero será devuelto al pagador de la reserva directamente.
          </strong>
        </p>
        <ReembolsoForm />
      </section>
    </main>
  );
}
