"use client";

import { useEffect, useState } from "react";

/**
 * Détection mobile SSR-safe : `false` au rendu serveur et au premier paint
 * client (pas de mismatch d'hydratation), puis valeur réelle après montage via
 * matchMedia. Aucun `navigator.userAgent` (trop fragile) — uniquement le
 * breakpoint largeur, cohérent avec les breakpoints Tailwind.
 */
export function useIsMobile(breakpointPx = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpointPx]);

  return isMobile;
}
