import type { MemorySignal } from "./types";
import { getAllSignals } from "./utils";

export interface ProvenanceItem {
  signalId: string;
  label: string;
  detail: string;
  href: string;
  kind: "photo" | "text" | "calendar" | "reflection" | "friend" | "other";
}

function phoneSourceIdFromSignalId(signalId: string): string | undefined {
  const parts = signalId.split("-");
  if (parts.length < 3) return undefined;
  return parts.slice(2).join("-");
}

function hrefForSignal(signal: MemorySignal): string {
  const sourceId = signal.phoneSourceId ?? phoneSourceIdFromSignalId(signal.id);

  switch (signal.type) {
    case "photo":
      return `/phone?tab=photos${sourceId ? `&highlight=${sourceId}` : ""}`;
    case "text_message":
      return `/phone?tab=messages${sourceId ? `&highlight=${sourceId}` : ""}`;
    case "calendar_event":
      return `/phone?tab=calendar${sourceId ? `&highlight=${sourceId}` : ""}`;
    case "reflection":
      return `/phone?tab=messages&highlight=memos`;
    case "friend_memory":
      return `/phone?tab=messages`;
    default:
      return `/feed`;
  }
}

function labelForSignal(signal: MemorySignal): string {
  switch (signal.type) {
    case "photo":
      return signal.caption ?? signal.location ?? signal.title;
    case "text_message":
      return `${signal.contactName}: “${signal.messageBody.slice(0, 48)}${signal.messageBody.length > 48 ? "…" : ""}”`;
    case "calendar_event":
      return signal.eventTitle;
    case "reflection":
      return `Voice memo: “${signal.answer.slice(0, 48)}…”`;
    case "friend_memory":
      return signal.memory.slice(0, 56) + (signal.memory.length > 56 ? "…" : "");
    case "place_visit":
      return signal.placeName;
    default:
      return signal.title;
  }
}

function kindForSignal(signal: MemorySignal): ProvenanceItem["kind"] {
  switch (signal.type) {
    case "photo":
      return "photo";
    case "text_message":
      return "text";
    case "calendar_event":
      return "calendar";
    case "reflection":
      return "reflection";
    case "friend_memory":
      return "friend";
    default:
      return "other";
  }
}

export function resolveProvenance(
  relatedSignalIds: string[],
  signals = getAllSignals()
): ProvenanceItem[] {
  const byId = new Map(signals.map((s) => [s.id, s]));
  const items: ProvenanceItem[] = [];

  for (const id of relatedSignalIds) {
    const signal = byId.get(id);
    if (!signal) continue;
    items.push({
      signalId: id,
      label: labelForSignal(signal),
      detail: signal.source,
      href: hrefForSignal(signal),
      kind: kindForSignal(signal),
    });
  }

  return items;
}
