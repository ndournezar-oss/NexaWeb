/**
 * Motif zellige géométrique (étoile à 8 branches / khatam) en lignes fines.
 * Raffiné, jamais folklorique. Utilisé comme fond subtil et séparateur.
 * La couleur suit `currentColor` ; pilotez l'intensité via `opacity` + text-color.
 */

type ZelligePatternProps = {
  className?: string;
  opacity?: number;
  /** Taille d'une tuile en px. */
  scale?: number;
};

let uid = 0;

export function ZelligePattern({ className, opacity = 0.12, scale = 88 }: ZelligePatternProps) {
  // id stable et unique par instance (évite les collisions de <defs>).
  const id = `zellige-${(uid += 1)}`;

  return (
    <svg
      aria-hidden="true"
      className={className}
      width="100%"
      height="100%"
      style={{ opacity }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={id} width={scale} height={scale} patternUnits="userSpaceOnUse">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth={0.75}
            strokeLinejoin="round"
            shapeRendering="geometricPrecision"
          >
            {/* Carré droit */}
            <rect x={scale * 0.17} y={scale * 0.17} width={scale * 0.66} height={scale * 0.66} />
            {/* Carré pivoté à 45° → étoile à 8 branches */}
            <rect
              x={scale * 0.17}
              y={scale * 0.17}
              width={scale * 0.66}
              height={scale * 0.66}
              transform={`rotate(45 ${scale / 2} ${scale / 2})`}
            />
            {/* Octogone central */}
            <circle cx={scale / 2} cy={scale / 2} r={scale * 0.12} />
            {/* Entrelacs vers les tuiles voisines */}
            <line x1={scale / 2} y1={0} x2={scale / 2} y2={scale * 0.17} />
            <line x1={scale / 2} y1={scale * 0.83} x2={scale / 2} y2={scale} />
            <line x1={0} y1={scale / 2} x2={scale * 0.17} y2={scale / 2} />
            <line x1={scale * 0.83} y1={scale / 2} x2={scale} y2={scale / 2} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Séparateur horizontal fin orné du motif, pour ponctuer les sections. */
export function ZelligeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto h-px w-full max-w-container ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-silver/30 to-transparent" />
      <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-brand/50" />
      <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 border border-brand/30" />
    </div>
  );
}
