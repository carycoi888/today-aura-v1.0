import { COLOR_LIBRARY } from "@/lib/aura-options";
import type {
  AuraColor,
  AuraProfile,
  AuraResult,
  ColorMeta,
  LocalAuraRecommendation,
  TodayInput,
} from "@/lib/aura-types";

const todayFormatter = new Intl.DateTimeFormat("zh-CN", {
  month: "long",
  day: "numeric",
  weekday: "long",
});

const formalScenes = ["通勤", "上班", "面试"];
const socialScenes = ["约会", "见朋友", "聚会"];
const anxiousMoods = ["有点焦虑", "烦躁"];
const tiredMoods = ["疲惫", "低落"];
const lowKeyAuras = ["低调", "清冷", "知性"];
const seenAuras = ["被看见", "元气", "甜酷", "强势"];

export function recommendDailyAura(
  profile: AuraProfile,
  input: TodayInput,
  variant = 0,
): LocalAuraRecommendation {
  const usableColors = COLOR_LIBRARY.filter((color) => !isDislikedColor(color, profile));
  const primaryColor = pickPrimaryColor(usableColors, profile, input, variant);
  const supportColors = pickSupportColors(usableColors, primaryColor, input);
  const avoidColor = pickAvoidColor(usableColors, primaryColor, supportColors, input);
  const auraTitle = buildAuraTitle(input, variant);
  const outfit = buildOutfit(primaryColor, supportColors, profile, input);
  const beautyAccessory = buildBeautyAccessory(primaryColor, supportColors, input);
  const outfitKeywords = buildOutfitKeywords(
    primaryColor,
    supportColors[0],
    input,
    profile,
  );

  return {
    auraTitle,
    primaryColor,
    supportColors,
    avoidColor: {
      color: avoidColor,
      reason: buildAvoidReason(avoidColor, input),
      usageTip: "如果今天仍想用它，只建议放在发圈、包挂或小面积图案里。",
    },
    colorReason: buildColorReason(primaryColor, supportColors, input, profile),
    outfit,
    beautyAccessory,
    shareText: `${auraTitle}：${primaryColor.name}做主色，${supportColors.map((color) => color.name).join("、")}辅助。${buildShortSentence(input, variant)}`,
    outfitKeywords,
  };
}

function buildOutfitKeywords(
  primary: ColorMeta,
  support: ColorMeta | undefined,
  input: TodayInput,
  profile: AuraProfile,
) {
  const supportName = support?.name ?? "燕麦色";
  const keywords = [
    `${primary.name}上装`,
    `${supportName}内搭`,
    formalScenes.includes(input.scene) ? "直线轮廓" : "轻松比例",
    input.energy === "低" || tiredMoods.includes(input.mood) ? "脸周提亮" : "低饱和",
    `${input.desiredAura}感`,
  ];

  return keywords.filter((item) => !isDislikedName(item, profile));
}

export function generateAuraResult(
  profile: AuraProfile,
  input: TodayInput,
  variant = 0,
): AuraResult {
  const recommendation = recommendDailyAura(profile, input, variant);
  const date = todayFormatter.format(new Date());
  const primary = toAuraColor("primary", recommendation.primaryColor, recommendation.primaryColor.usageTips[0], recommendation.colorReason);
  const secondary = toAuraColor("secondary", recommendation.supportColors[0], recommendation.supportColors[0].usageTips[0], `${recommendation.supportColors[0].name}用于辅助主色，降低搭配压力。`);
  const avoid = toAuraColor("avoid", recommendation.avoidColor.color, recommendation.avoidColor.usageTip, recommendation.avoidColor.reason);
  const shortSentence = buildShortSentence(input, variant);

  return {
    id: `${new Date().toISOString().slice(0, 10)}-${variant}`,
    date,
    title: recommendation.auraTitle,
    variant,
    input,
    colors: {
      primary,
      secondary,
      avoid,
    },
    colorExplanation: recommendation.colorReason,
    outfit: recommendation.outfit,
    makeupAccessories: {
      makeup: recommendation.beautyAccessory.makeup,
      lip: recommendation.beautyAccessory.lip,
      hair: recommendation.beautyAccessory.hair,
      accessories: recommendation.beautyAccessory.accessory,
      scentOrItem: recommendation.beautyAccessory.scentOrItem,
    },
    shortSentence,
    shareKeywords: recommendation.outfitKeywords,
    shareCard: {
      productName: "今日气场 Today Aura",
      date,
      auraTitle: recommendation.auraTitle,
      primaryColor: primary,
      supportColor: secondary,
      avoidColor: avoid,
      outfitKeywords: recommendation.outfitKeywords,
      shortSentence,
    },
  };
}

