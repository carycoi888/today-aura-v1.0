import type {
  AuraColor,
  AuraColorRecommendation,
  AuraTone,
  ColorRole,
  DailyAuraColorSet,
  DesiredAura,
  OutfitItem,
} from "@/lib/aura/types";

const defaultTone: AuraTone = "清冷知性";

type ToneSource = {
  title: string;
  primary: AuraColorRecommendation;
  secondary: AuraColorRecommendation[];
  accent: AuraColorRecommendation[];
};

const toneCatalog: Record<AuraTone, ToneSource> = {
  清冷知性: toneSource("清冷知性", "清透专注", {
    primary: color("cool-primary-gray-blue", "primary", "灰蓝", "#8EA1A8", "清透专注", "灰蓝适合通勤、阴天、想要清冷感的状态，能让整体视觉更稳定、清爽、有秩序。", "灰蓝搭配建议", "冷静沉稳，专业但不生硬", [
      outfit("gray-blue-top", "上装", "灰蓝上衣", "灰蓝", "适合作为今天靠近脸周的视觉中心。", "清冷知性/灰蓝上衣.png"),
      outfit("gray-blue-outerwear", "外套", "灰色外套", "灰色", "外层保持低饱和，清冷但不生硬。", "清冷知性/灰色外套.png"),
      outfit("gray-blue-bottom", "下装", "奶油白裤子", "奶油白", "用低饱和浅色承接主色，整体更轻。", "清冷知性/奶油白裤子.png"),
      outfit("gray-blue-bag", "鞋包", "深棕包", "深棕", "压住轮廓，不让灰蓝显得单薄。", "清冷知性/深棕包.png"),
    ], "灰蓝适合放在上装或外套，作为今天的视觉中心；搭配浅色下装和低调鞋包，会更清透稳定。"),
    secondary: [
      color("cool-secondary-cream-white", "secondary", "奶油白", "#EFE7DC", "柔和提亮", "奶油白适合用在内搭、下装或包包，能提亮整体但不抢主色。", "奶油白搭配建议", "温柔干净，轻盈收束", [
        outfit("cream-white-bottom", "下装", "奶油白裤子", "奶油白", "放在下装里，让灰蓝更柔和。", "清冷知性/奶油白裤子.png"),
        outfit("cream-white-top", "上装", "灰蓝上衣", "灰蓝", "上半身保留清冷主线。", "清冷知性/灰蓝上衣.png"),
        outfit("cream-white-outerwear", "外套", "灰色外套", "灰色", "外套降低对比，适合通勤和日常切换。", "清冷知性/灰色外套.png"),
        outfit("cream-white-shoes", "鞋包", "深棕鞋", "深棕", "用深棕收束整体，不制造额外焦点。", "清冷知性/深棕鞋.png"),
      ], "奶油白适合作为辅助色放在内搭、鞋包和下装中，让灰蓝更柔和，不会显得过冷。"),
      color("cool-secondary-light-khaki", "secondary", "浅卡其", "#D8C8A8", "柔和提亮", "浅卡其适合用在下装、外套或包包，能让灰蓝更日常，也不抢主色。", "浅卡其搭配建议", "柔和过渡，清爽不单薄", [
        outfit("light-khaki-outerwear", "外套", "灰色外套", "灰色", "适合作为灰蓝外层的轻柔过渡。", "清冷知性/灰色外套.png"),
        outfit("light-khaki-bottom", "下装", "奶油白裤子", "奶油白", "让下半身保持干净、稳定。", "清冷知性/奶油白裤子.png"),
        outfit("light-khaki-bag", "鞋包", "深棕包", "深棕", "减少视觉噪音，早晨出门更省心。", "清冷知性/深棕包.png"),
        outfit("light-khaki-belt", "配饰", "深棕腰带", "深棕", "少量深色让清冷感更有边界。", "清冷知性/深棕腰带.png"),
      ], "浅卡其适合放在外套、下装和鞋包里，给灰蓝增加柔和过渡，整体更适合日常通勤。"),
    ],
    accent: [
      color("cool-accent-charcoal-brown", "accent", "炭褐", "#3C3630", "小面积点缀", "今天不建议大面积使用高对比深色，可以只放在鞋、包、腰带或小物里。", "炭褐点缀建议", "少量出现，增加边界", [
        outfit("charcoal-brown-shoes", "鞋包", "深棕鞋", "炭褐 / 深棕", "给灰蓝和奶油白一点清楚边界。", "清冷知性/深棕鞋.png"),
        outfit("charcoal-brown-bag", "鞋包", "深棕包", "炭褐 / 深棕", "只保留一个暗色重点即可。", "清冷知性/深棕包.png"),
        outfit("charcoal-brown-belt", "配饰", "深棕腰带", "炭褐 / 深棕", "作为小面积线条，不影响整体清爽度。", "清冷知性/深棕腰带.png"),
      ], "炭褐不要大面积铺开，只放在鞋包或腰带里，就能让整体更有焦点。"),
    ],
  }),

  温柔知性: toneSource("温柔知性", "柔和有界", {
    primary: color("gentle-primary-dusty-pink", "primary", "豆沙粉", "#D8A7A0", "温柔有界", "豆沙粉适合约会、见朋友或想要柔和但不甜腻的状态，能让脸周更温和。", "豆沙粉搭配建议", "柔和亲近，保留边界", [
      outfit("gentle-top", "上装", "豆沙粉上衣", "豆沙粉", "放在上装可以让今天的状态更柔和。", "温柔知性/豆沙粉上衣.png"),
      outfit("gentle-bottom", "下装", "浅卡其裤子", "浅卡其", "用浅卡其承接粉调，避免过甜。", "温柔知性/浅卡其裤子.png"),
      outfit("gentle-bag", "鞋包", "奶油白包", "奶油白", "提亮但不抢主色。", "温柔知性/奶油白包.png"),
      outfit("gentle-shoes", "鞋包", "奶油白鞋", "奶油白", "让整体保持轻盈。", "温柔知性/奶油白鞋.png"),
    ], "豆沙粉适合放在上装，搭配浅卡其和奶油白，会温柔但不黏腻。"),
    secondary: [
      color("gentle-secondary-light-khaki", "secondary", "浅卡其", "#D8C8A8", "自然承接", "浅卡其能把豆沙粉落到日常衣物里，适合下装和通勤鞋包。", "浅卡其搭配建议", "稳住粉调，降低甜度", [
        outfit("gentle-khaki-bottom", "下装", "浅卡其裤子", "浅卡其", "稳住整体比例。", "温柔知性/浅卡其裤子.png"),
        outfit("gentle-khaki-top", "上装", "豆沙粉上衣", "豆沙粉", "保留温柔视觉中心。", "温柔知性/豆沙粉上衣.png"),
        outfit("gentle-khaki-bag", "鞋包", "奶油白包", "奶油白", "让浅卡其更干净。", "温柔知性/奶油白包.png"),
        outfit("gentle-khaki-shoes", "鞋包", "奶油白鞋", "奶油白", "轻盈收尾。", "温柔知性/奶油白鞋.png"),
      ], "浅卡其适合放在下装，让豆沙粉更知性，也更容易直接穿出门。"),
    ],
    accent: [
      color("gentle-accent-cream-white", "accent", "奶油白", "#EFE7DC", "小面积提亮", "奶油白适合放在包、鞋或内搭里做轻提亮，不需要大面积堆叠。", "奶油白点缀建议", "干净提亮，少量就够", [
        outfit("gentle-cream-bag", "鞋包", "奶油白包", "奶油白", "一个浅色包就能让整体更亮。", "温柔知性/奶油白包.png"),
        outfit("gentle-cream-shoes", "鞋包", "奶油白鞋", "奶油白", "和浅卡其形成自然过渡。", "温柔知性/奶油白鞋.png"),
        outfit("gentle-cream-top", "上装", "豆沙粉上衣", "豆沙粉", "保持主色温柔。", "温柔知性/豆沙粉上衣.png"),
      ], "奶油白用在鞋包里最稳，能提亮但不会抢走豆沙粉的温柔感。"),
    ],
  }),

  松弛自然: toneSource("松弛自然", "自在松弛", {
    primary: color("relaxed-primary-olive", "primary", "橄榄绿", "#8C9A72", "自然松弛", "橄榄绿适合休闲、旅行、风大或想要自然松弛的状态，视觉稳定又不沉闷。", "橄榄绿搭配建议", "自然有呼吸感", [
      outfit("relaxed-outerwear", "外套", "橄榄绿外套", "橄榄绿", "作为外层主色，轻松但有结构。", "松弛自然/橄榄绿外套.png"),
      outfit("relaxed-bottom", "下装", "米色裤子", "米色", "把户外感拉回日常。", "松弛自然/米色裤子.png"),
      outfit("relaxed-bag", "鞋包", "浅棕包", "浅棕", "增加自然质感。", "松弛自然/浅棕包.png"),
      outfit("relaxed-shoes", "鞋包", "奶油白鞋", "奶油白", "保持脚下轻盈。", "松弛自然/奶油白鞋.png"),
    ], "橄榄绿适合作为外套主色，搭配米色裤子和浅棕包，会更松弛自然。"),
    secondary: [
      color("relaxed-secondary-beige", "secondary", "米色", "#D8CCB8", "轻松过渡", "米色适合下装和内搭，能让橄榄绿更柔和、好穿。", "米色搭配建议", "干净自然，降低复杂度", [
        outfit("relaxed-beige-bottom", "下装", "米色裤子", "米色", "下半身保持轻松。", "松弛自然/米色裤子.png"),
        outfit("relaxed-beige-outer", "外套", "橄榄绿外套", "橄榄绿", "上半身保留自然主色。", "松弛自然/橄榄绿外套.png"),
        outfit("relaxed-beige-bag", "鞋包", "浅棕包", "浅棕", "让整体更有质感。", "松弛自然/浅棕包.png"),
        outfit("relaxed-beige-shoes", "鞋包", "奶油白鞋", "奶油白", "适合需要走路的一天。", "松弛自然/奶油白鞋.png"),
      ], "米色放在裤装里最省心，搭配橄榄绿外套会自然、干净、低维护。"),
    ],
    accent: [
      color("relaxed-accent-light-brown", "accent", "浅棕", "#B99A63", "质感点缀", "浅棕适合放在包、小配饰或鞋里，让自然感更完整。", "浅棕点缀建议", "少量质感，轻松收尾", [
        outfit("relaxed-brown-bag", "鞋包", "浅棕包", "浅棕", "自然风格里最稳的焦点。", "松弛自然/浅棕包.png"),
        outfit("relaxed-brown-accessory", "小物", "浅棕小配饰", "浅棕", "只做小面积呼应。", "松弛自然/浅棕小配饰.png"),
        outfit("relaxed-brown-shoes", "鞋包", "奶油白鞋", "奶油白", "保持整体轻盈。", "松弛自然/奶油白鞋.png"),
      ], "浅棕适合放在包和小物里，增加质感，但不要把全身都做成棕调。"),
    ],
  }),

  气质优雅: toneSource("气质优雅", "优雅清晰", {
    primary: color("elegant-primary-misty-purple", "primary", "雾霾紫", "#A99AAF", "柔雾优雅", "雾霾紫适合想要优雅、安静、有记忆点的状态，低饱和但不无聊。", "雾霾紫搭配建议", "温柔有质感，不用力", [
      outfit("elegant-top", "上装", "雾霾紫上衣", "雾霾紫", "让优雅感靠近脸周。", "气质优雅/雾霾紫上衣.png"),
      outfit("elegant-bottom", "下装", "米灰裤子", "米灰", "让紫调更日常。", "气质优雅/米灰裤子.png"),
      outfit("elegant-bag", "鞋包", "深棕包", "深棕", "给整体一点成熟边界。", "气质优雅/深棕包.png"),
      outfit("elegant-shoes", "鞋包", "深棕鞋", "深棕", "稳定收尾。", "气质优雅/深棕鞋.png"),
    ], "雾霾紫适合放在上装，搭配米灰裤子和深棕鞋包，会优雅但不隆重。"),
    secondary: [
      color("elegant-secondary-greige", "secondary", "米灰", "#CFC8BE", "温和衔接", "米灰能衔接雾霾紫和深棕，适合下装或外层。", "米灰搭配建议", "柔和收束，干净耐看", [
        outfit("elegant-greige-bottom", "下装", "米灰裤子", "米灰", "降低紫色的距离感。", "气质优雅/米灰裤子.png"),
        outfit("elegant-greige-top", "上装", "雾霾紫上衣", "雾霾紫", "保留优雅主线。", "气质优雅/雾霾紫上衣.png"),
        outfit("elegant-greige-bag", "鞋包", "深棕包", "深棕", "增加成熟质感。", "气质优雅/深棕包.png"),
        outfit("elegant-greige-shoes", "鞋包", "深棕鞋", "深棕", "让整体更稳。", "气质优雅/深棕鞋.png"),
      ], "米灰适合做辅助色，能让雾霾紫更日常，也更适合通勤和见人。"),
    ],
    accent: [
      color("elegant-accent-deep-brown", "accent", "深棕", "#4A3329", "成熟点缀", "深棕适合用在鞋包里，不需要大面积穿在身上。", "深棕点缀建议", "压住轮廓，增加质感", [
        outfit("elegant-brown-bag", "鞋包", "深棕包", "深棕", "优雅气场里的稳定焦点。", "气质优雅/深棕包.png"),
        outfit("elegant-brown-shoes", "鞋包", "深棕鞋", "深棕", "和米灰裤子自然衔接。", "气质优雅/深棕鞋.png"),
        outfit("elegant-brown-top", "上装", "雾霾紫上衣", "雾霾紫", "保持主色柔和。", "气质优雅/雾霾紫上衣.png"),
      ], "深棕放在鞋包里即可，不需要大面积出现，能让雾霾紫更有质感。"),
    ],
  }),

  活力明亮: toneSource("活力明亮", "明亮有焦点", {
    primary: color("bright-primary-warm-orange", "primary", "暖橙", "#E98A45", "明亮提气", "暖橙适合想要被看见、精力较高或需要一点明亮焦点的状态。", "暖橙搭配建议", "明亮但不吵闹", [
      outfit("bright-top", "上装", "暖橙上衣", "暖橙", "作为今天的明亮视觉中心。", "活力明亮/暖橙上衣.png"),
      outfit("bright-outerwear", "外套", "牛仔蓝外套", "牛仔蓝", "用蓝色中和橙色活力。", "活力明亮/牛仔蓝外套.png"),
      outfit("bright-bottom", "下装", "奶油白裤子", "奶油白", "让整体更清爽。", "活力明亮/奶油白裤子.png"),
      outfit("bright-bag", "鞋包", "奶油白蓝色包", "奶油白 / 蓝", "轻巧呼应外套。", "活力明亮/奶油白蓝色包.png"),
    ], "暖橙适合放在上装，搭配牛仔蓝和奶油白，会明亮但不杂乱。"),
    secondary: [
      color("bright-secondary-denim-blue", "secondary", "牛仔蓝", "#6F8FAB", "清爽平衡", "牛仔蓝能平衡暖橙，适合外套、包或鞋。", "牛仔蓝搭配建议", "把明亮感拉回日常", [
        outfit("bright-denim-outerwear", "外套", "牛仔蓝外套", "牛仔蓝", "让暖橙更日常。", "活力明亮/牛仔蓝外套.png"),
        outfit("bright-denim-top", "上装", "暖橙上衣", "暖橙", "保留今日焦点。", "活力明亮/暖橙上衣.png"),
        outfit("bright-denim-bottom", "下装", "奶油白裤子", "奶油白", "保持干净。", "活力明亮/奶油白裤子.png"),
        outfit("bright-denim-shoes", "鞋包", "奶油白蓝色鞋", "奶油白 / 蓝", "让蓝色呼应得更轻。", "活力明亮/奶油白蓝色鞋.png"),
      ], "牛仔蓝适合作为辅助色，把暖橙的活力稳定下来。"),
    ],
    accent: [
      color("bright-accent-cream-blue", "accent", "奶油白蓝", "#E8EEF2", "清爽点缀", "奶油白蓝适合放在鞋包里，让明亮色组更轻盈。", "奶油白蓝点缀建议", "清爽呼应，少量提亮", [
        outfit("bright-cream-blue-bag", "鞋包", "奶油白蓝色包", "奶油白 / 蓝", "小面积呼应牛仔蓝。", "活力明亮/奶油白蓝色包.png"),
        outfit("bright-cream-blue-shoes", "鞋包", "奶油白蓝色鞋", "奶油白 / 蓝", "保持脚下轻盈。", "活力明亮/奶油白蓝色鞋.png"),
        outfit("bright-cream-blue-bottom", "下装", "奶油白裤子", "奶油白", "让暖橙不显得厚重。", "活力明亮/奶油白裤子.png"),
      ], "奶油白蓝适合出现在鞋包里，作为清爽点缀就够了。"),
    ],
  }),

  沉稳内敛: toneSource("沉稳内敛", "安静清楚", {
    primary: color("stable-primary-deep-blue", "primary", "深海蓝", "#1F3648", "沉稳清楚", "深海蓝适合正式、低调或需要稳定表达的日子，比黑色更有层次。", "深海蓝搭配建议", "低调稳定，边界清楚", [
      outfit("stable-top", "上装", "深海蓝上衣", "深海蓝", "靠近脸周表达稳定感。", "沉稳内敛/深海蓝上衣.png"),
      outfit("stable-outerwear", "外套", "灰米色外套", "灰米色", "减少深色的压迫感。", "沉稳内敛/灰米色外套.png"),
      outfit("stable-bottom", "下装", "灰米裤子", "灰米", "保持低调干净。", "沉稳内敛/灰米裤子.png"),
      outfit("stable-bag", "鞋包", "黑色包", "黑色", "只做小面积收束。", "沉稳内敛/黑色包.png"),
    ], "深海蓝适合放在上装，搭配灰米色外套和黑色鞋包，会稳但不沉闷。"),
    secondary: [
      color("stable-secondary-greige", "secondary", "灰米", "#C6BBAE", "柔和稳定", "灰米能降低深海蓝的冷硬感，适合外套和下装。", "灰米搭配建议", "稳定衔接，轻一点", [
        outfit("stable-greige-outerwear", "外套", "灰米色外套", "灰米色", "让整体更有空气感。", "沉稳内敛/灰米色外套.png"),
        outfit("stable-greige-bottom", "下装", "灰米裤子", "灰米", "低调但不压人。", "沉稳内敛/灰米裤子.png"),
        outfit("stable-greige-top", "上装", "深海蓝上衣", "深海蓝", "保留沉稳主线。", "沉稳内敛/深海蓝上衣.png"),
        outfit("stable-greige-shoes", "鞋包", "黑色鞋", "黑色", "稳住脚下轮廓。", "沉稳内敛/黑色鞋.png"),
      ], "灰米适合作为辅助色，让深海蓝更好靠近，也更适合日常正式场景。"),
    ],
    accent: [
      color("stable-accent-black", "accent", "黑色", "#171411", "小面积收束", "黑色适合放在鞋包里做收束，不需要大面积压住全身。", "黑色点缀建议", "少量收束，更稳更清楚", [
        outfit("stable-black-bag", "鞋包", "黑色包", "黑色", "作为一个清楚的焦点。", "沉稳内敛/黑色包.png"),
        outfit("stable-black-shoes", "鞋包", "黑色鞋", "黑色", "保持脚下稳定。", "沉稳内敛/黑色鞋.png"),
        outfit("stable-black-top", "上装", "深海蓝上衣", "深海蓝", "比全黑更有层次。", "沉稳内敛/深海蓝上衣.png"),
      ], "黑色只放在鞋包就够了，能收住轮廓，但不会让整体变重。"),
    ],
  }),
};

