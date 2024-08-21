"use client";
import React, { useState } from "react";

function formatPrice(price) {
  if (!price) return "";
  const formatedPrice = price.split(",")[0];
  return `$${Number(formatedPrice).toLocaleString("es-CO")}`;
}

export default function AdditionalServices({ services, onSelectService }) {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceChange = (service) => {
    setSelectedService(service);
    onSelectService(service);
  };

  return (
    <div className="py-10">
      <div className="font-semibold text-lg text-center">
        ¿Vas a celebrar una ocasión especial?
      </div>
      <p>Tiene un valor adicional que te incluye:</p>
      <p>Una tartaleta tipo postre de la casa por 18cms.</p>
      <p>Porciones de 4 a 6</p>
      <p>Decoración para la ocasión</p>
      <div className="flex gap-5 mx-auto justify-center my-5">
        {services.map((servicio, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                name="additionalService"
                id={`service-${index}`}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                onChange={() => handleServiceChange(servicio)}
                checked={selectedService && selectedService.id === servicio.id}
              />
              <span className="font-semibold">{servicio.attributes.name}</span>
            </div>
            <span className="text-sm">
              + {formatPrice(servicio.attributes.price)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
