"use client";

import type { NoteFrequency } from "@/lib/types";
import { cn } from "@/lib/utils";

const OPTIONS: NoteFrequency[] = [
  "tiny daily notes",
  "weekly memory letters",
  "monthly capsules",
];

export function FrequencySelector({
  selected,
  onChange,
}: {
  selected: NoteFrequency;
  onChange: (f: NoteFrequency) => void;
}) {
  return (
    <div className="space-y-2">
      {OPTIONS.map((opt) => {
        const active = selected === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "w-full text-left px-4 py-3.5 rounded-2xl border text-[14px] font-medium transition-all",
              active
                ? "bg-espresso text-cream border-espresso shadow-merak-sm"
                : "bg-surface text-espresso-soft border-[var(--border)]"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
