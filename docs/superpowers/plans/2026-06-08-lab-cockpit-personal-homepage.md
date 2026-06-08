# Lab Cockpit 个人主页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `design-src/` 的 FENGZIAAA Lab Cockpit 原型 1:1 复刻为一个中英双语、全栈持久化的 Next.js 个人主页。

**Architecture:** Next.js App Router 单页沉浸式应用 + 独立 `/roadmap`。签名视觉（星空、3D 节点场、连线）手写为 `lib/cosmos/`（Canvas2D + CSS3D 混合）；通用交互（弹窗/看板/控件/Toast/表单）用 shadcn/ui + dnd-kit + Motion + Sonner。访客想法/投票存 Supabase（先审后发），GitHub 数据服务端缓存拉取。设计 token 移植进 Tailwind v4 `@theme`，内容三层分离（策展双语 / UGC / 外部缓存）。

**Tech Stack:** Next.js (App Router, TS) · Tailwind v4 · shadcn/ui · next-intl · Supabase · Motion · dnd-kit · lucide-react · Sonner · Vercel

---

## 参考与约定

- **原型源**：`design-src/personal-lab/project/lab/`（`Field.jsx` `Modules.jsx` `hud.jsx` `BoardScreen.jsx` `App.jsx` `data.js` `orbital.css` `cockpit.css`）+ `design-src/.../_ds/tokens/*.css`。移植时**匹配视觉输出**，不照搬 CDN/Babel 结构。
- **关键改写**：CDN React → ES import；全局 `lucide.createIcons()` → `lucide-react` 组件；`window.X` 挂载 → ES module export；inline style 大多保留；`var(--font-*)`/`var(--cyan)` 等 token 保留。
- **提交策略**：本仓库尚未 `git init`。Task 1 完成初始化。**每个 task 末尾的 `git commit` 需按用户工作流获得其确认后执行**——执行阶段先问用户是否授权自动 commit。
- **验证基准**：视觉组件以「`npm run dev` 浏览器比对原型」为验收；纯逻辑（projection / API / 投票去重 / i18n 解析）写单测（Vitest）。
- **包管理器**：pnpm。

---

## Phase 0 — 脚手架与设计系统

### Task 1: 初始化 Next.js + 工具链

**Files:**
- Create: 整个 Next.js 骨架、`.gitignore`、`package.json`

- [ ] **Step 1: 脚手架**

Run（在 `/Users/fengzi/code/personal-lab`，注意已有 `design-src/` 与 `docs/`，用 `.` 安装到当前目录）:
```bash
pnpm dlx create-next-app@latest . --ts --app --tailwind --eslint --src-dir=false --import-alias "@/*" --use-pnpm --no-turbopack
```
若提示目录非空，保留 `design-src/` `docs/`，允许写入其余文件。

- [ ] **Step 2: 装依赖**

```bash
pnpm add next-intl @supabase/supabase-js motion lucide-react sonner @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 3: 初始化 git 并首次提交**

```bash
git init && git add -A && git commit -m "chore: scaffold next.js app with toolchain"
```

- [ ] **Step 4: 配置 Vitest**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true, setupFiles: ['./vitest.setup.ts'] },
  resolve: { alias: { '@': new URL('.', import.meta.url).pathname } },
})
```
Create `vitest.setup.ts`:
```ts
import '@testing-library/jest-dom/vitest'
```
Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 5: 验证**

