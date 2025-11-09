import HeaderImage from "@/components/Ui/HeaderImage";
import BlocksRendererWithStyles from "@/components/Ui/BlocksRendererWithStyles";
import Script from "next/script";
import { GetPage } from "@/components/GetContentApi";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata() {
  const canonicalUrl = `${baseUrl}/puntos-de-venta`;
  let metaTitle = "Puntos de Venta ";
  let metaDescription =
    "Encuentra los puntos de venta y almacenes donde adquirir los productos del Viñedo Ain Karim.";
  let imageUrl = `${baseUrl}/banner-puntos-de-venta.webp`;

  const pageData = await GetPage({ page: "puntos-de-venta" });
  if (pageData) {
    metaTitle = pageData.title || metaTitle;
    if (pageData.image && pageData.image.url) {
      imageUrl = `${baseUrl}${pageData.image.url}`;
    }
    if (pageData.content) {
      const plainText =
        typeof pageData.content === "string" ? pageData.content : "";
      if (plainText) {
        metaDescription = plainText
          .substring(0, 150)
          .replace(/<\/?[^>]+(>|$)/g, "");
      }
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
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function PuntosDeVentaPage() {
  const pageData = await GetPage({ page: "puntos-de-venta" });

  if (!pageData) {
    console.error("Error al obtener la página de puntos de venta");
    return (
      <div className="container mx-auto py-16 px-5 text-center">
        No hemos podido cargar la información solicitada, regresa en un momento
      </div>
    );
  }
  const { title, content, store, image } = pageData;
  const canonicalUrl = `${baseUrl}/puntos-de-venta`;
  const imageUrl = image?.url
    ? `${baseUrl}${image.url}`
    : "/banner-puntos-de-venta.webp";

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Puntos de Venta - Viñedo Ain Karim",
    url: canonicalUrl,
    itemListElement: store.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "LocalBusiness",
        name: item.name,
        address: item.address,
        areaServed: item.city,
      },
    })),
  };

  return (
    <main>
      <Script
        id="json-ld-puntos-venta"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <HeaderImage title={title} background={imageUrl} />
      <section className="max-w-5xl mx-auto pt-8 pb-12 px-5">
        {content && <BlocksRendererWithStyles content={content} />}

        <div className="overflow-x-auto mt-5">
          <table className="mx-auto max-w-5xl border-collapse">
            <thead className="bg-dark-green text-white rounded-lg uppercase">
              <tr>
                <th className="py-2 border-b font-montserrat text-base">
                  Almacén
                </th>
                <th className="py-2 border-b font-montserrat text-base">
                  Dirección
                </th>
                <th className="py-2 border-b font-montserrat text-base">
                  Ciudad
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {store.map((item, index) => (
                <tr key={index} className="my-5 hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {item.address}
                  </td>
                  <td className="py-2 px-4 border-b whitespace-nowrap text-center">
                    {item.city}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
