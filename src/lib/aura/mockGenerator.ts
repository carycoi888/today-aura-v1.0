import { colorLibrary, defaultProfile } from "@/lib/aura/options";
import {
  getDailyColorSet,
  resolveToneFromDesiredAura,
  toAuraColor as toRecommendedAuraColor,
} from "@/lib/aura/colorRecommendations";
import type {
  AuraColor,
  DailyAuraInput,
  DailyAuraResult,
  DesiredAura,
  UserProfile,
} from "@/lib/aura/types";

const formalScenes = ["通勤", "面试"];
const socialScenes = ["约会", "聚会"];
const calmMoods = ["焦虑", "烦躁", "平静"];
const lowEnergyMoods = ["低落"];

export function generateDailyAura(
  input: DailyAuraInput,
  profile: UserProfile = defaultProfile,
  isRegenerated = false,
): DailyAuraResult {
  const safeProfile = { ...defaultProfile, ...profile };
  const colors = colorLibrary.filter(
    (color) => !safeProfile.dislikedColors.includes(color.name),
  );
  const primaryMeta = pickColor(colors, input, safeProfile, isRegenerated, "primary");
  const secondaryMeta = pickColor(
    colors.filter((color) => color.name !== primaryMeta.name),
    input,
    safeProfile,
    isRegenerated,
    "secondary",
  );
  const accentMeta = pickAccentColor(
    colorLibrary.filter(
      (color) => color.name !== primaryMeta.name && color.name !== secondaryMeta.name,
    ),
    input,
  );
  const date = formatDate(new Date());
  const createdAt = new Date().toISOString();
  const colorSet = getDailyColorSet(createdAt, resolveToneFromDesiredAura(input.desiredAura));
  const title = buildTitle(input.desiredAura || "清冷", input, isRegenerated);
  const primaryColor = mergeColorReason(
    toRecommendedAuraColor(colorSet.primary, "primary"),
    buildPrimaryReason(primaryMeta.name, input, safeProfile),
  );
  const secondaryColor = mergeColorReason(
    toRecommendedAuraColor(colorSet.secondary, "secondary"),
    `${secondaryMeta.name}用来衔接${primaryMeta.name}，放在内搭、鞋包或配饰上，降低搭配出错率。`,
  );
  const accentColor = mergeColorReason(
    toRecommendedAuraColor(colorSet.accent, "accent"),
    buildAccentReason(accentMeta.name, input),
  );
  const outfitAdvice = buildOutfitAdvice(input, primaryColor.name, secondaryColor.name);
  const makeupAdvice = buildMakeupAdvice(input, primaryColor.name, secondaryColor.name);
  const dailyQuote = buildQuote(input.desiredAura || "清冷", input.energy || "中", isRegenerated);

  return {
    id: `${createdAt}-${hashInput(input)}-${isRegenerated ? "r1" : "r0"}`,
    date,
    input,
    title,
    primaryColor,
    secondaryColor,
    accentColor,
    colorExplanation: `因为你选择了${input.scene}、${input.weather}、${input.mood}、精力${input.energy}，并希望呈现${input.desiredAura}感，所以今天用${primaryColor.name}做主色：它能服务今天的场景边界，也能把情绪复杂度降下来。你的档案偏好是${safeProfile.commonStyles.slice(0, 3).join("、")}，因此辅助色选择${secondaryColor.name}，让整体更容易落地。${input.specialNeed ? `特别诉求里提到「${input.specialNeed}」，建议把重点放在脸周提亮和利落线条，不额外增加搭配负担。` : ""}`,
    outfitAdvice,
    makeupAdvice,
    dailyQuote,
    shareCard: {
      productName: "Today Aura",
      date,
      title,
      colors: { primary: primaryColor, secondary: secondaryColor, accent: accentColor },
      outfitKeywords: [
        primaryColor.name,
        formalScenes.includes(input.scene) ? "直线轮廓" : "轻松比例",
        input.energy === "低" ? "低维护" : `${input.desiredAura}感`,
      ],
      quote: dailyQuote,
    },
    colorSet,
    isRegenerated,
    createdAt,
  };
}

function mergeColorReason(color: AuraColor, reason: string): AuraColor {
  return {
    ...color,
    reason: `${color.reason}${reason ? ` ${reason}` : ""}`,
  };
}