function toneSource(tone: AuraTone, title: string, source: Omit<ToneSource, "title">): ToneSource {
  return { title, ...source };
}

function color(
  id: string,
  role: ColorRole,
  name: string,
  hex: string,
  shortLabel: string,
  auraReason: string,
  title: string,
  subtitle: string,
  items: OutfitItem[],
  summary: string,
): AuraColorRecommendation {
  return {
    id,
    role,
    name,
    hex,
    shortLabel,
    auraReason,
    outfitMapping: { title, subtitle, items, summary },
  };
}

function outfit(
  id: string,
  category: OutfitItem["category"],
  label: string,
  colorName: string,
  description: string,
  file: string,
): OutfitItem {
  return {
    id,
    category,
    label,
    colorName,
    description,
    imageSrc: `/reference/today-aura-outfits/${file}`,
  };
}

function stableIndex(seed: string, length: number) {
  if (length <= 1) return 0;
  const total = Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return total % length;
}

function normalizeDate(date: Date | string = new Date()) {
  if (date instanceof Date) return date.toISOString().slice(0, 10);
  return date.slice(0, 10);
}

export function resolveToneFromDesiredAura(desiredAura?: DesiredAura | ""): AuraTone {
  if (desiredAura === "温柔" || desiredAura === "知性") return "温柔知性";
  if (desiredAura === "松弛") return "松弛自然";
  if (desiredAura === "元气" || desiredAura === "被看见") return "活力明亮";
  if (desiredAura === "低调" || desiredAura === "强势") return "沉稳内敛";
  if (desiredAura === "甜酷") return "气质优雅";
  return defaultTone;
}

