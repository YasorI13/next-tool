import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
