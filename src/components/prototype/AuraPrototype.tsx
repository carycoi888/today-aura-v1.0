"use client";

import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  Share2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BottomNav, type PrototypeNavKey } from "@/components/prototype/BottomNav";
import { HomeLuxuryScreen } from "@/components/prototype/HomeLuxuryScreen";
import { ProfileLuxuryScreen } from "@/components/prototype/ProfileLuxuryScreen";
import { SharePreviewModal } from "@/components/prototype/SharePreviewModal";
import { readableMutedTextColor, readableSoftLayer, readableTextColor } from "@/lib/aura/colorContrast";
import {
  defaultProfile,
  desiredAuraOptions,
  energyOptions,
  moodHints,
  moodOptions,
  profileStyleOptions,
  sceneOptions,
  weatherOptions,
} from "@/lib/aura/options";
import { generateDailyAura } from "@/lib/aura/mockGenerator";
import { findTodayResult, readProfile, readResults, saveResult, writeProfile } from "@/lib/aura/storage";
import type {
  AuraEnergy,
  AuraMood,
  AuraScene,
  AuraWeather,
  DailyAuraInput,
  DailyAuraResult,
  DesiredAura,
  UserProfile,
} from "@/lib/aura/types";

type Screen =
  | "home"
  | "scene"
  | "weather"
  | "mood"
  | "energy"
  | "aura"
  | "generating"
  | "overview"
  | "colors"
  | "outfit"
  | "makeup"
  | "share34"
  | "share916"
  | "history"
  | "regenerate"
  | "regenerated"
  | "shareOptions"
  | "mine"
  | "profile"
  | "styleEdit";

const defaultInput: DailyAuraInput = {
  scene: "通勤",
  weather: "阴",
  mood: "焦虑",
  energy: "中",
  desiredAura: "清冷",
  specialNeed: "今天想显得精神一点，但不要太用力。",
};

const blankInput: DailyAuraInput = {
  scene: "",
  weather: "",
  mood: "",
  energy: "",
  desiredAura: "",
  specialNeed: "",
};

