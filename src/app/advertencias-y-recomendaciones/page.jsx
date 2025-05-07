import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Script from "next/script";
import HeaderImage from "@/components/Ui/HeaderImage";
import { GetPage } from "@/components/GetContentApi";

export async function generateMetadata() {
  const canonicalUrl = "https://ainkarim.co/advertencias-y-recomendaciones";
  const metaDescription =
    "Consulta las advertencias y recomendaciones importantes para tu visita a Viñedo Ain Karim.";
  let title = "Advertencias y Recomendaciones";
  let imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/banner-puntos-de-venta.webp`;

  const pageData = await GetPage({ page: "advertencia-y-recomendacion" });
  if (pageData) {
    title = pageData.title || title;
    if (pageData.image && pageData.image.url) {
      imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${pageData.image.url}`;
    }
  }

  return {
    title: `${title}`,
    description: metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${title}`,
      description: metaDescription,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Viñedo Ain Karim`,
      description: metaDescription,
      images: [imageUrl],
    },
  };
}

const extractPlainText = (blocks) => {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;
  if (Array.isArray(blocks)) {
    return blocks
      .map((block) => {
        if (typeof block === "string") return block;
        return block.text || block.content || block.body || "";
      })
      .join(" ");
  }
  return "";
};

export default async function AdvertenciasPage() {
  const pageData = await GetPage({ page: "advertencia-y-recomendacion" });

  if (!pageData) {
    console.error("Error al obtener la página de advertencias");
    return (
      <div className="container mx-auto py-16 px-5 text-center">
        No hemos podido cargar la información solicitada, regresa en un momento
      </div>
    );
  }
  const { title, content, image } = pageData;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const canonicalUrl = "https://ainkarim.co/advertencias-y-recomendacion";
  const imageUrl = image?.url
    ? `${baseUrl}${image.url}`
    : `${baseUrl}/banner-puntos-de-venta.webp`;

  const plainText = extractPlainText(content);
  const metaDescription = plainText
    .substring(0, 150)
    .replace(/<\/?[^>]+(>|$)/g, "");

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: content
      ? extractPlainText(content)
          .substring(0, 150)
          .replace(/<\/?[^>]+(>|$)/g, "")
      : "",
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
        id="json-ld-advertencias"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <HeaderImage
        title={title}
        background={
          image?.url ? `${baseUrl}${image.url}` : "/banner-puntos-de-venta.webp"
        }
      />
      <section className="max-w-screen-lg mx-auto pt-8 pb-12 px-5">
        <div className="mx-auto max-w-screen-lg [&>p]:leading-7 prose [&>p]:mb-4 [&>p]:-text--dark-gray [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:-text--dark-gray [&>h3]:mb-2 [&>h3]:font-semibold [&>h3]:-text--dark-gray [&>h3]:text-xl [&>h4]:text-lg [&>h4]:-text--dark-gray [&>h4]:mb-1 [&>h4]:font-semibold [&>img]:mx-auto [&>strong]:-text--dark-gray [&>p>a]:-text--dark-green [&>p>a]:underline [&>p>a]:hover:-text--light-green [&>ul]:list-disc [&>ul]:list-inside [&>ul]:pl-5 [&>ul]:mb-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:list-inside ">
          <BlocksRenderer content={content || ""} />
        </div>
      </section>
    </main>
  );
}
