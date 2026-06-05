"use client";

import { useEffect } from "react";
import { phoneContacts, phoneTextMessages } from "@/lib/phoneData";
import { cn } from "@/lib/utils";

export function PhoneMessagesView({
  threadId,
  highlightId,
}: {
  threadId?: string;
  highlightId?: string;
}) {
  const threads = phoneContacts.filter((c) =>
    phoneTextMessages.some((m) => m.threadId === c.id && m.merakShared)
  );

  const activeThread = threadId ?? threads[0]?.id;
  const messages = phoneTextMessages
    .filter((m) => m.threadId === activeThread && m.merakShared)
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  const contact = phoneContacts.find((c) => c.id === activeThread);

  useEffect(() => {
    if (!highlightId || highlightId === "memos") return;
    const el = document.getElementById(highlightId);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightId, messages]);

  return (
    <div className="flex flex-col min-h-[360px]">
      <div className="flex gap-2 overflow-x-auto pb-4 phone-scroll">
        {threads.map((t) => (
          <span
            key={t.id}
            className={cn(
              "shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors",
              activeThread === t.id
                ? "bg-espresso text-cream"
                : "bg-surface text-warm-gray border border-[var(--border)]"
            )}
          >
            {t.name}
          </span>
        ))}
      </div>

      <div className="flex-1 space-y-2.5 overflow-y-auto phone-scroll px-0.5">
        <p className="text-center text-[11px] font-medium text-warm-gray-light mb-3">
          {contact?.name} · shared with Merak
        </p>
        {messages.map((msg) => (
          <div
            key={msg.id}
            id={msg.id}
            className={cn(
              "max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[14px] leading-relaxed scroll-mt-24",
              msg.direction === "outgoing"
                ? "ml-auto bg-espresso text-cream rounded-br-sm"
                : "mr-auto bg-surface text-espresso border border-[var(--border)] rounded-bl-sm shadow-merak-sm",
              highlightId === msg.id && "ring-2 ring-rose-muted/60"
            )}
          >
            {msg.body}
          </div>
        ))}
      </div>

      <p className="text-center text-[11px] text-olive font-medium mt-4 pt-3 border-t border-[var(--border)]">
        Opt-in only · not your full inbox
      </p>
    </div>
  );
}
