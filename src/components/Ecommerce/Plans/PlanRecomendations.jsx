import React from "react";
import Link from "next/link";

export default function PlanRecomendations({max_reservations}) {
  return (
    <div className="p-5 border -border--dark-green rounded mt-8">
      <div className="flex items-center text-2xl font-bold gap-1 pt-2 pb-4">
        <span className="icon-[emojione--warning]"></span>
        Recomendaciones:
      </div>
      <div className="">
        <p>Evite contratiempos.</p>
        <ul className="list-disc list-inside">
          <li>Procure llegar 15 minutos antes de su reserva programada.</li>
          <li>No podrá reprogramar su horario de reserva en el mismo día.</li>
          <li>
            Para reprogramación de su reserva, envíe un correo a{" "}
            <a
              href="mailto:ventas@marquesvl.com"
              target="_blank"
              className="hover:-text--light-green duration-200"
            >
              ventas@marquesvl.com
            </a>
          </li>
          <li>
            Si es un grupo de más de {max_reservations} personas, por favor
            solicite información al correo{" "}
            <a
              href="mailto:ventas@marquesvl.com"
              target="_blank"
              className="hover:-text--light-green duration-200"
            >
              ventas@marquesvl.com.
            </a>
          </li>
        </ul>
        <div className="mb-4">
          <Link
            href="/politica-de-privacidad"
            className="text-xs hover:-text--light-green duration-200"
            target="_blank"
          >
            Aplica términos y condiciones
          </Link>
        </div>
      </div>
    </div>
  );
}
