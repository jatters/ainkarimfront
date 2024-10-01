export default function ProductVariations({ variations }) {
  if (variations && variations.length > 0) {
    return variations.map((variation, index) => (
      <div className="font-semibold " key={index}>
        {variation.name}
      </div>
    ));
  } else {
    return null;
  }
}
