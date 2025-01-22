//import Link from "next/link";
import { Link } from 'next-view-transitions'

export default function Breadcumbs({ title }) {
  return (
    <span className="text-white text-center">
      <Link href="/" className="hover:-text--light-green duration-200">
        Inicio
      </Link>{" "}
      / <span className="capitalize">{title}</span>
    </span>
  );
}
