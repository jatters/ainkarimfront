import PlanCard from "@/components/Ecommerce/PlanCard";
import { GetPlansForHome } from "../GetContentApi";
import Link from "next/link";

export default async function PlansHome() {
  const plansData = await GetPlansForHome();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!plansData) {
    console.error("Error fetching plans for home");
    return null;
  }

  return (
    <section className="container mx-auto py-8 lg:py-12 xl:py-16">
      <div className="flex justify-center lg:justify-between items-center px-5 xl:px-0">
        <div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center lg:text-left text-dark-green font-serif uppercase">
            Experiencias que inspiran
          </h2>
          <p className="text-xl mt-5 text-center lg:text-left italic">
            Vive momentos inolvidables en{" "}
            <span className="text-dark-green font-semibold">Ain Karim</span>.
          </p>
        </div>
        <div className="hidden lg:block">
          <Link
            href="/visitas"
            className="flex items-center gap-2 text-sm xl:text-base font-medium hover:text-light-green hover:translate-x-2 transition duration-200"
          >
            Ver todos nuestros planes{" "}
            <span
              className="icon-[icon-park-outline--right-small]"
              role="img"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center  mt-10 gap-x-2 gap-y-7 px-5">
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
    </section>
  );
}
