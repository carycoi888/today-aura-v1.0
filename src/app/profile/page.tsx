"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { AuraButton, auraButtonClass } from "@/components/app/aura-button";
import { OptionPill } from "@/components/app/option-pill";
import { PageShell } from "@/components/app/page-shell";
import {
  DEFAULT_PROFILE,
  OUTFIT_CONSTRAINT_OPTIONS,
  PROFILE_AVOID_COLOR_OPTIONS,
  PROFILE_COLOR_OPTIONS,
  SKIN_TONE_OPTIONS,
  STYLE_TAG_OPTIONS,
} from "@/lib/aura-options";
import { getProfile, saveProfile } from "@/lib/aura-storage";
import type { AuraProfile } from "@/lib/aura-types";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<AuraProfile>(DEFAULT_PROFILE);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  function toggleList(
    field: keyof Pick<AuraProfile, "styleTags" | "outfitConstraints">,
    value: string,
  ) {
    setProfile((current) => {
      const values = current[field];
      return {
        ...current,
        [field]: values.includes(value)
          ? values.filter((item) => item !== value)
          : [...values, value],
      };
    });
  }

  function toggleLimited(
    field: keyof Pick<AuraProfile, "colors" | "avoidColors">,
    value: string,
    limit = 3,
  ) {
    setProfile((current) => {
      const values = current[field];
      if (values.includes(value)) {
        return { ...current, [field]: values.filter((item) => item !== value) };
      }

      return { ...current, [field]: [...values, value].slice(-limit) };
    });
  }

  function handleSave() {
    saveProfile(profile);
    setSaved(true);
    window.setTimeout(() => router.push("/today"), 380);
  }

  return (
    <PageShell>
      <div className="space-y-5">
        <header className="space-y-3">
          <div>
            <p className="text-sm font-medium text-[#B99A63]">用户档案</p>
            <h1 className="mt-2 text-3xl font-semibold leading-[1.1]">
              建立你的审美基线
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#5E564F]">
              只记录每日建议需要的信息，不评价外貌。
            </p>
          </div>
        </header>

        <section className="rounded-[1.6rem] border border-[#E2D8CB] bg-[#FFFCF7] p-4">
          <label className="space-y-2">
            <span className="text-sm font-medium text-[#292521]">昵称</span>
            <input
              className="h-12 w-full rounded-full border border-[#E2D8CB] bg-[#F8F3EA] px-4 text-base outline-none focus:ring-2 focus:ring-[#B99A63]/40"
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  nickname: event.target.value,
                }))
              }
              value={profile.nickname}
            />
          </label>
        </section>

        <ChoiceCard title="常用风格" note="建议语气和轮廓。">
          {STYLE_TAG_OPTIONS.map((item) => (
            <OptionPill
              key={item}
              label={item}
              onClick={() => toggleList("styleTags", item)}
              selected={profile.styleTags.includes(item)}
            />
          ))}
        </ChoiceCard>

        <ChoiceCard
          title="偏好颜色"
          note={`最多 3 个，当前 ${profile.colors.length}/3。`}
        >
          {PROFILE_COLOR_OPTIONS.map((item) => (
            <OptionPill
              key={item}
              label={item}
              onClick={() => toggleLimited("colors", item)}
              selected={profile.colors.includes(item)}
            />
          ))}
        </ChoiceCard>

        <ChoiceCard
          title="不喜欢颜色"
          note={`最多 3 个，不会作为今日主色。`}
        >
          {PROFILE_AVOID_COLOR_OPTIONS.map((item) => (
            <OptionPill
              key={item}
              label={item}
              onClick={() => toggleLimited("avoidColors", item)}
              selected={profile.avoidColors.includes(item)}
            />
          ))}
        </ChoiceCard>

        <ChoiceCard title="肤色倾向" note="只用于脸周提亮，不做评价。">
          {SKIN_TONE_OPTIONS.map((item) => (
            <OptionPill
              key={item.id}
              label={item.label}
              onClick={() =>
                setProfile((current) => ({
                  ...current,
                  skinTone: item.label,
                }))
              }
              selected={profile.skinTone === item.label}
            />
          ))}
        </ChoiceCard>

        <ChoiceCard title="穿搭限制" note="让建议更可执行。">
          {OUTFIT_CONSTRAINT_OPTIONS.map((item) => (
            <OptionPill
              key={item.id}
              label={item.label}
              onClick={() => toggleList("outfitConstraints", item.label)}
              selected={profile.outfitConstraints.includes(item.label)}
            />
          ))}
        </ChoiceCard>

        <div className="space-y-3">
          <AuraButton className="w-full" onClick={handleSave}>
            <Save className="size-4" />
            {saved ? "已保存，前往今日输入" : "保存并进入今日输入"}
          </AuraButton>
          <Link className={auraButtonClass({ tone: "ghost", className: "w-full" })} href="/today">
            先用默认档案生成
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

function ChoiceCard({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.8rem] border border-[#E2D8CB] bg-[#FFFCF7] p-4">
      <div className="mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-[#7A6E62]">{note}</p>
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </section>
  );
}