export function getDailyColorSet(
  date: Date | string = new Date(),
  selectedTone: AuraTone = defaultTone,
): DailyAuraColorSet {
  const dateKey = normalizeDate(date);
  const source = toneCatalog[selectedTone] ?? toneCatalog[defaultTone];
  const secondary = source.secondary[stableIndex(`${dateKey}-${selectedTone}-secondary`, source.secondary.length)];
  const accent = source.accent[stableIndex(`${dateKey}-${selectedTone}-accent`, source.accent.length)];

  return {
    id: `${selectedTone}-${dateKey}-${source.primary.id}-${secondary.id}-${accent.id}`,
    tone: selectedTone,
    date: dateKey,
    title: source.title,
    primary: source.primary,
    secondary,
    accent,
  };
}

export function toAuraColor(recommendation: AuraColorRecommendation, role: Extract<ColorRole, "primary" | "secondary" | "accent">): AuraColor {
  return {
    name: recommendation.name,
    hex: recommendation.hex,
    role,
    reason: recommendation.auraReason,
    usage: recommendation.outfitMapping.summary,
    shortLabel: recommendation.shortLabel,
    auraReason: recommendation.auraReason,
    recommendationId: recommendation.id,
    outfitMapping: recommendation.outfitMapping,
  };
}

export function getColorRecommendationsFromResult(result: {
  colorSet?: DailyAuraColorSet;
  createdAt?: string;
  input?: { desiredAura?: DesiredAura | "" };
  primaryColor: AuraColor;
  secondaryColor: AuraColor;
  accentColor: AuraColor;
}) {
  if (result.colorSet && hasOutfitImages(result.colorSet)) {
    return [result.colorSet.primary, result.colorSet.secondary, result.colorSet.accent];
  }

  if (result.colorSet || result.input?.desiredAura) {
    const colorSet = getDailyColorSet(
      result.createdAt ?? new Date(),
      result.colorSet?.tone ?? resolveToneFromDesiredAura(result.input?.desiredAura),
    );
    return [colorSet.primary, colorSet.secondary, colorSet.accent];
  }

  return [result.primaryColor, result.secondaryColor, result.accentColor]
    .filter((item) => item.outfitMapping)
    .map((item) => ({
      id: item.recommendationId ?? `${item.role}-${item.name}`,
      role: item.role,
      name: item.name,
      hex: item.hex,
      shortLabel: item.shortLabel ?? item.name,
      auraReason: item.auraReason ?? item.reason,
      outfitMapping: item.outfitMapping!,
    }));
}

function hasOutfitImages(colorSet: DailyAuraColorSet) {
  return [colorSet.primary, colorSet.secondary, colorSet.accent].some((item) => (
    item.outfitMapping.items.some((outfitItem) => outfitItem.imageSrc)
  ));
}
