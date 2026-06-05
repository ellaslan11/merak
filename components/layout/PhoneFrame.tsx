"use client";

import { PhoneStatusBar } from "./PhoneStatusBar";

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-5 md:p-10 bg-[#1c1917]">
      <div className="relative w-full max-w-[390px]">
        {/* Soft outer glow */}
        <div
          className="absolute -inset-4 rounded-[3.5rem] opacity-40 blur-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(196, 165, 116, 0.25) 0%, transparent 70%)",
          }}
        />

        {/* Device */}
        <div className="relative rounded-[3rem] p-[11px] bg-gradient-to-b from-[#3d3835] to-[#2a2624] shadow-merak-lg ring-1 ring-white/10">
          <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 pointer-events-none" />

          <div className="relative rounded-[2.35rem] overflow-hidden flex flex-col min-h-[780px] max-h-[90vh] merak-screen shadow-inner">
            <PhoneStatusBar />
            <div className="flex-1 overflow-y-auto overflow-x-hidden phone-scroll">
              {children}
            </div>
            <div className="shrink-0 py-3 flex justify-center bg-cream/60 backdrop-blur-md border-t border-[var(--border)] safe-pb">
              <div className="w-[134px] h-[5px] rounded-full bg-espresso/15" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
