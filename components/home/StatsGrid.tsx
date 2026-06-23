import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";
import { btn } from "@/lib/ui";
import { home } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

/**
 * Stats marché en 2 colonnes : pitch + CTA à gauche, grille 2×2 de cartes à
 * droite. Fond #0B1120 — même ton que le héros pour rester cohérent en haut
 * de page. Texte des cartes toujours blanc/gris clair : le bleu de marque ne
 * sert qu'au bouton.
 */
export function StatsGrid() {
  const c = home.statsGrid;

  return (
    <section className="relative overflow-hidden bg-[#0B1120] py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-brand/10 blur-[150px]" />

      <div className="relative mx-auto max-w-container px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              {c.title}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-silver">{c.paragraph}</p>
            <Link
              href={whatsappLink(c.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn.primary} mt-8`}
            >
              {c.cta}
              <ArrowRight className="size-[1.1em]" aria-hidden="true" />
            </Link>
          </Reveal>

          <div>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {c.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08}>
                  <div className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-7">
                    <p className="font-display text-4xl font-bold leading-none tracking-tight text-white sm:text-5xl">
                      {stat.display ?? <Counter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />}
                      {stat.display ? stat.suffix : null}
                    </p>
                    <p className="mt-3 text-base leading-snug text-silver sm:text-lg">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.4}>
              <p className="mt-5 text-center font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted lg:text-left">
                {c.source}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
