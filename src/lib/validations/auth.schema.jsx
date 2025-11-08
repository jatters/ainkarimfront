import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];
/* const fileValidation = z
  .any()
  .refine((files) => files && files.length > 0, {
    message: "Debes adjuntar un archivo",
  })
  .refine(
    (files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type),
    "Solo se permiten archivos PDF o imágenes (JPG, PNG)"
  )
  .refine(
    (files) => files[0]?.size <= MAX_FILE_SIZE,
    "El archivo no debe superar los 10 MB"
  ); */
  const fileValidation = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "El archivo no debe superar los 10 MB",
  })
  .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
    message: "Solo se permiten archivos PDF o imágenes (JPG, PNG)",
  });

export const AgencySchema = z
  .object({
    AgencyName: z
      .string()
      .min(5, "El nombre no es válido")
      .regex(/^[A-Za-zÀ-ÿ\s]+$/, "El nombre no es válido"),
    AgencyDepartment: z
      .string()
      .min(5, "El departamento debe tener al menos 5 caracteres")
      .regex(/^[A-Za-zÀ-ÿ\s]+$/, "El departamento no es válido"),
    AgencyCity: z
      .string()
      .min(5, "La ciudad debe tener al menos 5 caracteres")
      .regex(/^[A-Za-zÀ-ÿ\s]+$/, "La ciudad no es válida"),
    AgencyAddress: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
    AgencyEmail: z.email("El correo no es válido"),
    AgencyPhone: z.string().regex(/^[0-9]{7,10}$/, "El teléfono debe tener al menos 7 caracteres"),
    AgencyNIT: z
      .string()
      .regex(/^[0-9\-]+$/, "NIT inválido")
      .min(9, "NIT debe tener al menos 9 caracteres"),
    AgencyTourismCode: z
      .string()
      .regex(/^[A-Za-zÀ-ÿ\s\d]+$/, "El código no es válido")
      .min(5, "El código debe tener al menos 5 caracteres"),
    AgencyTourismCodeExpiration: z
      .string()
      .min(5, "La fecha de vencimiento no es válida"),
    AgencyContactName: z
      .string()
      .min(5, "El nombre debe tener al menos 5 caracteres")
      .regex(/^[A-Za-zÀ-ÿ\s]+$/, "El nombre no es válido"),
    AgencyContactLastName: z
      .string()
      .min(3, "El apellido debe tener al menos 3 caracteres")
      .regex(/^[A-Za-zÀ-ÿ\s]+$/, "El apellido no es válido"), 
    AgencyRUT: fileValidation.optional(),
    AgencyCommerce: fileValidation.optional(),
    AgencyTourismRegister: fileValidation.optional(),   
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    terms: z.boolean().refine((value) => value, {
      message: "Debes aceptar los términos y condiciones",
    }),
    dataTreatment: z.boolean().refine((value) => value, {
      message: "Debes aceptar el tratamiento de datos",
    }),
    marketing: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
