import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Script from "next/script";
import HeaderImage from "@/components/Ui/HeaderImage";
import { getStrapiData } from "@/lib/strapi";

const extractPlainText = (content) => {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((item) => (typeof item === "string" ? item : item.text || ""))
      .join(" ");
  }
  return "";
};

export async function generateMetadata() {
  const canonicalUrl = "https://ainkarim.co/aviso-de-privacidad";
  let metaTitle = "Aviso de Privacidad | Viñedo Ain Karim";
  let metaDescription =
    "Consulta nuestro aviso de privacidad y conoce cómo protegemos tus datos personales.";
  let imageUrl = "https://ainkarim.co/banner-puntos-de-venta.webp";

  const avisoPrivacidad = await getStrapiData("aviso-de-privacidad");
  if (avisoPrivacidad) {
    metaTitle = avisoPrivacidad.title || metaTitle;
    if (avisoPrivacidad.image && avisoPrivacidad.image.url) {
      imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${avisoPrivacidad.image.url}`;
    }
    const plainText = extractPlainText(avisoPrivacidad.content);
    if (plainText) {
      metaDescription = plainText
        .substring(0, 150)
        .replace(/<\/?[^>]+(>|$)/g, "");
    }
  }

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function AvisoPrivacidadPage() {
  const avisoPrivacidad = await getStrapiData("aviso-de-privacidad");

  if (!avisoPrivacidad) {
    console.error("Error fetching menu");
    return (
      <div className="container mx-auto py-16 px-5 text-center">
        No hemos podido cargar la información solicitada, regresa en un momento
      </div>
    );
  }

  const { title, content, image } = avisoPrivacidad;
  const canonicalUrl = "https://ainkarim.co/aviso-de-privacidad";
  const imageUrl = image?.url
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${image.url}`
    : "/banner-puntos-de-venta.webp";
  const plainText = extractPlainText(content);

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: plainText.substring(0, 150).replace(/<\/?[^>]+(>|$)/g, ""),
    image: imageUrl,
    author: {
      "@type": "Organization",
      name: "Viñedo Ain Karim",
    },
    publisher: {
      "@type": "Organization",
      name: "Viñedo Ain Karim",
      logo: {
        "@type": "ImageObject",
        url: "https://ainkarim.co/uploads/logo_ainkarim_9987562b80.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <main>
      <Script
        id="json-ld-privacy"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <HeaderImage
        title={title}
        background={
          image?.url
            ? `${process.env.NEXT_PUBLIC_SITE_URL}${image.url}`
            : "/banner-puntos-de-venta.webp"
        }
      />
      <section className="max-w-screen-lg mx-auto pt-8 pb-12 px-5">
        <div className="mx-auto max-w-screen-lg  prose-base [&>p]:mb-4 [&>p]:text-gray-700 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:-text--dark-gray [&>h3]:mb-2 [&>h3]:font-semibold [&>h3]:-text--dark-gray [&>h3]:text-xl [&>h4]:text-lg [&>h4]:-text--dark-gray [&>h4]:mb-1 [&>h4]:font-semibold [&>img]:mx-auto [&>strong]:-text--dark-gray [&>p>a]:-text--dark-green [&>p>a]:underline [&>p>a]:hover:-text--light-green [&>ul]:list-disc [&>ul]:list-inside [&>ul]:pl-5 [&>ul]:mb-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:list-inside ">
          <BlocksRenderer content={content || ""} />
        </div>
      </section>
    </main>
  );
}
