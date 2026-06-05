"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Smartphone,
  Layers,
  Mail,
  Sparkles,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/home", label: "Home", Icon: Home },
  { href: "/phone", label: "Sources", Icon: Smartphone },
  { href: "/feed", label: "Feed", Icon: Layers },
  { href: "/weekly-letter", label: "Letter", Icon: Mail },
  { href: "/capsules/florence-week-3", label: "Capsule", Icon: Sparkles },
];

export function PhoneAppShell({
  children,
  title,
  showHeader = true,
}: {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
}) {
  const pathname = usePathname();
  const hideNav = pathname === "/onboarding" || pathname === "/";

  return (
    <div className="flex flex-col min-h-full">
      {showHeader && !hideNav && (
        <header className="shrink-0 px-5 pt-1 pb-3 flex items-center justify-between gap-3">
          <Link
            href="/home"
            className="heading-serif text-[22px] leading-none text-espresso"
          >
            Merak
          </Link>
          <div className="flex items-center gap-2 min-w-0">
            {title && (
              <span className="text-xs font-medium text-warm-gray truncate max-w-[120px]">
                {title}
              </span>
            )}
            <Link
              href="/settings"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-surface border border-[var(--border)] text-warm-gray hover:text-espresso transition-colors shadow-merak-sm"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" strokeWidth={1.75} />
            </Link>
          </div>
        </header>
      )}
      <main className="flex-1 px-5 pb-3">{children}</main>
      {!hideNav && (
        <nav className="shrink-0 mx-3 mb-2 px-1 py-2 bg-surface/90 backdrop-blur-xl rounded-2xl border border-[var(--border)] shadow-merak safe-pb">
          <div className="flex justify-between items-center">
            {tabs.map((tab) => {
              const active =
                pathname === tab.href ||
                pathname.startsWith(tab.href + "/");
              const Icon = tab.Icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "merak-nav-pill",
                    active ? "merak-nav-pill-active" : "merak-nav-pill-inactive"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-[18px] h-[18px]",
                      active ? "stroke-cream" : "stroke-current"
                    )}
                    strokeWidth={active ? 2 : 1.75}
                  />
                  <span className="text-[10px] font-semibold">{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
