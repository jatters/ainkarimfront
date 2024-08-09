import PlanCard from "@/components/Ecommerce/PlanCard";
import HeaderImage from "@/components/Ui/HeaderImage";

const baseurl = process.env.STRAPI_URL;
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
}

const formatPrice = (price) => {
  if (!price) return "";
  const formatedPrice = price.split(",")[0];
  return `$${Number(formatedPrice).toLocaleString("es-CO")}`;
};

async function GetExperiencesIcon(experienceId) {
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
}

export default async function VisitasPage() {
  const plansData = await fetchPlans();

  // Obtener iconos para cada experiencia de cada plan
  for (const plan of plansData) {
    const experienciesListPromises = plan.attributes.experiencias.data.map(
      async (experience) => ({
        id: experience.id,
        name: experience.attributes.name,
        iconurl: await GetExperiencesIcon(experience.id),
      })
    );

    plan.experienciesList = await Promise.all(experienciesListPromises);
  }

  const sortedPlanes = plansData.sort(
    (a, b) => a.attributes.orden - b.attributes.orden
  );

  return (
    <>
      <HeaderImage title="Visitas" background="/banner-visitas.jpg" />
      <div className="container mx-auto pt-16 pb-14">
        <div className="font-medium text-4xl text-center -text--dark-green">
          VIVE ESTAS EXPERIENCIAS CON NOSOTROS
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mt-10 gap-x-4 mx-5 gap-y-7">
          {sortedPlanes.map((plan) => (
            <PlanCard
              key={plan.id}
              slug={`/visita/${plan.attributes.slug}`}
              title={plan.attributes.name}
              price={formatPrice(plan.attributes.price)}
              experiences={plan.experienciesList}
              image={`${baseurl}${plan.attributes.image.data.attributes.url}`}
              altimg="product"
              onlyadults={plan.attributes.onlyAdults}
              allowchilds={plan.attributes.allowChilds}
              Schedules={plan.attributes.horarios.data}
              plan={plan}
            />
          ))}
        </div>
      </div>
    </>
  );
}
