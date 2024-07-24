"use client";
import * as React from "react";
import { useState, useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ListHours from "./ListHours";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalSchedule({ PlanTitle, schedules, plan }) {
  const [open, setOpen] = useState(false);
  const { addToCart } = useContext(CartContext);

  const [reservationData, setReservationData] = useState({
    date: "",
    persons: 1,
    hour: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReserve = () => {
    const productToAdd = {
      ...plan,
      reservationData,
    };
    addToCart(productToAdd);
    handleClose();
  };

  return (
    <React.Fragment>
      <button
        onClick={handleClickOpen}
        className="flex items-center gap-1 -bg--dark-green text-white px-6 py-3 rounded hover:-bg--light-green duration-300"
      >
        <span className="icon-[iconoir--cart-plus]"></span> Reservar Ahora
      </button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Reservar ${PlanTitle ? PlanTitle : ""}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <p className="text-center">Diligencia los datos para realizar tu reserva</p>
            <div className="-bg--gray py-5 px-5 rounded-xl">
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
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
