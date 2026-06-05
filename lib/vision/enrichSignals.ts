import type { MemorySignal, PhotoSignal } from "@/lib/types";
import { analyzeImage } from "./analyzeImage";
import { getConsentAwarePhotos } from "@/lib/consentAwareData";

export interface EnrichedPhoto extends PhotoSignal {
  visionCaption?: string;
  visionSource?: "live" | "cache";
}

/** Run vision on all shared phone photos (sequential for rate limits) */
export async function enrichPhotosWithVision(
  onProgress?: (done: number, total: number, caption: string) => void
): Promise<Map<string, EnrichedPhoto>> {
  const shared = getConsentAwarePhotos().filter((p) => p.merakShared);
  const map = new Map<string, EnrichedPhoto>();

  for (let i = 0; i < shared.length; i++) {
    const photo = shared[i];
    const vision = await analyzeImage(photo.imageUrl, photo.id);
    onProgress?.(i + 1, shared.length, vision.caption);

    map.set(photo.id, {
      id: `sig-photo-${photo.id}`,
      type: "photo",
      timestamp: photo.timestamp,
      source: vision.source === "live" ? "photo · analyzed live" : "photo · analyzed",
      title: capitalizeFirst(vision.caption),
      summary: vision.summary,
      emotionalTags: [
        ...new Set([...vision.tags, ...(photo.emotionalHint ? [photo.emotionalHint] : [])]),
      ],
      privacyLevel: "private",
      imageUrl: photo.imageUrl,
      caption: photo.caption,
      location: photo.location,
      people: photo.people,
      userNote:
        photo.emotionalHint === "peaceful"
          ? `Marked as peaceful. Merak saw: "${vision.caption}"`
          : `Merak saw: "${vision.caption}"`,
      phoneSourceId: photo.id,
      visionCaption: vision.caption,
      visionSource: vision.source,
    });
  }

  return map;
}

export function mergeVisionIntoSignals(
  signals: MemorySignal[],
  enriched: Map<string, EnrichedPhoto>
): MemorySignal[] {
  return signals.map((s) => {
    if (s.type !== "photo" || !s.phoneSourceId) return s;
    const e = enriched.get(s.phoneSourceId);
    return e ?? s;
  });
}

function capitalizeFirst(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
