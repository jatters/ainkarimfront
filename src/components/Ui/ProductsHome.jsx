import ProductCard from "@/components/Ecommerce/ProductCard";

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
  const formatedPrice = price.split(",")[0];
  return `$${Number(formatedPrice).toLocaleString("es-CO")}`;
};

export default async function ProductsHome() {
  const products = await fetchProducts();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
      {products?.slice(0, 4).map((product) => (
        <ProductCard
          key={product.id}
          slug={`/producto/${product.attributes.slug}`}
          title={product.attributes.title}
          price={formatPrice(product.attributes.Precio)}
          category={
            product.attributes.categoria_de_productos.data.length > 0
              ? product.attributes.categoria_de_productos.data[0].attributes
                  .Nombre
              : ""
          }
          image={`${process.env.STRAPI_URL}${product.attributes.Imagen.data.attributes.formats.small.url}`}
          altimg={product.attributes.Imagen.data.attributes.alternativeText}
        />
      ))}
    </div>
  );
}
