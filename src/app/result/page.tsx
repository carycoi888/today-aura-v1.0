"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RotateCcw, Save, Sparkles } from "lucide-react";
import { AuraButton, auraButtonClass } from "@/components/app/aura-button";
import { PageShell } from "@/components/app/page-shell";
import { ShareCardPreview } from "@/components/app/share-card-preview";
import { generateAuraResult } from "@/lib/aura-recommendation";
import {
  getCurrentResult,
  getProfile,
  saveCurrentResult,
  saveResultToHistory,
} from "@/lib/aura-storage";
import type { AuraColor, AuraResult } from "@/lib/aura-types";

export default function ResultPage() {
  const [result, setResult] = useState<AuraResult | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setResult(getCurrentResult());
  }, []);

  function regenerate() {
    if (!result || result.variant >= 1) {
      return;
    }

    const next = generateAuraResult(getProfile(), result.input, result.variant + 1);
    saveCurrentResult(next);
    setResult(next);
    setSaved(false);
  }

  function save() {
    if (!result) {
      return;
    }

    saveResultToHistory(result);
    setSaved(true);
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

  const primaryTextColor = getReadableTextColor(result.colors.primary.hex);

  return (
    <PageShell>
      <div className="space-y-5">
        <section className="relative overflow-hidden rounded-[2.35rem] border border-[#D7CBBB] bg-[#FFFCF7] p-5 shadow-[0_18px_44px_rgba(58,49,39,0.09)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-10 size-40 rounded-full bg-[#DDE6EA]/50 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:radial-gradient(#B99A63_0.5px,transparent_0.5px)] [background-size:12px_12px]"
          />
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium text-[#B99A63]">今日气场结论</p>
                <h1 className="mt-2 text-[34px] font-semibold leading-[1.08] text-[#292521]">
                  {result.title}
                </h1>
              </div>
              <div className="shrink-0 rounded-full border border-[#E2D8CB] bg-[#FFFCF7]/75 px-3 py-2 text-right text-[12px] leading-4 text-[#7A6E62]">
                {result.date}
              </div>
            </div>

            <div
              className="mt-5 overflow-hidden rounded-[2rem] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_16px_34px_rgba(57,48,38,0.13)]"
              style={{ backgroundColor: result.colors.primary.hex, color: primaryTextColor }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[12px] font-medium opacity-78">今日主色</p>
                  <h2 className="mt-2 font-serif text-[54px] font-semibold leading-none">
                    {getDisplayColorName(result.colors.primary.name)}
                  </h2>
                </div>
                <span className="rounded-full border border-current/25 bg-white/10 px-3 py-1 text-[12px] font-medium">
                  {result.input.desiredAura}
                </span>
              </div>
              <p className="mt-10 max-w-[16rem] text-[15px] leading-6 opacity-90">
                {result.colors.primary.usage}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <ColorSummary color={result.colors.primary} label="主色" />
              <ColorSummary color={result.colors.secondary} label="辅助色" />
              <ColorSummary color={result.colors.avoid} label="规避色" />
            </div>

            <div className="mt-5 space-y-3">
              <p className="text-[13px] font-medium text-[#B99A63]">先照这三条做</p>
              <ActionLine label="颜色" value={`把${result.colors.primary.name}放在上装、外套或包袋上，${result.colors.secondary.name}放在内搭、鞋包或配饰里。`} />
              <ActionLine label="轮廓" value={result.outfit.silhouette} />
              <ActionLine label="妆配" value={`${result.makeupAccessories.lip}${result.makeupAccessories.accessories}`} />
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#E2D8CB] bg-[#FFFCF7] p-5 shadow-[0_10px_28px_rgba(63,54,42,0.04)]">
          <p className="text-[13px] font-medium text-[#B99A63]">颜色解释</p>
          <p className="mt-3 text-sm leading-7 text-[#5E564F]">
            {result.colorExplanation}
          </p>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <ColorCard color={result.colors.secondary} />
          <ColorCard color={result.colors.avoid} />
        </div>

        <AdviceCard title="穿搭建议" note="不需要买新东西，先从衣柜里的同类单品开始找。">
          <AdviceLine label="整体轮廓" value={result.outfit.silhouette} />
          <AdviceLine label="上装" value={result.outfit.top} />
          <AdviceLine label="下装" value={result.outfit.bottom} />
          <AdviceLine label="外套" value={result.outfit.outerwear} />
          <AdviceLine label="鞋包" value={result.outfit.shoesBag} />
          <AdviceLine label="替代方案" value={result.outfit.alternative} />
        </AdviceCard>

        <AdviceCard title="妆容配饰建议" note="只补足整体气场，不增加早晨负担。">
          <AdviceLine label="妆感" value={result.makeupAccessories.makeup} />
          <AdviceLine label="唇色" value={result.makeupAccessories.lip} />
          <AdviceLine label="发型" value={result.makeupAccessories.hair} />
          <AdviceLine label="配饰" value={result.makeupAccessories.accessories} />
          <AdviceLine label="小物" value={result.makeupAccessories.scentOrItem} />
        </AdviceCard>

        <section className="rounded-[2rem] border border-[#D7CBBB] bg-[#3C3630] p-5 text-[#FFFCF7] shadow-[0_14px_34px_rgba(60,54,48,0.13)]">
          <p className="text-[13px] text-[#D8CFC2]">今日短句</p>
          <p className="mt-2 text-2xl font-semibold leading-9">
            {result.shortSentence}
          </p>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-sm font-medium text-[#B99A63]">分享卡片预览</p>
            <h2 className="mt-1 text-2xl font-semibold">3:4 今日色卡</h2>
          </div>
          <ShareCardPreview result={result} />
        </section>

        <div className="grid grid-cols-2 gap-3">
          <AuraButton onClick={save}>
            <Save className="size-4" />
            {saved ? "已保存" : "保存今日结果"}
          </AuraButton>
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
    </PageShell>
  );
}

function ColorSummary({ color, label }: { color: AuraColor; label: string }) {
  return (
    <div className="min-w-0 rounded-[1.35rem] border border-[#E6DCCD] bg-[#FFFCF7]/82 p-2 text-center shadow-[0_8px_18px_rgba(57,48,38,0.04)]">
      <div
        className="mx-auto h-12 w-full rounded-[1rem] ring-1 ring-black/5"
        style={{ backgroundColor: color.hex }}
      />
      <p className="mt-2 text-[11px] text-[#7A6E62]">{label}</p>
      <p className="mt-0.5 truncate text-sm font-semibold text-[#292521]">
        {getDisplayColorName(color.name)}
      </p>
    </div>
  );
}

function ColorCard({ color }: { color: AuraColor }) {
  const label =
    color.role === "primary" ? "今日主色" : color.role === "secondary" ? "辅助色" : "规避色";

  return (
    <article className="overflow-hidden rounded-[1.8rem] border border-[#E2D8CB] bg-[#FFFCF7] shadow-[0_10px_28px_rgba(63,54,42,0.04)]">
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
    <section className="rounded-[2rem] border border-[#E2D8CB] bg-[#FFFCF7] p-5 shadow-[0_10px_28px_rgba(63,54,42,0.04)]">
      <div className="mb-4">
        <p className="text-[13px] font-medium text-[#B99A63]">今日建议</p>
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

function ActionLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[3rem_minmax(0,1fr)] gap-3 rounded-[1.35rem] border border-[#E6DCCD] bg-[#FFFCF7]/72 p-3 text-sm leading-6">
      <p className="font-medium text-[#B99A63]">{label}</p>
      <p className="text-[#5E564F]">{value}</p>
    </div>
  );
}

function getDisplayColorName(name: string) {
  return name === "灰蓝" ? "雾蓝" : name;
}

function getReadableTextColor(hex: string) {
  const color = hex.replace("#", "");
  const red = Number.parseInt(color.slice(0, 2), 16);
  const green = Number.parseInt(color.slice(2, 4), 16);
  const blue = Number.parseInt(color.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.66 ? "#292521" : "#FFFCF7";
}
