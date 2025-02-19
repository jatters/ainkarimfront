function formatHour(hourString) {
  if (!hourString) return "";
  const [hours, minutes] = hourString.split(":");
  const hourNum = parseInt(hours, 10);
  const formattedHour = hourNum === 0 ? "12" : hourNum > 12 ? hourNum - 12 : hourNum;
  const period = hourNum >= 12 ? "pm" : "am";
  return `${formattedHour}:${minutes} ${period}`;
}

export function normalizeReservationForCart(plan, selectedOptions = {}) {
  // Guardamos el nombre original del plan
  const originalName =
    plan.name || (plan.attributes && plan.attributes.name) || "Sin nombre";
  const { documentId, price, image, categorias_de_producto } = plan;
  const normalizedImage = image?.url
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${image.url}`
    : null;
  const categoryName = categorias_de_producto?.name || "Plan";
  
  // Extraemos las opciones seleccionadas, incluyendo availableSpots
  const { date = "", hour = "", persons = 1, additionalService = null, availableSpots } = selectedOptions;
  const formattedHour = hour ? formatHour(hour) : "";
  
  // Construimos el título normalizado
  const normalizedTitle = `${originalName} - ${date} - ${
    persons > 1 ? persons + " personas" : "1 persona"
  } - ${formattedHour}`;

  return {
    documentId,      
    title: normalizedTitle,      
    originalName,
    price: parseFloat(price) || 0,
    quantity: persons, // cantidad de personas seleccionada
    image: normalizedImage,
    category: categoryName,
    attributes: plan,
    isReservation: true,
    reservationData: { date, hour: formattedHour, persons },
    additionalService: additionalService
      ? {
          name: additionalService.name,
          price: parseFloat(additionalService.price) || 0,
        }
      : null,
    uniqueId: `${documentId}_${date}_${formattedHour}`,
    maxQuantity: plan.max_reservations ? parseInt(plan.max_reservations, 10) : undefined,
    availableSpots, // se incluye la cantidad de cupos disponibles al momento de la reserva
  };
}
