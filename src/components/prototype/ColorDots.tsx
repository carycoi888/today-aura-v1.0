"use client";

import { motion } from "motion/react";

export type ColorDotItem = {
  label?: string;
  name: string;
  hex: string;
};

export function ColorDots({
  colors,
  size = "md",
  showNames = false,
}: {
  colors: ColorDotItem[];
  size?: "sm" | "md" | "lg";
  showNames?: boolean;
}) {
  const sizeClass = {
    sm: "size-5",
    md: "size-8",
    lg: "size-20",
  }[size];

  return (
    <div className="flex items-center gap-3">
      {colors.map((color, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className={showNames ? "flex flex-col items-center text-center" : ""}
          initial={{ opacity: 0, y: 6 }}
          key={`${color.name}-${color.hex}`}
          transition={{ delay: index * 0.05, duration: 0.22 }}
        >
          {color.label ? (
            <p className="mb-3 text-[14px] font-semibold text-[#5E564F]">{color.label}</p>
          ) : null}
          <span
            className={`${sizeClass} block rounded-full border border-[#E2D8CB] shadow-[0_8px_18px_rgba(60,54,48,0.08)]`}
            style={{ backgroundColor: color.hex }}
          />
          {showNames ? (
            <p className="mt-3 text-[13px] font-semibold text-[#5E564F]">{color.name}</p>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}
