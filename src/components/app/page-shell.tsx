import type { ReactNode } from "react";
import { BottomTabs } from "@/components/app/bottom-tabs";

export function PageShell({
  children,
  withTabs = true,
}: {
  children: ReactNode;
  withTabs?: boolean;
}) {
  return (
    <main className="min-h-dvh bg-[linear-gradient(180deg,#FFFCF7_0%,#F8F3EA_54%,#FFFCF7_100%)] text-foreground">
      <div className="min-h-dvh w-full max-w-[402px] overflow-hidden rounded-none bg-[linear-gradient(180deg,#FFFCF7_0%,#F8F3EA_54%,#FFFCF7_100%)] pb-[calc(116px+env(safe-area-inset-bottom))] pt-0 shadow-[0_0_0_1px_rgba(40,35,28,0.04)] sm:mx-auto sm:rounded-[34px]">
        <div className="w-full px-[22px] pt-[calc(env(safe-area-inset-top)+44px)]">{children}</div>
      </div>
      {withTabs ? <BottomTabs /> : null}
    </main>
  );
}
