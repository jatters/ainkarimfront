"use client";
import { useLottie } from "lottie-react";

export default function LotttieAnimation({ animationData, loop, className }) {
  const defaultOptions = {
    animationData: animationData,
    loop: loop,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <>
      <div className={className}>
        <div className="w-full">{View}</div>
      </div>
    </>
  );
}
