import Link from "next/link";
import ModalSchedule from "./Plans/ModalSchedule";

export default function PlanCard({
  title,
  price,
  slug,
  image,
  altimg,
  experiences,
  onlyadults,
  allowchilds,
  Schedules,
  plan,
}) {
  const numColumns = experiences.length === 1 ? 1 : 4;
  return (
    <div className="flex flex-col pb-9 items-center shadow-lg rounded-md hover:shadow-slate-300">
      <div>
        <Link href={slug}>
          <img
            src={image}
            alt={altimg}
            className=" rounded-t-md mb-3 aspect-video object-fill"
          />
        </Link>
      </div>
      <div className="flex w-full px-5 justify-between items-center">
        <h2 className="text-2xl mb-1 font-bold -text--dark-green uppercase">
          <Link className="hover:-text--dark-red duration-300" href={slug}>
            {title}
          </Link>
        </h2>
        <div className="flex flex-col items-center">
          <p className="font-semibold text-base">{price ? price : ""}</p>
          <p className="text-xs -text--dark-green">
            {price ? "por persona" : "Ingresa para ver más"}
          </p>
        </div>
      </div>

      <ul
        className={`grid-cols-${numColumns} mt-4 mb-6 gap-y-2 gap-x-4 border-y -border--dark-red py-4 flex`}
      >
        {experiences?.map((experience, index) => (
          <li
            key={index}
            className="flex gap-x-1 items-center flex-col hover:scale-110 duration-300"
          >
            <img src={experience.iconurl} alt="icon" className="h-10 w-10" />
            <span className="text-xs mt-2 text-center font-semibold">
              {experience.name}
            </span>
          </li>
        ))}
      </ul>
      {onlyadults === true ? (
        <div className="flex gap-1 mb-5 text-slate-600 font-medium">
          <span className="icon-[uil--18-plus] text-2xl"></span>
          <span>Solo para mayores de edad</span>
        </div>
      ) : (
        ""
      )}
      {allowchilds === true ? (
        <div className="flex gap-1 mb-5 text-slate-600 font-medium">
          <span className="icon-[material-symbols--child-care-outline] text-2xl"></span>
          <span>Ingreso de menores de edad permitido sin costo</span>
        </div>
      ) : (
        ""
      )}
      <div className="flex gap-x-5">
        <Link
          href={slug}
          className="flex items-center gap-1 -text--dark-green -border--dark-green border-solid border-2 px-3 py-2 rounded hover:-bg--dark-green hover:text-white duration-300"
        >
          <span className="icon-[ph--eye]"></span> Ver
        </Link>
        {Schedules.length > 0 ? (
          <ModalSchedule PlanTitle={title} schedules={Schedules} plan={plan} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
