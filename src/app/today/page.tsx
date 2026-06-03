"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, Sparkles } from "lucide-react";
import { AuraButton } from "@/components/app/aura-button";
import { OptionPill } from "@/components/app/option-pill";
import { PageShell } from "@/components/app/page-shell";
import {
  AURA_OPTIONS,
  DEFAULT_TODAY_INPUT,
  ENERGY_OPTIONS,
  EXTRA_NEED_FIELD,
  MOOD_OPTIONS,
  SCENE_OPTIONS,
  WEATHER_OPTIONS,
} from "@/lib/aura-options";
import { generateAuraResult } from "@/lib/aura-recommendation";
import {
  getProfile,
  getTodayInput,
  saveCurrentResult,
  saveTodayInput,
} from "@/lib/aura-storage";
import type { Option, TodayInput } from "@/lib/aura-types";

export default function TodayPage() {
  const router = useRouter();
  const [input, setInput] = useState<TodayInput>(DEFAULT_TODAY_INPUT);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    setInput(getTodayInput());
  }, []);

  const ready = useMemo(
    () =>
      Boolean(
        input.scene &&
          input.weather &&
          input.mood &&
          input.energy &&
          input.desiredAura,
      ),
    [input],
  );

  function update(field: keyof TodayInput, value: string) {
    setInput((current) => ({ ...current, [field]: value }));
  }

  function generate() {
    if (!ready || generating) {
      return;
    }

    setGenerating(true);
    const profile = getProfile();
    const result = generateAuraResult(profile, input, 0);
    saveTodayInput(input);
    saveCurrentResult(result);
    window.setTimeout(() => router.push("/result"), 240);
  }

  return (
    <PageShell>
      <div className="space-y-4">
        <header className="space-y-3">
          <div>
            <p className="text-sm font-medium text-[#B99A63]">今日输入</p>
            <h1 className="mt-2 text-[1.7rem] font-semibold leading-[1.1]">
              选择今天的状态
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#5E564F]">
              已选：{input.scene} · {input.weather} · {input.mood} · 精力{input.energy} · {input.desiredAura}
            </p>
          </div>
        </header>

        <OptionGroup
          title="今日场景"
          onChange={(value) => update("scene", value)}
          options={SCENE_OPTIONS}
          value={input.scene}
        />
        <OptionGroup
          title="天气"
          onChange={(value) => update("weather", value)}
          options={WEATHER_OPTIONS}
          value={input.weather}
        />
        <OptionGroup
          title="心情"
          onChange={(value) => update("mood", value)}
          options={MOOD_OPTIONS}
          value={input.mood}
        />
        <OptionGroup
          title="精力状态"
          onChange={(value) => update("energy", value)}
          options={ENERGY_OPTIONS}
          value={input.energy}
        />
        <OptionGroup
          title="想要气质"
          onChange={(value) => update("desiredAura", value)}
          options={AURA_OPTIONS}
          value={input.desiredAura}
        />

        <section className="rounded-[1.55rem] border border-[#E2D8CB] bg-[#FFFCF7] p-3.5">
          <label className="block">
            <span className="text-base font-semibold">{EXTRA_NEED_FIELD.label}</span>
            <span className="mt-1 block text-sm leading-6 text-[#7A6E62]">
              可选，不填写也能生成完整今日气场。
            </span>
            <textarea
              className="mt-3 min-h-20 w-full resize-none rounded-[1.25rem] border border-[#E2D8CB] bg-[#F8F3EA] p-3.5 text-sm leading-6 outline-none focus:ring-2 focus:ring-[#B99A63]/40"
              onChange={(event) => update("extraNeed", event.target.value)}
              placeholder={EXTRA_NEED_FIELD.placeholder}
              value={input.extraNeed ?? ""}
            />
          </label>
          <div className="mt-3 flex items-center gap-2 rounded-full border border-dashed border-[#E2D8CB] px-3 py-2 text-xs text-[#9B9288]">
            <Mic className="size-3.5" aria-hidden="true" />
            未来可支持语音快速输入；MVP 0.1 不实现真实语音识别。
          </div>
        </section>

        <AuraButton
          className="w-full"
          disabled={!ready || generating}
          onClick={generate}
        >
          <Sparkles className="size-4" />
          {generating ? "正在生成今日气场" : ready ? "生成今日气场" : "请先完成必要选择"}
        </AuraButton>
      </div>
    </PageShell>
  );
}

function OptionGroup({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <section className="rounded-[1.55rem] border border-[#E2D8CB] bg-[#FFFCF7] p-3.5">
      <div className="mb-2.5">
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <OptionPill
            key={option.id}
            label={option.label}
            onClick={() => onChange(option.label)}
            selected={value === option.label}
          />
        ))}
      </div>
    </section>
  );
}
