import type { Metadata } from "next";
import { HomeExperience } from "@/components/home/HomeExperience";
import { JsonLd } from "@/components/JsonLd";
import { getMediaFlags } from "@/lib/media.server";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { home } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Accueil",
  description:
    "NaxioWeb, agence web à Casablanca spécialisée en création de sites web premium et assistants IA intégrés. Testez notre assistant IA en direct. Design, intelligence et conversion mesurable pour les entreprises au Maroc.",
  path: "/",
  keywords: [
    "agence web Casablanca",
    "création site web Maroc",
    "agence chatbot IA Maroc",
    "assistant IA site web entreprise Maroc",
  ],
});

export default function HomePage() {
  const media = getMediaFlags();
  return (
    <>
      <JsonLd data={faqJsonLd(home.faq.items)} />
      <HomeExperience media={media} />
    </>
  );
}
