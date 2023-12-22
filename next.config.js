/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.bigbasket.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    API_HOST: "http://localhost:8080",
  },
};

module.exports = nextConfig;
