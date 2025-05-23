import { Link } from "next-view-transitions";
import ModalSchedule from "./Plans/ModalSchedule";
import Image from "next/image";

const formatPrice = (price) => {
  if (!price) return "";
  const formatedPrice = String(price);
  return `$${Number(formatedPrice).toLocaleString("es-CO")}`;
};

const baseurl = process.env.NEXT_PUBLIC_SITE_URL;

export default function PlanCard({
  planId,
  name,  
  price,
  slug,
  image,
  rules,
  altimg,
  experiences,
  onlyadults,
  allowchilds,
  horarios,
  additionalServices,
  max_reservations,
  unitPlan,
}) {
  const imageUrl = image?.formats?.small?.url
    ? `${baseurl}${image.formats.small.url}`
    : "";

  const numColumns = experiences.length === 1 ? 1 : 4;
  return (
    <>
      <div className="aspect-video overflow-hidden relative rounded-t-md mb-4">
        <Link href={slug} className="" aria-label={`Ver ${name}`}>
          <Image
            src={imageUrl}
            alt={altimg}
            className=" rounded-t-md mb-3 aspect-video group-hover:scale-105 duration-200"
            width={490}
            height={280}
          />
        </Link>
      </div>
      <div className="flex w-full px-5 justify-between items-center">
        <h2 className=" text-xl md:text-xl xl:text-lg 2xl:text-2xl xl:mb-1 font-bold -text--dark-green uppercase">
          <Link
            className="group-hover:-text--dark-red duration-300"
            href={slug}
          >
            {name}
          </Link>
        </h2>
        <div className="flex flex-col items-center">
          <p className="font-semibold text-base">{formatPrice(price) || ""}</p>
          <p className="text-xs -text--dark-green">
            {price ? (
              `por ${unitPlan.toLowerCase()}`
            ) : (
              <span className="break-normal">Ingresa para ver más</span>
            )}
          </p>
        </div>
      </div>
      <ul
        className={`grid-cols-${numColumns} mt-4 mb-6 gap-y-2 gap-x-4 border-y -border--dark-red py-4 flex`}
        aria-label="Caracteristicas del plan"
      >
        {experiences?.map((experience, index) => (
          <li
            key={index}
            className="flex gap-x-1 items-center flex-col hover:scale-110 duration-200 antialiased"
          >
            <Image
              src={experience.iconurl}
              alt={experience.alt}
              className="h-10 w-10"
              width={40}
              height={40}
            />
            <span className="text-xs mt-2 text-center font-semibold">
              {experience.name}
            </span>
          </li>
        ))}
      </ul>
      {onlyadults === true && (
        <div className="flex gap-1 items-center mb-5 text-slate-600 font-medium ">
          <span className="icon-[uil--18-plus] text-2xl"></span>
          <span className="text-sm">Solo para mayores de edad</span>
        </div>
      )}
      {allowchilds === true && (
        <div className="flex items-center mb-5 gap-1 text-slate-600 font-medium">
          <span className="icon-[material-symbols--child-care-outline] text-2xl"></span>
          <span className="text-center text-sm">
            Ingreso gratuito para menores
          </span>
        </div>
      )}
      <div className="flex flex-wrap gap-5  justify-center">
        <Link
          href={slug}
          className="flex items-center gap-1 -text--dark-green -border--dark-green border-solid border-2 px-4 py-2 rounded hover:-bg--dark-green hover:text-white duration-200"
        >
          <span className="icon-[ph--eye]"></span> Ver
        </Link>

        {horarios.length > 0 && (
          <ModalSchedule
            name={name}
            price={price}
            image={image}
            unitPlan={unitPlan}
            documentId={planId}
            rules={rules}
            horarios={horarios}
            additionalServices={additionalServices}
            max_reservations={max_reservations}
          />
        )}
      </div>
    </>
  );
}
