export function PhoneStatusBar() {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="shrink-0 flex items-center justify-between px-6 pt-11 pb-3 z-40">
      <span className="text-[13px] font-semibold text-espresso tabular-nums">
        {time}
      </span>
      <div className="flex items-center gap-1.5 text-espresso/70">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="0.5" opacity="0.4" />
          <rect x="4" y="5" width="3" height="7" rx="0.5" opacity="0.6" />
          <rect x="8" y="2" width="3" height="10" rx="0.5" opacity="0.8" />
          <rect x="12" y="0" width="3" height="12" rx="0.5" />
        </svg>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden>
          <path d="M9 2C5.5 2 2.4 3.6 0 6c2.4 2.4 5.5 4 9 4s6.6-1.6 9-4c-2.4-2.4-5.5-4-9-4z" opacity="0.35" />
          <circle cx="9" cy="6" r="2.5" />
        </svg>
        <div className="w-6 h-3 rounded-[3px] border border-espresso/30 flex items-center p-[1px]">
          <div className="h-full w-4/5 bg-espresso/80 rounded-[2px]" />
        </div>
      </div>
    </div>
  );
}
