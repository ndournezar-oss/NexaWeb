/**
 * Fond « aura » : pool de lumière bleue en dégradés radiaux, dérive lente,
 * grain quasi imperceptible. Utilisé pour la section Conversion (pas de photo
 * dédiée), où le point focal lumineux porte tout le poids visuel du CTA.
 */

const LAYER =
  "radial-gradient(1000px 700px at 50% 60%, rgba(43,124,246,0.30), transparent 60%)," +
  "radial-gradient(600px 500px at 15% 10%, rgba(94,160,255,0.12), transparent 55%)," +
  "#070B18";

type AuraBackgroundProps = {
  /** Dégradé qui dérive lentement (vie). Coupé par prefers-reduced-motion via CSS. */
  animated?: boolean;
  /** Grain subtil par-dessus. */
  grain?: boolean;
  className?: string;
};

export function AuraBackground({ animated = false, grain = true, className = "" }: AuraBackgroundProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0" style={{ background: LAYER }} />
      {animated && (
        <div
          className="aura-drift absolute inset-[-15%]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(43,124,246,0.18), transparent 70%)",
          }}
        />
      )}
      {grain && <div className="aura-grain absolute inset-0 opacity-[0.025] mix-blend-overlay" />}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_55%,rgba(7,11,24,0.55)_100%)]" />
    </div>
  );
}
