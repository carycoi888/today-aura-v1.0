import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AuraButton({
  children,
  className,
  tone = "primary",
  disabled = false,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  tone?: "primary" | "soft" | "ghost";
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      className={cn(
        "inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A63]/40",
        tone === "primary" &&
          "bg-[#3C3630] text-[#FFFCF7] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_30px_rgba(60,54,48,0.14)] hover:bg-[#332E29]",
        tone === "soft" &&
          "border border-[#D7CBBB] bg-[#EFE7DC] text-[#292521] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_8px_22px_rgba(60,54,48,0.06)] hover:bg-[#E8DFD2]",
        tone === "ghost" &&
          "border border-transparent bg-transparent text-[#5E564F] hover:bg-[#EFE7DC]",
        disabled &&
          "cursor-not-allowed border border-[#E2D8CB] bg-[#E8DFD2] text-[#9B9288] shadow-none hover:bg-[#E8DFD2]",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export function auraButtonClass({
  tone = "primary",
  disabled = false,
  className,
}: {
  tone?: "primary" | "soft" | "ghost";
  disabled?: boolean;
  className?: string;
} = {}) {
  return cn(
    "inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A63]/40",
    tone === "primary" &&
      "bg-[#3C3630] text-[#FFFCF7] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_30px_rgba(60,54,48,0.14)] hover:bg-[#332E29]",
    tone === "soft" &&
      "border border-[#D7CBBB] bg-[#EFE7DC] text-[#292521] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_8px_22px_rgba(60,54,48,0.06)] hover:bg-[#E8DFD2]",
    tone === "ghost" &&
      "border border-transparent bg-transparent text-[#5E564F] hover:bg-[#EFE7DC]",
    disabled &&
      "cursor-not-allowed border border-[#E2D8CB] bg-[#E8DFD2] text-[#9B9288] shadow-none hover:bg-[#E8DFD2]",
    className,
  );
}
