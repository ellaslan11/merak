import type { PatternObservation } from "@/lib/types";
import { Sparkles } from "lucide-react";

export function MerakNoticedSection({
  patterns,
}: {
  patterns: PatternObservation[];
}) {
  const top = patterns.slice(0, 3);
  if (top.length === 0) return null;

  return (
    <div className="merak-card overflow-hidden p-0">
      <div className="px-5 py-3 border-b border-[var(--border)] flex items-center gap-2 bg-gold-soft/30">
        <Sparkles className="w-4 h-4 text-soft-gold" strokeWidth={2} />
        <span className="merak-label-accent">Merak noticed</span>
      </div>
      <ul className="divide-y divide-[var(--border)]">
        {top.map((pattern) => (
          <li key={pattern.id} className="px-5 py-4">
            <h3 className="font-semibold text-[14px] text-espresso leading-snug mb-1.5">
              {pattern.title}
            </h3>
            <p className="text-[13px] text-warm-gray leading-relaxed">
              {pattern.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
