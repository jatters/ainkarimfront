import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Script from "next/script";
import HeaderImage from "@/components/Ui/HeaderImage";

async function GetReglamentoData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/reglamento?populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Error al obtener el menú");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
}
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
  const canonicalUrl = "https://ainkarim.co/reglamento";
  let metaTitle = "Reglamento";
  let metaDescription = "Conoce las normas y reglamento del Viñedo Ain Karim.";
  let imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/banner-puntos-de-venta.webp`;

  const reglamento = await GetReglamentoData();
  if (reglamento && reglamento.data) {
    metaTitle = reglamento.data.title || metaTitle;
    if (reglamento.data.image && reglamento.data.image.url) {
      imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${reglamento.data.image.url}`;
    }
    const plainText = extractPlainText(reglamento.data.content);
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

export default async function ReglamentoPage() {
  const reglamento = await GetReglamentoData();

  if (!reglamento || !reglamento.data) {
    console.error("Error fetching menu");
    return (
      <div className="container mx-auto py-16 px-5 text-center">
        No hemos podido cargar la información solicitada, regresa en un momento
      </div>
    );
  }
  const { title, content, image } = reglamento.data;
  const canonicalUrl = "https://ainkarim.co/reglamento";
  const imageUrl = image?.url
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${image.url}`
    : "/banner-puntos-de-venta.webp";

  const plainText = extractPlainText(content);

  // JSON‑LD para estructurar el reglamento (tipo Article)
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
        url: "https://manager.ainkarim.co/uploads/logo_ainkarim_9987562b80.png",
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
        id="json-ld-reglamento"
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
        <div className="mx-auto max-w-screen-lg [&>p]:leading-7 prose [&>p]:mb-4 [&>p]:-text--dark-gray [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:-text--dark-gray [&>h3]:mb-2 [&>h3]:font-semibold [&>h3]:-text--dark-gray [&>h3]:text-xl [&>h4]:text-lg [&>h4]:-text--dark-gray [&>h4]:mb-1 [&>h4]:font-semibold [&>img]:mx-auto [&>strong]:-text--dark-gray [&>p>a]:-text--dark-green [&>p>a]:underline [&>p>a]:hover:-text--light-green [&>ul]:list-disc [&>ul]:list-inside [&>ul]:pl-5 [&>ul]:mb-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:list-inside ">
          <BlocksRenderer content={content || ""} />
        </div>
      </section>
    </main>
  );
}
