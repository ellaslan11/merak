"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function Toast({
  message,
  visible,
  onHide,
}: {
  message: string;
  visible: boolean;
  onHide: () => void;
}) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onHide, 2500);
    return () => clearTimeout(t);
  }, [visible, onHide]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-28 left-1/2 -translate-x-1/2 z-[100]",
        "px-5 py-3 rounded-full bg-espresso text-cream text-[13px] font-medium shadow-merak-lg",
        "animate-slide-up max-w-[90%] text-center"
      )}
    >
      {message}
    </div>
  );
}
