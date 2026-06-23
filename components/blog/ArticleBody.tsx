import type { ContentBlock } from "@/lib/blog";

/**
 * Rendu sémantique des blocs d'article — h2/h3 réels (pas de gras déguisé en
 * titre), texte en --text-secondary sur navy, line-height confortable.
 */
export function ArticleBody({ content }: { content: ContentBlock[] }) {
  return (
    <div className="space-y-6 text-lg leading-[1.7] text-silver">
      {content.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="!mt-12 font-display text-2xl font-semibold leading-snug tracking-tight text-white first:!mt-0 sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="!mt-8 font-display text-xl font-semibold text-white">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-2.5 pl-5 marker:text-brand-light">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-brand/50 pl-5 italic leading-relaxed text-white/90"
              >
                {block.text}
              </blockquote>
            );
          default:
            return <p key={i}>{block.text}</p>;
        }
      })}
    </div>
  );
}
