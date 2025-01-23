"use client";

import React, { useEffect, useRef } from "react";
import style from "./Calendar.css";

export default function CallyDatePicker({
  value,
  onChange,
  min,
  max,
  disallowedDates,
}) {
  const calendarRef = useRef(null);

  useEffect(() => {
    //console.log("Received disallowedDates:", disallowedDates);

    // Importar "cally" solo en el cliente
    import("cally").then(() => {
      if (calendarRef.current) {
        // Definir la función para deshabilitar fechas usando las fechas deshabilitadas pasadas como prop
        calendarRef.current.isDateDisallowed = (date) => {
          const formatted = formatDateYYYYMMDD(date);
          const isDisallowed = disallowedDates.includes(formatted);
          //console.log(`isDateDisallowed llamado para ${formatted}: ${isDisallowed}`);
          return isDisallowed;
        };

        // Manejar el evento 'change'
        const handleChange = () => {
          const selectedDate = calendarRef.current.value;
          //console.log("Fecha seleccionada:", selectedDate);
          if (onChange) {
            onChange(selectedDate);
          }
        };

        // Añadir listener para el evento 'change'
        calendarRef.current.addEventListener("change", handleChange);
        //console.log("Listener 'change' añadido al calendario.");

        // Limpieza al desmontar
        return () => {
          if (calendarRef.current) {
            calendarRef.current.removeEventListener("change", handleChange);
            console.log("Listener 'change' eliminado del calendario.");
          }
        };
      }
    });
  }, [disallowedDates, onChange]);

  // Función para dar formato 'YYYY-MM-DD' a un objeto Date
  const formatDateYYYYMMDD = (dateObj) => {
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  

  return (
    <div className="calendar-container flex justify-center relative">
      <calendar-date
        ref={calendarRef}
        locale="es"
        value={value || ""}
        min={min || ""}
        max={max || ""}
        first-day-of-week="0"        
      >
        {/* Ícono para el mes anterior */}
        <svg
          aria-label="Previous"
          slot="previous"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
        </svg>

        {/* Ícono para el mes siguiente */}
        <svg
          aria-label="Next"
          slot="next"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
        </svg>

        {/* Renderizar el mes */}
        <div className="calendar">
          <calendar-month></calendar-month>
        </div>
      </calendar-date>
    </div>
  );
}
