"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { DailyAuraResult, UserProfile } from "@/lib/aura/types";
import { AuraRecordRow } from "@/components/prototype/AuraRecordRow";
import { ColorDots } from "@/components/prototype/ColorDots";

function weekdayText() {
  return new Intl.DateTimeFormat("zh-CN", { weekday: "short" }).format(new Date());
}

function englishWeekdayText() {
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(new Date());
}

function monthDay() {
  const now = new Date();
  return `${String(now.getMonth() + 1).padStart(2, "0")} / ${String(now.getDate()).padStart(2, "0")}`;
}

export function HomeLuxuryScreen({
  profile,
  result,
  recent,
  onGenerate,
  onOpenRecent,
  onOpenProfile,
}: {
  profile: UserProfile;
  result: DailyAuraResult;
  recent?: DailyAuraResult;
  onGenerate: () => void;
  onOpenRecent: () => void;
  onOpenProfile: () => void;
}) {
  const colorItems = [
    { label: "主色", name: result.primaryColor.name, hex: result.primaryColor.hex },
    { label: "辅助色", name: result.secondaryColor.name, hex: result.secondaryColor.hex },
    { label: "点缀色", name: result.accentColor.name, hex: result.accentColor.hex },
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
          <h1 className="font-serif text-[42px] font-medium leading-none tracking-normal text-[#292521]">
            Today Aura
          </h1>
          <p className="mt-4 text-[16px] font-semibold tracking-[0.02em] text-[#9B9288]">
            你的每日气场指南
          </p>
        </div>
        <button
          aria-label="打开我的页"
          className="mt-1 size-10 overflow-hidden rounded-full border border-[#E2D8CB] bg-[#EFE7DC]"
          onClick={onOpenProfile}
          type="button"
        >
          <Image
            alt=""
            className="h-full w-full object-cover"
            height={40}
            src="/images/today-aura-profile-avatar.png"
            width={40}
          />
        </button>
      </header>

      <section className="mt-12">
        <div className="flex items-end gap-4">
          <p className="font-serif text-[42px] font-medium leading-none tracking-normal text-[#292521]">
            {monthDay()}
          </p>
          <p className="pb-1 text-[14px] font-semibold text-[#7A6E62]">
            {weekdayText()} {englishWeekdayText()}.
          </p>
        </div>
        <p className="mt-3 text-[13px] font-medium text-[#9B9288]">
          乙巳年 · 今日宜清醒出现
        </p>
      </section>

      <section className="mt-11">
        <h2 className="text-[40px] font-semibold leading-[1.13] tracking-normal text-[#292521]">
          今天想以
          <br />
          什么状态出现？
        </h2>
      </section>

      <section className="mt-11 flex justify-between">
        <ColorDots colors={colorItems} showNames size="lg" />
      </section>

      <motion.button
        className="mt-9 flex h-14 w-full items-center justify-center rounded-[15px] bg-[#171411] text-[16px] font-semibold text-[#D9BE84] shadow-[0_12px_28px_rgba(31,27,24,0.18)]"
        onClick={onGenerate}
        type="button"
        whileTap={{ scale: 0.98 }}
      >
        生成今日气场 ✨
      </motion.button>

      <section className="mt-10 border-t border-[#E2D8CB] pt-6">
        <p className="mb-4 text-[15px] font-semibold text-[#9B9288]">最近记录</p>
        <motion.div
          className="overflow-hidden rounded-[22px] border border-[#E2D8CB] bg-[#FFFCF7] shadow-[0_10px_28px_rgba(60,54,48,0.06)]"
          whileTap={{ y: -1 }}
        >
          <AuraRecordRow
            fallbackDate="05 / 19"
            fallbackTitle={`${profile.commonStyles[0] ?? "清冷"} · 知性 · 专注`}
            onClick={onOpenRecent}
            result={recent ?? result}
            showDots
          />
        </motion.div>
      </section>
    </motion.div>
  );
}