function pickColor(
  colors: typeof colorLibrary,
  input: DailyAuraInput,
  profile: UserProfile,
  isRegenerated: boolean,
  role: "primary" | "secondary",
) {
  const scored = colors.map((color) => {
    let score = 0;
    const sources = [
      input.scene,
      input.weather,
      input.mood,
      input.energy,
      input.desiredAura,
      ...profile.commonStyles,
      ...profile.commonColors,
    ];
    sources.forEach((item) => {
      if (item && color.tags.includes(item)) score += 4;
      if (item === color.name) score += 5;
    });
    if (role === "secondary" && ["奶油白", "燕麦色", "浅卡其"].includes(color.name)) score += 4;
    if (formalScenes.includes(input.scene) && ["亮橙", "柔黄", "玫瑰雾"].includes(color.name)) score -= 6;
    if (calmMoods.includes(input.mood) && ["亮橙", "柔黄"].includes(color.name)) score -= 7;
    if ((input.energy === "低" || lowEnergyMoods.includes(input.mood)) && ["奶油白", "燕麦色"].includes(color.name)) score += 5;
    if (socialScenes.includes(input.scene) && ["玫瑰雾", "酒红", "奶油白"].includes(color.name)) score += 4;
    if (input.weather === "雨" && ["亮橙", "奶油白"].includes(color.name)) score -= 2;
    if (input.weather === "冷" && ["炭褐", "酒红", "燕麦色"].includes(color.name)) score += 3;
    if (input.specialNeed?.includes("客户") && ["灰蓝", "炭褐", "奶油白"].includes(color.name)) score += 4;
    if (input.specialNeed?.includes("显精神") && ["奶油白", "柔黄", "玫瑰雾"].includes(color.name)) score += 3;
    if (isRegenerated && ["酒红", "鼠尾草绿", "浅卡其"].includes(color.name)) score += 3;
    return { color, score };
  });

  return scored.sort((a, b) => b.score - a.score)[0]?.color ?? colors[0];
}

function pickAccentColor(colors: typeof colorLibrary, input: DailyAuraInput) {
  const scored = colors.map((color) => {
    let score = 0;
    if (["灰蓝", "鼠尾草绿", "玫瑰雾"].includes(color.name) && calmMoods.includes(input.mood)) score += 5;
    if (["酒红", "柔黄", "玫瑰雾"].includes(color.name) && socialScenes.includes(input.scene)) score += 6;
    if (["炭褐", "灰蓝"].includes(color.name) && formalScenes.includes(input.scene)) score += 5;
    if (["奶油白", "柔黄"].includes(color.name) && (input.energy === "低" || lowEnergyMoods.includes(input.mood))) score += 3;
    if (["热", "潮湿"].includes(input.weather) && ["鼠尾草绿", "奶油白"].includes(color.name)) score += 4;
    if (color.name === "亮橙" && calmMoods.includes(input.mood)) score -= 6;
    return { color, score };
  });
  return scored.sort((a, b) => b.score - a.score)[0]?.color ?? colors[0];
}

function buildTitle(aura: DesiredAura | "清冷", input: DailyAuraInput, isRegenerated: boolean) {
  if (isRegenerated) {
    const map: Record<string, string> = {
      清冷: "清透从容",
      温柔: "柔和有界",
      元气: "明亮轻盈",
      松弛: "松弛清爽",
      强势: "利落有锋",
      知性: "清晰稳定",
      甜酷: "轻酷有光",
      低调: "安静清楚",
      被看见: "明亮有焦点",
    };
    return map[aura] ?? "清透从容";
  }
  if (input.scene === "面试") return "清晰可信";
  if (input.energy === "低") return "轻盈提气";
  const map: Record<string, string> = {
    清冷: "清透专注",
    温柔: "温柔有界",
    元气: "明亮元气",
    松弛: "自在松弛",
    强势: "冷静锋利",
    知性: "知性清爽",
    甜酷: "甜酷利落",
    低调: "低调清醒",
    被看见: "明亮有焦点",
  };
  return map[aura] ?? "清透专注";
}

function buildPrimaryReason(colorName: string, input: DailyAuraInput, profile: UserProfile) {
  return `今天是${input.scene}，天气是${input.weather}，心情偏${input.mood}，${colorName}能和你档案中的${profile.commonStyles.slice(0, 2).join("、")}偏好保持一致，同时不增加选择负担。`;
}

