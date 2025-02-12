// Archivo: src/app/producto/[slug]/page.jsx (componente de servidor)
import SingleProductPageClient from "@/components/Ecommerce/SingleProduct/SingleProductPageClient";
import { GetSingleProduct } from "@/components/GetContentApi";

export default async function SingleProductPage({ params }) {
  const productData = await GetSingleProduct(params.slug);

  if (!productData || !productData.data?.[0]) {
    return (
      <div className="container mx-auto py-16">Producto no encontrado</div>
    );
  }

  return <SingleProductPageClient productData={productData.data[0]} />;
}
