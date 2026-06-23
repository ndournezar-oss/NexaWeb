"use client";

import { MaskReveal } from "@/components/MaskReveal";
import { Reveal } from "@/components/Reveal";
import { home } from "@/lib/content";

/**
 * « Notre approche » — timeline asymétrique en 3 temps, pas une grille de
 * cartes identiques : ligne de connexion + décalages verticaux alternés.
 * Seul moment de fond clair de la home, pour le contraste.
 */
export function Approach() {
  const c = home.approach;
  return (
    <section className="relative overflow-hidden bg-paper py-24 text-base sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(43,124,246,0.10),transparent_70%)]" />
      <div className="relative mx-auto max-w-container px-5 sm:px-8">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand">
            {c.kicker}
          </p>
        </Reveal>
        <MaskReveal
          as="h2"
          className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
        >
          {c.title}
        </MaskReveal>

        <div className="relative mt-20">
          <div className="pointer-events-none absolute left-0 right-0 top-[1.5rem] hidden h-px bg-gradient-to-r from-transparent via-base/15 to-transparent md:block" />
          <ol className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {c.steps.map((step, i) => (
              <Reveal
                key={step.step}
                delay={i * 0.12}
                as="li"
                className={i === 1 ? "md:mt-16" : i === 2 ? "md:mt-8" : ""}
              >
                <div className="relative">
                  <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-full border border-brand/30 bg-white font-display text-base font-semibold text-brand shadow-[0_8px_24px_-12px_rgba(30,95,216,0.5)]">
                    {step.step}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-base/70">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
