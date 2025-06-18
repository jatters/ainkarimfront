import { Link } from 'next-view-transitions'

export default function Breadcrumbs({ title }) {
  return (
    <span className="text-white text-center text-sm gap-x-2 flex justify-center">
      <Link href="/" className="hover:-text--light-green duration-200">
        Inicio
      </Link>{" "}
      › <span className="capitalize">{title}</span>
    </span>
  );
}
