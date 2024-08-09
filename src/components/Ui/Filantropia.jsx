import Image from "next/image";
import zapaton from "../../../public/el-zapaton.jpg";
import utiles from "../../../public/utiles-escolares.jpg";
import regalosn from "../../../public/regalos-de-navidad.jpg";
import regalos from "../../../public/regalos-de-navidad2.jpg";
import mercados from "../../../public/mercados.jpg";
import festividades from "../../../public/festividades-de-sutamarchan.jpg";
import deporte from "../../../public/Deporte.jpg";

export default function filantropia() {
  return (
    <>
      <h2 className="text-4xl -text--dark-green text-center mb-14">
        FILANTROPÍA
      </h2>
      <div className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-14 items-center shadow-xl py-10 px-10 rounded-xl">
          <Image
            src={zapaton}
            alt="El Zapaton"
            loading="lazy"
            className="h-96 w-auto rounded-lg"
          />
          <div className="space-y-5 py-10 px-10">
            <h3 className="text-3xl -text--dark-green mb-7">El Zapatón</h3>
            <p>
              Esta idea, nació en Febrero del año 2019, en el municipio de
              Sáchica; Con fines de proporcionar bienestar en los niños de bajos
              recursos de la comunidad. La iniciativa se ejecutó con el donativo
              de zapatos escolares, para que más niños asistieran a la escuela
              con un calzado adecuado que les permita estar cómodos y llevar a
              cabo de forma ideal sus actividades estudiantiles.
            </p>
            <p>
              El viñedo consciente de la situación de vulnerabilidad presente en
              algunos sectores de este municipio, decidió contribuir con el
              desarrollo de esta actividad.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-14 items-center shadow-xl py-10 px-10 rounded-xl">
          <div className="space-y-5 py-10 px-10">
            <h3 className="text-3xl -text--dark-green mb-7">
              Útiles escolares
            </h3>
            <p>
              Para iniciar el año escolar 2020, el viñedo Ain Karim decidió
              apoyar a las familias de los municipios aledaños, que no contaran
              con los recursos suficientes para brindarles a sus hijos los
              elementos escolares básicos para el ingreso a clases; así que
              decidió aportar un completo material escolar que permitiera a los
              niños el inicio de su actividad académica, evitando la deserción
              escolar de muchos de ellos; que con interés de aprender se limitan
              a hacerlo por no contar con estos elementos necesarios. La empresa
              Ain Karim sabe que contribuir en beneficio de la educación de los
              niños de escasos recursos es de gran importancia, ya que les
              ayudará a crear herramientas que les permita mejorar su calidad de
              vida
            </p>
          </div>
          <div>
            <Image
              src={utiles}
              alt="Utiles escolares"
              loading="lazy"
              className="h-96 w-auto rounded-lg"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-14 items-center shadow-xl py-10 px-10 rounded-xl">
          <Image
            src={regalosn}
            alt="Regalos de navidad"
            loading="lazy"
            className="h-96 w-auto rounded-lg"
          />
          <div className="space-y-5 py-10 px-10">
            <h3 className="text-3xl -text--dark-green mb-7">
              Regalos de Navidad
            </h3>
            <p>
              Teniendo en cuenta que la navidad es una fecha para compartir; El
              viñedo Ain Karim decidió hacerlo; apoyando en colaboración con la
              alcaldía del municipio de Sutamarchán, la iniciativa de donar
              regalos de navidad para los niños de esta población, que esperan
              con ilusión la llegada de esta fecha para obtener juguetes.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-14 items-center shadow-xl py-10 px-10 rounded-xl">
          <div className="space-y-5 py-10 px-10">
            <h3 className="text-3xl -text--dark-green mb-7">Mercados</h3>
            <p>
              Analizando la emergencia sanitaria presentada desde el año 2020;
              Muchas familias tuvieron que resguardarse en casa para proteger a
              los suyos, pero esto implicó no poder trabajar y por ende no tener
              dinero para la compra de alimentos; Viendo esto el viñedo Ain
              Karim decidió contribuir para mejorar la situación de éstas
              familias, donando mercados con alimentos esenciales.
            </p>
          </div>
          <Image
            src={mercados}
            alt="Mercados"
            loading="lazy"
            className="h-96 w-auto rounded-lg"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-14 items-center shadow-xl py-10 px-10 rounded-xl">
          <Image
            src={festividades}
            alt="Festividades"
            loading="lazy"
            className="h-96 w-auto rounded-lg"
          />
          <div className="space-y-5 py-10 px-10">
            <h3 className="text-3xl -text--dark-green mb-7">
              Festividades de Sutamarchan
            </h3>
            <p>
              En el año 2022 el Viñedo Ain Karim hizo aportes a la alcaldía del
              municipio de Sutamarchan en el tradicional desfile del reciclaje,
              los aportes fueron destinados a la premiación de dicho evento.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-14 items-center shadow-xl py-10 px-10 rounded-xl">
          <div className="space-y-5 py-10 px-10">
            <h3 className="text-3xl -text--dark-green mb-7">Deporte</h3>
            <p>
              Con el fin de incentivar las actividades deportivas, en el año
              2022 el viñedo Ain Karim en distintas ocasiones aporto uniformes a
              equipos de futbol y baloncesto del municipio de Sutamarchan y
              Sachica.
            </p>
          </div>
          <Image
            src={deporte}
            alt="Deporte"
            loading="lazy"
            className="h-96 w-auto rounded-lg"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-14 items-center shadow-xl py-10 px-10 rounded-xl">
          <Image
            src={regalos}
            alt="Regalos de navidad"
            loading="lazy"
            className="h-96 w-auto rounded-lg"
          />
          <div className="space-y-5 py-10 px-10">
            <h3 className="text-3xl -text--dark-green mb-7">
              Regalos de Navidad
            </h3>
            <p>
              En diciembre del año 2022 niños de cinco sectores de los
              municipios de Sutamarchan, Sachica y Villa de Leyva recibieron
              juguetes por motivo de la epoca navideña, el Viñedo Ain Karim tomo
              esta iniciativa voluntaria con el fin de recibir multiples
              sonrisas de estos niños quienes por estas fechas desean recibir
              juguetes y que por vulnerabilidad economica los padres no pueden
              conceder.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
