import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

// Clash Display et Satoshi (Fontshare) ne sont pas sur Google Fonts : chargées
// via <link rel="stylesheet"> ci-dessous (préchargement réel, pas d'@import
// CSS qui retarderait la police), exposées par --font-hero et --font-display
// / --font-body (voir tailwind.config.ts).
// Clash Display : seuls 300 (héros « light ») et 700 (bold) sont utilisés
// (font-hero) — les poids 400/500/600 inutiles sont retirés pour alléger le
// chargement réseau. Satoshi (display/body) garde 300/400/500/700.
const FONTSHARE_HREF =
  "https://api.fontshare.com/v2/css?f[]=clash-display@300,700&f[]=satoshi@300,400,500,700&display=swap";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
  variable: "--font-arabic",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "agence création de site web Maroc",
    "agence web Casablanca",
    "création site internet premium Maroc",
    "refonte site web Maroc",
    "agence chatbot IA Maroc",
    "assistant IA site web entreprise Maroc",
    "intégration IA site Maroc",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  formatDetection: { telephone: false },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#070B18",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${arabic.variable} ${serif.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTSHARE_HREF} />
      </head>
      <body className="min-h-screen bg-base font-body antialiased">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <SmoothScroll />
        <Preloader />
        <CustomCursor />

        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-deep focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-medium focus:text-white focus:shadow-glow-sm"
        >
          Aller au contenu
        </a>

        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
