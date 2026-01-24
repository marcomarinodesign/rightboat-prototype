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
    ],
    unoptimized: true,
  },
};

export default nextConfig;
