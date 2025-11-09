"use client";
import { useState } from "react";
import Link from "next/link";
import ProductGallery from "@/components/Ecommerce/SingleProduct/ProductGallery";
import ProductVariations from "@/components/Ecommerce/SingleProduct/ProductVariations";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { normalizeProductForCart } from "@/components/Ecommerce/NormalizeCartProduct";
import Script from "next/script";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formatPrice = (price) => {
  if (!price) return "";
  return `$${Number(price).toLocaleString("es-CO")}`;
};

export default function SingleProductPageClient({ productData }) {
  const {
    title,
    slug,
    categorias_de_producto,
    regularPrice,
    price,
    description,
    productDescription,
    variaciones,
    isVariable,
    outOfStock,
  } = productData;
  const categoryName = categorias_de_producto?.name;

  const [selectedVariation, setSelectedVariation] = useState(null);

  const productImages = createGallery(productData);

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: productDescription ? productDescription : description,
    image: productImages.map((img) => img.sourceUrl),
    brand: {
      "@type": "Brand",
      name: "Viñedo Ain Karim",
    },
offers: {
      "@type": "Offer",
      url: `https://ainkarim.co/producto/${slug}`,
      priceCurrency: "COP",
      price: price,
      availability: outOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <Script
        id="json-ld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <main>
        <section className="container mx-auto py-8 lg:py-16 px-5">
          <div className="text-sm flex gap-2">
            <Link href="/" className="hover:text-light-green">Inicio</Link> ›{" "}
            <Link href="/productos" className="hover:text-light-green">Productos</Link> ›{" "}
            <span className="capitalize">{title}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 lg:mt-8 gap-x-5 gap-y-5 lg:gap-y-9">
            <div className="max-w-3xl">
              <ProductGallery images={productImages} />
            </div>
            <div className="lg:px-5">
              <div className="hidden lg:block">
                <div className="text-dark-green text-5xl font-bold mb-2 capitalize flex items-center gap-3">
                  <h1>{title}</h1>
                  {regularPrice > price && (
                    <span className="font-normal bg-dark-red text-xl text-white px-2 py-1 rounded-md flex items-center gap-1">
                      <span
                        className="icon-[whh--sale]"
                        role="img"
                        aria-hidden="true"
                      />{" "}
                      En oferta
                    </span>
                  )}
                </div>
                <div className="italic mb-2 text-dark-red">
                  {categoryName}
                </div>
              </div>              

              {regularPrice > price ? (
                <div className="text-2xl font-semibold mb-5 flex gap-3 ">
                  <span className="font-normal line-through text-dark-red">
                    {formatPrice(regularPrice)}
                  </span>
                  <span>-</span>
                  <span>
                    {formatPrice(price)}
                    <sup className="lg:ml-1 text-base">COP</sup>
                  </span>
                </div>
              ) : (
                <div className="text-2xl font-semibold mb-5 ">
                  {formatPrice(regularPrice)}
                  <sup className="lg:ml-1 text-base">COP</sup>
                </div>
              )}
              {outOfStock && (
                <div className="text-red-600 my-4 font-medium ">
                  Producto agotado
                </div>
              )}

              {productDescription && (
                <div className="[&>p]:leading-7 prose [&>p]:mb-4 [&>p]:-text--dark-gray [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:-text--dark-gray [&>h3]:mb-2 [&>h3]:font-semibold [&>h3]:text-dark-gray [&>h3]:text-xl [&>h4]:text-lg [&>h4]:text-dark-gray [&>h4]:mb-1 [&>h4]:font-semibold [&>img]:mx-auto [&>strong]:-text--dark-gray [&>p>a]:text-dark-green [&>p>a]:underline [&>p>a]:hover:text-light-green [&>ul]:list-disc [&>ul]:list-inside [&>ul]:pl-5 [&>ul]:mb-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:list-inside ">
                  <BlocksRenderer content={productDescription} />
                </div>
              )}
              

              {isVariable && variaciones && variaciones.length > 0 && (
                <div className="mb-4">
                  <ProductVariations
                    variations={variaciones}
                    selectedVariation={selectedVariation}
                    onSelectVariation={setSelectedVariation}
                  />
                </div>
              )}

              <div className="mt-10 lg:mt-0">
                {outOfStock ? (
                  <button className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md" disabled>
                    Producto agotado
                  </button>
                ) : (
                  <AddToCartButton
                    product={productData}
                    selectedVariation={selectedVariation}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function createGallery(product) {
  if (!product?.image) {
    return [];
  }
  const mainImage = {
    sourceUrl: process.env.NEXT_PUBLIC_SITE_URL + product.image.url,
    altText: product.image.alternativeText || `Imagen ${product.title || ""}`,
  };

  let galleryImages = [mainImage];

  if (product.image && Array.isArray(product.gallery)) {
    galleryImages = [
      ...galleryImages,
      ...product.gallery.map((image, index) => ({
        sourceUrl: process.env.NEXT_PUBLIC_SITE_URL + image.url,
        altText:
          image.alternativeText || `Imagen ${product.title || ""} ${index + 1}`,
      })),
    ];
  }
  return galleryImages;
}

function AddToCartButton({ product, selectedVariation }) {
  const { addToCart } = useContext(CartContext);
  const { isVariable } = product;
  const router = useRouter();

  const handleAddToCart = () => {
    if (isVariable && !selectedVariation) {
      alert("Por favor, selecciona una opción de variación.");
      return;
    }
    const cartItem = normalizeProductForCart(product, selectedVariation);
    addToCart(cartItem);
    toast.custom((t) => {
      return (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } relative max-w-sm w-[290px] bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}
        >
          <div className="p-2">
            <div className="flex items-start">
              <div className="shrink-0 pt-[2px] text-gray-600">
                <span
                  className="icon-[gridicons--cart] text-2xl text-light-green"
                  role="img"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-2 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{`Agregaste ${product.title} al carrito!`}</p>
                <div className="mt-1 flex justify-end space-x-7">
                  <button
                    type="button"
                    className="bg-white rounded-md text-sm font-medium text-light-green hover:text-grey-darkest focus:outline-hidden "
                    onClick={() => router.push("/carrito")}
                  >
                    Ir a mi carrito
                  </button>
                </div>
              </div>
              <div className="ml-3 shrink-0 flex">
                <button
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => toast.dismiss(t.id)}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isVariable && !selectedVariation}
      className="bg-green-700 hover:bg-green-800 text-white py-3 px-10 rounded-md transition-colors duration-200"
    >
      Añadir a carrito
    </button>
  );
}
