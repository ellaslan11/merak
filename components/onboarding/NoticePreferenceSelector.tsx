"use client";

import type { NoticePreference } from "@/lib/types";
import { cn } from "@/lib/utils";

const OPTIONS: NoticePreference[] = [
  "tiny joys",
  "friendships",
  "places",
  "routines",
  "solo moments",
  "songs",
  "trips",
  "soft eras",
];

export function NoticePreferenceSelector({
  selected,
  onChange,
}: {
  selected: NoticePreference[];
  onChange: (prefs: NoticePreference[]) => void;
}) {
  const toggle = (pref: NoticePreference) => {
    if (selected.includes(pref)) {
      onChange(selected.filter((p) => p !== pref));
    } else {
      onChange([...selected, pref]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={cn(
              "merak-input-chip",
              active
                ? "bg-espresso text-cream border-espresso shadow-merak-sm"
                : "bg-surface text-espresso-soft border-[var(--border)] hover:border-espresso/20"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
