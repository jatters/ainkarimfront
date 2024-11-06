"use client";
import Link from "next/link";
import ProductGallery from "@/components/Ecommerce/SingleProduct/ProductGallery";
import ReactMarkdown from "react-markdown";
import ProductVariations from "@/components/Ecommerce/SingleProduct/ProductVariations";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { GetSingleProduct } from "@/components/GetContentApi";

const formatPrice = (price) => {
  if (!price) return "";
  return `$${Number(price).toLocaleString("es-CO")}`;
};

function createGallery(product) {
  const mainImage = {
    sourceUrl: process.env.NEXT_PUBLIC_STRAPI_URL + product.image.url,
    altText: product.image.alternativeText || `Imagen ${product.title}`,
  };

  let galleryImages = [mainImage];

  if (product.image) {
    if (Array.isArray(product.gallery)) {
      galleryImages = [
        ...galleryImages,
        ...product.gallery.map((image) => ({
          sourceUrl: process.env.NEXT_PUBLIC_STRAPI_URL + image.url,
          altText: image.alternativeText || `Imagen ${product.title}`,
        })),
      ];
    }
  }

  return galleryImages;
}


export default async function singleProductPage({ params }) {
  const slug = params.slug;
  try {
    const productData = await GetSingleProduct(slug);
    if (!productData || !productData.data?.[0]) {
      console.error("Error fetching product info");
      return (
        <div className="container mx-auto py-16">Producto no encontrado</div>
      );
    }
    
    const { title, categorias_de_producto, price, description, variaciones } =
      productData?.data[0];
    const categoryName = categorias_de_producto?.name;
    const producto = productData?.data[0];

    const productImages = createGallery(producto);

    
    return (
      <section className="container mx-auto py-16 px-5">

        <div>
          <Link href="/">Inicio</Link> /{" "}
          <Link href="/productos">Productos</Link> /{" "}
          <span className="capitalize">{title}</span>
        </div>
        <div className="lg:hidden mt-10">
          <h1 className="-text--dark-green text-5xl font-bold mb-2 capitalize">
            {title}
          </h1>
          <div className="italic -text--dark-red">{categoryName}</div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 lg:mt-8 gap-x-5 gap-y-9">
          <div className="max-w-3xl">
            <ProductGallery images={productImages} />
          </div>
          <div className="lg:px-5">
            <div className="hidden lg:block">
              <h1 className="-text--dark-green text-5xl font-bold mb-2 capitalize">
                {title}
              </h1>
              <div className="italic mb-2 -text--dark-red">{categoryName}</div>
            </div>
            <div className="text-2xl font-semibold mb-5 ">
              {formatPrice(price)}
              <sup className="lg:ml-1 text-base">COP</sup>
            </div>
            <ReactMarkdown className="lg:my-7">{description}</ReactMarkdown>

            {variaciones && (
              <div>
                <ProductVariations variations={variaciones} />
              </div>
            )}
            
            <div className="mt-10 lg:mt-0">
              <AddToCartButton product={producto} />
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error cargando el producto", error);
    return (
      <div className="container mx-auto py-16">Error cargando el producto</div>
    );
  }
}


function AddToCartButton({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    // Crear un objeto con los atributos necesarios para el carrito
    const productToAdd = {
      id: product.id,
      title: product.title || "Sin título",
      price: product.price || 0,
      image: product.image?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${product.image.url}`
        : null,
      quantity: 1, // Inicializamos la cantidad en 1
      reservationData: null, // No es una reserva, así que lo dejamos como null
      additionalService: null, // No hay servicio adicional en este caso
    };

    addToCart(productToAdd);
  };

  return (
    <button
      className="-bg--dark-green text-white py-3 px-10 hover:-bg--light-green duration-200 rounded-md"
      onClick={handleAddToCart}
    >
      Añadir a carrito
    </button>
  );
}



