/**
 * Per-artifact consent overrides (client-side).
 * Demo starts with 6/10 photos shared — toggling re-runs the memory pipeline.
 */

const STORAGE_KEY = "merak-consent-v2";

/** Hidden until user opts in — great for live demo reveal */
export const DEMO_PHOTOS_INITIALLY_PRIVATE = [
  "photo-festival",
  "photo-bakery",
  "photo-birthday",
  "photo-formal",
  "photo-ycombinator",
  "photo-pi-phi-mirror",
  "photo-memory-wall",
  "photo-robot-matcha",
] as const;

export interface ConsentStorage {
  initialized: boolean;
  photos: Record<string, boolean>;
}

const defaultStorage = (): ConsentStorage => ({
  initialized: false,
  photos: {},
});

export function loadConsentStorage(): ConsentStorage {
  if (typeof window === "undefined") return defaultStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStorage();
    return { ...defaultStorage(), ...JSON.parse(raw) } as ConsentStorage;
  } catch {
    return defaultStorage();
  }
}

export function saveConsentStorage(state: ConsentStorage): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/** Apply demo defaults on first visit */
export function ensureDemoDefaults(): ConsentStorage {
  const state = loadConsentStorage();
  if (state.initialized) return state;

  const photos: Record<string, boolean> = {};
  for (const id of DEMO_PHOTOS_INITIALLY_PRIVATE) {
    photos[id] = false;
  }
  const next = { initialized: true, photos };
  saveConsentStorage(next);
  return next;
}

export function getPhotoConsent(id: string, defaultShared: boolean): boolean {
  if (typeof window === "undefined") {
    return DEMO_PHOTOS_INITIALLY_PRIVATE.includes(
      id as (typeof DEMO_PHOTOS_INITIALLY_PRIVATE)[number]
    )
      ? false
      : defaultShared;
  }

  const state = ensureDemoDefaults();
  if (id in state.photos) return state.photos[id];
  return defaultShared;
}

export function setPhotoConsent(id: string, shared: boolean): ConsentStorage {
  const state = ensureDemoDefaults();
  const next = {
    ...state,
    photos: { ...state.photos, [id]: shared },
  };
  saveConsentStorage(next);
  return next;
}

export function resetConsentDemo(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  ensureDemoDefaults();
}
