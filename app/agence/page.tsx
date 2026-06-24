import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gem, Sparkles, Wallet, type LucideIcon } from "lucide-react";
import { AuraBackground } from "@/components/AuraBackground";
import { Counter } from "@/components/Counter";
import { MaskReveal } from "@/components/MaskReveal";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ZelligeDivider, ZelligePattern } from "@/components/ZelligePattern";
import { pageMetadata } from "@/lib/seo";
import { btn } from "@/lib/ui";
import { agence } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "L'agence",
  fullTitle: "NaxioWeb — Agence de création de sites web à Casablanca",
  description:
    "NaxioWeb, agence de création de sites web à Casablanca : une jeune équipe marocaine d'experts web et IA, avec une mission — hisser les entreprises marocaines au niveau des meilleurs studios du monde, à prix juste.",
  path: "/agence",
  keywords: [
    "agence de création de sites web Casablanca",
    "agence web premium Maroc",
    "studio digital Casablanca",
    "à propos NaxioWeb",
  ],
});

const PILLAR_ICONS: Record<string, LucideIcon> = {
  "La qualité, d'abord.": Gem,
  "L'intelligence, en plus.": Sparkles,
  "Un prix juste.": Wallet,
};

export default function AgencePage() {
  const featuredPillar = agence.difference.pillars.find((p) => p.featured)!;
  const otherPillars = agence.difference.pillars.filter((p) => !p.featured);

  return (
    <>
      {/* 1 — Intro : déclaration de mission, plein écran, aéré, police fine du héros */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-base pt-20">
        <div className="pointer-events-none absolute -top-24 right-0 h-[40rem] w-[40rem] rounded-full bg-brand/15 blur-[140px]" />
        <div className="pointer-events-none absolute inset-0 text-brand-light/60">
          <ZelligePattern opacity={0.05} scale={110} className="h-full w-full" />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-light">
              {agence.hero.kicker}
            </p>
          </Reveal>
          <MaskReveal
            as="h1"
            delay={0.1}
            className="mt-8 font-hero text-4xl font-light leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {agence.hero.h1}
          </MaskReveal>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-9 max-w-2xl text-lg leading-relaxed text-silver">
              {agence.hero.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2 — Notre histoire : éditorial asymétrique, accent visuel bleu */}
      <section className="relative overflow-hidden bg-paper py-24 text-base sm:py-32">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <Reveal>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand">
                {agence.story.kicker}
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                {agence.story.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="relative border-l-2 border-brand/50 pl-7 sm:pl-10">
              <div className="pointer-events-none absolute -left-px top-0 h-24 w-0.5 bg-gradient-to-b from-brand-light to-transparent" />
              <p className="text-lg leading-relaxed text-base/75 sm:text-xl">
                {agence.story.paragraph}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 — Notre conviction : une stat mise en avant, fond sombre */}
      <section className="relative overflow-hidden bg-base py-24 sm:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[150px]" />
        <div className="relative mx-auto max-w-container px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-light">
                {agence.conviction.kicker}
              </p>
              <h2 className="mt-4 max-w-lg font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                {agence.conviction.title}
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-silver">
                {agence.conviction.paragraph}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-white/10 bg-surface/60 p-8 text-center backdrop-blur sm:p-10">
                <p className="font-display text-6xl font-bold leading-none tracking-tight text-white sm:text-7xl">
                  <Counter
                    to={agence.conviction.statValue}
                    prefix={agence.conviction.statPrefix}
                    suffix={agence.conviction.statSuffix}
                  />
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#C8D2E0] sm:text-[1rem]">
                  {agence.conviction.statLabel}
                </p>
                <p className="mt-1 text-xs italic text-muted">{agence.conviction.statContext}</p>
                <p className="mt-5 font-display text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                  {agence.conviction.source}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ZelligeDivider className="bg-base py-10" />

      {/* 4 — Notre différence : grille bento, cellule IA vedette */}
      <section className="relative bg-paper py-24 text-base sm:py-32">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand">
              {agence.difference.kicker}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {agence.difference.title}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <FeaturedPillar
              title={featuredPillar.title}
              description={featuredPillar.description}
              Icon={PILLAR_ICONS[featuredPillar.title]}
            />
          </Reveal>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {otherPillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.15 + i * 0.08}>
                <PillarCard
                  title={pillar.title}
                  description={pillar.description}
                  Icon={PILLAR_ICONS[pillar.title]}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Le marché : stats denses + comparaison */}
      <section className="relative overflow-hidden bg-base py-24 sm:py-32">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <Reveal>
            <p className="text-center font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-light">
              {agence.market.kicker}
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {agence.market.title}
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {agence.market.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="flex h-full flex-col items-center gap-2 rounded-2xl border border-white/10 bg-surface/60 p-5 text-center backdrop-blur sm:p-6">
                  <p className="font-display text-4xl font-bold leading-none tracking-tight text-white sm:text-5xl">
                    {stat.display ? (
                      <>
                        {stat.prefix}
                        {stat.display}
                        {stat.suffix}
                      </>
                    ) : (
                      <Counter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                    )}
                  </p>
                  <p className="text-xs leading-snug text-silver sm:text-sm">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-4 text-center font-display text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
              {agence.market.source}
            </p>
          </Reveal>

          <Reveal delay={0.35} className="mt-16">
            <p className="text-center font-display text-lg font-semibold text-white sm:text-xl">
              {agence.market.comparison.title}
            </p>
            <div className="mx-auto mt-8 grid w-full max-w-3xl grid-cols-1 items-stretch gap-5 sm:grid-cols-2">
              <ComparisonCard
                label={agence.market.comparison.classic.label}
                items={agence.market.comparison.classic.items}
              />
              <ComparisonCard
                label={agence.market.comparison.naxioweb.label}
                items={agence.market.comparison.naxioweb.items}
                highlighted
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6 — Notre mission : manifeste plein écran */}
      <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-base">
        <AuraBackground animated grain />
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
          <MaskReveal
            as="h2"
            className="text-glow-soft font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {agence.mission.line1}
            <br />
            <span className="text-brand-light">{agence.mission.line2}</span>
          </MaskReveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-silver">
              {agence.mission.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 7 — CTA final */}
      <section className="relative overflow-hidden bg-base py-28">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface to-base p-10 text-center sm:p-16">
              <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[100px]" />
              <h2 className="relative font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {agence.cta.title}
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-silver">{agence.cta.subtitle}</p>
              <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
                <WhatsAppButton />
                <Link href="/contact" className={btn.secondary}>
                  Page contact
                  <ArrowRight className="size-[1.1em]" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function FeaturedPillar({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
}) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/15 via-base to-base p-9 shadow-[0_0_60px_-15px_rgba(43,124,246,0.45)] sm:p-12">
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand/30 blur-[80px]" />
      <span className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-brand/20 text-brand-light ring-1 ring-inset ring-brand/40">
        <Icon className="size-7" aria-hidden="true" />
      </span>
      <h3 className="relative mt-6 font-display text-2xl font-semibold text-white sm:text-3xl">
        {title}
      </h3>
      <p className="relative mt-3 max-w-xl text-base leading-relaxed text-silver sm:text-lg">
        {description}
      </p>
    </article>
  );
}

function PillarCard({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
}) {
  return (
    <article className="h-full rounded-2xl border border-base/10 bg-white p-7 shadow-[0_18px_50px_-24px_rgba(30,95,216,0.4)]">
      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-inset ring-brand/20">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2.5 leading-relaxed text-base/70">{description}</p>
    </article>
  );
}

function ComparisonCard({
  label,
  items,
  highlighted = false,
}: {
  label: string;
  items: readonly string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`min-w-0 rounded-2xl border p-6 sm:p-7 ${
        highlighted
          ? "border-brand/40 bg-gradient-to-br from-brand/20 via-surface to-surface shadow-[0_0_40px_-14px_rgba(43,124,246,0.5)]"
          : "border-white/10 bg-surface/90"
      }`}
    >
      <p
        className={`font-display text-sm font-semibold uppercase tracking-[0.15em] ${
          highlighted ? "text-brand-light" : "text-silver"
        }`}
      >
        {label}
      </p>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="break-words text-sm leading-relaxed text-[#E8EDF5] sm:text-[1rem]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
