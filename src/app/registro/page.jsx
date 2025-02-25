import RegisterPageClient from "@/components/RegisterPageClient";

export const metadata = {
  title: "Crea tu cuenta ",
  description:
    "Regístrate en Viñedo Ain Karim para acceder a experiencias exclusivas, ofertas especiales y disfrutar de nuestros productos enoturísticos.",
  alternates: { canonical: "https://ainkarim.co/crear-tu-cuenta" },
  openGraph: {
    title: "Crea tu cuenta ",
    description:
      "Regístrate en Viñedo Ain Karim para acceder a experiencias exclusivas, ofertas especiales y disfrutar de nuestros productos enoturísticos.",
    url: "https://ainkarim.co/crear-tu-cuenta",
    images: [
      {
        url: "https://ainkarim.co/banner-registro.webp",
        width: 1200,
        height: 630,
        alt: "Crea tu cuenta en Viñedo Ain Karim",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crea tu cuenta ",
    description:
      "Regístrate en Viñedo Ain Karim para acceder a experiencias exclusivas, ofertas especiales y disfrutar de nuestros productos enoturísticos.",
    images: ["https://ainkarim.co/banner-registro.webp"],
  },
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}
