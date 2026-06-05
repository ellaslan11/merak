import type { RoutineSignal } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { formatSignalDate } from "@/lib/utils";

export function RoutineSignalCard({ signal }: { signal: RoutineSignal }) {
  return (
    <Card className="border-l-2 border-l-soft-gold">
      <div className="flex justify-between text-xs text-warm-gray mb-2">
        <span>Pattern detected</span>
        <span>{formatSignalDate(signal.timestamp)}</span>
      </div>
      <span className="text-2xl">🌿</span>
      <h3 className="font-medium text-espresso mt-2">{signal.routineName}</h3>
      <p className="text-sm text-warm-gray mt-1">{signal.frequency}</p>
      {signal.suggestion && (
        <p className="text-sm text-olive mt-3">{signal.suggestion}</p>
      )}
    </Card>
  );
}
