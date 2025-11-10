import Link from "next/link";

export default function AuthorizationPersonalData() {
  return (
    <>
      <div className="mb-4 border border-gray-300 py-4 px-2 rounded-md col-span-2 ">
        <div className="prose-base">
          <div className="font-semibold text-center text-xs">
            AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES
          </div>
          <p className="text-xs">
            El <strong>VIÑEDO AIN KARIM S.A.S.</strong> (NIT. Nº 860.010.706-4,
            calle 127 # 13a-32 Oficina 202 de Btá.)le informa que actúa como
            Responsable de la recolección, almacenamiento, uso y en general
            tratamiento de sus datos personales de acuerdo con nuestra{" "}
            <Link
              href="/politica-de-tratamiento-de-datos-personales"
              target="_blank"
              rel="noopener"
              className="font-medium hover:text-light-green duration-200"
            >
              Política de Tratamiento de Datos Personales
            </Link>
            , disponible{" "}
            <Link
              href="/politica-de-tratamiento-de-datos-personales"
              target="_blank"
              rel="noopener"
              className="underline hover:text-light-green duration-200"
            >
              aquí
            </Link>
            . Como titular tiene derecho a: conocer, actualizar y rectificar su
            información; acceder de manera gratuita a la misma y ser informado
            sobre su uso; solicitar prueba de la autorización otorgada; revocar
            la autorización y/o solicitar la supresión de sus datos; no entregar
            datos de carácter sensible; y acudir ante la Superintendencia de
            Industria y Comercio para presentar reclamaciones.{" "}
            <strong>
              Para información y ejercicio de sus derechos, contáctenos al
              correo electrónico{" "}
            </strong>
            <a
              href="mailto:smartinez@marquesvl.com"
              className="hover:text-light-green duration-200 font-medium"
            >
              smartinez@marquesvl.com.
            </a>
          </p>
        </div>
      </div>
      <div className="text-xs font-medium mb-3 col-span-2">
        Con base en la información proporcionada, autorizo de manera voluntaria,
        previa, expresa e informada al VIÑEDO para tratar mis datos personales,
        y en especial:
      </div>
    </>
  );
}
