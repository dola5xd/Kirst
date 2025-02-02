import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io/**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com/**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com/**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com/**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org/**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com/**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
