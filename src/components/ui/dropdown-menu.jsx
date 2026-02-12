import React, { useState, createContext, useContext } from "react";
import { cn } from "../../lib/utils";

const DropdownContext = createContext();

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ children }) {
  const { setOpen } = useContext(DropdownContext);
  return (
    <div onClick={() => setOpen((o) => !o)} className="cursor-pointer">
      {children}
    </div>
  );
}

export function DropdownMenuContent({ className, align = "end", children }) {
  const { open } = useContext(DropdownContext);
  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 min-w-[10rem] rounded-lg border bg-white shadow-md",
        align === "end" ? "right-0" : "left-0",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ className, onClick, children }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
}