function pickPrimaryColor(
  colors: ColorMeta[],
  profile: AuraProfile,
  input: TodayInput,
  variant: number,
) {
  const scored = colors.map((color) => ({
    color,
    score: scorePrimaryColor(color, profile, input, variant),
  }));

  return scored.sort((a, b) => b.score - a.score)[0]?.color ?? colors[0];
}

function scorePrimaryColor(
  color: ColorMeta,
  profile: AuraProfile,
  input: TodayInput,
  variant: number,
) {
  let score = 0;

  if (profile.colors.some((name) => normalizeColorAlias(name) === color.name)) score += 5;
  if (profile.styleTags.some((tag) => color.moodTags.includes(tag))) score += 2;
  if (color.sceneTags.includes(input.scene)) score += 4;
  if (color.moodTags.includes(input.mood)) score += 4;
  if (color.moodTags.includes(input.desiredAura)) score += 4;

  if (formalScenes.includes(input.scene)) {
    if (color.saturation === "低") score += 6;
    if (color.brightness !== "深") score += 2;
    if (color.temperature === "中性" || color.temperature === "冷") score += 2;
    if (color.saturation === "高") score -= 10;
  }

  if (socialScenes.includes(input.scene)) {
    if (color.temperature === "暖") score += 3;
    if (color.saturation === "中") score += 2;
  }

  if (tiredMoods.includes(input.mood) || input.energy === "低") {
    if (color.brightness === "浅") score += 6;
    if (color.usageTips.some((tip) => tip.includes("脸周") || tip.includes("提亮"))) score += 3;
  }

  if (anxiousMoods.includes(input.mood) && color.saturation === "高") {
    score -= 12;
  }

  if (lowKeyAuras.includes(input.desiredAura) && color.saturation === "高") {
    score -= 8;
  }

  if (seenAuras.includes(input.desiredAura) && color.saturation !== "低") {
    score += variant === 0 ? 1 : 4;
  }

  if (input.extraNeed?.includes("显精神") && color.brightness === "浅") {
    score += 3;
  }

  if (input.extraNeed?.includes("低调") && color.saturation === "高") {
    score -= 8;
  }

  if (input.weather === "雨" && color.brightness === "深") {
    score += 1;
  }

  if (variant % 2 === 1 && color.name !== normalizeColorAlias(profile.colors[0] ?? "")) {
    score += 1;
  }

  return score;
}

