"use client";

import Link from "next/link";
import { useConsent } from "@/components/providers/ConsentProvider";
import { Button } from "@/components/ui/Button";
import { RefreshCw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SyncMerakBar() {
  const { pendingSync, syncMemory, sharedCount, totalPhotos } = useConsent();

  return (
    <div
      className={cn(
        "sticky bottom-0 z-10 -mx-1 px-1 pt-2 pb-1 bg-gradient-to-t from-cream via-cream to-transparent",
        pendingSync && "animate-fade-in"
      )}
    >
      <div
        className={cn(
          "merak-card p-4 flex flex-col gap-3 border-2 transition-colors",
          pendingSync ? "border-soft-gold/50 shadow-merak" : "border-[var(--border)]"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-[13px] text-espresso font-medium">
            {pendingSync
              ? "Consent changed — memory is out of date"
              : `${sharedCount}/${totalPhotos} photos in pipeline`}
          </p>
          {pendingSync && (
            <span className="text-[10px] font-bold uppercase tracking-wide text-soft-gold">
              pending
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            className="flex-1 gap-2"
            onClick={syncMemory}
            disabled={!pendingSync}
          >
            <RefreshCw className="w-4 h-4" strokeWidth={2} />
            Update memory
          </Button>
          <Link
            href="/home"
            onClick={() => pendingSync && syncMemory()}
            className="flex items-center justify-center gap-1 px-4 rounded-2xl bg-cream-deep border border-[var(--border)] text-[13px] font-semibold text-espresso hover:bg-surface transition-colors"
          >
            Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
