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
    `planes?filters[showInHome][$eq]=true&[fields][0]=documentId&[fields][1]=slug&[fields][2]=name&[fields][3]=price&[fields][4]=onlyAdults&[fields][5]=allowChilds&[fields][6]=order&[fields][7]=max_reservations&[populate][image][fields]=formats&[populate][horarios][fields]=startTime,endTime&[populate][experiencias][fields]=name&[populate][experiencias][populate][icon][fields]=url&[populate][reglas_planes][fields]&[populate][servicios_adicionales][fields]=name,price&sort[1]=order&pagination[limit]=4&[fields][8]=isActive&[fields][9]=unitPlan`
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
    `planes?[fields][0]=documentId&[fields][1]=slug&[fields][2]=name&[fields][3]=price&[fields][4]=onlyAdults&[fields][5]=allowChilds&[fields][6]=order&[populate][image][fields]=formats&[populate][horarios][fields]=startTime,endTime&[populate][experiencias][fields]=name&[populate][experiencias][populate][icon][fields]=url&[fields][7]=max_reservations&[populate][reglas_planes][fields]&[populate][servicios_adicionales][fields]=name,price&sort[1]=order&[fields][8]=isActive&[fields][9]=unitPlan`
  );
}

//Get single plans
export async function GetSinglePlan(slug) {
  return await fetchData(
    `planes?filters[slug][$eq]=${slug}&populate=image&populate=gallery&populate=servicios_adicionales&populate=horarios&populate=reglas_planes&[field]=unitPlan`
  );
}

//Get single product
export async function GetSingleProduct(slug) {
  return await fetchData(
    `productos?filters[slug][$eq]=${slug}&populate=image&populate=gallery&populate=categorias_de_producto&populate=variaciones`
  );
}

//Get FAQS
export async function GetFaqs() {
  return await fetchData(
    `faqs?[fields][0]=title&[fields][1]=asnwer`
  );
}

//Get About Us
export async function GetAboutUs() {
  return await fetchData(
    `nosotro?populate[timeline][populate][image][fields]=url,alternativeText&populate[viticultura][populate][image][fields]=url,alternativeText&populate[filantropia][populate][image][fields]=url,alternativeText&populate[slider][populate][image][fields]=url,alternativeText&populate[cover][fields]=url,alternativeText`
  );
}
