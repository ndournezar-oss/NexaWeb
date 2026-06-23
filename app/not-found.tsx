import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ZelligePattern } from "@/components/ZelligePattern";
import { btn } from "@/lib/ui";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-base">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 text-brand-light/50">
        <ZelligePattern opacity={0.05} scale={110} className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-xl px-5 text-center sm:px-8">
        <Logo className="mx-auto" />
        <p className="mt-10 font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-light">
          Erreur 404
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Page introuvable.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-silver">
          Cette page n'existe pas, ou plus. Elle a peut-être été déplacée — revenez à l'accueil pour retrouver votre
          chemin.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className={btn.primary}>
            <Home className="size-[1.1em]" aria-hidden="true" />
            Retour à l'accueil
          </Link>
          <Link href="/contact" className={btn.secondary}>
            Nous contacter
            <ArrowRight className="size-[1.1em]" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
