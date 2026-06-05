import Image from "next/image";
import type { ScrapbookCaption } from "@/lib/types";

export function ScrapbookGrid({ items }: { items: ScrapbookCaption[] }) {
  return (
    <section className="mb-12">
      <h2 className="heading-serif text-xl text-espresso mb-6">Scrapbook</h2>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className={`card-warm overflow-hidden p-0 ${
              i === 0 ? "col-span-2" : ""
            }`}
          >
            <div
              className={`relative w-full film-photo ${
                i === 0 ? "aspect-[16/9]" : "aspect-square"
              }`}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 672px) 50vw, 336px"
              />
            </div>
            <div className="p-3">
              <p className="text-xs font-medium text-espresso">{item.title}</p>
              <p className="text-xs text-warm-gray italic mt-0.5">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
