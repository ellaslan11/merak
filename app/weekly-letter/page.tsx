"use client";

import { AppShell } from "@/components/layout/AppShell";
import { WeeklyLetterView } from "@/components/notes/WeeklyLetterView";
import { getWeeklyLetter } from "@/lib/generateMemory";

export default function WeeklyLetterPage() {
  const letter = getWeeklyLetter();

  return (
    <AppShell title="Weekly letter">
      <WeeklyLetterView letter={letter} fetchEnhanced />
    </AppShell>
  );
}
