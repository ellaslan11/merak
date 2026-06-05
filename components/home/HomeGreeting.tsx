import { ellaProfile } from "@/lib/mockSignals";
import { Badge } from "@/components/ui/Badge";

export function HomeGreeting({
  sharedPhotos,
  totalPhotos,
}: {
  sharedPhotos?: number;
  totalPhotos?: number;
}) {
  return (
    <div className="merak-gradient-hero rounded-3xl p-5 border border-[var(--border)] shadow-merak mb-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge variant="gold" className="mb-3">
            Campus · This week
          </Badge>
          <h1 className="heading-serif text-[26px] leading-tight text-espresso">
            Hi, {ellaProfile.name}
          </h1>
          <p className="text-[14px] text-warm-gray mt-1.5 leading-relaxed">
            {sharedPhotos != null && totalPhotos != null ? (
              <>
                Merak synthesized memory from{" "}
                <span className="font-medium text-espresso">
                  {sharedPhotos} of {totalPhotos}
                </span>{" "}
                photos you opted in — nothing else on your roll.
              </>
            ) : (
              <>Here&apos;s what Merak noticed from the moments you shared.</>
            )}
          </p>
        </div>
        <div className="shrink-0 w-11 h-11 rounded-full bg-surface border border-[var(--border)] flex items-center justify-center text-lg shadow-merak-sm">
          ✦
        </div>
      </div>
    </div>
  );
}
