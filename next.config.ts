import type { NextConfig } from "next";

// Next.js 16 has a type regression where 'eslint' was removed from NextConfig.
// We use a cast to work around this while keeping the config functional.
// See: https://github.com/vercel/next.js/issues/72072
const nextConfig = {
  compress: true,

  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'azrmwfzrgdvkbzezwyfo.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel-analytics.com va.vercel-scripts.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: blob: *.supabase.co; media-src 'self' *.supabase.co blob:; connect-src 'self' *.supabase.co *.vercel-analytics.com va.vercel-scripts.com; frame-ancestors 'none';"
          },
        ],
      },
    ];
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
    scrollRestoration: true,
    turbo: {
      resolveAlias: {
        "core-js/modules/es.array.at": "./src/lib/polyfills-dummy.js",
        "core-js/modules/es.array.flat": "./src/lib/polyfills-dummy.js",
        "core-js/modules/es.array.flat-map": "./src/lib/polyfills-dummy.js",
        "core-js/modules/es.object.from-entries": "./src/lib/polyfills-dummy.js",
        "core-js/modules/es.object.has-own": "./src/lib/polyfills-dummy.js",
        "core-js/modules/es.string.trim-end": "./src/lib/polyfills-dummy.js",
        "core-js/modules/es.string.trim-start": "./src/lib/polyfills-dummy.js",
      }
    }
  },
} as any;

export default nextConfig;
