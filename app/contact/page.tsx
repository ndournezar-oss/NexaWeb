import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { Reveal } from "@/components/Reveal";
import { ZelligePattern } from "@/components/ZelligePattern";
import { getMediaFlags } from "@/lib/media.server";
import { pageMetadata } from "@/lib/seo";
import { contact } from "@/lib/content";
import { defaultWhatsappMessage, mailtoLink, siteConfig, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contactez NexaWeb, agence web premium à Casablanca. WhatsApp, téléphone ou e-mail : discutons de votre projet de création ou de refonte de site web.",
  path: "/contact",
  keywords: ["contact agence web Casablanca", "devis site web Maroc"],
});

export default function ContactPage() {
  const media = getMediaFlags();
  return (
    <>
      <ContactHero blueTubes={media.blueTubes} />

      <section className="relative overflow-hidden bg-base pt-24 pb-28 sm:pt-32">
        <div className="pointer-events-none absolute -top-24 left-0 h-[34rem] w-[34rem] rounded-full bg-brand/15 blur-[130px]" />
        <div className="pointer-events-none absolute inset-0 text-brand-light/60">
          <ZelligePattern opacity={0.04} scale={120} className="h-full w-full" />
        </div>

        <div className="relative mx-auto max-w-container px-5 sm:px-8">
        {/* WhatsApp — canal principal mis en avant */}
        <Reveal delay={0.05}>
          <a
            href={whatsappLink(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-12 flex flex-col gap-6 overflow-hidden rounded-3xl border border-brand/40 bg-gradient-to-br from-brand/25 via-surface to-surface p-8 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand-light/70 sm:flex-row sm:items-center sm:justify-between sm:p-10"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand/30 blur-3xl transition-opacity duration-300 group-hover:opacity-80" />
            <div className="relative">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand text-white shadow-glow">
                <MessageCircle className="size-7" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold text-white sm:text-3xl">
                {contact.whatsappTitle}
              </h2>
              <p className="mt-2 max-w-md text-silver">{contact.whatsappSubtitle}</p>
            </div>
            <div className="relative flex flex-col items-start gap-3 sm:items-end">
              <span className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {siteConfig.whatsappDisplay}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 font-display text-sm font-medium text-white backdrop-blur transition-colors group-hover:bg-brand-deep">
                {contact.whatsappCta}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </div>
          </a>
        </Reveal>

        {/* Autres canaux, eux aussi mis en valeur */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Reveal delay={0.1}>
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="group flex h-full flex-col rounded-3xl border border-white/10 bg-surface/70 p-7 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand-light/50"
            >
              <span className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-brand/15 text-brand-light ring-1 ring-inset ring-brand/30">
                <Phone className="size-6" aria-hidden="true" />
              </span>
              <h2 className="font-display text-lg font-semibold text-white">{contact.phoneTitle}</h2>
              <p className="mt-1 text-sm text-muted">{contact.phoneSubtitle}</p>
              <span className="mt-4 font-display text-xl font-semibold text-white transition-colors group-hover:text-brand-light">
                {siteConfig.phone.display}
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.16}>
            <a
              href={mailtoLink("Projet web")}
              className="group flex h-full flex-col rounded-3xl border border-white/10 bg-surface/70 p-7 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand-light/50"
            >
              <span className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-brand/15 text-brand-light ring-1 ring-inset ring-brand/30">
                <Mail className="size-6" aria-hidden="true" />
              </span>
              <h2 className="font-display text-lg font-semibold text-white">{contact.emailTitle}</h2>
              <p className="mt-1 text-sm text-muted">{contact.emailSubtitle}</p>
              <span className="mt-4 break-all font-display text-base font-semibold text-white transition-colors group-hover:text-brand-light">
                {siteConfig.email}
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface/70 p-7">
              <span className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-brand/15 text-brand-light ring-1 ring-inset ring-brand/30">
                <MapPin className="size-6" aria-hidden="true" />
              </span>
              <h2 className="font-display text-lg font-semibold text-white">{contact.locationTitle}</h2>
              <p className="mt-1 text-sm text-muted">{contact.responseNote}</p>
              <span className="mt-4 font-display text-xl font-semibold text-white">
                {siteConfig.city} · {siteConfig.country}
              </span>
              <p className="mt-3 font-arabic text-lg text-brand-light" lang="ar" dir="rtl">
                مرحبا بك
              </p>
            </div>
          </Reveal>
        </div>

          {/* Formulaire (Resend) — alternative au contact direct */}
          <Reveal delay={0.05}>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
