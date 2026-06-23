import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#070B18",
        surface: "#0E1424",
        brand: {
          DEFAULT: "#2B7CF6",
          light: "#5EA0FF",
          deep: "#1E5FD8",
        },
        glow: "#4DA3FF",
        // Système de texte centralisé — voir --text-* dans globals.css.
        // silver = secondaire (paragraphes, sous-titres), muted = plancher
        // (labels, légendes). Ne jamais descendre sous ces valeurs sur fond sombre.
        silver: "#C8D2E0",
        muted: "#9AA6B8",
        disabled: "#6B7689",
        paper: "#F7F9FC",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "var(--font-body)", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        /** Réservée au H1 du héros — Clash Display, jamais utilisée ailleurs. */
        hero: ["var(--font-hero)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        glow: "0 10px 50px -10px rgba(43, 124, 246, 0.7), 0 0 24px -6px rgba(94, 163, 255, 0.55)",
        "glow-sm": "0 6px 26px -8px rgba(43, 124, 246, 0.55)",
        "glow-lg": "0 18px 80px -12px rgba(43, 124, 246, 0.75), 0 0 40px -8px rgba(94, 163, 255, 0.6)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
