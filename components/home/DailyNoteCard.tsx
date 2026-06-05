import Link from "next/link";
import type { DailyNote } from "@/lib/types";
import { PenLine, ChevronRight } from "lucide-react";

export function DailyNoteCard({ note }: { note: DailyNote }) {
  return (
    <Link href="/notes/today" className="block group">
      <div className="merak-card-interactive p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-soft flex items-center justify-center">
              <PenLine className="w-4 h-4 text-rose-muted" strokeWidth={1.75} />
            </div>
            <span className="merak-label-accent">Today&apos;s note</span>
          </div>
          <ChevronRight className="w-4 h-4 text-warm-gray-light group-hover:text-espresso transition-colors" />
        </div>
        <h3 className="heading-serif text-lg text-espresso mb-2">
          {note.title}
        </h3>
        <p className="text-[14px] text-warm-gray line-clamp-3 leading-relaxed">
          {note.body}
        </p>
      </div>
    </Link>
  );
}
