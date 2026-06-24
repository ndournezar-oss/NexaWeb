import Link from "next/link";
import { siteConfig } from "@/lib/site";

type LogoProps = {
  className?: string;
  /** Couleur de "Naxio" selon le fond (toujours blanc sur fond sombre ici). */
  tone?: "light" | "dark";
};

/**
 * Wordmark texte — logo officiel pour l'instant. "Naxio" reprend la couleur du
 * fond opposé (blanc sur sombre), "Web" porte l'accent de marque #2B7CF6.
 */
export function Logo({ className = "", tone = "light" }: LogoProps) {
  const wordTone = tone === "light" ? "text-white" : "text-[#070B18]";

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — accueil`}
      className={`group inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${className}`}
    >
      <span
        className={`font-hero text-2xl font-bold tracking-[-0.03em] transition-opacity duration-300 group-hover:opacity-85 ${wordTone}`}
      >
        Naxio
        <span className="bg-gradient-to-r from-[#2B7CF6] to-[#5EA0FF] bg-clip-text text-transparent">
          Web
        </span>
      </span>
    </Link>
  );
}
