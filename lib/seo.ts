import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Chemin relatif, ex: "/agence". "/" pour l'accueil. */
  path: string;
  keywords?: string[];
  /** <title> exact (sans suffixe auto " · NaxioWeb"), pour un contrôle SEO précis. */
  fullTitle?: string;
};

const BASE_KEYWORDS = [
  "agence création de site web Maroc",
  "agence web Casablanca",
  "création site internet premium Maroc",
  "refonte site web Maroc",
  "agence web premium Casablanca",
  "création site vitrine Maroc",
  "agence chatbot IA Maroc",
  "assistant IA site web entreprise Maroc",
  "intégration IA site Maroc",
];

/** Construit l'objet Metadata d'une page (title, description, canonical, OG, Twitter). */
export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  fullTitle: fullTitleOverride,
}: PageMetaInput): Metadata {
  const canonical = path === "/" ? "/" : path;
  const fullTitle =
    fullTitleOverride ??
    (path === "/" ? `${siteConfig.name} — ${siteConfig.tagline}` : `${title} · ${siteConfig.name}`);

  // app/opengraph-image.tsx (1200×630) ne s'applique automatiquement qu'à la
  // route racine "/" — la convention de fichier Next n'est PAS héritée par les
  // segments enfants (/agence, /blog/[slug], etc.). On la référence donc
  // explicitement ici pour que CHAQUE page ait bien une image OG.
  const ogImage = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} — ${siteConfig.tagline}`,
  };

  return {
    title: { absolute: fullTitle },
    description,
    keywords: [...BASE_KEYWORDS, ...keywords],
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}

/** JSON-LD schema.org ProfessionalService / LocalBusiness. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/opengraph-image`,
    logo: `${siteConfig.url}/media/nexaweblogo.png`,
    email: siteConfig.email,
    telephone: `+${siteConfig.whatsappNumber}`,
    priceRange: siteConfig.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.countryCode,
    },
    areaServed: [
      { "@type": "Country", name: "Maroc" },
      { "@type": "City", name: "Casablanca" },
    ],
    knowsLanguage: ["fr", "ar"],
    slogan: siteConfig.tagline,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services NaxioWeb",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Création de sites web premium",
            description:
              "Sites haut de gamme sur-mesure, conçus pour la marque et la conversion.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Intégration d'assistants IA",
            description:
              "Assistants IA intégrés au site : qualification de prospects, support 24/7, FAQ intelligente, prise de rendez-vous.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Refonte de site web haute conversion",
            description: "Transformation de sites datés en vitrines premium qui convertissent.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Performance & SEO",
            description: "Sites rapides, bien référencés, optimisés pour être trouvés au Maroc.",
          },
        },
      ],
    },
  };
}

/** JSON-LD WebSite (aide à la compréhension de la marque par les moteurs). */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "fr-MA",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

/** JSON-LD FAQPage — éligible aux rich results Google (questions dépliables). */
export function faqJsonLd(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

type ArticleJsonLdInput = {
  title: string;
  description: string;
  slug: string;
  date: string;
  image?: string;
};

/** JSON-LD BlogPosting — un article de blog. */
export function articleJsonLd({ title, description, slug, date, image }: ArticleJsonLdInput) {
  const url = `${siteConfig.url}/blog/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/#article`,
    headline: title,
    description,
    url,
    datePublished: date,
    dateModified: date,
    inLanguage: "fr-MA",
    image: image ? `${siteConfig.url}${image}` : `${siteConfig.url}/opengraph-image`,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
