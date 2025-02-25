import { Montserrat, Marcellus } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Header from "@/components/Ui/Header";
import Footer from "@/components/Ui/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import { ViewTransitions } from "next-view-transitions";
import contactPage from "./contacto/page";

export const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const marcellus = Marcellus({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-marcellus",
});

export const metadata = {
  generator: "Next.js",
  applicationName: "Viñedo Ain Karim",
  metadataBase: new URL("https://ainkarim.co"),
  alternates: {
    canonical: "https://ainkarim.co",
    languages: {
      "es-CO": "https://ainkarim.co/es",
    },
  },
  referrer: "origin-when-cross-origin",
  keywords: [
    "Viñedo Ain Karim",
    "Viñedo en Villa de Leyva",
    "Turismo enológico Colombia",
    "Vino colombiano",
    "Catas de vino Villa de Leyva",
    "Turismo gastronómico Colombia",
    "Experiencia en viñedos",
    "Planes románticos Villa de Leyva",
    "Visitas guiadas viñedo",
  ],
  authors: [
    { name: "Eisncube", url: "https://einscube.com" },
    { name: "Javier Tenjo" },
  ],
  creator: "Javier Tenjo",
  publisher: "Ain Karim",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  title: {
    default: "Viñedo Ain Karim - Enoturismo en Villa de Leyva",
    template: "%s | Viñedo Ain Karim",
  },
  description:
    "Descubre el Viñedo Ain Karim en Villa de Leyva, un destino enoturístico donde podrás disfrutar de catas de vino, recorridos guiados y experiencias gastronómicas inolvidables.",
  openGraph: {
    title: {
      default: "Viñedo Ain Karim - Enoturismo en Villa de Leyva",
      template: "%s | Viñedo Ain Karim",
    },
    description:
      "Explora el Viñedo Ain Karim en Villa de Leyva y vive una experiencia única con nuestros vinos, catas y visitas guiadas en un entorno natural inigualable.",
    url: "https://ainkarim.co",
    siteName: "Viñedo Ain Karim",
    images: [
      {
        url: "https://ainkarim.co/uploads/vinedo_e0e861760e.webp",
        width: 1200,
        height: 630,
        alt: "Vista del Viñedo Ain Karim en Villa de Leyva con viñedos y montañas",
      },
      {
        url: "https://ainkarim.co/uploads/espacios_bc48180cfe.webp",
        width: 1200,
        height: 630,
        alt: "Cata de vinos en el Viñedo Ain Karim",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viñedo Ain Karim - Enoturismo en Villa de Leyva",
    description:
      "Vive la experiencia en Viñedo Ain Karim en Villa de Leyva. Catas de vino, recorridos guiados y más en un entorno natural espectacular.",
    site: "@ainskarim",
    creator: "@einscube",
    images: ["https://ainkarim.co/uploads/vinedo_e0e861760e.webp"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Viñedo Ain Karim",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },

  itunesApp: "app-id=123456789",

  // Metadatos LocalBusiness para mejorar el SEO local
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Winery",
    name: "Viñedo Ain Karim",
    url: "https://ainkarim.co",
    logo: "https://manager.ainkarim.co/uploads/logo_ain_karim_9987562b80.png",
    image: "https://ainkarim.co/uploads/vinedo_e0e861760e.webp",
    description:
      "Viñedo Ain Karim, ubicado en Villa de Leyva, ofrece catas de vino, recorridos guiados y experiencias gastronómicas en un ambiente espectacular.",
    telephone: "+57 317 431 9583",
    email: "ventas@marquesvl.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sutamarchán, Villa de Leyva",
      addressLocality: "Villa de Leyva",
      addressRegion: "Boyacá",
      postalCode: "154001",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "5.653951",
      longitude: "-73.590102",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday"],
        opens: "10:30",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "10:30",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday"],
        opens: "Closed",
        closes: "Closed",
      },
    ],
    sameAs: [
      "https://www.facebook.com/Vinedoainkarim",
      "https://www.facebook.com/Vinedoainkarim",
      "https://www.tripadvisor.co/Attraction_Review-g676524-d5888335-Reviews-Vinedo_Ain_Karim-Villa_de_Leyva_Boyaca_Department.html",
    ],
    hasPart: [
      {
        "@type": "WebPage",
        name: "Acerca de",
        url: "https://ainkarim.co/el-vinedo",
      },
      {
        "@type": "WebPage",
        name: "Preguntas Frecuentes",
        url: "https://ainkarim.co/preguntas-frecuentes",
      },
    ],
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Viñedo Ain Karim",
      url: "https://ainkarim.co",
      logo: "https://manager.ainkarim.co/uploads/logo_ainkarim_9987562b80.png",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        url: "https://ainkarim.co/contacto",
        telephone: "+57 317 431 9583",
        email: "ventas@marquesvl.com",
      },
      hasPart: [
        {
          "@type": "WebPage",
          name: "Acerca de",
          url: "https://ainkarim.co/el-vinedo",
        },
        {
          "@type": "WebPage",
          name: "Preguntas Frecuentes",
          url: "https://ainkarim.co/preguntas-frecuentes",
        },
      ],
    },
  },
};

export default function RootLayout(props) {
  return (
    <ViewTransitions>
      <html lang="es">
        <body
          className={`${montserrat.variable} ${marcellus.variable} antialiased`}
        >
          <CartProvider>
            <Header />
            <AppRouterCacheProvider>{props.children}</AppRouterCacheProvider>
            <Footer />
          </CartProvider>
          <Toaster position="bottom-left" />
        </body>
      </html>
    </ViewTransitions>
  );
}
