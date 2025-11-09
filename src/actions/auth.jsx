"use server";
import { AgencySchema } from "@/lib/validations/auth.schema";
import { z } from "zod";
import { registerAgency } from "@/lib/strapi";

export async function AgencyRegister(prevState, formData) {
    console.log(formData);
  const fields = {
    AgencyName: formData.get("AgencyName"),
    AgencyDepartment: formData.get("AgencyDepartment"),
    AgencyCity: formData.get("AgencyCity"),
    AgencyAddress: formData.get("AgencyAddress"),
    AgencyPhone: formData.get("AgencyPhone"),
    AgencyEmail: formData.get("AgencyEmail"),
    AgencyNIT: formData.get("AgencyNIT"),
    AgencyTourismCode: formData.get("AgencyTourismCode"),
    AgencyTourismCodeExpiration: formData.get("AgencyTourismCodeExpiration"),
    AgencyContactName: formData.get("AgencyContactName"),
    AgencyContactLastName: formData.get("AgencyContactLastName"),
    AgencyRUT: formData.get("AgencyRUT"),
    AgencyCommerce: formData.get("AgencyCommerce"),
    AgencyTourismRegister: formData.get("AgencyTourismRegister"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    terms: formData.get("terms") === "on",
    dataTreatment: formData.get("dataTreatment") === "on",
    marketing: formData.get("marketing") === "on",
  };

  
  const validatedfield = AgencySchema.safeParse(fields);

    if (!validatedfield.success) {
        const flattenedErrors = z.flattenError(validatedfield.error);
        console.log("Errors", flattenedErrors.fieldErrors);

        return {
            success: false,
            message: "Validación fallida",
            BackendErrors: null,
            FrontendErrors: flattenedErrors.fieldErrors,
            data: fields,
        }
    }
    
    const response = await registerAgency(validatedfield.data);
    if (!response || response.error) {
        return {
            success: false,
            message: "Error al registrar agencia",
            BackendErrors: response?.error,
            FrontendErrors: null,
            data: fields,
        }
    }
    console.log("Registro exitoso");

 
    return {
        success: true,
        message: "Agencia registrada exitosamente",
        BackendErrors: null,
        FrontendErrors: null,
        data: fields,
    }
}
