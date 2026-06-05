"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Check,
  Clipboard,
  ImageDown,
  MessageCircle,
  RotateCcw,
  Share2,
  Sparkles,
} from "lucide-react";
import { AuraButton, auraButtonClass } from "@/components/app/aura-button";
import { PageShell } from "@/components/app/page-shell";
import { Badge } from "@/components/ui/badge";
import { generateAuraResult } from "@/lib/aura-recommendation";
import {
  getCurrentResult,
  getProfile,
  saveCurrentResult,
  saveResultToHistory,
} from "@/lib/aura-storage";
import type { AuraColor, AuraResult } from "@/lib/aura-types";

const SHARE_TARGETS = [
  { name: "小红书", icon: ImageDown, tone: "bg-[#8C4A4D] text-[#FFFCF7]" },
  { name: "朋友圈", icon: MessageCircle, tone: "bg-[#8EA1A8] text-[#FFFCF7]" },
  { name: "微信好友", icon: Share2, tone: "bg-[#9BA88E] text-[#FFFCF7]" },
  { name: "复制文案", icon: Clipboard, tone: "bg-[#3C3630] text-[#FFFCF7]" },
];

export default function ResultPage() {
  const [result, setResult] = useState<AuraResult | null>(null);
  const [saved, setSaved] = useState(false);
  const [selectedShareTarget, setSelectedShareTarget] = useState("小红书");
  const [shareFeedback, setShareFeedback] = useState("");

  useEffect(() => {
    const storedResult = getCurrentResult();
    if (!storedResult) {
      setResult(null);
      return;
    }

    const cleanResult = sanitizeAuraResult(storedResult);
    setResult(cleanResult);
    if (JSON.stringify(cleanResult) !== JSON.stringify(storedResult)) {
      saveCurrentResult(cleanResult);
    }
  }, []);

  function regenerate() {
    if (!result || result.variant >= 1) {
      return;
    }

    const next = sanitizeAuraResult(generateAuraResult(getProfile(), result.input, result.variant + 1));
    saveCurrentResult(next);
    setResult(next);
    setSaved(false);
    setShareFeedback("");
  }

  function prepareShare() {
    if (!result) {
      return;
    }

    saveResultToHistory(result);
    setSaved(true);
    setShareFeedback("今日结果已保存，分享内容已准备好");
  }

  if (!result) {
    return (
      <PageShell>
        <section className="rounded-[2rem] border border-[#E2D8CB] bg-[#FFFCF7] p-6 shadow-aura">
          <p className="text-sm font-medium text-[#B99A63]">还没有今日结果</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight">
            先选择今天的状态
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#5E564F]">
            完成场景、天气、心情和想要气质后，再生成今天的颜色与穿搭建议。
          </p>
          <Link className={auraButtonClass({ className: "mt-5 w-full" })} href="/today">
            <Sparkles className="size-4" />
            去生成今日气场
          </Link>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="space-y-7">
        <header className="space-y-4">
          <div>
            <p className="text-sm font-medium text-[#B99A63]">今日气场</p>
            <h1 className="mt-2 text-4xl font-semibold leading-[1.08]">
              {result.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                result.input.scene,
                result.input.weather,
                result.input.mood,
                `精力${result.input.energy}`,
                result.input.desiredAura,
              ].map((item) => (
                <Badge className="border-[#E2D8CB] bg-[#FFFCF7] text-[#5E564F]" key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </header>

        <section className="overflow-hidden rounded-[2.35rem] border border-[#D7CBBB] bg-[#FFFCF7]">
          <div
            className="min-h-[300px] p-6 text-[#FFFCF7]"
            style={{ backgroundColor: result.colors.primary.hex }}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-full border border-white/35 bg-white/12 px-3 py-1 text-xs">
                今日主色
              </span>
              <span className="rounded-full border border-white/35 bg-white/12 px-3 py-1 font-mono text-xs">
                {result.colors.primary.hex}
              </span>
            </div>
            <div className="mt-24">
              <p className="text-sm opacity-82">Main Color</p>
              <h2 className="mt-1 text-6xl font-semibold leading-none">
                {getDisplayColorName(result.colors.primary.name)}
              </h2>
              <div className="mt-6 h-px bg-white/35" />
              <p className="mt-4 text-base leading-7 opacity-95">
                {result.colors.primary.usage}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-[#EDE5DB] border-b border-[#EDE5DB] bg-[#FFFCF7] p-3">
            <ColorSummary color={result.colors.primary} label="主色" />
            <ColorSummary color={result.colors.secondary} label="辅助" />
            <ColorSummary color={result.colors.avoid} label="点缀" />
          </div>
          <div className="p-5">
            <p className="text-xs font-medium text-[#B99A63]">颜色解释</p>
            <p className="mt-2 text-sm leading-7 text-[#5E564F]">
              {result.colorExplanation}
            </p>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <ColorCard color={result.colors.secondary} />
          <ColorCard color={result.colors.avoid} />
        </div>

        <section className="rounded-[2rem] border border-[#E2D8CB] bg-[#FFFCF7] p-5">
          <p className="text-xs font-medium text-[#B99A63]">今天直接照做</p>
          <h2 className="mt-2 text-2xl font-semibold">先看这三条</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-[#5E564F]">
            <p>主色放在上装或外套：{result.colors.primary.usage}</p>
            <p>搭配轮廓：{result.outfit.silhouette}</p>
            <p>
              妆容配饰：{result.makeupAccessories.lip} 配 {result.makeupAccessories.accessories}
            </p>
          </div>
        </section>

        <AdviceCard title="穿搭建议" note="具体到衣物类别和颜色组合。">
          <AdviceLine label="整体轮廓" value={result.outfit.silhouette} />
          <AdviceLine label="上装" value={result.outfit.top} />
          <AdviceLine label="下装" value={result.outfit.bottom} />
          <AdviceLine label="外套" value={result.outfit.outerwear} />
          <AdviceLine label="鞋包" value={result.outfit.shoesBag} />
          <div className="rounded-[1.5rem] bg-[#F8F3EA] p-4 text-sm leading-6 text-[#5E564F]">
            替代方案：{result.outfit.alternative}
          </div>
        </AdviceCard>

        <AdviceCard title="妆容配饰" note="完成整体气场，不增加早晨负担。">
          <AdviceLine label="妆感" value={result.makeupAccessories.makeup} />
          <AdviceLine label="唇色" value={result.makeupAccessories.lip} />
          <AdviceLine label="发型" value={result.makeupAccessories.hair} />
          <AdviceLine label="配饰" value={result.makeupAccessories.accessories} />
          <AdviceLine label="小物" value={result.makeupAccessories.scentOrItem} />
        </AdviceCard>

        <section className="rounded-[2rem] border border-[#E2D8CB] bg-[#3C3630] p-5 text-[#FFFCF7]">
          <p className="text-xs text-[#D8CFC2]">今日短句</p>
          <p className="mt-2 text-2xl font-semibold leading-9">
            {result.shortSentence}
          </p>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <a
            className={auraButtonClass({ className: "w-full" })}
            href="#result-share"
            onClick={prepareShare}
          >
            <Share2 className="size-4" />
            晒出今日气场
          </a>
          <AuraButton
            disabled={result.variant >= 1}
            onClick={regenerate}
            tone="soft"
          >
            <RotateCcw className="size-4" />
            {result.variant >= 1 ? "已重新生成" : "重新生成"}
          </AuraButton>
        </div>
      </div>

      <ResultShareSheet
        result={result}
        saved={saved}
        selectedShareTarget={selectedShareTarget}
        setSelectedShareTarget={setSelectedShareTarget}
        setShareFeedback={setShareFeedback}
        shareFeedback={shareFeedback}
      />
    </PageShell>
  );
}

function ResultShareSheet({
  result,
  saved,
  selectedShareTarget,
  setSelectedShareTarget,
  setShareFeedback,
  shareFeedback,
}: {
  result: AuraResult;
  saved: boolean;
  selectedShareTarget: string;
  setSelectedShareTarget: (target: string) => void;
  setShareFeedback: (feedback: string) => void;
  shareFeedback: string;
}) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center bg-[#201C18]/0 opacity-0 transition duration-200 target:pointer-events-auto target:bg-[#201C18]/46 target:opacity-100"
      id="result-share"
    >
      <a aria-label="关闭分享面板" className="absolute inset-0" href="#" />
      <section className="relative w-full max-w-[430px] rounded-t-[30px] border border-[#E2D8CB] bg-[#FFFCF7] px-5 pb-[calc(24px+env(safe-area-inset-bottom))] pt-4 shadow-[0_-18px_48px_rgba(60,54,48,0.18)]">
        <div className="mx-auto h-1 w-10 rounded-full bg-[#D8CFC2]" />
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#B99A63]">分享今日气场</p>
            <h2 className="mt-1 text-2xl font-semibold leading-tight">
              保存后再晒出今天
            </h2>
          </div>
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#E2D8CB] bg-[#C8B8A2]">
            <Image
              alt="个人头像"
              className="object-cover"
              fill
              sizes="48px"
              src="/images/today-aura-profile-avatar.png"
            />
          </div>
        </div>

        <SharePoster result={result} />

        <div className="mt-4 rounded-[22px] border border-[#E2D8CB] bg-[#F8F3EA] p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#292521]">分享到社区</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFFCF7] px-2.5 py-1 text-xs text-[#5E564F]">
              <Check className="size-3.5" />
              {shareFeedback || (saved ? "已保存" : `${selectedShareTarget} 已就绪`)}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {SHARE_TARGETS.map((target) => {
              const Icon = target.icon;
              const selected = selectedShareTarget === target.name;

              return (
                <button
                  className="flex min-w-0 flex-col items-center gap-1.5 rounded-[18px] bg-[#FFFCF7] px-2 py-2.5 text-xs text-[#5E564F] transition-colors hover:bg-white"
                  key={target.name}
                  onClick={() => {
                    setSelectedShareTarget(target.name);
                    setShareFeedback("");
                  }}
                  type="button"
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full ${target.tone} ${selected ? "ring-2 ring-[#B99A63]/45" : ""}`}
                  >
                    <Icon className="size-4" strokeWidth={2.1} />
                  </span>
                  <span className="truncate">{target.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          className={auraButtonClass({ className: "mt-3 w-full shadow-none" })}
          onClick={() => setShareFeedback(`${selectedShareTarget} 分享内容已准备好`)}
          type="button"
        >
          <Share2 className="size-4" />
          生成分享内容
        </button>
      </section>
    </div>
  );
}

function SharePoster({ result }: { result: AuraResult }) {
  return (
    <article className="mt-4 overflow-hidden rounded-[24px] border border-[#D7CBBB] bg-[#FFFCF7] p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-[#292521]">今日气场 Today Aura</p>
          <p className="mt-1 text-xs text-[#7A6E62]">每日审美色卡</p>
        </div>
        <p className="text-right text-3xl font-semibold leading-none text-[#292521]">
          03
          <span className="block pt-1 text-xs font-normal text-[#7A6E62]">
            6月3日
          </span>
        </p>
      </div>
      <div
        className="mt-4 rounded-[22px] p-5 text-[#FFFCF7]"
        style={{ backgroundColor: result.colors.primary.hex }}
      >
        <p className="text-xs text-[#FFFCF7]/72">今日气场</p>
        <h3 className="mt-2 text-3xl font-semibold">{result.title}</h3>
        <p className="mt-3 text-sm text-[#FFFCF7]/86">
          主色 {getDisplayColorName(result.colors.primary.name)}
        </p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <ShareSwatch label="主色" color={result.colors.primary} />
        <ShareSwatch label="辅助" color={result.colors.secondary} />
        <ShareSwatch label="点缀" color={result.colors.avoid} />
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {result.shareKeywords.slice(0, 5).map((keyword) => (
          <span
            className="rounded-full border border-[#E2D8CB] px-3 py-1 text-xs text-[#5E564F]"
            key={keyword}
          >
            {keyword}
          </span>
        ))}
      </div>
      <p className="mt-4 border-t border-[#EDE5DB] pt-3 text-center text-sm font-medium leading-6 text-[#5E564F]">
        {result.shortSentence}
      </p>
    </article>
  );
}

function ShareSwatch({ color, label }: { color: AuraColor; label: string }) {
  return (
    <div className="text-center">
      <div
        className="h-[58px] rounded-[18px] ring-1 ring-black/5"
        style={{ backgroundColor: color.hex }}
      />
      <p className="mt-1.5 text-[11px] text-[#9B9288]">{label}</p>
      <p className="text-xs font-semibold text-[#292521]">
        {getDisplayColorName(color.name)}
      </p>
    </div>
  );
}

function ColorSummary({ color, label }: { color: AuraColor; label: string }) {
  return (
    <div className="min-w-0 px-2 py-1 text-center">
      <div
        className="mx-auto h-12 w-full max-w-[5.5rem] rounded-[1rem] ring-1 ring-black/5"
        style={{ backgroundColor: color.hex }}
      />
      <p className="mt-2 text-xs text-[#7A6E62]">{label}</p>
      <p className="mt-0.5 truncate text-sm font-semibold text-[#292521]">
        {getDisplayColorName(color.name)}
      </p>
    </div>
  );
}

function ColorCard({ color }: { color: AuraColor }) {
  const label =
    color.role === "primary" ? "今日主色" : color.role === "secondary" ? "辅助色" : "点缀色";

  return (
    <article className="overflow-hidden rounded-[1.8rem] border border-[#E2D8CB] bg-[#FFFCF7]">
      <div className="h-28" style={{ backgroundColor: color.hex }} />
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs text-[#9B9288]">{label}</p>
          <h3 className="mt-1 text-xl font-semibold">{getDisplayColorName(color.name)}</h3>
        </div>
        <p className="text-xs leading-5 text-[#5E564F]">{color.reason}</p>
        <p className="rounded-[1.2rem] bg-[#F8F3EA] p-3 text-xs leading-5 text-[#5E564F]">
          {color.usage}
        </p>
      </div>
    </article>
  );
}

function getDisplayColorName(name: string) {
  return name === "灰蓝" ? "雾蓝" : name;
}

function AdviceCard({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-[#E2D8CB] bg-[#FFFCF7] p-5">
      <div className="mb-4">
        <p className="text-xs font-medium text-[#B99A63]">建议模块</p>
        <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-[#7A6E62]">{note}</p>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function AdviceLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.45rem] bg-[#F8F3EA] p-4">
      <p className="text-xs font-medium text-[#B99A63]">{label}</p>
      <p className="mt-2 text-sm leading-6 text-[#5E564F]">{value}</p>
    </div>
  );
}

function sanitizeAuraResult(result: AuraResult): AuraResult {
  const primary = sanitizeColor(result.colors.primary);
  const secondary = sanitizeColor(result.colors.secondary);
  const avoid = sanitizeColor(result.colors.avoid);

  return {
    ...result,
    colors: {
      primary,
      secondary,
      avoid,
    },
    colorExplanation: replaceCreamText(result.colorExplanation),
    outfit: {
      silhouette: replaceCreamText(result.outfit.silhouette),
      top: replaceCreamText(result.outfit.top),
      bottom: replaceCreamText(result.outfit.bottom),
      outerwear: replaceCreamText(result.outfit.outerwear),
      shoesBag: replaceCreamText(result.outfit.shoesBag),
      alternative: replaceCreamText(result.outfit.alternative),
    },
    makeupAccessories: {
      makeup: replaceCreamText(result.makeupAccessories.makeup),
      lip: replaceCreamText(result.makeupAccessories.lip),
      hair: replaceCreamText(result.makeupAccessories.hair),
      accessories: replaceCreamText(result.makeupAccessories.accessories),
      scentOrItem: replaceCreamText(result.makeupAccessories.scentOrItem),
    },
    shortSentence: replaceCreamText(result.shortSentence),
    shareKeywords: result.shareKeywords.map(replaceCreamText),
    shareCard: {
      ...result.shareCard,
      primaryColor: primary,
      supportColor: secondary,
      avoidColor: avoid,
      outfitKeywords: result.shareCard.outfitKeywords.map(replaceCreamText),
      shortSentence: replaceCreamText(result.shareCard.shortSentence),
    },
  };
}

function sanitizeColor(color: AuraColor): AuraColor {
  if (color.name !== "奶油白") {
    return {
      ...color,
      reason: replaceCreamText(color.reason),
      usage: replaceCreamText(color.usage),
    };
  }

  return {
    ...color,
    name: "燕麦色",
    hex: "#C8B8A2",
    reason: replaceCreamText(color.reason) || "燕麦色用于辅助主色，降低搭配压力。",
    usage: replaceCreamText(color.usage) || "适合放在针织、半裙、外套或包袋里。",
  };
}

function replaceCreamText(text: string) {
  return text
    .replace(/奶油白/g, "燕麦色")
    .replace(/#F8F3EA/gi, "#C8B8A2")
    .replace(/#F3EBDD/gi, "#C8B8A2");
}
