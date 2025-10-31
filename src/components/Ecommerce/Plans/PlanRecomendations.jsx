import { Link } from "next-view-transitions";

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
    <div className="p-5 border -border--dark-green rounded-md mt-8 group">
      <div className="flex items-center text-2xl font-bold gap-2 pt-2 pb-4">
        <span className="icon-[emojione--warning] group-hover:animate-pulse" />
        Advertencias y Recomendaciones
      </div>
      <div className="space-y-3">
        <p>Evite contratiempos:</p>
        <ul className="list-disc list-inside">
          <li>No habrá reembolso por incumplimiento de la reserva (ver 3.9.6).</li>
          <li>Procure llegar 15 minutos antes de su reserva programada.</li>
          <li>No podrá reprogramar su horario de reserva en el mismo día.</li>          
          <li>
            Para reprogramación de su reserva, envíe un correo a{" "}
            <a
              href={`mailto:${contactEmail}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir correo a Ventas del Viñedo Ain Karim"
              className="hover:-text--light-green hover:underline duration-200"
            >
              {contactEmail}
            </a>
          </li>
          <li>
            No está permitido el consumo de alimentos y bebidas dentro del
            Viñedo que no hayan sido adquiridos en el mismo.
          </li>
          {max_reservations > 1 && (
            <li>
              Si es un grupo de más de {max_reservations} {unitPlan.toLowerCase()}
              s, por favor solicite información al correo{" "}
              <a
                href={`mailto:${contactEmail}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir correo a Viñedo Ain Karim"
              className="hover:-text--light-green hover:underline duration-200"
            >
              {contactEmail}
            </a>
          </li>
          )}
        </ul>
        <div className="mb-4">
          <Link
            href="/terminos-y-condiciones"
            className="text-xs hover:-text--light-green hover:underline duration-200"
            target="_blank"
            rel="noopener"
          >
            Aplica términos y condiciones
          </Link>
        </div>
      </div>
    </div>
  );
}
