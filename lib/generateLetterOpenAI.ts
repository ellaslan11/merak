import type { WeeklyLetter } from "./types";
import { GENERATION_RULES } from "./prompts";
import { formatSignalsForPrompt } from "./formatSignalsForPrompt";
import type { MemorySignal } from "./types";
import { WEEK_TITLE } from "./mockSignals";

export async function generateWeeklyLetterOpenAI(
  signals: MemorySignal[],
  fallback: WeeklyLetter
): Promise<WeeklyLetter & { generationMode: "openai" | "template" }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { ...fallback, generationMode: "template" };
  }

  const digest = formatSignalsForPrompt(signals);

  const system = `You write warm, consent-first memory letters for Merak.
${GENERATION_RULES}
Write 2-3 short paragraphs (under 220 words). Tone: cinematic but grounded, college-age audience.
Only reference events present in the signal list. End with a gentle forward-looking line.`;

  const user = `Week: ${WEEK_TITLE}
Persona: Ella, college student.

Signals Merak parsed from what she explicitly shared:
${digest}

Return JSON only:
{"title":"string","body":"string with \\n\\n between paragraphs","themes":["string",...]}`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        temperature: 0.7,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (!res.ok) {
      console.error("OpenAI letter error", await res.text());
      return { ...fallback, generationMode: "template" };
    }

    const data = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    const raw = data.choices[0]?.message?.content;
    if (!raw) return { ...fallback, generationMode: "template" };

    const parsed = JSON.parse(raw) as {
      title: string;
      body: string;
      themes: string[];
    };

    return {
      id: "letter-openai",
      weekTitle: WEEK_TITLE,
      title: parsed.title,
      body: parsed.body,
      themes: parsed.themes?.length ? parsed.themes : fallback.themes,
      relatedSignalIds: fallback.relatedSignalIds,
      generationMode: "openai",
    };
  } catch (e) {
    console.error("OpenAI letter failed", e);
    return { ...fallback, generationMode: "template" };
  }
}
