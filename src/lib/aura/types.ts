export type AuraScene =
  | "通勤"
  | "约会"
  | "聚会"
  | "休闲"
  | "面试"
  | "旅行"
  | "运动"
  | "居家但想保持状态";

export type AuraWeather = "晴" | "阴" | "雨" | "冷" | "热" | "潮湿" | "风大";
export type AuraMood = "平静" | "低落" | "兴奋" | "焦虑" | "烦躁" | "期待";
export type AuraEnergy = "低" | "中" | "高";
export type DesiredAura =
  | "温柔"
  | "清冷"
  | "元气"
  | "松弛"
  | "强势"
  | "知性"
  | "甜酷"
  | "低调"
  | "被看见";

export type UserProfile = {
  nickname: string;
  commonStyles: string[];
  commonColors: string[];
  dislikedColors: string[];
  desiredAuras: string[];
  constraints: string[];
};

export type DailyAuraInput = {
  scene: AuraScene | "";
  weather: AuraWeather | "";
  mood: AuraMood | "";
  energy: AuraEnergy | "";
  desiredAura: DesiredAura | "";
  specialNeed?: string;
};

export type AuraColor = {
  name: string;
  hex: string;
  role: "primary" | "secondary" | "accent";
  reason: string;
  usage: string;
};

export type OutfitAdvice = {
  silhouette: string;
  top: string;
  bottom: string;
  outerwear: string;
  shoesBag: string;
  alternative: string;
};

export type MakeupAdvice = {
  finish: string;
  lip: string;
  eye: string;
  hair: string;
  accessory: string;
  item: string;
};

export type ShareCardData = {
  productName: "Today Aura";
  date: string;
  title: string;
  colors: {
    primary: AuraColor;
    secondary: AuraColor;
    accent: AuraColor;
  };
  outfitKeywords: string[];
  quote: string;
};

export type DailyAuraResult = {
  id: string;
  date: string;
  input: DailyAuraInput;
  title: string;
  primaryColor: AuraColor;
  secondaryColor: AuraColor;
  accentColor: AuraColor;
  colorExplanation: string;
  outfitAdvice: OutfitAdvice;
  makeupAdvice: MakeupAdvice;
  dailyQuote: string;
  shareCard: ShareCardData;
  isRegenerated: boolean;
  createdAt: string;
};
