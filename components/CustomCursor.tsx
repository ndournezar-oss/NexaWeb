"use client";

import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR = "a, button, input, textarea, select, [role='button'], label";

/**
 * Curseur custom (point + anneau "trailing") sur desktop uniquement. Suivi
 * piloté par requestAnimationFrame (pas de re-render React par mousemove) :
 * le point colle à la souris, l'anneau suit avec un easing léger. Désactivé
 * sur tactile (`pointer: coarse`) et le trailing est neutralisé sous
 * prefers-reduced-motion (l'anneau colle alors directement au point).
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return undefined;
    setEnabled(true);
    document.documentElement.classList.add("cursor-custom");
    return () => document.documentElement.classList.remove("cursor-custom");
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduced ? 1 : 0.18;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotRef.current?.style.setProperty(
        "transform",
        `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      );
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const hovering = !!target?.closest(HOVER_SELECTOR);
      ringRef.current?.classList.toggle("cursor-ring--hover", hovering);
    };

    const onMouseLeaveWindow = () => {
      dotRef.current?.style.setProperty("opacity", "0");
      ringRef.current?.style.setProperty("opacity", "0");
    };
    const onMouseEnterWindow = () => {
      dotRef.current?.style.setProperty("opacity", "1");
      ringRef.current?.style.setProperty("opacity", "1");
    };

    const tick = () => {
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      ringRef.current?.style.setProperty(
        "transform",
        `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      );
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[150]">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
