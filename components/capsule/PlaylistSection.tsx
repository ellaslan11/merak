import type { PlaylistItem } from "@/lib/types";

export function PlaylistSection({ items }: { items: PlaylistItem[] }) {
  return (
    <section className="mb-12">
      <h2 className="heading-serif text-xl text-espresso mb-6">
        This week&apos;s soundtrack
      </h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex gap-4 items-start p-4 rounded-xl bg-faded-blue/10"
          >
            <span className="text-warm-gray text-sm w-5">{i + 1}</span>
            <div>
              <p className="font-medium text-espresso text-sm">
                {item.songTitle}
              </p>
              <p className="text-xs text-warm-gray">{item.artist}</p>
              <p className="text-xs text-warm-gray mt-1 italic">
                {item.memoryContext}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
