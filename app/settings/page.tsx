"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { PrivacySettings } from "@/components/settings/PrivacySettings";
import { SignalToggle } from "@/components/settings/SignalToggle";
import { ToneSettings } from "@/components/settings/ToneSettings";
import type { SignalPermission, TonePreference } from "@/lib/types";
import { getStoredPreferences, savePreferences } from "@/lib/utils";

const defaultPermissions: Record<SignalPermission, boolean> = {
  photos: true,
  texts: true,
  calendar: true,
  places: true,
  songs: true,
  reflections: true,
  friend_memories: true,
};

export default function SettingsPage() {
  const [permissions, setPermissions] =
    useState<Record<SignalPermission, boolean>>(defaultPermissions);
  const [tone, setTone] = useState<TonePreference>("warm");

  useEffect(() => {
    const prefs = getStoredPreferences();
    if (prefs) {
      setPermissions(prefs.signalPermissions);
      setTone(prefs.tonePreference);
    }
  }, []);

  const updatePermissions = (p: Record<SignalPermission, boolean>) => {
    setPermissions(p);
    const existing = getStoredPreferences();
    savePreferences({
      noticePreferences: existing?.noticePreferences ?? [],
      signalPermissions: p,
      noteFrequency: existing?.noteFrequency ?? "weekly memory letters",
      tonePreference: tone,
      completed: true,
    });
  };

  const updateTone = (t: TonePreference) => {
    setTone(t);
    const existing = getStoredPreferences();
    savePreferences({
      noticePreferences: existing?.noticePreferences ?? [],
      signalPermissions: permissions,
      noteFrequency: existing?.noteFrequency ?? "weekly memory letters",
      tonePreference: t,
      completed: true,
    });
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-4 animate-fade-in">
        <SectionHeader
          label="Preferences"
          title="Settings"
          subtitle="You control what Merak sees"
        />
        <PrivacySettings />
        <section>
          <p className="merak-label mb-3">Signals</p>
          <SignalToggle permissions={permissions} onChange={updatePermissions} />
        </section>
        <section>
          <p className="merak-label mb-3">Tone</p>
          <ToneSettings selected={tone} onChange={updateTone} />
        </section>
        <p className="text-[11px] text-center text-warm-gray-light pb-4">
          MVP demo · mock data only
        </p>
      </div>
    </AppShell>
  );
}
