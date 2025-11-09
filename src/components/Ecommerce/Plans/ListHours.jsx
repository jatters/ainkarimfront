"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  ChangeEvent,
} from "react";
import { parseISO, isSameDay } from "date-fns";
import FormatHour from "./FormatHour";

const hhmmToMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export default function ListHours({
  horarios,
  blockedRanges = [],
  classNameInput = "",
  classNameContainer = "",
  value = "",
  onChange,
  reservationDate,
}) {
  const [selectedHour, setSelectedHour] = useState(value);

  const filtros = useMemo(() => {
    return blockedRanges.map(({ from, to }) => ({
      from: hhmmToMinutes(from),
      to: hhmmToMinutes(to),
    }));
  }, [blockedRanges]);

  const currentMinutes = useMemo(() => {
    if (!reservationDate) return null;
    const today = new Date();
    const selected = parseISO(reservationDate);
    return isSameDay(today, selected)
      ? today.getHours() * 60 + today.getMinutes()
      : null;
  }, [reservationDate]);

  const horariosFiltrados = useMemo(() => {
    return horarios
      .map((h) => {
        const minutes = hhmmToMinutes(h.startTime.slice(0, 5));
        return { ...h, minutes };
      })
      .filter(({ minutes }) => {
        if (filtros.some((r) => minutes >= r.from && minutes <= r.to))
          return false;

        if (currentMinutes !== null && minutes <= currentMinutes) return false;
        return true;
      })
      .sort((a, b) => a.minutes - b.minutes);
  }, [horarios, filtros, currentMinutes]);

  useEffect(() => {
    if (
      selectedHour &&
      !horariosFiltrados.some((h) => h.startTime === selectedHour)
    ) {
      setSelectedHour("");
      onChange("");
    }
  }, [horariosFiltrados, selectedHour, onChange]);

  useEffect(() => {
    setSelectedHour(value);
  }, [value]);

  const handleHourChange = useCallback(
    (e) => {
      const newHour = e.target.value;
      setSelectedHour(newHour);
      onChange(newHour);
    },
    [onChange]
  );

  return (
    <div className={classNameContainer}>
      <div className="font-bold text-base flex items-center gap-1 text-dark-green">
        <span className="icon-[lucide--clock]" /> Hora:
      </div>

      <select
        value={selectedHour}
        onChange={handleHourChange}
        aria-label="Selecciona un horario"
        className={`mt-2 p-2 border text-slate-700 border-gray-300 bg-white focus:outline-none active:outline-none rounded-sm ${classNameInput}`}
        disabled={!horariosFiltrados.length}
      >
        <option value="">Selecciona un horario</option>
        {horariosFiltrados.map(({ startTime }, idx) => (
          <option key={idx} value={startTime}>
            <FormatHour hourString={startTime} />
          </option>
        ))}
      </select>
    </div>
  );
}