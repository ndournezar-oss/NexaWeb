/**
 * Constantes média + types — SÛRS POUR LE CLIENT (aucun import Node).
 * La détection de présence des fichiers (fs) vit dans `lib/media.server.ts`.
 */

export type MediaFlags = {
  formsImage: boolean;
  screensImage: boolean;
  /** Décoration 3D des coins bas de l'entrée /contact. */
  blueTubes: boolean;
  /** Render 3D bleu plein cadre du héros accueil (style Ascon). */
  heroBg: boolean;
};

export const MEDIA_PATHS = {
  formsImage: "/media/forms.png",
  screensImage: "/media/screens.jpg",
  blueTubes: "/media/blue-tubes.png",
  heroBg: "/media/hero-bg.webp",
} as const;
