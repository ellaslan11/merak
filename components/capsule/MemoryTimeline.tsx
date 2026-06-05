import type { TimelineItem } from "@/lib/types";

export function MemoryTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <section className="mb-12">
      <h2 className="heading-serif text-xl text-espresso mb-6">Timeline</h2>
      <div className="space-y-0 border-l border-espresso/10 ml-3">
        {items.map((item, i) => (
          <div key={i} className="relative pl-8 pb-8 last:pb-0">
            <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-soft-gold border-2 border-cream" />
            <p className="text-xs text-warm-gray font-medium">{item.date}</p>
            <h3 className="font-medium text-espresso mt-1">{item.title}</h3>
            <p className="text-sm text-warm-gray mt-1 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
