"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll fluide à inertie (Lenis), initialisé globalement.
 * - Couplé au requestAnimationFrame → sensation premium, compatible avec
 *   `useScroll` de Framer Motion (Lenis met à jour le scroll natif de la fenêtre).
 * - prefers-reduced-motion : on n'initialise PAS Lenis (scroll natif).
 * - Mobile : `syncTouch: false` → scroll tactile natif (perfs garanties), smooth
 *   uniquement à la molette/trackpad.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
