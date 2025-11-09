import Link from "next/link";

export default function AuthorizationPersonalData() {
  return (
    <>
      <div className="max-h-28 lg:max-h-40 overflow-y-auto text-sm mb-4 border border-gray-200 py-4 px-2 rounded-md col-span-2 mt-5">
        <div className="prose-base">
          <div className="font-semibold text-center text-[12px]">
            AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES
          </div>
          <p className="overflow-hidden text-xs">
            El <strong>VIÑEDO AIN KARIM S.A.S.</strong> (NIT. Nº 860.010.706-4,
            calle 127 # 13a-32 Oficina 202 de Btá. y teléfono +57 601 258 9933)
            recolecta, almacena, usa, transfiere, transmite y en general trata
            manual o automatizada datos personales como Responsable de acuerdo
            con la{" "}
            <Link
              href="/politica-de-tratamiento-de-datos-personales"
              target="_blank"
              rel="noopener"
              className="font-medium hover:text-light-green duration-200"
            >
              Política de Tratamiento de Datos Personales
            </Link>
            , disponible para su consulta{" "}
            <Link
              href="/politica-de-tratamiento-de-datos-personales"
              target="_blank"
              rel="noopener"
              className="underline hover:text-light-green duration-200"
            >
              aquí
            </Link>
            . Le informamos que: Todo titular tiene derecho a: conocer,
            actualizar y rectificar su información personal; acceder de manera
            gratuita a la misma; ser informado sobre su uso; solicitar prueba de
            la autorización; acudir ante la Superintendencia de Industria y
            Comercio y presentar quejas por infracciones a lo dispuesto en la
            normatividad vigente; y en los casos procedentes, modificar y
            revocar la autorización y/o solicitar la supresión de sus datos
            personales. A su vez, le informamos que, es de carácter libre y
            facultativo entregar datos o responder a preguntas que versen sobre
            datos de carácter sensibles (Como datos biométricos, relacionados
            con la salud, o aquellos que afectan su intimidad o cuyo uso
            indebido pueda generar discriminación), y usted no esta obligado a
            otorgar su autorización.{" "}
            <strong>
              Para información relacionada con el tratamiento de sus datos
              personales y el ejercicio de su derecho de hábeas data,
              contáctenos al correo electrónico{" "}
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
