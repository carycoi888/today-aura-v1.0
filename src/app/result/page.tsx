"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RotateCcw, Save, Sparkles } from "lucide-react";
import { AuraButton, auraButtonClass } from "@/components/app/aura-button";
import { PageShell } from "@/components/app/page-shell";
import { ShareCardPreview } from "@/components/app/share-card-preview";
import { Badge } from "@/components/ui/badge";
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
            <ColorSummary color={result.colors.avoid} label="规避" />
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

        <section className="space-y-4">
          <div>
            <p className="text-sm font-medium text-[#B99A63]">分享卡片预览</p>
            <h2 className="mt-1 text-2xl font-semibold">适合截图保存</h2>
            <p className="mt-2 text-sm leading-6 text-[#5E564F]">
              目前先做前端预览，不做真实图片导出。
            </p>
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
    color.role === "primary" ? "今日主色" : color.role === "secondary" ? "辅助色" : "规避色";

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
