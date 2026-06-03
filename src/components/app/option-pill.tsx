import { cn } from "@/lib/utils";

export function OptionPill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex min-h-[42px] items-center gap-2 rounded-full border px-4 text-sm font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-colors duration-200",
        selected
          ? "border-[#B99A63]/70 bg-[#F1E6D6] text-[#292521] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.58),0_8px_20px_rgba(60,54,48,0.06)]"
          : "border-[#E2D8CB] bg-[#FFFCF7]/82 text-[#5E564F] hover:bg-[#EFE7DC] hover:text-[#292521]",
      )}
    >
      <span
        className={cn(
          "h-4 w-1 rounded-full",
          selected ? "bg-[#B99A63]" : "bg-[#D8CDBB]",
        )}
      />
      {label}
    </button>
  );
}
