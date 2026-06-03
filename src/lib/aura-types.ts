export type Option<TLabel extends string = string> = {
  id: string;
  label: TLabel;
};

export type Scene =
  | "通勤"
  | "上班"
  | "约会"
  | "见朋友"
  | "聚会"
  | "休闲"
  | "运动"
  | "面试"
  | "旅行"
  | "居家但想保持状态";

export type Weather = "晴" | "阴" | "雨" | "冷" | "热" | "潮湿" | "风大";

export type Mood =
  | "平静"
  | "低落"
  | "兴奋"
  | "有点焦虑"
  | "疲惫"
  | "烦躁"
  | "期待";

export type EnergyLevel = "低" | "中" | "高";

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

export type CommonStyle = "清冷" | "松弛" | "知性" | "温柔" | "甜酷" | "元气";

export type PreferredColor =
  | "奶油白"
  | "灰蓝"
  | "炭褐"
  | "燕麦色"
  | "酒红"
  | "浅卡其"
  | "雾粉"
  | "鼠尾草绿";

export type DislikedColor =
  | "荧光粉"
  | "高饱和橙"
  | "亮紫"
  | "大面积纯红"
  | "亮橙"
  | "酒红";

export type SkinTone = "偏冷白" | "偏暖白" | "自然肤色" | "小麦肤色" | "不确定";

export type OutfitConstraint =
  | "低维护"
  | "需要走路"
  | "不穿高跟"
  | "需要保暖"
  | "不能太休闲"
  | "不想太紧身";

export type AuraColorRole = "primary" | "secondary" | "avoid";

export type AuraColor = {
  role: AuraColorRole;
  name: string;
  hex: string;
  reason: string;
  usage: string;
};

export type ColorMeta = {
  name: string;
  hex: string;
  temperature: "冷" | "暖" | "中性";
  saturation: "低" | "中" | "高";
  brightness: "浅" | "中" | "深";
  moodTags: string[];
  sceneTags: string[];
  usageTips: string[];
};

export type UserProfile = {
  nickname: string;
  scenes: string[];
  styleTags: string[];
  colors: string[];
  avoidColors: string[];
  skinTone: SkinTone;
  outfitConstraints: string[];
  desiredAura: string;
};

export type DailyInput = {
  scene: Scene;
  weather: Weather;
  mood: Mood;
  energy: EnergyLevel;
  desiredAura: DesiredAura;
  extraNeed?: string;
  // 未来语音输入应先转成草稿并由用户确认；MVP 0.1 不实现真实语音识别。
};

export type OutfitSuggestion = {
  silhouette: string;
  top: string;
  bottom: string;
  outerwear: string;
  shoesBag: string;
  alternative: string;
};

export type MakeupAccessorySuggestion = {
  makeup: string;
  lip: string;
  hair: string;
  accessories: string;
  scentOrItem: string;
};

export type ShareCardData = {
  productName: "今日气场 Today Aura";
  date: string;
  auraTitle: string;
  primaryColor: AuraColor;
  supportColor: AuraColor;
  avoidColor: AuraColor;
  outfitKeywords: string[];
  shortSentence: string;
};

export type LocalAuraRecommendation = {
  auraTitle: string;
  primaryColor: ColorMeta;
  supportColors: ColorMeta[];
  avoidColor: {
    color: ColorMeta;
    reason: string;
    usageTip: string;
  };
  colorReason: string;
  outfit: OutfitSuggestion;
  beautyAccessory: {
    makeup: string;
    lip: string;
    hair: string;
    accessory: string;
    scentOrItem: string;
  };
  shareText: string;
  outfitKeywords: string[];
};

export type AuraResult = {
  id: string;
  date: string;
  title: string;
  variant: number;
  input: DailyInput;
  colors: {
    primary: AuraColor;
    secondary: AuraColor;
    avoid: AuraColor;
  };
  colorExplanation: string;
  outfit: OutfitSuggestion;
  makeupAccessories: MakeupAccessorySuggestion;
  shortSentence: string;
  shareKeywords: string[];
  shareCard: ShareCardData;
};

export type UserInputSource = "manual" | "future-voice-draft";

export type VoiceInputDraft = {
  source: "future-voice-draft";
  transcript: string;
  extractedInput: Partial<DailyInput>;
};

export type AuraProfile = UserProfile;
export type TodayInput = DailyInput;
