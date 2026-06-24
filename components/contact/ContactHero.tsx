"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { contact } from "@/lib/content";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full border-b border-gray-300 bg-transparent py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand focus:outline-none transition-colors";

/**
 * Entrée plein écran de /contact — headline serif + carte formulaire blanche.
 * Décorations 3D des coins bas avec fallback (blob flou) si l'asset est absent.
 */
export function ContactHero({ blueTubes }: { blueTubes: boolean }) {
  const h = contact.hero;
  const f = contact.heroForm;
  const shouldReduceMotion = useReducedMotion();

  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
    website: "",
  });

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
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          company: values.company,
          message: values.message,
          website: values.website,
        }),
      });
      const data: { ok?: boolean } = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        setValues({ firstName: "", lastName: "", email: "", company: "", message: "", website: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-base">
      {/* Fond — dégradé linéaire DA NaxioWeb */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #070B18 0%, #0B1120 25%, #0E1424 50%, #0B1120 75%, #070B18 100%)",
        }}
      />
      {/* Dégradés radiaux */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(43,124,246,0.18), transparent 60%), radial-gradient(circle at 70% 80%, rgba(43,124,246,0.12), transparent 60%)",
        }}
      />
      {/* Glows flous */}
      <div className="pointer-events-none absolute -top-24 left-0 h-96 w-96 rounded-full bg-[rgba(43,124,246,0.4)] opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-[rgba(43,124,246,0.3)] opacity-20 blur-3xl" />

      {/* Décorations 3D — coins bas */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-[400px] w-[500px]"
      >
        {blueTubes ? (
          <Image
            src="/media/blue-tubes.png"
            alt=""
            fill
            className="object-contain"
            style={{ objectPosition: "bottom left", transform: "scaleX(-1)" }}
            aria-hidden="true"
          />
        ) : (
          <div
            className="absolute bottom-0 left-0 h-full w-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(43,124,246,0.35), transparent 70%)" }}
          />
        )}
      </motion.div>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="pointer-events-none absolute bottom-0 right-0 z-10 h-[350px] w-[450px]"
      >
        {blueTubes ? (
          <Image
            src="/media/blue-tubes.png"
            alt=""
            fill
            className="object-contain"
            style={{ objectPosition: "bottom right" }}
            aria-hidden="true"
          />
        ) : (
          <div
            className="absolute bottom-0 right-0 h-full w-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(43,124,246,0.3), transparent 70%)" }}
          />
        )}
      </motion.div>

      {/* Contenu */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-5xl italic leading-[1.1] text-white sm:text-7xl"
        >
          {h.line1}
          <br />
          {h.line2} <span className="text-brand-light">{h.accent}</span>
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 max-w-xl text-white/80"
        >
          {h.description}
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 w-full max-w-md rounded-2xl bg-white p-6 text-left shadow-2xl md:p-8"
        >
          {status === "success" ? (
            <p role="status" className="rounded-xl bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
              {f.success}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
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

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-medium text-gray-500">
                    {f.firstName}
                    <span className="text-brand">*</span>
                  </span>
                  <input
                    type="text"
                    required
                    value={values.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-gray-500">
                    {f.lastName}
                    <span className="text-brand">*</span>
                  </span>
                  <input
                    type="text"
                    required
                    value={values.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    className={fieldClass}
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs font-medium text-gray-500">
                  {f.email}
                  <span className="text-brand">*</span>
                </span>
                <input
                  type="email"
                  required
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className="text-xs font-medium text-gray-500">{f.company}</span>
                <input
                  type="text"
                  value={values.company}
                  onChange={(e) => set("company", e.target.value)}
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className="text-xs font-medium text-gray-500">
                  {f.message}
                  <span className="text-brand">*</span>
                </span>
                <textarea
                  required
                  rows={3}
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                  className={`${fieldClass} resize-none`}
                />
              </label>

              {status === "error" && (
                <p role="alert" className="text-xs text-brand">
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

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="mt-2 w-full rounded-full bg-[#070B18] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? f.sending : f.submit}
              </motion.button>

              <a
                href={whatsappLink(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs text-gray-500 underline-offset-2 hover:text-brand hover:underline"
              >
                {f.whatsappFallback}
              </a>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
