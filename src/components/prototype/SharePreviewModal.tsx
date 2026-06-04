"use client";

import { AnimatePresence, motion } from "motion/react";
import { Aperture, Check, Download, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import type { DailyAuraResult } from "@/lib/aura/types";

type ShareRatio = "3:4" | "9:16";
type ShareTarget = "微信好友" | "朋友圈" | "小红书" | "保存图片";

const channels: Array<{
  label: ShareTarget;
  icon: "wechat" | "moments" | "xhs" | "save";
}> = [
  { label: "微信好友", icon: "wechat" },
  { label: "朋友圈", icon: "moments" },
  { label: "小红书", icon: "xhs" },
  { label: "保存图片", icon: "save" },
];

export function SharePreviewModal({
  result,
  onCancel,
  onShare,
}: {
  result: DailyAuraResult;
  onCancel: () => void;
  onShare: (message: string) => void;
}) {
  const [ratio, setRatio] = useState<ShareRatio>("9:16");

  function pickChannel(target: ShareTarget) {
    onShare(target === "保存图片" ? "已保存分享卡片" : `已准备好分享到${target}`);
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#292521]/[0.42] px-5 backdrop-blur-md"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={onCancel}
      style={{ WebkitBackdropFilter: "blur(12px)" }}
      transition={{ duration: 0.2 }}
    >
      <motion.section
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative max-h-[82vh] w-[min(86vw,360px)] overflow-hidden rounded-[28px] border border-[#E2D8CB] bg-[#FFFCF7] pt-7 shadow-[0_28px_80px_rgba(41,37,33,0.28)]"
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        onClick={(event) => event.stopPropagation()}
        transition={{ duration: 0.24, ease: "easeOut" }}
      >
        <button
          aria-label="关闭分享弹窗"
          className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full bg-[#F4EEE5] text-[#8C8278]"
          onClick={onCancel}
          type="button"
        >
          <X className="size-4" />
        </button>

        <div className="px-5 text-center">
          <h2 className="text-[26px] font-bold leading-none text-[#292521]">分享卡片预览</h2>
          <p className="mt-2 text-[15px] text-[#8C8278]">选择你喜欢的比例</p>
        </div>

        <div className="mt-8 flex items-end justify-center gap-4 px-5">
          <RatioOption ratio="3:4" result={result} selected={ratio === "3:4"} onSelect={() => setRatio("3:4")} />
          <RatioOption ratio="9:16" result={result} selected={ratio === "9:16"} onSelect={() => setRatio("9:16")} />
        </div>

        <div className="mt-6 h-px bg-[#E2D8CB]" />

        <div className="px-5 pb-5 pt-[22px]">
          <p className="mb-[18px] text-center text-base font-semibold text-[#292521]">分享到</p>
          <div className="grid grid-cols-4 gap-3">
            {channels.map((channel) => (
              <button
                className="flex min-w-0 flex-col items-center gap-2 text-center text-sm text-[#292521]"
                key={channel.label}
                onClick={() => pickChannel(channel.label)}
                type="button"
              >
                <span className="flex size-[58px] items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(60,54,48,0.08)]">
                  <ChannelIcon type={channel.icon} />
                </span>
                <span className="w-full truncate">{channel.label}</span>
              </button>
            ))}
          </div>
          <button
            className="mt-5 h-11 w-full rounded-[16px] border border-[#E2D8CB] bg-[#FFFCF7] text-sm font-semibold text-[#5E564F]"
            onClick={onCancel}
            type="button"
          >
            取消
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
}

function RatioOption({
  ratio,
  result,
  selected,
  onSelect,
}: {
  ratio: ShareRatio;
  result: DailyAuraResult;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <motion.button
        animate={{ scale: selected ? 1.02 : 1 }}
        className={`relative rounded-[16px] bg-[#FFFCF7] transition ${
          selected
            ? "border-2 border-[#8EA1A8] shadow-[0_14px_34px_rgba(142,161,168,0.20)]"
            : "border border-[#E2D8CB] opacity-[0.78]"
        }`}
        onClick={onSelect}
        transition={{ duration: 0.18 }}
        type="button"
        whileTap={{ scale: 0.99 }}
      >
        <PreviewCard ratio={ratio} result={result} />
        <AnimatePresence>
          {selected ? (
            <motion.span
              animate={{ opacity: 1, scale: 1 }}
              className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-[#8EA1A8] text-white shadow-[0_8px_18px_rgba(142,161,168,0.28)]"
              exit={{ opacity: 0, scale: 0.8 }}
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
            >
              <Check className="size-5" />
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.button>
      <p className={`mt-3 text-[15px] font-semibold ${selected ? "text-[#8EA1A8]" : "text-[#9B9288]"}`}>
        {ratio} 比例
      </p>
    </div>
  );
}

function PreviewCard({ ratio, result }: { ratio: ShareRatio; result: DailyAuraResult }) {
  const tall = ratio === "9:16";
  return (
    <div className={`${tall ? "h-[198px]" : "h-[168px]"} w-[124px] overflow-hidden rounded-[14px] bg-[#FFFCF7] px-3 py-3 text-[#292521]`}>
      <div className="flex items-center justify-between gap-2 text-[8px] font-semibold">
        <span className="font-serif">Today Aura</span>
        <span className="shrink-0">{result.date}</span>
      </div>
      <h3 className={`${tall ? "mt-5 text-[18px]" : "mt-4 text-[17px]"} text-center font-semibold leading-none`}>
        {result.title}
      </h3>
      <div className={`${tall ? "mt-5" : "mt-4"} grid grid-cols-3 gap-2`}>
        {[result.primaryColor, result.secondaryColor, result.accentColor].map((color) => (
          <div key={color.name}>
            <div className={`${tall ? "h-9" : "h-8"} rounded-[7px]`} style={{ backgroundColor: color.hex }} />
            <p className="mt-1 truncate text-center text-[7px] font-semibold">{color.name}</p>
          </div>
        ))}
      </div>
      <div className={`${tall ? "mt-5 p-2" : "mt-4 p-2"} rounded-[10px] bg-[#F8F3EA]`}>
        <p className="text-[7px] text-[#9B9288]">穿搭关键词</p>
        <p className="mt-1 truncate text-[7px] font-semibold">{result.shareCard.outfitKeywords.join(" · ")}</p>
      </div>
      <p className={`${tall ? "mt-4 text-[10px] leading-4" : "mt-3 text-[9px] leading-[14px]"} font-semibold`}>
        {result.dailyQuote}
      </p>
    </div>
  );
}

function ChannelIcon({ type }: { type: "wechat" | "moments" | "xhs" | "save" }) {
  if (type === "wechat") {
    return (
      <span className="relative flex size-10 items-center justify-center rounded-full bg-[#40C85A] text-white">
        <MessageCircle className="size-6" />
        <span className="absolute right-2 top-3 size-1 rounded-full bg-white" />
      </span>
    );
  }
  if (type === "moments") {
    return (
      <span className="flex size-10 items-center justify-center rounded-full bg-[#44C565] text-white">
        <Aperture className="size-7" />
      </span>
    );
  }
  if (type === "xhs") {
    return (
      <span className="flex size-10 items-center justify-center rounded-[14px] bg-[#F5283F] text-[11px] font-bold leading-none text-white">
        小红书
      </span>
    );
  }
  return (
    <span className="flex size-10 items-center justify-center rounded-full bg-[#292521] text-white">
      <Download className="size-6" />
    </span>
  );
}
