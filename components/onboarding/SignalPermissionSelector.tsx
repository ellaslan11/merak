"use client";

import type { SignalPermission } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const OPTIONS: { key: SignalPermission; label: string; desc: string }[] = [
  { key: "photos", label: "Photos I save", desc: "Moments you choose to keep" },
  {
    key: "texts",
    label: "Texts I mark",
    desc: "Specific threads only",
  },
  { key: "calendar", label: "Calendar", desc: "Events you share" },
  { key: "places", label: "Places", desc: "Manual check-ins" },
  { key: "songs", label: "Songs", desc: "Your soundtrack" },
  { key: "reflections", label: "Reflections", desc: "Words you write" },
  {
    key: "friend_memories",
    label: "Friend memories",
    desc: "Stories about people",
  },
];

export function SignalPermissionSelector({
  permissions,
  onChange,
}: {
  permissions: Record<SignalPermission, boolean>;
  onChange: (p: Record<SignalPermission, boolean>) => void;
}) {
  return (
    <div className="space-y-2">
      {OPTIONS.map((opt) => {
        const on = permissions[opt.key];
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() =>
              onChange({ ...permissions, [opt.key]: !permissions[opt.key] })
            }
            className={cn(
              "w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3",
              on
                ? "bg-surface border-espresso/15 shadow-merak-sm"
                : "bg-cream-deep/50 border-transparent opacity-80"
            )}
          >
            <span
              className={cn(
                "shrink-0 w-5 h-5 rounded-md flex items-center justify-center mt-0.5 transition-colors",
                on ? "bg-espresso text-cream" : "border border-espresso/20"
              )}
            >
              {on && <Check className="w-3 h-3" strokeWidth={3} />}
            </span>
            <div>
              <span className="font-semibold text-[14px] text-espresso block">
                {opt.label}
              </span>
              <span className="text-[12px] text-warm-gray">{opt.desc}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
