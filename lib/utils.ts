import type {
  MemorySignal,
  OnboardingPreferences,
  SignalPermission,
} from "./types";
import { parsePhoneDataToSignals } from "./parsePhoneData";
import { WEEK_START } from "./mockSignals";

const PERMISSION_TYPE_MAP: Record<SignalPermission, MemorySignal["type"][]> = {
  photos: ["photo"],
  texts: ["text_message", "friend_memory"],
  calendar: ["calendar_event"],
  places: ["place_visit"],
  songs: ["song_played"],
  reflections: ["reflection"],
  friend_memories: ["friend_memory"],
};

export function getAllSignals(): MemorySignal[] {
  return parsePhoneDataToSignals();
}

export function getWeekSignals(signals = getAllSignals()): MemorySignal[] {
  const start = new Date(WEEK_START);
  const end = new Date(WEEK_START);
  end.setDate(end.getDate() + 7);
  return signals.filter((s) => {
    const t = new Date(s.timestamp);
    return t >= start && t < end;
  });
}

export function getSignalsForDay(
  dateStr: string,
  signals = getAllSignals()
): MemorySignal[] {
  return signals.filter((s) => s.timestamp.startsWith(dateStr));
}

export function getTodaySignals(signals = getAllSignals()): MemorySignal[] {
  return getSignalsForDay("2026-02-23", signals);
}

export function groupSignalsByDay(
  signals: MemorySignal[]
): Record<string, MemorySignal[]> {
  return signals.reduce(
    (acc, signal) => {
      const day = signal.timestamp.split("T")[0];
      if (!acc[day]) acc[day] = [];
      acc[day].push(signal);
      return acc;
    },
    {} as Record<string, MemorySignal[]>
  );
}

export function formatSignalDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatSignalTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function filterByPermission(
  signals: MemorySignal[],
  permissions?: Partial<Record<SignalPermission, boolean>>
): MemorySignal[] {
  if (!permissions) return signals;
  return signals.filter((signal) => {
    const allowedTypes = Object.entries(permissions)
      .filter(([, enabled]) => enabled)
      .flatMap(([key]) => PERMISSION_TYPE_MAP[key as SignalPermission] ?? []);
    if (allowedTypes.length === 0) return true;
    return allowedTypes.includes(signal.type);
  });
}

export function getStoredPreferences(): OnboardingPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("merak-preferences");
    if (!raw) return null;
    return JSON.parse(raw) as OnboardingPreferences;
  } catch {
    return null;
  }
}

export function savePreferences(prefs: OnboardingPreferences): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("merak-preferences", JSON.stringify(prefs));
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getPeopleFromSignals(signals: MemorySignal[]): string[] {
  const people = new Set<string>();
  for (const s of signals) {
    if ("people" in s && s.people) {
      s.people.forEach((p) => people.add(p));
    }
    if (s.type === "friend_memory") {
      s.people.forEach((p) => people.add(p));
    }
  }
  return Array.from(people);
}
