"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/home", label: "Home" },
  { href: "/feed", label: "Memory feed" },
  { href: "/notes/today", label: "Today's note" },
  { href: "/weekly-letter", label: "Weekly letter" },
  { href: "/capsules/florence-week-3", label: "Campus Week" },
  { href: "/settings", label: "Settings" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-espresso/5 bg-white/30 p-6 gap-1 min-h-screen">
      <Link href="/home" className="heading-serif text-xl text-espresso mb-8">
        Merak
      </Link>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "px-3 py-2 rounded-lg text-sm transition-colors",
            pathname === link.href
              ? "bg-espresso/5 text-espresso font-medium"
              : "text-warm-gray hover:text-espresso hover:bg-espresso/5"
          )}
        >
          {link.label}
        </Link>
      ))}
    </aside>
  );
}
