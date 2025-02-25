import HeaderImage from "@/components/Ui/HeaderImage";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Script from "next/script";

async function GetDataPage() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/puntos-de-venta?populate=*`,
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
export async function generateMetadata() {
  const canonicalUrl = "https://ainkarim.co/puntos-de-venta";
  let metaTitle = "Puntos de Venta ";
  let metaDescription =
    "Encuentra los puntos de venta y almacenes donde adquirir los productos del Viñedo Ain Karim.";
  let imageUrl = "https://ainkarim.co/banner-puntos-de-venta.webp";

  const pageData = await GetDataPage();
  if (pageData && pageData.data) {
    metaTitle = pageData.data.title || metaTitle;
    if (pageData.data.image && pageData.data.image.url) {
      imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${pageData.data.image.url}`;
    }
    if (pageData.data.content) {
      // Extrae un fragmento de texto plano para la descripción
      const plainText =
        typeof pageData.data.content === "string"
          ? pageData.data.content
          : "";
      if (plainText) {
        metaDescription = plainText.substring(0, 150).replace(/<\/?[^>]+(>|$)/g, "");
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
  const pageData = await GetDataPage();

  if (!pageData || !pageData.data) {
    console.error("Error al obtener la página de puntos de venta");
    return (
      <div className="container mx-auto py-16 px-5 text-center">
        No hemos podido cargar la información solicitada, regresa en un momento
      </div>
    );
  }
  const { title, content, store, image } = pageData.data;
  const canonicalUrl = "https://ainkarim.co/puntos-de-venta";
  const imageUrl = image?.url
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${image.url}`
    : "/banner-puntos-de-venta.webp";

  // JSON‑LD para listar los puntos de venta (ItemList)
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
      <HeaderImage
        title={title}
        background={
          image?.url
            ? `${process.env.NEXT_PUBLIC_SITE_URL}${image.url}`
            : "/banner-puntos-de-venta.webp"
        }
      />
      <section className="container mx-auto pt-8 pb-12 px-5">
        {content && (
          <div className="mx-auto max-w-screen-lg [&>p]:leading-7 prose [&>p]:mb-4 [&>p]:-text--dark-gray [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:-text--dark-gray [&>h3]:mb-2 [&>h3]:font-semibold [&>h3]:-text--dark-gray [&>h3]:text-xl [&>h4]:text-lg [&>h4]:-text--dark-gray [&>h4]:mb-1 [&>h4]:font-semibold [&>img]:mx-auto [&>strong]:-text--dark-gray [&>p>a]:-text--dark-green [&>p>a]:underline [&>p>a]:hover:-text--light-green [&>ul]:list-disc [&>ul]:list-inside [&>ul]:pl-5 [&>ul]:mb-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:list-inside ">
            <BlocksRenderer content={content} />
          </div>
        )}

        <div className="overflow-x-auto mt-5">
          <table className="mx-auto max-w-screen-lg border-collapse">
            <thead className="-bg--dark-green text-white rounded-lg uppercase">
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
