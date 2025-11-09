import React from "react";
import Image from "next/image";

const CartItem = ({
  product,
  removeFromCart,
  calculateSubtotal,
  formatPrice,
}) => {
  const isReservation = !!product.reservationData;
  const {
    id,
    Precio,
    price,
    quantity = 1,
    additionalService,
    reservationData,
    image,
    title: itemTitle,
  } = product;

  const displayPrice = parseFloat(Precio || price) || 0;
  const displayQuantity = quantity;
  const subtotalPrice = calculateSubtotal(product);

  const imageUrl = image?.formats?.thumbnail?.url
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${image.formats.thumbnail.url}`
    : null;
  const altText = isReservation
    ? "Imagen no disponible para reservas"
    : image?.alternativeText || "Imagen del producto";
  const title = itemTitle || "Sin título";

  return (
    <div className="grid grid-cols-5 py-8 border-t items-center">
      {!isReservation && (
        <div className="col-span-1">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={altText}
              className="h-20 w-20 object-cover"
              width={80}
              height={80}
            />
          ) : (
            <span className="mr-2">Sin imagen</span>
          )}
        </div>
      )}
      <div className={isReservation ? "col-span-4" : "col-span-3"}>
        <div className="font-bold text-dark-green">{title}</div>
        {isReservation ? (
          <div className="text-sm text-gray-600">
            <div>
              <span className="font-semibold text-dark-green">Fecha:</span>{" "}
              {reservationData?.date || "N/A"}
            </div>
            <div>
              <span className="font-semibold text-dark-green">Hora:</span>{" "}
              {reservationData?.hour || "N/A"}
            </div>
            <div>
              <span className="font-semibold text-dark-green">Personas:</span>{" "}
              {reservationData?.persons || "N/A"}
            </div>
            <div>
              <span className="font-semibold text-dark-green">
                Precio por persona:
              </span>{" "}
              {formatPrice(displayPrice)}
            </div>
            {additionalService && (
              <div>
                <span className="font-semibold text-dark-green">
                  Adicional:
                </span>{" "}
                {additionalService.name} -{" "}
                {formatPrice(additionalService.price)}
              </div>
            )}
            <div>
              <span className="font-semibold text-dark-green">Subtotal:</span>{" "}
              {formatPrice(subtotalPrice)}
            </div>
          </div>
        ) : (
          <>
            <div className="text-sm">
              <span className="font-semibold text-dark-green">Precio:</span>{" "}
              {formatPrice(displayPrice)}
            </div>
            <div>
              <span className="font-semibold text-dark-green">Subtotal:</span>{" "}
              {formatPrice(subtotalPrice)}
            </div>
          </>
        )}
      </div>
      <div className="col-span-1 text-center">
        <div>
          <button
            onClick={() => removeFromCart(product)}
            aria-label={`Eliminar ${title}`}
          >
            <span className="icon-[mingcute--delete-2-line] text-xl hover:-text--red-cruz hover:scale-125 hover:text-light-red duration-300" />
          </button>
        </div>
        <div>
          {displayQuantity} {displayQuantity > 1 ? "unidades" : "unidad"}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
