import ProductCard from "@/components/Ecommerce/ProductCard";
import ProductsFilter from "@/components/Ecommerce/ProductsFilter";
import HeaderImage from "@/components/Ui/HeaderImage";

async function fetchProducts() {
  const url = `${process.env.STRAPI_URL}/api/productos?populate=*`;
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error(error);
  }
}

const formatPrice = (price) => {
  if (!price) return "";
  const formattedPrice = price.split(",")[0];
  return `$${Number(formattedPrice).toLocaleString("es-CO")}`;
};

export default async function productsPage() {
  const products = await fetchProducts();

  return (
    <>
      <HeaderImage title="Vinos" background="/banner-vinos.jpg" />
      <div className="container mx-auto pt-16 pb-14">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
          <div className="grid-cols-1">
            <ProductsFilter />
          </div>
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-7">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                slug={`/producto/${product.attributes.slug}`}
                title={product.attributes.title}
                price={formatPrice(product.attributes.Precio)}
                category={
                  product.attributes.categoria_de_productos.data.length > 0
                    ? product.attributes.categoria_de_productos.data[0]
                        .attributes.Nombre
                    : ""
                }
                image={`${process.env.STRAPI_URL}${product.attributes.Imagen.data.attributes.formats.small.url}`}
                altimg={
                  product.attributes.Imagen.data.attributes.alternativeText
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
