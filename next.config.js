/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

// CSP de base raisonnable. En dev, Next a besoin de 'unsafe-eval' (HMR / source maps).
// On garde 'unsafe-inline' pour les styles (Tailwind + styled-jsx) et le bootstrap
// d'hydratation de Next.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "img-src 'self' data: blob:",
  // cdn.fontshare.com sert les fichiers de police (Clash Display, Satoshi).
  "font-src 'self' data: https://cdn.fontshare.com",
  // api.fontshare.com sert la feuille de style <link> qui référence ces polices.
  "style-src 'self' 'unsafe-inline' https://api.fontshare.com",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config, { dev }) => {
    // Cache webpack en MÉMOIRE en dev : le cache disque se corrompait et cassait
    // le dev ; le désactiver totalement rendait les compilations interminables
    // depuis l'ajout de la stack 3D. Le cache mémoire évite la corruption disque
    // tout en gardant des recompilations rapides.
    if (dev) {
      config.cache = { type: "memory" };
    }
    return config;
  },
};

module.exports = nextConfig;
