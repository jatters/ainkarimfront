"use client";

import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import ProductCard from "@/components/Ecommerce/ProductCard";

const ProductsFilter = dynamic(() => import("./ProductsFilter"), {
  ssr: false,
});

export default function FilterableProducts({
  initialProducts,
  cepas,
  categorias,
}) {
  const [selectedCepas, setSelectedCepas] = useState([]);
  const [selectedCategorias, setSelectedCategorias] = useState([]);

  const availableCepas = useMemo(() => {
    const idsConProductos = new Set(
      initialProducts
        .filter((p) => p.isActive && p.cepas_de_vino)
        .map((p) => p.cepas_de_vino.id)
    );
    return cepas.filter((c) => idsConProductos.has(c.id));
  }, [initialProducts, cepas]);

  const availableCategorias = useMemo(() => {
    const idsConProductos = new Set(
      initialProducts
        .filter((p) => p.isActive && p.categorias_de_producto)
        .map((p) => p.categorias_de_producto.id)
    );
    return categorias.filter((c) => idsConProductos.has(c.id));
  }, [initialProducts, categorias]);

  const handleCepasChange = useCallback((cepaId, checked) => {
    setSelectedCepas((prev) =>
      checked ? [...prev, cepaId] : prev.filter((id) => id !== cepaId)
    );
  }, []);

  const handleCategoriasChange = useCallback((catId, checked) => {
    setSelectedCategorias((prev) =>
      checked ? [...prev, catId] : prev.filter((id) => id !== catId)
    );
  }, []);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // cepas
      const cepa = product.cepas_de_vino;
      const matchCepa =
        selectedCepas.length === 0 || (cepa && selectedCepas.includes(cepa.id));

      // categorías
      const cat = product.categorias_de_producto;
      const matchCategoria =
        selectedCategorias.length === 0 ||
        (cat && selectedCategorias.includes(cat.id));

      return matchCepa && matchCategoria;
    });
  }, [initialProducts, selectedCepas, selectedCategorias]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
      <aside className="col-span-1 hidden xl:block">
        <ProductsFilter
          cepas={availableCepas}
          categorias={availableCategorias}
          onCepasChange={handleCepasChange}
          onCategoriasChange={handleCategoriasChange}
        />
      </aside>
      {console.log("filteredProducts", filteredProducts)}
      <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 row-span-5 px-2 sm:px-5">
        {filteredProducts.map((product) => (
          <ProductCard key={product.documentId} product={product} />
        ))}
      </div>
    </div>
  );
}
