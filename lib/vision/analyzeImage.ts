import visionCache from "@/lib/visionCache.json";
import { tagsFromCaption, merakSummaryFromCaption } from "./tagFromCaption";

export interface VisionResult {
  caption: string;
  tags: string[];
  summary: string;
  source: "live" | "cache";
  model?: string;
}

type CacheEntry = { caption: string; tags: string[]; analyzedAt: string };

const cache = visionCache as Record<string, CacheEntry>;

export function getCachedVision(photoId: string): VisionResult | null {
  const entry = cache[photoId];
  if (!entry) return null;
  return {
    caption: entry.caption,
    tags: entry.tags,
    summary: merakSummaryFromCaption(entry.caption),
    source: "cache",
    model: "Salesforce/blip-image-captioning-base (cached)",
  };
}

/** Live BLIP via Hugging Face Inference API */
export async function analyzeImageLive(
  imageUrl: string,
  photoId?: string
): Promise<VisionResult> {
  if (process.env.MERAK_VISION_MODE === "cache" && photoId) {
    const cached = getCachedVision(photoId);
    if (cached) return cached;
  }

  const token = process.env.HF_TOKEN;
  if (!token) {
    if (photoId) {
      const cached = getCachedVision(photoId);
      if (cached) return cached;
    }
    throw new Error("HF_TOKEN not set — using cache only");
  }

  const model =
    process.env.HF_VISION_MODEL ?? "Salesforce/blip-image-captioning-base";

  const imageRes = await fetch(imageUrl);
  if (!imageRes.ok) throw new Error(`Failed to fetch image: ${imageRes.status}`);
  const imageBytes = await imageRes.arrayBuffer();

  const res = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/octet-stream",
      },
      body: imageBytes,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    if (photoId) {
      const cached = getCachedVision(photoId);
      if (cached) return { ...cached, source: "cache" };
    }
    throw new Error(`HF inference failed: ${res.status} ${err}`);
  }

  const data = (await res.json()) as
    | { generated_text?: string }[]
    | { generated_text?: string };

  const caption = Array.isArray(data)
    ? data[0]?.generated_text ?? ""
    : (data as { generated_text?: string }).generated_text ?? "";

  const tags = tagsFromCaption(caption);

  return {
    caption,
    tags,
    summary: merakSummaryFromCaption(caption),
    source: "live",
    model,
  };
}

export async function analyzeImage(
  imageUrl: string,
  photoId?: string
): Promise<VisionResult> {
  try {
    return await analyzeImageLive(imageUrl, photoId);
  } catch {
    if (photoId) {
      const cached = getCachedVision(photoId);
      if (cached) return cached;
    }
    return {
      caption: "a quiet moment saved from your week",
      tags: ["nostalgic"],
      summary: "Merak noticed a quiet moment in this photo.",
      source: "cache",
    };
  }
}
