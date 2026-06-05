import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="px-5 py-10 text-center">
      <p className="heading-serif text-2xl text-espresso mb-6 leading-snug">
        Turn tiny moments into memory capsules
      </p>
      <Link href="/onboarding">
        <Button size="lg" className="w-full max-w-[280px]">
          Start noticing
        </Button>
      </Link>
    </section>
  );
}
