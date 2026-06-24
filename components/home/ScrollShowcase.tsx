"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { whatsappLink } from "@/lib/site";
import { useIsMobile } from "@/lib/useIsMobile";

/* ------------------------------------------------------------------ *
 * 6 maquettes de sites — intégrées TELLES QUELLES (contenu interne non
 * modifié). Seul l'habillage (titre, device, CTA) est adapté à la DA.
 * ------------------------------------------------------------------ */

const WebsiteMockup1 = () => (
  <div className="h-full w-full bg-[#f8f7f4] overflow-hidden">
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-stone-100" />
      <div className="relative z-10 p-8 md:p-16 h-full flex flex-col">
        <div className="flex justify-between items-center mb-16">
          <div className="text-2xl font-serif text-amber-900">HIGGLOU</div>
          <div className="text-xs uppercase tracking-widest text-stone-600">Paris</div>
        </div>
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <h1 className="text-4xl md:text-7xl font-serif mb-6 text-stone-900 leading-tight">
            L'excellence
            <br />immobilière
          </h1>
          <p className="text-stone-600 text-sm md:text-base mb-8 max-w-md">
            Propriétés d'exception dans les plus beaux quartiers de Paris
          </p>
          <div className="flex gap-4">
            <div className="px-6 py-2 border border-stone-900 text-stone-900 text-sm">Explorer</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-1/2 h-2/3 opacity-20">
        <div className="w-full h-full bg-gradient-to-tl from-amber-900/30 to-transparent" />
      </div>
    </div>
  </div>
);

