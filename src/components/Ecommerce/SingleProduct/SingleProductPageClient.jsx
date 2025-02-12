// Archivo: src/app/producto/[slug]/SingleProductPageClient.jsx (componente de cliente)
"use client";
import { useState } from "react";
import { Link } from "next-view-transitions";
import ProductGallery from "@/components/Ecommerce/SingleProduct/ProductGallery";
import ProductVariations from "@/components/Ecommerce/SingleProduct/ProductVariations";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import {normalizeProductForCart} from "@/components/Ecommerce/NormalizeCartProduct";

const formatPrice = (price) => {
  if (!price) return "";
  return `$${Number(price).toLocaleString("es-CO")}`;
};

export default function SingleProductPageClient({ productData }) {
  const {
    title,
    categorias_de_producto,
    regularPrice,
    price,
    description,
    productDescription,
    variaciones,
    isVariable,
  } = productData;
  const categoryName = categorias_de_producto?.name; 

  // Estado para la variación seleccionada (para productos variables)
  const [selectedVariation, setSelectedVariation] = useState(null);

  const productImages = createGallery(productData);

  return (
    <main>
      <section className="container mx-auto py-8 lg:py-16 px-5">
        <div>
          <Link href="/">Inicio</Link> /{" "}
          <Link href="/productos">Productos</Link> /{" "}
          <span className="capitalize">{title}</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 lg:mt-8 gap-x-5 gap-y-5 lg:gap-y-9">
          <div className="max-w-3xl">
            <ProductGallery images={productImages} />
          </div>
          <div className="lg:px-5">
            {/* Vista escritorio: título y precio */}
            <div className="hidden lg:block">
              <div className="-text--dark-green text-5xl font-bold mb-2 capitalize flex items-center gap-3">
                <h1>{title}</h1>
                {regularPrice > price && (
                  <span className="font-normal -bg--dark-red text-xl text-white px-2 py-1 rounded-md flex items-center gap-1">
                    <span
                      className="icon-[whh--sale]"
                      role="img"
                      aria-hidden="true"
                    />{" "}
                    En oferta
                  </span>
                )}
              </div>
              <div className="italic mb-2 -text--dark-red">{categoryName}</div>
            </div>

            {/* Precios */}
            {regularPrice > price ? (
              <div className="text-2xl font-semibold mb-5 flex gap-3 ">
                <span className="font-normal line-through -text--dark-red">
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
            

            {productDescription && (
              <div className="[&>p]:leading-7 prose [&>p]:mb-4 [&>p]:-text--dark-gray [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:-text--dark-gray [&>h3]:mb-2 [&>h3]:font-semibold [&>h3]:-text--dark-gray [&>h3]:text-xl [&>h4]:text-lg [&>h4]:-text--dark-gray [&>h4]:mb-1 [&>h4]:font-semibold [&>img]:mx-auto [&>strong]:-text--dark-gray [&>p>a]:-text--dark-green [&>p>a]:underline [&>p>a]:hover:-text--light-green [&>ul]:list-disc [&>ul]:list-inside [&>ul]:pl-5 [&>ul]:mb-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:list-inside ">
                <BlocksRenderer content={productDescription} />
              </div>
            )}

            {/* Variaciones para productos variables */}

            {isVariable && variaciones && variaciones.length > 0 && (
              <div className="mb-4">
                <ProductVariations
                  variations={variaciones}
                  selectedVariation={selectedVariation}
                  onSelectVariation={setSelectedVariation}
                />
              </div>
            )}

            {/* Botón de agregar al carrito */}
            <div className="mt-10 lg:mt-0">
              <AddToCartButton
                product={productData}
                selectedVariation={selectedVariation}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function createGallery(product) {
  const mainImage = {
    sourceUrl: process.env.NEXT_PUBLIC_SITE_URL + product.image.url,
    altText: product.image.alternativeText || `Imagen ${product.title}`,
  };

  let galleryImages = [mainImage];

  if (product.image && Array.isArray(product.gallery)) {
    galleryImages = [
      ...galleryImages,
      ...product.gallery.map((image, index) => ({
        sourceUrl: process.env.NEXT_PUBLIC_STRAPI_URL + image.url,
        altText:
          image.alternativeText || `Imagen ${product.title} ${index + 1}`,
      })),
    ];
  }
  return galleryImages;
}

function AddToCartButton({ product, selectedVariation }) {
  const { addToCart } = useContext(CartContext);
  // Extraer isVariable del producto
  const { isVariable } = product;

  const handleAddToCart = () => {
    if (isVariable && !selectedVariation) {
      alert("Por favor, selecciona una opción de variación.");
      return;
    }
    const cartItem = normalizeProductForCart(product, selectedVariation);
    addToCart(cartItem);
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


