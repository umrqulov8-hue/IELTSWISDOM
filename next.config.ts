import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Target modern browsers — removes ~14KiB of legacy polyfills
  experimental: {
    optimizeCss: true,   // inline critical CSS, reduce render-blocking requests
  },
  compiler: {
    // Remove console.log in production for slightly smaller bundles
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
};

export default nextConfig;
