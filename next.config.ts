import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rightboat.com",
      },
      {
        protocol: "https",
        hostname: "www.rightboat.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "img.logo.dev",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
