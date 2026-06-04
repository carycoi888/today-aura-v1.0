export function isLightColor(hex: string) {
  const normalized = normalizeHex(hex);
  if (!normalized) return false;
  const red = parseInt(normalized.slice(0, 2), 16);
  const green = parseInt(normalized.slice(2, 4), 16);
  const blue = parseInt(normalized.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
  return luminance > 0.68;
}

export function readableTextColor(hex: string) {
  return isLightColor(hex) ? "#292521" : "#FFFCF7";
}

export function readableMutedTextColor(hex: string) {
  return isLightColor(hex) ? "#5E564F" : "rgba(255,252,247,0.86)";
}

export function readableSoftLayer(hex: string) {
  return isLightColor(hex)
    ? { background: "rgba(41,37,33,0.06)", border: "rgba(41,37,33,0.12)" }
    : { background: "rgba(255,252,247,0.12)", border: "rgba(255,252,247,0.28)" };
}

function normalizeHex(hex: string) {
  const value = hex.replace("#", "").trim();
  if (/^[0-9a-fA-F]{3}$/.test(value)) {
    return value
      .split("")
      .map((char) => char + char)
      .join("");
  }
  if (/^[0-9a-fA-F]{6}$/.test(value)) return value;
  return "";
}
