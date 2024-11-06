"use client"; // Necesario porque usaremos hooks aquí
import { useState } from "react";
import SpecialServices from "@/components/Ecommerce/Plans/SpecialServices";
import ReservationField from "@/components/Ecommerce/Plans/ReservationField";

export default function ClientReservation({ plan }) {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div>
      <SpecialServices
        services={plan.servicios_adicionales.data}
        onSelectService={setSelectedService}
      />
      <ReservationField
        schedules={plan.horarios.data}
        plan={plan}
        selectedService={selectedService} 
      />
    </div>
  );
}