const WebsiteMockup2 = () => (
  <div className="h-full w-full bg-[#0d0d0d] overflow-hidden">
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-black" />
      <div className="relative z-10 p-8 md:p-16 h-full flex flex-col">
        <div className="flex justify-between items-center mb-16">
          <div className="text-xl font-medium text-white">Linear</div>
          <div className="flex gap-6 text-sm text-gray-400">
            <span>Features</span>
            <span>Method</span>
            <span>Customers</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          <div className="text-xs text-purple-400 mb-4 tracking-widest">PURPOSE-BUILT FOR MODERN TEAMS</div>
          <h1 className="text-4xl md:text-7xl font-medium mb-6 text-white leading-tight">
            Meet the new
            <br />standard for
            <br />modern software
          </h1>
          <p className="text-gray-400 text-sm md:text-base mb-8 max-w-xl">
            Linear streamlines software projects, sprints, tasks, and bug tracking.
          </p>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-purple-600 text-white text-sm rounded-lg">Get started</div>
            <div className="px-6 py-3 border border-gray-700 text-white text-sm rounded-lg">Learn more</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WebsiteMockup3 = () => (
  <div className="h-full w-full bg-black overflow-hidden">
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
      <div className="relative z-10 p-8 md:p-16 h-full flex flex-col">
        <div className="flex justify-between items-center mb-16">
          <div className="text-2xl text-white"></div>
          <div className="flex gap-6 text-sm text-gray-400">
            <span>Mac</span>
            <span>iPad</span>
            <span>iPhone</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-8xl font-semibold mb-4 text-white tracking-tight">
            Mac Pro
          </h1>
          <p className="text-xl md:text-3xl text-gray-400 mb-8">
            Power to the pro.
          </p>
          <div className="flex gap-6">
            <div className="text-blue-500 text-sm">Learn more →</div>
            <div className="text-blue-500 text-sm">Buy →</div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <div className="w-64 h-64 bg-gradient-to-br from-gray-600 to-gray-800 rounded-3xl" />
        </div>
      </div>
    </div>
  </div>
);

const WebsiteMockup4 = () => (
  <div className="h-full w-full bg-white overflow-hidden">
    <div className="relative h-full w-full">
      <div className="relative z-10 p-8 md:p-16 h-full flex flex-col">
        <div className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-black">awwwards.</div>
          <div className="flex gap-6 text-xs text-gray-600 uppercase tracking-wider">
            <span>Sites</span>
            <span>Collections</span>
            <span>Jobs</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-xs text-gray-500 mb-4 tracking-widest">SITE OF THE DAY</div>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-black leading-tight">
            The awards of
            <br />design, creativity
            <br />and innovation
          </h1>
          <div className="flex gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-black">9.5</div>
              <div className="text-xs text-gray-500 mt-1">Design</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black">9.2</div>
              <div className="text-xs text-gray-500 mt-1">Usability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black">9.8</div>
              <div className="text-xs text-gray-500 mt-1">Creativity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WebsiteMockup5 = () => (
  <div className="h-full w-full bg-[#0a0a0a] overflow-hidden">
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-gray-950 to-black" />
      <div className="relative z-10 p-8 md:p-16 h-full flex flex-col">
        <div className="flex justify-between items-center mb-16">
          <div className="text-xl font-medium text-white flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded-sm" />
            Robinhood
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <span>Investing</span>
            <span>Retirement</span>
            <span>Spend</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Investing for
            <br />Everyone
          </h1>
          <p className="text-gray-400 text-sm md:text-base mb-8 max-w-xl">
            Commission-free trading. Powerful tools. Designed for you.
          </p>
          <div className="flex gap-4">
            <div className="px-8 py-3 bg-emerald-500 text-black font-medium text-sm rounded-full">Sign up</div>
            <div className="px-8 py-3 border border-gray-700 text-white text-sm rounded-full">Learn more</div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-full blur-3xl" />
      </div>
    </div>
  </div>
);

const WebsiteMockup6 = () => (
  <div className="h-full w-full bg-[#f5f5f0] overflow-hidden">
    <div className="relative h-full w-full">
      <div className="relative z-10 p-8 md:p-16 h-full flex flex-col">
        <div className="flex justify-between items-center mb-16">
          <div className="text-3xl font-light text-black">Lusion</div>
          <div className="flex gap-6 text-sm text-gray-600">
            <span>Work</span>
            <span>Studio</span>
            <span>Contact</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-xs text-gray-500 mb-4 tracking-widest">CREATIVE STUDIO</div>
          <h1 className="text-4xl md:text-7xl font-light mb-6 text-black leading-tight">
            We craft digital
            <br />experiences that
            <br />inspire
          </h1>
          <p className="text-gray-600 text-sm md:text-base mb-8 max-w-xl">
            Award-winning creative studio pushing the boundaries of digital design
          </p>
        </div>
        <div className="absolute bottom-16 right-16 w-48 h-48 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-60 blur-2xl" />
      </div>
    </div>
  </div>
);

const MOCKUPS = [
  WebsiteMockup1,
  WebsiteMockup2,
  WebsiteMockup3,
  WebsiteMockup4,
  WebsiteMockup5,
  WebsiteMockup6,
];

const NAMES = [
  "Higglou — Immobilier de luxe",
  "Linear — Project Management",
  "Apple — Mac Pro",
  "Awwwards — Design Awards",
  "Robinhood — Investing",
  "Lusion — Creative Studio",
];

/** Tranches de progression scroll → index du mockup affiché. */
function indexFromProgress(p: number): number {
  if (p < 0.16) return 0;
  if (p < 0.33) return 1;
  if (p < 0.5) return 2;
  if (p < 0.66) return 3;
  if (p < 0.83) return 4;
  return 5;
}

/**
 * Showcase scroll — device 3D incliné qui se redresse au scroll (logique
 * d'origine conservée : rotateX + scale + translate sur scrollYProgress) et
 * fait défiler 6 maquettes de sites de référence en crossfade. Adapté à la DA
 * NaxioWeb (navy + glow bleu). prefers-reduced-motion → device statique, pas
 * d'animation scroll, première maquette figée.
 */
export function ScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [active, setActive] = useState(0);

  // Animation 3D pilotée par le scroll : desktop uniquement. Sur mobile (ou
  // reduced-motion), le device est statique et les maquettes défilent en
  // autoplay — pas de rotateX/scale liés au scroll (cause de jank tactile).
  const scrollDriven = !reduced && !isMobile;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!scrollDriven) return;
    const idx = indexFromProgress(v);
    setActive((prev) => (prev === idx ? prev : idx));
  });

  // Autoplay des maquettes sur mobile (device statique → elles défilent seules).
  useEffect(() => {
    if (scrollDriven || reduced) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % MOCKUPS.length), 2000);
    return () => clearInterval(id);
  }, [scrollDriven, reduced]);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const Active = MOCKUPS[active];
  const shownIndex = active;

  return (
    <section
      ref={containerRef}
      className="relative flex h-[50rem] items-center justify-center bg-[#070B18] p-2 md:h-[80rem] md:p-20"
    >
      <div className="relative w-full py-10 md:py-40" style={{ perspective: "1000px" }}>
        {/* Titre */}
        <motion.div
          style={scrollDriven ? { translateY: translate } : undefined}
          className="mx-auto mb-8 max-w-5xl text-center"
        >
          <h2 className="font-hero text-4xl font-bold leading-tight text-white md:text-6xl">
            Les meilleurs sites du monde ont un point commun.
          </h2>
          <p className="mt-4 text-[#9AA6B8]">
            Un design qui inspire confiance. On le construit pour vous.
          </p>
        </motion.div>

        {/* Device — 3D au scroll sur desktop ; statique + fade-in sur mobile/reduced */}
        <motion.div
          style={
            scrollDriven
              ? {
                  rotateX: rotate,
                  scale,
                  boxShadow:
                    "0 0 60px rgba(43,124,246,0.15), 0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
                }
              : { boxShadow: "0 0 60px rgba(43,124,246,0.15), 0 9px 20px #0000004a" }
          }
          {...(scrollDriven || reduced
            ? {}
            : {
                initial: { opacity: 0 },
                whileInView: { opacity: 1 },
                viewport: { once: true, margin: "0px 0px -10% 0px" },
                transition: { duration: 0.5 },
              })}
          className="mx-auto -mt-12 h-[26rem] w-full max-w-5xl rounded-[30px] border-4 border-[#1E3A6E] bg-[#0B1120] p-2 shadow-2xl md:h-[40rem] md:p-6"
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl">
            {reduced ? (
              <WebsiteMockup1 />
            ) : (
              <AnimatePresence>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Active />
                </motion.div>
              </AnimatePresence>
            )}

            {/* Nom du site — change avec la maquette */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/65 to-transparent px-4 py-3 text-center">
              <span className="font-display text-xs font-medium uppercase tracking-[0.18em] text-white/90 md:text-sm">
                {NAMES[shownIndex]}
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTA + crédit */}
        <div className="mx-auto mb-10 mt-20 max-w-5xl px-4 text-center">
          <p className="mb-6 text-xs font-light italic text-[#9AA6B8]/70 md:text-sm">
            Inspirations visuelles — ces designs appartiennent à leurs créateurs respectifs.
            <br className="hidden md:block" />
            Vous voulez un site de ce niveau ? NaxioWeb le construit pour vous.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white shadow-lg shadow-blue-500/50 transition-all hover:bg-blue-700 hover:shadow-blue-500/70"
            >
              Discuter sur WhatsApp
            </a>
            <Link
              href="/agence"
              className="rounded-lg border-2 border-white/20 px-8 py-3 font-medium text-white transition-all hover:border-white/40"
            >
              Voir nos services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
