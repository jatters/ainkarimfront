"use client";
export default function ProductVariations({
  variations,
  selectedVariation,
  onSelectVariation,
}) {
  return (
    <div className="flex gap-2">
      {variations.map((variation) => (
        <button
          key={variation.documentId}
          className={`px-4 py-2 border rounded-md transition-colors duration-200 ${
            selectedVariation?.documentId === variation.documentId
              ? "bg-green-600 text-white"
              : "bg-white text-black hover:bg-gray-200"
          }`}
          onClick={() => onSelectVariation(variation)}
        >
          {variation.name}
        </button>
      ))}
    </div>
  );
}
