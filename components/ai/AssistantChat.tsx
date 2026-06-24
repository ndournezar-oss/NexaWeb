"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { home } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

type ChatMessage = { role: "user" | "assistant"; content: string };

const FREE_MESSAGES = 3;
const MAX_INPUT = 500;
/** Vitesse du typewriter (ms par caractère). ~18ms ≈ « vivant » sans gêner la lecture. */
const TYPE_SPEED_MS = 18;

/**
 * Fenêtre de chat IA — pièce maîtresse de /assistants-ia. Branchée sur le VRAI
 * backend (`/api/chat`, contrat `{ messages }` → `{ reply, fallback }`), jamais
 * de réponse statique. Réponses de l'assistant révélées en typewriter (state
 * string incrémenté dans une bulle isolée → pas de re-render de toute la liste).
 *
 * Garde-fous :
 *  - scroll libre à tout moment ; auto-scroll seulement si déjà en bas (stickRef) ;
 *  - bouton STOP : annule le fetch en cours OU stoppe le typewriter (garde le texte) ;
 *  - saisie grisée pendant la réponse, réactivée à la fin / à l'arrêt ;
 *  - compteur « 3 messages gratuits » (visuel ; le serveur plafonne réellement) ;
 *  - épuisement → carte CTA WhatsApp ; toute erreur → message propre + WhatsApp.
 *  - prefers-reduced-motion → pas de typewriter, le texte apparaît directement.
 */
