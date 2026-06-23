"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AuraBackground } from "@/components/AuraBackground";
import { Magnetic } from "@/components/Magnetic";
import { MaskReveal } from "@/components/MaskReveal";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ZelligePattern } from "@/components/ZelligePattern";
import { btn } from "@/lib/ui";
import { home } from "@/lib/content";

/**
 * Acte « Conversion » — plein écran, point focal lumineux central, grande
 * accroche révélée + gros CTA WhatsApp (magnetic).
 */
export function Conversion() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-base">
      <AuraBackground animated grain />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 text-brand-light">
        <ZelligePattern opacity={0.07} scale={120} className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-container px-5 text-center sm:px-8">
        <MaskReveal
          as="h2"
          className="text-glow-soft mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl"
        >
          {home.conversion.title}
        </MaskReveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-silver">
            {home.conversion.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <WhatsAppButton label={home.conversion.cta} />
            </Magnetic>
            <Link href="/contact" className={btn.secondary}>
              {home.conversion.ctaSecondary}
              <ArrowRight className="size-[1.1em]" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
