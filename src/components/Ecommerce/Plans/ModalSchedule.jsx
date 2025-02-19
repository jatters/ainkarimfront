"use client";
import * as React from "react";
import { useState, useContext, useEffect, useCallback } from "react";
import { CartContext } from "@/context/CartContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import CallyDatePicker from "@/components/Ecommerce/Plans/Calendar";
import ListHours from "./ListHours";
import AdditionalServices from "@/components/Ecommerce/Plans/AdditionalServices";
import { normalizeReservationForCart } from "../NormalizeReservationForCart";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Hook de debounce
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

function formatTimeForAPI(timeString) {
  return `${timeString}`;
}

export default function ModalSchedule({
  documentId,
  name,
  image,
  price,
  horarios,
  additionalServices,
  rules,
  max_reservations,
}) {
  const [open, setOpen] = useState(false);
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
  const [dateError, setDateError] = useState("");
  const [hourError, setHourError] = useState("");

  const { addToCart } = useContext(CartContext);

  const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const checkAvailableSpots = useCallback(
    async (selectedDate, selectedHour) => {
      if (!selectedDate || !selectedHour) return;

      setIsLoadingSpots(true);
      try {
        const formattedTime = formatTimeForAPI(selectedHour);
        const url = `${API_URL}/api/reservas?filters[reservationDate]=${selectedDate}&filters[reservationTime]=${formattedTime}&filters[plan][documentId][$eq]=${documentId}&populate=*`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error(
            "ModalSchedule - Error fetching reservations:",
            errorData
          );
          throw new Error(
            `Error fetching reservations: ${response.status} - ${errorData}`
          );
        }
        const data = await response.json();

        const validStates = ["Pendiente", "Confirmada"];
        const totalReservedSpots = data.data
          .filter((reservation) => validStates.includes(reservation.state))
          .reduce((acc, reservation) => acc + (reservation.guests || 0), 0);

        setAvailableSpots(max_reservations - totalReservedSpots);
      } catch (error) {
        setAvailableSpots(0);
      } finally {
        setIsLoadingSpots(false);
      }
    },
    [API_URL, token, max_reservations, documentId]
  );

  useDebouncedEffect(
    () => {
      checkAvailableSpots(reservationData.date, reservationData.hour);
    },
    [reservationData.date, reservationData.hour, checkAvailableSpots],
    300
  );

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
    const restrictedDays = rules
      .filter((regla) => regla.isDayRestric)
      .map((regla) => regla.day.toLowerCase());
    let currentDate = new Date(today);
    while (currentDate <= threeMonthsFromNow) {
      const dayOfWeek = currentDate
        .toLocaleString("es-CO", { weekday: "long" })
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
    };

    const cartItem = normalizeReservationForCart(
      {
        documentId,
        name,
        price,
        image,
        categorias_de_producto: "Plan",
        max_reservations,
      },
      selectedOptions
    );
    addToCart(cartItem);
    router.push("/carrito");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button
        onClick={handleClickOpen}
        className="flex items-center gap-1 -bg--dark-green text-white px-4 py-2 rounded hover:-bg--light-green duration-200"
      >
        <span className="icon-[iconoir--cart-plus]"></span> Reservar y pagar
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="md"
        keepMounted
        onClose={handleClose}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle className="!font-serif !font-bold !text-2xl uppercase !pt-10 text-center">
          {`Reservar ${name || "Plan"}`}
        </DialogTitle>
        <DialogContent>
          <p className="text-center font-semibold mb-5">
            Diligencia los datos de tu reserva
          </p>
          <div className="-bg--gray py-5 px-5 rounded-xl border shadow-md">
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
                  <div className="font-bold text-base flex items-center gap-1 -text--dark-green">
                    <span className="icon-[ion--people]"></span>Personas:
                  </div>
                  <div className="mt-2 w-full">
                    <div className="grid grid-cols-[2.5rem_1fr_2.5rem] w-full">
                      <button
                        className="-bg--dark-green/70 text-white rounded-l focus:outline-none hover:-bg--dark-green duration-200 h-10 flex items-center justify-center"
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
                        className="appearance-none border -border--dark-green/70 w-full text-gray-700 text-center leading-tight focus:outline-none h-10"
                      />
                      <button
                        className="-bg--dark-green/70 text-white rounded-r focus:outline-none hover:-bg--dark-green duration-200 h-10 flex items-center justify-center"
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
                    schedules={horarios}
                    classNameInput="w-full"
                    classNameContainer="flex flex-col"
                    value={reservationData.hour}
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
              <div className="text-center font-semibold mt-4 md:mt-6 bg-white py-3 rounded-md border text-sm">
                {isLoadingSpots
                  ? "Verificando disponibilidad..."
                  : availableSpots > 0
                  ? `Hay ${availableSpots} lugares disponibles en este horario`
                  : "No hay lugares disponibles en este horario"}
              </div>
            )}
            {additionalServices && (
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
                    : "-bg--dark-green text-white hover:-bg--light-green"
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
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
