const URL_BASE = process.env.STRAPI_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;
const AUTHORIZED_DISCOUNT = process.env.AGENCY_AUTHORIZED_DISCOUNT || 10;

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
  const registerUrl = `${URL_BASE}/api/auth/local/register`;

  try {
    
    const registerPayload = {
      username: data.AgencyEmail,
      email: data.AgencyEmail,
      password: data.password,
    };

    const registerResponse = await fetch(registerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerPayload),
    });

    const registerResult = await registerResponse.json();
    if (!registerResponse.ok || registerResult.error) {
      console.error("Error en registro:", registerResult);
      return registerResult;
    }

    const userId = registerResult.user.id;
    const jwtToken = registerResult.jwt;

    
    const updateUrl = `${URL_BASE}/api/users/${userId}`;
    const updatePayload = {
      firstName: data.AgencyContactName,
      lastName: data.AgencyContactLastName,
      address: data.AgencyAddress,
      department: data.AgencyDepartment,
      documentType: "NIT",
      document: data.AgencyNIT,
      city: data.AgencyCity,
      mobile: data.AgencyPhone,
      allowMarketing: data.marketing,
      AgencyName: data.AgencyName,
      AgencyTourismCode: data.AgencyTourismCode,
      AgencyTourismCodeExpiration: data.AgencyTourismCodeExpiration,
      terms: data.terms,
      blocked: true,
      role: 3,
      authorizedDiscount: AUTHORIZED_DISCOUNT,
    };

    const updateResponse = await fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(updatePayload),
    });

    const updateResult = await updateResponse.json();
    if (!updateResponse.ok || updateResult.error) {
      console.error("Error en actualización:", updateResult);
      return {
        error: updateResult.error || { message: "Error al actualizar datos" },
      };
    }

    
    const uploadFile = async (file, fieldName) => {
      if (!file) return null;

      const formData = new FormData();
      formData.append("files", file);
      formData.append("ref", "plugin::users-permissions.user");
      formData.append("refId", userId);
      formData.append("field", fieldName);

      try {
        const uploadResponse = await fetch(`${URL_BASE}/api/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`, 
          },
          body: formData,
        });

        const uploadResult = await uploadResponse.json();
        if (!uploadResponse.ok || uploadResult.error) {
          console.error(`Error al subir ${fieldName}:`, uploadResult);
          return null;
        }

        return uploadResult[0] || uploadResult;
      } catch (error) {
        console.error(`Error al subir ${fieldName}:`, error);
        return null;
      }
    };

  
    const RUT = await uploadFile(data.AgencyRUT, "AgencyRUT");
    const Commerce = await uploadFile(data.AgencyCommerce, "AgencyCommerce");
    const TourismRegister = await uploadFile(data.AgencyTourismRegister, "AgencyTourismRegister");

    console.log("Archivos subidos:", { RUT, Commerce, TourismRegister });

    return { jwt: jwtToken, user: updateResult };
  } catch (error) {
    console.error("Error al registrar agencia:", error);
    return { error: { message: error.message || "Error en el registro" } };
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
    //console.log(result);
    return result;
  } catch (error) {
    console.error(`Error al iniciar sesión:`, error);
    throw error;
  }
}
