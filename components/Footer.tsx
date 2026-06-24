import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ZelligePattern } from "@/components/ZelligePattern";
import { mailtoLink, nav, siteConfig, whatsappLink } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-base text-silver">
      {/* Motif zellige discret */}
      <div className="pointer-events-none absolute inset-0 text-brand-light">
        <ZelligePattern opacity={0.05} scale={96} className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[40rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative mx-auto max-w-container px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marque + baseline */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="rounded-md font-hero text-2xl font-bold tracking-[-0.03em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              Naxio
              <span className="bg-gradient-to-r from-[#2B7CF6] to-[#5EA0FF] bg-clip-text text-transparent">
                Web
              </span>
            </Link>
            <p className="mt-5 font-display text-lg leading-snug text-white">
              {siteConfig.tagline}.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-silver">
              On pense comme une marque, pas comme un prestataire. Design premium,
              technologie de pointe, conversion mesurable.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Pied de page" className="flex flex-col gap-3">
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Navigation
            </p>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit text-sm text-silver transition-colors hover:text-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#faq"
              className="w-fit text-sm text-silver transition-colors hover:text-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              FAQ
            </Link>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Contact
            </p>
            <p className="inline-flex items-center gap-2 text-sm">
              <MapPin className="size-4 text-brand-light" aria-hidden="true" />
              {siteConfig.city} · {siteConfig.country}
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 text-sm transition-colors hover:text-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              <MessageCircle className="size-4 text-brand-light" aria-hidden="true" />
              WhatsApp · {siteConfig.whatsappDisplay}
            </a>
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="inline-flex w-fit items-center gap-2 text-sm transition-colors hover:text-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              <Phone className="size-4 text-brand-light" aria-hidden="true" />
              {siteConfig.phone.display}
            </a>
            <a
              href={mailtoLink()}
              className="inline-flex w-fit items-center gap-2 text-sm transition-colors hover:text-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              <Mail className="size-4 text-brand-light" aria-hidden="true" />
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="transition-colors hover:text-brand-light">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="transition-colors hover:text-brand-light">
              Confidentialité
            </Link>
          </div>
          <p className="font-arabic" lang="fr">
            Conçu à Casablanca, pensé pour le monde.
          </p>
        </div>
      </div>
    </footer>
  );
}
