"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { contact } from "@/lib/content";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Formulaire de contact → /api/contact (Resend). Honeypot anti-bot, validation
 * légère côté client, et fallback gracieux vers WhatsApp si l'envoi échoue
 * (env Resend absentes, réseau, etc.) — jamais d'erreur brute.
 */
export function ContactForm() {
  const f = contact.form;
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ name: "", email: "", message: "", website: "" });

  function set<K extends keyof typeof values>(key: K, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: { ok?: boolean } = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        setValues({ name: "", email: "", message: "", website: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full rounded-2xl border border-white/12 bg-base/50 px-4 py-3.5 font-body text-[0.95rem] text-white placeholder:text-muted focus:border-brand-light/60 focus:outline-none focus:ring-2 focus:ring-brand-light/40";

  return (
    <div className="rounded-3xl border border-white/10 bg-surface/70 p-7 sm:p-9">
      <h2 className="font-display text-2xl font-semibold text-white">{f.title}</h2>
      <p className="mt-2 text-silver">{f.subtitle}</p>

      {status === "success" ? (
        <p
          role="status"
          className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-emerald-200"
        >
          {f.success}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          {/* Honeypot (caché aux humains) */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label>
              Site web
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(e) => set("website", e.target.value)}
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              required
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder={f.name}
              aria-label={f.name}
              className={fieldClass}
            />
            <input
              type="email"
              required
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder={f.email}
              aria-label={f.email}
              className={fieldClass}
            />
          </div>
          <textarea
            required
            rows={4}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder={f.message}
            aria-label={f.message}
            className={`${fieldClass} resize-y`}
          />

          {status === "error" && (
            <p role="alert" className="text-sm text-brand-light">
              {f.error}{" "}
              <a
                href={whatsappLink(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                WhatsApp
              </a>
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 font-display text-[0.95rem] font-medium text-white shadow-glow-sm transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-glow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <Send className="size-[1.1em]" aria-hidden="true" />
            {status === "sending" ? f.sending : f.submit}
          </button>
        </form>
      )}
    </div>
  );
}
