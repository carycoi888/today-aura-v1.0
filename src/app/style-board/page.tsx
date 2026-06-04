import type { Metadata } from "next";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Mic,
  Palette,
  RotateCcw,
  Save,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "视觉板 Style Board | 今日气场 Today Aura",
  description: "用于确认今日气场 Today Aura 的 UI 视觉方向和交互风格。",
};

const brandColors = [
  {
    name: "奶油白",
    hex: "#F8F3EA",
    usage: "页面主背景和大面积留白",
  },
  {
    name: "柔白",
    hex: "#FFFCF7",
    usage: "卡片、分享海报底色",
  },
  {
    name: "暖雾灰",
    hex: "#EFE7DC",
    usage: "分区底色和轻分隔",
  },
  {
    name: "墨茶黑",
    hex: "#292521",
    usage: "主标题和重点文字",
  },
  {
    name: "暖灰棕",
    hex: "#5E564F",
    usage: "正文和解释文本",
  },
  {
    name: "雾灰",
    hex: "#9B9288",
    usage: "日期、提示和辅助说明",
  },
  {
    name: "米灰线",
    hex: "#E2D8CB",
    usage: "边框、分割线",
  },
  {
    name: "香槟金",
    hex: "#B99A63",
    usage: "日期、强调和主按钮细节",
  },
  {
    name: "玫瑰雾",
    hex: "#D8A7A0",
    usage: "小面积温柔提示",
  },
  {
    name: "灰蓝",
    hex: "#8EA1A8",
    usage: "冷静、正式场景辅助",
  },
  {
    name: "炭褐",
    hex: "#3C3630",
    usage: "深色按钮和压轴信息",
  },
];

const sceneTags = ["上班", "约会", "面试", "见朋友", "拍照", "旅行"];
const moodTags = ["平静", "疲惫", "焦虑", "想被看见", "想低调"];
const auraTags = ["清爽", "温柔", "利落", "松弛", "可靠", "有距离感"];
const keywords = ["雾蓝", "奶油白", "低饱和", "清爽稳定", "银色配饰"];

export default function StyleBoardPage() {
  return (
    <main className="min-h-dvh bg-[linear-gradient(180deg,#F8F3EA_0%,#EFE7DC_58%,#F8F3EA_100%)] text-[#292521]">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-12">
        <HeroBoard />

        <div className="mt-10 grid gap-7 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div className="space-y-7">
            <PaletteBoard />
            <TypographyBoard />
            <ButtonAndTagBoard />
            <MotionBoard />
          </div>

          <div className="space-y-7">
            <ColorSystemBoard />
            <ScreenGallery />
            <ResultAndShareBoard />
          </div>
        </div>
      </div>
    </main>
  );
}

