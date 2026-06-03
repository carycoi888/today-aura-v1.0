"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, Palette, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "首页", icon: Home, filledIcon: FilledHome },
  { href: "/profile", label: "档案", icon: UserRound, filledIcon: FilledUser },
  { href: "/today", label: "今日", icon: CalendarDays, filledIcon: FilledCalendar },
  { href: "/result", label: "结果", icon: Palette, filledIcon: FilledPalette },
];

export function BottomTabs() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-40 w-full max-w-[402px] border-t border-[#E8DED0] bg-[#FFFCF7] pb-[calc(env(safe-area-inset-bottom)+10px)] pt-[10px] sm:left-1/2 sm:-translate-x-1/2 sm:rounded-b-[34px]">
      <div className="grid grid-cols-4 px-[18px]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const FilledIcon = tab.filledIcon;
          const active = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex h-[52px] flex-col items-center justify-start gap-[4px] rounded-none text-[13px] font-semibold leading-none transition-colors duration-200",
                active
                  ? "text-[#8E743C]"
                  : "text-[#766D63] hover:text-[#8E743C]",
              )}
            >
              <span className="flex h-[30px] w-[30px] items-center justify-center">
                {active ? (
                  <FilledIcon className="size-[27px]" />
                ) : (
                  <Icon className="size-[26px]" strokeWidth={2.05} aria-hidden="true" />
                )}
              </span>
              <span className="block h-[14px] leading-[14px]">{tab.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="pointer-events-none absolute bottom-[5px] left-1/2 h-[5px] w-[142px] -translate-x-1/2 rounded-full bg-black" />
    </nav>
  );
}

function FilledHome({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3.5 10.8 12 3.2l8.5 7.6v8.45c0 1.1-.9 2-2 2h-4.1v-6.35H9.6v6.35H5.5c-1.1 0-2-.9-2-2v-8.45Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FilledUser({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 12.2a4.8 4.8 0 1 0 0-9.6 4.8 4.8 0 0 0 0 9.6Zm0 2.05c-4.25 0-7.6 2.08-7.6 4.7 0 1.05.85 1.9 1.9 1.9h11.4c1.05 0 1.9-.85 1.9-1.9 0-2.62-3.35-4.7-7.6-4.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FilledCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7.2 2.6c.55 0 1 .45 1 1v1h7.6v-1a1 1 0 1 1 2 0v1h.5c1.35 0 2.45 1.1 2.45 2.45v1.35H3.25V7.05c0-1.35 1.1-2.45 2.45-2.45h.5v-1c0-.55.45-1 1-1Zm13.55 8.05v8.1c0 1.35-1.1 2.45-2.45 2.45H5.7a2.45 2.45 0 0 1-2.45-2.45v-8.1h17.5Zm-12.7 3.05v2h2.15v-2H8.05Zm4.85 0v2h2.15v-2H12.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FilledPalette({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12.1 3.1C6.65 3.1 2.7 6.65 2.7 11.6c0 4.4 3.55 8.05 8.1 8.05h1.05c.85 0 1.4-.78 1.08-1.55-.42-1.02.28-2.1 1.38-2.1h1.6c3.25 0 5.4-2.03 5.4-5.08 0-4.12-3.52-7.82-9.2-7.82ZM7.65 12.25a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm3.25-3.55a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm3.55 0a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm2.6 4a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Z"
        fill="currentColor"
      />
    </svg>
  );
}
