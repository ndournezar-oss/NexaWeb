"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AiCore } from "@/components/ai/AiCore";

/** Jamais plus de 3,5 s d'attente, même si une ressource traîne. */
const SAFETY_TIMEOUT_MS = 3500;

/**
 * Écran de chargement plein écran. Disparaît au `window.load` (DOM + toutes
 * les images, dont le héros) ou au timeout de sécurité — le premier des deux.
 * Ne bloque jamais l'accès au site.
 */
export function Preloader() {
  const [loading, setLoading] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (document.readyState === "complete") {
      setLoading(false);
      return undefined;
    }

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setLoading(false);
    };

    window.addEventListener("load", finish);
    const timeout = window.setTimeout(finish, SAFETY_TIMEOUT_MS);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-7 bg-[#070B18]"
          initial={{ opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Cœur lumineux — même motif que /assistants-ia, pour rester cohérent
              avec la DA plutôt qu'un spinner générique. */}
          <AiCore />

          <div className="h-[3px] w-32 overflow-hidden rounded-full bg-white/10 sm:w-40">
            <div
              className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#2B7CF6] to-[#5EA0FF]"
              style={{ animation: "preloader-bar 1.4s ease-in-out infinite" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
