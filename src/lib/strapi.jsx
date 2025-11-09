const URL_BASE = process.env.STRAPI_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function getStrapiData(endpoint, options = {}) {
  const { revalidate = 60, cache = "force-cache" } = options;
  try {
    const response = await fetch(`${URL_BASE}/api/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      next: {
        revalidate,
        cache,
      },
    });
    console.log("response");

    if (!response.ok) {
      throw new Error(`Error al obtener datos de Strapi: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error al obtener datos de Strapi: ${error}`);
    return null;
  }
}

export async function registerAgency(data) {
  const url = `${URL_BASE}/api/auth/local/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(`Error al registrar agencia:`, error);
    throw error;
  }
}

export async function login(data) {
  const url = `${URL_BASE}/api/auth/local`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(`Error al iniciar sesión:`, error);
    throw error;
  }
}