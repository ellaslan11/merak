import { NextResponse } from "next/server";
import { analyzeImage } from "@/lib/vision/analyzeImage";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { imageUrl: string; photoId?: string };
    if (!body.imageUrl) {
      return NextResponse.json({ error: "imageUrl required" }, { status: 400 });
    }

    const result = await analyzeImage(body.imageUrl, body.photoId);
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
