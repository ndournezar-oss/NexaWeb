"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type SectionBackdropProps = {
  src: string;
  hasImage: boolean;
  objectPosition?: string;
  /** Intensité du voile sombre par-dessus l'image (0 à 1) — la texture reste lisible. */
  scrim?: number;
  grain?: boolean;
  className?: string;
};

/**
 * Fond photographique cinématique pour une section sombre : image plein cadre
 * (jamais cassée — repli en dégradé si absente), voile de lisibilité, dérive
 * lente au scroll, grain quasi imperceptible. Purement décoratif (aria-hidden).
 */
export function SectionBackdrop({
  src,
  hasImage,
  objectPosition = "50% 50%",
  scrim = 0.72,
  grain = true,
  className = "",
}: SectionBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.06, 1.14]);

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {hasImage ? (
        <motion.div style={{ y, scale }} className="absolute inset-[-8%]">
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition }}
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,#101d3c_0%,#070B18_60%)]" />
      )}
      <div className="absolute inset-0 bg-base" style={{ opacity: scrim }} />
      <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-base/55" />
      {grain && <div className="aura-grain absolute inset-0 opacity-[0.025] mix-blend-overlay" />}
    </div>
  );
}
