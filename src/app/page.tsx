"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Check,
  Clipboard,
  ImageDown,
  MessageCircle,
  Settings2,
  Share2,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
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

type HomeDecorRule = {
  colorNames: string[];
  backgroundDecor: string;
  image: string;
  imageMode: "natural" | "tinted" | "dark";
  cardOverlay: string;
  imageOpacity: number;
};

const HOME_DECOR_RULES: HomeDecorRule[] = [
  {
    colorNames: ["灰蓝", "雾蓝", "鼠尾草绿", "雾紫"],
    backgroundDecor: "冷调低饱和主色：使用墙面植物影、陶罐和石质台面，气质清醒、安静，适合清冷/知性结果。",
    image: "/images/today-aura-hero-still-life.png",
    imageMode: "natural",
    cardOverlay:
      "linear-gradient(90deg, rgba(91,111,118,0.12) 0%, rgba(142,161,168,0.02) 50%, rgba(255,252,247,0.08) 100%)",
    imageOpacity: 0.86,
  },
  {
    colorNames: ["燕麦色", "浅卡其"],
    backgroundDecor: "暖调浅色主色：使用亚麻、陶瓷、浅石材这类低对比静物，保持温柔、松弛，不做甜腻装饰。",
    image: "/images/today-aura-hero-still-life.png",
    imageMode: "tinted",
    cardOverlay:
      "linear-gradient(90deg, rgba(198,178,148,0.16) 0%, rgba(248,243,234,0.04) 50%, rgba(255,252,247,0.18) 100%)",
    imageOpacity: 0.78,
  },
  {
    colorNames: ["炭褐", "酒红"],
    backgroundDecor: "深色或正式主色：使用石质台面、陶器轮廓和弱植物影，降低装饰感，突出稳定和边界。",
    image: "/images/today-aura-hero-still-life.png",
    imageMode: "dark",
    cardOverlay:
      "linear-gradient(90deg, rgba(32,27,23,0.34) 0%, rgba(32,27,23,0.08) 54%, rgba(255,252,247,0.07) 100%)",
    imageOpacity: 0.46,
  },
  {
    colorNames: ["雾粉", "亮橙"],
    backgroundDecor: "暖调社交主色：使用柔焦花影、陶瓷器皿或浅色布面，主色可更有存在感，但装饰不能变成贴纸感。",
    image: "/images/today-aura-hero-still-life.png",
    imageMode: "tinted",
    cardOverlay:
      "linear-gradient(90deg, rgba(180,114,96,0.16) 0%, rgba(255,252,247,0.04) 50%, rgba(255,252,247,0.16) 100%)",
    imageOpacity: 0.7,
  },
];

const SHARE_TARGETS = [
  { name: "小红书", icon: Sparkles, tone: "bg-[#B75B52] text-[#FFFCF7]" },
  { name: "朋友圈", icon: MessageCircle, tone: "bg-[#8EA1A8] text-[#FFFCF7]" },
  { name: "微信好友", icon: Share2, tone: "bg-[#9BA88E] text-[#FFFCF7]" },
  { name: "复制文案", icon: Clipboard, tone: "bg-[#3C3630] text-[#FFFCF7]" },
];

