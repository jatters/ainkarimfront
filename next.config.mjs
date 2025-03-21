/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MP_PUBLIC_KEY: process.env.NEXT_PUBLIC_MP_PUBLIC_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "manager.ainkarim.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ainkarim.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/wp-content/uploads/Formato-devolucion-de-Dinero.pdf",
        destination: "/solicitud-reembolso",
        permanent: true,
      },
      {
        source:
          "/wp-content/uploads/Protocolo-de-Bioseguridad-para-proveedores.pdf",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/Certificado-INVIMA-VAK.pdf",
        destination: "/",
        permanent: true,
      },
      {
        source: "/inicio/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-content/uploads",
        destination: "/",
        permanent: true,
      },
      {
        source: "/vinos",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/page/4",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/tienda",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/advertencias-y-recomendacion",
        destination: "/advertencias-y-recomendaciones",
        permanent: true,
      },
      {
        source: "/categoria/maridajes/encurtidos/",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/categoria/maridajes/mermeladas/",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/categoria/maridajes/page/2",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/categoria/planes/",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/categoria/sombreros/",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/categoria/souvenirs/page/2",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/categoria/souvenirs/sombreros",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/categoria/souvenirs/sombreros/",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/categoria/vinos/",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/categoria/vinos/gabriela/",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/categoria/vinos/marques/",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/categoria/vinos/page/2",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/como-llegar/",
        destination: "/informacion",
        permanent: true,
      },
      {
        source: "/crear-tu-cuenta",
        destination: "/registro",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/preguntas-frecuentes",
        permanent: true,
      },
      {
        source: "/planes-del-vinedo",
        destination: "/visitas",
        permanent: true,
      },
      {
        source: "/politica-dato-personal",
        destination: "/politica-de-tratamiento-de-datos-personales",
        permanent: true,
      },
      {
        source: "/politica-privacidad",
        destination: "/politica-de-tratamiento-de-datos-personales",
        permanent: true,
      },
      {
        source: "/politica-privacidad-terminos-condiciones/",
        destination: "/politica-de-tratamiento-de-datos-personales",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/",
        permanent: true,
      },
      {
        source: "/portfolio/lorem-ipsum",
        destination: "/",
        permanent: true,
      },
      {
        source: "/portfolio/portfolio-big",
        destination: "/",
        permanent: true,
      },
      {
        source: "/portfolio/vimeo-video",
        destination: "/",
        permanent: true,
      },
      {
        source: "/preguntas-frecuentes/puntos-de-venta-villa-de-leyva",
        destination: "/puntos-de-venta",
        permanent: true,
      },
      {
        source: "/producto/complemento-cumpleanos",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/puntos-de-venta-",
        destination: "/puntos-de-venta",
        permanent: true,
      },
      {
        source: "/puntos-de-venta-",
        destination: "/puntos-de-venta",
        permanent: true,
      },
      {
        source: "/puntos-de-venta-villa-de-leyva",
        destination: "/puntos-de-venta",
        permanent: true,
      },
      {
        source: "/reembolso",
        destination: "/solicitud-reembolso",
        permanent: true,
      },
      {
        source: "/solicitud-de-reembolso",
        destination: "/solicitud-reembolso",
        permanent: true,
      },
      {
        source: "/tienda",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/tienda/page/1",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/producto/plan-marques-2",
        destination: "/productos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
