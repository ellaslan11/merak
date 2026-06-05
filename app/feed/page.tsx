"use client";

import { useMemo } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { MemorySignalCard } from "@/components/feed/MemorySignalCard";
import {
  getWeekSignals,
  filterByPermission,
  getStoredPreferences,
} from "@/lib/utils";
import { WEEK_TITLE } from "@/lib/mockSignals";

export default function FeedPage() {
  const prefs = getStoredPreferences();
  const filtered = useMemo(() => {
    const week = getWeekSignals();
    return filterByPermission(
      [...week].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
      prefs?.signalPermissions
    );
  }, [prefs]);

  return (
    <AppShell>
      <SectionHeader
        label="Memory feed"
        title={WEEK_TITLE}
        subtitle={`${filtered.length} moments you shared`}
      />
      <div className="space-y-4 pb-4">
        {filtered.map((signal) => (
          <MemorySignalCard key={signal.id} signal={signal} />
        ))}
      </div>
    </AppShell>
  );
}
