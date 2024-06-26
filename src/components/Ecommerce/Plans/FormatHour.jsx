import React from "react";

export default function FormatHour({ hourString }) {
  const date = new Date(`2000-01-01T${hourString}`);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = String(minutes).padStart(2, "0");

  return <>{`${formattedHours}:${formattedMinutes} ${amPm}`}</>;
}
