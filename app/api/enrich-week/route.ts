import { NextResponse } from "next/server";
import { enrichPhotosWithVision } from "@/lib/vision/enrichSignals";
import { parsePhoneDataToSignals } from "@/lib/parsePhoneData";
import { mergeVisionIntoSignals } from "@/lib/vision/enrichSignals";
import { detectPatterns } from "@/lib/patterns";

export const maxDuration = 60;

export async function GET() {
  try {
    const enriched = await enrichPhotosWithVision();
    const signals = mergeVisionIntoSignals(
      parsePhoneDataToSignals(),
      enriched
    );
    const patterns = detectPatterns(signals);

    const photoInsights = Array.from(enriched.values()).map((p) => ({
      id: p.phoneSourceId,
      caption: p.visionCaption,
      tags: p.emotionalTags,
      source: p.visionSource,
    }));

    return NextResponse.json({
      signalCount: signals.length,
      patternCount: patterns.length,
      patterns: patterns.slice(0, 5),
      photoInsights,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Enrichment failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
