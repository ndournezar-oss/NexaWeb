type Ring = {
  tiltX: number;
  tiltZ: number;
  size: number;
  duration: string;
  color: string;
};

/** 3 anneaux à inclinaisons différentes — effet gyroscope, jamais un schéma scolaire. */
const RINGS: Ring[] = [
  { tiltX: 68, tiltZ: 8, size: 100, duration: "9s", color: "rgba(94,160,255,0.55)" },
  { tiltX: 55, tiltZ: 62, size: 76, duration: "13s", color: "rgba(43,124,246,0.55)" },
  { tiltX: 64, tiltZ: -52, size: 56, duration: "7s", color: "rgba(160,200,255,0.6)" },
];

/** Poussière lumineuse, positions fixes (déterministe, pas de mismatch d'hydratation). */
const PARTICLES = [
  { x: "12%", y: "20%", s: 2, o: 0.5 },
  { x: "84%", y: "16%", s: 3, o: 0.35 },
  { x: "92%", y: "48%", s: 2, o: 0.55 },
  { x: "78%", y: "82%", s: 2, o: 0.4 },
  { x: "40%", y: "92%", s: 3, o: 0.45 },
  { x: "8%", y: "70%", s: 2, o: 0.4 },
  { x: "20%", y: "46%", s: 2, o: 0.3 },
  { x: "60%", y: "8%", s: 2, o: 0.4 },
  { x: "96%", y: "30%", s: 2, o: 0.3 },
  { x: "4%", y: "42%", s: 3, o: 0.35 },
];

/**
 * Le « cœur IA » — noyau lumineux + anneaux orbitaux + particules. Visuel
 * purement décoratif (aria-hidden) au-dessus de la fenêtre de chat sur
 * /assistants-ia. CSS/SVG pur (pas de Three.js) : zéro dépendance ajoutée,
 * poids quasi nul, fige proprement sous prefers-reduced-motion (déjà neutralisé
 * globalement dans globals.css). Composant serveur, aucune interactivité requise.
 */
export function AiCore() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex h-[150px] w-[150px] items-center justify-center sm:h-[190px] sm:w-[190px]"
    >
      {/* Halo bloom */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-brand/25 blur-[46px]" />
      <div className="pointer-events-none absolute inset-6 rounded-full bg-brand-light/20 blur-[30px]" />

      {/* Champ de particules ténu */}
      <div className="pointer-events-none absolute inset-[-15%] [mask-image:radial-gradient(closest-side,black,transparent)]">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-brand-light"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s, opacity: p.o }}
          />
        ))}
      </div>

      {/* Anneaux orbitaux (perspective 3D) + électrons */}
      <div className="absolute inset-0" style={{ perspective: "460px" }}>
        {RINGS.map((ring, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              width: `${ring.size}%`,
              height: `${ring.size}%`,
              transform: `translate(-50%,-50%) rotateX(${ring.tiltX}deg) rotateZ(${ring.tiltZ}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: ring.color, boxShadow: `0 0 18px 0 ${ring.color}` }}
            />
            <div
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: ring.duration, animationTimingFunction: "linear" }}
            >
              <span
                className="absolute left-1/2 top-0 size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                style={{ boxShadow: `0 0 10px 3px ${ring.color}, 0 0 22px 7px rgba(94,160,255,0.45)` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Noyau central — sphère glossy, respiration lente */}
      <div
        className="relative size-16 rounded-full sm:size-20"
        style={{ animation: "core-pulse 6s ease-in-out infinite" }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(35% 35% at 32% 28%, rgba(255,255,255,0.95), rgba(94,160,255,0.92) 38%, rgba(43,124,246,0.95) 68%, rgba(20,55,140,0.9) 100%)",
            boxShadow: "0 0 30px 8px rgba(77,163,255,0.5), inset 0 0 18px rgba(255,255,255,0.22)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full opacity-60"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.35) 8%, transparent 18%, transparent 100%)",
            animation: "spin 14s linear infinite",
          }}
        />
      </div>
    </div>
  );
}
