import type { ProofMoment } from "@/lib/types";
import { Card } from "@/components/ui/Card";

export function ProofYouWereHappyHere({ moments }: { moments: ProofMoment[] }) {
  return (
    <section className="mb-12">
      <h2 className="heading-serif text-xl text-espresso mb-2">
        Proof you were happy here
      </h2>
      <p className="text-sm text-warm-gray mb-6">
        Based on the moments you saved and marked as peaceful
      </p>
      <div className="grid gap-4">
        {moments.map((m, i) => (
          <Card key={i}>
            <h3 className="font-medium text-espresso">{m.title}</h3>
            <p className="text-sm text-warm-gray mt-2 leading-relaxed">
              {m.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
