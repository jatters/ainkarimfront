import Link from "next/link";

export default function ProductCard({slug, title, image, altimg, price, category }) {
  return (
    <div className="flex flex-col items-center shadow-md pb-4 hover:shadow-slate-400 rounded-md">
      <Link href={slug}>
        <img
          src={image}
          alt={altimg}
          className="rounded-t-lg"
        />
      </Link>
      <div className="font-bold mt-4 mb-1 uppercase -text--dark-red text-center hover:font-semibold">
        <Link href={slug}>{title}</Link>
      </div>
      <div className="-text--dark-green italic">{category}</div>
      <div className="mb-3 font-semibold">{price}</div>
      <div className="flex gap-3">
        <Link
          href={slug}
          className="flex items-center gap-1 -text--dark-green -border--dark-green border-solid border-2 px-3 py-2 rounded hover:-bg--dark-green hover:text-white duration-300"
        >
          <span className="icon-[ph--eye]"></span> Ver
        </Link>
        <button className="flex items-center gap-1 -bg--dark-green text-white px-6 py-3 rounded hover:-bg--light-green duration-300">
          <span className="icon-[iconoir--cart-plus]"></span> Añadir al carrito
        </button>
      </div>
    </div>
  );
}
