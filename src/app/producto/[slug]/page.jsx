"use client";
import Link from "next/link";
import ProductGallery from "@/components/Ecommerce/SingleProduct/ProductGallery";
import ReactMarkdown from "react-markdown";
import ProductVariations from "@/components/Ecommerce/SingleProduct/ProductVariations";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

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

function extractGallery(images) {
  const mainImage = {
    sourceUrl:
      process.env.STRAPI_URL + images.attributes.Imagen.data.attributes.url,
    altText: images.attributes.Imagen.data.attributes.alternativeText,
  };

  let galleryImages = [mainImage];

  if (images.attributes.Galeria && images.attributes.Galeria.data) {
    galleryImages = [
      ...galleryImages,
      ...images.attributes.Galeria.data.map((image) => ({
        sourceUrl: process.env.STRAPI_URL + image.attributes.url,
        altText: image.attributes.alternativeText || "",
      })),
    ];
  }

  return galleryImages;
}

export default async function singleProductPage({ params }) {
  const productsData = await fetchProducts();
  const productInfo = productsData.find(
    (product) => product.attributes.slug === params.slug
  );
  const productImages = extractGallery(productInfo);

  return (
    <div className="container mx-auto pt-9 pb-14">
      <div>
        <Link href="/">Inicio</Link> / <Link href="/productos">Productos</Link>{" "}
        / <span className="capitalize">{productInfo.attributes.title}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-x-5 gap-y-9">
        <div className="max-w-3xl">
          <ProductGallery galleryImages={productImages} />
        </div>
        <div className="px-5">
          <h1 className="-text--dark-green text-5xl font-bold mb-2 capitalize">
            {productInfo.attributes.title}
          </h1>
          <div className="italic mb-4 -text--dark-red">
            {productInfo.attributes.categoria_de_productos.data.length > 0
              ? productInfo.attributes.categoria_de_productos.data[0].attributes
                  .Nombre
              : ""}
          </div>
          <div className="text-2xl font-semibold">
            {formatPrice(productInfo.attributes.Precio)}<sup className="ml-1 text-base">COP</sup>
          </div>
          <ReactMarkdown className="my-7">
            {productInfo.attributes.Descripcion}
          </ReactMarkdown>
          <div>
            <ProductVariations
              variations={productInfo.attributes.variaciones.data}
            />
          </div>

          <div>
            <AddToCartButton product={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}

function AddToCartButton({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <button
      className="-bg--dark-green text-white py-3 px-10 hover:-bg--light-green duration-300 rounded-md"
      onClick={() => addToCart(product)}
    >
      Añadir a carrito
    </button>
  );
}
