import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { pageMetadata } from "@/lib/seo";
import { mailtoLink, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de NexaWeb : données collectées via le formulaire de contact et l'assistant IA, finalités, durée de conservation et vos droits.",
  path: "/confidentialite",
});

export default function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité" updated="21 juin 2026">
      <p>
        Cette politique explique quelles données personnelles {siteConfig.legalName} collecte sur ce site, pourquoi,
        et comment les exercer vos droits dessus.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        {siteConfig.legalName}, {siteConfig.city}, {siteConfig.country} —{" "}
        <a href={mailtoLink()}>{siteConfig.email}</a>.
      </p>

      <h2>Données collectées</h2>
      <p>Nous collectons des données personnelles dans deux cas précis :</p>
      <ul className="list-disc space-y-2 pl-5 marker:text-brand-light">
        <li>
          <strong className="text-white">Formulaire de contact</strong> : nom, e-mail, entreprise (facultatif) et le
          message que vous nous adressez.
        </li>
        <li>
          <strong className="text-white">Assistant IA</strong> : le contenu des messages que vous échangez avec la
          démo, traité pour générer une réponse. Ces échanges ne sont pas associés à votre identité.
        </li>
      </ul>
      <p>
        Nous utilisons également un outil de mesure d'audience qui collecte des données de navigation agrégées et
        anonymisées (pages visitées, provenance), sans cookie de suivi publicitaire ni profilage individuel.
      </p>

      <h2>Finalité du traitement</h2>
      <p>
        Les données du formulaire de contact servent exclusivement à répondre à votre demande. Les échanges avec
        l'assistant IA servent à vous montrer, en démonstration, ce que cet outil peut faire. Les données d'audience
        servent à comprendre l'usage du site et à l'améliorer.
      </p>

      <h2>Base légale</h2>
      <p>
        Le traitement repose sur votre consentement (envoi volontaire du formulaire ou utilisation de l'assistant)
        et sur l'intérêt légitime de {siteConfig.legalName} à répondre aux demandes commerciales et à mesurer
        l'audience de son site.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les messages reçus via le formulaire de contact sont conservés le temps nécessaire au traitement de votre
        demande, puis archivés ou supprimés selon nos obligations légales. Les échanges avec l'assistant IA ne sont
        pas conservés au-delà du traitement technique de la réponse.
      </p>

      <h2>Destinataires des données</h2>
      <p>Vos données peuvent être transmises à nos sous-traitants techniques, dans la stricte mesure nécessaire :</p>
      <ul className="list-disc space-y-2 pl-5 marker:text-brand-light">
        <li>Resend (envoi des e-mails issus du formulaire de contact).</li>
        <li>Anthropic (génération des réponses de l'assistant IA).</li>
        <li>Vercel (hébergement du site).</li>
      </ul>
      <p>Nous ne vendons ni ne louons vos données à des tiers.</p>

      <h2>Cookies</h2>
      <p>
        Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement et un outil de mesure
        d'audience respectueux de la vie privée (données agrégées, sans identifiant publicitaire).
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément à la loi marocaine n°09-08 relative à la protection des personnes physiques à l'égard du
        traitement des données à caractère personnel, vous disposez d'un droit d'accès, de rectification, de
        suppression et d'opposition sur vos données. Pour l'exercer, écrivez-nous à{" "}
        <a href={mailtoLink("Exercice de mes droits")}>{siteConfig.email}</a>.
      </p>

      <h2>Sécurité</h2>
      <p>
        Les échanges avec ce site sont chiffrés (HTTPS). Nous limitons l'accès aux données collectées aux seules
        personnes qui en ont besoin pour traiter votre demande.
      </p>
    </LegalLayout>
  );
}
