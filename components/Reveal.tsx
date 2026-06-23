"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Décalage d'entrée. */
  delay?: number;
  /** Distance verticale du translate initial. */
  y?: number;
  /** Balise rendue. */
  as?: "div" | "section" | "li" | "span" | "p";
  once?: boolean;
};

/**
 * Révélation au scroll, premium et eased. Respecte prefers-reduced-motion :
 * en mode réduit, le contenu apparaît instantanément, sans transform.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  const variants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: EASE, delay },
        },
      };

  // Cast pour éviter une union de types de props trop complexe pour TS.
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}
