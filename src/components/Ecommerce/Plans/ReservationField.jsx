"use client";
import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "@/context/CartContext";
import ListHours from "./ListHours";
import { useRouter } from "next/navigation";
import AdditionalServices from "./AdditionalServices";

function formatHour(hourString) {
  const [hours, minutes] = hourString.split(":");
  const hour = parseInt(hours, 10);
  const formattedHour =
    hour === 0 ? "12" : hour > 12 ? hour - 12 : hour.toString();
  const period = hour >= 12 ? "pm" : "am";
  return `${formattedHour}:${minutes} ${period}`;
}

function formatPrice(price) {
  if (!price) return "";
  const formatedPrice = price.split(",")[0];
  return `$${Number(formatedPrice).toLocaleString("es-CO")}`;
}

export default function ReservationField({ schedules, plan, additionalServices }) {
  const { addToCart } = useContext(CartContext);
  const [reservationData, setReservationData] = useState({
    date: "",
    persons: 1,
    hour: "",
  });
  const [selectedService, setSelectedService] = useState(null);
  const router = useRouter();

  // Calcular las fechas mínima y máxima
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(today.getMonth() + 3);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    setMinDate(formatDate(today));
    setMaxDate(formatDate(threeMonthsFromNow));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleReserve = () => {
    const formattedHour = formatHour(reservationData.hour);
    const unitPrice = parseFloat(plan.attributes.price.replace(/[^0-9.-]+/g, ""));
    const additionalServicePrice = selectedService
      ? parseFloat(selectedService.attributes.price.replace(/[^0-9.-]+/g, ""))
      : 0;

    const productToAdd = {
      ...plan,
      reservationData: {
        ...reservationData,
        hour: formattedHour,
      },
      title: `${plan.attributes.name} - ${reservationData.date} - ${reservationData.persons} personas - ${formattedHour}`,
      Precio: unitPrice, // Precio unitario asignado
      quantity: reservationData.persons, // Asignar la cantidad de personas como la cantidad inicial
      additionalService: selectedService
        ? {
            name: selectedService.attributes.name,
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

  return (
    <div className="-bg--gray py-5 px-5 rounded-xl border shadow-md">
      <div className="font-bold text-2xl pb-4 pt-2 -text--dark-green flex gap-2 items-center">
        <span className="icon-[akar-icons--schedule]"></span>Reserva ahora
      </div>
      <div className="flex gap-x-5 gap-y-2 justify-items-center items-center flex-wrap">
        <div className="py-2 flex-1">
          <div className="font-bold -text--dark-green text-base flex items-center gap-1">
            <span className="icon-[material-symbols--calendar-month-rounded]"></span>
            Fecha:
          </div>
          <input
            type="date"
            name="date"
            value={reservationData.date}
            onChange={handleChange}
            min={minDate}  // Fecha mínima
            max={maxDate}  // Fecha máxima
            className="mt-2 p-2 border border-gray-300 rounded min-w-52 w-full"
          />
        </div>
        <div className="py-2 flex-1">
          <div className="font-bold -text--dark-green text-base flex items-center gap-1">
            <span className="icon-[ion--people]"></span>Personas:
          </div>
          <button className="-bg--dark-green/70 text-white px-3 py-2 rounded-l focus:outline-none hover:-bg--dark-green duration-200" onClick={decreasePersons}>-</button>            
          <input
            type="number"
            min={"1"}
            readOnly
            name="persons"
            value={reservationData.persons}              
            className="appearance-none border -border--dark-green/70 mt-2 w-36 px-3 py-2 text-gray-700 text-center leading-tight focus:outline-none"
          />
          <button className="-bg--dark-green/70 text-white px-3 py-2 rounded-r focus:outline-none hover:-bg--dark-green duration-200" onClick={increasePersons}>+</button>            
        </div>
        <ListHours
          schedules={schedules}
          classNameInput="min-w-52 w-full"
          classNameContainer="py-2 flex-1"
          value={reservationData.hour}
          onChange={(hour) =>
            setReservationData((prev) => ({ ...prev, hour }))
          }
        />
      </div>
      {additionalServices.length > 0 && (
        <AdditionalServices
          services={additionalServices}
          onSelectService={handleServiceSelect}
        />
      )}
      <div className="flex justify-center">
        <button
          onClick={handleReserve}
          className="-bg--dark-green text-white py-3 px-16 mt-5 hover:-bg--light-green duration-300 rounded-md"
        >
          Reservar
        </button>
      </div>
    </div>
  );
}
