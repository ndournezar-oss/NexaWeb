# Assets média à déposer ici

Le site référence ces fichiers et **dégrade proprement** s'ils sont absents (dégradé
de repli, jamais de trou blanc ni de build cassé). Déposez les deux images que vous
avez fournies, avec exactement ces noms :

| Fichier                 | Rôle                                                                 |
| ----------------------- | -------------------------------------------------------------------- |
| `media/forms.jpg`       | Sculpture 3D « N » (chrome/verre bleu). Poster du héros + fallback mobile. |
| `media/screens.jpg`     | Flotte d'écrans premium. Référence Acte 3 + fallback mobile.         |

## Optionnel — vidéos (préférées automatiquement si présentes)

| Fichier                 | Rôle                                              |
| ----------------------- | ------------------------------------------------- |
| `videos/forms.mp4`      | Si présent, remplace `forms.jpg` (autoplay muet). |
| `videos/screens.mp4`    | Si présent, remplace `screens.jpg`.               |

> L'image OpenGraph (`og.jpg`) n'est **pas** nécessaire : elle est générée
> dynamiquement par `app/opengraph-image.tsx` (next/og).

Formats conseillés : JPG/WebP optimisés, ~1920×1080, < 400 Ko pour un LCP rapide.
