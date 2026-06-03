import type {
  ColorMeta,
  CommonStyle,
  DailyInput,
  DesiredAura,
  DislikedColor,
  EnergyLevel,
  Mood,
  Option,
  OutfitConstraint,
  PreferredColor,
  Scene,
  SkinTone,
  UserProfile,
  Weather,
} from "@/lib/aura-types";

export const SCENE_OPTIONS: Option<Scene>[] = [
  { id: "commute", label: "通勤" },
  { id: "work", label: "上班" },
  { id: "date", label: "约会" },
  { id: "friends", label: "见朋友" },
  { id: "party", label: "聚会" },
  { id: "casual", label: "休闲" },
  { id: "sport", label: "运动" },
  { id: "interview", label: "面试" },
  { id: "travel", label: "旅行" },
  { id: "home", label: "居家但想保持状态" },
];

export const WEATHER_OPTIONS: Option<Weather>[] = [
  { id: "sunny", label: "晴" },
  { id: "cloudy", label: "阴" },
  { id: "rainy", label: "雨" },
  { id: "cold", label: "冷" },
  { id: "hot", label: "热" },
  { id: "humid", label: "潮湿" },
  { id: "windy", label: "风大" },
];

export const MOOD_OPTIONS: Option<Mood>[] = [
  { id: "calm", label: "平静" },
  { id: "low", label: "低落" },
  { id: "excited", label: "兴奋" },
  { id: "anxious", label: "有点焦虑" },
  { id: "tired", label: "疲惫" },
  { id: "irritated", label: "烦躁" },
  { id: "expecting", label: "期待" },
];

export const ENERGY_OPTIONS: Option<EnergyLevel>[] = [
  { id: "low", label: "低" },
  { id: "medium", label: "中" },
  { id: "high", label: "高" },
];

export const AURA_OPTIONS: Option<DesiredAura>[] = [
  { id: "gentle", label: "温柔" },
  { id: "cool", label: "清冷" },
  { id: "bright", label: "元气" },
  { id: "relaxed", label: "松弛" },
  { id: "strong", label: "强势" },
  { id: "smart", label: "知性" },
  { id: "sweetCool", label: "甜酷" },
  { id: "lowKey", label: "低调" },
  { id: "seen", label: "被看见" },
];

export const STYLE_TAG_OPTIONS: CommonStyle[] = ["清冷", "松弛", "知性", "温柔", "甜酷", "元气"];
export const PROFILE_SCENE_OPTIONS: Scene[] = ["通勤", "上班", "休闲", "约会", "见朋友", "面试", "旅行", "聚会"];
export const PREFERRED_COLOR_OPTIONS: PreferredColor[] = ["灰蓝", "炭褐", "燕麦色", "酒红", "浅卡其", "雾粉", "鼠尾草绿"];
export const DISLIKED_COLOR_OPTIONS: DislikedColor[] = [
  "荧光粉",
  "高饱和橙",
  "亮紫",
  "大面积纯红",
  "亮橙",
  "酒红",
];

export const PROFILE_COLOR_OPTIONS = PREFERRED_COLOR_OPTIONS;
export const PROFILE_AVOID_COLOR_OPTIONS = DISLIKED_COLOR_OPTIONS;

export const SKIN_TONE_OPTIONS: Option<SkinTone>[] = [
  { id: "fair-cool", label: "偏冷白" },
  { id: "fair-warm", label: "偏暖白" },
  { id: "natural", label: "自然肤色" },
  { id: "wheat", label: "小麦肤色" },
  { id: "not-sure", label: "不确定" },
];

export const OUTFIT_CONSTRAINT_OPTIONS: Option<OutfitConstraint>[] = [
  { id: "low-maintenance", label: "低维护" },
  { id: "commute-walk", label: "需要走路" },
  { id: "no-heels", label: "不穿高跟" },
  { id: "warmth", label: "需要保暖" },
  { id: "formal", label: "不能太休闲" },
  { id: "avoid-tight", label: "不想太紧身" },
];

export const EXTRA_NEED_FIELD = {
  id: "extraNeed",
  label: "今天有什么特别诉求？",
  placeholder: "例如“今天要见客户，有点疲惫，想显精神但不要太强势。”",
  required: false,
};

