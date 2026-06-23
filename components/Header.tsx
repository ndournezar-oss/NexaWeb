"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { nav } from "@/lib/site";
import { EASE } from "@/lib/motion";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Transparent au-dessus du héros → surface sombre + blur au scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu au changement de route + verrouille le scroll quand ouvert.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
    document.body.style.overflow = "";
    return undefined;
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
        scrolled || open
          ? "border-b border-white/10 bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-5 sm:px-8 md:h-20">
        <Logo />

        {/* Nav desktop */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 font-display text-sm font-medium transition-colors duration-300 hover:[text-shadow:0_0_18px_rgba(94,160,255,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light ${
                  active ? "text-white" : "text-silver hover:text-white"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-brand-light to-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton
            label="WhatsApp"
            variant="ghost"
            className="!gap-1.5 !px-4 !py-2 !text-xs"
          />
        </div>

        {/* Burger mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Panneau mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="border-t border-white/10 bg-base/95 backdrop-blur-xl md:hidden"
          >
            <nav
              aria-label="Navigation mobile"
              className="mx-auto flex max-w-container flex-col gap-1 px-5 py-6 sm:px-8"
            >
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-xl px-4 py-3 font-display text-lg font-medium transition-colors ${
                      active ? "bg-white/5 text-white" : "text-silver hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <WhatsAppButton variant="ghost" className="mt-3 w-full" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