export function AuraPrototype() {
  const reduceMotion = useReducedMotion();
  const [screen, setScreen] = useState<Screen>("home");
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [input, setInput] = useState<DailyAuraInput>(blankInput);
  const [result, setResult] = useState<DailyAuraResult | null>(null);
  const [history, setHistory] = useState<DailyAuraResult[]>([]);
  const [toast, setToast] = useState("");
  const [styleDraft, setStyleDraft] = useState<string[]>(defaultProfile.commonStyles);
  const [regeneratedUsed, setRegeneratedUsed] = useState(false);
  const isCurrentSaved = result ? history.some((item) => item.id === result.id) : false;
  const previewResult = result ?? generateDailyAura(defaultInput, profile, false);

  useEffect(() => {
    const storedProfile = readProfile();
    const todayResult = findTodayResult();
    setProfile(storedProfile);
    setStyleDraft(storedProfile.commonStyles);
    setHistory(readResults());
    if (todayResult) setResult(todayResult);
  }, []);

  useEffect(() => {
    if (screen !== "generating") return;
    const timer = window.setTimeout(() => {
      setScreen(result?.isRegenerated ? "regenerated" : "overview");
    }, reduceMotion ? 80 : 760);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, result, screen]);

  function updateInput<T extends keyof DailyAuraInput>(field: T, value: DailyAuraInput[T]) {
    setInput((current) => ({ ...current, [field]: value }));
  }

  function startGenerate() {
    const next = generateDailyAura(input, profile, false);
    saveResult(next);
    setResult(next);
    setHistory(readResults());
    setRegeneratedUsed(false);
    setScreen("generating");
  }

  function openDefaultResult() {
    const next = generateDailyAura(defaultInput, profile, false);
    saveResult(next);
    setInput(defaultInput);
    setResult(next);
    setHistory(readResults());
    setRegeneratedUsed(false);
    setScreen("overview");
  }

  function saveCurrent() {
    if (!result) return;
    saveResult(result);
    setHistory(readResults());
    setToast("已保存今日气场，可以在记录中查看");
    window.setTimeout(() => setToast(""), 1600);
  }

  function confirmRegenerate() {
    if (!result || regeneratedUsed) return;
    const next = generateDailyAura(result.input, profile, true);
    saveResult(next);
    setResult(next);
    setHistory(readResults());
    setRegeneratedUsed(true);
    setScreen("generating");
  }

  function saveProfileAndReturn(nextProfile = profile) {
    writeProfile(nextProfile);
    setProfile(nextProfile);
    setToast("档案已保存");
    setScreen("profile");
    window.setTimeout(() => setToast(""), 1200);
  }

  const currentScreen = (() => {
    switch (screen) {
      case "scene":
        return (
          <ChoiceScreen
            title="今天主要去哪？"
            options={sceneOptions}
            value={input.scene}
            onBack={() => setScreen("home")}
            onNext={() => setScreen("weather")}
            onSelect={(value) => updateInput("scene", value as AuraScene)}
            step="1 / 5"
          />
        );
      case "weather":
        return (
          <ChoiceScreen
            title="外面是什么状态？"
            options={weatherOptions.map((item) => (item === "晴" ? "晴天" : item === "阴" ? "阴天" : item === "雨" ? "雨天" : item))}
            value={displayWeather(input.weather)}
            onBack={() => setScreen("scene")}
            onNext={() => setScreen("mood")}
            onSelect={(value) => updateInput("weather", parseWeather(value))}
            step="2 / 5"
          />
        );
      case "mood":
        return (
          <ChoiceScreen
            title="你现在感觉如何？"
            options={moodOptions}
            value={input.mood}
            hint={input.mood ? moodHints[input.mood as AuraMood] : "选择当下真实状态，建议会相应降低或增加复杂度。"}
            onBack={() => setScreen("weather")}
            onNext={() => setScreen("energy")}
            onSelect={(value) => updateInput("mood", value as AuraMood)}
            step="3 / 5"
          />
        );
      case "energy":
        return (
          <ChoiceScreen
            title="今天的精力状态如何？"
            options={energyOptions}
            value={input.energy}
            onBack={() => setScreen("mood")}
            onNext={() => setScreen("aura")}
            onSelect={(value) => updateInput("energy", value as AuraEnergy)}
            step="4 / 5"
          />
        );
      case "aura":
        return (
          <AuraChoiceScreen
            input={input}
            onBack={() => setScreen("energy")}
            onGenerate={startGenerate}
            onSelect={(value) => updateInput("desiredAura", value)}
            onSpecialNeed={(value) => updateInput("specialNeed", value)}
          />
        );
      case "generating":
        return <GeneratingScreen input={input} />;
      case "overview":
      case "regenerated":
        return result ? (
          <OverviewScreen
            result={result}
            regeneratedUsed={regeneratedUsed || result.isRegenerated}
            regeneratedView={screen === "regenerated"}
            onRegenerate={confirmRegenerate}
            onSharePick={(message) => {
              setToast(message);
              window.setTimeout(() => setToast(""), 1500);
            }}
          />
        ) : (
          <EmptyResult onGenerate={() => setScreen("scene")} />
        );
      case "colors":
        return result ? <DetailScreen result={result} saved={isCurrentSaved} tab="colors" onTab={setScreen} onSave={saveCurrent} onRegenerate={() => setScreen("regenerate")} /> : <EmptyResult onGenerate={() => setScreen("scene")} />;
      case "outfit":
        return result ? <DetailScreen result={result} saved={isCurrentSaved} tab="outfit" onTab={setScreen} onSave={saveCurrent} onRegenerate={() => setScreen("regenerate")} /> : <EmptyResult onGenerate={() => setScreen("scene")} />;
      case "makeup":
        return result ? <DetailScreen result={result} saved={isCurrentSaved} tab="makeup" onTab={setScreen} onSave={saveCurrent} onRegenerate={() => setScreen("regenerate")} /> : <EmptyResult onGenerate={() => setScreen("scene")} />;
      case "share34":
        return result ? <SharePreviewScreen ratio="3:4" result={result} onBack={() => setScreen("overview")} onLong={() => setScreen("share916")} onSave={saveCurrent} onShare={() => setScreen("shareOptions")} /> : <EmptyResult onGenerate={() => setScreen("scene")} />;
      case "share916":
        return result ? <SharePreviewScreen ratio="9:16" result={result} onBack={() => setScreen("share34")} onSave={saveCurrent} onShare={() => setScreen("shareOptions")} /> : <EmptyResult onGenerate={() => setScreen("scene")} />;
      case "history":
        return <HistoryScreen history={history} onOpen={(item) => { setResult(item); setScreen("overview"); }} onGenerate={() => setScreen("scene")} />;
      case "regenerate":
        return result ? <RegenerateConfirm result={result} disabled={regeneratedUsed || result.isRegenerated} onCancel={() => setScreen("overview")} onConfirm={confirmRegenerate} /> : <EmptyResult onGenerate={() => setScreen("scene")} />;
      case "shareOptions":
        return result ? <ShareOptionsScreen result={result} onCancel={() => setScreen("share34")} onPick={(message) => { setToast(message); window.setTimeout(() => setToast(""), 1400); }} /> : <EmptyResult onGenerate={() => setScreen("scene")} />;
      case "mine":
        return (
          <ProfileLuxuryScreen
            history={history}
            onEdit={() => setScreen("profile")}
            onOpenResult={(item) => {
              if (item) setResult(item);
              else setResult(previewResult);
              setScreen("overview");
            }}
            profile={profile}
            result={previewResult}
          />
        );
      case "profile":
        return <ProfileEntryScreen profile={profile} onDone={() => setScreen("home")} onEdit={() => setScreen("styleEdit")} onProfile={setProfile} onSave={() => saveProfileAndReturn(profile)} />;
      case "styleEdit":
        return (
          <StyleEditScreen
            selected={styleDraft}
            onBack={() => setScreen("profile")}
            onSave={() => {
              const next = { ...profile, commonStyles: styleDraft };
              setProfile(next);
              saveProfileAndReturn(next);
            }}
            onToggle={(item) => {
              setStyleDraft((current) => {
                if (current.includes(item)) return current.filter((value) => value !== item);
                if (current.length >= 3) {
                  setToast("最多选择 3 项常用风格");
                  window.setTimeout(() => setToast(""), 1200);
                  return current;
                }
                return [...current, item];
              });
            }}
          />
        );
      default:
        return (
          <HomeLuxuryScreen
            onGenerate={() => setScreen("scene")}
            onOpenProfile={() => setScreen("mine")}
            onOpenRecent={() => {
              if (result) setScreen("overview");
              else openDefaultResult();
            }}
            profile={profile}
            recent={history[0]}
            result={previewResult}
          />
        );
    }
  })();

  return (
    <MotionConfig reducedMotion="user">
      <main className="h-dvh overflow-hidden bg-[#F8F3EA] text-[#292521]">
        <section className="mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden bg-[#F8F3EA]">
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                animate={{ opacity: 1, y: 0 }}
                className="h-full overflow-y-auto px-5 pb-6 pt-[calc(env(safe-area-inset-top)+22px)]"
                exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                {currentScreen}
              </motion.div>
            </AnimatePresence>
            <AnimatePresence>
              {toast ? <Toast message={toast} /> : null}
            </AnimatePresence>
          </div>
          <BottomNav active={screen} onGo={(key: PrototypeNavKey) => setScreen(key)} />
        </section>
      </main>
    </MotionConfig>
  );
}