export function AssistantChat() {
  const c = home.aiDemo;
  const reduced = useReducedMotion();

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: c.intro },
  ]);
  const [streamFull, setStreamFull] = useState<string | null>(null);
  const [stopSignal, setStopSignal] = useState(0);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [free, setFree] = useState(FREE_MESSAGES);
  const [ended, setEnded] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);
  const abortRef = useRef<AbortController | null>(null);
  const pendingFreeRef = useRef(FREE_MESSAGES);

  const responding = loading || streamFull !== null;
  const waLink = whatsappLink(c.whatsappMessage);

  /** Colle au bas seulement si l'utilisateur n'a pas remonté lire un message. */
  function maybeScroll() {
    const el = scrollRef.current;
    if (el && stickRef.current) el.scrollTop = el.scrollHeight;
  }

  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
  }

  // Re-colle au bas sur les changements « structurels » (nouveau message, dots, CTA).
  useEffect(() => {
    maybeScroll();
  }, [messages, loading, ended, showWhatsapp]);

  /** Finalise une réponse : pousse le texte affiché, applique l'épuisement. */
  function finalize(finalText: string | null) {
    if (finalText !== null) {
      setMessages((prev) => [...prev, { role: "assistant", content: finalText }]);
    }
    setStreamFull(null);
    setLoading(false);
    if (pendingFreeRef.current <= 0) setEnded(true);
    stickRef.current = true;
    requestAnimationFrame(maybeScroll);
  }

  function stop() {
    if (loading) {
      // Réponse pas encore arrivée → on annule le fetch (catch AbortError finalise).
      abortRef.current?.abort();
    } else if (streamFull !== null) {
      // Typewriter en cours → on signale l'arrêt à la bulle (garde le texte tapé).
      setStopSignal((s) => s + 1);
    }
  }

  async function send() {
    const text = input.trim().slice(0, MAX_INPUT);
    if (!text || responding || ended) return;

    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    stickRef.current = true;
    const remaining = free - 1;
    setFree(remaining);
    pendingFreeRef.current = remaining;

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      });
      const data: { reply?: string; fallback?: boolean } = await res.json();
      const reply = (data.reply || c.errorFallback).trim();
      if (data.fallback) setShowWhatsapp(true);

      if (reduced) {
        // Pas d'animation : message direct.
        setLoading(false);
        finalize(reply);
      } else {
        setLoading(false);
        setStreamFull(reply); // déclenche le typewriter (StreamingBubble)
      }
    } catch (err) {
      if ((err as Error | undefined)?.name === "AbortError") {
        finalize(null); // arrêt volontaire avant réponse : rien à afficher
        return;
      }
      // Réseau coupé / réponse illisible → message propre + WhatsApp.
      setShowWhatsapp(true);
      setLoading(false);
      if (reduced) finalize(c.errorFallback);
      else setStreamFull(c.errorFallback);
    } finally {
      abortRef.current = null;
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      {/* Halo bleu autour de la fenêtre */}
      <div className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_25%,rgba(43,124,246,0.35),transparent_70%)] blur-2xl" />

      <div className="relative flex h-[calc(100dvh-13rem)] min-h-[440px] flex-col overflow-hidden rounded-3xl border border-[#2B7CF6]/45 bg-[#0E1424] shadow-[0_0_28px_-2px_rgba(77,163,255,0.45),0_30px_80px_-30px_rgba(0,0,0,0.85)] md:h-[78vh] md:min-h-[680px] md:max-h-[860px]">
        {/* En-tête — statut + compteur gratuit */}
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
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2B7CF6]/30 bg-[#2B7CF6]/10 px-3 py-1 font-display text-xs font-medium text-brand-light">
            <Sparkles className="size-3" aria-hidden="true" />
            {Math.max(0, free)} {c.freeSuffix}
          </span>
        </div>

        {/* Conversation — scrollable à tout moment, même pendant la réponse */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-5"
          aria-live="polite"
        >
          {messages.map((m, i) =>
            m.role === "user" ? (
              <UserBubble key={i} reduced={!!reduced}>
                {m.content}
              </UserBubble>
            ) : (
              <AssistantBubble key={i} reduced={!!reduced}>
                <RichText text={m.content} />
              </AssistantBubble>
            )
          )}

          {loading && (
            <AssistantBubble reduced={!!reduced}>
              <span className="inline-flex items-center gap-1">
                <Dot reduced={!!reduced} delay={0} />
                <Dot reduced={!!reduced} delay={0.15} />
                <Dot reduced={!!reduced} delay={0.3} />
              </span>
            </AssistantBubble>
          )}

          {streamFull !== null && (
            <StreamingBubble
              full={streamFull}
              stopSignal={stopSignal}
              reduced={!!reduced}
              onTick={maybeScroll}
              onDone={finalize}
            />
          )}

          {(ended || showWhatsapp) && (
            <ConversionCard
              wa={waLink}
              title={c.conversionTitle}
              subtitle={c.conversionSubtitle}
              cta={c.conversionCta}
            />
          )}

          <div />
        </div>

        {/* Saisie — padding bas qui respecte la safe-area iOS (home indicator). */}
        <div className="border-t border-white/10 bg-white/[0.02] px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
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
                disabled={responding}
                placeholder={c.placeholder}
                aria-label={c.placeholder}
                className="min-w-0 flex-1 rounded-2xl border border-white/12 bg-base/60 px-4 py-3.5 font-body text-[0.95rem] text-white placeholder:text-muted transition-opacity focus:border-brand-light/60 focus:outline-none focus:ring-2 focus:ring-brand-light/40 disabled:opacity-50"
              />
              {responding ? (
                <button
                  type="button"
                  onClick={stop}
                  aria-label="Arrêter la réponse"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-white/[0.06] px-4 font-display text-sm font-medium text-silver transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light/50"
                >
                  Arrêter
                  <X className="size-4" aria-hidden="true" />
                </button>
              ) : (
                <motion.button
                  type="button"
                  onClick={send}
                  disabled={!input.trim()}
                  whileTap={reduced ? undefined : { scale: 0.92 }}
                  aria-label={c.send}
                  className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-glow-sm transition-all duration-300 hover:bg-brand-light hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="size-5" aria-hidden="true" />
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Bulle assistant — fond plus sombre + glow bleu subtil + icône IA à gauche. */
function AssistantBubble({
  reduced,
  children,
}: {
  reduced: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex items-start gap-2.5"
    >
      <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2B7CF6]/15 text-brand-light ring-1 ring-inset ring-[#2B7CF6]/30">
        <Sparkles className="size-3.5" aria-hidden="true" />
      </span>
      <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-[#2B7CF6]/25 bg-[#0B1120] px-4 py-3 text-[0.95rem] leading-relaxed text-silver shadow-[0_0_18px_-8px_rgba(77,163,255,0.55)]">
        {children}
      </div>
    </motion.div>
  );
}

/** Bulle utilisateur — slide-in simple, accent bleu, alignée à droite. */
function UserBubble({
  reduced,
  children,
}: {
  reduced: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-end"
    >
      <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-brand-deep px-4 py-3 text-[0.95rem] leading-relaxed text-white">
        {children}
      </div>
    </motion.div>
  );
}

/**
 * Bulle assistant en cours d'écriture (typewriter). State string isolé et
 * incrémenté ici → seule cette bulle se re-rend, pas toute la conversation.
 * `onDone` est appelé une seule fois (fin naturelle OU arrêt via stopSignal).
 */
function StreamingBubble({
  full,
  stopSignal,
  reduced,
  onTick,
  onDone,
}: {
  full: string;
  stopSignal: number;
  reduced: boolean;
  onTick: () => void;
  onDone: (finalText: string) => void;
}) {
  const [typed, setTyped] = useState("");
  const typedRef = useRef("");
  const doneRef = useRef(false);
  const firstStop = useRef(true);

  function finish(text: string) {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone(text);
  }

  // Typewriter — incrémente l'index, slice la chaîne complète.
  useEffect(() => {
    if (reduced) {
      finish(full);
      return undefined;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i >= full.length) {
        clearInterval(id);
        finish(full); // la liste affiche le texte complet finalisé
        return;
      }
      const slice = full.slice(0, i);
      typedRef.current = slice;
      setTyped(slice);
      onTick();
    }, TYPE_SPEED_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full]);

  // Arrêt demandé → garde le texte déjà tapé.
  useEffect(() => {
    if (firstStop.current) {
      firstStop.current = false;
      return;
    }
    finish(typedRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopSignal]);

  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2B7CF6]/15 text-brand-light ring-1 ring-inset ring-[#2B7CF6]/30">
        <Sparkles className="size-3.5" aria-hidden="true" />
      </span>
      <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-md border border-[#2B7CF6]/25 bg-[#0B1120] px-4 py-3 text-[0.95rem] leading-relaxed text-silver shadow-[0_0_18px_-8px_rgba(77,163,255,0.55)]">
        {renderInline(typed)}
        <span className="ml-0.5 inline-block w-[2px] -translate-y-[1px] animate-pulse bg-brand-light align-middle" style={{ height: "1em" }} aria-hidden="true" />
      </div>
    </div>
  );
}

/**
 * Markdown léger des réponses IA → éléments React (jamais d'astérisques bruts).
 * Pas de dépendance ni de dangerouslySetInnerHTML : React échappe le texte, donc
 * sûr (XSS), et c'est assez rapide pour tourner à chaque frame du typewriter.
 * Gère **gras**, __gras__, *italique*, `code`, et les liens [texte](https://…).
 */
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex =
    /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\n]+)\*|`([^`]+)`/g;
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1]) {
      nodes.push(
        <a
          key={k++}
          href={m[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-light underline underline-offset-2 hover:text-brand"
        >
          {m[2]}
        </a>
      );
    } else if (m[4] !== undefined) {
      nodes.push(
        <strong key={k++} className="font-semibold text-white">
          {m[4]}
        </strong>
      );
    } else if (m[5] !== undefined) {
      nodes.push(
        <strong key={k++} className="font-semibold text-white">
          {m[5]}
        </strong>
      );
    } else if (m[6] !== undefined) {
      nodes.push(<em key={k++}>{m[6]}</em>);
    } else if (m[7] !== undefined) {
      nodes.push(
        <code key={k++} className="rounded bg-white/10 px-1 py-0.5 text-[0.85em]">
          {m[7]}
        </code>
      );
    }
    last = regex.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/**
 * Rendu structurel d'une réponse finalisée : paragraphes + listes à puces
 * (`- ` / `* `), titres `#` aplatis en gras (taille de bulle, jamais énormes).
 * L'inline (gras/italique/liens) passe par renderInline.
 */
function RichText({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;
  let items: string[] = [];
  let key = 0;

  const flush = () => {
    if (!listType || items.length === 0) {
      listType = null;
      items = [];
      return;
    }
    const current = items;
    if (listType === "ol") {
      blocks.push(
        <ol key={`ol-${key++}`} className="my-1 list-decimal space-y-0.5 pl-5 marker:text-brand-light">
          {current.map((it, i) => (
            <li key={i}>{renderInline(it)}</li>
          ))}
        </ol>
      );
    } else {
      blocks.push(
        <ul key={`ul-${key++}`} className="my-1 list-disc space-y-0.5 pl-4 marker:text-brand-light">
          {current.map((it, i) => (
            <li key={i}>{renderInline(it)}</li>
          ))}
        </ul>
      );
    }
    listType = null;
    items = [];
  };

  for (const line of lines) {
    const numbered = /^\s*\d+[.)]\s+(.*)$/.exec(line);
    if (numbered) {
      if (listType && listType !== "ol") flush();
      listType = "ol";
      items.push(numbered[1]);
      continue;
    }
    const bullet = /^\s*[-*•]\s+(.*)$/.exec(line);
    if (bullet) {
      if (listType && listType !== "ul") flush();
      listType = "ul";
      items.push(bullet[1]);
      continue;
    }
    flush();
    const heading = /^\s*#{1,6}\s+(.*)$/.exec(line);
    if (heading) {
      blocks.push(
        <p key={`h-${key++}`} className="font-semibold text-white">
          {renderInline(heading[1])}
        </p>
      );
    } else if (line.trim() !== "") {
      blocks.push(<p key={`p-${key++}`}>{renderInline(line)}</p>);
    }
  }
  flush();

  return <div className="space-y-1.5">{blocks}</div>;
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
        className="relative overflow-hidden rounded-2xl border border-[#2B7CF6]/40 bg-gradient-to-br from-[#2B7CF6]/20 via-[#0E1424] to-[#0E1424] p-5"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#2B7CF6]/30 blur-2xl" />
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
