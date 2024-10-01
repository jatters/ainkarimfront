const url = process.env.STRAPI_URL;
const token = process.env.STRAPI_API_TOKEN;

const createFetchOptions = () => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const fetchData = async (endpoint) => {
  if (!url || !token) {
    console.error("Missing environment variables: STRAPI_URL or STRAPI_TOKEN");
    return null;
  }

  try {
    const res = await fetch(`${url}/api/${endpoint}`, createFetchOptions());
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

//Get content of plans for home
export async function GetPlansForHome() {
  return await fetchData(
    `planes?populate[experiencias][populate][icon][fields]=url&populate[experiencias][fields]=name&populate[image][fields]=url,formats&populate=horarios`
  );
}

//Get content of products for home
export async function GetProductsForHome() {
  return await fetchData(
    `productos?populate[image][fields]=url,formats&populate=categorias_de_producto`
  );
}

//Get content of products for product page
export async function GetProducts() {
  return await fetchData(
    `productos?populate[image][fields]=url,formats&populate=categorias_de_producto&sort[1]=title:desc`
  );
}

//Get content of plans for plans page
export async function GetPlans() {
  return await fetchData(
    `planes?populate[experiencias][populate][icon][fields]=url&populate[experiencias][fields]=name&populate[image][fields]=url,formats&populate=horarios&sort[1]=order`
  );
}

//Get single plans
export async function GetSinglePlan(slug) {
  return await fetchData(
    `planes?filters[slug][$eq]=${slug}&populate=image&populate=gallery&populate=servicios_adicionales&populate=horarios`
  );
}

//Get single product
export async function GetSingleProduct(slug) {
  return await fetchData(
    `productos?filters[slug][$eq]=${slug}&populate=image&populate=gallery&populate=categorias_de_producto&populate=variaciones`
  );
}

//Get FAQS
export async function GetFaqs(slug) {
  return await fetchData(
    `faqs`
  );
}