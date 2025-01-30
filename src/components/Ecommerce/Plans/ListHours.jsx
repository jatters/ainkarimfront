"use client";
import React, { useState, useEffect } from "react";
import FormatHour from "./FormatHour";

export default function ListHours({
  schedules,
  classNameInput = "",
  classNameContainer = "",
  value,
  onChange,
}) {
  const [selectedHour, setSelectedHour] = useState(value || "");

  const handleHourChange = (event) => {
    const newHour = event.target.value;
    setSelectedHour(newHour);
    onChange(newHour); // Propaga la hora seleccionada hacia el componente padre
  };

  useEffect(() => {
    setSelectedHour(value); // Actualizar la hora seleccionada si cambia el valor desde el padre
  }, [value]);

  // Ordenar los horarios por startTime
  const horariosSorted = schedules?.sort(
    (a, b) =>
      new Date(`1970-01-01T${a.startTime}`) -
      new Date(`1970-01-01T${b.startTime}`)
  );

  return (
    <div className={`${classNameContainer} `}>
      <div className="font-bold text-base flex items-center gap-1 -text--dark-green">
        <span className="icon-[lucide--clock]"></span>Hora:
      </div>
      <select
        value={selectedHour}
        onChange={handleHourChange}
        aria-label="Selecciona un horario"
        className={`mt-2 p-2 border text-slate-700   border-gray-300 rounded ${classNameInput}`}
      >
        <option value="">Selecciona un horario</option>
        {horariosSorted?.map((horario, index) => (
          <option key={index} value={horario.startTime}>
            <FormatHour hourString={horario.startTime} />
          </option>
        ))}
      </select>
      {/* {selectedHour && (
        <p className="mt-2">Has seleccionado el horario: <FormatHour hourString={selectedHour}/></p>
      )} */}
    </div>
  );
}
