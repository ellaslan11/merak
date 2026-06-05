"use client";

import { useEffect } from "react";
import Image from "next/image";
import { phonePhotos } from "@/lib/phoneData";
import { cn } from "@/lib/utils";

export function PhonePhotosGrid({ highlightId }: { highlightId?: string }) {
  const shared = phonePhotos.filter((p) => p.merakShared);

  useEffect(() => {
    if (!highlightId) return;
    const el = document.getElementById(highlightId);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightId]);

  return (
    <div>
      <p className="text-xs text-warm-gray mb-3">
        Camera roll · {shared.length} photos shared with Merak
      </p>
      <div className="grid grid-cols-3 gap-1">
        {shared.map((photo) => (
          <div
            key={photo.id}
            id={photo.id}
            className={cn(
              "relative aspect-square rounded-md overflow-hidden film-photo scroll-mt-24",
              highlightId === photo.id && "ring-2 ring-rose-muted ring-offset-2"
            )}
          >
            <Image
              src={photo.imageUrl}
              alt={photo.caption ?? "photo"}
              fill
              className="object-cover"
              sizes="120px"
            />
            {photo.emotionalHint && (
              <span className="absolute bottom-0.5 right-0.5 text-[8px] bg-black/50 text-cream px-1 rounded">
                {photo.emotionalHint}
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="text-[10px] text-center text-olive mt-3">
        Merak only sees photos you saved for sharing
      </p>
    </div>
  );
}