Run: `pnpm test` → Expected: "No test files found"（退出码 0 即可）。`pnpm dev` 能起。

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: add vitest"
```

### Task 2: 移植设计系统 token + 字体 + 霓虹面板类

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Reference: `design-src/.../_ds/tokens/{colors,effects,typography,spacing,base}.css`

- [ ] **Step 1: 写 globals.css**

把 `colors.css` / `effects.css` / `spacing.css` / `typography.css` 的 `:root` 变量整段搬进 `app/globals.css` 的 `:root`（保留变量名，如 `--void --cyan --magenta --node-ai --glow-cyan --ease-hud --font-display` 等）。再追加 `base.css` 的 body 网格背景、`.fz-scanlines`、`.fz-wordmark`、`.fz-label`、`.fz-dot`、`.fz-scroll`、**`.fz-panel`**（切角 + inset 霓虹描边）、effects 的 keyframes（`fz-pulse/blink/spin/scan/flicker`）。Tailwind v4 用 `@import "tailwindcss";` 置顶。

- [ ] **Step 2: 字体**

`app/layout.tsx` 用 `next/font/google` 引 `Orbitron`(500/700/900)、`Chakra_Petch`(400/500/600/700)、`Share_Tech_Mono`(400)，分别赋给 CSS 变量 `--font-display` `--font-techno` `--font-mono`（用 `variable` 选项 + 在 `<html className>` 挂上）。body 背景设为 `var(--void)`，`overflow: hidden`。

- [ ] **Step 3: 验证**

`pnpm dev`，临时在 `app/page.tsx` 放一个 `<div className="fz-panel" style={{padding:20}}>` + `<span className="fz-wordmark">FENGZIAAA</span>`，浏览器确认：深空网格背景、霓虹切角面板、Orbitron 字标带辉光。

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: port design system tokens, fonts, neon panel"
```

### Task 3: 初始化 shadcn/ui

**Files:** Create: `components.json`, `components/ui/*`

- [ ] **Step 1:** `pnpm dlx shadcn@latest init`（选 New York / 已有 Tailwind / CSS variables yes）。
- [ ] **Step 2:** 装本计划要用的基元：`pnpm dlx shadcn@latest add dialog button switch slider tabs select input textarea sonner`。
- [ ] **Step 3:** 验证 `components/ui/dialog.tsx` 等已生成；`pnpm build` 通过。
- [ ] **Step 4: Commit** `git add -A && git commit -m "chore: init shadcn/ui"`

---

## Phase 1 — 内容层与 HUD 基元

### Task 4: 策展内容 + i18n key 化

**Files:**
- Create: `content/ideas.ts` `content/modules.ts` `content/telemetry.ts`
- Create: `messages/zh.json` `messages/en.json`
- Reference: `design-src/.../lab/data.js`

- [ ] **Step 1: 类型 + 数据**

`content/ideas.ts` 定义 `IdeaNode` 类型（`id, cat, tone, hex, progress, stars, updated, lang, commits, issues, sub: {l,href}[]` + i18n key `titleKey/descKey/blurbKey`）并从 `data.js` 的 `nodes` 搬数据；`modules.ts` 同理（`ModuleNode`：`id, icon, tone, hex` + key）；`telemetry.ts` 搬 `console/consoleStream/quick/mission/board` 等结构数据（文案 key 化）。

- [ ] **Step 2: 双语字典**

`messages/zh.json` 写中文文案（idea 标题/描述/blurb、模块标题/描述、UI 标签：`nav.cockpit/nav.roadmap`、`submit.cta`、`tweaks.*`、`board.columns.*` 等）；`messages/en.json` 用 `data.js` 原英文。键名与 content 里的 key 对应。

- [ ] **Step 3: 验证**

写 `content/ideas.test.ts`：断言每个 idea 的 `titleKey` 在 `zh.json`/`en.json` 都存在。
```ts
import zh from '@/messages/zh.json'
import en from '@/messages/en.json'
import { ideas } from './ideas'
import { get } from '@/lib/i18n-get' // 简单点路径取值
test('every idea key resolves in both locales', () => {
  for (const n of ideas) for (const k of [n.titleKey, n.descKey, n.blurbKey]) {
    expect(get(zh, k)).toBeTruthy(); expect(get(en, k)).toBeTruthy()
  }
})
```
先建最小 `lib/i18n-get.ts`：`export const get = (o,p)=>p.split('.').reduce((a,k)=>a?.[k],o)`。Run `pnpm test` → PASS。

- [ ] **Step 4: Commit** `git commit -am "feat: curated content + bilingual dictionaries"`

### Task 5: next-intl 接线 + 语言切换

**Files:**
- Create: `i18n/request.ts` `i18n/locale.ts`（cookie 读写）`components/LocaleToggle.tsx`
- Modify: `app/layout.tsx` `next.config.ts`