export const COLOR_LIBRARY: ColorMeta[] = [
  {
    name: "灰蓝",
    hex: "#8EA1A8",
    temperature: "冷",
    saturation: "低",
    brightness: "中",
    moodTags: ["有点焦虑", "烦躁", "清冷", "知性", "低调"],
    sceneTags: ["通勤", "面试", "旅行", "休闲"],
    usageTips: ["适合衬衫、外套、半裙或包袋", "能让整体更冷静、有秩序"],
  },
  {
    name: "炭褐",
    hex: "#3C3630",
    temperature: "中性",
    saturation: "低",
    brightness: "深",
    moodTags: ["强势", "低调", "知性", "平静"],
    sceneTags: ["通勤", "面试", "聚会"],
    usageTips: ["适合裤装、鞋、包和外套", "用来压住轮廓，增加稳定感"],
  },
  {
    name: "燕麦色",
    hex: "#C8B8A2",
    temperature: "暖",
    saturation: "低",
    brightness: "中",
    moodTags: ["松弛", "温柔", "疲惫", "低落"],
    sceneTags: ["休闲", "约会", "通勤", "居家但想保持状态"],
    usageTips: ["适合针织、半裙、外套", "让搭配柔和但不甜腻"],
  },
  {
    name: "浅卡其",
    hex: "#D6C7AB",
    temperature: "暖",
    saturation: "低",
    brightness: "浅",
    moodTags: ["松弛", "知性", "低调"],
    sceneTags: ["通勤", "旅行", "休闲"],
    usageTips: ["适合风衣、长裤和托特包", "适合做大面积底色"],
  },
  {
    name: "雾粉",
    hex: "#D8A7A0",
    temperature: "暖",
    saturation: "低",
    brightness: "中",
    moodTags: ["温柔", "约会", "期待", "低落"],
    sceneTags: ["约会", "见朋友", "聚会", "休闲"],
    usageTips: ["适合唇色、围巾、小包和上衣局部", "能增加柔和气色"],
  },
  {
    name: "鼠尾草绿",
    hex: "#9BA88E",
    temperature: "冷",
    saturation: "低",
    brightness: "中",
    moodTags: ["平静", "松弛", "清冷", "疲惫"],
    sceneTags: ["休闲", "旅行", "通勤"],
    usageTips: ["适合衬衫、针织或小面积配饰", "能让视觉更清新安定"],
  },
  {
    name: "酒红",
    hex: "#8C4A4D",
    temperature: "暖",
    saturation: "中",
    brightness: "深",
    moodTags: ["强势", "被看见", "聚会", "期待"],
    sceneTags: ["聚会", "约会", "见朋友"],
    usageTips: ["适合包、唇色、鞋或小面积上装", "适合做局部焦点"],
  },
  {
    name: "亮橙",
    hex: "#D77A3D",
    temperature: "暖",
    saturation: "高",
    brightness: "中",
    moodTags: ["元气", "被看见", "兴奋"],
    sceneTags: ["聚会", "见朋友", "休闲"],
    usageTips: ["只建议做发圈、包挂、小面积图案", "不适合在焦虑或正式场景大面积使用"],
  },
  {
    name: "雾紫",
    hex: "#A99AB8",
    temperature: "冷",
    saturation: "低",
    brightness: "中",
    moodTags: ["甜酷", "清冷", "被看见"],
    sceneTags: ["聚会", "约会", "休闲"],
    usageTips: ["适合小上衣、发夹或眼影局部", "能增加一点特别感"],
  },
];

export const DEFAULT_PROFILE: UserProfile = {
  nickname: "Cary",
  scenes: ["通勤", "休闲", "约会"],
  styleTags: ["清冷", "松弛", "知性"],
  colors: ["灰蓝", "燕麦色", "炭褐"],
  avoidColors: ["荧光粉", "高饱和橙"],
  skinTone: "不确定",
  outfitConstraints: ["低维护"],
  desiredAura: "干净、稳定、有边界",
};

export const DEFAULT_TODAY_INPUT: DailyInput = {
  scene: "通勤",
  weather: "阴",
  mood: "有点焦虑",
  energy: "中",
  desiredAura: "清冷",
  extraNeed: "",
};
