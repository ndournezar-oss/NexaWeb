"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/lib/useIsMobile";

/**
 * Globe « réseau de données » — wireframe sphérique en CSS 3D pur (méridiens +
 * parallèles + points lumineux), pas de Three.js/WebGL : zéro dépendance
 * ajoutée, poids quasi nul, identique sur desktop et mobile (pas de variante
 * 3D lourde à alléger). Rotation continue pilotée par CSS (`globe-spin`,
 * neutralisée globalement sous prefers-reduced-motion). La légère parallaxe
 * souris est un calque JS séparé, désactivé sur tactile et reduced-motion, et
 * mis en pause hors viewport via IntersectionObserver.
 */
const MERIDIANS = 6;
const LATITUDES = [-0.55, 0, 0.55];
const DOTS = [
  { meridian: 0, tilt: 35, delay: 0 },
  { meridian: 1, tilt: 120, delay: 0.7 },
  { meridian: 2, tilt: 200, delay: 1.4 },
  { meridian: 3, tilt: 300, delay: 0.35 },
  { meridian: 4, tilt: 60, delay: 1.05 },
  { meridian: 5, tilt: 250, delay: 1.75 },
] as const;

export function DataGlobe() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [parallaxOn, setParallaxOn] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!coarse && !reduced) setParallaxOn(true);
  }, []);

  // Pause la rotation CSS hors viewport (perf, pas de WebGL mais autant être sobre).
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        node.style.setProperty("--globe-play", entry.isIntersecting ? "running" : "paused");
      },
      { threshold: 0.01 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!parallaxOn) return undefined;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientY - cy) / cy) * 8;
      targetY = ((e.clientX - cx) / cx) * 10;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      tiltRef.current?.style.setProperty("transform", `rotateX(${curX}deg) rotateY(${curY}deg)`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [parallaxOn]);

  // Mobile : version 100 % CSS/SVG (aucun JS, aucun calcul 3D). Rendu à 100px
  // pour matcher l'échelle du conteneur de la page (scale-0.8 → ~80px visibles).
  if (isMobile) {
    return (
      <div
        aria-hidden="true"
        className="relative mx-auto flex h-[100px] w-[100px] items-center justify-center"
      >
        {/* Cercle + glow bleu */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px solid rgba(43,124,246,0.6)",
            boxShadow: "0 0 20px rgba(43,124,246,0.3)",
          }}
        />
        {/* 2 ellipses en rotation CSS */}
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <ellipse
            cx="50"
            cy="50"
            rx="48"
            ry="20"
            fill="none"
            stroke="rgba(43,124,246,0.55)"
            strokeWidth="1"
            className="mglobe-ellipse"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="20"
            ry="48"
            fill="none"
            stroke="rgba(94,160,255,0.45)"
            strokeWidth="1"
            className="mglobe-ellipse mglobe-ellipse--rev"
          />
        </svg>
        {/* Point central pulsant */}
        <span
          className="mglobe-dot absolute h-2 w-2 rounded-full bg-white"
          style={{ boxShadow: "0 0 8px 2px rgba(94,160,255,0.85)" }}
        />
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="relative mx-auto flex h-[100px] w-[100px] items-center justify-center sm:h-[130px] sm:w-[130px]"
      style={{ perspective: "700px" }}
    >
      {/* Halo bloom */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[#4DA3FF]/25 blur-[46px]" />
      <div className="pointer-events-none absolute inset-8 rounded-full bg-brand-light/20 blur-[26px]" />

      {/* Volume diffus pour suggérer une sphère pleine sous le wireframe */}
      <div
        className="pointer-events-none absolute inset-[18%] rounded-full"
        style={{
          background:
            "radial-gradient(40% 40% at 35% 30%, rgba(94,160,255,0.35), rgba(43,124,246,0.12) 55%, transparent 75%)",
        }}
      />

      {/* Calque parallaxe (tilt souris, JS) */}
      <div ref={tiltRef} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {/* Calque rotation continue (CSS) */}
        <div className="globe-spin absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {/* Méridiens */}
          {Array.from({ length: MERIDIANS }).map((_, i) => (
            <div
              key={`m-${i}`}
              className="absolute inset-0 rounded-full border border-brand-light/35"
              style={{ transform: `rotateY(${(i * 180) / MERIDIANS}deg)` }}
            />
          ))}
          {/* Parallèles */}
          {LATITUDES.map((lat, i) => (
            <div
              key={`p-${i}`}
              className="absolute inset-0 rounded-full border border-brand/30"
              style={{
                transform: `rotateX(90deg) translateZ(${lat * 70}px) scale(${1 - Math.abs(lat) * 0.35})`,
              }}
            />
          ))}
          {/* Points lumineux (connexions) */}
          {DOTS.map((dot, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotateY(${(dot.meridian * 180) / MERIDIANS}deg) rotateX(${dot.tilt}deg) translateZ(70px)`,
              }}
            >
              <span
                className="globe-dot-pulse absolute rounded-full bg-white"
                style={{
                  width: 3,
                  height: 3,
                  left: -1.5,
                  top: -1.5,
                  boxShadow: "0 0 8px 2px rgba(94,160,255,0.85)",
                  animationDelay: `${dot.delay}s`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
