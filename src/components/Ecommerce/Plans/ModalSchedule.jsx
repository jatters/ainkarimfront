"use client";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/context/CartContext";
import Dialog from "@mui/material/Dialog";
//import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ListHours from "./ListHours";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function formatHour(hourString) {
  const [hour, minute] = hourString.split(":");
  const hourInt = parseInt(hour, 10);
  const period = hourInt >= 12 ? "pm" : "am";
  const formattedHour = hourInt % 12 || 12;

  return `${formattedHour}:${minute}${period}`;
}

export default function ModalSchedule({ title,price, schedules, plan, rules }) {
  const [open, setOpen] = useState(false);
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  const [reservationData, setReservationData] = useState({
    date: "",
    persons: 1,
    hour: "",
  });

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

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

    setMinDate(formatDate(today));
    setMaxDate(formatDate(threeMonthsFromNow));
  }, []);

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
    const formattedHour = formatHour(reservationData.hour);
    const productToAdd = {
      title: `${title} - ${reservationData.date} - ${reservationData.persons} personas - ${formattedHour}`,
      reservationData: {
        ...reservationData,
        hour: formattedHour,
      },
      name: title, // Solo guarda el nombre del plan.
      Precio: parseInt(price.replace("$", "").replace(".", ""), 10),
      quantity: reservationData.persons,
    };
    addToCart(productToAdd);
    handleClose();
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
    <React.Fragment>
      <button
        onClick={handleClickOpen}
        className="flex items-center gap-1 -bg--dark-green text-white px-6 py-3 rounded hover:-bg--light-green duration-200"
      >
        <span className="icon-[iconoir--cart-plus]"></span> Reservar y pagar
      </button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
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
        <DialogTitle className="!font-serif !font-bold !text-2xl uppercase !pt-10 text-center">{`Reservar ${
          title && title
        }`}</DialogTitle>
        <DialogContent>
          
            <p className="text-center font-semibold mb-5">
              Diligencia los datos para realizar tu reserva
            </p>
            <div className="-bg--gray py-5 px-5 rounded-xl border shadow-md">
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
                    min={minDate}
                    max={maxDate}
                    aria-label="Fecha de la reserva"
                    className="mt-2 p-2 border border-gray-300 rounded min-w-52 w-full"
                  />
                </div>
                <div className="py-2 flex-1">
                  <div className="font-bold -text--dark-green text-base flex items-center gap-1">
                    <span className="icon-[ion--people]"></span>Personas:
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-slate-200 text-gray-700 px-3 mt-2 py-2 rounded-l focus:outline-none hover:bg-slate-300"
                      onClick={decreasePersons}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      name="persons"
                      value={reservationData.persons}
                      readOnly
                      aria-label="Número de personas"
                      className="appearance-none border border-slate-200 mt-2 w-36 px-3 py-2 text-gray-700 text-center leading-tight focus:outline-none"
                    />
                    <button
                      className="bg-slate-200 text-gray-700 px-3 mt-2 py-2 rounded-r focus:outline-none hover:bg-slate-300"
                      onClick={increasePersons}
                    >
                      +
                    </button>
                  </div>
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
                  Ir a pagar
                </button>
              </div>
            </div>
          
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
