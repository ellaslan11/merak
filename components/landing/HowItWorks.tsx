import { Shield, Scan, Heart } from "lucide-react";

const steps = [
  {
    Icon: Shield,
    title: "You choose what to share",
    body: "Photos, texts, places, songs — opt-in only. Never your full inbox.",
  },
  {
    Icon: Scan,
    title: "Merak reads gently",
    body: "Patterns emerge from moments you saved — rituals, friendships, quiet joys.",
  },
  {
    Icon: Heart,
    title: "Warm notes back to you",
    body: "Daily notes, soft reminders, and weekly memory letters.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-5 py-8">
      <p className="merak-label text-center mb-6">How it works</p>
      <div className="space-y-3">
        {steps.map((step) => (
          <div
            key={step.title}
            className="merak-card-flat p-4 flex gap-4 items-start"
          >
            <div className="shrink-0 w-10 h-10 rounded-2xl bg-gold-soft flex items-center justify-center">
              <step.Icon className="w-5 h-5 text-espresso-soft" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="font-semibold text-[15px] text-espresso mb-1">
                {step.title}
              </h3>
              <p className="text-[13px] text-warm-gray leading-relaxed">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