function ChoiceScreen({
  title,
  options,
  value,
  hint,
  step,
  onSelect,
  onNext,
  onBack,
}: {
  title: string;
  options: string[];
  value: string;
  hint?: string;
  step: string;
  onSelect: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <BackButton onClick={onBack} />
      <h1 className="mt-6 text-[24px] font-semibold">{title}</h1>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {options.map((item) => <ChoiceChip key={item} selected={value === item} onClick={() => onSelect(item)}>{item}</ChoiceChip>)}
      </div>
      {hint ? <p className="mt-6 rounded-[18px] bg-[#EFE7DC] p-4 text-sm leading-6 text-[#7A6E62]">{hint}</p> : null}
      <div className="mt-auto pt-10">
        <StepDots step={step} />
        <PrimaryButton disabled={!value} onClick={onNext}>下一步</PrimaryButton>
      </div>
    </div>
  );
}

function AuraChoiceScreen({
  input,
  onSelect,
  onSpecialNeed,
  onGenerate,
  onBack,
}: {
  input: DailyAuraInput;
  onSelect: (value: DesiredAura) => void;
  onSpecialNeed: (value: string) => void;
  onGenerate: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <BackButton onClick={onBack} />
      <h1 className="mt-6 text-[24px] font-semibold">今天想要的气质是？</h1>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {desiredAuraOptions.map((item) => <ChoiceChip key={item} selected={input.desiredAura === item} onClick={() => onSelect(item)}>{item}</ChoiceChip>)}
      </div>
      <label className="mt-6 block rounded-[22px] border border-[#E2D8CB] bg-[#FFFCF7] p-4">
        <span className="text-sm font-semibold">今天有什么特别诉求？</span>
        <textarea className="mt-3 min-h-24 w-full resize-none rounded-[18px] border border-[#E2D8CB] bg-[#F8F3EA] p-3 text-sm outline-none" placeholder="例如：今天要见客户，有点疲惫，想显精神但不要太强势。" value={input.specialNeed ?? ""} onChange={(event) => onSpecialNeed(event.target.value)} />
      </label>
      <div className="mt-8">
        <StepDots step="5 / 5" />
        <PrimaryButton disabled={!input.desiredAura} onClick={onGenerate}>生成今日气场</PrimaryButton>
      </div>
    </div>
  );
}

