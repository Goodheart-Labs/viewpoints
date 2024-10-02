/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.clerk.com",
      },
      {
        protocol: "https",
        hostname: "**.clerk.dev",
      },
    ],
  },
  headers: async () => [
    {
      source: "/iframe/:path*",
      headers: [
        {
          key: "X-Frame-Options",
          value: "ALLOWALL",
        },
        {
          key: "Access-Control-Allow-Origin",
          value: "*",
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET",
        },
        {
          key: "Access-Control-Allow-Headers",
          value: "*",
        },
      ],
    },
    {
      source: "/embed/:path*",
      headers: [
        { key: "X-Frame-Options", value: "ALLOWALL" },
        { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS" },
        { key: "Access-Control-Allow-Headers", value: "*" },
      ],
    },
  ],
};

export default nextConfig;
