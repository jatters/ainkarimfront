import ProductCard from "@/components/Ecommerce/ProductCard";
import ProductsFilter from "@/components/Ecommerce/ProductsFilter";
import HeaderImage from "@/components/Ui/HeaderImage";
import { GetProducts } from "@/components/GetContentApi";

const formatPrice = (price) => {
  if (!price) return "";
  const formattedPrice = String(price);
  return `$${Number(formattedPrice).toLocaleString("es-CO")}`;
};

export default async function productsPage() {
  const products = await GetProducts();
  if (!products || !products.data) {
    console.error("Error loading products");
    return (
      <div className="container mx-auto py-16 px-5">
        Error cargando productos
      </div>
    );
  }

  return (
    <>
      <HeaderImage title="Vinos" background="/banner-vinos.jpg" />
      <div className="container mx-auto pt-16 pb-14">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
          <div className="grid-cols-1">
            <ProductsFilter />
          </div>
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-7">
            {products.data?.map((product) => (
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
                altimg={
                  product.image.alternativeText
                    ? product.image.alternativeText
                    : `Imagen ${product.title}`
                }
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
