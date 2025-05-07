export const actionTypes = {
  SET_CART: "SET_CART",
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
};

export function cartReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_CART:
      return action.payload || [];

    case actionTypes.ADD_ITEM:
      return handleAddItem(state, action.payload);

    case actionTypes.REMOVE_ITEM:
      return handleRemoveItem(state, action.payload);

    case actionTypes.UPDATE_QUANTITY:
      return handleUpdateQuantity(
        state,
        action.payload.product,
        action.payload.newQuantity
      );

    case actionTypes.CLEAR_CART:
      return [];

    default:
      return state;
  }
}

function handleAddItem(state, product) {
  if (product.isVariable && product.variation) {
    const index = state.findIndex((item) => item.uniqueId === product.uniqueId);
    if (index >= 0) {
      const updatedCart = [...state];
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: updatedCart[index].quantity + 1,
      };
      return updatedCart;
    } else {
      return [...state, { ...product, quantity: 1 }];
    }
  } else if (product.isReservation && product.reservationData) {
    const index = state.findIndex(
      (item) =>
        item.documentId === product.documentId &&
        item.reservationData?.date === product.reservationData.date &&
        item.reservationData?.hour === product.reservationData.hour &&
        (!item.additionalService ||
          item.additionalService?.name === product.additionalService?.name)
    );
    if (index >= 0) {
      const updatedCart = [...state];
      const newPersons = product.reservationData.persons;
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: newPersons,
        reservationData: {
          ...updatedCart[index].reservationData,
          persons: newPersons,
        },

        title: buildReservationTitle(
          updatedCart[index].originalName || updatedCart[index].title,
          updatedCart[index].reservationData.date,
          newPersons,
          updatedCart[index].reservationData.hour
        ),
      };
      return updatedCart;
    } else {
      return [
        ...state,
        { ...product, quantity: product.reservationData.persons },
      ];
    }
  } else {
    const index = state.findIndex(
      (item) =>
        item.documentId === product.documentId &&
        !item.variation &&
        !item.isReservation
    );
    if (index >= 0) {
      const updatedCart = [...state];
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: updatedCart[index].quantity + 1,
      };
      return updatedCart;
    } else {
      return [...state, { ...product, quantity: 1 }];
    }
  }
}

function handleRemoveItem(state, product) {
  if (product.isVariable && product.variation) {
    return state.filter((item) => item.uniqueId !== product.uniqueId);
  } else {
    return state.filter((item) => item.documentId !== product.documentId);
  }
}

function handleUpdateQuantity(state, product, newQuantity) {
  return state.map((item) => {
    if (
      product.isReservation &&
      product.uniqueId &&
      item.uniqueId === product.uniqueId
    ) {
      const planMax = product.maxQuantity || Infinity;
      const currentAvailable = product.availableSpots ?? Infinity;
      const maxAllowed = Math.min(planMax, currentAvailable);
      const adjustedQuantity =
        newQuantity > maxAllowed ? maxAllowed : newQuantity;
      const unitPlan = product.unitPlan;

      const updatedItem = {
        ...item,
        quantity: adjustedQuantity,
        reservationData: {
          ...item.reservationData,
          persons: adjustedQuantity,
        },
      };
      updatedItem.title = buildReservationTitle(
        updatedItem.originalName || updatedItem.title,
        updatedItem.reservationData.date,
        adjustedQuantity,
        updatedItem.reservationData.hour,
        unitPlan
      );
      return updatedItem;
    }

    if (
      product.isVariable &&
      product.uniqueId &&
      item.uniqueId === product.uniqueId
    ) {
      return { ...item, quantity: newQuantity };
    }

    if (
      !product.isVariable &&
      !product.isReservation &&
      item.documentId === product.documentId
    ) {
      return { ...item, quantity: newQuantity };
    }

    return item;
  });
}

function buildReservationTitle(originalName, date, persons, hour, unitPlan) {
  const baseName = originalName.includes(" - ")
    ? originalName.split(" - ")[0]
    : originalName;
  return `${baseName} - ${date} - ${
    persons > 1 ? `${persons} ${unitPlan}s` : `1 ${unitPlan}`
  } - ${hour}`;
}
