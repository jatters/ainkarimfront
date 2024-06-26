
const baseurl = process.env.STRAPI_URL;
const tokenApi = process.env.STRAPI_API_TOKEN;

export default async function FethApi({apiUrl}) {
  const url = `${baseurl}${apiUrl}`;
  const options = {
    headers: {
      Authorization: `Bearer ${tokenApi}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();    
    return data;
    
  } catch (error) {
    console.error(error);
  }
}
