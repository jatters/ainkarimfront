import {
  GetPlansForSitemap,
  GetProductsForSitemap,
} from "@/components/GetContentApi";

export default async function sitemap() {
  const urls = [];

  const pages = [
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/` },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/advertencias-y-recomendaciones`,
    },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/aviso-de-privacidad` },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/contacto` },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/el-vinedo` },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/informacion` },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/menu` },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/politica-de-tratamiento-de-datos-personales`,
    },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/preguntas-frecuentes` },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/productos` },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/puntos-de-venta` },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/registro` },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/reglamento` },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/solicitud-reembolso` },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/terminos-y-condiciones` },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/visitas` },
  ];

  pages.forEach((page) => {
    urls.push({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    });
  });

  const plans = await GetPlansForSitemap();
  const products = await GetProductsForSitemap();

  plans.data.forEach((plan) => {
    const planDate = new Date(plan.updatedAt);
    urls.push({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/visita/${plan.slug}`,
      lastModified: planDate,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  products.data.forEach((product) => {
    const productDate = new Date(product.updatedAt);
    urls.push({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/producto/${product.slug}`,
      lastModified: productDate,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  return urls;
}
