"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { DemoModeBanner } from "@/components/layout/DemoModeBanner";
import { PhoneMessagesView } from "@/components/phone/PhoneMessagesView";
import { CameraRollWithConsent } from "@/components/phone/CameraRollWithConsent";
import { SyncMerakBar } from "@/components/phone/SyncMerakBar";
import { PhoneCalendarView } from "@/components/phone/PhoneCalendarView";
import { PexelsLiveRoll } from "@/components/phone/PexelsLiveRoll";
import { LiveVisionScan } from "@/components/phone/LiveVisionScan";
import { useConsent } from "@/components/providers/ConsentProvider";
import { getSharedPhoneStats } from "@/lib/consentAwareData";
import { cn } from "@/lib/utils";

type Tab = "messages" | "photos" | "calendar";

function PhonePageContent() {
  const searchParams = useSearchParams();
  const highlight = searchParams.get("highlight") ?? undefined;
  const initialTab = (searchParams.get("tab") as Tab) || "messages";

  const [tab, setTab] = useState<Tab>(
    ["messages", "photos", "calendar"].includes(initialTab)
      ? initialTab
      : "messages"
  );
  const { totalPhotos } = useConsent();
  const stats = getSharedPhoneStats();

  const statCards = [
    { label: "Texts", count: stats.texts },
    { label: "Photos", count: stats.photos, suffix: `/${totalPhotos}` },
    { label: "Events", count: stats.calendar },
    { label: "Memos", count: stats.memos },
  ];

  useEffect(() => {
    if (["messages", "photos", "calendar"].includes(initialTab)) {
      setTab(initialTab);
    }
  }, [initialTab]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "messages", label: "Messages" },
    { id: "photos", label: "Photos" },
    { id: "calendar", label: "Calendar" },
  ];

  return (
    <AppShell>
      <div className="space-y-5 animate-fade-in pb-4">
        <SectionHeader
          label="Sources"
          title="What you shared"
          subtitle="Merak only reads what you opt in"
        />

        <DemoModeBanner />

        <div className="grid grid-cols-4 gap-2">
          {statCards.map((s) => (
            <div key={s.label} className="merak-card-flat py-3 text-center">
              <p className="text-xl font-semibold text-espresso tabular-nums">
                {s.count}
                {s.suffix ? (
                  <span className="text-sm text-warm-gray font-medium">{s.suffix}</span>
                ) : null}
              </p>
              <p className="text-[10px] font-medium text-warm-gray uppercase tracking-wide mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex p-1 bg-cream-deep rounded-2xl border border-[var(--border)]">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-[13px] font-semibold transition-all",
                tab === t.id
                  ? "bg-surface text-espresso shadow-merak-sm"
                  : "text-warm-gray"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "messages" && (
          <PhoneMessagesView highlightId={highlight} />
        )}
        {tab === "photos" && (
          <div className="space-y-5 pb-28">
            <CameraRollWithConsent highlightId={highlight} />
            <PexelsLiveRoll />
            <LiveVisionScan />
            <SyncMerakBar />
          </div>
        )}
        {tab === "calendar" && <PhoneCalendarView highlightId={highlight} />}
      </div>
    </AppShell>
  );
}

export default function PhonePage() {
  return (
    <Suspense fallback={null}>
      <PhonePageContent />
    </Suspense>
  );
}
