import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MaskReveal } from "@/components/MaskReveal";
import { Reveal } from "@/components/Reveal";
import { ZelligePattern } from "@/components/ZelligePattern";
import { home } from "@/lib/content";

/**
 * Pitch IA de la home — texte court + CTA vers /assistants-ia. Pas de fenêtre
 * de chat ici : la démo fonctionnelle vit uniquement sur /assistants-ia.
 */
export function AiPitch() {
  const c = home.aiDemo;
  return (
    <section className="relative overflow-hidden bg-base py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[150px]" />
      <div className="pointer-events-none absolute inset-0 text-brand-light/50">
        <ZelligePattern opacity={0.05} scale={130} className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-light">
            {c.overline}
          </p>
        </Reveal>
        <MaskReveal as="h2" className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          {c.title}
        </MaskReveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-4 max-w-xl text-silver sm:text-lg">{c.subtitle}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <Link
            href="/assistants-ia"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-brand px-7 py-3.5 font-display text-sm font-medium text-white shadow-glow-sm transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-glow-lg"
          >
            {c.ctaLabel}
            <ArrowRight className="size-[1.1em]" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
