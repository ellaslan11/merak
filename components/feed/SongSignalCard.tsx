import type { SongSignal } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { formatSignalDate, formatSignalTime } from "@/lib/utils";

export function SongSignalCard({ signal }: { signal: SongSignal }) {
  return (
    <Card className="bg-faded-blue/5">
      <div className="flex justify-between text-xs text-warm-gray mb-2">
        <span>Song you added</span>
        <span>
          {formatSignalDate(signal.timestamp)} ·{" "}
          {formatSignalTime(signal.timestamp)}
        </span>
      </div>
      <span className="text-2xl">🎵</span>
      <h3 className="font-medium text-espresso mt-2">
        {signal.songTitle}
      </h3>
      <p className="text-sm text-warm-gray">{signal.artist}</p>
      {signal.context && (
        <p className="text-xs text-warm-gray mt-2 italic">{signal.context}</p>
      )}
      {signal.repeatCountThisWeek && signal.repeatCountThisWeek > 1 && (
        <p className="text-xs text-faded-blue mt-2">
          Played {signal.repeatCountThisWeek}x this week
        </p>
      )}
    </Card>
  );
}
