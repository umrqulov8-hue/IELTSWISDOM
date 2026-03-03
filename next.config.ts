import type { NextConfig } from "next";

const nextConfig = {
  // Fix: eslint property doesn't exist directly on NextConfig in some versions, 
  // but it's often used. If TS errors, we wrap it or use the correct structure.
  // Actually, 'eslint' IS a valid property of NextConfig in Next.js 15+, but 
  // the error TS2353 suggests a type mismatch or older type definitions.
  // We'll fix it by using the recommended structure or casting if necessary.
  eslint: {
    ignoreDuringBuilds: false, // Security: don't ignore lint errors in prod
  },
  typescript: {
    ignoreBuildErrors: false, // Security: don't ignore TS errors in prod
  },
  // Target modern browsers
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
