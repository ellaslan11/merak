import { Info } from "lucide-react";

export function DemoModeBanner() {
  return (
    <div
      className="flex items-start gap-2.5 p-3 rounded-xl bg-olive/10 border border-olive/20"
      role="status"
    >
      <Info className="w-4 h-4 text-olive shrink-0 mt-0.5" strokeWidth={1.75} />
      <div className="text-[12px] leading-relaxed text-espresso-soft">
        <span className="font-semibold text-espresso">Demo mode.</span> Simulated
        phone export — but <span className="font-medium">per-photo consent is live</span>.
        Toggle photos on Phone, then Update memory to re-run the parser.
      </div>
    </div>
  );
}
