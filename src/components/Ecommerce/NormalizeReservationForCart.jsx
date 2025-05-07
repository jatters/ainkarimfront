function formatHour(hourString) {
  if (!hourString) return "";
  const [hours, minutes] = hourString.split(":");
  const hourNum = parseInt(hours, 10);
  const formattedHour =
    hourNum === 0 ? "12" : hourNum > 12 ? hourNum - 12 : hourNum;
  const period = hourNum >= 12 ? "pm" : "am";
  return `${formattedHour}:${minutes} ${period}`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  const day = date.getDate().toString().padStart(2, "0");
  const month = capitalize(date.toLocaleString("es-ES", { month: "long" }));
  const year = date.getFullYear();
  return `${month} ${day} de ${year}`;
}

export function normalizeReservationForCart(plan, selectedOptions = {}) {
  const originalName =
    plan.name || (plan.attributes && plan.attributes.name) || "Sin nombre";
  const { documentId, price, image, categorias_de_producto } = plan;
  const normalizedImage = image?.formats?.small?.url
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${image.formats?.small?.url}`
    : null;
  const categoryName = categorias_de_producto?.name || "Plan";

  const {
    date = "",
    hour = "",
    persons = 1,
    additionalService = null,
    availableSpots,
    unitPlan,
  } = selectedOptions;
  const formattedHour = hour ? formatHour(hour) : "";
  const formattedDate = date ? formatDate(date) : "";

  const normalizedTitle = `${originalName} - ${formattedDate} - ${
    persons > 1 ? persons + ` ${plan.unitPlan}s` : `1 ${plan.unitPlan}`
  } - ${formattedHour}`;

  return {
    documentId,
    title: normalizedTitle,
    unitPlan,
    originalName,
    price: parseFloat(price) || 0,
    quantity: persons,
    image: normalizedImage,
    category: categoryName,
    attributes: plan,
    isReservation: true,
    reservationData: { date, hour: formattedHour, persons },
    additionalService: additionalService
      ? {
          name: additionalService?.name,
          price: parseFloat(additionalService?.price) || 0,
          documentId: additionalService?.documentId,
        }
      : null,
    uniqueId: `${documentId}_${date}_${formattedHour}`,
    maxQuantity: plan.max_reservations
      ? parseInt(plan.max_reservations, 10)
      : undefined,
    availableSpots,
  };
}
