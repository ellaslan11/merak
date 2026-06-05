import Link from "next/link";
import type { WeeklyLetter } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Mail, ChevronRight } from "lucide-react";

export function WeeklyLetterPreview({ letter }: { letter: WeeklyLetter }) {
  return (
    <Link href="/weekly-letter" className="block group">
      <div className="relative overflow-hidden rounded-card border border-[var(--border)] bg-surface shadow-merak p-5">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top right, var(--rose-soft), transparent 60%)",
          }}
        />
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-soft-gold" strokeWidth={1.75} />
              <span className="merak-label">{letter.weekTitle}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-warm-gray-light group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h3 className="heading-serif text-xl text-espresso mb-2">
            {letter.title}
          </h3>
          <p className="text-[14px] text-warm-gray line-clamp-2 leading-relaxed mb-3">
            {letter.body}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {letter.themes.slice(0, 3).map((theme) => (
              <Badge key={theme} variant="gold">
                {theme}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
