import PlanCard from "@/components/Ecommerce/PlanCard";



async function fetchPlans() {
  const url = `${process.env.STRAPI_URL}/api/planes?populate=*`;
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error(error);
  }
}

const formatPrice = (price) => {
  if (!price) return "";
  const formatedPrice = price.split(",")[0];
  return `$${Number(formatedPrice).toLocaleString("es-CO")}`;
};

async function GetExperiencesIcon(experienceId) {
  const url = `${process.env.STRAPI_URL}/api/experiencias/${experienceId}?populate=icon`;

  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return `${process.env.STRAPI_URL}${data.data.attributes.icon.data.attributes.url}` || "";
  } catch (error) {
    console.error(error);
  }
}

export default async function PlansHome() {
  const plansData = await fetchPlans();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center  mt-10 gap-x-4 mx-5 gap-y-7">
      {plansData?.slice(0, 3).map(async (plan) => {
        const experienciesListPromises = plan.attributes.experiencias.data.map(
          async (id) => ({
            id: id.id,
            name: id.attributes.name,
            iconurl: await GetExperiencesIcon(id.id),
          })
        );

        const experienciesList = await Promise.all(experienciesListPromises);

        return (
          <PlanCard
            key={plan.id}
            slug={`/visita/${plan.attributes.slug}`}
            title={plan.attributes.name}
            price={formatPrice(plan.attributes.price)}
            experiences={experienciesList}
            image={`${process.env.STRAPI_URL}${plan.attributes.image.data.attributes.url}`}
            altimg="product"
            onlyadults={plan.attributes.onlyAdults}
            allowchilds={plan.attributes.allowChilds}
            Schedules={[]}
          />
        );
      })}
    </div>
  );
}
