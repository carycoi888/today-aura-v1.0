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
        "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
        selected
          ? "border-[#B99A63]/70 bg-[#F1E6D6] text-[#292521] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5),0_8px_20px_rgba(60,54,48,0.06)]"
          : "border-[#E2D8CB] bg-[#FFFCF7] text-[#5E564F] hover:bg-[#EFE7DC] hover:text-[#292521]",
      )}
    >
      {selected ? <span className="size-1.5 rounded-full bg-[#B99A63]" /> : null}
      {label}
    </button>
  );
}
