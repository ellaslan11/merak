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

export function ToneSettings({
  selected,
  onChange,
}: {
  selected: TonePreference;
  onChange: (t: TonePreference) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs border capitalize",
            selected === opt
              ? "bg-espresso text-cream border-espresso"
              : "bg-white/60 text-warm-gray border-espresso/10"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