export default function Home() {
  const [profile, setProfile] = useState<AuraProfile>(DEFAULT_PROFILE);
  const [hasProfile, setHasProfile] = useState(false);
  const [currentResult, setCurrentResult] = useState<AuraResult | null>(null);
  const [selectedShareTarget, setSelectedShareTarget] = useState("小红书");
  const [shareFeedback, setShareFeedback] = useState("");
  const today = new Date();
  const heroColor = getVisibleMainColor(currentResult?.colors.primary);
  const heroDecor = getHomeDecorRule(heroColor.name);
  const supportColor =
    getVisibleSupportColor(currentResult?.colors.secondary, heroColor.name);
  const accentColor =
    getVisibleAccentColor(currentResult?.colors.avoid, [heroColor.name, supportColor.name]);
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
              每日审美决策助手
            </p>
          </div>
          <Link
            className="flex size-[43px] items-center justify-center rounded-full border border-[#D7CBBB] bg-[#FFFCF7]/70 text-[#3C3630] transition-colors hover:bg-[#F8F3EA]"
            href="/profile"
            aria-label="打开偏好设置"
          >
            <Settings2 className="size-[22px]" strokeWidth={1.85} aria-hidden="true" />
          </Link>
        </header>

        <section
          className="relative mt-[25px] h-[400px] w-full overflow-hidden rounded-[34px] px-[34px] py-[29px] text-[#FFFCF7]"
          style={{ backgroundColor: heroColor.hex }}
          aria-label={heroDecor.backgroundDecor}
        >
          <Image
            alt=""
            aria-hidden="true"
            className={getDecorImageClass(heroDecor.imageMode)}
            fill
            priority
            sizes="358px"
            src={heroDecor.image}
            style={{
              opacity: heroDecor.imageOpacity,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[1]"
            style={{
              background: [
                `linear-gradient(90deg, ${heroColor.hex}FA 0%, ${heroColor.hex}EA 30%, ${heroColor.hex}8A 58%, ${heroColor.hex}22 86%)`,
                `linear-gradient(180deg, ${heroColor.hex}F2 0%, ${heroColor.hex}AC 13%, ${heroColor.hex}12 38%, ${heroColor.hex}58 100%)`,
                `radial-gradient(circle at 86% 72%, rgba(255,252,247,0.2) 0%, ${heroColor.hex}30 35%, ${heroColor.hex}00 64%)`,
              ].join(", "),
            }}
          />
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: `linear-gradient(180deg, ${heroColor.hex}30 0%, ${heroColor.hex}08 48%, ${heroColor.hex}18 100%)`,
            }}
          />
          <div className="absolute inset-0 z-[1]" style={{ background: heroDecor.cardOverlay }} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-4px] right-[-13px] z-[1] h-[126px] w-[157px] opacity-50"
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

          <div className="absolute right-[36px] top-[58px] z-10 text-right text-[#FFFCF7]">
            <p className="flex items-baseline justify-end gap-0.5 leading-none tracking-normal">
              <span className="font-serif text-[30px] font-normal leading-none">
                {today.getDate()}
              </span>
              <span className="text-[18px] font-normal leading-none tracking-normal">
                日
              </span>
            </p>
            <p className="mt-[8px] text-[15px] font-normal leading-none text-[#FFFCF7]/88">
              {today.getMonth() + 1}月 · {shortWeekdayFormatter.format(today)}
            </p>
          </div>

          <div className="absolute left-[31px] top-[112px] z-10 max-w-[14rem]">
            <h1 className="font-serif text-[70px] font-semibold leading-[0.9] tracking-normal text-[#FFFCF7]">
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
            className="absolute bottom-[31px] left-[31px] z-10 flex h-[70px] w-[219px] items-center gap-[13px] rounded-full border border-[#FFFCF7]/52 bg-[#FFFCF7]/4 px-[9px] transition-colors hover:bg-[#FFFCF7]/10"
            href="/profile"
            aria-label="查看个人档案"
          >
            <div className="relative size-[52px] shrink-0 overflow-hidden rounded-full bg-[#F3EBDD]">
              <Image
                alt="用户头像"
                className="object-cover object-center"
                fill
                sizes="52px"
                src="/images/today-aura-profile-avatar.png"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate font-serif text-[22px] leading-none">
                {profile.nickname || "Cary"}
              </p>
              <p className="mt-[8px] truncate text-[15px] leading-none text-[#FFFCF7]/88">
                {displayProfileTags}
              </p>
            </div>
          </Link>
        </section>

        <section className="mt-[10px] overflow-hidden rounded-[27px] border border-[#E6DCCD] bg-[#FFFCF7]/88 p-[7px] shadow-[0_10px_28px_rgba(63,54,42,0.04)] backdrop-blur">
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

        <div className="space-y-[8px] pt-[14px]">
          <a
            className={auraButtonClass({ className: "h-[50px] w-full rounded-full text-[17px] font-semibold" })}
            href="#share"
            onClick={() => setShareFeedback("")}
          >
            <Share2 className="size-[21px]" strokeWidth={2.05} />
            晒出今日气场
          </a>

          <Link
            className={auraButtonClass({ tone: "soft", className: "h-[50px] w-full rounded-full border-[#E2D8CB] bg-[#FFFCF7]/62 text-[17px] font-semibold text-[#594E42] shadow-none" })}
            href="/today"
          >
            <SlidersHorizontal className="size-[21px]" strokeWidth={2.05} />
            定制今日气场
          </Link>
        </div>
      </div>

      <ShareSheet
        accentColor={accentColor}
        date={`${today.getMonth() + 1}月${today.getDate()}日`}
        profile={profile}
        primaryColor={heroColor}
        selectedShareTarget={selectedShareTarget}
        sentence={heroSentence.join("，") || "用清醒感开始今天"}
        setSelectedShareTarget={setSelectedShareTarget}
        setShareFeedback={setShareFeedback}
        shareFeedback={shareFeedback}
        supportColor={supportColor}
        tags={displayProfileTags}
      />
    </PageShell>
  );
}

