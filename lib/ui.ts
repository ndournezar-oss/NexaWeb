/** Classes Tailwind réutilisables pour les CTA — cohérence et focus a11y partout. */

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-[0.95rem] font-medium transition-all duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60";

export const btn = {
  /** CTA principal sur fond sombre — glow bleu + élévation au survol.
   *  bg-brand-deep (pas bg-brand) : texte blanc sur #2B7CF6 ne passe pas le
   *  contraste AA (3,95:1, sous le seuil 4.5:1) — confirmé par audit Lighthouse. */
  primary: `${base} bg-brand-deep text-white shadow-glow-sm hover:-translate-y-0.5 hover:shadow-glow-lg focus-visible:ring-brand-light focus-visible:ring-offset-base`,
  /** CTA secondaire (verre) sur fond sombre. */
  secondary: `${base} border border-silver/25 bg-white/5 text-white backdrop-blur hover:-translate-y-0.5 hover:border-brand-light/70 hover:bg-white/10 hover:shadow-glow-sm focus-visible:ring-brand-light focus-visible:ring-offset-base`,
  /** CTA principal sur fond clair. */
  primaryLight: `${base} bg-brand-deep text-white shadow-glow-sm hover:-translate-y-0.5 focus-visible:ring-brand focus-visible:ring-offset-paper`,
  /** CTA secondaire sur fond clair. */
  secondaryLight: `${base} border border-base/15 bg-transparent text-[#070B18] hover:border-brand/50 hover:bg-base/5 focus-visible:ring-brand focus-visible:ring-offset-paper`,
  /** Discret — contour fin, fond très léger, sans glow. Pour les CTA secondaires de la nav. */
  ghost: `${base} border border-white/15 bg-white/[0.04] text-silver hover:border-brand-light/40 hover:bg-white/[0.08] hover:text-white focus-visible:ring-brand-light focus-visible:ring-offset-base`,
} as const;

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-base";
