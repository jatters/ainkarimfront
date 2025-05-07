import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const ConfettiWrapper = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    const result = myConfetti({
      particleCount: 400,
      spread: 360,
      origin: { x: 0.5, y: 0.1 },
      startVelocity: 40,
      gravity: 0.5,
    });

    if (result && typeof result.then === "function") {
      result.then(() => {
        myConfetti.reset();
      });
    } else {
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
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default ConfettiWrapper;
