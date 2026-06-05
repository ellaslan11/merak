import { Camera, MessageCircle, MapPin, Music, PenLine, Calendar } from "lucide-react";

const signals = [
  { Icon: Camera, label: "Saved photos" },
  { Icon: MessageCircle, label: "Texts you mark" },
  { Icon: MapPin, label: "Places" },
  { Icon: Music, label: "Songs" },
  { Icon: PenLine, label: "Reflections" },
  { Icon: Calendar, label: "Calendar" },
];

export function SignalCards() {
  return (
    <section className="px-5 py-8">
      <p className="merak-label text-center mb-2">Signals you can share</p>
      <p className="text-[13px] text-warm-gray text-center mb-6 max-w-[260px] mx-auto">
        Merak only works with what you opt into
      </p>
      <div className="grid grid-cols-3 gap-2">
        {signals.map((s) => (
          <div
            key={s.label}
            className="merak-card-flat p-3 flex flex-col items-center text-center gap-2"
          >
            <s.Icon className="w-5 h-5 text-rose-muted" strokeWidth={1.75} />
            <span className="text-[11px] font-medium text-espresso leading-tight">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
