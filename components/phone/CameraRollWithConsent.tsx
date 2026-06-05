"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useConsent } from "@/components/providers/ConsentProvider";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Sparkles } from "lucide-react";

export function CameraRollWithConsent({ highlightId }: { highlightId?: string }) {
  const { photos, sharedCount, totalPhotos, hiddenCount, togglePhoto, isPhotoShared } =
    useConsent();

  useEffect(() => {
    if (!highlightId) return;
    const el = document.getElementById(highlightId);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightId]);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="merak-label mb-1">Camera roll</p>
          <p className="text-[13px] text-warm-gray leading-relaxed">
            Tap to share with Merak.{" "}
            <span className="text-espresso font-medium">
              {sharedCount} of {totalPhotos}
            </span>{" "}
            visible · {hiddenCount} private
          </p>
        </div>
        <div className="shrink-0 px-2.5 py-1 rounded-full bg-olive/15 text-[11px] font-semibold text-olive">
          opt-in
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {photos.map((photo) => {
          const shared = isPhotoShared(photo.id);
          const highlighted = highlightId === photo.id;
          return (
            <button
              key={photo.id}
              type="button"
              id={photo.id}
              onClick={() => togglePhoto(photo.id)}
              className={cn(
                "relative aspect-square rounded-lg overflow-hidden text-left transition-all scroll-mt-24",
                shared ? "film-photo ring-0" : "opacity-45 grayscale",
                highlighted && "ring-2 ring-rose-muted ring-offset-2",
                !shared && "hover:opacity-70"
              )}
              aria-pressed={shared}
              aria-label={`${shared ? "Stop sharing" : "Share"} ${photo.caption ?? "photo"}`}
            >
              <Image
                src={photo.imageUrl}
                alt={photo.caption ?? "photo"}
                fill
                className="object-cover"
                sizes="120px"
              />
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/70 to-transparent",
                  shared ? "opacity-100" : "opacity-90"
                )}
              >
                <p className="text-[9px] text-cream truncate font-medium">
                  {photo.caption ?? photo.location}
                </p>
              </div>
              <span
                className={cn(
                  "absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-sm",
                  shared
                    ? "bg-olive text-cream"
                    : "bg-black/50 text-cream/90"
                )}
              >
                {shared ? (
                  <Eye className="w-3 h-3" strokeWidth={2} />
                ) : (
                  <EyeOff className="w-3 h-3" strokeWidth={2} />
                )}
              </span>
              {!shared &&
                ["photo-festival", "photo-ycombinator", "photo-pi-phi-mirror"].includes(
                  photo.id
                ) && (
                  <span className="absolute top-1 left-1 px-1 py-0.5 rounded bg-soft-gold/90 text-[8px] font-bold text-espresso">
                    tap me
                  </span>
                )}
            </button>
          );
        })}
      </div>

      <div className="merak-card-flat p-3 flex gap-2 items-start">
        <Sparkles className="w-4 h-4 text-soft-gold shrink-0 mt-0.5" strokeWidth={1.75} />
        <p className="text-[12px] text-warm-gray leading-relaxed">
          <span className="font-semibold text-espresso">Try the demo:</span> turn on{" "}
          <span className="italic">festival</span>, <span className="italic">YC</span>, or{" "}
          <span className="italic">Pi Phi mirror</span> — then{" "}
          <span className="font-medium">Update memory</span>. Letter and capsule rebuild from only
          what you shared.
        </p>
      </div>
    </div>
  );
}
