"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Settings2, Share2, Sparkles } from "lucide-react";
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
  const accentColor =
    currentResult?.colors.avoid ?? getDisplayColor("炭褐");
  const heroSentence = formatHeroSentence(
    currentResult?.shortSentence ?? "用清醒感开始今天",
  );
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
              今日气场 <span className="ml-[6px] font-medium">Today Aura</span>
            </p>
            <p className="mt-[9px] text-[14px] font-medium leading-none tracking-normal text-[#7A6E62]">
              出门前定好颜色和搭配
            </p>
          </div>
          <Link
            className="flex size-[43px] items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF7]/68 text-[#3C3630] transition-colors hover:bg-[#F8F3EA]"
            href="/profile"
            aria-label="打开设置"
          >
            <Settings2 className="size-[21px]" strokeWidth={1.85} aria-hidden="true" />
          </Link>
        </header>

        <section
          className="relative mx-auto mt-[15px] h-[378px] w-[calc(100%-22px)] overflow-hidden rounded-[34px] px-[34px] py-[29px] text-[#FFFCF7]"
          style={{ backgroundColor: heroColor.hex }}
        >
          <Image
            alt=""
            aria-hidden="true"
            className="absolute -bottom-[94px] -right-[112px] z-0 h-[292px] w-[230px] object-cover object-[82%_100%] opacity-[0.2] mix-blend-luminosity"
            height={900}
            priority
            src="/images/today-aura-hero-still-life.png"
            width={480}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                `linear-gradient(180deg, ${heroColor.hex}E6 0%, ${heroColor.hex}D0 55%, ${heroColor.hex}B8 100%)`,
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(41,37,33,0.02)_0%,rgba(41,37,33,0.01)_45%,rgba(255,252,247,0.08)_100%)]" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-8px] right-[-18px] z-[1] h-[142px] w-[156px] opacity-35"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,252,247,0.18), rgba(255,252,247,0.04) 52%, rgba(255,252,247,0) 72%), radial-gradient(ellipse at 70% 80%, rgba(255,252,247,0.16), rgba(255,252,247,0) 62%)",
              clipPath: "polygon(30% 0, 100% 8%, 100% 100%, 0 100%)",
            }}
          />

          <div className="absolute left-[34px] top-[70px] z-10">
            <p className="text-[16px] font-normal leading-none tracking-normal text-[#FFFCF7]/86">
              今天的主色
            </p>
          </div>

          <div className="absolute right-[36px] top-[62px] z-10 text-right text-[#FFFCF7]">
            <p className="flex items-baseline justify-end gap-0.5 leading-none tracking-normal">
              <span className="font-serif text-[30px] font-normal leading-none">
                {today.getMonth() + 1}
              </span>
              <span className="text-[18px] font-normal leading-none tracking-normal">
                月
              </span>
              <span className="font-serif text-[30px] font-normal leading-none">
                {today.getDate()}
              </span>
              <span className="text-[18px] font-normal leading-none tracking-normal">
                日
              </span>
            </p>
            <p className="mt-[9px] text-[17px] font-normal leading-none">
              {shortWeekdayFormatter.format(today)}
            </p>
          </div>

          <div className="absolute left-[31px] top-[122px] z-10 max-w-[14rem]">
            <h1 className="font-serif text-[66px] font-semibold leading-[0.9] tracking-normal text-[#FFFCF7]">
              {getDisplayColorName(heroColor.name)}
            </h1>
          </div>

          <p className="absolute left-[34px] top-[204px] z-10 text-[17px] font-normal leading-[1.45] tracking-normal text-[#FFFCF7]/92">
            {heroSentence.length > 1 ? (
              <>
                <span className="block">{heroSentence[0]}</span>
                <span className="block">{heroSentence[1]}</span>
              </>
            ) : (
              heroSentence[0]
            )}
          </p>

          <Link
            className="absolute bottom-[18px] left-[34px] z-10 flex w-[209px] items-center gap-[10px] rounded-full border border-[#FFFCF7]/58 bg-transparent px-[8px] py-[8px] transition-colors hover:bg-[#FFFCF7]/10"
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
              <p className="truncate font-serif text-[18px] leading-none">
                {hasProfile ? profile.nickname : "我的档案"}
              </p>
              <p className="mt-[6px] truncate text-[12px] leading-none text-[#FFFCF7]/88">
                {displayProfileTags}
              </p>
            </div>
          </Link>
        </section>

        <section className="mt-[16px] overflow-hidden rounded-[27px] border border-[#E6DCCD] bg-[#FFFCF7]/88 p-[7px] shadow-[0_10px_28px_rgba(63,54,42,0.04)] backdrop-blur">
          <div className="grid grid-cols-3 divide-x divide-[#EDE5DB]">
            <ColorRoleCard
              label="主色"
              colorName={getDisplayColorName(heroColor.name)}
              hex={heroColor.hex}
            />
            <ColorRoleCard
              label="辅助"
              colorName={supportColor.name}
              hex={supportColor.hex}
            />
            <ColorRoleCard
              label="稳定"
              colorName={accentColor.name}
              hex={accentColor.hex}
            />
          </div>
        </section>

        <div className="space-y-[9px] pt-[15px]">
          <Link
            className={auraButtonClass({ className: "h-[50px] w-full rounded-full text-[17px] font-semibold" })}
            href="/today"
          >
            <Sparkles className="size-[22px]" strokeWidth={2.1} />
            生成今日气场
          </Link>
          <Link
            className={auraButtonClass({ tone: "soft", className: "h-[50px] w-full rounded-full border-[#E2D8CB] bg-[#FFFCF7]/62 text-[17px] font-semibold text-[#594E42]" })}
            href={currentResult ? "/result" : hasProfile ? "/today" : "/profile"}
          >
            <Share2 className="size-[21px]" strokeWidth={2.05} />
            晒出今日气场
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

function ColorRoleCard({
  label,
  colorName,
  hex,
}: {
  label: string;
  colorName: string;
  hex: string;
}) {
  return (
    <div className="min-w-0 bg-[#FFFCF7]/32 px-[9px] py-[7px] text-center first:rounded-l-[22px] last:rounded-r-[22px]">
      <div
        className="h-[52px] rounded-[17px] shadow-[0_10px_22px_rgba(57,48,38,0.08)]"
        style={{ backgroundColor: hex }}
      />
      <p className="mt-[8px] text-[14px] leading-tight text-[#7A6E62]">{label}</p>
      <p className="mt-[2px] truncate text-[16px] font-semibold leading-tight text-[#292521]">
        {colorName}
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
  return sentence
    .replace(/[。！？!?.]/g, "")
    .split(/[，,]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2);
}
