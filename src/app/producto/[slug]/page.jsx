// Archivo: src/app/producto/[slug]/page.jsx (componente de servidor)
import SingleProductPageClient from "@/components/Ecommerce/SingleProduct/SingleProductPageClient";
import { GetSingleProduct } from "@/components/GetContentApi";


export async function generateMetadata({ params }) {
  const productData = await GetSingleProduct(params.slug);
  const product = productData?.data?.[0];

  if (!product) {
    return {
      title: "Producto no encontrado | Viñedo Ain Karim",
      description: "Producto no encontrado.",
    };
  }

  const title = product.title;
  const description = product.description || product.productDescription || "Producto de Viñedo Ain Karim";
  const canonicalUrl = `https://ainkarim.co/producto/${params.slug}`;

  return {
    title: `${title} `,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} `,
      description,
      url: canonicalUrl,
      images: [
        {
          url: product.image ? `https://ainkarim.co${product.image.url}` : "https://ainkarim.co/default-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} `,
      description,
      images: [
        product.image ? `https://ainkarim.co${product.image.url}` : "https://ainkarim.co/default-image.jpg",
      ],
    },
  };
}

export default async function SingleProductPage({ params }) {
  const productData = await GetSingleProduct(params.slug);

  if (!productData || !productData.data?.[0]) {
    return (
      <div className="container mx-auto py-16">Producto no encontrado</div>
    );
  }

  return <SingleProductPageClient productData={productData.data[0]} />;
}
