import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  output: 'standalone',

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'azrmwfzrgdvkbzezwyfo.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'data.ieltswisdom.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        // Cache static assets aggressively
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache optimized images
        source: '/_next/image(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: *.supabase.co https://images.unsplash.com https://data.ieltswisdom.com *.r2.dev https://grainy-gradients.vercel.app; media-src 'self' *.supabase.co blob: https://data.ieltswisdom.com *.r2.dev; connect-src 'self' *.supabase.co https://data.ieltswisdom.com *.r2.dev; frame-ancestors 'none';"
          },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "gsap", "react-icons"],
    optimizeCss: true, // Critical CSS inlining
    scrollRestoration: true,
  },
  transpilePackages: [
    "framer-motion", 
    "lenis", 
    "lucide-react", 
    "gsap", 
    "sonner", 
    "next-themes", 
    "react-icons", 
    "clsx", 
    "tailwind-merge"
  ],
};

export default nextConfig;
