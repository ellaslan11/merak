import Image from "next/image";

export function CapsuleHero({
  title,
  dateRange,
  location,
  imageUrl,
}: {
  title: string;
  dateRange: string;
  location: string;
  imageUrl: string;
}) {
  return (
    <div className="relative -mx-5 aspect-[4/5] max-h-[320px] overflow-hidden">
      <Image src={imageUrl} alt={title} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
        <p className="text-[11px] font-semibold uppercase tracking-widest opacity-80 mb-2">
          Memory capsule
        </p>
        <h1 className="heading-serif text-[32px] leading-tight">{title}</h1>
        <p className="text-[13px] mt-2 opacity-90">
          {dateRange} · {location}
        </p>
      </div>
    </div>
  );
}
