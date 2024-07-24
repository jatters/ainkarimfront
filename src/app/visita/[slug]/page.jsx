import Link from "next/link";
import PlanGallery from "@/components/Ecommerce/PlanGallery";
import ReactMarkdown from "react-markdown";
import ReservationField from "@/components/Ecommerce/Plans/ReservationField";

async function fetchPlans() {
  const url = `${process.env.STRAPI_URL}/api/planes?populate=*`;
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error(error);
  }
}

const formatPrice = (price) => {
  if (!price) return "";
  const formatedPrice = price.split(",")[0];
  return `$${Number(formatedPrice).toLocaleString("es-CO")}`;
};

function extractGallery(images) {
  let galleryImages = [];

  if (images.attributes.gallery && images.attributes.gallery.data) {
    galleryImages = [
      ...galleryImages,
      ...images.attributes.gallery.data.map((image) => ({
        sourceUrl: process.env.STRAPI_URL + image.attributes.url,
        altText: image.attributes.alternativeText || "",
      })),
    ];
  }

  return galleryImages;
}

export default async function SinglePlanPage({ params }) {
  const plansData = await fetchPlans();
  const planInfo = plansData.find(
    (plan) => plan.attributes.slug === params.slug
  );
  const planImages = extractGallery(planInfo);

  return (
    <div className="container mx-auto pt-16 pb-14">
      <div>
        <Link href="/" className="hover:-text--light-green">Inicio</Link> / <Link href="/visitas" className="hover:-text--light-green">Visitas</Link> /{" "}
        <span className="capitalize">{planInfo.attributes.name}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-x-5 gap-y-9">
        <div className="max-w-3xl">
          <PlanGallery galleryImages={planImages} />
        </div>
        <div className="px-5">
          <h1 className="-text--dark-green text-5xl font-bold mb-3 uppercase">
            {planInfo.attributes.name}
          </h1>
          <div className="text-2xl font-semibold">
            {formatPrice(planInfo.attributes.price)}{" "}
            <sup className="font-normal text-lg">por persona</sup>{" "}
          </div>
          {planInfo.attributes.onlyAdults ? (
            <div className="flex text-slate-600 gap-x-1 mt-4">
              <span className="icon-[uil--18-plus] text-2xl"></span>
              <span>Solo para mayores de edad</span>
            </div>
          ) : (
            ""
          )}
          {planInfo.attributes.allowChilds ? (
            <div className="flex text-slate-600 gap-x-1 mt-4">
              <span className="icon-[material-symbols--child-care-outline] text-2xl"></span>
              <span>Ingreso de menores de edad permitido sin costo</span>
            </div>
          ) : (
            ""
          )}

          <div className="flex items-center gap-1 py-3 text-slate-600">
            <span className="icon-[fluent--people-add-20-regular] text-3xl"></span>
            Máximo {planInfo.attributes.max_guest} personas por reserva
          </div>          
          <ReactMarkdown className="my-3">
            {planInfo.attributes.description}
          </ReactMarkdown>

          <ReservationField schedules={planInfo.attributes.horarios.data} plan={planInfo} />
          <div className="p-5 border -border--dark-green rounded mt-8">
            <div className="flex items-center text-2xl font-bold gap-1 pt-2 pb-4">
              <span className="icon-[emojione--warning]"></span>Recomendaciones:
            </div>
            <div className="">
              <p>Evite contratiempos.</p>
              <ul className="list-disc list-inside">
                <li>
                  Procure llegar 15 minutos antes de su reserva programada.
                </li>
                <li>
                  No podrá reprogramar su horario de reserva en el mismo día.
                </li>
                <li>
                  Para reprogramación de su reserva envíe un correo a{" "}
                  <a href="mailto:ventas@marquesvl.com">ventas@marquesvl.com</a>
                </li>
                <li>Si es un grupo de más de {planInfo.attributes.max_guest} personas, por favor solicite información al correo ventas@marquesvl.com.


                </li>
              </ul>
              <div className="mb-4">
                <Link
                  href="/politica-de-privacidad"
                  className="text-xs hover:-text--light-green duration-200"
                  target="_blank"
                >
                  Aplica términos y condiciones
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
