import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const ConfettiWrapper = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Crea una instancia de confetti usando tu canvas
    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,    // redimensiona canvas si cambia el viewport
      useWorker: true, // si el navegador lo soporta, anima en un web worker
    });

    // Dispara la animación
    const result = myConfetti({
      particleCount: 400,
      spread: 360,
      origin: { x: 0.5, y: 0.1 },
      startVelocity: 40,
      gravity: 0.5,
    });

    // Si el navegador soporta Promises, `result` será una promesa.
    if (result && typeof result.then === "function") {
      result.then(() => {
        // Cuando la animación completa, reseteamos (opcional)
        myConfetti.reset();
        // O directamente removemos el canvas:
        // canvasRef.current.remove();

        // Si quieres un retardo para que
        // el confeti se quede unos segunditos
        // setTimeout(() => canvasRef.current.remove(), 2000);
      });
    } else {
      // Si no soporta promesas (IE) podemos usar un setTimeout
      setTimeout(() => {
        myConfetti.reset();
      }, 3000);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: 'none', // se puede usar, pero si no te funciona, la promesa es más fiable
        zIndex: 9999, 
      }}
    />
  );
};

export default ConfettiWrapper;
