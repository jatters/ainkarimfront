"use client";
import React, { useState } from "react";

function formatPrice(price) {
  if (!price) return "";
  return `$${Number(price).toLocaleString("es-CO")}`;
}

function AdditionalServices({ services, onSelectService }) {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceChange = (service) => {
    setSelectedService(service);
    onSelectService(service);
  };

  return (
    <div className="pt-5">
      <div className="font-semibold text-lg sm:text-center mb-3 text-dark-green">
        ¿Vas a celebrar una ocasión especial?
      </div>
      <div className="sm:text-center text-sm">
        <p>
          Tiene un valor adicional que te incluye una tartaleta tipo postre de la casa por 18cms, porciones de 4 a 6 y
          decoración para la ocasión
        </p>
      </div>
      <div className="flex gap-5 mx-auto justify-center my-5 flex-wrap">
        {services.map((servicio, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="additionalService"
                id={`service-${index}`}
                aria-label={`Agregar ${servicio.name} como servicio adicional`}
                className="w-4 h-4 text-light-green bg-gray-100 border-gray-300 rounded-sm"
                onChange={() => handleServiceChange(servicio)}
                checked={selectedService && selectedService.documentId === servicio.documentId}
              />
              <span className="font-semibold">{servicio.name}</span>
            </div>
            <span className="text-sm">+ {formatPrice(servicio.price)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(AdditionalServices);
