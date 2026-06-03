import type { AuraResult } from "@/lib/aura-types";
import { cn } from "@/lib/utils";

export function ShareCardPreview({
  result,
  tall = false,
}: {
  result: AuraResult;
  tall?: boolean;
}) {
  const card = result.shareCard;
  const primaryTextColor = getReadableTextColor(card.primaryColor.hex);
  const keywords = card.outfitKeywords.slice(0, 3);

  return (
    <article
      className={cn(
        "mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[2.25rem] border border-[#D7CBBB] bg-[#FFFCF7] p-4 shadow-[0_18px_44px_rgba(58,49,39,0.10)]",
        tall ? "aspect-[9/16]" : "aspect-[3/4]",
      )}
    >
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-[1.75rem] border border-[#E6DCCD] bg-[#FFFDF9] p-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:radial-gradient(#B99A63_0.5px,transparent_0.5px)] [background-size:12px_12px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 top-16 size-36 rounded-full bg-[#DDE6EA]/48 blur-3xl"
        />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="font-serif text-[20px] font-semibold leading-none text-[#292521]">
              Today Aura
            </p>
            <p className="mt-1.5 text-[11px] text-[#9B9288]">每日审美色卡</p>
          </div>
          <div className="text-right">
            <p className="font-serif text-[34px] font-semibold leading-none text-[#292521]">
              {new Date().getDate().toString().padStart(2, "0")}
            </p>
            <p className="mt-1 max-w-[6.5rem] text-[11px] leading-4 text-[#9B9288]">
              {card.date}
            </p>
          </div>
        </div>

        <div
          className="relative z-10 mt-4 rounded-[1.55rem] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_30px_rgba(57,48,38,0.12)]"
          style={{ backgroundColor: card.primaryColor.hex, color: primaryTextColor }}
        >
          <p className="text-[12px] font-medium opacity-78">今日气场</p>
          <h3 className="mt-1.5 font-serif text-[33px] font-semibold leading-[1.02]">
            {card.auraTitle}
          </h3>
          <p className="mt-5 text-[12px] font-medium opacity-85">
            主色 · {getDisplayColorName(card.primaryColor.name)}
          </p>
        </div>

        <div className="relative z-10 mt-3 grid grid-cols-3 gap-2">
          <Swatch
            label="主色"
            name={card.primaryColor.name}
            hex={card.primaryColor.hex}
          />
          <Swatch
            label="辅助"
            name={card.supportColor.name}
            hex={card.supportColor.hex}
          />
          <Swatch
            label="规避"
            name={card.avoidColor.name}
            hex={card.avoidColor.hex}
          />
        </div>

        <div className="relative z-10 mt-3 flex flex-wrap gap-2">
          {keywords.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#E2D8CB] bg-[#F8F3EA]/92 px-3 py-1 text-[11px] font-medium text-[#5E564F]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="relative z-10 mt-auto border-t border-[#E2D8CB] pt-3">
          <p className="text-[16px] font-semibold leading-6 text-[#3C3630]">
            {card.shortSentence}
          </p>
        </div>
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
    <div className="min-w-0 rounded-[1.1rem] border border-[#E6DCCD] bg-[#FFFCF7]/80 p-1.5 text-center">
      <div
        className="h-[40px] rounded-[0.85rem] ring-1 ring-black/5"
        style={{ backgroundColor: hex }}
      />
      <p className="mt-1.5 text-[10px] leading-4 text-[#9B9288]">{label}</p>
      <p className="truncate text-[12px] font-semibold text-[#292521]">
        {getDisplayColorName(name)}
      </p>
    </div>
  );
}

function getDisplayColorName(name: string) {
  return name === "灰蓝" ? "雾蓝" : name;
}

function getReadableTextColor(hex: string) {
  const color = hex.replace("#", "");
  const red = Number.parseInt(color.slice(0, 2), 16);
  const green = Number.parseInt(color.slice(2, 4), 16);
  const blue = Number.parseInt(color.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.66 ? "#292521" : "#FFFCF7";
}
