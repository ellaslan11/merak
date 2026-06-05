import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative px-5 pt-8 pb-10 text-center">
      <div className="merak-gradient-hero rounded-3xl px-6 py-10 mb-8 border border-[var(--border)] shadow-merak">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/80 border border-[var(--border)] mb-6 shadow-merak-sm">
          <Sparkles className="w-3.5 h-3.5 text-soft-gold" strokeWidth={2} />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-warm-gray">
            Your life, remembered softly
          </span>
        </div>
        <h1 className="heading-display text-balance mb-4">
          Notice your life while you&apos;re living it
        </h1>
        <p className="body-muted max-w-[280px] mx-auto">
          Consent-bounded memory synthesis — share only what you choose, get your
          week back as a letter and capsule.
        </p>
      </div>
      <Link href="/onboarding" className="block">
        <Button size="lg" className="w-full max-w-[280px] mx-auto">
          Start noticing
        </Button>
      </Link>
      <Link
        href="/phone?tab=photos"
        className="inline-block mt-3 text-[13px] font-medium text-olive hover:text-espresso transition-colors"
      >
        Try consent demo →
      </Link>
      <Link
        href="/home"
        className="inline-block mt-2 text-[13px] font-medium text-warm-gray hover:text-espresso transition-colors"
      >
        Skip to dashboard
      </Link>
    </section>
  );
}
