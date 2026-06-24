"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { home } from "@/lib/content";
import { MEDIA_PATHS, type MediaFlags } from "@/lib/media";

const ShaderAnimation = dynamic(
  () => import("@/components/ui/ShaderAnimation").then((m) => ({ default: m.ShaderAnimation })),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#070B18]" />,
  }
);


/**
 * Héros accueil — réplique exacte de la structure AsconHero (fond plein cadre,
 * grille 2 colonnes items-end, titre léger à gauche, description + CTA à
 * droite). Seuls les couleurs, la police, les textes et l'image de fond
 * changent. Pas de nav interne : le Header global (fixe, transparent→sombre
 * au scroll) joue déjà ce rôle sur toutes les pages.
 */
export function Hero({ media }: { media: MediaFlags }) {
  const reduced = useReducedMotion();

  // Le shader WebGL (Three.js) ne se monte QUE sur desktop confirmé : sur
  // mobile le chunk three.js n'est même pas téléchargé (gain 4G majeur) et le
  // fond reste un navy + 2 glows CSS statiques. Décision au montage (SSR-safe :
  // false au 1er paint, donc pas de mismatch d'hydratation), sans listener
  // resize pour ne jamais monter/démonter le contexte WebGL en cours de route.
  const [enableShader, setEnableShader] = useState(false);
  useEffect(() => {
    setEnableShader(!reduced && window.innerWidth >= 768);
  }, [reduced]);

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
      {/* Fond plein cadre — shader animé ou fallback statique */}
      <div className="absolute inset-0 z-0">
        {/* Fond navy instantané + glow CSS (affiché toujours, sous le shader) */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #070B18 0%, #0B1120 100%)" }}
        />
        <div className="pointer-events-none absolute -right-32 top-1/4 h-[36rem] w-[36rem] rounded-full bg-[rgba(43,124,246,0.25)] blur-[120px]" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[rgba(43,124,246,0.25)] blur-[100px]" />

        {/* Shader WebGL — desktop uniquement (jamais téléchargé sur mobile),
            pausé hors viewport, skippé sous prefers-reduced-motion. Sur mobile,
            le navy + les 2 glows CSS ci-dessus suffisent. */}
        {enableShader && <ShaderAnimation />}

        {/* Fallback image si le shader n'est pas disponible et qu'une image existe */}
        {reduced && media.blueTubes && (
          <div className="absolute inset-y-0 right-0 w-1/2">
            <Image
              src={MEDIA_PATHS.blueTubes}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-contain"
              style={{ objectPosition: "center right" }}
            />
          </div>
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
