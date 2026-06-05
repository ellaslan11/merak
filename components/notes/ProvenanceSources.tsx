import Link from "next/link";
import { Camera, Calendar, MessageCircle, Mic, Users } from "lucide-react";
import type { ProvenanceItem } from "@/lib/provenance";

const kindIcon = {
  photo: Camera,
  text: MessageCircle,
  calendar: Calendar,
  reflection: Mic,
  friend: Users,
  other: MessageCircle,
} as const;

export function ProvenanceSources({
  items,
  title = "Sources Merak used",
}: {
  items: ProvenanceItem[];
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-8 pt-6 border-t border-[var(--border)]">
      <p className="merak-label mb-3">{title}</p>
      <ul className="space-y-2">
        {items.map((item) => {
          const Icon = kindIcon[item.kind];
          return (
            <li key={item.signalId}>
              <Link
                href={item.href}
                className="flex items-start gap-3 p-3 rounded-xl bg-cream-deep/80 border border-[var(--border)] hover:bg-surface hover:shadow-merak-sm transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-surface border border-[var(--border)] flex items-center justify-center shrink-0">
                  <Icon
                    className="w-4 h-4 text-espresso-soft"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-espresso leading-snug group-hover:text-espresso">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-warm-gray mt-0.5">{item.detail}</p>
                </div>
                <span className="text-[11px] text-rose-muted font-medium shrink-0 pt-1">
                  View →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
