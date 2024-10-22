import React from "react";
import HeaderImage from "@/components/Ui/HeaderImage";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FaqPage() {
  return (
    <>
      <HeaderImage
        title="Preguntas Frecuentes"
        background="/banner-contacto.jpg"
      />
      <section className="container mx-auto py-16 px-5">
        <div className="max-w-screen-md mx-auto">
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <span className="font-bold">
                ¿En dónde está ubicado el viñedo?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              km 5 vía villa de Leyva – Santa Sofía, tomando el desvío hacía la
              carretera que conecta la vía principal y el municipio de
              Sutamarchán.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <span className="font-bold">
                ¿Cómo puedo contactarme con ustedes?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              <div className="font-bold">Teléfono:</div>{" "}
              <div className="flex items-center gap-1">
                <span className="icon-[material-symbols--phone-enabled]"></span>
                <a href="tel:6012589933" className="hover:-text--light-green">
                  {" "}
                  601 258 9933
                </a>
              </div>
              <div className="font-bold">Reservas:</div>
              <div className="flex gap-1 items-center">
                <span className="icon-[ant-design--mobile-outlined]"></span>
                <a href="tel:3174319583" className="hover:-text--light-green">
                  317 431 9583
                </a>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <span className="font-bold">
                ¿Ofrecen servicio en clima lluvioso?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              Sí, contamos con algunas instalaciones cerradas para ofrecerle un
              mejor servicio pero se limita el ingreso al cultivo por motivos de
              seguridad en dichos casos.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <span className="font-bold">
                ¿Qué precio tienen los recorridos turísticos?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              Los valores son por persona y varían según el plan, éstos se
              encuentran en un rango de $99.000 pesos hasta $ 179.000 pesos. las
              especificaciones del contenido de cada plan y su valor exacto los
              encuentra en la pestaña de visitas en nuestra página web.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <span className="font-bold">¿Qué precio tienen los vinos?</span>
            </AccordionSummary>
            <AccordionDetails>
              Se encuentran en un rango de $ 109.000 a $200.000 pesos, manejamos
              actualmente 8 referencias las cuales puedes conocer en la pestaña
              vinos de nuestra página web.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <span className="font-bold">
                ¿Puedo llevar mascotas al viñedo?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              Sí, pero mantenemos restricción en el acceso a ciertas áreas como
              lo son: Cava, Fábrica, Salon de eventos y almacén; para ello
              contamos con amplias zonas verdes para que ellos puedan estar
              mientras usted ingresa a estos lugares.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <span className="font-bold">
                ¿La totalidad del recorrido se hace al aire libre?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              No, únicamente la visita al cultivo y en algunos casos según el
              plan la cata de vinos, por eso recomendamos el uso de ropa cómoda,
              protector solar y gorra durante el tour.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <span className="font-bold">
                ¿Realizan envíos internacionales?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              No, únicamente ofrecemos nuestros productos a nivel nacional.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <span className="font-bold">
                ¿En dónde puedo encontrar sus vinos?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              En el departamento de Boyacá contamos con ventas directas en el
              viñedo Ain Karim y en algunos almacenes de villa de leyva Puntos
              de venta Villa de leyva. En la ciudad de Bogotá puede visitar
              nuestra oficina, ubicada en la siguiente dirección: Calle 127 Nº
              13 A - 32 Oficina 202. Página web: www.ainkarim.co Aliados
              comerciales: La licorera.com
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <span className="font-bold">
                ¿Cuenta con protocolos de bioseguridad ante el covid 19?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              Si, contamos con certificación Check-in de actividad turística
              biosegura, así que ¡siéntase tranquilo de visitarnos! Recomendamos
              por su puesto el uso correcto de la mascarilla al ingresar al
              viñedo y durante su estadía en él.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <span className="font-bold">
                ¿Con qué medios de pago cuentan?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              Para sus compras directa en el almacén ofrecemos disponibilidad en
              efectivo o tarjeta ya sea débito/crédito; Compras virtuales por
              PSE.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <span className="font-bold">¿Cuentan con conductor elegido?</span>
            </AccordionSummary>
            <AccordionDetails>
              No, de momento no contamos con ese servicio así que sugerimos por
              su seguridad el uso responsable del alcohol durante la estadía en
              nuestro viñedo.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <span className="font-bold">
                ¿Cuentan con servicio de restaurante?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              No, pero ofrecemos variedad en tablas de quesos y entradas para
              que puedan acompañar nuestros deliciosos vinos.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <span className="font-bold">
                ¿Permiten el ingreso a menores de edad?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              Si, ofrecemos planes turísticos para mayores de edad y tambien
              para disfrutar en familia.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <span className="font-bold">
                ¿En qué horario puedo hacer la visita?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              Tenemos servicio de Lunes a Domingo de 10:30 a.m. a 5:30 p.m. a
              excepción de los martes.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <span className="font-bold">
                ¿Cuánto tardan los recorridos turísticos?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              Varían según el plan que elija, pero en promedio los planes están
              de 1 a 2 horas.
            </AccordionDetails>
          </Accordion>
        </div>
      </section>
    </>
  );
}
