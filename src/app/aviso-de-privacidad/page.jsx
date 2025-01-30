//import Link from "next/link";
import { Link } from 'next-view-transitions'

export default function AvisoPrivacidadPage() {
  return (
    <main>
      <section className="max-w-screen-xl mx-auto py-16 px-5 space-y-5 prose">
        <h1 className="-text--dark-green text-4xl font-bold text-center mb-12">
          Aviso de Privacidad
        </h1>
        <p>
          En cumplimiento a la Ley 1581 de 2012, el{" "}
          <strong>VIÑEDO AIN KARIM S.A.S.</strong>, identificada con{" "}
          <strong>NIT. Nº 860.010.706-4</strong>, con dirección física en la
          calle 127 # 13a-32 Oficina 202 de la ciudad de Bogotá, con teléfono
          (+57) 601 258 9933 (Quien en adelante se denominará el VIÑEDO o la
          organización) como Responsable del tratamiento de datos personales le
          informa que, durante la navegación en esta página web, previo a la
          solicitud de la respectiva autorización, podremos recolectar sus datos
          personales a través de: 1) El formulario de contacto “Escríbenos”,
          cuyos datos serán tratados principalmente para atender su solicitud;
          2) el formulario de reservas, compras y facturación, cuyos datos serán
          tratados para gestionar su pedido y/o reservas, así como emitir la
          respetiva factura electrónica; y 3) el formulario de registro de
          cliente, cuyos datos serán tratados para crear una cuenta personal que
          le permita gestionar su perfil con reservas y/o compras recurrentes.
        </p>
        <p>
          A su vez, para información sobre la totalidad de datos personales que
          son tratados por el VIÑEDO y las finalidades del tratamiento, lo
          invitamos a consultar nuestra{" "}
          <Link
            href={"/politica-de-tratamiento-de-datos-personales"}
            className="-text--dark-green font-medium hover:-text--light-green duration-200"
          >
            Política de Tratamiento de Datos Personales.
          </Link>
        </p>
        <p>
          Usted y todo titular tiene derecho a: conocer, actualizar y rectificar
          su información personal; acceder de manera gratuita a la misma; ser
          informado sobre su uso; solicitar prueba de la autorización; acudir
          ante la Superintendencia de Industria y Comercio y presentar quejas
          por infracciones a lo dispuesto en la normatividad vigente; y en los
          casos procedentes, modificar y revocar la autorización y/o solicitar
          la supresión de sus datos personales.
        </p>
        <p>
          Para cualquier información adicional relacionada con el tratamiento de
          sus datos personales, nuestra Política de Tratamiento de Datos y/o el
          ejercicio de su derecho de hábeas data, puede contactarnos por escrito
          a través del canal de atención dispuesto por el VIÑEDO:{" "}
          <a
            href="mailto:smartinez@marquesvl.com"
            className="-text--dark-green font-medium hover:-text--light-green hover:underline duration-200"
          >
            smartinez@marquesvl.com.
          </a>
        </p>
      </section>
    </main>
  );
}
