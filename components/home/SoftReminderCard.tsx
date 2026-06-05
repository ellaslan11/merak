"use client";

import { useState } from "react";
import type { ReminderSuggestion } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { Bell, Clock } from "lucide-react";

export function SoftReminderCard({
  reminder,
}: {
  reminder: ReminderSuggestion;
}) {
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(false);

  return (
    <>
      <div className="merak-card-flat p-5 border-olive/20 bg-olive-soft/40">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4 text-olive" strokeWidth={1.75} />
          <span className="merak-label text-olive">Soft reminder</span>
        </div>
        <h3 className="font-semibold text-[15px] text-espresso mb-2">
          {reminder.title}
        </h3>
        <p className="text-[13px] text-warm-gray leading-relaxed mb-4">
          {reminder.body}
        </p>
        <div className="flex items-center gap-2 text-[12px] text-warm-gray mb-4">
          <Clock className="w-3.5 h-3.5" />
          {reminder.suggestedTime}
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={saved ? "secondary" : "primary"}
            className="flex-1"
            onClick={() => {
              setSaved(true);
              setToast(true);
            }}
            disabled={saved}
          >
            {saved ? "Set" : reminder.actionLabel}
          </Button>
          <Button size="sm" variant="ghost">
            Save ritual
          </Button>
        </div>
      </div>
      <Toast
        message={`Reminder set for ${reminder.suggestedTime}`}
        visible={toast}
        onHide={() => setToast(false)}
      />
    </>
  );
}
