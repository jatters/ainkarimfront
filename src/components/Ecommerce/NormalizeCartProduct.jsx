export function normalizeProductForCart(product, selectedVariation = null) {
  const {
    documentId,
    title,
    price,
    image,
    categorias_de_producto,
    isVariable,
  } = product;

  const normalizedImage = image?.url
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${image.url}`
    : null;

  const categoryName = categorias_de_producto?.name || "Sin categoría";

  if (isVariable && selectedVariation) {
    const finalPrice = parseInt(selectedVariation.variationPrice, 10);
    const uniqueId = `${documentId}_${selectedVariation.id}`;
    return {
      documentId,
      title,
      price: finalPrice,
      quantity: 1,
      isVariable: true,
      variation: {
        id: selectedVariation.id,
        name: selectedVariation.name,
        variationPrice: selectedVariation.variationPrice,
      },
      uniqueId,
      image: normalizedImage,
      category: categoryName,
      attributes: product,
    };
  } else {
    return {
      documentId,
      title,
      price: parseInt(price, 10),
      quantity: 1,
      image: normalizedImage,
      category: categoryName,
      attributes: product,
      isVariable: false,
    };
  }
}
