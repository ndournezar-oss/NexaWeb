"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { home } from "@/lib/content";
import { MEDIA_PATHS, type MediaFlags } from "@/lib/media";

// Aperçu flou (16×9px, base64) de hero-bg.webp : peint instantanément, avant
// que l'image réelle ne charge — pas de flash vide pendant le fetch.
const HERO_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDkSMNg9j2q2q5IG1VB42n0qmP9aPrV9/uT/Wu2klqYz6H/2Q==";

/**
 * Héros accueil — réplique exacte de la structure AsconHero (fond plein cadre,
 * grille 2 colonnes items-end, titre léger à gauche, description + CTA à
 * droite). Seuls les couleurs, la police, les textes et l'image de fond
 * changent. Pas de nav interne : le Header global (fixe, transparent→sombre
 * au scroll) joue déjà ce rôle sur toutes les pages.
 */
export function Hero({ media }: { media: MediaFlags }) {
  const reduced = useReducedMotion();

  const titleVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
  };
  const contentVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0B1120]">
      {/* Image de fond plein cadre */}
      <div className="absolute inset-0">
        {/* Fond de secours instantané : dégradé navy + glow bleu, peint au
            premier rendu, sous l'image — jamais d'écran vide pendant le chargement. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #070B18 0%, #0B1120 100%)" }}
        />
        <div className="pointer-events-none absolute -right-32 top-1/4 h-[36rem] w-[36rem] rounded-full bg-[rgba(43,124,246,0.25)] blur-[120px]" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[rgba(43,124,246,0.25)] blur-[100px]" />

        {media.heroBg ? (
          <Image
            src={MEDIA_PATHS.heroBg}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={HERO_BLUR_DATA_URL}
            className="object-cover"
          />
        ) : (
          media.blueTubes && (
            <div className="absolute inset-y-0 right-0 w-1/2">
              <Image
                src={MEDIA_PATHS.blueTubes}
                alt=""
                fill
                className="object-contain"
                style={{ objectPosition: "center right" }}
              />
            </div>
          )
        )}
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-32 lg:pt-36">
        <div className="grid min-h-[60vh] grid-cols-1 items-end gap-12 lg:grid-cols-2 lg:gap-24">
          <motion.h1
            initial="hidden"
            animate="show"
            variants={titleVariants}
            className="whitespace-pre-line font-hero text-4xl font-light leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl"
          >
            {home.hero.h1}
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="show"
            variants={contentVariants}
            className="relative flex flex-col gap-8"
          >
            {/* Scrim local — lisibilité par-dessus les tubes, uniquement derrière ce bloc. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 rounded-[2rem]"
              style={{
                background:
                  "radial-gradient(120% 120% at 50% 50%, rgba(11,17,32,0.85) 0%, rgba(11,17,32,0.55) 45%, rgba(11,17,32,0) 78%)",
              }}
            />

            <p className="max-w-md leading-relaxed text-white/90">{home.hero.subtitle}</p>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <motion.a
                href="/assistants-ia"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 rounded-full border border-transparent bg-[#1E5FD8] px-6 py-3 font-display text-sm font-medium text-white shadow-glow-sm backdrop-blur-sm transition-colors"
              >
                {home.hero.ctaPrimary}
                <ArrowRight className="size-[1.1em]" aria-hidden="true" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
