import { NextResponse } from "next/server";
import { fetchPexelsCameraRoll } from "@/lib/pexelsFeed";

export async function GET() {
  const photos = await fetchPexelsCameraRoll(2);
  return NextResponse.json({
    source: process.env.PEXELS_API_KEY ? "pexels" : "fallback",
    photos,
  });
}
