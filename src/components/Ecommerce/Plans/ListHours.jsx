"use client";
import React, { useState, useEffect, useMemo } from "react";
import FormatHour from "./FormatHour";

export default function ListHours({
  horarios,
  blockedRanges = [],
  classNameInput = "",  
  classNameContainer = "",
  value,
  onChange,
}) {
  const [selectedHour, setSelectedHour] = useState(value || "");

  const handleHourChange = (event) => {
    const newHour = event.target.value;
    setSelectedHour(newHour);
    onChange(newHour);
  };

  const filtros = useMemo(() => {
    // convierte cada rango a minutos para comparar fácil
    return blockedRanges.map(({from, to}) => {
      const [h1,m1] = from.split(':').map(Number);
      const [h2,m2] = to.split(':').map(Number);
      return { from: h1*60 + m1, to: h2*60 + m2 };
    });
  }, [blockedRanges]);

  useEffect(() => {
    setSelectedHour(value);
  }, [value]);

  const horariosFiltrados = useMemo(() => {
    return horarios
      .map(h => {
        const [hH,mM] = h.startTime.slice(0,5).split(':').map(Number);
        return { ...h, minutes: hH*60 + mM };
      })
      .filter(h => {
        // si cae en algún rango bloqueado, lo omitimos
        return !filtros.some(r => h.minutes >= r.from && h.minutes <= r.to);
      })
      .sort((a,b) => a.minutes - b.minutes);
  }, [horarios, filtros]);

  return (
    <div className={`${classNameContainer} `}>
      <div className="font-bold text-base flex items-center gap-1 -text--dark-green">
        <span className="icon-[lucide--clock]"></span>Hora:
      </div>
      <select
        value={selectedHour}
        onChange={handleHourChange}
        aria-label="Selecciona un horario"
        className={`mt-2 p-2 border text-slate-700 border-gray-300 rounded ${classNameInput}`}
      >
        <option value="">Selecciona un horario</option>
        {horariosFiltrados?.map((horario, index) => (
          <option key={index} value={horario.startTime}>
            <FormatHour hourString={horario.startTime} />
          </option>
        ))}
      </select>
    </div>
  );
}
