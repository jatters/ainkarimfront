const url = process.env.NEXT_PUBLIC_STRAPI_URL;
const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

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
    `planes?filters[showInHome][$eq]=true&populate[experiencias][populate][icon][fields]=url&populate[experiencias][fields]=name&populate[image][fields]=url,formats&populate=horarios&pagination[limit]=4&sort[1]=order`
  );
}

//Get content of products for home
export async function GetProductsForHome() {
  return await fetchData(
    `productos?filters[productInHome][$eq]=true&populate[image][fields]=url&populate[categorias_de_producto][fields]=name&pagination[limit]=5&sort[1]=title:desc`
  );
}

//Get content of products for product page
export async function GetProducts() {
  return await fetchData(
    `productos?populate[image][fields]=url,formats&populate[categorias_de_producto][fields]=name&populate[variaciones][fields]=*&sort[1]=title:desc`
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
    `planes?filters[slug][$eq]=${slug}&populate=image&populate=gallery&populate=servicios_adicionales&populate=horarios&populate=reglas_planes`
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

//Get About Us
export async function GetAboutUs() {
  return await fetchData(
    `nosotro?populate[timeline][populate][image][fields]=url,alternativeText&populate[viticultura][populate][image][fields]=url,alternativeText&populate[filantropia][populate][image][fields]=url,alternativeText&populate[slider][populate][image][fields]=url,alternativeText&populate[cover][fields]=url,alternativeText`
  );
}
