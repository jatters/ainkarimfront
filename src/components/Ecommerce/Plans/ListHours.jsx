"use client";
import React, { useState, useEffect } from "react";
import FormatHour from "./FormatHour";

export default function ListHours({ schedules, classNameInput, classNameContainer, value, onChange }) {
  const [selectedHour, setSelectedHour] = useState(value || "");

  const handleHourChange = (event) => {
    const newHour = event.target.value;
    setSelectedHour(newHour);
    onChange(newHour); // Propaga la hora seleccionada hacia el componente padre
  };

  useEffect(() => {
    setSelectedHour(value); // Actualizar la hora seleccionada si cambia el valor desde el padre
  }, [value]);

  return (
    <div className={classNameContainer}>
      <div className="font-bold -text--dark-green text-base flex items-center gap-1">
        <span className="icon-[lucide--clock]"></span>Hora:
      </div>
      <select
        value={selectedHour}
        onChange={handleHourChange}
        className={`mt-2 p-2 border border-gray-300 rounded ${classNameInput}`}
      >
        <option value="">Selecciona un horario</option>
        {schedules.map((schedule, index) => (
          <option key={index} value={schedule.attributes.startTime}>
            <FormatHour hourString={schedule.attributes.startTime} />
          </option>
        ))}
      </select>
      {/* {selectedHour && (
        <p className="mt-2">Has seleccionado el horario: <FormatHour hourString={selectedHour}/></p>
      )} */}
    </div>
  );
}
