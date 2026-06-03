"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Eye, Settings2, Sparkles } from "lucide-react";
import { auraButtonClass } from "@/components/app/aura-button";
import { PageShell } from "@/components/app/page-shell";
import { COLOR_LIBRARY, DEFAULT_PROFILE } from "@/lib/aura-options";
import {
  getCurrentResult,
  getProfile,
  hasStoredProfile,
} from "@/lib/aura-storage";
import type { AuraProfile, AuraResult } from "@/lib/aura-types";

const shortWeekdayFormatter = new Intl.DateTimeFormat("zh-CN", {
  weekday: "short",
});

export default function Home() {
  const [profile, setProfile] = useState<AuraProfile>(DEFAULT_PROFILE);
  const [hasProfile, setHasProfile] = useState(false);
  const [currentResult, setCurrentResult] = useState<AuraResult | null>(null);
  const today = new Date();
  const heroColor =
    currentResult?.colors.primary ?? getDisplayColor("灰蓝");
  const supportColor =
    getVisibleSupportColor(currentResult?.colors.secondary);
  const avoidColor =
    currentResult?.colors.avoid ?? getDisplayColor("炭褐");
  const auraTitle = currentResult?.title ?? "清透专注";
  const heroSentence = formatHeroSentence(
    currentResult?.shortSentence ?? "用清醒感开始今天",
  );
  const dateParts = formatDateParts(today);
  const heroTextColor = getReadableTextColor(heroColor.hex);
  const displayProfileTags = (hasProfile ? profile.styleTags : ["清冷", "松弛", "知性"])
    .slice(0, 3)
    .join(" · ");

  useEffect(() => {
    setProfile(getProfile());
    setHasProfile(hasStoredProfile());
    setCurrentResult(getCurrentResult());
  }, []);

  return (
    <PageShell>
      <div className="animate-aura-card-rise pb-0">
        <header className="flex items-start justify-between px-[8px]">
          <div>
            <p className="font-serif text-[20px] font-semibold leading-none tracking-normal text-[#292521]">
              Today Aura
            </p>
            <p className="mt-[9px] text-[14px] font-medium leading-none tracking-normal text-[#7A6E62]">
              每日审美日历
            </p>
          </div>
          <Link
            className="flex size-[43px] items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF7]/72 text-[#3C3630] shadow-[0_8px_22px_rgba(60,54,48,0.05)] transition-colors hover:bg-[#F8F3EA]"
            href="/profile"
            aria-label="打开设置"
          >
            <Settings2 className="size-[21px]" strokeWidth={1.85} aria-hidden="true" />
          </Link>
        </header>

        <section className="relative mx-auto mt-[15px] min-h-[476px] w-[calc(100%-10px)] overflow-hidden rounded-[34px] border border-[#E2D8CB] bg-[#FFFCF7] px-[22px] py-[22px] shadow-[0_18px_45px_rgba(58,49,39,0.10)]">
          <Image
            alt=""
            aria-hidden="true"
            className="absolute -bottom-[86px] -right-[96px] z-0 h-[270px] w-[220px] object-cover object-[82%_100%] opacity-[0.13] mix-blend-luminosity"
            height={900}
            priority
            src="/images/today-aura-hero-still-life.png"
            width={480}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[64px] top-[150px] size-[180px] rounded-full bg-[#DDE6EA]/45 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-58px] top-[40px] size-[150px] rounded-full bg-[#E8D8BC]/42 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:radial-gradient(#B99A63_0.5px,transparent_0.5px)] [background-size:12px_12px]"
          />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2 rounded-full border border-[#E2D8CB] bg-[#FFFCF7]/78 px-3 py-2 text-[12px] font-medium text-[#7A6E62] shadow-[0_8px_20px_rgba(60,54,48,0.04)]">
                <CalendarDays className="size-4 text-[#B99A63]" strokeWidth={1.8} />
                {dateParts.weekday}
              </div>
              <div className="text-right">
                <p className="font-serif text-[42px] font-semibold leading-none text-[#292521]">
                  {dateParts.day}
                </p>
                <p className="mt-1 text-[12px] font-medium text-[#9B9288]">
                  {dateParts.month}
                </p>
              </div>
            </div>

            <div className="mt-[26px]">
              <p className="text-[13px] font-medium text-[#B99A63]">今日气场日历</p>
              <h1 className="mt-2 text-[33px] font-semibold leading-[1.12] text-[#292521]">
                今天想以什么状态出现？
              </h1>
              <p className="mt-3 max-w-[17rem] text-[14px] leading-6 text-[#5E564F]">
                出门前 1 分钟，定好今天的颜色、穿搭和整体气场。
              </p>
            </div>

            <div
              className="mt-[22px] overflow-hidden rounded-[28px] p-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_18px_38px_rgba(57,48,38,0.14)]"
              style={{ backgroundColor: heroColor.hex, color: heroTextColor }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[12px] font-medium opacity-80">今日主色</p>
                  <h2 className="mt-2 font-serif text-[48px] font-semibold leading-[0.95] tracking-normal">
                    {getDisplayColorName(heroColor.name)}
                  </h2>
                </div>
                <div className="rounded-full border border-current/25 bg-white/10 px-3 py-1 text-[12px] font-medium">
                  {auraTitle}
                </div>
              </div>
              <div className="mt-[58px] grid grid-cols-2 gap-2">
                <MiniColorTag label="辅助色" color={supportColor} />
                <MiniColorTag label="规避色" color={avoidColor} />
              </div>
            </div>

            <div className="mt-[16px] rounded-[24px] border border-[#E6DCCD] bg-[#FFFCF7]/72 p-4 shadow-[0_10px_26px_rgba(63,54,42,0.04)]">
              <p className="text-[12px] font-medium text-[#B99A63]">今日短句</p>
              <p className="mt-2 text-[17px] font-semibold leading-7 text-[#3C3630]">
                {heroSentence.join("，")}
              </p>
            </div>
          </div>

          <Link
            className="relative z-10 mt-[14px] flex w-full items-center gap-[10px] rounded-full border border-[#E2D8CB] bg-[#FFFCF7]/78 px-[9px] py-[9px] transition-colors hover:bg-[#F8F3EA]"
            href="/profile"
            aria-label="查看个人档案"
          >
            <div className="relative size-[45px] shrink-0 overflow-hidden rounded-full bg-[#F3EBDD]">
              <Image
                alt="用户头像"
                className="object-cover object-center"
                fill
                sizes="45px"
                src="/images/today-aura-profile-avatar.png"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate font-serif text-[18px] leading-none text-[#292521]">
                {hasProfile ? profile.nickname : "我的档案"}
              </p>
              <p className="mt-[6px] truncate text-[12px] leading-none text-[#7A6E62]">
                {displayProfileTags}
              </p>
            </div>
          </Link>
        </section>

        <div className="space-y-[9px] pt-[15px]">
          <Link
            className={auraButtonClass({ className: "h-[52px] w-full rounded-full text-[17px] font-semibold" })}
            href="/today"
          >
            <Sparkles className="size-[22px]" strokeWidth={2.1} />
            生成今日气场
          </Link>
          <Link
            className={auraButtonClass({ tone: "soft", className: "h-[52px] w-full rounded-full border-[#E2D8CB] bg-[#FFFCF7]/62 text-[17px] font-semibold text-[#594E42]" })}
            href={currentResult ? "/result" : hasProfile ? "/today" : "/profile"}
          >
            <Eye className="size-[21px]" strokeWidth={2.05} />
            看看今日建议
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

function MiniColorTag({
  label,
  color,
}: {
  label: string;
  color: { name: string; hex: string };
}) {
  return (
    <div className="rounded-[17px] border border-current/20 bg-white/12 p-2">
      <div
        className="h-[34px] rounded-[12px] ring-1 ring-black/5"
        style={{ backgroundColor: color.hex }}
      />
      <p className="mt-2 text-[11px] leading-none opacity-70">{label}</p>
      <p className="mt-1 truncate text-[14px] font-semibold leading-tight">
        {getDisplayColorName(color.name)}
      </p>
    </div>
  );
}

function getDisplayColor(name: string) {
  const normalizedName = name === "炭黑" ? "炭褐" : name;
  return (
    COLOR_LIBRARY.find((color) => color.name === normalizedName) ?? {
      name,
      hex: "#D8CDBB",
    }
  );
}

function getDisplayColorName(name: string) {
  return name === "灰蓝" ? "雾蓝" : name;
}

function getVisibleSupportColor(color?: { name: string; hex: string }) {
  const requested = color ?? getDisplayColor("燕麦色");

  if (["奶油白", "香槟米"].includes(requested.name)) {
    return getDisplayColor("燕麦色");
  }

  return requested;
}

function formatHeroSentence(sentence: string) {
  const parts = sentence
    .replace(/[。！？!?.]/g, "")
    .split(/[，,]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2);

  return parts.length > 0 ? parts : ["用清醒感开始今天"];
}

function formatDateParts(date: Date) {
  return {
    month: `${date.getMonth() + 1}月`,
    day: date.getDate().toString().padStart(2, "0"),
    weekday: shortWeekdayFormatter.format(date),
  };
}

function getReadableTextColor(hex: string) {
  const color = hex.replace("#", "");
  const red = Number.parseInt(color.slice(0, 2), 16);
  const green = Number.parseInt(color.slice(2, 4), 16);
  const blue = Number.parseInt(color.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.66 ? "#292521" : "#FFFCF7";
}
