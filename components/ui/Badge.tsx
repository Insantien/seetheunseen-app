import { cn } from "@/lib/utils/cn";

type BadgeVariant = "orange" | "coral" | "green" | "grey" | "dark" | "outline";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  orange:  "bg-brand-orange/10 text-brand-orange",
  coral:   "bg-brand-coral/10 text-brand-coral",
  green:   "bg-emerald-50 text-emerald-700",
  grey:    "bg-gray-100 text-gray-600",
  dark:    "bg-brand-dark text-white",
  outline: "border border-brand-orange text-brand-orange bg-transparent",
};

const sizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
};

export function Badge({
  label,
  variant = "orange",
  size = "md",
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-semibold rounded-full tracking-wide uppercase",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "inline-block w-1.5 h-1.5 rounded-full",
            variant === "green" ? "bg-emerald-500" : "bg-current"
          )}
        />
      )}
      {label}
    </span>
  );
}
