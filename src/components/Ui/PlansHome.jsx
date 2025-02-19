import PlanCard from "@/components/Ecommerce/PlanCard";
import { GetPlansForHome } from "../GetContentApi";

const formatPrice = (price) => {
  if (!price) return "";
  const formatedPrice = String(price);
  return `$${Number(formatedPrice).toLocaleString("es-CO")}`;
};

export default async function PlansHome() {
  const plansData = await GetPlansForHome();
  if (!plansData || !plansData.data) {
    console.error("Error fetching plans for home");
    return <p>Error cargando planes</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center  mt-10 gap-x-4 mx-5 gap-y-7">
      {plansData.data.slice(0, 4).map((plan) => {
        const experienciesList = plan.experiencias.map((experiencia) => ({
          id: experiencia.documentId,
          name: experiencia.name,
          alt: `Icono ${experiencia.name}`,
          iconurl: `${process.env.NEXT_PUBLIC_SITE_URL}${experiencia.icon.url}`,
        }));

        return (
          <PlanCard
            key={plan.id}
            slug={`/visita/${plan.slug}`}
            name={plan.name}
            documentId={plan.documentId}  
            price={plan.price}
            experiences={experienciesList}
            image={`${process.env.NEXT_PUBLIC_SITE_URL}${plan.image.formats.medium.url}`}
            altimg="product"
            onlyadults={plan.onlyAdults}
            allowchilds={plan.allowChilds}
            horarios={plan.horarios}
            additionalServices={plan.servicios_adicionales}
            rules={plan.reglas_planes}
          />
        );
      })}
    </div>
  );
}