function GeneratingScreen({ input }: { input: DailyAuraInput }) {
  return (
    <div className="grid min-h-[640px] place-items-center text-center">
      <div>
        <div className="relative mx-auto h-48 w-48">
          {["#8EA1A8", "#F3EBDD", "#D8A7A0", "#3C3630"].map((color, index) => (
            <motion.div
              animate={{ rotate: (index - 1.5) * 12, x: (index - 1.5) * 20, y: index * 5 }}
              className="absolute left-12 top-8 h-32 w-24 rounded-[20px] shadow-[0_18px_38px_rgba(60,54,48,0.12)]"
              initial={{ rotate: 0, x: 0, y: 0 }}
              key={color}
              style={{ backgroundColor: color }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            />
          ))}
        </div>
        <h1 className="mt-8 text-[22px] font-semibold">正在整理你的今日色彩和出现方式...</h1>
        <p className="mt-3 text-sm leading-6 text-[#5E564F]">匹配你的{input.scene}、{input.mood}和{input.desiredAura}感。</p>
        <div className="mt-8 h-1 overflow-hidden rounded-full bg-[#E2D8CB]">
          <motion.div animate={{ width: "100%" }} className="h-full bg-[#B99A63]" initial={{ width: "18%" }} transition={{ duration: 0.7, ease: "easeOut" }} />
        </div>
      </div>
    </div>
  );
}

function OverviewScreen({
  result,
  regeneratedView,
  regeneratedUsed,
  onRegenerate,
  onSharePick,
}: {
  result: DailyAuraResult;
  regeneratedView: boolean;
  regeneratedUsed: boolean;
  onRegenerate: () => void;
  onSharePick: (message: string) => void;
}) {
  const [activeAdvice, setActiveAdvice] = useState<"outfit" | "makeup">("outfit");
  const [shareOpen, setShareOpen] = useState(false);
  const heroTextColor = readableTextColor(result.primaryColor.hex);
  const heroMutedColor = readableMutedTextColor(result.primaryColor.hex);
  const heroLayer = readableSoftLayer(result.primaryColor.hex);

  return (
    <div className="space-y-5">
      <motion.section
        animate="show"
        className="overflow-hidden rounded-[30px] border border-[#D6C8BA] bg-[#FFFCF7] shadow-[0_18px_50px_rgba(60,54,48,0.12)]"
        initial="hidden"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        <motion.div
          className="relative min-h-[286px] overflow-hidden p-5"
          style={{ backgroundColor: result.primaryColor.hex, color: heroTextColor }}
          variants={riseVariant}
        >
          <div
            aria-hidden="true"
            className="absolute bottom-[-64px] right-[-46px] h-44 w-44 rounded-full blur-2xl"
            style={{ backgroundColor: heroLayer.background }}
          />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-sm" style={{ color: heroMutedColor }}>今日气场</p>
              <h1 className="mt-2 text-[42px] font-semibold leading-none tracking-normal">{result.title}</h1>
            </div>
            <div
              className="rounded-[18px] border px-3 py-2 text-right"
              style={{ backgroundColor: heroLayer.background, borderColor: heroLayer.border }}
            >
              <CalendarDays className="ml-auto size-4" style={{ color: heroMutedColor }} />
              <p className="mt-2 text-xs leading-4" style={{ color: heroMutedColor }}>{result.date}</p>
            </div>
          </div>

          <div className="relative mt-10">
            <p className="text-xs" style={{ color: heroMutedColor }}>Main Color</p>
            <h2 className="mt-1 text-[58px] font-semibold leading-none">{result.primaryColor.name}</h2>
            <p className="mt-4 max-w-[16rem] text-sm leading-6" style={{ color: heroMutedColor }}>{result.dailyQuote}</p>
          </div>
        </motion.div>

        <motion.div className="space-y-4 p-4" variants={riseVariant}>
          <div className="grid grid-cols-3 gap-3">
            <MiniColor color={result.primaryColor.hex} label="主色" name={result.primaryColor.name} />
            <MiniColor color={result.secondaryColor.hex} label="辅助" name={result.secondaryColor.name} />
            <MiniColor color={result.accentColor.hex} label="点缀" name={result.accentColor.name} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <PrimaryButton onClick={() => setShareOpen(true)}>
              <Share2 className="size-4" />
              分享卡片
            </PrimaryButton>
            <SoftButton disabled={regeneratedUsed} onClick={onRegenerate}>
              <RefreshCcw className="size-4" />
              {regeneratedUsed ? "已重新生成" : "重新生成"}
            </SoftButton>
          </div>
        </motion.div>
      </motion.section>

      {regeneratedView ? <p className="rounded-full bg-[#EFE7DC] px-4 py-2 text-sm text-[#7A6E62]">已根据同样的输入换一个角度。</p> : null}

      <section className="rounded-[26px] border border-[#E2D8CB] bg-[#FFFCF7] p-4 shadow-[0_12px_36px_rgba(60,54,48,0.08)]">
        <div className="grid grid-cols-2 gap-2 rounded-full bg-[#EFE7DC] p-1">
          {[
            ["outfit", "穿搭建议"],
            ["makeup", "妆容配饰"],
          ].map(([key, label]) => (
            <button
              className={`h-10 rounded-full text-sm transition ${activeAdvice === key ? "bg-[#FFFCF7] font-semibold text-[#292521] shadow-sm" : "text-[#7A6E62]"}`}
              key={key}
              onClick={() => setActiveAdvice(key as "outfit" | "makeup")}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
        {activeAdvice === "outfit" ? (
          <ResultAdviceCard
            items={[
              ["整体轮廓", result.outfitAdvice.silhouette],
              ["上装", result.outfitAdvice.top],
              ["下装", result.outfitAdvice.bottom],
              ["外套", result.outfitAdvice.outerwear],
              ["鞋包", result.outfitAdvice.shoesBag],
              ["替代方案", result.outfitAdvice.alternative],
            ]}
            title="穿搭建议"
          />
        ) : (
          <ResultAdviceCard
            items={[
              ["妆感", result.makeupAdvice.finish],
              ["唇色", result.makeupAdvice.lip],
              ["眼妆", result.makeupAdvice.eye],
              ["发型", result.makeupAdvice.hair],
              ["配饰", result.makeupAdvice.accessory],
              ["小物 / 香氛", result.makeupAdvice.item],
            ]}
            title="妆容配饰"
          />
        )}
      </section>

      <AnimatePresence>
        {shareOpen ? (
          <SharePreviewModal
            onCancel={() => setShareOpen(false)}
            onShare={(message) => {
              setShareOpen(false);
              onSharePick(message);
            }}
            result={result}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ResultAdviceCard({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mt-5 space-y-4"
      initial={{ opacity: 0, y: 8 }}
      key={title}
      transition={{ duration: 0.2 }}
    >
      <div>
        <p className="text-xs font-semibold text-[#B99A63]">{title}</p>
        <h2 className="mt-1 text-[22px] font-semibold text-[#292521]">今天可以这样出现</h2>
      </div>
      <div className="space-y-3 text-sm leading-6 text-[#5E564F]">
        {items.map(([label, value]) => (
          <p key={label}>
            <span className="font-semibold text-[#292521]">{label}：</span>
            {value}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

function DetailScreen({
  result,
  saved,
  tab,
  onTab,
  onSave,
  onRegenerate,
}: {
  result: DailyAuraResult;
  saved: boolean;
  tab: "colors" | "outfit" | "makeup";
  onTab: (screen: Screen) => void;
  onSave: () => void;
  onRegenerate: () => void;
}) {
  return (
    <div className="space-y-4">
      <BackButton onClick={() => onTab("overview")} />
      <Tabs active={tab} onTab={onTab} />
      {tab === "colors" ? (
        <AdvicePanel title="为什么是这个主色">
          <p>{result.colorExplanation}</p>
          <InfoLine label="如何使用主色" value={result.primaryColor.usage} />
          <InfoLine label="点缀色说明" value={result.accentColor.reason} />
        </AdvicePanel>
      ) : null}
      {tab === "outfit" ? (
        <AdvicePanel title="穿搭建议">
          <InfoLine label="整体轮廓" value={result.outfitAdvice.silhouette} />
          <InfoLine label="上装" value={result.outfitAdvice.top} />
          <InfoLine label="下装" value={result.outfitAdvice.bottom} />
          <InfoLine label="外套" value={result.outfitAdvice.outerwear} />
          <InfoLine label="鞋包" value={result.outfitAdvice.shoesBag} />
          <InfoLine label="替代方案" value={result.outfitAdvice.alternative} />
        </AdvicePanel>
      ) : null}
      {tab === "makeup" ? (
        <AdvicePanel title="妆容配饰">
          <InfoLine label="妆感" value={result.makeupAdvice.finish} />
          <InfoLine label="唇色" value={result.makeupAdvice.lip} />
          <InfoLine label="眼妆" value={result.makeupAdvice.eye} />
          <InfoLine label="发型" value={result.makeupAdvice.hair} />
          <InfoLine label="配饰" value={result.makeupAdvice.accessory} />
          <InfoLine label="小物 / 香氛方向" value={result.makeupAdvice.item} />
        </AdvicePanel>
      ) : null}
      <div className="grid grid-cols-2 gap-3">
        <SoftButton onClick={onRegenerate}>重新生成</SoftButton>
        <PrimaryButton onClick={onSave}>{saved ? "已保存" : "保存卡片"}</PrimaryButton>
      </div>
    </div>
  );
}

function SharePreviewScreen({
  result,
  ratio,
  onBack,
  onLong,
  onSave,
  onShare,
}: {
  result: DailyAuraResult;
  ratio: "3:4" | "9:16";
  onBack: () => void;
  onLong?: () => void;
  onSave: () => void;
  onShare: () => void;
}) {
  return (
    <div className="space-y-4">
      <BackButton onClick={onBack} />
      <h1 className="text-[24px] font-semibold">{ratio === "3:4" ? "分享卡片预览" : "长图分享预览 9:16"}</h1>
      <ShareCard result={result} ratio={ratio} />
      <div className="grid grid-cols-2 gap-3">
        <SoftButton onClick={onSave}>{ratio === "3:4" ? "保存到相册" : "保存长图"}</SoftButton>
        <PrimaryButton onClick={onShare}>分享给好友</PrimaryButton>
      </div>
      {onLong ? <SoftButton onClick={onLong}>查看 9:16 长图</SoftButton> : null}
    </div>
  );
}

function HistoryScreen({ history, onOpen, onGenerate }: { history: DailyAuraResult[]; onOpen: (result: DailyAuraResult) => void; onGenerate: () => void }) {
  const groups = groupHistoryByMonthAndDay(history);
  const [collapsedMonths, setCollapsedMonths] = useState<string[]>([]);

  function toggleMonth(key: string) {
    setCollapsedMonths((current) => (
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    ));
  }

  return (
    <div className="space-y-5">
      <h1 className="text-[30px] font-semibold">记录列表</h1>
      {groups.length ? groups.map((month) => {
        const collapsed = collapsedMonths.includes(month.key);
        return (
          <section className="space-y-3" key={month.key}>
            <button
              className="flex w-full items-center justify-between text-left"
              onClick={() => toggleMonth(month.key)}
              type="button"
            >
              <span className="text-[18px] font-semibold text-[#9B9288]">{month.label}</span>
              <span className="flex items-center gap-2 text-sm font-semibold text-[#9B9288]">
                {month.count} 条
                {collapsed ? <ChevronRight className="size-4" /> : <ChevronDown className="size-4" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {!collapsed ? (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  className="space-y-4 overflow-hidden"
                  exit={{ height: 0, opacity: 0 }}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  {month.days.map((day) => (
                    <section className="space-y-2" key={day.key}>
                      <p className="px-1 text-sm font-semibold text-[#B99A63]">{day.label}</p>
                      <div className="overflow-hidden rounded-[22px] border border-[#E2D8CB] bg-[#FFFCF7] shadow-[0_8px_24px_rgba(60,54,48,0.05)]">
                        {day.items.map((item, index) => (
                          <button
                            className={`flex w-full items-center justify-between gap-3 p-4 text-left ${index > 0 ? "border-t border-[#E2D8CB]" : ""}`}
                            key={item.id}
                            onClick={() => onOpen(item)}
                            type="button"
                          >
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[17px] font-semibold text-[#292521]">
                                {formatHistoryDate(item)} · {item.title}
                              </span>
                              <span className="mt-2 block truncate text-sm text-[#7A6E62]">
                                {item.input.scene} · {item.input.mood} · {item.input.desiredAura}
                              </span>
                            </span>
                            <span className="flex shrink-0 gap-1">
                              {[item.primaryColor, item.secondaryColor, item.accentColor].map((color) => (
                                <span
                                  className="size-4 rounded-full border border-[#E2D8CB]"
                                  key={`${item.id}-${color.role}`}
                                  style={{ backgroundColor: color.hex }}
                                />
                              ))}
                            </span>
                            <ChevronRight className="size-4 shrink-0 text-[#B8AEA3]" />
                          </button>
                        ))}
                      </div>
                    </section>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </section>
        );
      }) : (
        <section className="rounded-[24px] border border-[#E2D8CB] bg-[#FFFCF7] p-5">
          <p className="text-sm leading-6 text-[#5E564F]">还没有记录。生成今日气场后，会在这里按年月日展示。</p>
          <PrimaryButton className="mt-5" onClick={onGenerate}>生成今日气场</PrimaryButton>
        </section>
      )}
    </div>
  );
}

function groupHistoryByMonthAndDay(history: DailyAuraResult[]) {
  const monthMap = new Map<string, { key: string; label: string; count: number; days: Map<string, { key: string; label: string; items: DailyAuraResult[] }> }>();

  history
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .forEach((item) => {
      const date = getResultDate(item);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const dayKey = `${monthKey}-${String(date.getDate()).padStart(2, "0")}`;
      if (!monthMap.has(monthKey)) {
        monthMap.set(monthKey, {
          key: monthKey,
          label: `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`,
          count: 0,
          days: new Map(),
        });
      }
      const month = monthMap.get(monthKey);
      if (!month) return;
      if (!month.days.has(dayKey)) {
        month.days.set(dayKey, {
          key: dayKey,
          label: `${date.getMonth() + 1} 月 ${date.getDate()} 日`,
          items: [],
        });
      }
      const day = month.days.get(dayKey);
      if (!day) return;
      day.items.push(item);
      month.count += 1;
    });

  return Array.from(monthMap.values()).map((month) => ({
    key: month.key,
    label: month.label,
    count: month.count,
    days: Array.from(month.days.values()),
  }));
}

function getResultDate(result: DailyAuraResult) {
  const date = new Date(result.createdAt);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function formatHistoryDate(result: DailyAuraResult) {
  const date = getResultDate(result);
  const weekday = new Intl.DateTimeFormat("zh-CN", { weekday: "short" }).format(date);
  return `${date.getMonth() + 1}月${date.getDate()}日${weekday}`;
}

function RegenerateConfirm({ result, disabled, onCancel, onConfirm }: { result: DailyAuraResult; disabled: boolean; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="relative min-h-[650px]">
      <OverviewGhost result={result} />
      <motion.section animate={{ y: 0, opacity: 1 }} className="absolute inset-x-0 bottom-6 rounded-t-[28px] border border-[#E2D8CB] bg-[#FFFCF7] p-5 shadow-[0_-16px_44px_rgba(60,54,48,0.18)]" initial={{ y: 40, opacity: 0 }}>
        <h1 className="text-[22px] font-semibold">重新生成今日气场？</h1>
        <p className="mt-3 text-sm leading-6 text-[#5E564F]">{disabled ? "这组输入已经重新生成过一次，为了保持建议稳定，不能再次刷新。" : "你基于同样的输入可以重新生成一次。"}</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <SoftButton onClick={onCancel}>取消</SoftButton>
          <PrimaryButton disabled={disabled} onClick={onConfirm}>重新生成</PrimaryButton>
        </div>
      </motion.section>
    </div>
  );
}

function ShareOptionsScreen({ result, onCancel, onPick }: { result: DailyAuraResult; onCancel: () => void; onPick: (message: string) => void }) {
  const options = ["微信好友", "朋友圈", "小红书", "保存图片"];
  return (
    <div className="space-y-4">
      <BackButton onClick={onCancel} />
      <ShareCard result={result} ratio="3:4" small />
      <section className="rounded-[24px] border border-[#E2D8CB] bg-[#FFFCF7] p-4">
        <h1 className="text-[22px] font-semibold">分享方式选择</h1>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {options.map((item) => <SoftButton key={item} onClick={() => onPick(item === "保存图片" ? "已保存到本地记录" : "已准备好分享卡片")}>{item}</SoftButton>)}
        </div>
        <SoftButton className="mt-3" onClick={onCancel}>取消</SoftButton>
      </section>
    </div>
  );
}

function ProfileEntryScreen({ profile, onProfile, onEdit, onSave, onDone }: { profile: UserProfile; onProfile: (profile: UserProfile) => void; onEdit: () => void; onSave: () => void; onDone: () => void }) {
  return (
    <div className="space-y-4">
      <h1 className="text-[26px] font-semibold">我的档案</h1>
      <section className="rounded-[24px] border border-[#E2D8CB] bg-[#FFFCF7] p-4">
        <label className="text-sm text-[#9B9288]">昵称</label>
        <input className="mt-2 h-12 w-full rounded-full border border-[#E2D8CB] bg-[#F8F3EA] px-4 outline-none" value={profile.nickname} onChange={(event) => onProfile({ ...profile, nickname: event.target.value })} />
      </section>
      <ProfileRow label="常用风格" value={profile.commonStyles.join("、")} onClick={onEdit} />
      <ProfileRow label="常穿颜色" value={profile.commonColors.join("、")} onClick={() => onProfile({ ...profile, commonColors: rotate(profile.commonColors, ["灰蓝", "奶油白", "燕麦色", "炭褐"]) })} />
      <ProfileRow label="不喜欢颜色" value={profile.dislikedColors.join("、")} onClick={() => onProfile({ ...profile, dislikedColors: rotate(profile.dislikedColors, ["荧光粉", "高饱和橙", "亮紫"]) })} />
      <ProfileRow label="希望呈现的气质" value={profile.desiredAuras.join("、")} onClick={() => onProfile({ ...profile, desiredAuras: rotate(profile.desiredAuras, ["干净", "稳定", "松弛"]) })} />
      <ProfileRow label="穿搭限制" value={profile.constraints.join("、")} onClick={() => onProfile({ ...profile, constraints: rotate(profile.constraints, ["低维护", "需要走路", "不穿高跟"]) })} />
      <div className="grid grid-cols-2 gap-3">
        <SoftButton onClick={onDone}>完成</SoftButton>
        <PrimaryButton onClick={onSave}>保存档案</PrimaryButton>
      </div>
    </div>
  );
}

function StyleEditScreen({ selected, onToggle, onSave, onBack }: { selected: string[]; onToggle: (item: string) => void; onSave: () => void; onBack: () => void }) {
  return (
    <div className="space-y-5">
      <BackButton onClick={onBack} />
      <div>
        <h1 className="text-[26px] font-semibold">常用风格</h1>
        <p className="mt-2 text-sm text-[#7A6E62]">可多选 3 项，已选 {selected.length}/3。</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {profileStyleOptions.map((item) => <ChoiceChip key={item} selected={selected.includes(item)} onClick={() => onToggle(item)}>{item}</ChoiceChip>)}
      </div>
      <PrimaryButton onClick={onSave}>保存</PrimaryButton>
    </div>
  );
}

function ShareCard({ result, ratio, small = false }: { result: DailyAuraResult; ratio: "3:4" | "9:16"; small?: boolean }) {
  return (
    <motion.div whileHover={{ y: -3 }} className={`mx-auto w-full max-w-[320px] rounded-[30px] border border-[#E2D8CB] bg-[#FFFCF7] p-5 shadow-[0_18px_46px_rgba(60,54,48,0.14)] ${ratio === "9:16" ? "aspect-[9/16]" : "aspect-[3/4]"} ${small ? "max-w-[210px] text-[0.8em]" : ""}`}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-serif font-semibold">Today Aura</span>
        <span>{result.date}</span>
      </div>
      <h2 className="mt-8 text-center text-[34px] font-semibold tracking-normal">{result.title}</h2>
      <div className={`mt-7 grid ${ratio === "9:16" ? "grid-cols-1 gap-3" : "grid-cols-3 gap-3"}`}>
        {[result.primaryColor, result.secondaryColor, result.accentColor].map((color) => (
          <div key={color.name}>
            <div className="h-16 rounded-[14px]" style={{ backgroundColor: color.hex }} />
            <p className="mt-2 text-center text-xs font-semibold">{color.name}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 rounded-[20px] bg-[#F8F3EA] p-4">
        <p className="text-xs text-[#9B9288]">穿搭关键词</p>
        <p className="mt-2 text-sm font-semibold">{result.shareCard.outfitKeywords.join(" · ")}</p>
      </div>
      <p className="mt-6 text-[20px] font-semibold leading-8">{result.dailyQuote}</p>
    </motion.div>
  );
}

const riseVariant = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22 } },
};

function Tabs({ active, onTab }: { active: "colors" | "outfit" | "makeup"; onTab: (screen: Screen) => void }) {
  const tabs = [
    ["colors", "颜色解释"],
    ["outfit", "穿搭建议"],
    ["makeup", "妆容配饰"],
  ] as const;
  return (
    <div className="grid grid-cols-3 gap-2 rounded-full bg-[#EFE7DC] p-1">
      {tabs.map(([key, label]) => <button className={`h-10 rounded-full text-sm ${active === key ? "bg-[#FFFCF7] font-semibold shadow-sm" : "text-[#7A6E62]"}`} key={key} onClick={() => onTab(key)} type="button">{label}</button>)}
    </div>
  );
}

function ChoiceChip({ children, selected, onClick }: { children: React.ReactNode; selected: boolean; onClick: () => void }) {
  return <motion.button whileTap={{ scale: 0.96 }} className={`min-h-12 rounded-[16px] border px-3 text-sm transition ${selected ? "border-[#B99A63] bg-[#EFE7DC] font-semibold shadow-[0_8px_22px_rgba(185,154,99,0.16)]" : "border-[#E2D8CB] bg-[#FFFCF7] text-[#5E564F]"}`} onClick={onClick} type="button">{children}</motion.button>;
}

function PrimaryButton({ children, onClick, disabled, className = "" }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; className?: string }) {
  return <motion.button whileTap={{ scale: disabled ? 1 : 0.98 }} className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-[16px] px-4 text-sm font-semibold ${disabled ? "bg-[#D8CFC2] text-[#9B9288]" : "bg-[#292521] text-[#FFFCF7]"} ${className}`} disabled={disabled} onClick={onClick} type="button">{children}</motion.button>;
}

function SoftButton({ children, onClick, disabled, className = "" }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; className?: string }) {
  return <button className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-[16px] border border-[#E2D8CB] bg-[#FFFCF7] px-3 text-sm font-semibold ${disabled ? "text-[#B8AEA3]" : "text-[#292521]"} ${className}`} disabled={disabled} onClick={onClick} type="button">{children}</button>;
}

function BackButton({ onClick }: { onClick: () => void }) {
  return <button className="flex size-9 items-center justify-center rounded-full border border-[#E2D8CB] bg-[#FFFCF7]" onClick={onClick} type="button"><ChevronLeft className="size-4" /></button>;
}

function StepDots({ step }: { step: string }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-2">
      <span className="text-xs text-[#9B9288]">{step}</span>
      {[1, 2, 3].map((item) => <span className="size-1.5 rounded-full bg-[#B99A63]" key={item} />)}
    </div>
  );
}

function Toast({ message }: { message: string }) {
  return <motion.div animate={{ opacity: 1, y: 0 }} className="absolute left-8 right-8 top-[calc(env(safe-area-inset-top)+18px)] z-20 rounded-[20px] bg-[#FFFCF7] p-4 text-center shadow-[0_18px_48px_rgba(60,54,48,0.2)]" exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }}><Check className="mx-auto mb-2 size-6 text-[#B99A63]" /><p className="text-sm font-semibold">{message}</p></motion.div>;
}

function MiniColor({ label, name, color }: { label: string; name: string; color: string }) {
  return <div className="rounded-[20px] bg-[#F8F3EA] p-3"><div className="h-16 rounded-[14px]" style={{ backgroundColor: color }} /><p className="mt-2 text-xs text-[#9B9288]">{label}</p><p className="font-semibold">{name}</p></div>;
}

function AdvicePanel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-[24px] border border-[#E2D8CB] bg-[#FFFCF7] p-5"><h1 className="text-[24px] font-semibold">{title}</h1><div className="mt-4 space-y-4 text-sm leading-7 text-[#5E564F]">{children}</div></section>;
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[18px] bg-[#F8F3EA] p-4"><p className="text-xs font-semibold text-[#B99A63]">{label}</p><p className="mt-2">{value}</p></div>;
}

function OverviewGhost({ result }: { result: DailyAuraResult }) {
  return <div className="pointer-events-none space-y-4 opacity-35 blur-[2px]"><h1 className="text-[34px] font-semibold">{result.title}</h1><div className="h-56 rounded-[28px]" style={{ backgroundColor: result.primaryColor.hex }} /></div>;
}

function EmptyResult({ onGenerate }: { onGenerate: () => void }) {
  return <section className="rounded-[24px] border border-[#E2D8CB] bg-[#FFFCF7] p-5"><h1 className="text-[24px] font-semibold">还没有今日结果</h1><p className="mt-3 text-sm leading-6 text-[#5E564F]">先选择今天的场景和状态，再生成今日气场。</p><PrimaryButton className="mt-5" onClick={onGenerate}>生成今日气场</PrimaryButton></section>;
}

function ProfileRow({ label, value, onClick }: { label: string; value: string; onClick: () => void }) {
  return (
    <button
      className="flex w-full items-center gap-3 rounded-[22px] border border-[#E2D8CB] bg-[#FFFCF7] p-4 text-left"
      onClick={onClick}
      type="button"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-[#9B9288]">{label}</span>
        <span className="mt-2 block truncate font-semibold">{value}</span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-[#B8AEA3]" />
    </button>
  );
}

function displayWeather(value: string) {
  if (value === "晴") return "晴天";
  if (value === "阴") return "阴天";
  if (value === "雨") return "雨天";
  return value;
}

function parseWeather(value: string): AuraWeather {
  if (value === "晴天") return "晴";
  if (value === "阴天") return "阴";
  if (value === "雨天") return "雨";
  return value as AuraWeather;
}

function rotate(current: string[], options: string[]) {
  const first = options.find((item) => !current.includes(item));
  return first ? [...current.slice(1), first] : options.slice(0, 3);
}
