import PlanCard from "@/components/Ecommerce/PlanCard";
import HeaderImage from "@/components/Ui/HeaderImage";
import { GetPlans } from "@/components/GetContentApi";

const formatPrice = (price) => {
  if (!price) return "";
  const formatedPrice = String(price);
  return `$${Number(formatedPrice).toLocaleString("es-CO")}`;
};

export default async function VisitasPage() {
  const plansData = await GetPlans();
  if (!plansData || !plansData.data) {
    console.error("Error fetching plans data");
    return (
      <div className="container mx-auto py-16 px-5">Error cargando planes</div>
    );
  }

  return (
    <>
      <HeaderImage title="Visitas" background="/banner-visitas.jpg" />
      <div className="container mx-auto py-16 px-5">
        <div className="font-medium text-2xl md:text-3xl lg:text-4xl text-center -text--dark-green">
          VIVE ESTAS EXPERIENCIAS CON NOSOTROS
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mt-10 gap-x-4 gap-y-7">
          {plansData.data.map((plan) => {
            const experienciesList = plan.experiencias.map((experiencia) => ({
              id: experiencia.documentId,
              name: experiencia.name,
              alt: `Icono ${experiencia.name}`,
              iconurl: `${process.env.STRAPI_URL}${experiencia.icon.url}`,
            }));

            return (
              <PlanCard
                key={plan.documentId}
                slug={`/visita/${plan.slug}`}
                title={plan.name}
                price={formatPrice(plan.price)}
                experiences={experienciesList}
                image={`${process.env.STRAPI_URL}${plan.image.formats.small.url}`}
                altimg={
                  plan.image.alternativeText
                    ? plan.image.alternativeText
                    : `Imagen ${plan.name}`
                }
                onlyadults={plan.onlyAdults}
                allowchilds={plan.allowChilds}
                Schedules={plan.horarios}                
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
