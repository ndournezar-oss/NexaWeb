"use client";

import { MaskReveal } from "@/components/MaskReveal";
import { Reveal } from "@/components/Reveal";
import { home } from "@/lib/content";

/**
 * Manifeste — une ligne éditoriale, plein écran, beaucoup d'espace négatif.
 * Rythme « aérien » entre le héros (impact) et la grille bento (dense).
 * Pas d'image : la typographie Clash Display fait le travail.
 */
export function Manifesto() {
  const c = home.manifesto;
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-base py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[160px]"
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-light">
            {c.kicker}
          </p>
        </Reveal>
        <MaskReveal
          as="h2"
          delay={0.1}
          className="mt-8 font-display text-3xl font-light leading-[1.25] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {c.line1}
          <br />
          <span className="text-brand-light">{c.line2}</span>
        </MaskReveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-10 max-w-xl text-lg leading-relaxed text-silver">{c.detail}</p>
        </Reveal>
      </div>
    </section>
  );
}
