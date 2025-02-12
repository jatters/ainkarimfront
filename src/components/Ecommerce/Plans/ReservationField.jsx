"use client";

import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "@/context/CartContext";
import ListHours from "./ListHours";
import { useRouter } from "next/navigation";
import AdditionalServices from "./AdditionalServices";
import CallyDatePicker from "@/components/Ecommerce/Plans/Calendar";
import { normalizeReservationForCart } from "@/components/Ecommerce/NormalizeReservationForCart";

function formatHour(hourString) {
  const [hours, minutes] = hourString.split(":");
  const hour = parseInt(hours, 10);
  const formattedHour =
    hour === 0 ? "12" : hour > 12 ? hour - 12 : hour.toString();
  const period = hour >= 12 ? "pm" : "am";
  return `${formattedHour}:${minutes} ${period}`;
}

export default function ReservationField({
  documentId,
  name,
  image,
  price,
  horarios,
  additionalServices,
  rules,
}) {
  const { addToCart } = useContext(CartContext);
  const [dateError, setDateError] = useState("");
  const [hourError, setHourError] = useState("");
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
  const [error, setError] = useState("");

  useEffect(() => {
    const today = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(today.getMonth() + 3);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const restrictedDates = [];

    // Reglas de rango de fechas
    rules.forEach((regla) => {
      if (regla.isRangeData) {
        let current = new Date(regla.rangeDateFrom);
        const until = new Date(regla.rangeDateUntil);

        while (current <= until) {
          restrictedDates.push(formatDate(current));
          current.setDate(current.getDate() + 1);
        }
      }
    });

    // Reglas de días restringidos
    const restrictedDays = rules
      .filter((regla) => regla.isDayRestric)
      .map((regla) => regla.day.toLowerCase());

    let currentDate = new Date(today);
    while (currentDate <= threeMonthsFromNow) {
      const dayOfWeek = currentDate
        .toLocaleString("es-CO", {
          weekday: "long",
        })
        .toLowerCase();

      if (restrictedDays.includes(dayOfWeek)) {
        restrictedDates.push(formatDate(currentDate));
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    setMinDate(formatDate(today));
    setMaxDate(formatDate(threeMonthsFromNow));
    setDisabledDates(restrictedDates);
  }, [rules]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleReserve = () => {
    // Validaciones (fecha, hora, etc.)
    if (!reservationData.date) { setDateError("Por favor selecciona una fecha disponible."); return; }
    if (!reservationData.hour) { setHourError("Por favor selecciona una hora disponible."); return; }
    if (disabledDates.includes(reservationData.date)) { setDateError("La fecha seleccionada no está disponible. Elige otra."); return; }
    
    const selectedOptions = {
      date: reservationData.date,
      hour: reservationData.hour,
      persons: reservationData.persons,
      additionalService: selectedService, // Si se ha seleccionado
    };
  
    const cartItem = normalizeReservationForCart(
      {
        documentId,
        name, // o plan.name si lo llamas así
        price,
        image,
        categorias_de_producto:"Plan",
      },
      selectedOptions
    );
    addToCart(cartItem);
    router.push("/carrito");
  };

  const increasePersons = () => {
    setReservationData((prev) => ({
      ...prev,
      persons: prev.persons + 1,
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
      <div className="-bg--gray py-5 px-2 sm:px-5 rounded-xl border shadow-md">
        <div className="font-bold text-2xl pb-4 pt-2 -text--dark-green flex gap-2 items-center">
          <span className="icon-[akar-icons--schedule]"></span>Reserva ahora
        </div>

        {/* -- Fila de inputs -- */}
        <div className="flex gap-x-0 sm:gap-x-3 gap-y-2 justify-center justify-items-center items-center flex-wrap">
          {/* Fecha (con el DatePicker) */}
          <div className="py-2 flex-1 mx-auto">
            <div className="font-bold -text--dark-green text-base flex items-center gap-1 mb-5 ">
              <span className="icon-[material-symbols--calendar-month-rounded]"></span>
              Selecciona la fecha:
            </div>
            <CallyDatePicker
              value={reservationData.date}
              onChange={(newDate) => {
                setReservationData((prev) => ({ ...prev, date: newDate }));
                if (disabledDates.includes(newDate)) {
                  setError(
                    "La fecha seleccionada no está disponible. Por favor, elige otra."
                  );
                } else {
                  setError("");
                }
              }}
              min={minDate}
              max={maxDate}
              disallowedDates={disabledDates}
            />

            {dateError && (
              <div className="text-sm text-red-600 mt-1 pl-12 max-w-64 break-words">{dateError}</div>
            )}
          </div>

          {/* Personas */}
          <div className="flex flex-col gap-y-2 mx-auto">
            <div className="py-2 flex-1 items-center">
              <div className="font-bold -text--dark-green text-base flex items-center gap-1">
                <span className="icon-[ion--people]"></span>Personas:
              </div>
              <div className="flex items-center mt-2">
                <button
                  className="-bg--dark-green/70 text-white px-3 py-2 rounded-l focus:outline-none hover:-bg--dark-green duration-200"
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
                  className="appearance-none border -border--dark-green/70 w-full px-3 py-2 h-10 text-gray-700 text-center leading-tight focus:outline-none"
                />
                <button
                  className="-bg--dark-green/70 text-white px-3 py-2 rounded-r focus:outline-none hover:-bg--dark-green duration-200"
                  onClick={increasePersons}
                  aria-label="Aumentar cantidad de personas"
                >
                  +
                </button>
              </div>
            </div>

            {/* Horas */}
            {/* <ListHours
              schedules={horarios}
              classNameInput="w-full"
              classNameContainer="py-2 flex-1 items-center"
              value={reservationData.hour}
              onChange={(hour) =>
                setReservationData((prev) => ({ ...prev, hour }))
              }
            /> */}
            <ListHours
              schedules={horarios}
              classNameInput="w-full"
              classNameContainer="py-2 flex-1 items-center"
              value={reservationData.hour}
              onChange={(hour) => {
                setReservationData((prev) => ({ ...prev, hour }));
                if (!hour) {
                  setError("Por favor selecciona una hora disponible.");
                } else {
                  setError("");
                }
              }}
            />
            {hourError && (
              <div className="text-sm text-red-600 pl-1">{hourError}</div>
            )}
          </div>
        </div>

        {/* Servicios adicionales */}
        {additionalServices && (
          <AdditionalServices
            services={additionalServices}
            onSelectService={handleServiceSelect}
          />
        )}

        {/* Botón Reservar */}
        <div className="flex justify-center">
          <button
            onClick={handleReserve}
            className="-bg--dark-green text-white py-3 px-16 mt-5 hover:-bg--light-green duration-300 rounded-md"
            aria-label="Reservar"
          >
            Reservar
          </button>
        </div>
      </div>
    );
  } else {
    // Si no hay horarios, muestra una sección distinta
    return (
      <div className="-bg--gray py-5 px-5 rounded-xl">
        <div className="font-bold text-2xl pb-4 pt-2 -text--dark-green ">
          ¿Deseas Reservar?
        </div>
        <div className="pb-3">Comunícate con nosotros para reservar</div>
        <div className="flex items-center gap-1 py-3 -text--dark-green">
          <span className="icon-[ph--envelope-simple-bold]"></span>
          <span className="font-bold">Correo:</span>
          <a
            href="mailto:ventas@marquesvl.com"
            className="hover:-text--light-green hover:underline duration-200"
            aria-label="Enviar correo a Viñedo Ain Karim"
          >
            ventas@marquesvl.com
          </a>
        </div>
        <div className="flex items-center gap-1 pb-6 -text--dark-green">
          <span className="icon-[akar-icons--whatsapp-fill]"></span>
          <span className="font-bold">Whatsapp:</span>
          <a
            href="https://api.whatsapp.com/send?phone=573183490389"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Iniciar chat por Whatsapp con el Viñedo Ain Karim"
            className="hover:-text--light-green duration-200"
          >
            318 349 0389
          </a>
        </div>
      </div>
    );
  }
}
