import type { TextMessageSignal } from "@/lib/types";
import { formatSignalDate, formatSignalTime } from "@/lib/utils";

export function TextMessageCard({ signal }: { signal: TextMessageSignal }) {
  const isOutgoing = signal.direction === "outgoing";

  return (
    <article className="merak-card p-5">
      <div className="flex justify-between mb-3">
        <span className="merak-label">Text you shared</span>
        <span className="text-[11px] text-warm-gray-light">
          {formatSignalDate(signal.timestamp)} · {formatSignalTime(signal.timestamp)}
        </span>
      </div>
      <p className="text-[12px] text-warm-gray mb-3">With {signal.contactName}</p>
      <div
        className={`max-w-[88%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
          isOutgoing
            ? "ml-auto bg-espresso text-cream rounded-br-md"
            : "bg-cream-deep text-espresso rounded-bl-md"
        }`}
      >
        {signal.messageBody}
      </div>
    </article>
  );
}
