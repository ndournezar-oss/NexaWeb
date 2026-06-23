import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

// Edge runtime requis : la variante Node de @vercel/og échoue sur les chemins
// Windows contenant un espace (fileURLToPath sur le font par défaut).
export const runtime = "edge";
export const alt = "NexaWeb — Agence de création web premium à Casablanca";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image OpenGraph générée dynamiquement (aucun fichier requis, jamais de 404).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#070B18",
          backgroundImage: "linear-gradient(135deg, #15336b 0%, #0b1730 45%, #070B18 75%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Marque — wordmark texte uniquement, pas d'icône dessinée à la main */}
        <div style={{ display: "flex", fontSize: "44px", fontWeight: 700, letterSpacing: "-0.03em" }}>
          <span>Nexa</span>
          <span style={{ color: "#5EA0FF" }}>Web</span>
        </div>

        {/* Accroche */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "62px",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            On construit des sites premium qui pensent.
          </div>
          <div style={{ fontSize: "30px", color: "#B8C0CC", maxWidth: "880px" }}>
            {siteConfig.tagline}
          </div>
        </div>

        {/* Pied */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "26px",
            color: "#5EA0FF",
            fontWeight: 500,
          }}
        >
          <div style={{ width: "12px", height: "12px", borderRadius: "999px", background: "#4DA3FF" }} />
          <span>
            {siteConfig.city} · {siteConfig.country}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
