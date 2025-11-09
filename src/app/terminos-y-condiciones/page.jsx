import BlocksRendererWithStyles from "@/components/Ui/BlocksRendererWithStyles";
import Script from "next/script";
import HeaderImage from "@/components/Ui/HeaderImage";
import { GetPage } from "@/components/GetContentApi";

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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata() {
  const canonicalUrl = `${baseUrl}/terminos-y-condiciones`;
  let metaTitle = "Términos y Condiciones ";
  let metaDescription =
    "Lee nuestros términos y condiciones para el uso del sitio y servicios de Viñedo Ain Karim.";
  let imageUrl = `${baseUrl}/banner-puntos-de-venta.webp`;

  const pageData = await GetPage({ page: "termino-y-condicion" });
  if (pageData) {
    metaTitle = pageData.title || metaTitle;
    if (pageData.image && pageData.image.url) {
      imageUrl = `${baseUrl}${pageData.image.url}`;
    }
    const plainText = extractPlainText(pageData.content);
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

export default async function PolicyPricacyPage() {
  const pageData = await GetPage({ page: "termino-y-condicion" });

  if (!pageData) {
    console.error(pageData);
    return (
      <div className="container mx-auto py-16 px-5 text-center">
        No hemos podido cargar la información solicitada, regresa en un momento
      </div>
    );
  }

  const { title, content, image } = pageData;

  const canonicalUrl = `${baseUrl}/terminos-y-condiciones`;
  const imageUrl = image?.url
    ? `${baseUrl}${image.url}`
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
        url: `${baseUrl}/logo_ainkarim_9987562b80.png`,
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
        id="json-ld-terms"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <HeaderImage
        title={title}
        background={
          image?.url ? `${baseUrl}${image.url}` : "/banner-puntos-de-venta.webp"
        }
      />
      <section className="max-w-5xl mx-auto pt-8 pb-12 px-5">
        <BlocksRendererWithStyles content={content || ""} />
      </section>
    </main>
  );
}
