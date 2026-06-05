"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PexelsItem {
  id: number;
  url: string;
  alt: string;
  photographer: string;
}

export function PexelsLiveRoll() {
  const [photos, setPhotos] = useState<PexelsItem[]>([]);
  const [source, setSource] = useState<string>("");

  useEffect(() => {
    fetch("/api/live-feed")
      .then((r) => r.json())
      .then((data) => {
        setPhotos(data.photos ?? []);
        setSource(data.source ?? "");
      })
      .catch(() => {});
  }, []);

  if (photos.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-xs text-warm-gray mb-2">
        Live camera roll · {source === "pexels" ? "Pexels" : "curated"}
      </p>
      <div className="flex gap-2 overflow-x-auto phone-scroll pb-1">
        {photos.map((p) => (
          <div
            key={p.id}
            className="relative shrink-0 w-20 h-28 rounded-lg overflow-hidden film-photo"
          >
            <Image
              src={p.url}
              alt={p.alt}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
