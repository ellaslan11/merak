import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";

export function WeekContextBanner() {
  return (
    <Link
      href="/capsules/florence-week-3"
      className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-[var(--border)] shadow-merak-sm hover:shadow-merak transition-all group"
    >
      <div className="shrink-0 w-12 h-12 rounded-xl merak-gradient-hero flex items-center justify-center border border-[var(--border)]">
        <MapPin className="w-5 h-5 text-espresso-soft" strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="merak-label mb-0.5">Memory capsule</p>
        <p className="font-semibold text-[15px] text-espresso">
          Campus Week
        </p>
        <p className="text-[12px] text-warm-gray">Feb 17 – 23 · Campus week</p>
      </div>
      <ChevronRight className="w-5 h-5 text-warm-gray-light group-hover:text-espresso shrink-0" />
    </Link>
  );
}