- [ ] **Step 1:** 按 next-intl「without i18n routing」配置：`createNextIntlPlugin` 包 `next.config.ts`；`i18n/request.ts` 从 cookie 读 locale（默认 `zh`）加载 `messages/{locale}.json`。
- [ ] **Step 2:** `layout.tsx` 包 `NextIntlClientProvider`；`LocaleToggle` 是 client 组件，点击写 cookie（`zh`↔`en`）并 `location.reload()`（或 router.refresh）。
- [ ] **Step 3: 验证** 临时在 page 放 `useTranslations` 取 `nav.cockpit`，切换语言确认中英变化、刷新后保持。
- [ ] **Step 4: Commit** `git commit -am "feat: next-intl bilingual with locale toggle"`

### Task 6: HUD 基元组件（手写薄封装）

**Files:**
- Create: `components/hud/NeonPanel.tsx` `NeonButton.tsx` `StatusPill.tsx` `Tag.tsx` `ProgressBar.tsx` `StatItem.tsx` `RadialGauge.tsx` `Waveform.tsx` `Equalizer.tsx` `ConsoleLog.tsx` `QuickTile.tsx`
- Reference: `design-src/.../lab/hud.jsx`（这些组件的源）

- [ ] **Step 1:** 把 `hud.jsx` 里每个函数移植为单独 TS 组件文件：`Panel`→`NeonPanel`，`NeonButton/StatusPill/Tag/ProgressBar/StatItem/RadialGauge/Waveform/ConsoleLog/QuickTile` 原样移植。改写点：`<Icon n=.../>` 内部用 `lucide-react`（见 Step 2）；props 加 TS 类型；保留 inline style 与 token。
- [ ] **Step 2: Icon 适配**

Create `components/hud/Icon.tsx`：用 `lucide-react` 动态取图标。
```tsx
import * as icons from 'lucide-react'
const toPascal = (n:string)=>n.replace(/(^|-)([a-z])/g,(_,__,c)=>c.toUpperCase())
export function Icon({ n, size=16, color, ...rest }:{n:string;size?:number;color?:string;style?:React.CSSProperties}) {
  const C = (icons as any)[toPascal(n)] ?? icons.Circle
  return <C width={size} height={size} color={color} {...rest} />
}
```
其余组件改用 `<Icon n="rocket" .../>`。

- [ ] **Step 3: 验证** 临时 page 渲染 `RadialGauge value={63}`、`Waveform`、`NeonButton`、`Equalizer`，比对原型动效（脉冲/均衡器/雷达环）。
- [ ] **Step 4: Commit** `git commit -am "feat: HUD primitive components"`

---

## Phase 2 — 宇宙场（签名视觉，手写）

### Task 7: 投影纯函数（TDD）

**Files:**
- Create: `lib/cosmos/projection.ts` `lib/cosmos/projection.test.ts`
- Reference: `Field.jsx` 的 `project()` / `pts` / `mpts` / `subs` 计算

- [ ] **Step 1: 写失败测试**

```ts
import { fibonacciSphere, project } from './projection'
test('fibonacciSphere returns N points on radius R band', () => {
  const pts = fibonacciSphere(9, 620)
  expect(pts).toHaveLength(9)
  for (const p of pts) expect(Math.hypot(p.x, p.z)).toBeLessThanOrEqual(621)
})
test('project maps origin-depth to t in [0,1]', () => {
  const r = project({x:0,y:0,z:0}, { ry:0, rx:0, W:1000, H:800, R:620, P:2200 })
  expect(r.t).toBeGreaterThanOrEqual(0); expect(r.t).toBeLessThanOrEqual(1)
  expect(r.sx).toBeCloseTo(500)
})
```

- [ ] **Step 2: Run** `pnpm test projection` → FAIL（模块不存在）。
- [ ] **Step 3: 实现**

把 `Field.jsx` 的几何抽成纯函数：`fibonacciSphere(n, R, opts)` 返回 `{x,y,z}[]`（含原型的 `y*0.6` 压扁、模块用 `R*0.72`/`y*0.55`/`theta+0.9` 的变体作参数）；`project(p, {ry,rx,W,H,R,P})` 复刻原 `project`（含 hub `hubY=0.52*H`、`f=P/(P-z2)`、`t=(z2+R)/(2R)`）。
- [ ] **Step 4: Run** `pnpm test projection` → PASS。
- [ ] **Step 5: Commit** `git commit -am "feat: cosmos projection pure functions with tests"`

