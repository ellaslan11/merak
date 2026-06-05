"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/home", label: "Home" },
  { href: "/feed", label: "Feed" },
  { href: "/weekly-letter", label: "Letter" },
  { href: "/capsules/florence-week-3", label: "Capsule" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-cream/90 backdrop-blur-md border-t border-espresso/5 md:hidden">
      <div className="flex justify-around py-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-xs font-medium px-3 py-1 rounded-full transition-colors",
              pathname === link.href || pathname.startsWith(link.href + "/")
                ? "text-espresso bg-espresso/5"
                : "text-warm-gray"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
