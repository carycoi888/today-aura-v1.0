"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import type { DailyAuraResult, UserProfile } from "@/lib/aura/types";
import { AuraRecordRow } from "@/components/prototype/AuraRecordRow";
import { ColorDots } from "@/components/prototype/ColorDots";

const preferredPalette = [
  { name: "深海蓝", hex: "#1F3648" },
  { name: "灰蓝", hex: "#627A8D" },
  { name: "雾蓝", hex: "#8EA1A8" },
  { name: "燕麦", hex: "#C8B8A2" },
  { name: "奶油白", hex: "#EFE7DC" },
  { name: "柔白", hex: "#FFFCF7" },
];

const accentPalette = [
  { name: "陶土橙", hex: "#B37056" },
  { name: "灰紫", hex: "#8A7A7D" },
  { name: "炭灰", hex: "#53504C" },
  { name: "炭黑", hex: "#232323" },
];

export function ProfileLuxuryScreen({
  profile,
  result,
  history,
  onEdit,
  onOpenResult,
}: {
  profile: UserProfile;
  result: DailyAuraResult;
  history: DailyAuraResult[];
  onEdit: () => void;
  onOpenResult: (result?: DailyAuraResult) => void;
}) {
  const tags = profile.commonStyles.slice(0, 3);
  const records = history.length
    ? history.slice(0, 2)
    : [
        undefined,
        undefined,
      ];

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="min-h-full bg-[#F7F1E8] px-1"
      initial={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.26 }}
    >
      <header className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[40px] font-medium leading-none text-[#292521]">
            {profile.nickname || "Cary"}
          </h1>
          <p className="mt-4 text-[16px] font-semibold text-[#9B9288]">你的气场关键词</p>
        </div>
        <button
          aria-label="编辑档案"
          className="size-[70px] overflow-hidden rounded-full border border-[#E2D8CB] bg-[#EFE7DC]"
          onClick={onEdit}
          type="button"
        >
          <Image
            alt=""
            className="h-full w-full object-cover"
            height={70}
            src="/images/today-aura-profile-avatar.png"
            width={70}
          />
        </button>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            className="flex h-8 items-center rounded-full bg-[#EFE7DC] px-5 text-[14px] font-semibold text-[#5E564F]"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>

      <motion.section
        animate={{ opacity: 1, y: 0 }}
        className="mt-7 overflow-hidden rounded-[24px] border border-[#D8CBBE] bg-[#FFFCF7] shadow-[0_14px_36px_rgba(60,54,48,0.12)]"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.08, duration: 0.26 }}
      >
        <div
          className="min-h-[142px] p-6 text-[#FFFCF7]"
          style={{ backgroundColor: result.primaryColor.hex || "#1F3648" }}
        >
          <p className="text-[14px] font-semibold opacity-82">我的目标气场</p>
          <h2 className="mt-4 text-[28px] font-semibold leading-tight tracking-normal">
            清澈专注 · 优雅从容
          </h2>
          <p className="mt-4 text-[16px] font-semibold leading-7 text-[#F4EEE7]/88">
            在细节中，保持清醒与温度。
          </p>
        </div>

        <div className="space-y-7 p-6">
          <div>
            <p className="mb-4 text-[15px] font-semibold text-[#5E564F]">偏好颜色</p>
            <ColorDots colors={preferredPalette} size="md" />
          </div>
          <div>
            <p className="mb-4 text-[15px] font-semibold text-[#5E564F]">点缀颜色</p>
            <ColorDots colors={accentPalette} size="md" />
          </div>
        </div>
      </motion.section>

      <section className="mt-8">
        <button
          className="mb-4 flex w-full items-center justify-between text-left"
          onClick={() => onOpenResult(history[0])}
          type="button"
        >
          <span className="text-[16px] font-semibold text-[#5E564F]">最近气场记录</span>
          <ChevronRight className="size-4 text-[#B8AEA3]" />
        </button>
        <div className="overflow-hidden rounded-[22px] border border-[#E2D8CB] bg-[#FFFCF7] shadow-[0_10px_28px_rgba(60,54,48,0.06)]">
          <AuraRecordRow
            fallbackDate="05 / 20"
            fallbackTitle="清冷 · 知性 · 专注"
            onClick={() => onOpenResult(records[0])}
            result={records[0]}
          />
          <div className="mx-4 h-px bg-[#E2D8CB]" />
          <AuraRecordRow
            fallbackDate="05 / 19"
            fallbackTitle="松弛 · 自在 · 放松"
            onClick={() => onOpenResult(records[1] ?? result)}
            result={records[1]}
          />
        </div>
      </section>
    </motion.div>
  );
}
