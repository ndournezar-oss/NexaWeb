"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Send, Sparkles } from "lucide-react";
import { home } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

type ChatMessage = { role: "user" | "assistant"; content: string };

const FREE_MESSAGES = 3;
const MAX_INPUT = 500;

/**
 * Démo IA live — la pièce maîtresse. Grande fenêtre de chat premium (glow bleu),
 * assistant réellement fonctionnel via /api/chat. Compteur de messages gratuits,
 * bascule en carte CTA WhatsApp à court de messages. Gestion d'erreur 100 %
 * gracieuse : jamais d'erreur brute, toujours une porte de sortie WhatsApp.
 */
export function AiDemo() {
  const c = home.aiDemo;
  const reduced = useReducedMotion();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: c.intro },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [free, setFree] = useState(FREE_MESSAGES);
  const [ended, setEnded] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "end" });
  }, [messages, loading, ended, reduced]);

  const waLink = whatsappLink(c.whatsappMessage);

  async function send() {
    const text = input.trim().slice(0, MAX_INPUT);
    if (!text || loading || ended) return;

    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    const remaining = free - 1;
    setFree(remaining);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data: { reply?: string; fallback?: boolean } = await res.json();
      const reply = data.reply || c.errorFallback;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      if (data.fallback) setShowWhatsapp(true);
    } catch {
      // Réseau coupé / réponse illisible → message propre + WhatsApp.
      setMessages((prev) => [...prev, { role: "assistant", content: c.errorFallback }]);
      setShowWhatsapp(true);
    } finally {
      setLoading(false);
      if (remaining <= 0) setEnded(true);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* Halo bleu autour de la fenêtre */}
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_30%,rgba(43,124,246,0.4),transparent_70%)] blur-2xl" />

      <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-surface shadow-[0_0_60px_-12px_rgba(43,124,246,0.55),0_30px_80px_-30px_rgba(0,0,0,0.8)]">
        {/* En-tête */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {c.status}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-display text-xs font-medium text-brand-light">
            <Sparkles className="size-3" aria-hidden="true" />
            {Math.max(0, free)} {c.freeSuffix}
          </span>
        </div>

        {/* Conversation */}
        <div
          ref={scrollRef}
          className="h-[16rem] space-y-4 overflow-y-auto px-5 py-6 sm:h-[20rem]"
          aria-live="polite"
        >
          {messages.map((m, i) => (
            <Bubble key={i} role={m.role} reduced={!!reduced}>
              {m.content}
            </Bubble>
          ))}

          {loading && (
            <Bubble role="assistant" reduced={!!reduced}>
              <span className="inline-flex items-center gap-1">
                <Dot reduced={!!reduced} delay={0} />
                <Dot reduced={!!reduced} delay={0.15} />
                <Dot reduced={!!reduced} delay={0.3} />
              </span>
            </Bubble>
          )}

          {(ended || showWhatsapp) && (
            <ConversionCard wa={waLink} title={c.conversionTitle} subtitle={c.conversionSubtitle} cta={c.conversionCta} />
          )}

          <div ref={endRef} />
        </div>

        {/* Saisie */}
        <div className="border-t border-white/10 bg-white/[0.02] p-3">
          {ended ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-deep px-5 py-3.5 font-display text-sm font-semibold text-white shadow-glow-sm transition-all duration-300 hover:shadow-glow"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {c.conversionCta}
            </a>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                maxLength={MAX_INPUT}
                disabled={loading}
                placeholder={c.placeholder}
                aria-label={c.placeholder}
                className="min-w-0 flex-1 rounded-2xl border border-white/12 bg-base/60 px-4 py-3.5 font-body text-[0.95rem] text-white placeholder:text-muted focus:border-brand-light/60 focus:outline-none focus:ring-2 focus:ring-brand-light/40 disabled:opacity-60"
              />
              <motion.button
                type="button"
                onClick={send}
                disabled={loading || !input.trim()}
                whileTap={reduced ? undefined : { scale: 0.92 }}
                aria-label={c.send}
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-glow-sm transition-all duration-300 hover:bg-brand-light hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="size-5" aria-hidden="true" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Bubble({
  role,
  reduced,
  children,
}: {
  role: "user" | "assistant";
  reduced: boolean;
  children: React.ReactNode;
}) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[0.95rem] leading-relaxed ${
          isUser
            ? "rounded-br-md bg-brand-deep text-white"
            : "rounded-bl-md border border-white/10 bg-base/70 text-silver"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

function Dot({ reduced, delay }: { reduced: boolean; delay: number }) {
  if (reduced) return <span className="size-1.5 rounded-full bg-brand-light" />;
  return (
    <motion.span
      className="size-1.5 rounded-full bg-brand-light"
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
      transition={{ duration: 1, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function ConversionCard({
  wa,
  title,
  subtitle,
  cta,
}: {
  wa: string;
  title: string;
  subtitle: string;
  cta: string;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-brand/40 bg-gradient-to-br from-brand/20 via-surface to-surface p-5"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand/30 blur-2xl" />
        <p className="relative font-display text-base font-semibold text-white">{title}</p>
        <p className="relative mt-1.5 text-sm text-silver">{subtitle}</p>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-brand-deep px-5 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:opacity-90"
        >
          {cta}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </motion.div>
    </AnimatePresence>
  );
}
