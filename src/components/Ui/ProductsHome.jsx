import ProductCard from "@/components/Ecommerce/ProductCard";
import { GetProductsForHome } from "../GetContentApi";

const formatPrice = (price) => {
  if (!price) return "";
  const formatedPrice = String(price);
  return `$${Number(formatedPrice).toLocaleString("es-CO")}`;
};

export default async function ProductsHome() {
  const products = await GetProductsForHome();
  if (!products || !products.data) {
    console.error("Error fetching products for home");
    return <p>Error cargando productos</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
      {products.data?.slice(0, 4).map((product) => (
        <ProductCard
          key={product.documentId}
          slug={`/producto/${product.slug}`}
          title={product.title}
          price={formatPrice(product.price)}
          category={
            product.categorias_de_producto &&
            product.categorias_de_producto.name
          }
          image={`${process.env.STRAPI_URL}${product.image.formats.small.url}`}
          altimg={product.image.alternativeText}
        />
      ))}
    </div>
  );
}
