import type { AuraResult } from "@/lib/aura-types";
import { cn } from "@/lib/utils";

export function ShareCardPreview({
  result,
  tall = false,
}: {
  result: AuraResult;
  tall?: boolean;
}) {
  return (
    <article
      className={cn(
        "mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[2.45rem] border border-[#D7CBBB] bg-[#FFFCF7]",
        tall ? "aspect-[9/16]" : "aspect-[3/4]",
      )}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_6.75rem] gap-x-4 px-6 pb-3 pt-5">
        <p className="truncate text-sm font-semibold leading-7 text-[#292521]">
          今日气场 Today Aura
        </p>
        <p className="text-right text-3xl font-semibold leading-7 text-[#292521]">
          {new Date().getDate().toString().padStart(2, "0")}
        </p>
        <p className="truncate text-xs leading-6 text-[#9B9288]">
          每日审美色卡
        </p>
        <p className="whitespace-nowrap text-right text-xs leading-6 text-[#9B9288]">
          {result.date}
        </p>
      </div>

      <div className="flex-1">
        <div
          className="mx-6 rounded-[2rem] p-4 text-[#FFFCF7]"
          style={{ backgroundColor: result.colors.primary.hex }}
        >
          <p className="text-xs opacity-80">今日气场</p>
          <h3 className="mt-1.5 font-serif text-[2.05rem] font-semibold leading-tight">
            {result.title}
          </h3>
          <p className="mt-3 text-sm leading-6 opacity-90">
            主色 {result.colors.primary.name}
          </p>
        </div>

        <div className="mx-6 mt-4 grid grid-cols-3 items-start gap-3 text-center">
          <Swatch
            label="主色"
            name={result.colors.primary.name}
            hex={result.colors.primary.hex}
          />
          <Swatch
            label="辅助"
            name={result.colors.secondary.name}
            hex={result.colors.secondary.hex}
          />
          <Swatch
            label="规避"
            name={result.colors.avoid.name}
            hex={result.colors.avoid.hex}
          />
        </div>

        <div className="mx-6 mt-4 flex flex-wrap justify-center gap-2">
          {result.shareKeywords.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#E2D8CB] bg-[#F8F3EA] px-3 py-1 text-xs text-[#5E564F]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="m-5 mt-4 space-y-2 border-t border-[#E2D8CB] pt-3 text-center">
        <p className="text-base font-semibold leading-7 text-[#5E564F]">
          {result.shortSentence}
        </p>
        <p className="text-xs text-[#9B9288]">
          出门前看一眼主色、轮廓和关键词。
        </p>
      </div>
    </article>
  );
}

function Swatch({
  label,
  name,
  hex,
}: {
  label: string;
  name: string;
  hex: string;
}) {
  return (
    <div className="grid min-w-0 grid-rows-[5rem_auto] gap-2 text-center">
      <div
        className="h-20 rounded-[1.35rem] ring-1 ring-black/5"
        style={{ backgroundColor: hex }}
      />
      <div className="min-h-9">
        <p className="text-[10px] leading-4 text-[#9B9288]">{label}</p>
        <p className="truncate text-xs font-medium">{name}</p>
      </div>
    </div>
  );
}
