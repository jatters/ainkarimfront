import PlanCard from "@/components/Ecommerce/PlanCard";
import HeaderImage from "@/components/Ui/HeaderImage";
import { GetPlans } from "@/components/GetContentApi";

/* const baseurl = process.env.STRAPI_URL;
const token = process.env.STRAPI_API_TOKEN;

async function fetchPlans() {
  const url = `${baseurl}/api/planes?populate=*`;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
} */

const formatPrice = (price) => {
  if (!price) return "";
  const formatedPrice = String(price);
  return `$${Number(formatedPrice).toLocaleString("es-CO")}`;
};

/* async function GetExperiencesIcon(experienceId) {
  const url = `${baseurl}/api/experiencias/${experienceId}?populate=icon`;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return baseurl + data.data.attributes.icon.data.attributes.url || "";
  } catch (error) {
    console.error(error);
    return "";
  }
} */

export default async function VisitasPage() {
  const plansData = await GetPlans();

  // Obtener iconos para cada experiencia de cada plan
  /*  for (const plan of plansData) {
    const experienciesListPromises = plan.experiencias.data.map(
      async (experience) => ({
        id: experience.id,
        name: experience.attributes.name,
        iconurl: await GetExperiencesIcon(experience.id),
      })
    );

    plan.experienciesList = await Promise.all(experienciesListPromises);
  } */

  /* const sortedPlanes = plansData.sort(
    (a, b) => a.attributes.orden - b.attributes.orden
  ); */

  return (
    <>
      <HeaderImage title="Visitas" background="/banner-visitas.jpg" />
      <div className="container mx-auto pt-16 pb-14">
        <div className="font-medium text-4xl text-center -text--dark-green">
          VIVE ESTAS EXPERIENCIAS CON NOSOTROS
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mt-10 gap-x-4 mx-5 gap-y-7">
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
                image={`${process.env.STRAPI_URL}${plan.image.formats.medium.url}`}
                altimg={
                  plan.image.alternativeText
                    ? plan.image.alternativeText
                    : `Imagen ${plan.name}`
                }
                onlyadults={plan.onlyAdults}
                allowchilds={plan.allowChilds}
                Schedules={plan.horarios}
                plan={plan}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
