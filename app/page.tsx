import { LandingHero } from "@/components/landing/LandingHero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SignalCards } from "@/components/landing/SignalCards";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { CTASection } from "@/components/landing/CTASection";

export default function LandingPage() {
  return (
    <div className="min-h-full flex flex-col animate-fade-in">
      <div className="flex-1 overflow-y-auto phone-scroll">
        <LandingHero />
        <HowItWorks />
        <SignalCards />
        <PrivacySection />
        <CTASection />
      </div>
      <footer className="shrink-0 py-4 text-center text-[11px] text-warm-gray-light">
        Merak · gentle memory companion
      </footer>
    </div>
  );
}
