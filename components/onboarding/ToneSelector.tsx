"use client";

import type { TonePreference } from "@/lib/types";
import { cn } from "@/lib/utils";

const OPTIONS: TonePreference[] = [
  "warm",
  "cinematic",
  "playful",
  "poetic but grounded",
  "simple and sincere",
];

export function ToneSelector({
  selected,
  onChange,
}: {
  selected: TonePreference;
  onChange: (t: TonePreference) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((opt) => {
        const active = selected === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "merak-input-chip capitalize",
              active
                ? "bg-espresso text-cream border-espresso"
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
