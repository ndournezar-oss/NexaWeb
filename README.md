# NexaWeb — site vitrine premium

Site vitrine de l'agence **NexaWeb** (Casablanca) : expérience scroll immersive en
5 actes (Three.js), 3 pages, ultra-référencé, conçu comme preuve vivante du niveau
de l'agence.

## Stack

Next.js 14 (App Router) · TypeScript strict · Tailwind CSS · Framer Motion ·
Three.js (`@react-three/fiber` + `drei` + `postprocessing`) · `lucide-react` ·
`next/font` (Space Grotesk / Inter / IBM Plex Sans Arabic) · Resend (optionnel).

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis renseignez les variables
npm run dev                  # http://localhost:3000
```

### Scripts

| Script          | Rôle                                                        |
| --------------- | ----------------------------------------------------------- |
| `npm run dev`   | Serveur de dev (cache webpack désactivé en dev)             |
| `npm run build` | Build de production (TypeScript strict, 0 erreur)           |
| `npm run start` | Sert le build de production                                 |
| `npm run lint`  | ESLint                                                      |
| `npm run fresh` | `rimraf .next && next dev` (repart propre)                  |
| `npm run clean` | `rimraf .next node_modules/.cache` (purge les caches)       |

> `fresh`/`clean` utilisent **rimraf** (multiplateforme) à la place de `rm -rf`,
> pour fonctionner aussi sous Windows/PowerShell.

## Variables d'environnement (`.env.local`)

| Variable                    | Requis | Effet                                                            |
| --------------------------- | :----: | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      |   reco | URL canonique de prod (metadata, sitemap, JSON-LD)               |
| `NEXT_PUBLIC_WHATSAPP`      |   reco | Numéro WhatsApp international sans `+` (défaut `212701200902`)    |
| `NEXT_PUBLIC_CONTACT_EMAIL` |   reco | E-mail public (défaut `ndour.nezar@gmail.com`)                   |

Toutes ont une valeur par défaut : le site fonctionne sans `.env.local`.
La page Contact ne dépend d'aucun service tiers — elle met en avant **WhatsApp,
téléphone et e-mail** en liens directs (pas de formulaire, pas de backend e-mail).

## Assets à déposer

Voir [`public/media/README.md`](public/media/README.md). En résumé, déposez
`public/media/forms.jpg` et `public/media/screens.jpg` (les deux rendus fournis).
L'image OpenGraph est générée dynamiquement (`app/opengraph-image.tsx`).

## Architecture 3D (accueil)

- **Canvas de fond fixe** (`BackgroundCanvas` → `AbstractShape`) : forme chrome/verre
  bleue, pilotée par la progression de scroll (Actes 1/2/5).
- **Canvas dédié de la flotte** (`FleetCanvas` → `FleetScene` + `Laptop`) : 5–7 laptops
  qui s'ouvrent et se dispersent au scroll (Acte 3).
- **Éclats au premier plan** (`ForegroundShards`, z-20) : profondeur devant le texte.
- 3D **désactivée sous `md`** (fallback poster/image), `prefers-reduced-motion` respecté,
  `dpr` plafonné à 2, frameloop coupé hors-écran.

## Sécurité

- En-têtes de sécurité + CSP de base dans `next.config.js`
  (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- Liens externes en `rel="noopener noreferrer"`. Aucune saisie utilisateur, donc
  aucune surface d'entrée à assainir.
