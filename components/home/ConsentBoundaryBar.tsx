"use client";

import Link from "next/link";
import { useConsent } from "@/components/providers/ConsentProvider";
import { Shield } from "lucide-react";

export function ConsentBoundaryBar() {
  const { sharedCount, totalPhotos, hiddenCount } = useConsent();

  return (
    <Link
      href="/phone?tab=photos"
      className="flex items-center gap-3 p-3 rounded-2xl bg-olive/10 border border-olive/25 hover:bg-olive/15 transition-colors"
    >
      <Shield className="w-5 h-5 text-olive shrink-0" strokeWidth={1.75} />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-espresso">
          Consent boundary active
        </p>
        <p className="text-[12px] text-warm-gray">
          Merak sees {sharedCount} of {totalPhotos} photos · {hiddenCount} stay on your device only
        </p>
      </div>
      <span className="text-[12px] font-medium text-olive shrink-0">Edit →</span>
    </Link>
  );
}
