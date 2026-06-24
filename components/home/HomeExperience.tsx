import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Services } from "@/components/home/Services";
import { AiPitch } from "@/components/home/AiPitch";
import { Approach } from "@/components/home/Approach";
import { ScrollShowcaseSection } from "@/components/home/ScrollShowcaseSection";
import { StatsGrid } from "@/components/home/StatsGrid";
import { Faq } from "@/components/home/Faq";
import { Conversion } from "@/components/home/Conversion";
import type { MediaFlags } from "@/lib/media";

/**
 * Accueil — séquence variée, sans répétition de rythme : héros (impact) →
 * manifeste (aéré) → bento services (dense) → pitch IA + CTA vers la démo
 * (interactif) → approche (narratif) → stats marché en grille (opportunité) →
 * FAQ (objections) → conversion (clôture). La démo de chat fonctionnelle vit
 * uniquement sur /assistants-ia. Aucune image de projet : la DA s'appuie sur
 * la typo, le dégradé bleu et la 3D du héros. Scroll fluide global via Lenis
 * (SmoothScroll dans le layout).
 */
export function HomeExperience({ media }: { media: MediaFlags }) {
  return (
    <>
      <Hero media={media} />
      <Manifesto />
      <Services media={media} />
      <AiPitch />
      <Approach />
      <ScrollShowcaseSection />
      <StatsGrid />
      <Faq />
      <Conversion />
    </>
  );
}