function HeroBoard() {
  return (
    <section className="animate-aura-card-rise overflow-hidden rounded-[2.5rem] border border-[#E2D8CB] bg-[#FFFCF7] shadow-aura-lift">
      <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-[#E2D8CB] bg-[#F8F3EA] text-[#5E564F]" variant="outline">
                今日气场 Today Aura
              </Badge>
              <Badge className="border-[#E2D8CB] bg-[#EFE7DC] text-[#5E564F]" variant="outline">
                Style Board
              </Badge>
            </div>

            <div className="mt-10 space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#F8F3EA] px-3 py-2 text-sm text-[#7A6E62]">
                <CalendarDays className="size-4 text-[#B99A63]" aria-hidden="true" />
                6 月 2 日 · 周二
              </p>
              <h1 className="max-w-xl text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-6xl">
                每日审美日历视觉板
              </h1>
              <p className="max-w-lg text-base leading-8 text-[#5E564F] sm:text-lg">
                用于确认产品的色彩、组件、卡片和分享视觉方向。
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-[1.9rem] border border-[#E2D8CB] bg-[#F8F3EA] p-5">
            <p className="text-xs font-medium text-[#B99A63]">今日气场开场</p>
            <p className="mt-2 text-xl font-semibold leading-8">
              今天不需要用力变成别人，只需要找到适合出现的状态。
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <HeroChip label="轻奢色卡" color="#8EA7B8" />
              <HeroChip label="日历仪式感" color="#B99A63" />
              <HeroChip label="分享卡" color="#EFE7DC" />
            </div>
          </div>
        </div>

        <div className="border-t border-[#E2D8CB] bg-[#EFE7DC] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <div className="grid gap-7 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
            <PhoneFrame title="今日建议首屏">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#9B9288]">Today Aura</p>
                    <p className="mt-1 text-lg font-semibold">早安，Cary</p>
                  </div>
                  <span className="rounded-full bg-[#F8F3EA] px-3 py-1 text-xs text-[#7A6E62]">
                    周二
                  </span>
                </div>
                <div className="rounded-[1.8rem] bg-[#8EA7B8] p-5 text-[#FFFCF7] shadow-aura">
                  <p className="text-xs opacity-85">今日主色</p>
                  <h2 className="mt-2 text-5xl font-semibold">雾蓝</h2>
                  <p className="mt-4 text-sm leading-6 opacity-90">
                    适合冷静表达和清爽出现。
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <MiniInfoCard label="今日状态" value="见客户 · 微冷" />
                  <MiniInfoCard label="想要气质" value="可靠 · 清爽" />
                </div>
                <AuraButton className="w-full">
                  <Sparkles className="size-4" />
                  生成今日气场
                </AuraButton>
              </div>
            </PhoneFrame>

            <SharePoster compact />
          </div>
        </div>
      </div>
    </section>
  );
}

function PaletteBoard() {
  return (
    <BoardSection
      index="01"
      title="基础品牌色板"
      note="用于确认界面底色、文字色、强调色和每日色卡的统一气质。"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
        {brandColors.map((color) => (
          <article
            className="overflow-hidden rounded-[1.45rem] border border-[#E2D8CB] bg-[#FFFCF7] shadow-aura"
            key={color.name}
          >
            <div
              className="h-20 border-b border-black/5"
              style={{ backgroundColor: color.hex }}
              aria-hidden="true"
            />
            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold">{color.name}</p>
                <p className="font-mono text-[10px] text-[#9B9288]">{color.hex}</p>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#5E564F]">{color.usage}</p>
            </div>
          </article>
        ))}
      </div>
    </BoardSection>
  );
}

function TypographyBoard() {
  return (
    <BoardSection
      index="02"
      title="字体层级"
      note="用于确认中文阅读舒适度，结果页和分享卡片都要能快速扫读。"
    >
      <div className="space-y-3 rounded-[1.6rem] bg-[#F8F3EA] p-4">
        <TypeSpec label="超级标题 · 44/1.05" className="text-[2.7rem] font-semibold leading-[1.05]">
          清透专注
        </TypeSpec>
        <TypeSpec label="页面标题 · 30/1.15" className="text-3xl font-semibold leading-tight">
          今天想以什么状态出现？
        </TypeSpec>
        <TypeSpec label="分区标题 · 20/1.25" className="text-xl font-semibold">
          今日主色
        </TypeSpec>
        <TypeSpec label="正文 · 15/1.7" className="text-[15px] leading-7 text-[#5E564F]">
          灰蓝能降低通勤场景中的视觉噪音，让整体状态更稳定。
        </TypeSpec>
        <TypeSpec label="辅助说明 · 13/1.6" className="text-sm leading-6 text-[#9B9288]">
          6 月 2 日 · 周二 · 阴天微冷
        </TypeSpec>
        <TypeSpec label="今日短句 · 18/1.45" className="text-lg font-semibold leading-7">
          把清醒感穿在身上，慢慢来，也能很稳。
        </TypeSpec>
      </div>
    </BoardSection>
  );
}

function ButtonAndTagBoard() {
  return (
    <BoardSection
      index="03"
      title="按钮与标签"
      note="用于确认关键操作和轻量选择，不像电商购买按钮，也不像普通问卷。"
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-4 rounded-[1.85rem] bg-[#F8F3EA] p-4">
          <AuraButton className="w-full">
            <Sparkles className="size-4" />
            生成今日气场
          </AuraButton>
          <AuraButton className="w-full" tone="soft">
            <RotateCcw className="size-4" />
            重新选择
          </AuraButton>
          <AuraButton className="w-full" tone="ghost">
            查看上次结果
          </AuraButton>
          <AuraButton className="w-full" disabled>
            生成中
          </AuraButton>
          <button className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full border border-[#D7CBBB] bg-[#FFFCF7] px-6 text-sm font-medium text-[#292521] shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_10px_26px_rgba(60,54,48,0.06)] transition-colors duration-200 hover:bg-[#F8F3EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A63]/40">
            <Save className="size-4" />
            保存今日卡片
          </button>
        </div>

        <div className="space-y-4">
          <TagPanel title="场景" tags={sceneTags} selected={["见朋友"]} />
          <TagPanel title="心情" tags={moodTags} selected={["疲惫", "想低调"]} />
          <TagPanel title="想要气质" tags={auraTags} selected={["清爽", "可靠"]} />
          <div className="flex flex-wrap gap-2 rounded-[1.6rem] bg-[#F8F3EA] p-4">
            <Tag label="未选中" />
            <Tag label="已选中" selected />
            <Tag label="多选" selected multi />
            <Tag label="禁用" disabled />
          </div>
        </div>
      </div>
    </BoardSection>
  );
}

function ColorSystemBoard() {
  return (
    <BoardSection
      index="04"
      title="今日色卡系统"
      note="主色是结果页视觉中心，辅助色和点缀色必须清楚区分。"
    >
      <div className="grid gap-5 lg:grid-cols-[1.28fr_0.72fr]">
        <article className="overflow-hidden rounded-[2.25rem] border border-[#D7CBBB] bg-[#FFFCF7] shadow-aura-lift">
          <div className="relative min-h-[340px] bg-[#8EA7B8] p-6 text-[#FFFCF7]">
            <div className="flex items-start justify-between gap-4">
              <div className="rounded-full border border-white/35 bg-white/12 px-3 py-1 text-xs">
                今日主色
              </div>
              <span className="rounded-full border border-white/35 bg-white/12 px-3 py-1 font-mono text-xs">
                #8EA7B8
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-sm opacity-80">Main Color</p>
              <h3 className="mt-1 text-6xl font-semibold leading-none">雾蓝</h3>
              <div className="mt-6 h-px bg-white/35" />
              <p className="mt-4 max-w-md text-base leading-7 opacity-95">
                今天放在外套、衬衫或小包上，会比大面积亮色更稳定。
              </p>
            </div>
          </div>
        </article>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
          <ColorRoleCard
            role="辅助色"
            name="奶油白"
            hex="#F3EBDD"
            color="#F3EBDD"
            reason="适合放在上装或内搭，提亮脸周。"
          />
          <ColorRoleCard
            role="点缀色"
            name="高饱和橙"
            hex="#FF6A00"
            color="#FF6A00"
            reason="今天情绪偏紧时，大面积使用容易增加视觉压力。"
          />
        </div>
      </div>
    </BoardSection>
  );
}

function ScreenGallery() {
  return (
    <BoardSection
      index="05"
      title="关键页面片段"
      note="这里只展示高保真页面片段，不实现正式业务流程。"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <PhoneFrame title="用户档案">
          <ProfileMock />
        </PhoneFrame>
        <PhoneFrame title="今日输入">
          <DailyInputMock />
        </PhoneFrame>
        <PhoneFrame title="结果首屏">
          <ResultScreenMock />
        </PhoneFrame>
      </div>
    </BoardSection>
  );
}

function ResultAndShareBoard() {
  return (
    <BoardSection
      index="06"
      title="结果卡片与分享海报"
      note="用于确认结果页是否具体可执行，分享卡片是否像高级色卡日历。"
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.86fr]">
        <ResultDetailCard />
        <SharePoster />
      </div>
    </BoardSection>
  );
}

function MotionBoard() {
  return (
    <BoardSection
      index="07"
      title="轻量动效"
      note="动效只用于页面淡入、色卡展开、按钮反馈和结果卡片轻微上浮。"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <MotionTile title="页面淡入" note="260ms，让视觉板出现更轻。" />
        <MotionTile title="卡片淡入" note="260ms，结果卡片柔和出现。" />
        <MotionTile title="轻微上浮" note="hover 上移 2px，不循环。" lift />
        <MotionTile title="按钮状态" note="只做颜色和阴影变化，不做弹跳。" />
      </div>
    </BoardSection>
  );
}

function ProfileMock() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-[#B99A63]">我的审美档案</p>
          <h3 className="mt-1 text-2xl font-semibold leading-tight">
            干净、稳定、有一点柔和
          </h3>
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F8F3EA]">
          <Palette className="size-5 text-[#B99A63]" aria-hidden="true" />
        </div>
      </div>
      <ProfileLine title="常用风格" items={["轻熟通勤", "极简", "温柔"]} />
      <ProfileLine title="偏好颜色" items={["奶油白", "灰蓝", "浅驼"]} colors />
      <ProfileLine title="不喜欢颜色" items={["荧光绿", "高饱和紫"]} muted />
      <ProfileLine title="肤色倾向" items={["中性偏暖"]} />
      <ProfileLine title="穿搭限制" items={["需要显精神", "不能太张扬"]} />
      <button className="flex w-full items-center justify-between rounded-2xl bg-[#F8F3EA] px-4 py-3 text-sm font-medium">
        编辑档案
        <ChevronRight className="size-4 text-[#9B9288]" aria-hidden="true" />
      </button>
    </div>
  );
}

function DailyInputMock() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-[#B99A63]">选择今天的状态</p>
        <h3 className="mt-1 text-2xl font-semibold leading-tight">
          见客户 · 阴天微冷 · 有点疲惫
        </h3>
      </div>
      <InputChoice label="今日场景" value="见客户" />
      <InputChoice label="天气" value="阴天、微冷" />
      <InputChoice label="心情" value="有点疲惫" />
      <InputChoice label="精力状态" value="中低" />
      <InputChoice label="想要气质" value="可靠、清爽、不过度强势" />
      <div className="rounded-[1.35rem] bg-[#F8F3EA] p-4">
        <p className="text-xs font-medium text-[#B99A63]">今日特别诉求 · 可选</p>
        <p className="mt-2 text-sm leading-6 text-[#5E564F]">
          今天要开会，希望看起来精神一点，但不要太有攻击性。
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-dashed border-[#E2D8CB] px-3 py-2 text-xs text-[#9B9288]">
        <Mic className="size-3.5" aria-hidden="true" />
        未来可支持语音输入；MVP 0.1 不实现真实语音。
      </div>
    </div>
  );
}

function ResultScreenMock() {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[1.65rem] bg-[#8EA7B8] text-[#FFFCF7] shadow-aura">
        <div className="p-4">
          <p className="text-xs opacity-80">今日气场</p>
          <h3 className="mt-2 text-3xl font-semibold leading-tight">
            清醒感通勤气场
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-px bg-[#FFFCF7]/28">
          <ResultColor label="主色" name="雾蓝" color="#8EA7B8" />
          <ResultColor label="辅助" name="奶油白" color="#F3EBDD" />
          <ResultColor label="点缀" name="橙" color="#FF6A00" />
        </div>
      </div>
      <div className="rounded-[1.35rem] bg-[#F8F3EA] p-4">
        <p className="text-xs font-medium text-[#B99A63]">穿搭建议</p>
        <p className="mt-2 text-sm leading-6 text-[#5E564F]">
          奶油白衬衫 + 深灰垂坠西裤 + 浅灰短风衣，搭配银扣乐福鞋。
        </p>
      </div>
      <div className="rounded-[1.35rem] bg-[#3C3630] p-4 text-[#FFFCF7]">
        <p className="text-xs text-[#D8CFC2]">今日短句</p>
        <p className="mt-2 text-base font-semibold leading-6">
          慢慢来，也能很稳。
        </p>
      </div>
    </div>
  );
}

function ResultDetailCard() {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-[#E2D8CB] bg-[#FFFCF7] shadow-aura-lift">
      <div className="grid min-h-48 grid-cols-[1fr_0.9fr]">
        <div className="bg-[#8EA7B8] p-5 text-[#FFFCF7]">
          <p className="text-sm opacity-80">今日气场标题</p>
          <h3 className="mt-3 text-4xl font-semibold leading-tight">
            清醒感通勤气场
          </h3>
        </div>
        <div className="flex flex-col justify-between bg-[#F8F3EA] p-5">
          <div className="flex justify-end">
            <Badge className="border-[#E2D8CB] bg-[#FFFCF7] text-[#5E564F]" variant="outline">
              结果页核心
            </Badge>
          </div>
          <p className="text-sm leading-6 text-[#5E564F]">
            来自见客户、阴天微冷、疲惫、想可靠清爽的输入组合。
          </p>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="grid grid-cols-3 gap-2">
          <ColorMini label="主色" name="雾蓝" color="#8EA7B8" />
          <ColorMini label="辅助色" name="奶油白" color="#F3EBDD" />
          <ColorMini label="点缀色" name="高饱和橙" color="#FF6A00" />
        </div>
        <ResultBlock title="穿搭建议">
          奶油白针织或衬衫 + 深灰直筒半裙 / 垂坠西裤 + 浅灰西装或短风衣。
          鞋包可以选择银扣乐福鞋和灰蓝小包，让整体更清爽稳定。
        </ResultBlock>
        <ResultBlock title="妆容配饰">
          半哑光底妆，低饱和玫瑰豆沙唇。配饰选择银色小耳钉或细链条项链，不需要过度强调存在感。
        </ResultBlock>
        <div className="rounded-[1.45rem] bg-[#F8F3EA] p-4">
          <p className="text-xs text-[#B99A63]">今日短句</p>
          <p className="mt-2 text-lg font-semibold leading-7">
            今天把清醒感穿在身上，慢慢来，也能很稳。
          </p>
        </div>
      </div>
    </article>
  );
}

function SharePoster({ compact = false }: { compact?: boolean }) {
  return (
    <article
      className={cn(
        "mx-auto flex aspect-[3/4] w-full max-w-[360px] flex-col overflow-hidden rounded-[2.45rem] border border-[#D7CBBB] bg-[#FFFCF7] shadow-aura-lift",
        compact && "max-w-[326px]",
      )}
    >
      <div className="flex items-start justify-between gap-4 p-6 pb-4 text-xs text-[#9B9288]">
        <div className="space-y-1">
          <p className="font-semibold tracking-normal text-[#292521]">今日气场 Today Aura</p>
          <p>Daily Aesthetic Calendar</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold leading-none text-[#292521]">02</p>
          <p className="mt-1">Jun</p>
        </div>
      </div>

      <div className="flex-1">
        <div className="mx-6 rounded-[2rem] bg-[#8EA7B8] p-5 text-[#FFFCF7]">
          <p className="text-xs opacity-80">今日气场标题</p>
          <h3 className="mt-2 text-[2.35rem] font-semibold leading-tight">
            清醒感通勤气场
          </h3>
        </div>

        <div className="mx-6 mt-4 grid grid-cols-[1.4fr_0.8fr_0.8fr] gap-2">
          <ShareSwatch label="主色" name="雾蓝" color="#8EA7B8" large />
          <ShareSwatch label="辅助" name="奶油白" color="#F3EBDD" />
          <ShareSwatch label="点缀" name="橙" color="#D58A4B" />
        </div>

        <div className="mx-6 mt-5 flex flex-wrap gap-2">
          {keywords.map((item) => (
            <span
              className="rounded-full border border-[#E2D8CB] bg-[#F8F3EA] px-3 py-1 text-xs text-[#5E564F]"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="m-6 mt-5 border-t border-[#E2D8CB] pt-4">
        <p className="text-base font-semibold leading-7 text-[#5E564F]">
          今天把清醒感穿在身上，慢慢来，也能很稳。
        </p>
      </div>
    </article>
  );
}

function BoardSection({
  index,
  title,
  note,
  children,
}: {
  index: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="animate-aura-card-rise rounded-[2.15rem] border border-[#E2D8CB] bg-[#FFFCF7] p-5 shadow-aura sm:p-6">
      <div className="mb-6 flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F8F3EA] text-sm font-semibold text-[#B99A63]">
          {index}
        </span>
        <div>
          <h2 className="text-2xl font-semibold leading-tight">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#7A6E62]">{note}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function AuraButton({
  children,
  className,
  tone = "primary",
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "primary" | "soft" | "ghost";
  disabled?: boolean;
}) {
  return (
    <button
      className={cn(
        "inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A63]/40",
        tone === "primary" &&
          "bg-[#3C3630] text-[#FFFCF7] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_30px_rgba(60,54,48,0.14)] hover:bg-[#332E29]",
        tone === "soft" &&
          "border border-[#D7CBBB] bg-[#EFE7DC] text-[#292521] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_8px_22px_rgba(60,54,48,0.06)] hover:bg-[#E8DFD2]",
        tone === "ghost" &&
          "border border-transparent bg-transparent text-[#5E564F] hover:bg-[#EFE7DC]",
        disabled &&
          "cursor-not-allowed border border-[#E2D8CB] bg-[#E8DFD2] text-[#9B9288] shadow-none hover:bg-[#E8DFD2]",
        className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function PhoneFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-[320px] rounded-[2.35rem] border border-[#D7CBBB] bg-[#292521] p-2 shadow-aura-lift">
      <div className="rounded-[1.95rem] bg-[#FFFCF7] p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-medium text-[#9B9288]">{title}</span>
          <span className="h-1.5 w-14 rounded-full bg-[#E2D8CB]" />
        </div>
        {children}
      </div>
    </article>
  );
}

function HeroChip({ label, color }: { label: string; color: string }) {
  return (
    <div className="rounded-[1.25rem] border border-[#E2D8CB] bg-[#FFFCF7] p-2">
      <div className="h-8 rounded-[0.9rem]" style={{ backgroundColor: color }} />
      <p className="mt-2 text-center text-[11px] text-[#5E564F]">{label}</p>
    </div>
  );
}

function MiniInfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.15rem] bg-[#F8F3EA] p-3">
      <p className="text-[10px] text-[#9B9288]">{label}</p>
      <p className="mt-1 text-xs font-medium leading-5">{value}</p>
    </div>
  );
}

function TypeSpec({
  label,
  className,
  children,
}: {
  label: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#E2D8CB] pb-3 last:border-b-0 last:pb-0">
      <p className="mb-1 text-[11px] text-[#B99A63]">{label}</p>
      <p className={className}>{children}</p>
    </div>
  );
}

function TagPanel({
  title,
  tags,
  selected,
}: {
  title: string;
  tags: string[];
  selected: string[];
}) {
  return (
    <div className="rounded-[1.6rem] bg-[#F8F3EA] p-4">
      <p className="mb-2 text-sm font-medium">{title}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} selected={selected.includes(tag)} />
        ))}
      </div>
    </div>
  );
}

function Tag({
  label,
  selected = false,
  disabled = false,
  multi = false,
}: {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  multi?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 text-xs font-medium transition-colors duration-200",
        selected && "border-[#B99A63]/70 bg-[#F1E6D6] text-[#292521] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5),0_8px_20px_rgba(60,54,48,0.06)]",
        !selected && !disabled && "border-[#E2D8CB] bg-[#FFFCF7] text-[#5E564F]",
        disabled && "border-[#E2D8CB] bg-[#EFE7DC]/60 text-[#9B9288]",
      )}
    >
      {selected ? <span className="size-1.5 rounded-full bg-[#B99A63]" /> : null}
      {multi ? <span className="text-[#B99A63]">+</span> : null}
      {label}
    </span>
  );
}

function ColorRoleCard({
  role,
  name,
  hex,
  color,
  reason,
}: {
  role: string;
  name: string;
  hex: string;
  color: string;
  reason: string;
}) {
  return (
    <article className="overflow-hidden rounded-[1.8rem] border border-[#E2D8CB] bg-[#FFFCF7] shadow-aura">
      <div className="h-32 border-b border-black/5" style={{ backgroundColor: color }} />
      <div className="space-y-2 p-4">
        <p className="text-xs text-[#9B9288]">{role}</p>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="font-mono text-[10px] text-[#9B9288]">{hex}</p>
        <p className="text-xs leading-5 text-[#5E564F]">{reason}</p>
      </div>
    </article>
  );
}

function ProfileLine({
  title,
  items,
  muted = false,
  colors = false,
}: {
  title: string;
  items: string[];
  muted?: boolean;
  colors?: boolean;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-[#9B9288]">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            className={cn(
              "inline-flex min-h-8 items-center gap-1 rounded-full border px-3 text-[11px] font-medium",
              muted
                ? "border-[#E2D8CB] bg-[#EFE7DC] text-[#7A6E62]"
                : "border-[#E2D8CB] bg-[#F8F3EA] text-[#292521]",
            )}
            key={item}
          >
            {colors ? (
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: ["#F3EBDD", "#8EA7B8", "#C6AD8E"][index] }}
              />
            ) : null}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function InputChoice({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-[1.2rem] bg-[#F8F3EA] px-3 py-3">
      <p className="text-sm text-[#9B9288]">{label}</p>
      <p className="max-w-[62%] text-right text-sm font-medium leading-5">{value}</p>
    </div>
  );
}

function ResultColor({
  label,
  name,
  color,
}: {
  label: string;
  name: string;
  color: string;
}) {
  return (
    <div className="bg-[#FFFCF7] p-2 text-[#292521]">
      <div className="h-12 rounded-[0.9rem]" style={{ backgroundColor: color }} />
      <p className="mt-2 text-[10px] text-[#9B9288]">{label}</p>
      <p className="truncate text-xs font-medium">{name}</p>
    </div>
  );
}

function ColorMini({
  label,
  name,
  color,
}: {
  label: string;
  name: string;
  color: string;
}) {
  return (
    <div className="rounded-[1.25rem] border border-[#E2D8CB] bg-[#FFFCF7] p-2">
      <div className="h-16 rounded-[0.95rem]" style={{ backgroundColor: color }} />
      <p className="mt-2 text-[10px] text-[#9B9288]">{label}</p>
      <p className="truncate text-xs font-medium">{name}</p>
    </div>
  );
}

function ResultBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.45rem] bg-[#F8F3EA] p-4">
      <p className="text-xs font-medium text-[#B99A63]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#5E564F]">{children}</p>
    </div>
  );
}

