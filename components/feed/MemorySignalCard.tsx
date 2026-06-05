import type { MemorySignal } from "@/lib/types";
import { TextMessageCard } from "./TextMessageCard";
import { PhotoSignalCard } from "./PhotoSignalCard";
import { CalendarSignalCard } from "./CalendarSignalCard";
import { PlaceSignalCard } from "./PlaceSignalCard";
import { SongSignalCard } from "./SongSignalCard";
import { ReflectionSignalCard } from "./ReflectionSignalCard";
import { FriendMemoryCard } from "./FriendMemoryCard";
import { RoutineSignalCard } from "./RoutineSignalCard";
import { Card } from "@/components/ui/Card";
import { formatSignalDate, formatSignalTime } from "@/lib/utils";

export function MemorySignalCard({ signal }: { signal: MemorySignal }) {
  switch (signal.type) {
    case "photo":
      return <PhotoSignalCard signal={signal} />;
    case "text_message":
      return <TextMessageCard signal={signal} />;
    case "calendar_event":
      return <CalendarSignalCard signal={signal} />;
    case "place_visit":
      return <PlaceSignalCard signal={signal} />;
    case "song_played":
      return <SongSignalCard signal={signal} />;
    case "reflection":
      return <ReflectionSignalCard signal={signal} />;
    case "friend_memory":
      return <FriendMemoryCard signal={signal} />;
    case "routine":
      return <RoutineSignalCard signal={signal} />;
    case "reminder":
      return (
        <Card>
          <SignalMeta signal={signal} />
          <h3 className="font-medium text-espresso mt-2">{signal.reminderTitle}</h3>
          <p className="text-sm text-warm-gray mt-1">{signal.reminderBody}</p>
        </Card>
      );
    default:
      return null;
  }
}

function SignalMeta({ signal }: { signal: MemorySignal }) {
  return (
    <div className="flex items-center justify-between text-xs text-warm-gray">
      <span className="capitalize">{signal.source}</span>
      <span>
        {formatSignalDate(signal.timestamp)} · {formatSignalTime(signal.timestamp)}
      </span>
    </div>
  );
}
