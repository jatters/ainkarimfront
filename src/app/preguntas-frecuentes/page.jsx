import React from "react";
import HeaderImage from "@/components/Ui/HeaderImage";
import { GetFaqs } from "@/components/GetContentApi";
import FAQ from "@/components/Ui/FAQ";

export default async function FaqPage() {
  const faqs = await GetFaqs();
  if (!faqs || !faqs.data) {
    console.error("Error fetching FAQS");
    return <>Error cargando preguntas frecuentes</>;
  }

  return (
    <main>
      <HeaderImage
        title="Preguntas Frecuentes"
        background="/banner-contacto.webp"
      />
      <section className="container mx-auto pt-8 pb-12 px-5">
        <FAQ faqs={faqs} />
      </section>
    </main>
  );
}
