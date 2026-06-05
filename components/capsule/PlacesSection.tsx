import type { PlaceMemory } from "@/lib/types";

export function PlacesSection({ places }: { places: PlaceMemory[] }) {
  return (
    <section className="mb-12">
      <h2 className="heading-serif text-xl text-espresso mb-6">Places</h2>
      <div className="grid gap-3">
        {places.map((place, i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-olive/20 bg-olive/5"
          >
            <p className="font-medium text-espresso flex items-center gap-2">
              <span>📍</span> {place.placeName}
            </p>
            <p className="text-sm text-warm-gray mt-2">{place.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
