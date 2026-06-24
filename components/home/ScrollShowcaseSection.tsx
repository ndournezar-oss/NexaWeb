"use client";

import dynamic from "next/dynamic";

/**
 * Frontière client pour charger ScrollShowcase en `ssr: false` (perf : la
 * logique scroll/3D framer-motion n'a aucun intérêt côté serveur). Le wrapper
 * existe parce que `ssr: false` est interdit dans un Server Component, et
 * HomeExperience en est un. Fallback navy pleine hauteur → pas de saut de mise
 * en page pendant le chargement.
 */
const ScrollShowcase = dynamic(
  () => import("@/components/home/ScrollShowcase").then((m) => ({ default: m.ScrollShowcase })),
  {
    ssr: false,
    loading: () => <div aria-hidden="true" className="h-[50rem] bg-[#070B18] md:h-[80rem]" />,
  }
);

export function ScrollShowcaseSection() {
  return <ScrollShowcase />;
}
