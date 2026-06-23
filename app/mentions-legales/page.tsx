import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { pageMetadata } from "@/lib/seo";
import { mailtoLink, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales de NexaWeb : éditeur du site, hébergement, propriété intellectuelle et responsabilité.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales" updated="21 juin 2026">
      <h2>Éditeur du site</h2>
      <p>
        Le site {siteConfig.url} est édité par {siteConfig.legalName}, agence de création de sites web et
        d'assistants IA basée à {siteConfig.city}, {siteConfig.country}.
      </p>
      <p>
        Contact : <a href={mailtoLink()}>{siteConfig.email}</a> · {siteConfig.phone.display}
      </p>
      <p>Directeur de la publication : {siteConfig.legalName}.</p>

      <h2>Hébergement</h2>
      <p>
        Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis —{" "}
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          vercel.com
        </a>
        .
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble du contenu de ce site (textes, design, identité visuelle, code) est la propriété de{" "}
        {siteConfig.legalName}, sauf mention contraire. Toute reproduction ou représentation, totale ou partielle,
        sans autorisation préalable est interdite.
      </p>

      <h2>Liens hypertextes</h2>
      <p>
        Ce site peut contenir des liens vers des sites tiers (réseaux sociaux, WhatsApp). {siteConfig.legalName}{" "}
        n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
      </p>

      <h2>Responsabilité</h2>
      <p>
        {siteConfig.legalName} s'efforce d'assurer l'exactitude des informations diffusées sur ce site, mais ne
        peut garantir l'absence d'erreur ou d'omission. L'assistant IA présenté sur le site fournit des réponses
        automatisées à titre indicatif et ne remplace pas un échange direct avec notre équipe.
      </p>

      <h2>Droit applicable</h2>
      <p>Les présentes mentions légales sont soumises au droit marocain.</p>
    </LegalLayout>
  );
}
