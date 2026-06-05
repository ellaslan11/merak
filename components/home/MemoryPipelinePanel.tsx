"use client";

import { useMemo } from "react";
import { useConsent } from "@/components/providers/ConsentProvider";
import { getParsedWeek } from "@/lib/generateMemory";
import { getSharedPhoneStats } from "@/lib/consentAwareData";
import { GitBranch, Database, Sparkles } from "lucide-react";

export function MemoryPipelinePanel() {
  const { consentVersion, sharedCount, totalPhotos } = useConsent();
  const stats = getSharedPhoneStats();

  const pipeline = useMemo(() => {
    const parsed = getParsedWeek();
    return {
      signals: parsed.signals.length,
      patterns: parsed.patterns.length,
      photoSignals: parsed.signals.filter((s) => s.type === "photo").length,
    };
  }, [consentVersion]);

  const steps = [
    {
      icon: Database,
      label: "Opt-in sources",
      value: `${stats.photos} photos · ${stats.texts} texts · ${stats.calendar} events`,
    },
    {
      icon: GitBranch,
      label: "parsePhoneData.ts",
      value: `${pipeline.signals} MemorySignals (${pipeline.photoSignals} photos)`,
    },
    {
      icon: Sparkles,
      label: "Synthesis",
      value: `${pipeline.patterns} patterns → note · letter · capsule`,
    },
  ];

  return (
    <details className="merak-card-flat group">
      <summary className="p-4 cursor-pointer list-none flex items-center justify-between gap-2">
        <span className="merak-label">Technical pipeline</span>
        <span className="text-[11px] text-warm-gray group-open:hidden">
          {sharedCount}/{totalPhotos} photos shared · tap to expand
        </span>
        <span className="text-[11px] text-olive font-medium hidden group-open:inline">
          live counts
        </span>
      </summary>
      <div className="px-4 pb-4 space-y-3 border-t border-[var(--border)]">
        {steps.map((step) => (
          <div key={step.label} className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-lg bg-cream-deep flex items-center justify-center shrink-0">
              <step.icon className="w-4 h-4 text-espresso-soft" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-espresso">{step.label}</p>
              <p className="text-[11px] text-warm-gray font-mono mt-0.5">{step.value}</p>
            </div>
          </div>
        ))}
        <p className="text-[11px] text-warm-gray-light leading-relaxed pt-1">
          Consent gate: <code className="text-[10px] bg-surface px-1 rounded">merakShared</code> per
          photo + category permissions. Parser never sees hidden items.
        </p>
      </div>
    </details>
  );
}
