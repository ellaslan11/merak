import { NextResponse } from "next/server";
import { parseAndReflect } from "@/lib/parsePhoneData";
import { generateWeeklyLetterOpenAI } from "@/lib/generateLetterOpenAI";

export const maxDuration = 30;

export async function GET() {
  try {
    const parsed = parseAndReflect();
    const letter = await generateWeeklyLetterOpenAI(
      parsed.signals,
      parsed.weeklyLetter
    );

    return NextResponse.json({
      letter,
      hasOpenAI: !!process.env.OPENAI_API_KEY,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Letter generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
