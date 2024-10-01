import PlanCard from "@/components/Ecommerce/PlanCard";
import { GetPlansForHome } from "../GetContentApi";

const formatPrice = (price) => {
  if (!price) return "";
  const formatedPrice = String(price);
  return `$${Number(formatedPrice).toLocaleString("es-CO")}`;
};

export default async function PlansHome() {
  const plansData = await GetPlansForHome();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center  mt-10 gap-x-4 mx-5 gap-y-7">
      {plansData.data.slice(0, 3).map((plan) => {
        const experienciesList = plan.experiencias.map((experiencia) => ({
          id: experiencia.documentId,
          name: experiencia.name,
          alt: `Icono ${experiencia.name}`,
          iconurl: `${process.env.STRAPI_URL}${experiencia.icon.url}`,
        }));

        return (
          <PlanCard
            key={plan.id}
            slug={`/visita/${plan.slug}`}
            title={plan.name}
            price={formatPrice(plan.price)}
            experiences={experienciesList}
            image={`${process.env.STRAPI_URL}${plan.image.formats.medium.url}`}
            altimg="product"
            onlyadults={plan.onlyAdults}
            allowchilds={plan.allowChilds}
            Schedules={plan.horarios}
          />
        );
      })}
    </div>
  );
}
