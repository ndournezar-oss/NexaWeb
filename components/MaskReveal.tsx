"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

type MaskRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Révélation affirmée par masque (clip-path), pas un fade timide : le contenu
 * « monte » depuis sous une ligne nette. Respecte prefers-reduced-motion.
 */
export function MaskReveal({ children, className = "", delay = 0, as = "div" }: MaskRevealProps) {
  const reduced = useReducedMotion();

  const variants: Variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: "0.6em", clipPath: "inset(0 0 100% 0)" },
        show: {
          opacity: 1,
          y: "0em",
          clipPath: "inset(0 0 -10% 0)",
          transition: { duration: 0.95, ease: EASE, delay },
        },
      };

  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </Tag>
  );
}
