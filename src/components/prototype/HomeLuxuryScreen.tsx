"use client";

import { CalendarDays, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import type { DailyAuraResult, UserProfile } from "@/lib/aura/types";
import { DailyAuraBackground } from "@/components/prototype/DailyAuraBackground";

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
  onCalendarHint,
}: {
  profile: UserProfile;
  result: DailyAuraResult;
  recent?: DailyAuraResult;
  onGenerate: () => void;
  onOpenRecent: () => void;
  onOpenProfile: () => void;
  onCalendarHint?: () => void;
}) {
  const keywords = buildAuraKeywords(result, profile);
  const recentResult = recent ?? result;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="min-h-full bg-[radial-gradient(circle_at_50%_0%,#FFFCF7_0%,#F7F1E8_46%,#F8F3EA_100%)] px-1"
      initial={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.26 }}
    >
      <header className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[48px] font-medium leading-[0.92] tracking-normal text-[#292521]">
            Today Aura
          </h1>
          <p className="mt-1.5 text-[15px] font-semibold tracking-[0.02em] text-[#9B9288]">
            你的每日气场指南
          </p>
        </div>
        <button
          aria-label="打开我的页"
          className="mt-1 size-11 overflow-hidden rounded-full border border-[#E2D8CB] bg-[#EFE7DC]"
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

      <section className="mt-6 flex items-center gap-3 rounded-[20px] border border-[#E2D8CB] bg-[#FFFCF7] px-4 py-2.5 shadow-[0_8px_28px_rgba(60,54,48,0.04)]">
        <p className="shrink-0 font-serif text-[36px] font-medium leading-none tracking-normal text-[#292521]">
          {monthDay()}
        </p>
        <div className="min-w-0 flex-1">
          <p className="whitespace-nowrap text-[13px] font-semibold text-[#7A6E62]">
            {weekdayText()} {englishWeekdayText()}.
          </p>
          <p className="mt-1 truncate text-[13px] font-medium text-[#9B9288]">
            乙巳年 · 今日宜清醒出现
          </p>
        </div>
        <button
          className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-[#E2D8CB] bg-[#FFFCF7] px-3 text-sm font-semibold text-[#5E564F]"
          onClick={onCalendarHint}
          type="button"
        >
          <CalendarDays className="size-4" />
          日历
        </button>
      </section>

      <section className="mt-6 text-center">
        <h2
          className="text-[40px] font-semibold leading-[1.08] tracking-normal text-[#292521]"
          style={{ fontFamily: '"Songti SC", "Noto Serif CJK SC", STSong, SimSun, serif' }}
        >
          今天想以
          <br />
          什么状态出现？
        </h2>
      </section>

      <motion.section
        animate={{ opacity: 1, y: 0 }}
        className="relative mt-6 min-h-[clamp(340px,40vh,430px)] overflow-hidden rounded-[30px] border border-[#E2D8CB] bg-[#FFFCF7] px-6 pb-5 pt-6 shadow-[0_18px_48px_rgba(60,54,48,0.10)]"
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <DailyAuraBackground result={result} />
        <div className="relative z-[1] flex min-h-[310px] flex-col">
          <div>
            <p className="text-[14px] font-semibold text-[#5E564F]">主色</p>
            <h3
              className="mt-2.5 text-[40px] font-semibold leading-none text-[#292521]"
              style={{ fontFamily: '"Songti SC", "Noto Serif CJK SC", STSong, SimSun, serif' }}
            >
              {result.primaryColor.name}
            </h3>
            <p className="mt-3 text-[17px] font-semibold text-[#8C8278]">{keywords.join(" · ")}</p>
            <span
              className="mt-4 block size-11 rounded-full border border-[#D8CFC2]"
              style={{ backgroundColor: result.primaryColor.hex }}
            />
          </div>

          <div className="mt-auto">
            <div className="grid grid-cols-[1fr_1px_1fr] items-start gap-6 pb-3.5">
              <ColorInfo label="辅助色" name={result.secondaryColor.name} hex={result.secondaryColor.hex} />
              <div className="h-[64px] bg-[#E2D8CB]" />
              <ColorInfo label="点缀色" name={result.accentColor.name} hex={result.accentColor.hex} />
            </div>
            <motion.button
              className="flex h-12 w-full items-center justify-center rounded-[18px] bg-[#171411] text-[16px] font-semibold text-[#F3D58C] shadow-[0_14px_30px_rgba(31,27,24,0.20)]"
              onClick={onGenerate}
              type="button"
              whileTap={{ scale: 0.98 }}
            >
              生成今日气场 ✨
            </motion.button>
          </div>
        </div>
      </motion.section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[17px] font-semibold text-[#292521]">最近记录</p>
          <button className="flex items-center gap-1 text-sm font-semibold text-[#9B9288]" onClick={onOpenRecent} type="button">
            查看全部
            <ChevronRight className="size-4" />
          </button>
        </div>
        <motion.button
          className="flex min-h-[76px] w-full items-center gap-4 rounded-[20px] border border-[#E2D8CB] bg-[#FFFCF7] px-4 text-left shadow-[0_8px_22px_rgba(60,54,48,0.04)]"
          onClick={onOpenRecent}
          type="button"
          whileTap={{ scale: 0.99 }}
        >
          <div className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-[#F8F3EA]">
            <span className="size-10 rounded-full border border-[#E2D8CB]" style={{ backgroundColor: recentResult.primaryColor.hex }} />
            <span className="absolute right-1 top-1 size-4 rounded-full border border-[#E2D8CB]" style={{ backgroundColor: recentResult.secondaryColor.hex }} />
            <span className="absolute bottom-1 right-2 size-4 rounded-full border border-[#E2D8CB]" style={{ backgroundColor: recentResult.accentColor.hex }} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-serif text-[22px] font-semibold leading-none text-[#3C3630]">
              {shortSlashDate(recentResult.date)}
            </p>
            <p className="mt-2 truncate text-[15px] font-semibold text-[#7A6E62]">
              {buildAuraKeywords(recentResult, profile).join(" · ")}
            </p>
          </div>
          <ChevronRight className="size-5 shrink-0 text-[#B8AEA3]" />
        </motion.button>
      </section>
    </motion.div>
  );
}

function ColorInfo({ label, name, hex }: { label: string; name: string; hex: string }) {
  return (
    <div>
      <p className="text-[14px] font-semibold text-[#5E564F]">{label}</p>
      <p
        className="mt-1.5 text-[24px] font-semibold leading-none text-[#292521]"
        style={{ fontFamily: '"Songti SC", "Noto Serif CJK SC", STSong, SimSun, serif' }}
      >
        {name}
      </p>
      <span className="mt-3 block size-9 rounded-full border border-[#D8CFC2]" style={{ backgroundColor: hex }} />
    </div>
  );
}

function buildAuraKeywords(result: DailyAuraResult, profile: UserProfile) {
  const keywords = [
    result.input.desiredAura || profile.commonStyles[0] || "清冷",
    profile.commonStyles.includes("知性") ? "知性" : result.input.scene === "面试" ? "可信" : "知性",
    result.input.mood === "焦虑" || result.input.mood === "烦躁" ? "稳定" : result.input.energy === "低" ? "提气" : "克制",
  ];
  return Array.from(new Set(keywords)).slice(0, 3);
}

function shortSlashDate(date: string) {
  const match = date.match(/(\d+)月(\d+)日/);
  if (!match) return "06/03";
  return `${match[1].padStart(2, "0")}/${match[2].padStart(2, "0")}`;
}
