import {
  GetPlansForSitemap,
  GetProductsForSitemap,
} from "@/components/GetContentApi";

export default async function sitemap() {
  const urls = [];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const staticPages = [
    { url: `${baseUrl}/` },
    {
      url: `${baseUrl}/advertencias-y-recomendaciones`,
    },
    { url: `${baseUrl}/aviso-de-privacidad` },
    { url: `${baseUrl}/contacto` },
    { url: `${baseUrl}/el-vinedo` },
    { url: `${baseUrl}/informacion` },
    { url: `${baseUrl}/menu` },
    {
      url: `${baseUrl}/politica-de-tratamiento-de-datos-personales`,
    },
    { url: `${baseUrl}/preguntas-frecuentes` },
    { url: `${baseUrl}/productos` },
    { url: `${baseUrl}/puntos-de-venta` },
    { url: `${baseUrl}/registro` },
    { url: `${baseUrl}/reglamento` },
    { url: `${baseUrl}/solicitud-reembolso` },
    { url: `${baseUrl}/terminos-y-condiciones` },
    { url: `${baseUrl}/visitas` },
  ];

  staticPages.forEach((page) => {
    urls.push({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  const plans = await GetPlansForSitemap();
  const products = await GetProductsForSitemap();

  plans.forEach((plan) => {
    const planDate = new Date(plan.updatedAt);
    urls.push({
      url: `${baseUrl}/visita/${plan.slug}`,
      lastModified: planDate,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  products.forEach((product) => {
    const productDate = new Date(product.updatedAt);
    urls.push({
      url: `${baseUrl}/producto/${product.slug}`,
      lastModified: productDate,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  return urls;
}