### Task 8: 星空 Canvas

**Files:** Create `lib/cosmos/Starfield.tsx`；Reference `Field.jsx` 的 `Starfield`。

- [ ] **Step 1:** 移植 `Starfield`（Canvas2D 粒子，z 推进 + 闪烁 + 调色板），props `count`，`prefers-reduced-motion` 时降为静态星点。client component（`'use client'`）。
- [ ] **Step 2: 验证** page 全屏放 `<Starfield count={240}/>`，确认粒子前推动画。
- [ ] **Step 3: Commit** `git commit -am "feat: starfield canvas"`

### Task 9: 3D 节点场 + 连线

**Files:**
- Create: `lib/cosmos/Field.tsx`、`lib/cosmos/IdeaCard.tsx`、`lib/cosmos/ModuleNode.tsx`、`lib/cosmos/SubChip.tsx`
- Create: `app/cosmos.css`（移植 `orbital.css` + `cockpit.css` 中宇宙相关类）
- Reference: `Field.jsx` 全量 + `orbital.css`/`cockpit.css` 的 `.fz-field/.fz-system/.fz-cardpos/.fz-card*/.fz-mod*/.fz-sub*/.fz-center-id/.fz-map-hint`

- [ ] **Step 1: 移植 CSS** 把 `orbital.css` 全量 + `cockpit.css` 里 `.fz-mod* .fz-modpos .fz-center-* .fz-map-hint .hud-* .nav-btn` 等宇宙/HUD 类搬进 `app/cosmos.css`，`@import` 到 globals 或在 layout 引入。
- [ ] **Step 2: 拆卡片组件** `IdeaCard`（`.fz-card` 内容：cat/stage/title/desc/meta/bar/foot，文案用 `useTranslations` 按 key 取）、`ModuleNode`（`.fz-mod`）、`SubChip`（`.fz-sub`）。
- [ ] **Step 3: 移植 Field** 用 Task7 的 `projection.ts` 替换内联数学；保留每帧 `requestAnimationFrame`：连线 Canvas 绘制（枢纽↔卡/子链接/模块虚线 + 流动光点 + hub 辉光）、卡片深度样式（opacity/blur/z-index/pointerEvents）、拖拽旋转 + 漂移（`drift` prop）+ 点击（位移>6 判拖拽）。`onSelect(id, origin)` 回调上抛。Reduced-motion 关漂移。
- [ ] **Step 4: 验证** 首页放 `<Starfield/>` + `<Field nodes modules onSelect=.../>`，比对原型：节点球面分布、连线流光、拖拽旋转、hover 高亮、点击回调打印。
- [ ] **Step 5: Commit** `git commit -am "feat: 3D cosmos field with connection canvas"`

### Task 10: 首页组装（静态数据跑通）

**Files:** Modify `app/page.tsx`；Create `components/CosmosScreen.tsx`（client）、`components/HudBar.tsx`

- [ ] **Step 1:** `CosmosScreen` 组合 Starfield + Field + 中心字标（`.fz-center-id`）+ 右上状态条/nav（`HudBar`：Ideas·Modules 计数 + Cockpit/Roadmap 切换 + `LocaleToggle`）+ 底部「提交想法」按钮 + `.fz-map-hint`。`sel` 状态先只 console。
- [ ] **Step 2:** `app/page.tsx`（server）传入 content 的 ideas/modules（此阶段静态）。scale-to-fit 容器（基准 1600×1150，resize 监听）。
- [ ] **Step 3: 验证** 浏览器整体比对原型首页静态态 + 中英切换文案生效。
- [ ] **Step 4: Commit** `git commit -am "feat: cosmos home screen assembled"`

---

## Phase 3 — 覆盖层（Dialog + Motion）

### Task 11: idea 飞卡详情

**Files:** Create `components/overlays/FlyCard.tsx`；Reference `App.jsx` 的 `FlyCard` + `orbital.css` 的 `.fz-fly-*`。

