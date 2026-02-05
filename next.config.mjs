/** @type {import('next').NextConfig} */
const nextConfig = {
  /* PWA and performance optimizations */

  // Enable React strict mode
  reactStrictMode: true,

  output: "standalone",

  // Environment variables for production (NEXT_PUBLIC_* are safe to commit)
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://awais68-todo-chatbot.hf.space",
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "https://h2-phase-3-chatbot-todo-ixau.vercel.app",
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Todo Evolution",
    NEXT_PUBLIC_ENABLE_VOICE_COMMANDS: process.env.NEXT_PUBLIC_ENABLE_VOICE_COMMANDS || "true",
    NEXT_PUBLIC_ENABLE_MULTI_LANGUAGE: process.env.NEXT_PUBLIC_ENABLE_MULTI_LANGUAGE || "true",
    NEXT_PUBLIC_VOICE_LANG: process.env.NEXT_PUBLIC_VOICE_LANG || "en-US",
    NEXT_PUBLIC_VOICE_AUTO_SPEAK: process.env.NEXT_PUBLIC_VOICE_AUTO_SPEAK || "true",
    NEXT_PUBLIC_ANALYTICS_DEFAULT_DAYS: process.env.NEXT_PUBLIC_ANALYTICS_DEFAULT_DAYS || "30",
    NEXT_PUBLIC_ENABLE_VOICE: process.env.NEXT_PUBLIC_ENABLE_VOICE || "true",
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS || "true",
    NEXT_PUBLIC_ENABLE_RECURRING: process.env.NEXT_PUBLIC_ENABLE_RECURRING || "true",
  },

  // Compress images
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200],
  },

  // Headers for PWA
  async headers() {
    return [
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
      {
        // Apply CORS headers to all API routes
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
