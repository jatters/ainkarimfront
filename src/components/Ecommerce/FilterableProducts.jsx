"use client";
import { useState, useMemo } from "react";
import ProductCard from "@/components/Ecommerce/ProductCard";
import ProductsFilter from "@/components/Ecommerce/ProductsFilter";

export default function FilterableProducts({ initialProducts }) {
  // Estados para filtros seleccionados
  const [selectedCepas, setSelectedCepas] = useState([]);
  const [selectedCategorias, setSelectedCategorias] = useState([]);

  // Funciones para actualizar filtros
  const handleCepasChange = (cepa, checked) => {
    setSelectedCepas((prev) =>
      checked ? [...prev, cepa] : prev.filter((item) => item !== cepa)
    );
  };

  const handleCategoriasChange = (categoria, checked) => {
    setSelectedCategorias((prev) =>
      checked ? [...prev, categoria] : prev.filter((item) => item !== categoria)
    );
  };

  // Filtrar productos usando useMemo para optimización
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Filtrar por cepa si se han seleccionado cepas
      const matchCepa =
        selectedCepas.length === 0 ||
        (product.wineCepa && selectedCepas.includes(product.wineCepa)) ||
        false; // Ajustar según la estructura de cepa

      // Filtrar por categoría si se han seleccionado categorías
      const matchCategoria =
        selectedCategorias.length === 0 ||
        (product.categorias_de_producto &&
          selectedCategorias.includes(product.categorias_de_producto.name));

      return matchCepa && matchCategoria;
    });
  }, [initialProducts, selectedCepas, selectedCategorias]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
      <aside>
        {/* Pasar funciones para manejar cambios al componente de filtros */}
        <ProductsFilter
          onCepasChange={handleCepasChange}
          onCategoriasChange={handleCategoriasChange}
        />
      </aside>
      <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 row-span-5 ">
        {filteredProducts.map((product) => {
          const {
            id,
            slug,
            title,
            price,
            regularPrice,
            image,
            categorias_de_producto,
            isActive,
            wineCepa,
          } = product;

          const imageUrl = image?.url
            ? `${process.env.NEXT_PUBLIC_SITE_URL}${image.url}`
            : null;

          const altText = image?.alternativeText
            ? image.alternativeText
            : `Imagen ${title}`;

          const categoryName = categorias_de_producto?.name || "Sin categoría";

          return (
            <ProductCard
              key={id}
              slug={`/producto/${slug}`}
              title={title}
              price={price}
              regularprice={regularPrice}
              category={categoryName}
              image={imageUrl}
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
                wineCepa,
                quantity: 1,
              }}
              isActive={isActive}
            />
          );
        })}
      </div>
    </div>
  );
}
