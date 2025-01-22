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
};

export default nextConfig;
