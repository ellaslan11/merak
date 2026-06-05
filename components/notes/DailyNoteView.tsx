"use client";

import type { DailyNote } from "@/lib/types";
import { TypingText } from "@/components/ui/TypingText";
import { ProvenanceSources } from "@/components/notes/ProvenanceSources";
import { resolveProvenance } from "@/lib/provenance";

export function DailyNoteView({ note }: { note: DailyNote }) {
  const provenance = resolveProvenance(note.relatedSignalIds);

  return (
    <article className="animate-fade-in pb-6">
      <p className="merak-label mb-2">
        {new Date(note.date).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>
      <h1 className="heading-display text-[28px] mb-6">{note.title}</h1>
      <TypingText
        text={note.body}
        className="text-[17px] text-espresso-soft leading-[1.7] font-serif"
      />
      <ProvenanceSources items={provenance} />
    </article>
  );
}
