import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Avoid Next mis-detecting workspace root when multiple lockfiles exist.
    root: process.cwd(),
  },
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
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
      {
        protocol: "https",
        hostname: "api.faviconkit.com",
      },
      {
        protocol: "https",
        hostname: "www.princessyachts.com",
      },
      {
        protocol: "https",
        hostname: "www.sunseeker.com",
      },
      {
        protocol: "https",
        hostname: "sunseeker.com",
      },
      {
        protocol: "https",
        hostname: "www.azimutyachts.com",
      },
      {
        protocol: "https",
        hostname: "www.fairline.com",
      },
      {
        protocol: "https",
        hostname: "www.beneteau.com",
      },
      {
        protocol: "https",
        hostname: "www.jeanneau.com",
      },
      {
        protocol: "https",
        hostname: "www.cata-lagoon.com",
      },
      {
        protocol: "https",
        hostname: "www.mastercraft.com",
      },
      {
        protocol: "https",
        hostname: "www.bostonwhaler.com",
      },
      {
        protocol: "https",
        hostname: "www.gradywhite.com",
      },
      {
        protocol: "https",
        hostname: "www.cobaltboats.com",
      },
      {
        protocol: "https",
        hostname: "www.tiarayachts.com",
      },
      {
        protocol: "https",
        hostname: "www.formulaboats.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1600],
  },
};

export default nextConfig;
