"use client";

import { useEffect, useRef } from "react";
import { useScroll, useReducedMotion } from "framer-motion";

type ScrollSequenceProps = {
  /** Liste d'URLs des frames, dans l'ordre (frame_0001 → frame_000N). */
  frames: string[];
  /** Hauteur de la section épinglée, en vh (plus grand = scrub plus lent). */
  heightVh?: number;
  className?: string;
  /** Texte alternatif (a11y) décrivant la séquence. */
  alt?: string;
};

/**
 * Scrube une séquence d'images sur un <canvas> selon la progression de scroll de
 * sa section épinglée (technique « Apple AirPods »).
 *
 * - Préchargement progressif des frames (chaque frame s'affiche dès qu'elle peut).
 * - Fallback : la première frame disponible est dessinée tant que tout n'est pas chargé.
 * - Rendu via requestAnimationFrame, redraw uniquement quand la frame change → fluide.
 * - prefers-reduced-motion : fige une frame médiane (pas de scrub).
 *
 * BRANCHEMENT FUTUR — voir public/sequences/README.md : déposez
 * /public/sequences/<nom>/frame_0001.webp … puis remplacez une section Showcase par
 *   <ScrollSequence frames={buildFrames("/sequences/<nom>", N)} />
 * sans rien changer d'autre. (helper `buildSequenceFrames` ci-dessous.)
 */
export function ScrollSequence({
  frames,
  heightVh = 320,
  className = "",
  alt = "",
}: ScrollSequenceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentIndexRef = useRef<number>(-1);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Trouve la frame chargée la plus proche de `index` (pour ne jamais dessiner du vide).
  const nearestLoaded = (index: number): HTMLImageElement | null => {
    const imgs = imagesRef.current;
    if (imgs[index]) return imgs[index];
    for (let d = 1; d < imgs.length; d++) {
      if (imgs[index - d]) return imgs[index - d];
      if (imgs[index + d]) return imgs[index + d];
    }
    return null;
  };

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = nearestLoaded(index);
    if (!img) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = Math.max(1, Math.floor(cw * dpr));
      canvas.height = Math.max(1, Math.floor(ch * dpr));
    }

    // « cover » : remplit le canvas en gardant le ratio.
    const scale = Math.max((cw * dpr) / img.width, (ch * dpr) / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    const dx = (cw * dpr - dw) / 2;
    const dy = (ch * dpr - dh) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  // Préchargement progressif.
  useEffect(() => {
    imagesRef.current = new Array(frames.length).fill(null);
    let cancelled = false;
    frames.forEach((src, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      const onReady = () => {
        if (cancelled) return;
        imagesRef.current[i] = img;
        // Dessine la 1re frame disponible (fallback), ou rafraîchit si c'est la frame courante.
        if (currentIndexRef.current === -1 || i === currentIndexRef.current) {
          if (currentIndexRef.current === -1) currentIndexRef.current = 0;
          requestAnimationFrame(() => draw(currentIndexRef.current));
        }
      };
      img.onload = onReady;
      img.onerror = () => {};
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames]);

  // Scroll → index de frame.
  useEffect(() => {
    if (frames.length === 0) return undefined;
    const pick = (p: number) => {
      const idx = reduced
        ? Math.floor((frames.length - 1) / 2)
        : Math.min(frames.length - 1, Math.max(0, Math.round(p * (frames.length - 1))));
      if (idx !== currentIndexRef.current) {
        currentIndexRef.current = idx;
        requestAnimationFrame(() => draw(idx));
      }
    };
    pick(scrollYProgress.get());
    const unsub = scrollYProgress.on("change", pick);
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames.length, reduced, scrollYProgress]);

  // Redraw au resize.
  useEffect(() => {
    const onResize = () => draw(Math.max(0, currentIndexRef.current));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: `${heightVh}vh` }}
      className={`relative ${className}`}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-base">
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          role="img"
          aria-label={alt}
        />
      </div>
    </section>
  );
}

/** Construit la liste d'URLs `frame_0001.webp … frame_000N.webp` pour un dossier. */
export function buildSequenceFrames(
  basePath: string,
  count: number,
  ext = "webp",
  pad = 4
): string[] {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(pad, "0");
    return `${basePath.replace(/\/$/, "")}/frame_${n}.${ext}`;
  });
}
