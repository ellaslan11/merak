import Link from "next/link";
import type { MemorySignal } from "@/lib/types";
import { formatSignalDate } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export function MemoryFeedPreview({ signals }: { signals: MemorySignal[] }) {
  const recent = [...signals]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 4);

  return (
    <div className="merak-card-flat divide-y divide-[var(--border)] p-0 overflow-hidden">
      {recent.map((s) => (
        <div
          key={s.id}
          className="flex items-center gap-3 px-4 py-3.5"
        >
          <div className="w-2 h-2 rounded-full bg-soft-gold shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-medium text-espresso truncate">
              {s.title}
            </p>
            <p className="text-[12px] text-warm-gray">
              {formatSignalDate(s.timestamp)}
            </p>
          </div>
        </div>
      ))}
      <Link
        href="/feed"
        className="flex items-center justify-center gap-1 py-3.5 text-[13px] font-semibold text-espresso-soft hover:text-espresso bg-cream-deep/50 transition-colors"
      >
        View all moments
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
