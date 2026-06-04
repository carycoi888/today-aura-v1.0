"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import type { DailyAuraResult } from "@/lib/aura/types";
import { ColorDots } from "@/components/prototype/ColorDots";

function getShortDate(date: string) {
  const match = date.match(/(\d+)月(\d+)日/);
  if (!match) return "05 / 20";
  return `${match[1].padStart(2, "0")} / ${match[2].padStart(2, "0")}`;
}

export function AuraRecordRow({
  result,
  fallbackDate,
  fallbackTitle,
  onClick,
  showDots = false,
}: {
  result?: DailyAuraResult;
  fallbackDate?: string;
  fallbackTitle?: string;
  onClick: () => void;
  showDots?: boolean;
}) {
  const title = result
    ? `${result.input.desiredAura || "清冷"} · 知性 · 专注`
    : fallbackTitle ?? "清冷 · 知性 · 专注";
  const date = result ? getShortDate(result.date) : fallbackDate ?? "05 / 20";
  const colors = result
    ? [
        { name: result.primaryColor.name, hex: result.primaryColor.hex },
        { name: result.secondaryColor.name, hex: result.secondaryColor.hex },
        { name: result.accentColor.name, hex: result.accentColor.hex },
      ]
    : [
        { name: "深海蓝", hex: "#1F3648" },
        { name: "霜皮白", hex: "#EFE7DC" },
        { name: "雾灰", hex: "#A8A198" },
      ];

  return (
    <motion.button
      className="flex min-h-[62px] w-full items-center gap-4 px-4 text-left"
      onClick={onClick}
      type="button"
      whileTap={{ scale: 0.99 }}
    >
      <span className="w-[78px] shrink-0 whitespace-nowrap font-serif text-[18px] font-semibold text-[#3C3630]">
        {date}
      </span>
      <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-[#5E564F]">
        {title}
      </span>
      {showDots ? <ColorDots colors={colors} size="sm" /> : null}
      <ChevronRight className="size-4 shrink-0 text-[#B8AEA3]" />
    </motion.button>
  );
}
