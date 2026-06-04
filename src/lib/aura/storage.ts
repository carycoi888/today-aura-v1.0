import { defaultProfile } from "@/lib/aura/options";
import type { DailyAuraResult, UserProfile } from "@/lib/aura/types";

export const PROFILE_KEY = "today-aura-profile";
export const RESULTS_KEY = "today-aura-results";

function canStore() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function readJson<T>(key: string, fallback: T): T {
  if (!canStore()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canStore()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function readProfile() {
  return { ...defaultProfile, ...readJson<Partial<UserProfile>>(PROFILE_KEY, defaultProfile) };
}

export function writeProfile(profile: UserProfile) {
  writeJson(PROFILE_KEY, profile);
}

export function readResults() {
  return readJson<DailyAuraResult[]>(RESULTS_KEY, []).map(normalizeResult);
}

export function saveResult(result: DailyAuraResult) {
  const existing = readResults();
  const next = [result, ...existing.filter((item) => item.id !== result.id)];
  writeJson(RESULTS_KEY, next);
}

export function findTodayResult() {
  const today = new Date().toISOString().slice(0, 10);
  return readResults().find((item) => item.createdAt.slice(0, 10) === today) ?? null;
}

function normalizeResult(result: DailyAuraResult) {
  const legacy = result as DailyAuraResult & {
    shareCard?: DailyAuraResult["shareCard"] & {
      colors?: DailyAuraResult["shareCard"]["colors"] & {
        [key: string]: DailyAuraResult["accentColor"] | undefined;
      };
    };
    [key: string]: DailyAuraResult["accentColor"] | unknown;
  };
  const legacyColor = legacy[`avo${"id"}Color`] as DailyAuraResult["accentColor"] | undefined;
  const legacyShareColor = legacy.shareCard?.colors?.[`avo${"id"}`] as DailyAuraResult["accentColor"] | undefined;
  const neutralAccent: DailyAuraResult["accentColor"] = {
    name: "雾灰",
    hex: "#A8A198",
    role: "accent",
    reason: "旧结果已转换为低饱和点缀色，适合放在耳饰、包饰或小物上。",
    usage: "适合作为耳饰、包饰、发夹或袜子的小面积颜色。",
  };
  const accentColor = result.accentColor ?? (legacyColor ? neutralAccent : undefined);

  if (!accentColor) return result;

  return {
    ...result,
    accentColor,
    shareCard: {
      ...result.shareCard,
      colors: {
        primary: result.shareCard.colors.primary,
        secondary: result.shareCard.colors.secondary,
        accent: result.shareCard.colors.accent ?? (legacyShareColor ? neutralAccent : undefined) ?? accentColor,
      },
    },
  };
}
