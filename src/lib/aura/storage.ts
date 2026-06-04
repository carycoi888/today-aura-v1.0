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
  return readJson<DailyAuraResult[]>(RESULTS_KEY, []);
}

export function saveResult(result: DailyAuraResult) {
  const existing = readResults();
  const next = [result, ...existing.filter((item) => item.id !== result.id)].slice(0, 30);
  writeJson(RESULTS_KEY, next);
}

export function findTodayResult() {
  const today = new Date().toISOString().slice(0, 10);
  return readResults().find((item) => item.createdAt.slice(0, 10) === today) ?? null;
}
