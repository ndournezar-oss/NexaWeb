"use client";

import Image from "next/image";
import { Bot, Gauge, Layers, RefreshCw, type LucideIcon } from "lucide-react";
import { MaskReveal } from "@/components/MaskReveal";
import { Reveal } from "@/components/Reveal";
import { home } from "@/lib/content";
import { MEDIA_PATHS, type MediaFlags } from "@/lib/media";

const ICONS: LucideIcon[] = [Layers, RefreshCw, Bot, Gauge];

/**
 * Position de chaque cellule dans la grille bento (4 col x 2 lignes en lg) :
 * IA en featured 2x2, Sites premium + Refonte empilés au centre, Performance
 * en colonne haute à droite. Asymétrique par construction, jamais une grille
 * de cartes identiques.
 */
const CELL_POSITION = [
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-3 lg:row-start-2",
  "lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1",
  "lg:row-span-2 lg:col-start-4 lg:row-start-1",
];

type Pillar = (typeof home.services.pillars)[number];

/**
 * « Ce qu'on fait » — bento grid asymétrique. Pas de capture d'écran : chaque
 * cellule s'appuie sur la typo, un glow/dégradé bleu, et l'icône. La cellule
 * IA peut réutiliser hero-bg.png en texture discrète (repli gracieux sinon).
 */
export function Services({ media }: { media: MediaFlags }) {
  return (
    <section className="relative overflow-hidden bg-base py-24 sm:py-32">
      <div className="relative mx-auto max-w-container px-5 sm:px-8">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-light">
            {home.services.kicker}
          </p>
        </Reveal>
        <MaskReveal
          as="h2"
          className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl"
        >
          {home.services.title}
        </MaskReveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-silver sm:text-lg">{home.services.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {home.services.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.07} className={`h-full ${CELL_POSITION[i]}`}>
              <BentoCell
                pillar={pillar}
                Icon={ICONS[i]}
                showTexture={pillar.highlight && media.heroBg}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCell({
  pillar,
  Icon,
  showTexture,
}: {
  pillar: Pillar;
  Icon: LucideIcon;
  showTexture: boolean;
}) {
  const highlight = pillar.highlight;
  return (
    <article
      className={`group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl border p-8 backdrop-blur transition-all duration-300 ease-premium hover:-translate-y-1 ${
        highlight
          ? "border-brand/50 bg-brand/10 shadow-glow-sm"
          : "border-white/10 bg-surface/60 hover:border-brand-light/40"
      }`}
    >
      {showTexture ? (
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <Image
            src={MEDIA_PATHS.heroBg}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
        </div>
      ) : highlight ? (
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand/30 blur-3xl" />
      ) : (
        <div className="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-brand/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
      )}

      <div className="relative">
        {highlight && (
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-brand-deep px-3 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white">
            Notre différenciateur
          </span>
        )}
        <span
          className={`inline-flex size-12 items-center justify-center rounded-xl ring-1 ring-inset ${
            highlight
              ? "bg-brand text-white ring-brand/40"
              : "bg-brand/15 text-brand-light ring-brand/30"
          }`}
        >
          <Icon className="size-6" aria-hidden="true" />
        </span>
      </div>

      <div className="relative">
        <h3 className={`font-display font-semibold text-white ${highlight ? "text-3xl" : "text-2xl"}`}>
          {pillar.title}
        </h3>
        <p className="mt-3 leading-relaxed text-silver">{pillar.description}</p>
      </div>
    </article>
  );
}
