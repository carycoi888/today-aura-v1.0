"use client";

import { motion } from "motion/react";
import type { DailyAuraResult } from "@/lib/aura/types";

type VisualPreset = {
  baseColor: string;
  shadowColor: string;
  glowColor: string;
  orbClass: string;
};

const auraVisualMap: Record<string, VisualPreset> = {
  灰蓝: {
    baseColor: "#8EA1A8",
    shadowColor: "rgba(142,161,168,0.25)",
    glowColor: "rgba(142,161,168,0.34)",
    orbClass: "right-[-18px] top-[92px] h-[184px] w-[196px]",
  },
  奶油白: {
    baseColor: "#EFE7DC",
    shadowColor: "rgba(185,154,99,0.16)",
    glowColor: "rgba(239,231,220,0.62)",
    orbClass: "right-[-20px] top-[104px] h-[180px] w-[205px]",
  },
  炭褐: {
    baseColor: "#3C3630",
    shadowColor: "rgba(60,54,48,0.22)",
    glowColor: "rgba(60,54,48,0.20)",
    orbClass: "right-[-34px] top-[114px] h-[158px] w-[186px]",
  },
  玫瑰雾: {
    baseColor: "#D8A7A0",
    shadowColor: "rgba(216,167,160,0.18)",
    glowColor: "rgba(216,167,160,0.24)",
    orbClass: "right-[-26px] top-[100px] h-[174px] w-[196px]",
  },
  香槟金: {
    baseColor: "#B99A63",
    shadowColor: "rgba(185,154,99,0.18)",
    glowColor: "rgba(185,154,99,0.30)",
    orbClass: "right-[-24px] top-[100px] h-[168px] w-[194px]",
  },
};

function resolveVisual(result: DailyAuraResult): VisualPreset {
  if (auraVisualMap[result.primaryColor.name]) return auraVisualMap[result.primaryColor.name];
  if (result.title.includes("温柔") || result.dailyQuote.includes("柔和")) return auraVisualMap["玫瑰雾"];
  if (result.title.includes("强") || result.title.includes("锋")) return auraVisualMap["炭褐"];
  if (result.title.includes("明亮") || result.input.desiredAura === "被看见") return auraVisualMap["香槟金"];
  if (result.title.includes("松弛") || result.title.includes("自在")) return auraVisualMap["奶油白"];
  return {
    baseColor: result.primaryColor.hex,
    shadowColor: `${result.primaryColor.hex}33`,
    glowColor: `${result.primaryColor.hex}44`,
    orbClass: "right-[-18px] top-[96px] h-[178px] w-[198px]",
  };
}

export function DailyAuraBackground({ result }: { result: DailyAuraResult }) {
  const visual = resolveVisual(result);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className={`absolute rounded-[999px] blur-[1px] ${visual.orbClass}`}
        initial={{ opacity: 0, scale: 0.96 }}
        key={`${result.primaryColor.name}-${result.title}`}
        style={{
          background: `
            radial-gradient(circle at 36% 28%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.20) 24%, transparent 44%),
            radial-gradient(circle at 64% 72%, ${visual.shadowColor} 0%, transparent 58%),
            radial-gradient(ellipse at center, ${visual.baseColor} 0%, ${visual.baseColor} 44%, ${visual.glowColor} 74%, transparent 100%)
          `,
          boxShadow: `0 34px 70px ${visual.shadowColor}`,
          mixBlendMode: "multiply",
        }}
        transition={{ duration: 0.52, ease: "easeOut" }}
      />
      <motion.div
        animate={{ opacity: 0.58, scale: 1 }}
        className="absolute bottom-[72px] right-[-54px] h-[138px] w-[270px] rounded-[100%] blur-[2px]"
        initial={{ opacity: 0, scale: 0.98 }}
        style={{
          background: `
            radial-gradient(ellipse at 50% 38%, rgba(255,252,247,0.82) 0%, rgba(239,231,220,0.62) 36%, rgba(185,154,99,0.12) 72%, transparent 100%)
          `,
          transform: "rotate(-10deg)",
        }}
        transition={{ duration: 0.58, ease: "easeOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 12%, rgba(255,255,255,0.95) 0 1px, transparent 1px),
            radial-gradient(circle at 72% 70%, rgba(60,54,48,0.18) 0 1px, transparent 1px)
          `,
          backgroundSize: "18px 18px, 24px 24px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFCF7]/90 via-[#FFFCF7]/42 to-transparent" />
    </div>
  );
}
