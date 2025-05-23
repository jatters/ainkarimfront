"use client";

import React, { useEffect, useRef } from "react";
import style from "./Calendar.css";

function today() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function useCallyCalendar(disallowedDates, onChange) {
  const calendarRef = useRef(null);

  const formatDateYYYYMMDD = (dateObj) => {
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    import("cally").then(() => {
      if (calendarRef.current) {
        calendarRef.current.isDateDisallowed = (date) => {
          const formatted = formatDateYYYYMMDD(date);
          return disallowedDates.includes(formatted);
        };

        const handleChange = () => {
          const selectedDate = calendarRef.current.value;
          if (onChange) {
            onChange(selectedDate);
          }
        };

        calendarRef.current.addEventListener("change", handleChange);

        return () => {
          if (calendarRef.current) {
            calendarRef.current.removeEventListener("change", handleChange);
          }
        };
      }
    });
  }, [disallowedDates, onChange]);

  return calendarRef;
}

export default function CallyDatePicker({
  value,
  onChange,
  min,
  max,
  disallowedDates,
}) {
  const calendarRef = useCallyCalendar(disallowedDates, onChange);
  const zonaHoraria = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="calendar-container relative">
      {/* {console.log("zonaHoraria", zonaHoraria)}
      {console.log("value", today())} */}
      <calendar-date
        ref={calendarRef}
        locale="es-CO"
        //value={today()}
        min={today()}
        max={max || ""}
        first-day-of-week="0"
      >
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
        <div className="calendar">
          <calendar-month></calendar-month>
        </div>
      </calendar-date>
    </div>
  );
}
