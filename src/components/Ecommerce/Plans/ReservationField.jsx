"use client";

import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "@/context/CartContext";
import ListHours from "./ListHours";
import { useRouter } from "next/navigation";
import AdditionalServices from "./AdditionalServices";
import CallyDatePicker from "@/components/Ecommerce/Plans/Calendar"; // Ajusta la ruta según tu estructura

function formatHour(hourString) {
  const [hours, minutes] = hourString.split(":");
  const hour = parseInt(hours, 10);
  const formattedHour =
    hour === 0 ? "12" : hour > 12 ? hour - 12 : hour.toString();
  const period = hour >= 12 ? "pm" : "am";
  return `${formattedHour}:${minutes} ${period}`;
}

export default function ReservationField({
  name,
  price,
  horarios,
  additionalServices,
  rules,
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
    if (!reservationData.date) {
      setError("Por favor selecciona una fecha disponible.");
      return;
    }
    // Si la fecha está en disabledDates, también es un error
    if (disabledDates.includes(reservationData.date)) {
      setError(
        "La fecha seleccionada no está disponible. Por favor, elige otra fecha."
      );
      return;
    }

    setError(""); // Limpia error si todo bien

    const formattedHour = formatHour(reservationData.hour);
    const unitPrice = price;
    const additionalServicePrice = selectedService ? selectedService.price : 0;

    const productToAdd = {
      name,
      reservationData: {
        ...reservationData,
        hour: formattedHour,
      },
      title: `${name} - ${reservationData.date} - ${reservationData.persons} personas - ${formattedHour}`,
      Precio: unitPrice,
      quantity: reservationData.persons,
      additionalService: selectedService
        ? {
            name: selectedService.name,
            price: additionalServicePrice,
          }
        : null,
    };

    addToCart(productToAdd);
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
      <div className="-bg--gray py-5 px-5 rounded-xl border shadow-md">
        <div className="font-bold text-2xl pb-4 pt-2 -text--dark-green flex gap-2 items-center">
          <span className="icon-[akar-icons--schedule]"></span>Reserva ahora
        </div>

        {/* -- Fila de inputs -- */}
        <div className="flex gap-x-5 gap-y-2 justify-items-center items-center flex-wrap">
          {/* Fecha (con el DatePicker) */}
          <div className="py-2 flex-1">
            <div className="font-bold -text--dark-green text-base flex items-center gap-1">
              <span className="icon-[material-symbols--calendar-month-rounded]"></span>
              Fecha:
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

            {error && (
              <div className="text-sm text-red-600 mt-1 pl-1">{error}</div>
            )}
          </div>

          {/* Personas */}
          <div className="py-2 flex-1">
            <div className="font-bold -text--dark-green text-base flex items-center gap-1">
              <span className="icon-[ion--people]"></span>Personas:
            </div>
            <div className="flex items-center">
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
                className="appearance-none border -border--dark-green/70 w-full px-3 py-2 text-gray-700 text-center leading-tight focus:outline-none"
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
          <ListHours
            schedules={horarios}
            classNameInput="w-full"
            classNameContainer="py-2 flex-1"
            value={reservationData.hour}
            onChange={(hour) =>
              setReservationData((prev) => ({ ...prev, hour }))
            }
          />
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
        <div className="py-3">Comunícate con nosotros para reservar</div>
        <div className="flex items-center gap-1 py-3 -text--dark-green">
          <span className="icon-[ph--envelope-simple-bold]"></span>
          <span className="font-bold">Correo:</span>
          <a
            href="mailto:ventas@marquesvl.com"
            className="hover:-text--light-green"
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
            aria-label="Ir al Whatsapp de Viñedo Ain Karim"
            className="hover:-text--light-green"
          >
            318 349 0389
          </a>
        </div>
      </div>
    );
  }
}
