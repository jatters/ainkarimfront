import HeaderImage from "@/components/Ui/HeaderImage";
import { GetProducts } from "@/components/GetContentApi";
import FilterableProducts from "@/components/Ecommerce/FilterableProducts";
import Popup from "@/components/Ui/Popup";
import Script from "next/script";
import { GetCepas, GetProductCategories } from "@/components/GetContentApi";

export const metadata = {
  title: "Compra los mejores vinos colombianos",
  description:
    "Explora la selección de vinos de Viñedo Ain Karim. Encuentra vinos tintos, blancos y espumosos, disponibles para compra online. Envío a toda Colombia.",
  keywords: [
    "Vinos Ain Karim",
    "Vinos en Villa de Leyva",
    "Compra vinos online",
    "Vinos tintos colombianos",
    "Vinos blancos colombianos",
    "Vinos espumosos",
    "Bodega Ain Karim",
  ],
  alternates: {
    canonical: "https://ainkarim.co/productos",
  },
  openGraph: {
    title: "Vinos de Viñedo Ain Karim | Compra los mejores vinos colombianos",
    description:
      "Explora la selección de vinos de Viñedo Ain Karim. Encuentra vinos tintos, blancos y espumosos, disponibles para compra online. Envío a toda Colombia.",
    url: "https://ainkarim.co/productos",
    siteName: "Viñedo Ain Karim",
    images: [
      {
        url: "https://ainkarim.co/images/tienda-vinos-og.jpg",
        width: 1200,
        height: 630,
        alt: "Vinos de Viñedo Ain Karim disponibles para compra",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinos de Viñedo Ain Karim | Compra los mejores vinos colombianos",
    description:
      "Descubre los vinos de Viñedo Ain Karim en Villa de Leyva. Compra online vinos tintos, blancos y espumosos con entrega en toda Colombia.",
    site: "@ainskarim",
    creator: "@einscube",
    images: ["https://ainkarim.co/images/tienda-vinos-og.jpg"],
  },
};

export default async function ProductsPage() {
  const [products, cepas, categorias] = await Promise.all([
    GetProducts(),
    GetCepas(),
    GetProductCategories(),
  ]);

  if (!products) {
    console.error("Error loading products");
    return (
      <div className="container mx-auto py-16 px-5">
        Error cargando productos. Por favor intenta más tarde.
      </div>
    );
  }

  return (
    <main>
      <Popup location="store" />
      <HeaderImage title="Vinos" background="/banner-vinos.webp" />
      <section className="container mx-auto py-8 lg:py-16" aria-label="Productos">
        <FilterableProducts
          initialProducts={products}
          cepas={cepas}
          categorias={categorias}
        />
      </section>
    </main>
  );
}

