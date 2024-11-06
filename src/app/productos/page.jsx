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
        Error cargando productos. Por favor intenta más tarde.
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
            {products.data
              .filter((product) => product.isActive) // Filtramos solo productos activos
              .map((product) => {
                // Desestructuramos los atributos necesarios para mayor claridad
                const {
                  id,
                  slug,
                  title,
                  price,
                  image,
                  categorias_de_producto,
                  isActive,
                } = product;

                const imageUrl = image?.url
                  ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`
                  : null;
                
                const altText = image?.alternativeText
                  ? image.alternativeText
                  : `Imagen ${title}`;
                
                const categoryName =
                  categorias_de_producto?.name || "Sin categoría";

                return (
                  <ProductCard
                    key={id}
                    slug={`/producto/${slug}`}
                    title={title}
                    price={price}
                    category={categoryName}
                    image={imageUrl} // Asegúrate de pasar la URL de la imagen aquí
                    altimg={altText}
                    product={{
                      id,
                      title,
                      price,
                      image: {
                        url: imageUrl,
                        alternativeText: altText,
                      },
                      categorias_de_producto,
                      quantity: 1,
                    }}
                    isActive={isActive}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
