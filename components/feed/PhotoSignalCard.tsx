import Image from "next/image";
import type { PhotoSignal } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { formatSignalDate, formatSignalTime } from "@/lib/utils";

export function PhotoSignalCard({ signal }: { signal: PhotoSignal }) {
  return (
    <article className="merak-card overflow-hidden p-0">
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={signal.imageUrl}
          alt={signal.title}
          fill
          className="object-cover"
          sizes="(max-width: 390px) 100vw"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="merak-label">Photo</span>
          <span className="text-[11px] text-warm-gray-light">
            {formatSignalDate(signal.timestamp)} · {formatSignalTime(signal.timestamp)}
          </span>
        </div>
        <h3 className="font-semibold text-[15px] text-espresso">{signal.title}</h3>
        {signal.caption && (
          <p className="text-[13px] text-warm-gray mt-1 italic">{signal.caption}</p>
        )}
        {signal.userNote && (
          <p className="text-[13px] text-espresso-soft mt-3 pl-3 border-l-2 border-rose-muted/40 leading-relaxed">
            {signal.userNote.startsWith("Merak saw")
              ? signal.userNote
              : `You wrote: ${signal.userNote}`}
          </p>
        )}
        {signal.location && (
          <p className="text-[12px] text-warm-gray mt-2">{signal.location}</p>
        )}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {signal.emotionalTags.map((tag) => (
            <Badge key={tag} variant="gold">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
