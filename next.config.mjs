/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [          
          {
            protocol: "https",
            hostname: "manager.ainkarim.co",
            port: "",
            pathname: "/**",
          },
        ],
      },
};

export default nextConfig;
