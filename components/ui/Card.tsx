import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "flat" | "accent";
}

export function Card({
  children,
  className,
  onClick,
  variant = "default",
}: CardProps) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "p-5 text-left w-full",
        variant === "default" && "merak-card",
        variant === "flat" && "merak-card-flat",
        variant === "accent" &&
          "rounded-card border border-rose-muted/20 bg-gradient-to-br from-gold-soft/80 to-rose-soft/50 shadow-merak-sm",
        onClick && "merak-card-interactive cursor-pointer",
        className
      )}
    >
      {children}
    </Comp>
  );
}
