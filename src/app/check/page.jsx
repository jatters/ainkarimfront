import { headers } from "next/headers";
import React from "react";

const token =
  "fa232d8a139559c83b7dfeccca0464ed2f59c78633f1e004144981b1da7c82d21130e8b8209f3734f8a9b5451005690d0510b79eb73a4483160193aba378519fed4cd6ed52db43af39786162f5df67a608981351b4aacc86adf6320f78f4729992e3323d6a23b335f067f6092e30c8f78c96c6aaa96213db4c0739c4748a874e";

async function GetReservas() {
  try {
    const response = await fetch(
      "http://localhost:1337/api/reservas?filters[reservationDate]=2025-02-21&populate=*&pagination[page]=1&pagination[pageSize]=100",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching reservas:", error);
    throw error;
  }
}

export default async function page() {
  const reservas = await GetReservas();

  if (!reservas || !reservas.data) {
    console.error("Error fetching reservas");
    return <div>No hay reservas</div>;
  }

  return (
    <div className="container mx-auto py-16 px-5">
      <h1>This is just for check page</h1>

    <div className="grid grid-cols-3 gap-5 ">
      {reservas.data.map((reserva) => (
        <div key={reserva.id} className="border p-5">
          <p className="font-bold">Plan: {reserva.plan.name}</p>
          <p>Fecha: {reserva.reservationDate}</p>
          <p>Invitados: {reserva.guests}</p>
          <p>Estado: {reserva.state}</p>
        </div>
      ))}
    </div>
    </div>
  );
}
