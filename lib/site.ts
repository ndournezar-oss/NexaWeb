/**
 * Configuration centrale du site. Toutes les valeurs sensibles au déploiement
 * (URL, WhatsApp, e-mail) sont lues depuis les variables d'environnement avec
 * des valeurs de repli sûres pour que le build ne plante jamais.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nexaweb.ma";
// Normalise : pas de slash final.
const SITE_URL = rawSiteUrl.replace(/\/$/, "");

// Numéro WhatsApp principal : 0701200902 (Maroc) → format international 212701200902.
const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP ?? "212701200902").replace(
  /[^\d]/g,
  ""
);

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "ndour.nezar@gmail.com";

export const siteConfig = {
  name: "NaxioWeb",
  legalName: "NaxioWeb",
  tagline: "Agence web premium & assistants IA à Casablanca",
  description:
    "Agence web premium au Maroc : sites haut de gamme et assistants IA intégrés. Design, intelligence et conversion mesurable pour les entreprises qui visent le niveau international.",
  url: SITE_URL,
  locale: "fr_MA",
  city: "Casablanca",
  region: "Casablanca-Settat",
  country: "Maroc",
  countryCode: "MA",
  email: CONTACT_EMAIL,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappDisplay: "+212 701 20 09 02",
  // Second numéro (appel direct)
  phone: {
    display: "+212 659 529 930",
    tel: "+212659529930",
    e164: "212659529930",
  },
  priceRange: "$$$",
} as const;

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/assistants-ia", label: "Assistants IA" },
  { href: "/agence", label: "Agence" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

/** Construit un lien WhatsApp avec un message pré-rempli, encodé proprement. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Lien mailto de repli, message encodé. */
export function mailtoLink(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${siteConfig.email}${qs ? `?${qs}` : ""}`;
}

export const defaultWhatsappMessage =
  "Bonjour NaxioWeb, je souhaite discuter d'un projet de site web.";
