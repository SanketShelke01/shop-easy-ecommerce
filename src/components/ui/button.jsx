import React from "react";
import { cn } from "../../lib/utils";

export function Button({
  className,
  variant = "default",
  size = "md",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? "span" : "button";

  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    ghost: "bg-transparent hover:bg-gray-100",
    outline: "border border-gray-300 hover:bg-gray-100",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
