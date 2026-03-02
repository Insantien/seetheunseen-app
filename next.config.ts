import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Sanity CDN (all CMS images)
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        // Unsplash (development / placeholder images)
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Google OAuth profile photos
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        // Facebook OAuth profile photos
        protocol: "https",
        hostname: "graph.facebook.com",
      },
    ],
  },

  // Enable typed routes for better DX (optional, can be removed if slow)
  // experimental: {
  //   typedRoutes: true,
  // },
};

export default nextConfig;
