"use client";

import { useEffect, useState } from "react";
import type { WeeklyLetter } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { ProvenanceSources } from "@/components/notes/ProvenanceSources";
import { resolveProvenance } from "@/lib/provenance";

export function WeeklyLetterView({
  letter: initialLetter,
  fetchEnhanced = false,
}: {
  letter: WeeklyLetter;
  fetchEnhanced?: boolean;
}) {
  const [revealed, setRevealed] = useState(false);
  const [letter, setLetter] = useState(initialLetter);
  const [loading, setLoading] = useState(fetchEnhanced);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!fetchEnhanced) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/generate-letter");
        if (!res.ok) return;
        const data = (await res.json()) as { letter: WeeklyLetter };
        if (!cancelled) setLetter(data.letter);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fetchEnhanced]);

  const provenance = resolveProvenance(letter.relatedSignalIds);

  return (
    <article
      className={`pb-8 transition-all duration-700 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <p className="merak-label mb-1">{letter.weekTitle}</p>
      <h1 className="heading-display text-[30px] mb-4">{letter.title}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {letter.generationMode === "openai" && (
          <Badge variant="gold">AI letter · grounded in your sources</Badge>
        )}
        {letter.generationMode === "template" && (
          <Badge variant="default">Template · from parsed signals</Badge>
        )}
        {loading && (
          <Badge variant="default">Refining letter…</Badge>
        )}
      </div>

      <div className="space-y-5">
        {letter.body.split("\n\n").map((para, i) => (
          <p
            key={i}
            className="text-[17px] text-espresso-soft leading-[1.75] font-serif"
          >
            {para}
          </p>
        ))}
      </div>
      <div className="merak-divider" />
      <div className="flex flex-wrap gap-2">
        {letter.themes.map((theme) => (
          <Badge key={theme} variant="gold">
            {theme}
          </Badge>
        ))}
      </div>

      <ProvenanceSources
        items={provenance}
        title="Every line ties back to sources you shared"
      />
    </article>
  );
}
