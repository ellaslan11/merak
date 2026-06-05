import type { MemorySignal } from "./types";

/** Compact signal digest for LLM prompts — no raw image bytes. */
export function formatSignalsForPrompt(signals: MemorySignal[]): string {
  return signals
    .slice(0, 24)
    .map((s) => {
      const day = s.timestamp.split("T")[0];
      const base = `- [${day}] (${s.type}) ${s.title}`;
      if (s.type === "text_message") {
        return `${base}: "${s.messageBody}"`;
      }
      if (s.type === "reflection") {
        return `${base}: "${s.answer}"`;
      }
      if (s.type === "photo" && s.caption) {
        return `${base} — ${s.caption} @ ${s.location ?? "unknown"}`;
      }
      if (s.type === "friend_memory") {
        return `${base}: "${s.memory}"`;
      }
      return base;
    })
    .join("\n");
}
