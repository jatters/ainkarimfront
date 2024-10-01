//"use client";
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

function extractGallery(product) {
  const mainImage = {
    sourceUrl: process.env.STRAPI_URL + product.image.url,
    altText: product.image.alternativeText || `Imagen ${product.title}`,
  };

  let galleryImages = [mainImage];

  if (product.image) {
    galleryImages = [
      ...galleryImages,
      ...product.gallery.map((image) => ({
        sourceUrl: process.env.STRAPI_URL + image.url,
        altText: image.alternativeText || `Imagen ${product.title}`,
      })),
    ];
  }

  return galleryImages;
}

export default async function singleProductPage({ params }) {
  try {
    const productData = await GetSingleProduct(params.slug);
    const product = productData?.data[0];
    if (!product) {
      return (
        <div className="container mx-auto py-16">Producto no encontrado</div>
      );
    }
    const productImages = extractGallery(product);
    return (
      <div className="container mx-auto pt-9 pb-14">
        <div>
          <Link href="/">Inicio</Link> /{" "}
          <Link href="/productos">Productos</Link> /{" "}
          <span className="capitalize">{product.title}</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-x-5 gap-y-9">
          <div className="max-w-3xl">
            <ProductGallery galleryImages={productImages} />
          </div>
          <div className="px-5">
            <h1 className="-text--dark-green text-5xl font-bold mb-2 capitalize">
              {product.title}
            </h1>
            <div className="italic mb-4 -text--dark-red">
              {product.categorias_de_producto &&
                product.categorias_de_producto.name}
            </div>
            <div className="text-2xl font-semibold">
              {formatPrice(product.price)}
              <sup className="ml-1 text-base">COP</sup>
            </div>
            <ReactMarkdown className="my-7">
              {product.description}
            </ReactMarkdown>
            <div>
              <ProductVariations variations={product.variaciones} />
            </div>

            <div>{/* <AddToCartButton product={product} /> */}</div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log("Error cargando el producto", error);
    return (
      <div className="container mx-auto py-16">Error cargando el producto</div>
    );
  }
}

/* function AddToCartButton({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <button
      className="-bg--dark-green text-white py-3 px-10 hover:-bg--light-green duration-200 rounded-md"
      onClick={() => addToCart(product)}
    >
      Añadir a carrito
    </button>
  );
} */
