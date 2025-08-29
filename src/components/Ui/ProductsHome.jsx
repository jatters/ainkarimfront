import ProductCard from "@/components/Ecommerce/ProductCard";
import { GetProductsForHome } from "../GetContentApi";
import Link from "next/link";

export default async function ProductsHome() {
  const products = await GetProductsForHome();
  if (!products) {
    console.error("Error fetching products for home");
    return null;
  }

  return (
    <section className="-bg--dark-green">
      <div className="container mx-auto pt-16 py-8 lg:py-12 xl:py-16">
        <div className="flex justify-center lg:justify-between items-center px-5 xl:px-0 mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold font-serif text-white text-center lg:text-left uppercase">
              Productos con historia
            </h2>
            <p className="text-xl mt-5 text-white text-center lg:text-left italic">
              Lleva a casa lo mejor de{" "}
              <span className="text-gray-200 font-semibold">
                nuestro viñedo
              </span>
              .
            </p>
          </div>
          <div className="hidden lg:block">
            <Link
              href="/productos"
              className="flex items-center gap-2 text-sm xl:text-base text-white font-medium hover:text-slate-300 hover:translate-x-2 transition duration-200"
            >
              Ver todos nuestros productos{" "}
              <span
                className="icon-[icon-park-outline--right-small]"
                role="img"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
        <div className="2xl:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-5">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id || index} product={product} isHome={true} />
          ))}
        </div>
        <div className="hidden 2xl:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 px-5">
          {products.slice(0, 5).map((product, index) => (
            <ProductCard key={product.id || index} product={product} isHome={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
