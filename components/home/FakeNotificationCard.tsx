import { CheckCircle2 } from "lucide-react";

export function FakeNotificationCard({
  title,
  body,
  time,
}: {
  title: string;
  body: string;
  time: string;
}) {
  return (
    <div className="flex gap-3 p-4 rounded-2xl bg-olive-soft/60 border border-olive/15 animate-slide-up">
      <CheckCircle2 className="w-5 h-5 text-olive shrink-0 mt-0.5" strokeWidth={1.75} />
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-olive mb-0.5">{time}</p>
        <p className="font-semibold text-[14px] text-espresso">{title}</p>
        <p className="text-[13px] text-warm-gray mt-0.5 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