- [ ] **Step 1:** 用 shadcn `Dialog` 作 scrim/焦点管理；内容移植 `FlyCard`（cat/title/blurb/stats/进度条/子链接/按钮），文案 i18n。用 **Motion** 复刻「从 origin 缩放飞入」（`initial`/`animate`，reduced-motion 跳过）。
- [ ] **Step 2:** 接到 `CosmosScreen`：点击 idea 节点 → 打开对应 FlyCard。
- [ ] **Step 3: 验证** 点卡片，详情飞入 + Esc/点遮罩关闭。
- [ ] **Step 4: Commit** `git commit -am "feat: idea fly-card detail overlay"`

### Task 12: 模块详情面板（6 种）

**Files:** Create `components/overlays/ModuleDetail.tsx` + `components/overlays/bodies/{GithubBody,ConsoleBody,MissionBody,VisitorBody,QuickBody,TelemetryBody}.tsx`；Reference `Modules.jsx`。

- [ ] **Step 1:** 移植 `ModuleDetail` 外壳（Dialog + Motion scale-in + per-module 宽度 `MOD_WIDTH`）。
- [ ] **Step 2:** 移植 6 个 body：`GithubBody`（此阶段用 content mock，Task 20 接真实）、`ConsoleBody`（滚动日志 `useConsole`）、`MissionBody`（RadialGauge + Waveform）、`VisitorBody`（此阶段 mock 列表，Task 19 接真实）、`QuickBody`（QuickTile 网格）、`TelemetryBody`（三条波形/均衡器）。`useClock/useConsole` 用 `useEffect` + 真实 `new Date()`（非原型固定值）。
- [ ] **Step 3:** 接 `CosmosScreen`：点模块节点 → 对应 ModuleDetail。
- [ ] **Step 4: 验证** 逐个模块点开，动效/内容比对原型。
- [ ] **Step 5: Commit** `git commit -am "feat: module detail overlays"`

### Task 13: 提交想法弹窗 + Toast

**Files:** Create `components/overlays/SubmitModal.tsx`；Modify `app/layout.tsx`（挂 Sonner `<Toaster/>`）；Reference `App.jsx` 的 `SubmitModal`。

- [ ] **Step 1:** 移植表单（title/desc/category chips），用 shadcn `Input/Textarea` + 分类 chip；提交此阶段仅 `toast.success(...)`（Task 18 接 API）。
- [ ] **Step 2:** 底部「提交想法」按钮 + VisitorBody 内按钮都打开它。
- [ ] **Step 3: 验证** 打开/填写/提交弹 Toast。
- [ ] **Step 4: Commit** `git commit -am "feat: submit idea modal + sonner toast"`

---

## Phase 4 — Roadmap 看板

### Task 14: 看板（dnd-kit）

**Files:** Create `app/roadmap/page.tsx` `components/board/Board.tsx` `BoardColumn.tsx` `BoardCard.tsx`；Reference `BoardScreen.jsx`。

- [ ] **Step 1:** 移植四列（Backlog/Exploring/Building/Shipped）+ 卡片（orb/title/tag/note/进度/票数/Advance），样式用 `.fz-panel`。
- [ ] **Step 2:** 拖拽用 **dnd-kit**（`DndContext` + 列为 droppable + 卡为 draggable）替代原生 DnD：拖到列改 `stage`，`shipped` 置进度 100；`Advance` 进下一列。看板头部统计 + New Idea（开 SubmitModal）。
- [ ] **Step 3:** 顶部 nav 在 Cockpit/Roadmap 间切换（`/` ↔ `/roadmap`）。
- [ ] **Step 4: 验证** 拖拽跨列、Advance、计数更新。
- [ ] **Step 5: Commit** `git commit -am "feat: roadmap kanban with dnd-kit"`

---

## Phase 5 — Tweaks 面板

### Task 15: Tweaks（shadcn 控件）

**Files:** Create `components/tweaks/TweaksPanel.tsx`；Modify `CosmosScreen.tsx`（消费 tweak 状态）。

