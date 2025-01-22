export default function FormatPrice({ price, className }) {
  if (price === null || price === undefined) return "";
  
  let formattedPrice;
  if (typeof price === 'number') {
    formattedPrice = `$${price.toLocaleString("es-CO")}`;
  } 

  return <div className={className}>{formattedPrice}</div>;
}