function pickSupportColors(
  colors: ColorMeta[],
  primary: ColorMeta,
  input: TodayInput,
) {
  const support = colors
    .filter((color) => color.name !== primary.name)
    .map((color) => {
      let score = 0;
      if (color.saturation === "低") score += 3;
      if ((tiredMoods.includes(input.mood) || input.energy === "低") && color.brightness === "浅") score += 5;
      if (formalScenes.includes(input.scene) && color.temperature === "中性") score += 2;
      if (socialScenes.includes(input.scene) && color.temperature === "暖") score += 2;
      if (seenAuras.includes(input.desiredAura) && color.saturation === "中") score += 1;
      if (color.name === "燕麦色") score += 4;
      if (color.name === "浅卡其") score += 2;
      return { color, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.color);

  return support.slice(0, 2);
}

function pickAvoidColor(
  colors: ColorMeta[],
  primary: ColorMeta,
  supportColors: ColorMeta[],
  input: TodayInput,
) {
  const used = new Set([primary.name, ...supportColors.map((color) => color.name)]);
  const candidates = colors.filter((color) => !used.has(color.name));

  const scored = candidates.map((color) => {
    let score = 0;
    if (anxiousMoods.includes(input.mood) && color.saturation === "高") score += 7;
    if (formalScenes.includes(input.scene) && color.saturation === "高") score += 6;
    if (lowKeyAuras.includes(input.desiredAura) && color.saturation !== "低") score += 4;
    if (input.weather === "雨" && color.brightness === "深") score += 2;
    if (color.name === "亮橙") score += 2;
    return { color, score };
  });

  return scored.sort((a, b) => b.score - a.score)[0]?.color ?? candidates[0] ?? primary;
}

function buildColorReason(
  primary: ColorMeta,
  supportColors: ColorMeta[],
  input: TodayInput,
  profile: AuraProfile,
) {
  const reasons = [
    `今日输入是「${input.scene} / ${input.weather} / ${input.mood} / 精力${input.energy} / ${input.desiredAura}」，主色选择${primary.saturation}饱和、${primary.brightness}亮度的${primary.name}。`,
    `你的常用风格包含「${profile.styleTags.join("、")}」，所以整体保持干净、有秩序，不做过多装饰。`,
    `辅助色用${supportColors.map((color) => color.name).join("、")}，分别放在内搭、鞋包或配饰里，降低搭配出错率。`,
  ];

  if (input.mood === "疲惫" || input.energy === "低") {
    reasons.push("疲惫或低精力时把浅色放在脸周，可以让状态更清爽。");
  }

  if (anxiousMoods.includes(input.mood)) {
    reasons.push("焦虑或烦躁时减少高饱和大面积颜色，视觉会更安定。");
  }

  if (input.extraNeed?.trim()) {
    reasons.push(`特别诉求里提到「${input.extraNeed.trim()}」，所以建议会更偏向低负担、可执行的组合。`);
  }

  return reasons.join("");
}

function buildOutfit(
  primary: ColorMeta,
  supportColors: ColorMeta[],
  profile: AuraProfile,
  input: TodayInput,
) {
  const support = supportColors[0] ?? primary;
  const needsLayer = input.weather === "冷" || profile.outfitConstraints.includes("需要保暖");
  const rainy = input.weather === "雨";
  const noHeels = profile.outfitConstraints.includes("不穿高跟");
  const formal = formalScenes.includes(input.scene) || profile.outfitConstraints.includes("不能太休闲");
  const social = socialScenes.includes(input.scene);
  const hot = input.weather === "热" || input.weather === "潮湿";
  const relaxed = input.scene === "休闲" || input.scene === "旅行" || input.scene === "居家但想保持状态";
  const lowMaintenance = input.energy === "低" || profile.outfitConstraints.includes("低维护");

  return {
    silhouette: formal
      ? "利落直线感，少复杂图案，保留一个干净领口。"
      : social
        ? "上半身有柔和焦点，下半身留出轻盈比例。"
      : lowMaintenance
        ? "上半身有干净色块，下半身保持低维护直线比例。"
        : "上半身有主色焦点，下半身保持清爽比例。",
    top: buildTopSuggestion(primary, support, input, formal, social, hot),
    bottom: rainy
      ? "不过脚踝的直筒裤或半裙，鞋面选择利落易打理材质。"
      : hot
        ? `${support.name}九分裤、A 字半裙或垂感短袖套装，减少闷热感。`
      : formal
        ? "炭褐或深中性色直筒裤，保持稳定和专业感。"
        : social
          ? `${support.name}半裙或浅色直筒裤，让主色停留在上半身。`
        : relaxed
          ? `${support.name}直筒牛仔裤、伞裙或宽松长裤，方便走动。`
        : `${support.name}半裙或直筒牛仔裤，减少早晨搭配负担。`,
    outerwear: needsLayer
      ? `${support.name}内搭叠加浅卡其或灰蓝外套，层次清楚但不臃肿。`
      : hot
        ? "不加厚外套，带一件轻薄防晒衬衫或薄开衫即可。"
        : "可不加外套，或用轻薄开衫保持松弛轮廓。",
    shoesBag: noHeels
      ? `${support.name}平底乐福鞋、芭蕾鞋或低帮鞋，搭配小号炭褐包。`
      : rainy
        ? `${support.name}低跟鞋或短靴，搭配易打理的小包。`
        : `${support.name}鞋包提亮，小面积金属件即可。`,
    alternative: `如果没有${primary.name}单品，用同色系围巾、包带或发饰做视觉焦点。`,
  };
}

function buildTopSuggestion(
  primary: ColorMeta,
  support: ColorMeta,
  input: TodayInput,
  formal: boolean,
  social: boolean,
  hot: boolean,
) {
  const faceTip = tiredMoods.includes(input.mood) || input.energy === "低" || input.extraNeed?.includes("显精神")
    ? `，把${support.name}放在领口、内搭或耳饰附近提亮脸周`
    : "，领口保持干净";

  if (hot) {
    return `${primary.name}短袖衬衫、无袖针织或轻薄罩衫${faceTip}。`;
  }

  if (formal) {
    return `${primary.name}衬衫、薄针织或合身小外套${faceTip}。`;
  }

  if (social) {
    return `${primary.name}针织开衫、短上衣或柔软衬衫${faceTip}。`;
  }

  return `${primary.name}衬衫、薄针织或短外套${faceTip}。`;
}

function buildBeautyAccessory(
  primary: ColorMeta,
  supportColors: ColorMeta[],
  input: TodayInput,
) {
  const support = supportColors[0] ?? primary;
  const social = socialScenes.includes(input.scene);
  const tired = tiredMoods.includes(input.mood) || input.energy === "低";

  return {
    makeup: tired ? "清透底妆，眼下、鼻翼和嘴角薄薄提亮。" : "轻雾面底妆，保留颧骨和鼻梁的自然光泽。",
    lip: social ? "低饱和玫瑰豆沙或柔和珊瑚色，薄涂一层即可。" : "低饱和豆沙或裸粉棕，边缘晕开更自然。",
    hair: input.weather === "风大" || input.weather === "雨"
      ? "低马尾或半扎发，减少碎发干扰。"
      : "自然披发或低马尾，保持顺滑轮廓。",
    accessory: seenAuras.includes(input.desiredAura)
      ? `${primary.name}或酒红小面积耳饰、发夹，做一个视觉焦点。`
      : "小颗珍珠、细金属耳钉或浅色发夹。",
    scentOrItem: `${support.name}小包、干净木质调香氛或一条浅色丝巾。`,
  };
}

function buildAvoidReason(color: ColorMeta, input: TodayInput) {
  if (formalScenes.includes(input.scene)) {
    return `${input.scene}场景需要让表达成为重点，大面积${color.name}容易抢走注意力，今天更适合小面积使用。`;
  }

  if (anxiousMoods.includes(input.mood)) {
    return `${input.mood}时，大面积${color.name}容易增加视觉噪音，今天不建议作为主面积使用。`;
  }

  if (input.desiredAura === "低调") {
    return `今天想要低调感，大面积${color.name}会让视觉焦点过强，建议留作局部点缀。`;
  }

  return `今天的场景和状态下，大面积${color.name}不如主色稳定，建议只做小面积点缀。`;
}

function buildAuraTitle(input: TodayInput, variant: number) {
  if (variant % 2 === 1) {
    return seenAuras.includes(input.desiredAura) ? "明亮有焦点" : "稳定有光";
  }

  if (anxiousMoods.includes(input.mood)) {
    return input.desiredAura === "清冷" ? "清透专注" : "温柔有边界";
  }

  if (input.mood === "疲惫" || input.energy === "低") {
    return "轻盈提气";
  }

  if (input.desiredAura === "被看见") {
    return "明亮有焦点";
  }

  return `${input.desiredAura}有序`;
}

function buildShortSentence(input: TodayInput, variant: number) {
  if (variant % 2 === 1) {
    return "今天少一点噪音，多一点确定感。";
  }

  if (input.desiredAura === "被看见") {
    return "把亮点放在局部，让状态自然被看见。";
  }

  if (input.mood === "疲惫" || input.energy === "低") {
    return "让浅色靠近脸周，先把自己照亮。";
  }

  return "把重点留给自己，不必用力证明。";
}

function isDislikedColor(color: ColorMeta, profile: AuraProfile) {
  return profile.avoidColors.some((name) => normalizeColorAlias(name) === color.name);
}

function isDislikedName(name: string, profile: AuraProfile) {
  const normalizedName = normalizeColorAlias(name);

  return profile.avoidColors.some((avoidName) => {
    const normalizedAvoidName = normalizeColorAlias(avoidName);
    return normalizedName === normalizedAvoidName || normalizedName.includes(normalizedAvoidName);
  });
}

function normalizeColorAlias(name: string) {
  if (name === "高饱和橙") return "亮橙";
  if (name === "炭黑") return "炭褐";
  if (name === "亮紫") return "雾紫";
  if (name === "大面积纯红") return "酒红";
  return name;
}

function toAuraColor(
  role: AuraColor["role"],
  color: ColorMeta,
  usage: string,
  reason: string,
): AuraColor {
  return {
    role,
    name: color.name,
    hex: color.hex,
    reason,
    usage,
  };
}
