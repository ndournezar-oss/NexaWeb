/**
 * Injecte un bloc JSON-LD schema.org. Le contenu est sérialisé et placé tel
 * quel — il provient exclusivement de nos propres données (lib/seo), jamais
 * d'une saisie utilisateur.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
