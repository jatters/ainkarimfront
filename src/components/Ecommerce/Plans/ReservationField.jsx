"use client";
import React, { useState, useContext } from "react";
import { CartContext } from "@/context/CartContext";
import ListHours from "./ListHours";

export default function ReservationField({ schedules, plan }) {
  const { addToCart } = useContext(CartContext);
  const [reservationData, setReservationData] = useState({
    date: "",
    persons: 1,
    hour: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReserve = () => {
    const productToAdd = {
      ...plan,
      reservationData,
      title: `${plan.attributes.name} - ${reservationData.date} - ${reservationData.persons} personas`,
      Precio: plan.attributes.price,
      quantity: reservationData.persons
    };
    addToCart(productToAdd);
  };

  if (schedules && schedules.length > 0) {
    return (
      <div className="-bg--gray py-5 px-5 rounded-xl">
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
              className="mt-2 p-2 border border-gray-300 rounded min-w-52 w-full "
            />
          </div>
          <div className="py-2 flex-1">
            <div className="font-bold -text--dark-green text-base flex items-center gap-1">
              <span className="icon-[ion--people]"></span>Personas:
            </div>
            <input
              type="number"
              name="persons"
              value={reservationData.persons}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded min-w-52 w-full text-center"
            />
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
  } else {
    return (
      <div className="-bg--gray py-5 px-5 rounded-xl">
        <div className="font-bold text-2xl pb-4 pt-2 -text--dark-green ">
          ¿Deseas Reservar?
        </div>
        <div className="py-3">Comunícate con nosotros para reservar</div>
        <div className="flex items-center gap-1 py-3 -text--dark-green">
          <span class="icon-[ph--envelope-simple-bold]"></span>
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
            className="hover:-text--light-green"
          >
            318 349 0389
          </a>
        </div>
      </div>
    );
  }
}
