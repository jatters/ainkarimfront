import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HeaderImage from "@/components/Ui/HeaderImage";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Script from "next/script";
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
  const canonicalUrl = `${baseUrl}/politica-de-tratamiento-de-datos-personales`;
  let metaTitle = "Política de Tratamientos de Datos Personales";
  let metaDescription =
    "Conoce cómo tratamos y protegemos tus datos personales en Viñedo Ain Karim.";
  let imageUrl = `${baseUrl}/banner-puntos-de-venta.webp`;

  const pageData = await GetPage({ page: "politica-dato-personal" });
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

export default async function PersonalInformationPage() {
  const pageData = await GetPage({ page: "politica-dato-personal" });
  if (!pageData) {
    console.error(pageData);
    return (
      <div className="container mx-auto py-16 px-5 text-center">
        No hemos podido cargar la información solicitada, regresa en un momento
      </div>
    );
  }
  const { title, content, image, politica } = pageData;
  const canonicalUrl = `${baseUrl}/politica-de-tratamiento-de-datos-personales`;
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
        id="json-ld-personal-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <HeaderImage
        title={title}
        background={
          image?.url ? `${baseUrl}${image.url}` : "/banner-puntos-de-venta.webp"
        }
      />
      <section className="max-w-screen-lg mx-auto pt-8 pb-12 px-5 prose">
        {content && (
          <div className="mx-auto max-w-screen-lg [&>p]:leading-7 prose [&>p]:mb-4 [&>p]:-text--dark-gray [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:-text--dark-gray [&>h3]:mb-2 [&>h3]:font-semibold [&>h3]:-text--dark-gray [&>h3]:text-xl [&>h4]:text-lg [&>h4]:-text--dark-gray [&>h4]:mb-1 [&>h4]:font-semibold [&>img]:mx-auto [&>strong]:-text--dark-gray [&>p>a]:-text--dark-green [&>p>a]:underline [&>p>a]:hover:-text--light-green [&>ul]:list-disc [&>ul]:list-inside [&>ul]:pl-5 [&>ul]:mb-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:list-inside ">
            <BlocksRenderer content={content} />
          </div>
        )}

        {politica.map((politica) => (
          <Accordion key={politica.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <span className="font-bold">{politica.title}</span>
            </AccordionSummary>
            <AccordionDetails className="space-y-3">
              <BlocksRenderer content={politica.content || ""} />
            </AccordionDetails>
          </Accordion>
        ))}
      </section>
    </main>
  );
}
