"use client";

import { phoneCalendar } from "@/lib/phoneData";
import { cn } from "@/lib/utils";

export function PhoneCalendarView({ highlightId }: { highlightId?: string }) {
  const shared = phoneCalendar
    .filter((c) => c.merakShared)
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  return (
    <div className="space-y-2">
      {shared.map((event) => {
        const day = new Date(event.timestamp).toLocaleDateString("en-US", {
          weekday: "short",
        });
        const highlighted = highlightId === event.id;
        return (
          <div
            key={event.id}
            id={event.id}
            className={cn(
              "merak-card-flat p-4 flex justify-between items-start gap-3 scroll-mt-24",
              highlighted && "ring-2 ring-rose-muted/50 bg-rose-soft/30"
            )}
          >
            <div>
              <span className="text-[14px] font-medium text-espresso block">
                {event.title}
              </span>
              {event.location && (
                <span className="text-[12px] text-warm-gray">{event.location}</span>
              )}
            </div>
            <span className="text-[12px] text-warm-gray shrink-0">{day}</span>
          </div>
        );
      })}
    </div>
  );
}
