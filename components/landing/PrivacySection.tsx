import { Check } from "lucide-react";

const points = [
  "You choose what Merak can notice",
  "Only texts you mark — never full inbox",
  "No microphone or hidden tracking",
  "No mental health diagnosis",
];

export function PrivacySection() {
  return (
    <section className="px-5 py-8">
      <div className="merak-card p-5">
        <p className="merak-label-accent mb-4">Consent-first</p>
        <ul className="space-y-3">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-olive-soft flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-olive" strokeWidth={2.5} />
              </span>
              <span className="text-[14px] text-espresso-soft leading-snug">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
