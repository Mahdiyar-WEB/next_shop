import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables Cache Components and Partial Prerendering in Next.js 16.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pvrqyfd3icxrazgs.public.blob.vercel-storage.com",
      },
    ],
  },
  cacheComponents: true,
};

export default nextConfig;
