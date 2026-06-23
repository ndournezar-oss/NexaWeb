import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { ReactNode } from "react";

/**
 * Mise en page commune aux pages légales — sobre, texte réel, hiérarchie
 * sémantique propre (h1 unique, h2 par section). Mêmes tokens de contraste
 * que le reste du site (texte secondaire #C8D2E0 sur navy).
 */
export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-base py-32 sm:py-40">
      <div className="pointer-events-none absolute -top-24 right-0 h-[32rem] w-[32rem] rounded-full bg-brand/10 blur-[130px]" />
      <div className="relative mx-auto max-w-[720px] px-5 sm:px-8">
        <Reveal>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-silver transition-colors hover:text-brand-light"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Retour à l'accueil
          </Link>
          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted">Dernière mise à jour : {updated}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 space-y-6 text-base leading-[1.7] text-silver [&_h2]:!mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:first:!mt-0 [&_a]:text-brand-light [&_a]:underline-offset-2 [&_a]:hover:underline">
          {children}
        </Reveal>
      </div>
    </section>
  );
}
