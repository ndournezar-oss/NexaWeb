# Séquences de frames (ScrollSequence)

Le composant [`components/ScrollSequence.tsx`](../../components/ScrollSequence.tsx)
scrube une séquence d'images sur un `<canvas>` en fonction du scroll (technique
« Apple AirPods »). Il est **déjà fonctionnel** ; il suffit de lui fournir des frames.

## Comment brancher une séquence (zéro refonte)

1. Exportez votre animation 3D (ou vidéo) en frames numérotées et déposez-les ici :

   ```
   public/sequences/mon-produit/frame_0001.webp
   public/sequences/mon-produit/frame_0002.webp
   …
   public/sequences/mon-produit/frame_0120.webp
   ```

   Format conseillé : **WebP** (léger), ~1600 px de large, 60–150 frames.

2. Remplacez une section du Showcase par :

   ```tsx
   import { ScrollSequence, buildSequenceFrames } from "@/components/ScrollSequence";

   <ScrollSequence
     frames={buildSequenceFrames("/sequences/mon-produit", 120)}
     heightVh={320}
     alt="Présentation animée du produit"
   />
   ```

C'est tout — le reste de la page (Lenis, sections, SEO) reste inchangé. C'est ainsi
qu'on intégrera plus tard une vidéo 3D « décortiquée en frames réagissant au scroll ».

## Garanties

- Préchargement progressif, première frame affichée en fallback.
- `prefers-reduced-motion` : fige une frame médiane (pas de scrub).
- Rendu via `requestAnimationFrame`, redraw seulement quand la frame change.
