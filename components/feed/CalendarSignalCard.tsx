import type { CalendarSignal } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { formatSignalDate, formatSignalTime } from "@/lib/utils";

export function CalendarSignalCard({ signal }: { signal: CalendarSignal }) {
  return (
    <Card>
      <div className="flex justify-between text-xs text-warm-gray mb-2">
        <span>Calendar moment</span>
        <span>
          {formatSignalDate(signal.timestamp)} ·{" "}
          {formatSignalTime(signal.timestamp)}
        </span>
      </div>
      <span className="text-2xl">📅</span>
      <h3 className="font-medium text-espresso mt-2">{signal.eventTitle}</h3>
      {signal.people && (
        <p className="text-sm text-warm-gray mt-1">
          With {signal.people.join(", ")}
        </p>
      )}
      {signal.location && (
        <p className="text-xs text-warm-gray mt-1">📍 {signal.location}</p>
      )}
    </Card>
  );
}
