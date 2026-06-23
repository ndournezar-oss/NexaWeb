import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

/**
 * Formulaire de contact — route SERVEUR (Resend). Sécurité :
 *  - validation + bornes de longueur, échappement HTML (anti-injection mail) ;
 *  - honeypot anti-bot ;
 *  - rate-limit basique par IP (en mémoire — store durable requis en prod) ;
 *  - FALLBACK GRACIEUX : si les variables d'env Resend manquent ou que l'envoi
 *    échoue, on renvoie `fallback: true` → le client bascule vers WhatsApp.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = { name: 120, email: 160, message: 3000, company: 120 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT = 6;
const RATE_WINDOW_MS = 10 * 60_000;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || now > e.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  e.count += 1;
  return e.count > RATE_LIMIT;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function ok() {
  return NextResponse.json({ ok: true });
}
function fallback() {
  return NextResponse.json({ ok: false, fallback: true });
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) return fallback();

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return fallback();
  }

  // Honeypot : un bot remplit le champ caché → on simule un succès.
  if (typeof payload.website === "string" && payload.website.trim() !== "") return ok();

  // Le formulaire « entrée » envoie firstName/lastName ; l'ancien formulaire envoie name.
  const firstName = String(payload.firstName ?? "").trim().slice(0, MAX.name);
  const lastName = String(payload.lastName ?? "").trim().slice(0, MAX.name);
  const name =
    String(payload.name ?? "").trim().slice(0, MAX.name) ||
    [firstName, lastName].filter(Boolean).join(" ");
  const email = String(payload.email ?? "").trim().slice(0, MAX.email);
  const message = String(payload.message ?? "").trim().slice(0, MAX.message);
  const company = String(payload.company ?? "").trim().slice(0, MAX.company);

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;

  // Env Resend absentes → on ne plante pas : on bascule proprement vers WhatsApp.
  if (!apiKey || !from) return fallback();

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    message: escapeHtml(message),
    company: escapeHtml(company),
  };

  try {
    const resend = new Resend(apiKey);

    // 1) Notification à l'agence
    const lead = await resend.emails.send({
      from: `${siteConfig.name} <${from}>`,
      to: [to],
      replyTo: email,
      subject: `Nouvelle demande — ${safe.name}`,
      html: `<h2>Nouvelle demande de contact</h2>
        <p><strong>Nom :</strong> ${safe.name}</p>
        <p><strong>E-mail :</strong> ${safe.email}</p>
        ${safe.company ? `<p><strong>Entreprise :</strong> ${safe.company}</p>` : ""}
        <p><strong>Message :</strong></p>
        <p style="white-space:pre-wrap">${safe.message}</p>`,
    });
    if (lead.error) return fallback();

    // 2) Accusé de réception au visiteur (best-effort : on n'échoue pas dessus)
    await resend.emails
      .send({
        from: `${siteConfig.name} <${from}>`,
        to: [email],
        subject: "On a bien reçu votre message — NexaWeb",
        html: `<p>Bonjour ${safe.name},</p>
          <p>Merci pour votre message — on revient vers vous sous 24 à 48&nbsp;h ouvrées. Pour une réponse immédiate, écrivez-nous sur WhatsApp&nbsp;: ${siteConfig.whatsappDisplay}.</p>
          <p>— L'équipe ${siteConfig.name}, ${siteConfig.city}</p>`,
      })
      .catch(() => undefined);

    return ok();
  } catch {
    return fallback();
  }
}
