"use client";

import type { SignalPermission } from "@/lib/types";
import { cn } from "@/lib/utils";

const LABELS: Record<SignalPermission, string> = {
  photos: "Photos I save",
  texts: "Texts I mark to share",
  calendar: "Calendar moments",
  places: "Place check-ins",
  songs: "Songs I add",
  reflections: "Tiny reflections",
  friend_memories: "Friend memories",
};

export function SignalToggle({
  permissions,
  onChange,
}: {
  permissions: Record<SignalPermission, boolean>;
  onChange: (p: Record<SignalPermission, boolean>) => void;
}) {
  return (
    <div className="space-y-2">
      {(Object.keys(LABELS) as SignalPermission[]).map((key) => (
        <button
          key={key}
          type="button"
          onClick={() =>
            onChange({ ...permissions, [key]: !permissions[key] })
          }
          className="w-full flex items-center justify-between p-4 rounded-xl bg-white/60 border border-espresso/5"
        >
          <span className="text-sm text-espresso">{LABELS[key]}</span>
          <span
            className={cn(
              "w-10 h-6 rounded-full transition-colors relative",
              permissions[key] ? "bg-olive" : "bg-espresso/10"
            )}
          >
            <span
              className={cn(
                "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all",
                permissions[key] ? "left-5" : "left-1"
              )}
            />
          </span>
        </button>
      ))}
    </div>
  );
}
