import ProductCard from "@/components/Ecommerce/ProductCard";
import { GetProductsForHome } from "../GetContentApi";

export default async function ProductsHome() {
  const products = await GetProductsForHome();
  if (!products) {
    console.error("Error fetching products for home");
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 px-5">
      {products.map((product, index) => (
        <ProductCard key={product.id || index} product={product} />
      ))}
    </div>
  );
}
