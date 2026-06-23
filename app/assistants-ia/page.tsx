import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, CalendarClock, Clock, MessageSquare, Sparkles, Users } from "lucide-react";
import { AiDemo } from "@/components/ai/AiDemo";
import { DataGlobe } from "@/components/ai/DataGlobe";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ZelligePattern } from "@/components/ZelligePattern";
import { pageMetadata } from "@/lib/seo";
import { btn } from "@/lib/ui";
import { assistantsIA } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Assistants IA",
  fullTitle: "Assistants IA pour sites web | NexaWeb Maroc",
  description:
    "NexaWeb intègre des assistants IA à votre site web : qualification de prospects, support 24/7, FAQ intelligente et prise de rendez-vous. Agence chatbot IA à Casablanca, au service des entreprises au Maroc.",
  path: "/assistants-ia",
  keywords: [
    "agence chatbot IA Maroc",
    "assistant IA site web entreprise Maroc",
    "intégration IA site Maroc",
    "chatbot IA Casablanca",
    "assistant virtuel site web Maroc",
  ],
});

const USE_CASE_ICONS = [Users, Clock, MessageSquare, CalendarClock];

export default function AssistantsIaPage() {
  return (
    <>
      {/* Héros + cœur IA + démo — bloc compact, dense, sans grand vide */}
      <section className="relative overflow-hidden bg-base pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="pointer-events-none absolute -top-24 right-0 h-[36rem] w-[36rem] rounded-full bg-brand/15 blur-[130px]" />
        <div className="pointer-events-none absolute inset-0 text-brand-light/60">
          <ZelligePattern opacity={0.05} scale={110} className="h-full w-full" />
        </div>
        <div className="relative mx-auto max-w-container px-5 sm:px-8">
          <Reveal>
            <p className="inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-light">
              <Sparkles className="size-4" aria-hidden="true" />
              {assistantsIA.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl">
              {assistantsIA.h1}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-silver">{assistantsIA.intro}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href="#demo-ia" className={btn.primary}>
                {assistantsIA.ctaPrimary}
                <ArrowRight className="size-[1.1em]" aria-hidden="true" />
              </a>
              <WhatsAppButton variant="secondary" label={assistantsIA.ctaSecondary} />
            </div>
          </Reveal>

          {/* Globe réseau — visuel abstrait, compact, qui dit « intelligence connectée » avant la démo */}
          <Reveal delay={0.2} className="mt-6 sm:mt-8">
            <DataGlobe />
          </Reveal>

          {/* Démo live — la pièce dominante, juste sous le cœur IA */}
          <div id="demo-ia" className="mt-5 sm:mt-6">
            <Reveal delay={0.25}>
              <AiDemo />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Offre : 2 façons */}
      <section className="relative bg-paper py-24 text-base sm:py-32">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {assistantsIA.offer.title}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {assistantsIA.offer.options.map((opt, i) => (
              <Reveal key={opt.title} delay={i * 0.1}>
                <article className="h-full rounded-3xl border border-base/10 bg-white p-8 shadow-[0_18px_50px_-24px_rgba(30,95,216,0.5)]">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-inset ring-brand/20">
                    <Bot className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">{opt.title}</h3>
                  <p className="mt-3 leading-relaxed text-base/70">{opt.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cas d'usage */}
      <section className="relative overflow-hidden bg-base py-24 sm:py-32">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {assistantsIA.useCases.title}
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {assistantsIA.useCases.items.map((uc, i) => {
              const Icon = USE_CASE_ICONS[i];
              return (
                <Reveal key={uc.title} delay={i * 0.07}>
                  <article className="h-full rounded-2xl border border-white/10 bg-surface/60 p-7 backdrop-blur transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand-light/40">
                    <span className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-brand/15 text-brand-light ring-1 ring-inset ring-brand/30">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-white">{uc.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver">{uc.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cas concret */}
      <section className="relative bg-paper py-24 text-base sm:py-32">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {assistantsIA.caseStudy.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-base/75">
                {assistantsIA.caseStudy.paragraph}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-base py-28">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface to-base p-10 text-center sm:p-16">
              <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[100px]" />
              <h2 className="relative font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {assistantsIA.cta.title}
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-silver">{assistantsIA.cta.subtitle}</p>
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
