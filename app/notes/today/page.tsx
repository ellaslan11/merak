"use client";

import { AppShell } from "@/components/layout/AppShell";
import { DailyNoteView } from "@/components/notes/DailyNoteView";
import { getDailyNote } from "@/lib/generateMemory";

export default function TodayNotePage() {
  const note = getDailyNote();

  return (
    <AppShell title="Today's note">
      <DailyNoteView note={note} />
    </AppShell>
  );
}