- [ ] **Step 1:** 浮动面板（右下，可不拖拽——原型那套 host 协议**不要**，YAGNI）。控件用 shadcn：Accent 颜色（4 色 swatch 按钮）、Star field（`Tabs` 三档 sparse/medium/dense）、Idle drift（`Switch`）、Scanlines（`Switch`）。状态用 `useState`（无需持久化）。
- [ ] **Step 2:** 把 `accent` 作 `--accent` 注入根节点；`stars`→Starfield count；`drift`→Field；`scanlines`→`.fz-scanlines` 层。
- [ ] **Step 3: 验证** 改每个 tweak 实时生效。
- [ ] **Step 4: Commit** `git commit -am "feat: tweaks panel"`

---

## Phase 6 — 后端（Supabase + API + 真实 GitHub）

### Task 16: Supabase schema + client

**Files:** Create `supabase/schema.sql` `lib/supabase/server.ts` `lib/supabase/client.ts` `.env.local`（不提交）`.env.example`

- [ ] **Step 1: schema**（用 Supabase MCP `apply_migration` 或 dashboard 执行 spec §8 的 `ideas`/`votes` 建表 + 唯一约束 + RLS：匿名 select 仅 `status='approved'`）。
- [ ] **Step 2:** `server.ts` 用 service role key（仅服务端）；`client.ts` 用 anon key。`.env.example` 列 spec §14 变量。
- [ ] **Step 3: 验证** 一个临时 server action 查 `ideas` 返回 `[]` 无报错。
- [ ] **Step 4: Commit** `git commit -am "feat: supabase schema and clients"`（确认 `.env.local` 已 gitignore）

### Task 17: 想法列表 + 投票去重（TDD 逻辑层）

**Files:** Create `lib/ideas/voterKey.ts` `lib/ideas/voterKey.test.ts` `lib/ideas/repo.ts`

- [ ] **Step 1: 写失败测试**
```ts
import { voterKey } from './voterKey'
test('voterKey is stable for same ip+ua+cookie', () => {
  const a = voterKey({ ip:'1.2.3.4', ua:'x', anon:'abc' })
  const b = voterKey({ ip:'1.2.3.4', ua:'x', anon:'abc' })
  expect(a).toBe(b); expect(a).toHaveLength(64) // sha256 hex
})
test('voterKey differs by anon cookie', () => {
  expect(voterKey({ip:'1.2.3.4',ua:'x',anon:'a'})).not.toBe(voterKey({ip:'1.2.3.4',ua:'x',anon:'b'}))
})
```
- [ ] **Step 2: Run** `pnpm test voterKey` → FAIL。
- [ ] **Step 3: 实现** `voterKey` 用 `node:crypto` sha256(`ip|ua|anon`) hex。`repo.ts`：`listApproved()`（join 票数、按票数 desc）、`insertPending(input)`、`addVote(ideaId, key)`（唯一冲突吞掉返回当前票数）。
- [ ] **Step 4: Run** PASS。
- [ ] **Step 5: Commit** `git commit -am "feat: voter dedup key + ideas repo"`

### Task 18: API 路由 + 接提交

**Files:** Create `app/api/ideas/route.ts` `app/api/ideas/[id]/vote/route.ts`；Modify `SubmitModal.tsx`

- [ ] **Step 1:** `GET /api/ideas`→`listApproved`；`POST`→校验（title 必填、长度上限）+ 基础限流（按 IP，内存或 Supabase 计数）+ `insertPending`。`POST /api/ideas/[id]/vote`→读/写 anon cookie、算 `voterKey`、`addVote`、返回票数。
- [ ] **Step 2:** `SubmitModal` 提交改调 `POST /api/ideas`，成功 toast「已提交，待审核」。
- [ ] **Step 3: 验证** 提交一条 → Supabase 出现 `pending` 行；`GET /api/ideas` 不含它。
- [ ] **Step 4: Commit** `git commit -am "feat: ideas + vote api, wire submit"`

### Task 19: VisitorBody 接真实数据 + 投票

**Files:** Modify `components/overlays/bodies/VisitorBody.tsx`；`app/page.tsx`

