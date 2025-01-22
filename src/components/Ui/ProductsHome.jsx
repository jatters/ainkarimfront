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
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
      {products.data.map((product, index) => (
        <ProductCard
          key={product.id || index}
          slug={`/producto/${product.slug}`}
          title={product.title}
          price={formatPrice(product.price)}
          category={
            product.categorias_de_producto &&
            product.categorias_de_producto.name
          }
          image={`${process.env.NEXT_PUBLIC_SITE_URL}${product.image.url}`}
          altimg={product.image.alternativeText || `Imagen de ${product.title}`}
          isActive={product.isActive}
          product={product}
        />
      ))}
    </div>
  );
}
