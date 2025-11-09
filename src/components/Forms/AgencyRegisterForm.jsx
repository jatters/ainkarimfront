import React, { useState, useActionState } from "react";
import InputField from "@/components/Forms/InputField";
import PasswordInput from "@/components/Forms/PasswordInput";
import CheckboxInput from "@/components/Forms/CheckboxInput";
import AuthorizationPersonalData from "./AuthorizationPersonalData";
import { actions } from "@/actions";
import FormError from "@/components/Forms/FormError";


const INITIAL_STATE = {
  success: false,
  message: undefined,
  BackendErrors: null,
  FrontendErrors: null,
  data: {
    AgencyName: "",
    AgencyDepartment: "",
    AgencyCity: "",
    AgencyAddress: "",
    AgencyPhone: "",
    AgencyEmail: "",
    AgencyNIT: "",
    AgencyTourismCode: "",
    AgencyTourismCodeExpiration: "",
    AgencyContactName: "",
    AgencyContactLastName: "",
    AgencyRUT: "",
    AgencyCommerce: "",
    AgencyTourismRegister: "",
    password: "",
    confirmPassword: "",
    terms: false,
    dataTreatment: false,
    marketing: false,
  },
};

export default function AgencyRegisterForm() {
  const [formState, formAction] = useActionState(actions.auth.AgencyRegister, INITIAL_STATE);  
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  console.log("formState", formState);
  return (
    <div className="mx-auto mt-10 lg:mx-10">
      <form        
        action={formAction}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <div className="col-span-2">
          <h2 className="text-lg font-semibold -text--dark-green font-sans">
            Información de la agencia
          </h2>
        </div>
        <InputField
          label="Nombre de la agencia"
          fieldName="AgencyName"
          type="text"
          disabled={submitting}
          defaultValue={formState.data.AgencyName}
          error={formState.FrontendErrors?.AgencyName}
        />
        
        <InputField
          label="Departamento"
          fieldName="AgencyDepartment"
          type="text"
          disabled={submitting}
          defaultValue={formState.data.AgencyDepartment}
          error={formState.FrontendErrors?.AgencyDepartment}
        />
        
        <InputField
          label="Ciudad"
          fieldName="AgencyCity"
          type="text"
          disabled={submitting}
          defaultValue={formState.data.AgencyCity}
          error={formState.FrontendErrors?.AgencyCity}
        />
        <InputField
          label="Dirección"
          fieldName="AgencyAddress"
          type="text"
          disabled={submitting}
          defaultValue={formState.data.AgencyAddress}
          error={formState.FrontendErrors?.AgencyAddress}
        />
        <InputField
          label="Teléfono"
          fieldName="AgencyPhone"
          type="text"
          disabled={submitting}
          defaultValue={formState.data.AgencyPhone}
          error={formState.FrontendErrors?.AgencyPhone}
        />
        <InputField
          label="Correo electrónico"
          fieldName="AgencyEmail"
          type="email"
          disabled={submitting}
          defaultValue={formState.data.AgencyEmail}
          error={formState.FrontendErrors?.AgencyEmail}
        />
        <InputField
          label="NIT"
          fieldName="AgencyNIT"
          type="text"
          disabled={submitting}
          defaultValue={formState.data.AgencyNIT}
          error={formState.FrontendErrors?.AgencyNIT}
        />
        <InputField
          label="Código de Registro Nacional de Turismo"
          fieldName="AgencyTourismCode"
          type="text"
          disabled={submitting}
          defaultValue={formState.data.AgencyTourismCode}
          error={formState.FrontendErrors?.AgencyTourismCode}
        />
        <InputField
          label="Fecha de vencimiento del Registro Nacional de Turismo"
          fieldName="AgencyTourismCodeExpiration"
          type="date"
          disabled={submitting}
          defaultValue={formState.data.AgencyTourismCodeExpiration}
          error={formState.FrontendErrors?.AgencyTourismCodeExpiration}
        />
        <hr className="col-span-2 my-3" />
        <div className="col-span-2">
          <h2 className="text-lg font-semibold -text--dark-green font-sans">
            Información de contacto principal
          </h2>
        </div>
        <InputField
          label="Nombre"
          fieldName="AgencyContactName"
          type="text"
          disabled={submitting}
          defaultValue={formState.data.AgencyContactName}
          error={formState.FrontendErrors?.AgencyContactName}
        />
        <InputField
          label="Apellido"
          fieldName="AgencyContactLastName"
          type="text"
          disabled={submitting}
          defaultValue={formState.data.AgencyContactLastName}
          error={formState.FrontendErrors?.AgencyContactLastName}
        />
        <hr className="col-span-2 my-3" />
        <div className="col-span-2">
          <h2 className="text-lg font-semibold -text--dark-green font-sans">
            Documentos Requeridos
          </h2>
        </div>
        <InputField
          label="RUT"
          fieldName="AgencyRUT"
          type="file"
          disabled={submitting}
          defaultValue={formState.data.AgencyRUT}
          error={formState.FrontendErrors?.AgencyRUT}
        />
        <InputField
          label="Cámara de Comercio"
          fieldName="AgencyCommerce"
          type="file"
          disabled={submitting}
          defaultValue={formState.data.AgencyCommerce}
          error={formState.FrontendErrors?.AgencyCommerce}
        />
        <InputField
          label="Registro Nacional de Turismo"
          fieldName="AgencyTourismRegister"
          type="file"
          disabled={submitting}
          defaultValue={formState.data.AgencyTourismRegister}
          error={formState.FrontendErrors?.AgencyTourismRegister}
        />
        <hr className="col-span-2 my-3" />
        <div className="col-span-2">
          <h2 className="text-lg font-semibold -text--dark-green font-sans">
            Información de acceso
          </h2>
        </div>
        <PasswordInput
          label="Contraseña"
          fieldName="password"
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          error={formState.FrontendErrors?.password}
        />
        <PasswordInput
          label="Confirmar Contraseña"
          fieldName="confirmPassword"
          showPassword={showConfirmPassword}
          togglePasswordVisibility={toggleConfirmPasswordVisibility}
          error={formState.FrontendErrors?.confirmPassword}
        />
        <CheckboxInput
          fieldName="terms"
          content="Acepto los términos y condiciones"
          required={true}
          disabled={submitting}
          error={formState.FrontendErrors?.terms}
        />
        <AuthorizationPersonalData />

        <CheckboxInput
          fieldName="dataTreatment"
          content="Autorizo el tratamiento de mis datos de identificación y
                contacto para; crear una cuenta como agencia que permita
                gestionar mis reservas y/o pedidos; administrar mis direcciones
                de envío y facturación; enviar comunicaciones vía e-mail
                relacionadas con mi cuenta, reservas y/o pedidos; y gestionar la
                contraseña de mi cuenta y su recuperación en caso de perdida."
          required={true}
          disabled={submitting}
          error={formState.FrontendErrors?.dataTreatment}
        />
        <CheckboxInput
          fieldName="marketing"
          content="Autorizo el tratamiento de mis datos de contacto para informarme
              de ofertas y lanzamientos exclusivos; invitarme a eventos y en
              general realizar actos de marketing y/o publicidad por contacto a
              través de e-mail, teléfono, y/o mensajería instantánea."
          required={false}
          disabled={submitting}
          error={formState.FrontendErrors?.marketing}
        />
        <div className="mb-6 col-span-2">
          <button
            type="submit"
            className="w-full px-4 py-2 mt-3 -bg--dark-green text-white rounded-md hover:-bg--light-green focus:outline-none focus:-bg--dark-gray"
            disabled={submitting}
          >
            {submitting ? "Registrando..." : "Registrar mi agencia"}
          </button>
          {response && (
            <div
              className={`col-span-2 text-center font-semibold py-4 rounded ${
                response.message === "Te has registrado exitosamente"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {response.message === "Te has registrado exitosamente"
                ? `Gracias ${response.name}, te has registrado exitosamente.`
                : response.message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
