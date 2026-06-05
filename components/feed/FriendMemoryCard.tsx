import type { FriendMemorySignal } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { formatSignalDate, formatSignalTime } from "@/lib/utils";

export function FriendMemoryCard({ signal }: { signal: FriendMemorySignal }) {
  return (
    <Card className="bg-soft-gold/10">
      <div className="flex justify-between text-xs text-warm-gray mb-2">
        <span>Friend memory</span>
        <span>
          {formatSignalDate(signal.timestamp)} ·{" "}
          {formatSignalTime(signal.timestamp)}
        </span>
      </div>
      <span className="text-2xl">💛</span>
      <p className="text-xs text-warm-gray mt-2">
        {signal.people.join(" & ")}
      </p>
      <p className="text-sm text-espresso mt-2 leading-relaxed">
        &ldquo;{signal.memory}&rdquo;
      </p>
    </Card>
  );
}
