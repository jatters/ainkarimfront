import Link from "next/link";

export default function PlanRecomendations({
  max_reservations,
  unitPlan,
  contactEmail,
  ventasEmail,
}) {
  if (!contactEmail) {
    return null;
  }
  return (
    <div className="p-5 border border-gray-200 rounded-md mt-8 group px-2.5 lg:px-5">
      <div className="flex items-center text-lg lg:text-2xl text-center lg:text-left font-bold gap-2 pt-2 pb-4">
        <span className="icon-[emojione--warning] group-hover:animate-pulse hidden lg:block" />
        Advertencias y Recomendaciones
      </div>
      <div className="prose">
        <p>Evite contratiempos:</p>
        <ul className="list-none lg:list-disc pl-0.5 lg:pl-6">
          <li>No habrá reembolso por incumplimiento de la reserva (ver 3.9.6 en T.C).</li>
          <li>Procure llegar 15 minutos antes de su reserva programada.</li>
          <li>No podrá reprogramar su horario de reserva en el mismo día.</li>          
          <li>
            Para reprogramación de su reserva, envíe un correo a{" "}
            <a
              href={`mailto:${contactEmail}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir correo a Ventas del Viñedo Ain Karim"
              className="hover:text-light-green hover:underline duration-200"
            >
              {contactEmail}
            </a>
          </li>
          <li>
            No está permitido el consumo de alimentos y bebidas dentro del
            Viñedo que no hayan sido adquiridos en el mismo.
          </li>
        </ul>
        <div className="mb-4 text-right">
          <Link
            href="/terminos-y-condiciones"
            className="text-xs hover:text-light-green hover:underline duration-200"
            target="_blank"
            rel="noopener"
          >
            Aplica Términos y Condiciones
          </Link>
        </div>
      </div>
    </div>
  );
}
