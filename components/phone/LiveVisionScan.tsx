"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useConsent } from "@/components/providers/ConsentProvider";
import { Button } from "@/components/ui/Button";
import { Scan, Loader2 } from "lucide-react";

interface VisionInsight {
  id: string;
  caption: string;
  tags: string[];
  source: "live" | "cache";
}

export function LiveVisionScan({
  onComplete,
}: {
  onComplete?: (insights: VisionInsight[]) => void;
}) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentCaption, setCurrentCaption] = useState("");
  const [insights, setInsights] = useState<VisionInsight[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { photos } = useConsent();
  const shared = photos.filter((p) => p.merakShared);

  const runScan = useCallback(async () => {
    setScanning(true);
    setError(null);
    setInsights([]);
    setProgress(0);
    const collected: VisionInsight[] = [];

    for (let i = 0; i < shared.length; i++) {
      const photo = shared[i];
      setCurrentCaption(`Photo ${i + 1} of ${shared.length}…`);
      try {
        const res = await fetch("/api/analyze-photo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageUrl: photo.imageUrl,
            photoId: photo.id,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed");
        collected.push({
          id: photo.id,
          caption: data.caption,
          tags: data.tags,
          source: data.source,
        });
        setCurrentCaption(data.caption);
        setInsights([...collected]);
        setProgress(((i + 1) / shared.length) * 100);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Scan failed");
        break;
      }
      await new Promise((r) => setTimeout(r, 350));
    }
    setScanning(false);
    onComplete?.(collected);
  }, [shared, onComplete]);

  return (
    <div className="merak-card-flat p-5">
      <div className="flex items-center gap-2 mb-2">
        <Scan className="w-4 h-4 text-rose-muted" strokeWidth={1.75} />
        <span className="merak-label">Image understanding</span>
      </div>
      <p className="text-[13px] text-warm-gray mb-4 leading-relaxed">
        Merak reads photos you shared and finds the soft details.
      </p>

      {!scanning && insights.length === 0 && (
        <Button className="w-full" variant="soft" onClick={runScan}>
          Analyze camera roll
        </Button>
      )}

      {scanning && (
        <div className="space-y-3">
          <div className="h-1 rounded-full bg-espresso/8 overflow-hidden">
            <div
              className="h-full bg-soft-gold rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[12px] text-warm-gray italic line-clamp-2 flex items-center gap-2">
            <Loader2 className="w-3 h-3 animate-spin shrink-0" />
            {currentCaption}
          </p>
        </div>
      )}

      {error && (
        <p className="text-[12px] text-rose-muted mt-2">Using cached results.</p>
      )}

      {insights.length > 0 && !scanning && (
        <ul className="space-y-2.5 max-h-40 overflow-y-auto phone-scroll mt-3">
          {insights.map((ins) => {
            const photo = shared.find((p) => p.id === ins.id);
            return (
              <li key={ins.id} className="flex gap-3 items-center">
                {photo && (
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 film-photo">
                    <Image src={photo.imageUrl} alt="" fill className="object-cover" sizes="40px" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-[12px] text-espresso line-clamp-2">{ins.caption}</p>
                  <span className="text-[10px] text-olive">{ins.source === "live" ? "Live" : "Cached"}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
