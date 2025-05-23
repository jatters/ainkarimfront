const url = process.env.NEXT_PUBLIC_STRAPI_URL;
const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

const createFetchOptions = () => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const fetchData = async (endpoint) => {
  if (!url || !token) {
    console.error("Missing Environment Variables");
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

//Get Plans for home
export async function GetPlansForHome() {
  try {
    const res = await fetchData(
      `planes?filters[showInHome][$eq]=true&[fields][0]=documentId&[fields][1]=slug&[fields][2]=name&[fields][3]=price&[fields][4]=onlyAdults&[fields][5]=allowChilds&[fields][6]=order&[fields][7]=max_reservations&[populate][image][fields]=formats&[populate][horarios][fields]=startTime,endTime&[populate][experiencias][fields]=name&[populate][experiencias][populate][icon][fields]=url&[populate][reglas_planes][populate]=Reglas&[populate][servicios_adicionales][fields]=name,price&sort[1]=order&pagination[limit]=4&[fields][8]=isActive&[fields][9]=unitPlan`
    );

    if (!res || !res.data) {
      console.error("Error fetching plans for home");
      return null;
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching plans for home:", error);
    return null;
  }
}

//Get Plans for sitemap
export async function GetPlansForSitemap() {
  try {
    const res = await fetchData(
      `planes?filters[isActive][$eq]=true&[fields][0]=slug&[fields][1]=updatedAt`
    );
    if (!res || !res.data) {
      console.error("Error fetching plans for sitemap");
      return null;
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching plans for sitemap:", error);
    return null;
  }
}

//Get Products for sitemap
export async function GetProductsForSitemap() {
  try {
    const res = await fetchData(
      `productos?filters[isActive][$eq]=true&[fields][0]=slug&[fields][1]=updatedAt`
    );
    if (!res || !res.data) {
      console.error("Error fetching products for sitemap");
      return null;
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
    return null;
  }
}

//Get Products for home
export async function GetProductsForHome() {
  try {
    const res = await fetchData(
      `productos?filters[productInHome][$eq]=true&populate[image][fields]=alternativeText,formats&populate[categorias_de_producto][fields][0]=name&[fields][0]=title&[fields][1]=slug&[fields][2]=isActive&[fields][3]=isVariable&[fields][4]=regularPrice&[fields][5]=price&populate=variaciones&sort=title:desc&pagination[limit]=5`
    );
    if (!res || !res.data) {
      console.error("Error fetching products for home");
      return null;
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching products for home:", error);
    return null;
  }
}

//Get Products for products page /productos
export async function GetProducts() {
  try {
    const res = await fetchData(
      `productos?populate[image][fields]=alternativeText,formats&populate[categorias_de_producto][fields]=name&populate=variaciones&sort=title:desc&[fields][0]=title&[fields][1]=slug&[fields][2]=isActive&[fields][3]=isVariable&[fields][4]=price&[fields][5]=regularPrice`
    );
    if (!res || !res.data) {
      console.error("Error fetching products");
      return null;
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

//Get Plans for plans page /visitas
export async function GetPlans() {
  try {
    const res = await fetchData(
      `planes?[fields][0]=documentId&[fields][1]=slug&[fields][2]=name&[fields][3]=price&[fields][4]=onlyAdults&[fields][5]=allowChilds&[fields][6]=order&[populate][image][fields]=formats&[populate][horarios][fields]=startTime,endTime&[populate][experiencias][fields]=name&[populate][experiencias][populate][icon][fields]=url&[fields][7]=max_reservations&[populate][reglas_planes][populate]=Reglas&[populate][servicios_adicionales][fields]=name,price&sort[1]=order&[fields][8]=isActive&[fields][9]=unitPlan`
    );
    if (!res || !res.data) {
      console.error("Error fetching plans");
      return null;
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    return null;
  }
}

//Get Single plans
export async function GetSinglePlan(slug) {
  try {
    const res = await fetchData(      
      `planes?filters[slug][$eq]=${slug}&[fields][0]=name &[fields][1]=price&[fields][2]=planDescription&[fields][3]=max_reservations&[fields][4]=onlyAdults&[fields][5]=allowChilds&[fields][6]=unitPlan&[fields][7]=SEODescription&[populate][horarios][fields][0]=startTime&[populate][horarios][fields][1]=endTime&[populate]=servicios_adicionales&[populate][gallery][fields][0]=alternativeText&[populate][gallery][fields][1]=url&[populate][reglas_planes][populate]=Reglas`
    );
    if (!res || !res.data) {
      console.error("Error fetching plan data");
      return null;
    }
    return res.data[0];
  } catch (error) {
    console.error("Error fetching plan data:", error);
    return null;
  }
}

//Get single product
export async function GetSingleProduct(slug) {
  try {
    const res = await fetchData(
      `productos?filters[slug][$eq]=${slug}&populate=image&populate=gallery&populate=categorias_de_producto&populate=variaciones`
    );
    if (!res || !res.data) {
      console.error("Error fetching product data");
      return null;
    }
    return res.data[0];
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

//Get About Us
export async function GetAboutUs() {
  try {
    const res = await fetchData(
      `nosotro?populate[timeline][populate][image][fields]=url,alternativeText&populate[viticultura][populate][image][fields]=url,alternativeText&populate[filantropia][populate][image][fields]=url,alternativeText&populate[slider][populate][image][fields]=url,alternativeText&populate[cover][fields]=url,alternativeText`
    );
    if (!res || !res.data) {
      console.error("Error fetching about us data");
      return null;
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching about us data:", error);
    return null;
  }
}

//Get Company info
export async function GetCompanyInfo() {
  try {
    const res = await fetchData(`el-vinedo?populate=*`);
    if (!res || !res.data) {
      console.error("Error fetching company info");
      return null;
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching company info:", error);
    return null;
  }
}

//Get Active Coupons
export async function GetCoupons(couponCode) {
  try {
    const res = await fetchData(
      `promociones?populate=*&filters[coupon][isActive][$eq]=true&filters[coupon][code][$eq]=${couponCode}`
    );
    if (!res) {
      return null;
    }
    return res.data[0];
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return null;
  }
}

// Get Used spots in reservations
export async function GetUsedSpotsInPlan(selectedDate, selectedHour, planId) {
  if (!selectedDate || !selectedHour || !planId) return [];

  try {
    const response = await fetchData(
      `reservas?filters[reservationDate]=${selectedDate}&filters[reservationTime]=${selectedHour}&filters[plan][documentId][$eq]=${planId}&[fields][0]=guests&filters[$or][0][state][$eq]=Confirmada&filters[$or][1][state][$eq]=Pendiente`
    );

    if (!response) {
      throw new Error("Respuesta nula de la API");
    }
    return response.data || [];
  } catch (error) {
    console.error("Error to get used spots in plan:", error);
    return [];
  }
}

// Get Single Page Data
export async function GetPage({ page }) {
  try {
    const res = await fetchData(`${page}?populate=*`);
    if (!res || !res.data) {
      console.error("Error fetching page data");
      return null;
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

//Get FAQS
export async function GetFaqs() {
  try {
    const res = await fetchData(`faqs?fields[0]=title&fields[1]=asnwer`);
    if (!res) {
      return null;
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return null;
  }
}

//Get Popup
export async function GetPopup() {
  try {
    const res = await fetchData(
      `popup?[fields][0]=isActive&[fields][1]=visibleInHome&[fields][2]=visibleInStore&[fields][3]=visibleInPlans&[populate][image][fields]=url,alternativeText&[fields][4]=startDate&[fields][5]=endDate`
    );
    if (!res) {
      return null;
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching popup data:", error);
    return null;
  }
}

//Get Data to Send Forms
export async function GetSendMailsData() {
  try {
    const res = await fetchData(
      `el-vinedo?[fields][0]=ventasEmail&[fields][1]=contactEmail`
    );
    if (!res) {
      console.error("Error fetching sends mails data");
      return null;
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching sends mails data:", error);
    return null;
  }
}