function ShareSwatch({
  label,
  name,
  color,
  large = false,
}: {
  label: string;
  name: string;
  color: string;
  large?: boolean;
}) {
  return (
    <div>
      <div
        className={cn(
          "rounded-[1.35rem] ring-1 ring-black/5",
          large ? "h-28" : "h-24",
        )}
        style={{ backgroundColor: color }}
      />
      <p className="mt-2 text-[10px] text-[#9B9288]">{label}</p>
      <p className="truncate text-xs font-medium">{name}</p>
    </div>
  );
}

function MotionTile({
  title,
  note,
  lift = false,
}: {
  title: string;
  note: string;
  lift?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.65rem] border border-[#E2D8CB] bg-[#F8F3EA] p-4 shadow-aura transition duration-300",
        lift && "hover:-translate-y-0.5 hover:shadow-aura-lift",
      )}
    >
      <div className="flex items-center justify-between">
        <Clock3 className="size-4 text-[#B99A63]" aria-hidden="true" />
        <Badge className="border-[#E2D8CB] bg-[#FFFCF7] text-[#5E564F]" variant="outline">
          150-350ms
        </Badge>
      </div>
      <div
        className="my-4 h-20 rounded-[1.35rem] bg-[#8EA7B8]"
      />
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-[#5E564F]">{note}</p>
    </div>
  );
}
