import Link from "next/link";

export default function Breadcumbs({title}) {
    
  return (
    <span className="text-white text-center">
      <Link href="/">Inicio</Link> / <span className="capitalize">{title}</span>
    </span>
  );
}
