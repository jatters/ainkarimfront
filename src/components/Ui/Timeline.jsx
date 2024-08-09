"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Image from "next/image";
import fundacion from "../../../public/fundacion-del-vinedo.jpg";
import siembre from "../../../public/siembre-primer-lote.jpg";
import extension from "../../../public/extencion-de-cultivos.jpg";
import primerbotella from "../../../public/primer-botella.jpg";
import primereconocimientointernal from "../../../public/primer-reconocimiento-internal.jpg";
import expovinos from "../../../public/expovinos-invitados.jpg";
import mercadoCundi from "../../../public/apertura-de-mercado-cundinamarca.jpg";
import bruxelles from "../../../public/bruxelles.jpg";
import lanzamientoMerlot from "../../../public/lanzamiento-merlot.jpg";
import bruxelles2017 from "../../../public/bruxelles-2017.jpg";
import bpm from "../../../public/certificacion-bpm.jpg";
import conmemoracion from "../../../public/conmemoracion.jpg";
import decanter from "../../../public/decanter.jpg";

export default function Timeline() {
  return (
    <div className="App">
      <VerticalTimeline lineColor="#062f1d">
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #062f1d" }}
          iconStyle={{ background: "#062f1d", color: "#fff" }}
          icon={"1988"}
          iconClassName="pt-5 pl-3"
          visible={true}
        >
          <Image
            src={fundacion}
            alt="Fundación del viñedo"
            className="rounded-xl mx-auto"
          />
          <h3 className="vertical-timeline-element-title -text--dark-green font-bold pt-5 uppercase">
            Fundación del viñedo
          </h3>
          <p>
            El sueño que por años persiguió Pablo Toro al fin se encuentra
            materializado, nace entonces el Viñedo Ain Karim; una empresa que
            sin saberlo estaría destinada al éxito
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #062f1d" }}
          iconStyle={{ background: "#062f1d", color: "#fff" }}
          icon={"1992"}
          iconClassName="pt-5 pl-3"
          visible={true}
        >
          <Image
            src={siembre}
            alt="Fundación del viñedo"
            className="rounded-xl mx-auto"
          />
          <h3 className="vertical-timeline-element-title -text--dark-green font-bold pt-5 uppercase">
            SIEMBRA DEL PRIMER LOTE
          </h3>
          <p>
            En este año no sólo se realizó la plantación del primer lote de
            Cabernet Sauvignon, fue la siembra de un futuro prometedor como uno
            de los mejores viñedos en colombia.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #062f1d" }}
          iconStyle={{ background: "#062f1d", color: "#fff" }}
          icon={"2000"}
          iconClassName="pt-5 pl-3"
          visible={true}
        >
          <Image
            src={primerbotella}
            alt="Fundación del viñedo"
            className="rounded-xl mx-auto"
          />
          <h3 className="vertical-timeline-element-title -text--dark-green font-bold pt-5 uppercase">
            PRIMER BOTELLA DE VINO EN EL MERCADO
          </h3>
          <p>
            Fecha en la que se empezaron a obtener los frutos de esta titánica
            labor, en donde se superaron adversidades por condiciones
            climáticas.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #062f1d" }}
          iconStyle={{ background: "#062f1d", color: "#fff" }}
          icon={"2000"}
          iconClassName="pt-5 pl-3"
          visible={true}
        >
          <Image
            src={extension}
            alt="Fundación del viñedo"
            className="rounded-xl mx-auto"
          />
          <h3 className="vertical-timeline-element-title -text--dark-green font-bold pt-5 uppercase">
            EXTENSIÓN DE CULTIVOS
          </h3>
          <p>
            Para este viñedo una sola variedad no era suficiente, se planteó la
            idea de probar con otras cepas como Chardonnay. Marcando la historia
            aún más; rompiendo los esquemas de lo “permitido por el clima”.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #062f1d" }}
          iconStyle={{ background: "#062f1d", color: "#fff" }}
          icon={"2008"}
          iconClassName="pt-5 pl-3"
          visible={true}
        >
          <Image
            src={primereconocimientointernal}
            alt="Fundación del viñedo"
            className="rounded-xl mx-auto"
          />
          <h3 className="vertical-timeline-element-title -text--dark-green font-bold pt-5 uppercase">
            PRIMER RECONOCIMIENTO NIVEL INTERNACIONAL
          </h3>
          <p>
            Con seguridad fue uno de los mejores años; El vino Sauvignon Blanc
            cosecha 2008 obtuvo el reconocimiento de medalla de oro que impulsó
            el destino de la empresa, en Colombia; se empezaba a mencionar “
            viñedo Ain Karim, vino orgullosamente Colombiano”.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #062f1d" }}
          iconStyle={{ background: "#062f1d", color: "#fff" }}
          icon={"2008"}
          iconClassName="pt-5 pl-3"
          visible={true}
        >
          <Image
            src={expovinos}
            alt="Fundación del viñedo"
            className="rounded-xl mx-auto"
          />
          <h3 className="vertical-timeline-element-title -text--dark-green font-bold pt-5 uppercase">
            PARTICIPACIÓN EN EXPOVINOS COMO INVITADOS
          </h3>
          <p>
            Ser invitados a este gran evento no fue sólo todo un honor; si no la
            oportunidad para dar a conocer aún más este vino, su historia, su
            emblema y la pujanza de su creador.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #062f1d" }}
          iconStyle={{ background: "#062f1d", color: "#fff" }}
          icon={"2009"}
          iconClassName="pt-5 pl-3"
          visible={true}
        >
          <Image
            src={mercadoCundi}
            alt="Fundación del viñedo"
            className="rounded-xl mx-auto"
          />
          <h3 className="vertical-timeline-element-title -text--dark-green font-bold pt-5 uppercase">
            APERTURA DE MERCADO DE VINO EN CUNDINAMARCA
          </h3>
          <p>
            Con la gran aceptación que el vino Marqués de Villa de Leyva tuvo en
            el mercado de Boyacá; se decidió abrir camino hacía las tierras
            cundinamarqueses, un logro más para el empoderado Pablo Toro y su
            empresa.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #062f1d" }}
          iconStyle={{ background: "#062f1d", color: "#fff" }}
          icon={"2014"}
          iconClassName="pt-5 pl-3"
          visible={true}
        >
          <Image
            src={bruxelles}
            alt="Fundación del viñedo"
            className="rounded-xl mx-auto"
          />
          <h3 className="vertical-timeline-element-title -text--dark-green font-bold pt-5 uppercase">
            CONCURSO MUNDIAL DE BRUXELLES
          </h3>
          <p>
            Uno de los reconocimientos a la excelencia y gallardía. Fue obtenido
            con el vino Sauvignon Blanc; Marqués de Villa de Leyva competía sin
            ruborizarse con vinos franceses, italianos y españoles.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #062f1d" }}
          iconStyle={{ background: "#062f1d", color: "#fff" }}
          icon={"2015"}
          iconClassName="pt-5 pl-3"
          visible={true}
        >
          <Image
            src={lanzamientoMerlot}
            alt="Fundación del viñedo"
            className="rounded-xl mx-auto"
          />
          <h3 className="vertical-timeline-element-title -text--dark-green font-bold pt-5 uppercase">
            LANZAMIENTO CEPA MERLOT
          </h3>
          <p>
            El viñedo Ain Karim como pionero en el mundo vinícola en Colombia
            lanza la primera botella de Merlot una cepa muy solicitada por los
            amantes del vino.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #062f1d" }}
          iconStyle={{ background: "#062f1d", color: "#fff" }}
          icon={"2017"}
          iconClassName="pt-5 pl-3"
          visible={true}
        >
          <Image
            src={bruxelles2017}
            alt="Fundación del viñedo"
            className="rounded-xl mx-auto"
          />
          <h3 className="vertical-timeline-element-title -text--dark-green font-bold pt-5 uppercase">
            CONCURSO MUNDIAL DE BRUXELLES
          </h3>
          <p>
            Fue catalogado como uno de los mejores años para el viñedo Ain
            Karim, ya que sus vendimias resumieron en las características de sus
            vinos, los sabores más sublimes del trópico, llegando así a crear
            vinos claramente excepcionales; fue esta característica la que llevó
            al vino Cabernet Sauvignon Reserva especial 2015 a convertirse en
            acreedor y de forma muy merecedora de la medalla de plata en el
            renombrado concurso de Bruselas, efectuado el año 2017.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #062f1d" }}
          iconStyle={{ background: "#062f1d", color: "#fff" }}
          icon={"2019"}
          iconClassName="pt-5 pl-3"
          visible={true}
        >
          <Image
            src={bpm}
            alt="Fundación del viñedo"
            className="rounded-xl mx-auto"
          />
          <h3 className="vertical-timeline-element-title -text--dark-green font-bold pt-5 uppercase">
            CERTIFICACIÓN EN BPM
          </h3>
          <p>
            Con trabajo y dedicación se logró este objetivo que catalogó a los
            vinos Marqués de Villa de Leyva como un producto de calidad. Un
            certificado de muchos que se esperan obtener.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #062f1d" }}
          iconStyle={{ background: "#062f1d", color: "#fff" }}
          icon={"2019"}
          iconClassName="pt-5 pl-3"
          visible={true}
        >
          <Image
            src={conmemoracion}
            alt="Fundación del viñedo"
            className="rounded-xl mx-auto"
          />
          <h3 className="vertical-timeline-element-title -text--dark-green font-bold pt-5 uppercase">
            CONMEMORACIÓN A NIVEL INTERNACIONAL
          </h3>
          <p>
            Se obtuvo un galardón sumamente valioso en el prestigioso
            “International wine challenge”. La cepa Sauvignon blanc vendimia
            2018, recibió un reconocimiento a la calidad, particularidad y
            elegancia que lo caracteriza. Posicionando los productos Marqués de
            Villa de Leyva en la cima de la excelencia.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #062f1d" }}
          iconStyle={{ background: "#062f1d", color: "#fff" }}
          icon={"2019"}
          iconClassName="pt-5 pl-3"
          visible={true}
        >
          <Image
            src={decanter}
            alt="Fundación del viñedo"
            className="rounded-xl mx-auto"
          />
          <h3 className="vertical-timeline-element-title -text--dark-green font-bold pt-5 uppercase">
            DECANTER WORLD WINE AWARDS
          </h3>
          <p>
            Es el concurso reconocido a nivel mundial, más influyente en la
            industria del vino; en él participan los más selectos productos
            vínicos de todo el planeta, obtener un reconocimiento en este
            concurso ofrece distinción y renombre aquellos vinos merecedores del
            mismo, por eso, el Viñedo Ain Karim con su marca comercial Marqués
            de Villa de Leyva se complace en mencionar, que su vino Sauvignon
            Blanc 2018 es digno de poseer medalla de bronce en este afamado
            concurso; un logro más que refleja la calidad de sus placenteros
            productos 100% colombianos.
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
}
