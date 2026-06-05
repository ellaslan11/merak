"use client";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "soft";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
        "rounded-full",
        variant === "primary" &&
          "bg-espresso text-cream shadow-merak hover:bg-espresso-soft",
        variant === "secondary" &&
          "bg-surface text-espresso border border-[var(--border)] shadow-merak-sm hover:border-espresso/15 hover:shadow-merak",
        variant === "soft" &&
          "bg-gold-soft text-espresso hover:bg-rose-soft",
        variant === "ghost" &&
          "text-espresso-soft hover:bg-espresso/[0.05]",
        size === "sm" && "px-4 py-2 text-[13px]",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-3.5 text-[15px]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
