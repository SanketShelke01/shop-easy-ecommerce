import React from "react";
import { cn } from "../../lib/utils";

export function Avatar({ className, ...props }) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    />
  );
}

export function AvatarFallback({ className, children }) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-indigo-600 text-white font-semibold",
        className
      )}
    >
      {children}
    </div>
  );
}
