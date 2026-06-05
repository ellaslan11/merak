import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "olive" | "gold";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium",
        variant === "default" && "bg-espresso/[0.06] text-espresso-soft",
        variant === "olive" && "bg-olive-soft text-olive",
        variant === "gold" && "bg-gold-soft text-espresso-soft",
        className
      )}
    >
      {children}
    </span>
  );
}