- [ ] **Step 1:** `app/page.tsx`（server）调 `listApproved()` 传入；`VisitorBody` 渲染真实列表，投票按钮调 vote API 并乐观更新。
- [ ] **Step 2: 验证** 在 Supabase 手动把一条置 `approved` → 列表出现 → 投票 +1 → 刷新仍在；重复投票不叠加。
- [ ] **Step 3: Commit** `git commit -am "feat: live visitor ideas with voting"`

### Task 20: 真实 GitHub + GithubBody

**Files:** Create `lib/github.ts`；Modify `app/page.tsx` `GithubBody.tsx`

- [ ] **Step 1:** `lib/github.ts`：服务端 `fetch` `/users/{handle}`、`/repos`、`/events/public`，`next:{revalidate:1800}`，可选 `GITHUB_TOKEN`；映射成 profile + stats + 活动流；失败回退精简展示。
- [ ] **Step 2:** server 拉数据传入 `GithubBody`，替换 mock。
- [ ] **Step 3: 验证** GitHub 卡显示真实 handle/repos/活动；断网/限流时降级不崩。
- [ ] **Step 4: Commit** `git commit -am "feat: real github data server-side cached"`

### Task 21: 极简 admin 审核（可砍项）

**Files:** Create `app/admin/page.tsx` `app/api/admin/ideas/route.ts` `lib/admin/auth.ts`

> 若用户选择「纯 Supabase 后台审」，跳过本 task。

- [ ] **Step 1:** `auth.ts` 校验 `ADMIN_SECRET`（cookie 或 header）。`app/api/admin/ideas`：GET 列 `pending`、POST `{id, action:'approve'|'reject'}` 改 status，均 gated。
- [ ] **Step 2:** `/admin` 输入 secret → 待审表格（shadcn）+ 通过/拒绝按钮。
- [ ] **Step 3: 验证** 提交→/admin 通过→进访客列表。
- [ ] **Step 4: Commit** `git commit -am "feat: minimal admin moderation"`

---

## Phase 7 — 打磨与部署

### Task 22: 响应式 / reduced-motion / 空错状态

**Files:** 跨组件微调

- [ ] **Step 1:** 校验 scale-to-fit 到笔记本（1280×800）首页与看板可用；`prefers-reduced-motion` 全局降级（漂移/飞入/进场/星空）。
- [ ] **Step 2:** 空状态（无访客想法）、错误态（API 失败 toast）、加载态。
- [ ] **Step 3: 验证** 缩放窗口 + 开 reduced-motion 媒体模拟逐项过。
- [ ] **Step 4: Commit** `git commit -am "polish: responsive, reduced-motion, empty/error states"`

### Task 23: 部署 Vercel

- [ ] **Step 1:** `pnpm build` 本地通过。
- [ ] **Step 2:** Vercel 项目 + 配 env（Supabase / GITHUB_HANDLE / 可选 TOKEN / ADMIN_SECRET）。
- [ ] **Step 3:** 部署，线上冒烟：首页、切语言、提交、（审核后）投票、GitHub 卡、看板。
- [ ] **Step 4: Commit/Tag** `git commit -am "chore: deploy config"`

---

## Self-Review（作者自检结果）

**Spec 覆盖**：§2 技术栈→Task1-3；§3 内容分层→Task4/19/20；§5 token→Task2；§6 组件→Task6/9/11-15；§7 宇宙场→Task7-10；§8 数据模型→Task16；§9 API→Task18；§10 i18n→Task5；§11 admin→Task21；§12 GitHub→Task20；§13 响应式/a11y→Task9(reduced-motion)/22；§14 env→Task16/23；§15 里程碑→Phase0-7；§16 验收→Task22-23 冒烟；§17 YAGNI→Task15 明确不移植 host 协议；§18 风险→Task7 抽纯函数 / Task20 降级。无遗漏。

**Placeholder 扫描**：移植类 task 以「Reference 源文件 + 具体改写点」给出可执行指令（源码在仓库内），非空泛 TBD；新逻辑（projection/voterKey/i18n 校验/API）含真实测试与实现要点。

**类型一致**：`onSelect(id, origin)`、`IdeaNode/ModuleNode`、`voterKey({ip,ua,anon})`、`listApproved/insertPending/addVote` 跨 task 命名一致。
