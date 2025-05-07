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
import toast from "react-hot-toast";
import { GetUsedSpotsInPlan } from "@/components/GetContentApi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
const formatFecha = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString + "T00:00:00Z");
  const month = date.toLocaleString("es-CO", { month: "long" });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);
  return `${monthCapitalized} ${day} de ${year}`;
};

export default function ModalSchedule({
  documentId,
  name,
  image,
  price,
  unitPlan,
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
        setAvailableSpots(max_reservations - totalReservedSpots);
      } catch (error) {
        console.error("Error checking available spots:", error);
        setAvailableSpots(0);
      } finally {
        setIsLoadingSpots(false);
      }
    },
    [documentId, max_reservations]
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
              <div className="flex-shrink-0 pt-[2px] text-gray-600">
                <span
                  className="icon-[bx--calendar] -text--light-green"
                  role="img"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-2 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{`Agregaste al carrito una reserva para ${formatFecha(
                  reservationData.date
                )}, a las ${formatHour(reservationData.hour)}, para ${
                  reservationData.persons > 1
                    ? `${reservationData.persons} personas`
                    : `${reservationData.persons} persona`
                } en el ${name}`}</p>
                <div className="mt-1 flex justify-end space-x-7"></div>
              </div>
              <div className="ml-3 flex-shrink-0 flex">
                <button
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                    <span className="icon-[ion--people]"></span>
                    {unitPlan}s:
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
                    horarios={horarios}
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
