"use client";

import { useEffect, useState } from "react";
import { getParsingSteps } from "@/lib/parsePhoneData";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function ParsingProgress({
  onComplete,
  autoStart = true,
  steps: stepsProp,
}: {
  onComplete?: () => void;
  autoStart?: boolean;
  steps?: ReturnType<typeof getParsingSteps>;
}) {
  const steps = stepsProp ?? getParsingSteps();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!autoStart) return;
    setActiveIndex(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= steps.length) {
        setDone(true);
        clearInterval(interval);
        onComplete?.();
      } else {
        setActiveIndex(i);
      }
    }, 650);
    return () => clearInterval(interval);
  }, [autoStart, onComplete, steps.length]);

  if (done) return null;

  return (
    <div className="merak-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Loader2 className="w-4 h-4 text-soft-gold animate-spin" strokeWidth={2} />
        <span className="merak-label-accent">Reading your phone</span>
      </div>
      <p className="text-[13px] text-warm-gray mb-4 leading-relaxed">
        Only what you marked as shareable — never your full inbox.
      </p>
      <ul className="space-y-2.5">
        {steps.map((step, i) => (
          <li
            key={step.id}
            className={cn(
              "flex items-center gap-3 text-[13px] transition-opacity duration-300",
              i <= activeIndex ? "opacity-100" : "opacity-35"
            )}
          >
            <span
              className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                i < activeIndex
                  ? "bg-olive text-cream"
                  : i === activeIndex
                    ? "bg-espresso text-cream"
                    : "bg-espresso/10 text-transparent"
              )}
            >
              {i < activeIndex ? "✓" : ""}
            </span>
            <span className="flex-1 text-espresso font-medium">{step.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
