---
name: today-aura-ui-ux
description: Use this repo-scoped skill for Today Aura UI/UX, visual systems, style boards, frontend page generation, homepage, profile page, daily input page, result page, share card page, page aesthetic refinement, interaction design, mobile experience, female-oriented visual direction, color card display, card layout, premium page feel, Xiaohongshu-style share aesthetics, and any request mentioning 视觉板, UI, UX, 交互, 页面高级感, 小红书审美, or 分享卡片.
---

# Today Aura UI/UX Skill

Use this skill whenever designing or modifying UI, UX, interaction flows, visual systems, frontend pages, mobile layouts, color-card presentation, result pages, or share-card experiences for 「今日气场 Today Aura」.

All user-facing copy should default to Chinese. Keep all UI decisions aligned with the project documents and `AGENTS.md`.

## 1. 产品气质

今日气场不是普通穿搭工具，不是电商导购页，也不是塔罗占卜工具。

它是「每日审美决策助手」。视觉应该像「每日审美日历」：每天打开一次，快速确认今天如何出现。

Core feelings to create:

- 我今天知道怎么穿了。
- 这个建议懂我今天的状态。
- 这张卡片我愿意保存或分享。

Design must reduce dressing anxiety and help the user make a concrete daily image decision. Do not design around shopping, fortune telling, body analysis, or complex wardrobe management.

## 2. UI 总方向

Overall direction:

轻奢色卡 + 日历仪式感 + 小红书分享卡

Visual keywords:

- 奶油白。
- 雾面质感。
- 低饱和色。
- 留白。
- 圆角卡片。
- 轻阴影。
- 色卡。
- 日历感。
- 气场卡片。
- 温柔但不甜腻。
- 高级但不冷淡。

The interface should feel calm, polished, and usable in the morning on a phone. It should have a refined editorial-card feeling, but the flow must remain direct and practical.

## 3. 禁止方向

Do not make the product look like:

- 廉价大面积粉色。
- 塔罗、占卜、水晶球、神秘紫玄学风。
- 淘宝导购页、商品堆叠页。
- 男性效率工具风。
- 过度渐变、过度玻璃拟态。
- 满屏装饰图标。
- 低龄手账贴纸风。
- 普通问卷表单。
- 普通后台管理系统。

If a design starts to look like shopping, mysticism, a generic SaaS dashboard, or a basic survey, revise the visual hierarchy, copy, and component treatment.

## 4. 组件原则

Preferred implementation approach:

- Use shadcn/ui as the main component design style when available.
- Follow Radix UI accessibility interaction principles.
- Use Tailwind CSS for styling.
- Use Motion or Framer Motion only for light, purposeful animation.

Priority components:

- Card.
- Button.
- Badge.
- Toggle.
- Tabs.
- Drawer.
- Dialog.
- Toast.
- Skeleton.
- Form.
- Select.

Do not introduce heavy dependencies for visual polish. If shadcn/ui can solve the need, do not add another large UI library.

Component guidance:

- Cards should group one decision unit, not become nested decorative containers.
- Buttons should make the next action obvious without looking like e-commerce purchase buttons.
- Badges and toggles are useful for style, mood, weather, and aura choices.
- Drawers and dialogs should support quick mobile decisions, not hide critical steps.
- Skeletons should feel soft and calm during result generation.

## 5. 动效原则

Motion should be restrained and ritual-like, never flashy.

Allowed:

- 页面淡入。
- 卡片轻微上浮。
- 色卡轻微展开。
- 结果生成时的柔和过渡。
- 按钮点击反馈。

Forbidden:

- 粒子动画。
- 大幅旋转。
- 过度弹跳。
- 闪光炫彩。
- 影响阅读的动画。

Recommended duration: 150ms - 350ms.

Motion should help the user feel that a result is being composed, not distract from reading the recommendation.

## 6. 页面设计原则

### 首页

- First viewport must directly enter the 今日气场 flow.
- Show date, short opening copy, profile summary, generate button, and recent result entry.
- Do not include long brand stories.
- Avoid marketing landing-page structure.
- The main action should be obvious within the first screen.

### 用户档案页

- Reduce filling pressure.
- Use capsule tags, grouped cards, and light progress cues.
- Do not use complex tables.
- Keep fields close to MVP: style preference, common scenes, frequently worn colors, avoided colors, and desired daily aura.
- Make completion feel like setting a style baseline, not answering a formal questionnaire.

### 今日输入页

- It should feel like「选择今天的状态」.
- Group inputs into:
  - 场景。
  - 天气。
  - 心情。
  - 想要气质。
- Selected states must be clear but not harsh.
- Mobile interaction should be tap-first, with low text entry burden.
- Avoid long forms and generic survey styling.

### 结果页

This is the most important page.

Information hierarchy:

1. 气场标题。
2. 主色。
3. 辅助色 / 规避色。
4. 颜色解释。
5. 穿搭建议。
6. 妆容配饰。
7. 今日短句。
8. 分享卡片。
9. 保存 / 重新生成。

The primary color should become the visual center. The user should understand the recommendation at a glance before reading details.

### 分享卡片

- Designed for saving and sharing to 小红书 / 朋友圈.
- Recommended ratio: 3:4 or 9:16.
- Must include:
  - 产品名。
  - 日期。
  - 气场标题。
  - 主色。
  - 辅助色。
  - 规避色。
  - 穿搭关键词。
  - 今日短句。
- Do not include long explanations.
- Card should feel like a polished daily color memo, not a report screenshot.

## 7. UI 设计自查

After generating or modifying any UI, check:

- 是否移动端优先？
- 是否降低了用户选择成本？
- 是否能帮助用户完成「今天怎么出现」的决策？
- 是否有保存 / 分享价值？
- 是否过于粉、过于玄学、过于电商、过于工具站？
- 色彩、字号、留白、圆角、按钮状态是否统一？
- 主色、辅助色、规避色是否清楚可辨？
- 页面是否能在早晨 1-3 分钟内完成使用？

If any answer is weak, revise before delivering.