function ShareSheet({
  accentColor,
  date,
  profile,
  primaryColor,
  selectedShareTarget,
  sentence,
  setSelectedShareTarget,
  setShareFeedback,
  shareFeedback,
  supportColor,
  tags,
}: {
  accentColor: { name: string; hex: string };
  date: string;
  profile: AuraProfile;
  primaryColor: { name: string; hex: string };
  selectedShareTarget: string;
  sentence: string;
  setSelectedShareTarget: (target: string) => void;
  setShareFeedback: (feedback: string) => void;
  shareFeedback: string;
  supportColor: { name: string; hex: string };
  tags: string;
}) {
  return (
    <section
      aria-label="分享今日气场"
      aria-modal="true"
      className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center bg-[#292521]/0 opacity-0 backdrop-blur-0 transition-all duration-200 target:pointer-events-auto target:bg-[#292521]/24 target:opacity-100 target:backdrop-blur-sm"
      id="share"
      role="dialog"
    >
      <a className="absolute inset-0" href="#" aria-label="关闭分享弹窗" />
      <div className="relative mb-[calc(env(safe-area-inset-bottom)+14px)] max-h-[88dvh] w-[calc(100%-28px)] max-w-[374px] overflow-hidden rounded-[30px] border border-[#E2D8CB] bg-[#FFFCF7] p-0 shadow-[0_24px_70px_rgba(60,54,48,0.2)]">
        <a
          aria-label="关闭分享弹窗"
          className="absolute right-4 top-4 z-10 flex size-[34px] items-center justify-center rounded-full bg-[#F8F3EA] text-[22px] leading-none text-[#5E564F] transition-colors hover:bg-[#EFE7DC]"
          href="#"
        >
          ×
        </a>
        <div className="border-b border-[#EDE5DB] px-5 pb-4 pt-5">
          <h2 className="font-serif text-[22px] leading-none text-[#292521]">
            分享今日气场
          </h2>
          <p className="mt-2 text-[13px] leading-5 text-[#7A6E62]">
            内容已整理成适合保存和分享到社区的今日色卡。
          </p>
        </div>

        <div className="space-y-4 px-5 py-4">
          <SharePreviewCard
            accentColor={accentColor}
            date={date}
            profile={profile}
            primaryColor={primaryColor}
            selectedTarget={selectedShareTarget}
            sentence={sentence}
            supportColor={supportColor}
            tags={tags}
          />

          <section
            aria-label="分享到社区"
            className="rounded-[24px] border border-[#E6DCCD] bg-[#F8F3EA]/55 p-3"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[14px] font-semibold text-[#292521]">分享到社区</p>
              <p className="text-[12px] text-[#8A7D70]">
                {shareFeedback || `${selectedShareTarget} 已就绪`}
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {SHARE_TARGETS.map((target) => {
                const TargetIcon = target.icon;
                const selected = selectedShareTarget === target.name;

                return (
                  <button
                    className="group flex min-w-0 flex-col items-center gap-2 rounded-[18px] px-1 py-2 text-center transition-colors hover:bg-[#FFFCF7]"
                    key={target.name}
                    onClick={() => {
                      setSelectedShareTarget(target.name);
                      setShareFeedback("");
                    }}
                    type="button"
                  >
                    <span className={`relative flex size-[42px] items-center justify-center rounded-full ${target.tone} shadow-[0_8px_18px_rgba(60,54,48,0.1)]`}>
                      <TargetIcon className="size-[19px]" strokeWidth={2} aria-hidden="true" />
                      {selected ? (
                        <span className="absolute -right-0.5 -top-0.5 flex size-[15px] items-center justify-center rounded-full bg-[#FFFCF7] text-[#8E743C]">
                          <Check className="size-[10px]" strokeWidth={2.4} />
                        </span>
                      ) : null}
                    </span>
                    <span className="truncate text-[11px] font-medium text-[#5E564F]">
                      {target.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <button
            className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#3C3630] text-[15px] font-semibold text-[#FFFCF7] shadow-[0_12px_26px_rgba(60,54,48,0.14)]"
            onClick={() => setShareFeedback(`${selectedShareTarget} 分享内容已准备好`)}
            type="button"
          >
            <ImageDown className="size-[19px]" strokeWidth={2} />
            保存并继续分享
          </button>
        </div>
      </div>
    </section>
  );
}

function SharePreviewCard({
  accentColor,
  date,
  profile,
  primaryColor,
  selectedTarget,
  sentence,
  supportColor,
  tags,
}: {
  accentColor: { name: string; hex: string };
  date: string;
  profile: AuraProfile;
  primaryColor: { name: string; hex: string };
  selectedTarget: string;
  sentence: string;
  supportColor: { name: string; hex: string };
  tags: string;
}) {
  return (
    <article className="overflow-hidden rounded-[26px] border border-[#E6DCCD] bg-[#FFFCF7] shadow-[0_14px_34px_rgba(63,54,42,0.08)]">
      <div className="flex items-center gap-3 border-b border-[#EDE5DB] px-4 py-3">
        <div className="relative size-[46px] shrink-0 overflow-hidden rounded-full bg-[#F3EBDD]">
          <Image
            alt="用户头像"
            className="object-cover object-center"
            fill
            sizes="46px"
            src="/images/today-aura-profile-avatar.png"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-[20px] leading-none text-[#292521]">
            {profile.nickname || "Cary"}
          </p>
          <p className="mt-1.5 truncate text-[12px] leading-none text-[#7A6E62]">
            {tags}
          </p>
        </div>
        <span className="rounded-full border border-[#E2D8CB] bg-[#F8F3EA] px-3 py-1 text-[11px] text-[#6E6256]">
          {selectedTarget.replace(" · 已选择", "")}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_0.78fr]">
        <div className="p-4">
          <p className="text-[12px] text-[#8A7D70]">{date}</p>
          <h3 className="mt-2 font-serif text-[34px] font-semibold leading-none text-[#292521]">
            今日{getDisplayColorName(primaryColor.name)}
          </h3>
          <p className="mt-3 text-[14px] leading-6 text-[#5E564F]">
            {sentence}
          </p>
        </div>
        <div className="grid grid-rows-3 border-l border-[#EDE5DB]">
          <ShareColorStrip label="主色" color={primaryColor} />
          <ShareColorStrip label="辅助" color={supportColor} />
          <ShareColorStrip label="稳定" color={accentColor} />
        </div>
      </div>
    </article>
  );
}

function ShareColorStrip({
  label,
  color,
}: {
  label: string;
  color: { name: string; hex: string };
}) {
  return (
    <div className="grid grid-cols-[38px_1fr] items-center gap-2 border-b border-[#EDE5DB] px-3 py-2 last:border-b-0">
      <span
        className="block size-[34px] rounded-[12px] shadow-[inset_0_0_0_1px_rgba(41,37,33,0.05)]"
        style={{ backgroundColor: color.hex }}
      />
      <span className="min-w-0">
        <span className="block text-[10px] leading-4 text-[#8A7D70]">{label}</span>
        <span className="block truncate text-[12px] font-semibold leading-4 text-[#292521]">
          {getDisplayColorName(color.name)}
        </span>
      </span>
    </div>
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

function getHomeDecorRule(colorName: string) {
  const displayName = getDisplayColorName(colorName);

  return (
    HOME_DECOR_RULES.find((rule) =>
      rule.colorNames.includes(colorName) || rule.colorNames.includes(displayName),
    ) ?? HOME_DECOR_RULES[0]
  );
}

function getDecorImageClass(imageMode: HomeDecorRule["imageMode"]) {
  const base =
    "absolute inset-0 z-0 h-full w-full object-cover object-[61%_61%]";

  if (imageMode === "natural") {
    return `${base} saturate-[0.92]`;
  }

  if (imageMode === "dark") {
    return `${base} mix-blend-luminosity contrast-[0.92] saturate-[0.45]`;
  }

  return `${base} mix-blend-luminosity contrast-[0.9] saturate-[0.55]`;
}

function getVisibleMainColor(color?: { name: string; hex: string }) {
  const requested = color ?? getDisplayColor("灰蓝");

  if (isCreamColor(requested.name)) {
    return getDisplayColor("燕麦色");
  }

  return requested;
}

function getVisibleSupportColor(
  color: { name: string; hex: string } | undefined,
  primaryName: string,
) {
  const requested = color ?? getDisplayColor("燕麦色");

  if (isCreamColor(requested.name) || requested.name === primaryName) {
    return primaryName === "燕麦色" ? getDisplayColor("浅卡其") : getDisplayColor("燕麦色");
  }

  return requested;
}

function getVisibleAccentColor(
  color: { name: string; hex: string } | undefined,
  usedNames: string[],
) {
  const requested = color ?? getDisplayColor("炭褐");

  if (isCreamColor(requested.name) || usedNames.includes(requested.name)) {
    return getDisplayColor("炭褐");
  }

  return requested;
}

function isCreamColor(name: string) {
  return ["奶油白", "香槟米"].includes(name);
}

function formatHeroSentence(sentence: string) {
  return sentence
    .replace(/[。！？!?.]/g, "")
    .split(/[，,]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2);
}
