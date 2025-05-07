import PlanCard from "@/components/Ecommerce/PlanCard";
import { GetPlansForHome } from "../GetContentApi";

export default async function PlansHome() {
  const plansData = await GetPlansForHome();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!plansData) {
    console.error("Error fetching plans for home");
    return <p className="text-center my-10">Error cargando planes</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center  mt-10 gap-x-2 gap-y-7">
      {plansData.slice(0, 4).map((plan) => {
        const experienciesList = plan.experiencias.map((experiencia) => ({
          id: experiencia.documentId,
          name: experiencia.name,
          alt: `Icono ${experiencia.name}`,
          iconurl: `${baseUrl}${experiencia.icon.url}`,
        }));

        return (
          <article
            className="flex flex-col pb-9 items-center shadow-lg rounded-md hover:shadow-slate-300 group"
            key={plan.documentId}
            itemScope
            itemType="https://schema.org/Reservation"
          >
            <PlanCard
              slug={`/visita/${plan.slug}`}
              name={plan.name}
              planId={plan.documentId}
              price={plan.price}
              experiences={experienciesList}
              image={plan.image}
              altimg={`Image ${plan.name}`}
              onlyadults={plan.onlyAdults}
              allowchilds={plan.allowChilds}
              horarios={plan.horarios}
              unitPlan={plan.unitPlan}
              rules={plan.reglas_planes}
              additionalServices={plan.servicios_adicionales}
              max_reservations={plan.max_reservations}
            />
          </article>
        );
      })}
    </div>
  );
}
