"use client";

import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { AuraColorRecommendation } from "@/lib/aura/types";

const outfitSourcePath = "/reference/today-aura-outfits/";
const modalOutfitSourcePath = "/reference/today-aura-outfits-modal/";
const modalPanelVariants = {
  hidden: { opacity: 0, scale: 0.985, y: 16 },
  show: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.99, y: 12 },
};
const itemGridVariants = {
  hidden: {},
  show: { transition: { delayChildren: 0.08, staggerChildren: 0.055 } },
};
const outfitTileVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function getModalImageSrc(imageSrc: string) {
  if (!imageSrc.startsWith(outfitSourcePath)) return imageSrc;
  return imageSrc.replace(outfitSourcePath, modalOutfitSourcePath);
}

export function ColorOutfitModal({
  color,
  onClose,
}: {
  color: AuraColorRecommendation;
  onClose: () => void;
}) {
  const visualItems = color.outfitMapping.items.slice(0, 4);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/[0.38] px-5 backdrop-blur-[8px]"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={onClose}
      style={{ WebkitBackdropFilter: "blur(8px)" }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <motion.section
        animate="show"
        aria-modal="true"
        className="relative w-full max-w-[352px] rounded-[28px] border border-[#E2D8CB] bg-[#FFFCF7] px-6 pb-6 pt-7 shadow-[0_28px_80px_rgba(41,37,33,0.24)]"
        exit="exit"
        initial="hidden"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        variants={modalPanelVariants}
      >
        <div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="size-9 rounded-full border border-[#E2D8CB]"
              style={{ backgroundColor: color.hex }}
            />
            <div>
              <p className="text-xs font-semibold text-[#B99A63]">{color.shortLabel}</p>
              <h2 className="mt-1 text-[24px] font-semibold leading-none text-[#292521]">
                {color.outfitMapping.title}
              </h2>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium leading-6 text-[#7A6E62]">
            {color.outfitMapping.subtitle}
          </p>
        </div>

        <div className="mt-6">
          <motion.div
            className="grid grid-cols-4 gap-2"
            initial="hidden"
            animate="show"
            variants={itemGridVariants}
          >
            {visualItems.map((item) => (
              <OutfitTile colorHex={color.hex} item={item} key={item.id} />
            ))}
          </motion.div>
        </div>

        <div className="mt-7 px-1 text-sm leading-7 text-[#5E564F]">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[#B99A63]">
            <Sparkles className="size-3.5" />
            今日小 Tips
          </p>
          <p>{color.outfitMapping.summary}</p>
        </div>

        <button
          className="mt-7 flex min-h-12 w-full items-center justify-center rounded-[16px] bg-[#292521] px-4 text-sm font-semibold text-[#FFFCF7] shadow-[0_10px_24px_rgba(41,37,33,0.16)]"
          onClick={onClose}
          type="button"
        >
          我知道了
        </button>
      </motion.section>
    </motion.div>
  );
}

function OutfitTile({
  item,
  colorHex,
}: {
  item: AuraColorRecommendation["outfitMapping"]["items"][number];
  colorHex: string;
}) {
  const [loaded, setLoaded] = useState(!item.imageSrc);
  const imageTone = item.imageSrc?.includes("奶油白裤子")
    ? "contrast-150 brightness-95 saturate-125 drop-shadow-[0_10px_14px_rgba(60,54,48,0.22)]"
    : "drop-shadow-[0_10px_14px_rgba(60,54,48,0.12)]";

  return (
    <motion.div
      className="min-w-0"
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      variants={outfitTileVariants}
    >
      <div className="relative flex h-[166px] items-center justify-center overflow-hidden rounded-[16px] bg-[#F4EEE5] px-1.5 pb-10 pt-4 shadow-[inset_0_0_0_1px_rgba(226,216,203,0.38)]">
        {item.imageSrc?.includes("奶油白裤子") ? (
          <span className="absolute inset-x-1 bottom-10 top-5 rounded-full bg-[#D8C8A8]/28 blur-[8px]" />
        ) : null}
        {!loaded ? (
          <motion.span
            animate={{ opacity: [0.42, 0.76, 0.42], x: ["-18%", "18%", "-18%"] }}
            aria-hidden="true"
            className="absolute inset-3 rounded-[14px] bg-gradient-to-r from-[#EDE3D5]/60 via-[#FFF8EE]/90 to-[#E1D3C1]/60"
            transition={{ duration: 1.05, ease: "easeInOut", repeat: Infinity }}
          />
        ) : null}
        {item.imageSrc ? (
          <motion.img
            animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.985 }}
            alt={item.label}
            className={`relative h-full w-full object-contain ${imageTone}`}
            decoding="async"
            height={160}
            initial={{ opacity: 0, scale: 0.985 }}
            loading="eager"
            onError={(event) => {
              const image = event.currentTarget;
              const originalSrc = image.dataset.originalSrc;
              if (originalSrc && image.src !== originalSrc) image.src = originalSrc;
            }}
            onLoad={() => setLoaded(true)}
            src={getModalImageSrc(item.imageSrc)}
            data-original-src={item.imageSrc}
            transition={{ duration: 0.18, ease: "easeOut" }}
            width={120}
          />
        ) : (
          <span
            className="mx-auto block size-12 rounded-full border border-[#E2D8CB]"
            style={{ backgroundColor: colorHex }}
          />
        )}
        <p className="absolute inset-x-1 bottom-4 text-center text-[12px] font-semibold leading-none text-[#292521]">
          {item.category}
        </p>
      </div>
    </motion.div>
  );
}
