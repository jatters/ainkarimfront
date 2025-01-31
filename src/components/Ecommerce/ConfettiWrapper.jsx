import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const ConfettiWrapper = React.forwardRef((props, ref) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        myConfetti({
          particleCount: 400,
          spread: 360,
          origin: { x: 0.5, y: 0.1 },
          startVelocity: 40,
          gravity: 0.5,
        });
      }
    }
  }, []);

  return (
    <canvas
      ref={(node) => {
        canvasRef.current = node;
        if (ref) {
          ref.current = node;
        }
      }}
      {...props}
    />
  );
});

ConfettiWrapper.displayName = "ConfettiWrapper";

export default ConfettiWrapper;
