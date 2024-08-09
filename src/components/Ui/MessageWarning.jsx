"use client";
import React, { useState } from "react";

export default function ImportantMessage() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && (
        <div className="py-3 pr-6 bg-orange-300 flex items-center justify-between">
          <span className="flex-1 text-center">
            <span className="font-bold">Importante:</span> Debes agendar y pagar
            tu reserva para poder ingresar al viñedo.
          </span>
          <button onClick={handleClose}>
            <span className="icon-[material-symbols--close] hover:rotate-180 duration-300 text-xl hover:scale-110"></span>
          </button>
        </div>
      )}
    </div>
  );
}
