"use client";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { CartContext } from "@/context/CartContext";
import ListHours from "./ListHours";
import { useRouter } from "next/navigation";
import AdditionalServices from "./AdditionalServices";
import CallyDatePicker from "@/components/Ecommerce/Plans/Calendar";
import { normalizeReservationForCart } from "@/components/Ecommerce/NormalizeReservationForCart";
import toast from "react-hot-toast";
import { GetUsedSpotsInPlan } from "@/components/GetContentApi";
import { addMonths } from "date-fns";

function useDebouncedEffect(effect, deps, delay) {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);
    return () => clearTimeout(handler);
  }, [...deps, delay]);
}

function formatHour(hourString) {
  const [hours, minutes] = hourString.split(":");
  const hour = parseInt(hours, 10);
  const formattedHour =
    hour === 0 ? "12" : hour > 12 ? hour - 12 : hour.toString();
  const period = hour >= 12 ? "pm" : "am";
  return `${formattedHour}:${minutes} ${period}`;
}
const formatDateForToast = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString + "T00:00:00Z");
  const month = date.toLocaleString("es-CO", { month: "long" });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);
  return `${monthCapitalized} ${day} de ${year}`;
};

export default function ReservationField({
  documentId,
  name,
  image,
  price,
  horarios,
  additionalServices,
  rules,
  unitPlan,
  max_reservations,
  contactEmail,
}) {
  const { addToCart } = useContext(CartContext);
  const [reservationData, setReservationData] = useState({
    date: "",
    persons: 1,
    hour: "",
  });
  const [selectedService, setSelectedService] = useState(null);
  const router = useRouter();

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [disabledDates, setDisabledDates] = useState([]);
  const [errors, setErrors] = useState({ date: "", hour: "" });
  const [availableSpots, setAvailableSpots] = useState(max_reservations);
  const [isLoadingSpots, setIsLoadingSpots] = useState(false);
  const [blockedTimeRanges, setBlockedTimeRanges] = useState({});

  const checkAvailableSpots = useCallback(
    async (selectedDate, selectedHour) => {
      if (!selectedDate || !selectedHour) return;

      setIsLoadingSpots(true);
      try {
        const data = await GetUsedSpotsInPlan(
          selectedDate,
          selectedHour,
          documentId
        );
        const totalReservedSpots = data.reduce(
          (acc, reservation) => acc + (reservation.guests || 0),
          0
        );
        const horarioSeleccionado = horarios.find(
          (h) => h.startTime === selectedHour
        );

        const capacidadHorario = horarioSeleccionado?.capacity || 0;

        setAvailableSpots(capacidadHorario - totalReservedSpots);
      } catch (error) {
        setAvailableSpots(0);
      } finally {
        setIsLoadingSpots(false);
      }
    },
    [documentId, horarios, reservationData.hour]
  );

  useDebouncedEffect(
    () => {
      checkAvailableSpots(reservationData.date, reservationData.hour);
    },
    [reservationData.date, reservationData.hour, checkAvailableSpots],
    300
  );

  const formatYMD = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  useEffect(() => {
    const disabledSet = new Set();
    const timeRanges = {};
    const today = new Date();
    const threeMonths = addMonths(today, 3);

    setMinDate(formatYMD(today));
    setMaxDate(formatYMD(threeMonths));

    const blockWeekday = (dayName) => {
      const mapDow = {
        domingo: 0,
        lunes: 1,
        martes: 2,
        miercoles: 3,
        jueves: 4,
        viernes: 5,
        sabado: 6,
      };
      const target = mapDow[dayName.toLowerCase()];
      let cur = new Date(today);
      while (cur <= threeMonths) {
        if (cur.getDay() === target) disabledSet.add(formatYMD(cur));
        cur.setDate(cur.getDate() + 1);
      }
    };

    const blockDateRange = (from, to) => {
      let cur = toLocalDate(from);
      const until = toLocalDate(to);

      while (cur <= until) {
        disabledSet.add(formatYMD(cur));
        cur.setDate(cur.getDate() + 1);
      }
    };

    const toLocalDate = (ymd) => {
      const [year, month, day] = ymd.split("-").map(Number);
      return new Date(year, month - 1, day);
    };

    const blockTimeRange = (fromYMD, toYMD, fromHour, toHour) => {
      let cur = toLocalDate(fromYMD);
      const end = toLocalDate(toYMD);
      while (cur <= end) {
        const ymd = formatYMD(cur);
        if (!timeRanges[ymd]) timeRanges[ymd] = [];
        const from = fromHour.slice(0, 5);
        const to = toHour.slice(0, 5);
        timeRanges[ymd].push({ from, to });
        cur.setDate(cur.getDate() + 1);
      }
    };

    rules.forEach((rule) => {
      if (!rule.isActive) return;
      (rule.Reglas || []).forEach((comp) => {
        switch (comp.__component) {
          case "reglas.dia-restringido":
            blockWeekday(comp.restrictedDay);
            break;

          case "reglas.regla-rango-de-fecha":
            blockDateRange(comp.startDate, comp.endDate);
            break;

          case "reglas.rango-de-hora":
            blockTimeRange(
              comp.startDate,
              comp.endDate,
              comp.startTime,
              comp.endTime
            );
            break;

          default:
            console.warn("Componente desconocido:", comp.__component);
        }
      });
    });

    setDisabledDates(Array.from(disabledSet));
    setBlockedTimeRanges(timeRanges);
  }, [rules]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleReserve = () => {
    if (!reservationData.date) {
      setErrors((prev) => ({
        ...prev,
        date: "Selecciona una fecha disponible",
      }));
      return;
    }
    if (!reservationData.hour) {
      setErrors((prev) => ({ ...prev, hour: "Debes seleccionar una hora." }));
      return;
    }

    if (disabledDates.includes(reservationData.date)) {
      setErrors((prev) => ({
        ...prev,
        date: "La fecha seleccionada no está disponible. Elige otra.",
      }));
      return;
    }

    const selectedOptions = {
      date: reservationData.date,
      hour: reservationData.hour,
      persons: reservationData.persons,
      additionalService: selectedService,
      availableSpots: availableSpots,
      unitPlan,
    };

    const cartItem = normalizeReservationForCart(
      {
        documentId,
        name,
        price,
        image,
        unitPlan,
        categorias_de_producto: "Plan",
        max_reservations,
      },
      selectedOptions
    );
    addToCart(cartItem);
    router.push("/carrito");
    toast.custom((t) => {
      return (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } relative max-w-sm w-[290px] bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}
        >
          <div className="p-2">
            <div className="flex items-start">
              <div className="shrink-0 pt-[2px] text-gray-600">
                <span
                  className="icon-[bx--calendar] text-light-green"
                  role="img"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-2 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{`Agregaste al carrito una reserva para ${formatDateForToast(
                  reservationData.date
                )}, a las ${formatHour(reservationData.hour)}, para ${
                  reservationData.persons > 1
                    ? `${reservationData.persons} personas`
                    : `${reservationData.persons} persona`
                } en el ${name}`}</p>
                <div className="mt-1 flex justify-end space-x-7"></div>
              </div>
              <div className="ml-3 shrink-0 flex">
                <button
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => toast.dismiss(t.id)}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const increasePersons = () => {
    setReservationData((prev) => ({
      ...prev,
      persons: prev.persons < availableSpots ? prev.persons + 1 : prev.persons,
    }));
  };

  const decreasePersons = () => {
    setReservationData((prev) => ({
      ...prev,
      persons: prev.persons > 1 ? prev.persons - 1 : prev.persons,
    }));
  };

  if (horarios && horarios.length > 0) {
    return (
      <div className="bg-gray py-2 px-2 xl:px-5 rounded-xl border border-gray-200 shadow-md">
        <div className="font-bold text-xl pb-4 pt-2 text-dark-green flex gap-2 items-center">
          <span className="icon-[akar-icons--schedule]"></span>Reserva ahora
        </div>
        <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
          <div className="w-full md:w-auto py-2 flex flex-col gap-3 items-center">
            <div className="font-bold text-base flex items-center gap-1 text-dark-green">
              <span className="icon-[material-symbols--calendar-month-rounded]"></span>
              Selecciona la fecha
            </div>
            <CallyDatePicker
              value={reservationData.date}
              onChange={(newDate) => {
                setReservationData((prev) => ({ ...prev, date: newDate }));
                if (disabledDates.includes(newDate)) {
                  setErrors((prev) => ({
                    ...prev,
                    date: "Fecha no disponible. Selecciona otra.",
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, date: "" }));
                }
              }}
              min={minDate}
              max={maxDate}
              disallowedDates={disabledDates}
            />

            {errors.date && (
              <div className="text-sm text-red-600 font-medium">
                {errors.date}
              </div>
            )}
          </div>

          <div className="w-full md:w-64 flex flex-col space-y-4">
            <div className="flex flex-col">
              <div className="font-bold text-base flex items-center gap-1 text-dark-green">
                <span className="icon-[ion--people]"></span>
                {unitPlan}s:
              </div>
              <div className="mt-2 w-full">
                <div className="grid grid-cols-[2.5rem_1fr_2.5rem] w-full">
                  <button
                    className="bg-dark-green/70 text-white rounded-l focus:outline-hidden hover:bg-dark-green duration-200 h-10 flex items-center justify-center"
                    onClick={decreasePersons}
                    aria-label="Disminuir cantidad de personas"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    readOnly
                    name="persons"
                    value={reservationData.persons}
                    aria-label="Número de personas"
                    className="appearance-none border border-dark-green/70 bg-white w-full text-gray-700 text-center leading-tight focus:outline-hidden h-10 rounded-none"
                  />
                  <button
                    className="bg-dark-green/70 text-white rounded-r focus:outline-hidden hover:bg-dark-green duration-200 h-10 flex items-center justify-center"
                    onClick={increasePersons}
                    aria-label="Aumentar cantidad de personas"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col">              
              <ListHours
                horarios={horarios}
                blockedRanges={blockedTimeRanges[reservationData.date] || []}
                classNameInput="w-full"
                classNameContainer="flex flex-col"
                value={reservationData.hour}
                reservationDate={reservationData.date}
                onChange={(hour) => {
                  setReservationData((prev) => ({ ...prev, hour }));
                  if (!hour) {
                    setErrors((prev) => ({
                      ...prev,
                      hour: "Debes seleccionar una hora.",
                    }));
                  } else {
                    setErrors((prev) => ({ ...prev, hour: "" }));
                  }
                }}
              />
              {errors.hour && (
                <div className="text-sm font-medium text-red-600 mt-1">
                  {errors.hour}
                </div>
              )}
            </div>
          </div>
        </div>

        {reservationData.date && reservationData.hour && (
          <div className="text-center font-semibold mt-4 md:mt-6 bg-white py-3 rounded-md border border-gray-200 text-sm">
            {isLoadingSpots
              ? "Verificando disponibilidad..."
              : availableSpots > 0
              ? `Hay ${availableSpots} lugares disponibles en este horario`
              : "No hay lugares disponibles en este horario"}
          </div>
        )}

        {additionalServices.length > 0 && (
          <AdditionalServices
            services={additionalServices}
            onSelectService={handleServiceSelect}
          />
        )}

        <div className="flex justify-center flex-col items-center">
          <button
            onClick={handleReserve}
            disabled={availableSpots <= 0 || isLoadingSpots}
            className={`py-3 px-16 mt-5 rounded-md duration-300 ${
              availableSpots <= 0 || isLoadingSpots
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-dark-green text-white hover:bg-light-green"
            }`}
            aria-label="Reservar"
          >
            {isLoadingSpots ? "Verificando..." : "Reservar"}
          </button>
          {availableSpots <= 0 && (
            <p className="text-red-500 text-sm mt-2 font-semibold pb-3">
              No hay cupos disponibles en este horario
            </p>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-gray py-5 px-5 rounded-xl">
        <div className="font-bold text-2xl pb-4 pt-2 text-dark-green ">
          ¿Deseas Reservar?
        </div>
        <div className="pb-3">Comunícate con nosotros para reservar</div>
        <div className="flex items-center gap-1 py-3 text-dark-green">
          <span className="icon-[ph--envelope-simple-bold]"></span>
          <span className="font-bold">Correo:</span>
          <a
            href={`mailto:${contactEmail}`}
            className="hover:text-light-green hover:underline duration-200"
            aria-label="Enviar correo a Viñedo Ain Karim"
          >
            {contactEmail}
          </a>
        </div>
      </div>
    );
  }
}
