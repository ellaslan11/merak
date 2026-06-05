"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { HomeGreeting } from "@/components/home/HomeGreeting";
import { WeekContextBanner } from "@/components/home/WeekContextBanner";
import { TodayCapturedMoments } from "@/components/home/TodayCapturedMoments";
import { MerakNoticedSection } from "@/components/home/MerakNoticedSection";
import { DailyNoteCard } from "@/components/home/DailyNoteCard";
import { SoftReminderCard } from "@/components/home/SoftReminderCard";
import { WeeklyLetterPreview } from "@/components/home/WeeklyLetterPreview";
import { MemoryFeedPreview } from "@/components/home/MemoryFeedPreview";
import { FakeNotificationCard } from "@/components/home/FakeNotificationCard";
import { DemoModeBanner } from "@/components/layout/DemoModeBanner";
import { ConsentBoundaryBar } from "@/components/home/ConsentBoundaryBar";
import { MemoryPipelinePanel } from "@/components/home/MemoryPipelinePanel";
import { ParsingProgress } from "@/components/phone/ParsingProgress";
import { LiveVisionScan } from "@/components/phone/LiveVisionScan";
import { useConsent } from "@/components/providers/ConsentProvider";
import {
  getDailyNote,
  getReminderSuggestion,
  getWeeklyLetter,
  getParsedWeek,
} from "@/lib/generateMemory";
import {
  filterByPermission,
  getStoredPreferences,
  getWeekSignals,
} from "@/lib/utils";
import { getSharedPhoneStats } from "@/lib/consentAwareData";
import { getParsingSteps } from "@/lib/parsePhoneData";
import { Smartphone, ChevronRight } from "lucide-react";

export default function HomePage() {
  const { consentVersion, syncMemory, pendingSync } = useConsent();
  const [parsingDone, setParsingDone] = useState(false);
  const [visionDone, setVisionDone] = useState(false);
  const prefs = getStoredPreferences();

  // Re-run parse animation when consent sync bumps version
  useEffect(() => {
    setParsingDone(false);
    setVisionDone(false);
  }, [consentVersion]);

  const parsed = useMemo(() => getParsedWeek(), [consentVersion]);

  const weekSignals = useMemo(() => {
    const signals = parsed.signals.length ? parsed.signals : getWeekSignals();
    return filterByPermission(signals, prefs?.signalPermissions);
  }, [prefs, parsed.signals]);

  const todaySignals = useMemo(
    () =>
      filterByPermission(
        weekSignals.filter((s) => s.timestamp.startsWith("2026-02-23")),
        prefs?.signalPermissions
      ),
    [prefs, weekSignals]
  );

  const patterns = useMemo(
    () => (parsed.patterns.length ? parsed.patterns : []).slice(0, 4),
    [parsed.patterns]
  );

  const dailyNote = useMemo(() => getDailyNote(), [consentVersion]);
  const reminder = useMemo(() => getReminderSuggestion(), [consentVersion]);
  const weeklyLetter = useMemo(() => getWeeklyLetter(), [consentVersion]);
  const phoneStats = getSharedPhoneStats();
  const parsingSteps = getParsingSteps(phoneStats);

  return (
    <AppShell>
      <div className="space-y-5 animate-fade-in pb-4">
        <HomeGreeting sharedPhotos={phoneStats.photos} totalPhotos={phoneStats.photosTotal} />
        <DemoModeBanner />
        <ConsentBoundaryBar />

        {!parsingDone ? (
          <ParsingProgress
            key={`parse-${consentVersion}`}
            steps={parsingSteps}
            onComplete={() => setParsingDone(true)}
          />
        ) : (
          <>
            <FakeNotificationCard
              title="Finished reading your phone"
              body={`${phoneStats.texts} texts · ${phoneStats.photos} photos · only what you shared`}
              time="Just now"
            />

            <MemoryPipelinePanel />

            <Link
              href="/phone?tab=photos"
              className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-[var(--border)] shadow-merak-sm hover:shadow-merak transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-cream-deep flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-espresso-soft" strokeWidth={1.75} />
              </div>
              <span className="flex-1 text-[14px] font-medium text-espresso">
                View shared sources · toggle consent
              </span>
              <ChevronRight className="w-4 h-4 text-warm-gray-light" />
            </Link>

            {!visionDone && (
              <LiveVisionScan
                key={`vision-${consentVersion}`}
                onComplete={() => setVisionDone(true)}
              />
            )}

            <WeekContextBanner />

            <section>
              <SectionHeader
                label="Today"
                title="Captured moments"
                subtitle="From photos and texts you shared"
              />
              <TodayCapturedMoments signals={todaySignals} />
            </section>

            <section>
              <MerakNoticedSection patterns={patterns} />
            </section>

            <section>
              <DailyNoteCard note={dailyNote} />
            </section>

            <section>
              <SoftReminderCard reminder={reminder} />
            </section>

            <section>
              <WeeklyLetterPreview letter={weeklyLetter} />
            </section>

            <section>
              <SectionHeader title="Recent moments" />
              <MemoryFeedPreview signals={weekSignals} />
            </section>

            {pendingSync && (
              <p className="text-center text-[12px] text-soft-gold font-medium">
                Sources changed on Phone —{" "}
                <button
                  type="button"
                  className="underline"
                  onClick={() => syncMemory()}
                >
                  update memory
                </button>
              </p>
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}
