"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { resetParsedCache } from "@/lib/generateMemory";
import {
  ensureDemoDefaults,
  getPhotoConsent,
  loadConsentStorage,
  resetConsentDemo,
  setPhotoConsent,
  type ConsentStorage,
} from "@/lib/consentStore";
import { getConsentSummary, getConsentAwarePhotos } from "@/lib/consentAwareData";
import type { PhonePhoto } from "@/lib/phoneData";

interface ConsentContextValue {
  consentVersion: number;
  photos: PhonePhoto[];
  sharedCount: number;
  totalPhotos: number;
  hiddenCount: number;
  isPhotoShared: (id: string) => boolean;
  togglePhoto: (id: string) => void;
  syncMemory: () => void;
  resetDemo: () => void;
  pendingSync: boolean;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

const EMPTY_STORAGE: ConsentStorage = { initialized: false, photos: {} };

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [storage, setStorage] = useState<ConsentStorage>(EMPTY_STORAGE);
  const [consentVersion, setConsentVersion] = useState(0);
  const [pendingSync, setPendingSync] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStorage(ensureDemoDefaults());
    setHydrated(true);

    const onConsentChange = () => {
      setStorage(loadConsentStorage());
    };
    window.addEventListener("merak-consent-change", onConsentChange);
    return () => window.removeEventListener("merak-consent-change", onConsentChange);
  }, []);

  const photos = useMemo(
    () => (hydrated ? getConsentAwarePhotos() : []),
    [storage, consentVersion, hydrated]
  );

  const summary = useMemo(
    () =>
      hydrated
        ? getConsentSummary()
        : {
            photos: 0,
            photosTotal: 21,
            photosHidden: 21,
            texts: 0,
            calendar: 0,
            memos: 0,
          },
    [storage, consentVersion, hydrated]
  );

  const togglePhoto = useCallback(
    (id: string) => {
      const photo = photos.find((p) => p.id === id);
      const currentlyShared = photo?.merakShared ?? getPhotoConsent(id, true);
      setPhotoConsent(id, !currentlyShared);
      setStorage(loadConsentStorage());
      setPendingSync(true);
      window.dispatchEvent(new Event("merak-consent-change"));
    },
    [photos]
  );

  const syncMemory = useCallback(() => {
    resetParsedCache();
    setConsentVersion((v) => v + 1);
    setPendingSync(false);
    setStorage(loadConsentStorage());
    window.dispatchEvent(new Event("merak-consent-change"));
  }, []);

  const resetDemo = useCallback(() => {
    resetConsentDemo();
    resetParsedCache();
    setStorage(ensureDemoDefaults());
    setConsentVersion((v) => v + 1);
    setPendingSync(false);
    window.dispatchEvent(new Event("merak-consent-change"));
  }, []);

  const value: ConsentContextValue = {
    consentVersion,
    photos,
    sharedCount: summary.photos,
    totalPhotos: summary.photosTotal,
    hiddenCount: summary.photosHidden,
    isPhotoShared: (id) => {
      const p = photos.find((x) => x.id === id);
      return p?.merakShared ?? getPhotoConsent(id, true);
    },
    togglePhoto,
    syncMemory,
    resetDemo,
    pendingSync,
  };

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
