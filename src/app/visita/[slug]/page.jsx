import Link from "next/link";
import PlanGallery from "@/components/Ecommerce/PlanGallery";
import ReactMarkdown from "react-markdown";
import ReservationField from "@/components/Ecommerce/Plans/ReservationField";
import { GetSinglePlan } from "@/components/GetContentApi";
import PlanRecomendations from "@/components/Ecommerce/Plans/PlanRecomendations";

const formatPrice = (price) => {
  if (!price) return "";
  return `$${Number(price).toLocaleString("es-CO")}`;
};

const extractGallery = (images) => {
  return (
    images?.map((image) => ({
      sourceUrl: `${process.env.STRAPI_URL}${image.url}`,
      altText: image.alternativeText || "Imagen plan",
    })) || []
  );
};

export default async function SinglePlanPage({ params }) {
  try {
    const planData = await GetSinglePlan(params.slug);
    const plan = planData?.data[0];

    if (!plan) {
      return <div className="container mx-auto py-16">Plan no encontrado</div>;
    }
    return (
      <div className="container mx-auto py-16">
        <div>
          <Link href="/" className="hover:-text--light-green">
            Inicio
          </Link>{" "}
          /{" "}
          <Link href="/visitas" className="hover:-text--light-green">
            Visitas
          </Link>{" "}
          / <span className="capitalize">{plan.name}</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-x-5 gap-y-9">
          <div className="max-w-3xl">
            <PlanGallery galleryImages={extractGallery(plan.gallery)} />
          </div>
          <div className="px-5">
            <h1 className="-text--dark-green text-5xl font-bold mb-3 uppercase">
              {plan.name}
            </h1>
            {plan.price && (
              <div className="text-2xl font-semibold">
                {formatPrice(plan.price)}{" "}
                <sup className="font-normal text-base">por persona</sup>{" "}
              </div>
            )}
            {plan.onlyAdults && (
              <div className="flex text-slate-600 gap-x-1 mt-4">
                <span className="icon-[uil--18-plus] text-2xl"></span>
                <span>Solo para mayores de edad.</span>
              </div>
            )}
            {plan.allowChilds && (
              <div className="flex text-slate-600 gap-x-1 mt-4">
                <span className="icon-[material-symbols--child-care-outline] text-2xl"></span>
                <span>Ingreso de menores de edad permitido sin costo.</span>
              </div>
            )}
            {plan.max_reservations && (
              <div className="flex items-center gap-1 py-3 text-slate-600">
                <span className="icon-[fluent--people-add-20-regular] text-3xl" />
                Máximo {plan.max_reservations} personas por reserva.
              </div>
            )}

            <ReactMarkdown className="my-3">{plan.description}</ReactMarkdown>

            <ReservationField
              schedules={plan.horarios}
              plan={plan}
              additionalServices={plan.servicios_adicionales} 
            />

            <PlanRecomendations max_reservations={plan.max_reservations} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log("Error cargando el plan", error);
    return (
      <div className="container mx-auto py-16">
        Ha ocurrido un error cargando el plan
      </div>
    );
  }
}
