import type { ReflectionSignal } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { formatSignalDate, formatSignalTime } from "@/lib/utils";

export function ReflectionSignalCard({ signal }: { signal: ReflectionSignal }) {
  return (
    <Card className="border-l-2 border-l-rose-muted/50">
      <div className="flex justify-between text-xs text-warm-gray mb-2">
        <span>Tiny reflection</span>
        <span>
          {formatSignalDate(signal.timestamp)} ·{" "}
          {formatSignalTime(signal.timestamp)}
        </span>
      </div>
      {signal.prompt && (
        <p className="text-xs text-warm-gray italic mb-2">{signal.prompt}</p>
      )}
      <p className="text-sm text-espresso leading-relaxed">
        &ldquo;{signal.answer}&rdquo;
      </p>
    </Card>
  );
}
