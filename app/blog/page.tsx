import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ZelligePattern } from "@/components/ZelligePattern";
import { pageMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  fullTitle: "Blog | Conseils sites web & IA pour entreprises marocaines — NaxioWeb",
  description:
    "Conseils, chiffres et bonnes pratiques pour les entreprises marocaines : sites web, prix, refonte, e-commerce et assistants IA. Le blog de l'agence NaxioWeb.",
  path: "/blog",
  keywords: ["blog agence web Maroc", "conseils site web Maroc", "chatbot IA Maroc"],
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogIndexPage() {
  return (
    <section className="relative overflow-hidden bg-base py-32 sm:py-40">
      <div className="pointer-events-none absolute -top-24 right-0 h-[36rem] w-[36rem] rounded-full bg-brand/15 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 text-brand-light/60">
        <ZelligePattern opacity={0.05} scale={110} className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-container px-5 sm:px-8">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-light">
            Le blog NaxioWeb
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl">
            Sites web & IA, expliqués simplement.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-silver">
            Conseils, chiffres et bonnes pratiques pour les entreprises marocaines qui veulent un site web — et une
            présence en ligne — à la hauteur de leur ambition.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/60 backdrop-blur transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand-light/40"
              >
                <div className="relative h-32 overflow-hidden bg-gradient-to-br from-brand/30 via-surface to-base">
                  <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-brand-light/25 blur-2xl" />
                  <p className="absolute bottom-3 left-5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand-light">
                    {post.keyword}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-lg font-semibold leading-snug text-white transition-colors group-hover:text-brand-light">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-silver">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted">
                    <span>{formatDate(post.date)}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {post.readingTime}
                    </span>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-medium text-brand-light">
                    Lire l'article
                    <ArrowRight
                      className="size-[1.05em] transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
