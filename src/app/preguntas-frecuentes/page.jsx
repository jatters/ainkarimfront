import React from "react";
import HeaderImage from "@/components/Ui/HeaderImage";
import { GetFaqs } from "@/components/GetContentApi";
import FAQ from "@/components/Ui/FAQ";
import Script from "next/script";

export async function generateMetadata() {
  const title = "Preguntas Frecuentes";
  const description =
    "Encuentra respuestas a las preguntas más comunes sobre Viñedo Ain Karim, nuestros servicios y experiencias.";
  const canonicalUrl = "https://ainkarim.co/preguntas-frecuentes";
  const imageUrl = "https://ainkarim.co/banner-contacto.webp";

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
function richTextToPlainText(richText) {
  if (!Array.isArray(richText)) return '';

  return richText
    .map((block) => {
      if (!block.children || !Array.isArray(block.children)) return '';
      return block.children.map((child) => child.text || '').join('');
    })
    .join('\n'); // agrega salto de línea entre párrafos
}


export default async function FaqPage() {
  const faqs = await GetFaqs();
  if (!faqs) {
    console.error("Error fetching FAQS");
    return <>Error cargando preguntas frecuentes</>;
  }
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: richTextToPlainText(faq.asnwer),
      },
    })),
  };

  return (
    <main>
      <Script
        id="json-ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <HeaderImage
        title="Preguntas Frecuentes"
        background="/banner-contacto.webp"
      />
      <section className="container mx-auto pt-8 pb-12 px-5">
        <FAQ />
      </section>
    </main>
  );
}
