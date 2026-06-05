import type { PlaceSignal } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { formatSignalDate, formatSignalTime } from "@/lib/utils";

export function PlaceSignalCard({ signal }: { signal: PlaceSignal }) {
  return (
    <Card className="border-l-2 border-l-olive/40">
      <div className="flex justify-between text-xs text-warm-gray mb-2">
        <span>Place check-in</span>
        <span>
          {formatSignalDate(signal.timestamp)} ·{" "}
          {formatSignalTime(signal.timestamp)}
        </span>
      </div>
      <span className="text-2xl">📍</span>
      <h3 className="font-medium text-espresso mt-2">{signal.placeName}</h3>
      {signal.durationMinutes && (
        <p className="text-sm text-warm-gray mt-1">
          {signal.durationMinutes} minutes
        </p>
      )}
      {signal.userSaved && (
        <p className="text-xs text-olive mt-2">You saved this place</p>
      )}
    </Card>
  );
}
