import Image from "next/image";
import type { MemorySignal } from "@/lib/types";
import { formatSignalTime, cn } from "@/lib/utils";
import {
  Camera,
  MapPin,
  Music,
  MessageCircle,
  PenLine,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  photo: Camera,
  place_visit: MapPin,
  song_played: Music,
  text_message: MessageCircle,
  reflection: PenLine,
};

export function TodayCapturedMoments({ signals }: { signals: MemorySignal[] }) {
  if (signals.length === 0) {
    return (
      <p className="text-[13px] text-warm-gray py-4 text-center">
        No moments captured yet today.
      </p>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 phone-scroll">
      {signals.slice(0, 6).map((signal) => {
        const Icon = iconMap[signal.type] ?? Camera;
        return (
          <div
            key={signal.id}
            className="shrink-0 w-[100px] merak-card-flat p-0 overflow-hidden"
          >
            {signal.type === "photo" ? (
              <div className="relative w-full h-[72px] film-photo rounded-t-2xl rounded-b-none">
                <Image
                  src={signal.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </div>
            ) : (
              <div
                className={cn(
                  "w-full h-[72px] flex items-center justify-center rounded-t-2xl",
                  signal.type === "song_played" && "bg-faded-blue/10",
                  signal.type === "place_visit" && "bg-olive-soft",
                  signal.type === "text_message" && "bg-rose-soft",
                  signal.type === "reflection" && "bg-gold-soft",
                  !["song_played", "place_visit", "text_message", "reflection"].includes(
                    signal.type
                  ) && "bg-cream-deep"
                )}
              >
                <Icon className="w-6 h-6 text-warm-gray" strokeWidth={1.75} />
              </div>
            )}
            <div className="p-2.5">
              <p className="text-[11px] font-medium text-espresso line-clamp-2 leading-snug">
                {signal.title}
              </p>
              <p className="text-[10px] text-warm-gray-light mt-1">
                {formatSignalTime(signal.timestamp)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
