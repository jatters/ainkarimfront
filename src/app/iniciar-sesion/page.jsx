import LoginPageClient from "@/components/LoginPageClient";

export const metadata = {
  title: "Iniciar Sesión | Viñedo Ain Karim",
  description:
    "Inicia sesión en Viñedo Ain Karim para acceder a tu cuenta y disfrutar de nuestras experiencias enoturísticas.",
  alternates: { canonical: "https://ainkarim.co/iniciar-sesion" },
  openGraph: {
    title: "Iniciar Sesión | Viñedo Ain Karim",
    description:
      "Inicia sesión en Viñedo Ain Karim para acceder a tu cuenta y disfrutar de nuestras experiencias enoturísticas.",
    url: "https://ainkarim.co/iniciar-sesion",
    images: [
      {
        url: "https://ainkarim.co/login-image.webp",
        width: 1200,
        height: 630,
        alt: "Iniciar Sesión | Viñedo Ain Karim",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iniciar Sesión | Viñedo Ain Karim",
    description:
      "Inicia sesión en Viñedo Ain Karim para acceder a tu cuenta y disfrutar de nuestras experiencias enoturísticas.",
    images: ["https://ainkarim.co/login-image.webp"],
  },
};

export default function LoginPage() {
  return <LoginPageClient />;
}
