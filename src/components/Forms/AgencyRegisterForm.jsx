import React, {
  useState,
  useActionState,
  useEffect,
  useTransition,
} from "react";
import InputField from "@/components/Forms/InputField";
import FileInput from "@/components/Forms/FileInput";
import PasswordInput from "@/components/Forms/PasswordInput";
import CheckboxInput from "@/components/Forms/CheckboxInput";
import AuthorizationPersonalData from "./AuthorizationPersonalData";
import { actions } from "@/actions";
import FormError from "@/components/Forms/FormError";
import CheckboxTermsAndConditions from "./CheckboxTermsAndConditions";

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

export default function AgencyRegisterForm({ onSuccess }) {
  const [formState, formAction] = useActionState(
    actions.auth.AgencyRegister,
    INITIAL_STATE
  );
  const [submitting, startTransition] = useTransition();
  const [response, setResponse] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [persistedFiles, setPersistedFiles] = useState({
    AgencyRUT: null,
    AgencyCommerce: null,
    AgencyTourismRegister: null,
  });
  const formRef = React.useRef(null);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleFileChange = (fieldName, file) => {
    setPersistedFiles((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
  };

  useEffect(() => {
    if (formState?.success) {
      onSuccess?.();
    }
  }, [formState, onSuccess]);

  useEffect(() => {
    if (formState?.error || formState?.success) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [formState]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    Object.entries(persistedFiles).forEach(([fieldName, file]) => {
      if (file) {
        const currentFile = formData.get(fieldName);

        if (!currentFile || currentFile.size === 0) {
          formData.set(fieldName, file);
        }
      }
    });

    startTransition(async () => {
      await formAction(formData);
    });
  };

  useEffect(() => {
    const sendConfirmationEmail = async () => {
      if (formState?.success) {
        try {
          const emailResponse = await fetch("/api/sendEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              formType: "RegistroAgencia",
              email: formState.data.AgencyEmail,
              name: formState.data.AgencyName,
              contactName: formState.data.AgencyContactName,
              contactLastName: formState.data.AgencyContactLastName,
              date: new Date().toISOString(),
            }),
          });

          if (!emailResponse.ok) {
            console.error("Error al enviar el correo de confirmación");
          } else {
            console.log("Correo de confirmación enviado exitosamente");
          }
        } catch (emailError) {
          console.error("Error al enviar correo:", emailError);
        }
      }
    };

    sendConfirmationEmail();
  }, [formState?.success, formState?.data]);

  return (
    <div className="mx-auto mt-10 ">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <div className="col-span-2">
          <h2 className="text-lg font-semibold text-dark-green font-sans">
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
        <hr className="col-span-2 my-3 text-gray-300" />
        <div className="col-span-2">
          <h2 className="text-lg font-semibold text-dark-green font-sans">
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
        <hr className="col-span-2 my-3 text-gray-300 " />
        <div className="col-span-2">
          <h2 className="text-lg font-semibold text-dark-green font-sans">
            Documentos Requeridos
          </h2>
        </div>
        <FileInput
          label="RUT"
          fieldName="AgencyRUT"
          disabled={submitting}
          error={formState.FrontendErrors?.AgencyRUT}
          onFileChange={handleFileChange}
          persistedFile={persistedFiles.AgencyRUT}
        />
        <FileInput
          label="Cámara de Comercio"
          fieldName="AgencyCommerce"
          disabled={submitting}
          error={formState.FrontendErrors?.AgencyCommerce}
          onFileChange={handleFileChange}
          persistedFile={persistedFiles.AgencyCommerce}
        />
        <FileInput
          label="Registro Nacional de Turismo"
          fieldName="AgencyTourismRegister"
          disabled={submitting}
          error={formState.FrontendErrors?.AgencyTourismRegister}
          onFileChange={handleFileChange}
          persistedFile={persistedFiles.AgencyTourismRegister}
        />
        <hr className="col-span-2 my-3 text-gray-300" />
        <div className="col-span-2">
          <h2 className="text-lg font-semibold text-dark-green font-sans">
            Información de acceso
          </h2>
        </div>
        <PasswordInput
          label="Contraseña"
          fieldName="password"
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          disabled={submitting}
          defaultValue={formState.data.password}
          error={formState.FrontendErrors?.password}
        />
        <PasswordInput
          label="Confirmar Contraseña"
          fieldName="confirmPassword"
          showPassword={showConfirmPassword}
          togglePasswordVisibility={toggleConfirmPasswordVisibility}
          disabled={submitting}
          defaultValue={formState.data.confirmPassword}
          error={formState.FrontendErrors?.confirmPassword}
        />
        <CheckboxTermsAndConditions
          disabled={submitting}
          error={formState.FrontendErrors?.terms}
          defaultValue={formState.data.terms}
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
          defaultValue={formState.data.dataTreatment}
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
          defaultValue={formState.data.marketing}
        />
        <div className="mb-6 col-span-2">
          <button
            type="submit"
            className="w-full px-4 py-2 mt-3 bg-dark-green text-white rounded-md hover:bg-light-green focus:outline-none focus:bg-dark-gray duration-200 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? "Registrando Agencia..." : "Registrar mi agencia"}
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
          {formState?.BackendErrors && (
            <div className="text-red-500 text-center col-span-2 italic">
              {formState?.BackendErrors?.message ===
              "Email or Username are already taken"
                ? "El usuario ya está registrado"
                : formState?.BackendErrors?.message}
            </div>
          )}
          {formState?.FrontendErrors &&
            Object.keys(formState.FrontendErrors).length > 0 && (
              <div className="bg-red-200 py-2 text-red-700 text-center col-span-2 mt-4 font-medium text-sm rounded">
                Al parecer hay información incorrecta. Por favor, verifica los
                campos marcados en rojo para continuar.
              </div>
            )}
        </div>
      </form>
    </div>
  );
}
