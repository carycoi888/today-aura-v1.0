import type {
  AuraColor,
  AuraEnergy,
  AuraMood,
  AuraScene,
  AuraWeather,
  DesiredAura,
  UserProfile,
} from "@/lib/aura/types";

export const sceneOptions: AuraScene[] = [
  "通勤",
  "约会",
  "聚会",
  "休闲",
  "面试",
  "旅行",
  "运动",
  "居家但想保持状态",
];

export const weatherOptions: AuraWeather[] = ["晴", "阴", "雨", "冷", "热", "潮湿", "风大"];
export const moodOptions: AuraMood[] = ["平静", "低落", "兴奋", "焦虑", "烦躁", "期待"];
export const energyOptions: AuraEnergy[] = ["低", "中", "高"];
export const desiredAuraOptions: DesiredAura[] = [
  "温柔",
  "清冷",
  "元气",
  "松弛",
  "强势",
  "知性",
  "甜酷",
  "低调",
  "被看见",
];

export const profileStyleOptions = [
  "清冷",
  "松弛",
  "知性",
  "温柔",
  "元气",
  "甜酷",
  "低调",
  "强势",
  "自然",
  "典雅",
];

export const colorLibrary = [
  {
    name: "灰蓝",
    hex: "#8EA1A8",
    tags: ["通勤", "面试", "清冷", "知性", "低调", "焦虑", "烦躁", "阴"],
    usage: "放在衬衫、薄外套或半裙上，让整体更冷静、有秩序。",
  },
  {
    name: "奶油白",
    hex: "#F3EBDD",
    tags: ["温柔", "知性", "低落", "低", "热", "晴", "约会"],
    usage: "适合内搭、针织或脸周区域，能把状态轻轻提亮。",
  },
  {
    name: "燕麦色",
    hex: "#C8B8A2",
    tags: ["松弛", "休闲", "旅行", "居家但想保持状态", "平静", "低"],
    usage: "适合针织、直筒裤或外套，柔和但不甜腻。",
  },
  {
    name: "浅卡其",
    hex: "#D6C7AB",
    tags: ["松弛", "旅行", "休闲", "通勤", "风大"],
    usage: "适合风衣、长裤和托特包，行动便利且不显得随意。",
  },
  {
    name: "炭褐",
    hex: "#3C3630",
    tags: ["强势", "低调", "面试", "通勤", "聚会", "冷"],
    usage: "适合裤装、鞋包和外套，用来压住轮廓，增加边界感。",
  },
  {
    name: "玫瑰雾",
    hex: "#D8A7A0",
    tags: ["温柔", "约会", "期待", "低落", "聚会"],
    usage: "只放在唇色、围巾、小包或耳饰上，增加柔和气色。",
  },
  {
    name: "鼠尾草绿",
    hex: "#9BA88E",
    tags: ["平静", "松弛", "清冷", "休闲", "旅行", "热"],
    usage: "适合衬衫、针织或小面积配饰，视觉清新安定。",
  },
  {
    name: "酒红",
    hex: "#8C4A4D",
    tags: ["强势", "被看见", "聚会", "期待", "甜酷"],
    usage: "适合包、鞋、唇色或小面积上装，形成明确焦点。",
  },
  {
    name: "柔黄",
    hex: "#E8C86E",
    tags: ["元气", "晴", "兴奋", "被看见"],
    usage: "适合小面积针织、发夹或包饰，增加明亮感。",
  },
  {
    name: "亮橙",
    hex: "#EF7B3A",
    tags: ["元气", "被看见", "兴奋", "聚会"],
    usage: "更适合作为袜子、包挂或图案点缀，不建议大面积铺开。",
  },
] satisfies Omit<AuraColor, "role" | "reason">[] & { tags: string[] }[];

export const defaultProfile: UserProfile = {
  nickname: "Cary",
  commonStyles: ["清冷", "松弛", "知性"],
  commonColors: ["灰蓝", "奶油白", "炭褐"],
  dislikedColors: ["荧光粉", "高饱和橙"],
  desiredAuras: ["干净", "稳定", "有边界"],
  constraints: ["低维护", "需要走路"],
};

export const moodHints: Record<AuraMood, string> = {
  平静: "保持现在的稳定感，颜色不需要太用力。",
  低落: "今天先把状态扶起来，脸周用干净浅色就够了。",
  兴奋: "可以留一个小焦点，但让整体轮廓仍然清楚。",
  焦虑: "少一点视觉噪音，选择稳定、低饱和的颜色。",
  烦躁: "把复杂度降下来，利落线条会更舒服。",
  期待: "保留一点明亮细节，让好心情被看见。",
};
