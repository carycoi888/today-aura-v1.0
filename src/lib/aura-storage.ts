import { DEFAULT_PROFILE, DEFAULT_TODAY_INPUT } from "@/lib/aura-options";
import type { AuraProfile, AuraResult, TodayInput } from "@/lib/aura-types";

const PROFILE_KEY = "today-aura.profile";
const TODAY_INPUT_KEY = "today-aura.today-input";
const CURRENT_RESULT_KEY = "today-aura.current-result";
const SAVED_RESULTS_KEY = "today-aura.saved-results";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getProfile(): AuraProfile {
  const stored = readJson<Partial<AuraProfile>>(PROFILE_KEY, DEFAULT_PROFILE);
  const colors = stored.colors ?? DEFAULT_PROFILE.colors;

  return {
    ...DEFAULT_PROFILE,
    ...stored,
    scenes: stored.scenes ?? DEFAULT_PROFILE.scenes,
    styleTags: stored.styleTags ?? DEFAULT_PROFILE.styleTags,
    colors: colors.map(normalizeColorName),
    avoidColors: stored.avoidColors ?? DEFAULT_PROFILE.avoidColors,
    skinTone: stored.skinTone ?? DEFAULT_PROFILE.skinTone,
    outfitConstraints:
      stored.outfitConstraints ?? DEFAULT_PROFILE.outfitConstraints,
  };
}

export function hasStoredProfile() {
  if (!canUseStorage()) {
    return false;
  }

  return window.localStorage.getItem(PROFILE_KEY) !== null;
}

export function saveProfile(profile: AuraProfile) {
  writeJson(PROFILE_KEY, profile);
}

export function getTodayInput(): TodayInput {
  const stored = readJson<Partial<TodayInput>>(TODAY_INPUT_KEY, DEFAULT_TODAY_INPUT);

  return {
    ...DEFAULT_TODAY_INPUT,
    ...stored,
    energy: stored.energy ?? DEFAULT_TODAY_INPUT.energy,
    extraNeed: stored.extraNeed ?? DEFAULT_TODAY_INPUT.extraNeed,
  };
}

export function saveTodayInput(input: TodayInput) {
  writeJson(TODAY_INPUT_KEY, input);
}

export function getCurrentResult(): AuraResult | null {
  return readJson<AuraResult | null>(CURRENT_RESULT_KEY, null);
}

export function saveCurrentResult(result: AuraResult) {
  writeJson(CURRENT_RESULT_KEY, result);
}

export function getSavedResults(): AuraResult[] {
  return readJson<AuraResult[]>(SAVED_RESULTS_KEY, []);
}

export function saveResultToHistory(result: AuraResult) {
  const results = getSavedResults();
  const next = [result, ...results.filter((item) => item.id !== result.id)].slice(0, 7);
  writeJson(SAVED_RESULTS_KEY, next);
}

function normalizeColorName(name: string) {
  return name === "炭黑" ? "炭褐" : name;
}
