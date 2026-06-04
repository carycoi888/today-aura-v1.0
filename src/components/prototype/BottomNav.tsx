"use client";

import { Home, ListChecks, User, UserRound } from "lucide-react";

export type PrototypeNavKey = "home" | "profile" | "history" | "mine";

export function BottomNav({
  active,
  onGo,
}: {
  active: PrototypeNavKey | string;
  onGo: (screen: PrototypeNavKey) => void;
}) {
  const items = [
    ["home", "首页", Home],
    ["profile", "档案", User],
    ["history", "记录", ListChecks],
    ["mine", "我的", UserRound],
  ] as const;

  return (
    <nav className="sticky bottom-0 z-10 grid h-[calc(74px+env(safe-area-inset-bottom))] shrink-0 grid-cols-4 border-t border-[#E2D8CB] bg-[#FFFCF7]/96 px-2 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_28px_rgba(60,54,48,0.06)]">
      {items.map(([key, label, Icon]) => {
        const selected = active === key;
        return (
          <button
            className={`flex flex-col items-center justify-center gap-1 text-xs ${
              selected ? "font-semibold text-[#1F3648]" : "font-medium text-[#9B9288]"
            }`}
            key={key}
            onClick={() => onGo(key)}
            type="button"
          >
            <Icon className="size-4" strokeWidth={selected ? 2.4 : 1.8} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