function buildAccentReason(colorName: string, input: DailyAuraInput) {
  return `今天是${input.scene}且情绪为${input.mood}，${colorName}适合做小面积点缀，放在耳饰、包饰、发夹或袜子上，给整体增加一点呼吸感。`;
}

function buildOutfitAdvice(input: DailyAuraInput, primary: string, secondary: string) {
  const formal = formalScenes.includes(input.scene);
  const low = input.energy === "低";
  const rain = input.weather === "雨";
  const hot = ["热", "潮湿"].includes(input.weather);
  return {
    silhouette: formal ? "直线感为主，肩线和裤线保持清楚，整体不要堆太多层。" : "保持舒适比例，上下装一松一利落，行动起来更自然。",
    top: `上装选${secondary}衬衫、针织或干净 T 恤，靠近脸周的位置保持清爽。`,
    bottom: formal ? `下装用直筒西裤、半裙或深色牛仔，和${primary}形成稳定比例。` : `下装选直筒牛仔、垂感长裤或舒服半裙，颜色压在${primary}或炭褐附近。`,
    outerwear: hot ? "外套可省略，改用薄开衫或轻衬衫防晒。" : input.weather === "冷" ? `加一件${primary}或炭褐短外套，保暖但不拖沓。` : `外套选择${primary}、浅卡其或燕麦色，线条简单即可。`,
    shoesBag: rain ? "鞋包选防水好打理的乐福鞋、短靴或小托特，避免拖地裤脚和吸水材质。" : `鞋包用${secondary}、灰棕或炭褐，降低视觉噪音。`,
    alternative: low ? "如果精力不够，就用同色系上装加直筒下装，再用一个小耳饰完成状态。" : "如果临时换场景，把主色缩小到上装或包袋，其他单品保持低饱和即可。",
  };
}

function buildMakeupAdvice(input: DailyAuraInput, primary: string, secondary: string) {
  const low = input.energy === "低";
  const formal = formalScenes.includes(input.scene);
  return {
    finish: low ? "清透低维护底妆，只修饰泛红和暗沉，不追求完整精致。" : formal ? "半雾面底妆，干净、稳定、不过度光泽。" : "轻薄底妆加一点自然光泽，让气色更柔和。",
    lip: input.desiredAura === "强势" ? "低饱和豆沙或酒红薄涂，边缘保持干净。" : `奶茶、豆沙或玫瑰雾唇色，和${secondary}形成柔和呼应。`,
    eye: formal ? "眼妆保持浅棕细眼线和干净睫毛，不做大面积闪片。" : "眼妆用浅棕或灰棕，眼尾轻轻拉开一点即可。",
    hair: input.weather === "风大" ? "低马尾、鲨鱼夹或半扎发，减少飘散和反复整理。" : "头发保持顺滑或自然卷度，露出干净领口。",
    accessory: `配饰选小面积金属耳饰、细链或${primary}色小包，保持一个视觉焦点。`,
    item: formal ? "小物选干净手表、细戒或木质淡香，表达稳定感。" : "小物可用柔和香氛、发夹或丝巾，但只保留一个重点。",
  };
}

function buildQuote(aura: string, energy: string, isRegenerated: boolean) {
  if (isRegenerated) return "换一个角度，也能清楚出现。";
  if (energy === "低") return "用干净的颜色，把状态慢慢扶起来。";
  const quotes: Record<string, string> = {
    清冷: "今天不用很响亮，也可以很清楚。",
    温柔: "柔和不是退让，是稳定地靠近自己。",
    元气: "少一点复杂，多一点确定。",
    松弛: "把重点留给自己，不必用力证明。",
    强势: "边界清楚，表达就会更轻。",
    知性: "清晰出现，比用力出场更有力量。",
    甜酷: "保留一点锋利，也保留一点柔软。",
    低调: "安静一点，也能被认真看见。",
    被看见: "让一个重点发光，其余保持从容。",
  };
  return quotes[aura] ?? "今天不用很响亮，也可以很清楚。";
}

function hashInput(input: DailyAuraInput) {
  return [input.scene, input.weather, input.mood, input.energy, input.desiredAura]
    .join("-")
    .replace(/\s/g, "");
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date);
}
