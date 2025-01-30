//import Link from "next/link";
import { Link } from 'next-view-transitions'
import PlanGallery from "@/components/Ecommerce/PlanGallery";
import ReactMarkdown from "react-markdown";
import ReservationField from "@/components/Ecommerce/Plans/ReservationField";
import { GetSinglePlan } from "@/components/GetContentApi";
import PlanRecomendations from "@/components/Ecommerce/Plans/PlanRecomendations";
import Calendar from "@/components/Ecommerce/Plans/Calendar";

const formatPrice = (price) => {
  if (!price) return "";
  return `$${Number(price).toLocaleString("es-CO")}`;
};

const extractGallery = (images) => {
  return (
    images?.map((image, index) => ({
      sourceUrl: `${process.env.NEXT_PUBLIC_SITE_URL}${image.url}`,
      altText: image.alternativeText || `Imagen plan ${index + 1}`,
    })) || []
  );
};

export default async function SinglePlanPage({ params }) {
  try {
    const planData = await GetSinglePlan(params.slug);
    if (!planData || !planData.data[0]) {
      console.error("Error fetching plan data");
      return (
        <div className="container mx-auto py-16 px-5">
          Error cargando información del plan
        </div>
      );
    }
    const {
      documentId,
      name,
      gallery,
      price,
      description,
      max_reservations,
      onlyAdults,
      allowChilds,
      horarios,
      servicios_adicionales,
      reglas_planes,
    } = planData?.data[0];

    return (
      <main>
        <section className="container mx-auto py-16 px-5">
          <div>
            <Link href="/" className="hover:-text--light-green">
              Inicio
            </Link>{" "}
            /{" "}
            <Link href="/visitas" className="hover:-text--light-green">
              Visitas
            </Link>{" "}
            / <span className="capitalize">{name}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-x-3 gap-y-9">
            <div className="max-w-3xl">
              <PlanGallery images={extractGallery(gallery)} />
            </div>
            <div className="px-0 md:px-5">
              <h1 className="-text--dark-green text-5xl font-bold mb-3 uppercase">
                {name}
              </h1>
              {price && (
                <div className="text-2xl font-semibold">
                  {formatPrice(price)}{" "}
                  <sup className="font-normal text-base">por persona</sup>{" "}
                </div>
              )}
              {onlyAdults && (
                <div className="flex text-slate-600 gap-x-1 mt-4">
                  <span className="icon-[uil--18-plus] text-2xl"></span>
                  <span>Solo para mayores de edad.</span>
                </div>
              )}
              {allowChilds && (
                <div className="flex text-slate-600 gap-x-1 mt-4">
                  <span className="icon-[material-symbols--child-care-outline] text-2xl"></span>
                  <span>Ingreso de menores de edad permitido sin costo.</span>
                </div>
              )}
              {max_reservations && (
                <div className="flex items-center gap-1 py-3 text-slate-600">
                  <span className="icon-[fluent--people-add-20-regular] text-3xl" />
                  Máximo {max_reservations} personas por reserva.
                </div>
              )}
              {description && (
                <ReactMarkdown className="mt-3 mb-5 xl:mb-10 prose">{description}</ReactMarkdown>
              )}
              
              
              {/* <Calendar /> */}
              <ReservationField
                horarios={horarios}
                additionalServices={servicios_adicionales}
                price={price}
                name={name}
                documentId={documentId}
                rules={reglas_planes}
              />

              <PlanRecomendations max_reservations={max_reservations} />
            </div>
          </div>
        </section>
        
      </main>
    );
  } catch (error) {
    console.error("Error cargando el plan", error);
    return (
      <div className="container mx-auto py-16">
        Ha ocurrido un error cargando el plan
      </div>
    );
  }
}
