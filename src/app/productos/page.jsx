import HeaderImage from "@/components/Ui/HeaderImage";
import { GetProducts } from "@/components/GetContentApi";
import FilterableProducts from "@/components/Ecommerce/FilterableProducts";

export default async function productsPage() {
  const products = await GetProducts();
  if (!products || !products.data) {
    console.error("Error loading products");
    return (
      <div className="container mx-auto py-16 px-5">
        Error cargando productos. Por favor intenta más tarde.
      </div>
    );
  }

  return (
    <main>
      <HeaderImage title="Vinos" background="/banner-vinos.webp" />
      <section className="container mx-auto pt-16 pb-14">
        {/* Pasar la lista de productos iniciales a FilterableProducts */}
        <FilterableProducts initialProducts={products.data} />
      </section>
    </main>
  );
}
