import { Accordion } from "@/components/Accordion";
import { Reveal } from "@/components/Reveal";
import { home } from "@/lib/content";

/**
 * FAQ — accordéon dense juste avant la clôture (Conversion). Lève les
 * dernières objections avant le CTA final. `id="faq"` = cible des liens nav.
 */
export function Faq() {
  const c = home.faq;
  return (
    <section id="faq" className="relative overflow-hidden bg-base py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-brand/10 blur-[150px]" />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-light">
            {c.kicker}
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {c.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-silver">{c.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <Accordion items={c.items} />
        </Reveal>
      </div>
    </section>
  );
}
