"use client";
import React, { useState } from "react";
import FormatHour from "./FormatHour";

export default function ListHours({ schedules, classNameInput, classNameContainer }) {
  const [selectedHour, setSelectedHour] = useState("");

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  return (
    <div className={classNameContainer}>
      <div className="font-bold -text--dark-green text-base flex items-center gap-1" ><span className="icon-[lucide--clock]"></span>Hora:</div>
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
      )}  */}
    </div>
  );
}
