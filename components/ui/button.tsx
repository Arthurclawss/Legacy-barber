import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-body font-medium uppercase tracking-[0.15em] transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--legacy-warm)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants: Record<string, string> = {
      primary:
        "bg-[var(--legacy-white)] text-[var(--legacy-black)] hover:bg-[var(--legacy-warm)] hover:scale-[1.02] active:scale-[0.98]",
      secondary:
        "bg-transparent text-[var(--legacy-white)] border border-[var(--legacy-gray)] hover:border-[var(--legacy-warm)] hover:text-[var(--legacy-warm)] hover:scale-[1.02] active:scale-[0.98]",
      ghost:
        "bg-transparent text-[var(--legacy-silver)] hover:text-[var(--legacy-white)] hover:bg-white/5",
    };

    const sizes: Record<string, string> = {
      default: "px-6 py-3 text-xs",
      lg: "px-10 py-4 text-sm",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
