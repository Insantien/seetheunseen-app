import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonVariant = "brand" | "outline" | "ghost" | "white";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

type ButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };

type AnchorProps = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

type Props = ButtonProps | AnchorProps;

const variantStyles: Record<ButtonVariant, string> = {
  brand:
    "bg-gradient-to-br from-brand-orange to-brand-coral text-white hover:shadow-brand hover:-translate-y-px",
  outline:
    "border-[1.5px] border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white",
  ghost:
    "text-brand-orange hover:bg-brand-orange/10",
  white:
    "bg-white text-brand-dark hover:bg-brand-light hover:shadow-card",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2 gap-1.5",
  md: "text-sm px-6 py-3 gap-2",
  lg: "text-base px-8 py-4 gap-2",
};

export function Button({
  variant = "brand",
  size = "md",
  loading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  className,
  children,
  disabled,
  as,
  ...rest
}: Props) {
  const base = cn(
    "inline-flex items-center justify-center font-semibold rounded-full",
    "transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand-orange",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className
  );

  const content = loading ? (
    <>
      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
      {children}
    </>
  ) : (
    <>
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </>
  );

  if (as === "a") {
    const { as: _a, ...anchorRest } = rest as AnchorProps;
    return (
      <a className={base} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={base}
      disabled={disabled ?? loading}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
