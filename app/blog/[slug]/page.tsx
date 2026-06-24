import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { articleJsonLd, pageMetadata } from "@/lib/seo";
import { btn } from "@/lib/ui";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    fullTitle: `${post.title} | Blog NaxioWeb`,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: [post.keyword],
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <article className="relative overflow-hidden bg-base py-32 sm:py-40">
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          slug: post.slug,
          date: post.date,
        })}
      />
      <div className="pointer-events-none absolute -top-24 right-0 h-[36rem] w-[36rem] rounded-full bg-brand/15 blur-[130px]" />

      <div className="relative mx-auto max-w-[720px] px-5 sm:px-8">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-silver transition-colors hover:text-brand-light"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Retour au blog
          </Link>

          <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-light">
            {post.keyword}
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-muted">
            <span>{formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              {post.readingTime}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <ArticleBody content={post.content} />
        </Reveal>

        {/* CTA fin d'article */}
        <Reveal delay={0.1} className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface to-base p-8 text-center sm:p-10">
            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[28rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[90px]" />
            <h2 className="relative font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Un projet en tête ?
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-silver">
              Testez notre assistant IA en direct, ou discutons simplement de votre projet — le premier échange est
              gratuit.
            </p>
            <div className="relative mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link href="/assistants-ia" className={btn.primary}>
                Tester notre IA
                <ArrowRight className="size-[1.1em]" aria-hidden="true" />
              </Link>
              <WhatsAppButton variant="secondary" />
            </div>
            <div className="relative mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
              <Link href="/agence" className="text-silver underline-offset-4 hover:text-brand-light hover:underline">
                Découvrir l'agence
              </Link>
              <Link href="/contact" className="text-silver underline-offset-4 hover:text-brand-light hover:underline">
                Page contact
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Articles liés */}
        {related.length > 0 && (
          <Reveal delay={0.15} className="mt-14">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-muted">À lire aussi</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group rounded-2xl border border-white/10 bg-surface/60 p-5 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand-light/40"
                >
                  <h3 className="font-display text-base font-semibold leading-snug text-white transition-colors group-hover:text-brand-light">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </article>
  );
}
