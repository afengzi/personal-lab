# Lab Cockpit 个人主页 — 设计文档

_2026-06-08 · 状态：待 review_

## 1. 目标

把 Claude Design 导出的 **FENGZIAAA · Lab Cockpit** 原型（一套赛博朋克「实验室座舱」个人主页）用现代技术栈 **1:1 复刻**，并在此基础上：

- **中英双语**，右上角一键切换，cookie 记忆，zh 默认。
- **全栈持久化**：访客提交的想法 + 投票真正存下来、所有人可见（先审后发）。
- **真实 GitHub 数据**：profile / repos / 活动流由服务端拉取并缓存。

原型来源：`design-src/personal-lab/`（README + 聊天记录 + 完整 React/CSS + 设计系统 token）。实现以「匹配视觉输出」为准，不照搬原型内部结构。

## 2. 技术栈与关键决策

| 维度 | 选型 | 理由 |
|---|---|---|
| 框架 | **Next.js (App Router)** | 全栈一体，API Route + 服务端 GitHub 拉取 + Vercel 部署 |
| 样式/组件库 | **Tailwind v4 + shadcn/ui**（Radix 内核） | 脚手架 + a11y 通用基元，最大化少手写；token 进 `@theme` |
| i18n | **next-intl** | App Router 事实标准；cookie 记忆、**不分路由**（沉浸式应用） |
| 数据库 | **Supabase (Postgres)** | 托管 Postgres，Next 集成顺，省后端样板 |
| 3D 宇宙场 | **混合 CSS3D + Canvas 2D**（不用 three.js） | 卡片是真 DOM（霓虹 CSS/可访问/可点击全保留）；three.js 反而要写更多自定义代码 |
| 动画 | **Motion (Framer Motion)** | 飞入/进场，替代手写 `element.animate` |
| 拖拽 | **dnd-kit** | 看板拖拽，避开原生 HTML5 DnD 的坑 |
| 图标 | **lucide-react** | 正是原设计的图标集 |
| Toast | **Sonner** | shadcn 生态自带 |
| 部署 | **Vercel** | — |

**少手写的边界（明确预期）**：签名视觉必须手写 —— ① 星空 Canvas，② 3D 节点场 + 连线 Canvas，③ 霓虹切角面板的几个 CSS 类 + 雷达仪表/波形/均衡器 SVG。其余（弹窗、看板拖拽、控件、Toast、表单、i18n、CRUD）全部交给库。

## 3. 内容来源分层（低耦合）

数据单向流：**DB / GitHub → server → client（只读 props）**。三类内容严格分开：

1. **策展内容（你的作品集，静态、双语）**：9 个项目 idea、6 个系统模块、控制台/遥测/快捷入口的 mock 文案。放 `content/`，走 i18n 字典，中英双份。
2. **访客内容（UGC，持久化、不翻译）**：访客提交的想法 + 投票。存 Supabase，原样展示。
3. **外部数据（真实、缓存）**：GitHub profile/repos/活动。服务端 `fetch` + `revalidate`，不进库、不暴露 token。

## 4. 目录结构（拟）

```
app/
  layout.tsx                # 字体、全局样式、NextIntl provider、Sonner
  page.tsx                  # 宇宙首页（server：拉 GitHub + 已通过的访客想法）
  roadmap/page.tsx          # 看板（独立路由，URL 可分享；顶部 nav 切换）
  admin/page.tsx            # 极简审核页（env secret gated，可砍）
  api/
    ideas/route.ts          # GET 列表(approved) · POST 提交(pending)
    ideas/[id]/vote/route.ts# POST 投票（唯一约束防重复）
    admin/ideas/route.ts    # 审核：列待审 + 通过/拒绝（gated）
content/
  ideas.ts modules.ts telemetry.ts   # 策展内容（key → i18n）
lib/
  cosmos/
    Starfield.tsx           # 星空 Canvas
    Field.tsx               # 3D 节点场 + 连线 Canvas + 拖拽
    projection.ts           # 透视投影纯函数（可单测）
  supabase/                 # client/server helpers
  github.ts                 # 服务端拉取 + 缓存
components/
  ui/                       # shadcn 基元
  hud/                      # NeonPanel NeonButton RadialGauge Waveform StatusPill Tag 等
  overlays/                 # FlyCard ModuleDetail SubmitModal
  board/                    # 看板（dnd-kit）
  tweaks/                   # Tweaks 面板（shadcn 控件）
  LocaleToggle.tsx
messages/ zh.json en.json   # next-intl 字典
styles/ globals.css         # @theme（移植 token）+ 霓虹面板类 + keyframes
design-src/                 # 原型参考（只读）
```

## 5. 设计系统移植

原 `tokens/{colors,effects,typography,spacing}.css` 的 CSS 变量**几乎零改写**搬进 Tailwind v4 `@theme` / `:root`，全部保留：

- 颜色：`--void/--bg-*`、霓虹信号色（cyan/magenta/purple/green/amber/red）、per-node 色（`--node-ai` 等）、文本层级。
- 字体：Orbitron / Chakra Petch / Share Tech Mono（用 `next/font` 或 Google Fonts；`--font-display/-techno/-mono`）。
- 辉光/动效：`--glow-*`、`--halo-*`、`--ease-hud`、keyframes（`fz-pulse/blink/spin` + `eqbar`）。

**霓虹切角面板** `.fz-panel`（`clip-path` 缺角 + inset 1px 霓虹描边 + `--frame` 变量重着色）原样保留为一个 CSS 类，封装成 React `<NeonPanel accent>`。

## 6. 组件清单（库 vs 手写）

| 组件 | 来源 |
|---|---|
| 飞卡详情 / 模块面板 / 提交弹窗 | shadcn **Dialog** + Motion 进场 |
| Toast | **Sonner** |
| Tweaks 控件（开关/滑块/分段/下拉） | shadcn **Switch/Slider/Tabs/Select** |
| 看板拖拽 + Advance | **dnd-kit** |
| 图标 | **lucide-react** |
| NeonPanel / NeonButton / StatusPill / Tag / ProgressBar | 手写（薄封装 + token） |
| RadialGauge / Waveform / 均衡器 | 手写 SVG/CSS |
| Starfield / Field / 连线 / 投影 | 手写（不可替代） |

## 7. 宇宙场实现（混合方案细节）

忠实移植原型 `Field.jsx` 的做法：

- **Starfield**：Canvas 2D 粒子，z 向推进 + 闪烁，密度随 Tweaks（sparse/medium/dense）。
- **节点布局**：斐波那契球面分布；idea 卡外圈、模块内圈（`R*0.72`）、子链接 chip 环绕各自卡片。
- **连线 Canvas**：枢纽↔卡片实线、卡片↔子链接细线、枢纽↔模块虚线，均带沿线流动光点；alpha/线宽随深度，hover/选中高亮。
- **卡片定位**：外层 `.fz-system` 做 `rotateX/Y`，每个 `.fz-cardpos` 用 `translate3d(var(--x/y/z))` + 反向旋转 billboard。
- **每帧投影**：`projection.ts` 算屏幕坐标与深度 `t`，驱动卡片 opacity/blur/z-index/pointer-events。
- **交互**：拖拽旋转（pointer 事件）、空闲漂移（可 Tweaks 关）、点击飞出（拖动位移 >6px 视为拖拽不触发点击）；`prefers-reduced-motion` 关漂移与飞入。

## 8. 数据模型（Supabase）

```sql
ideas (
  id uuid pk default gen_random_uuid(),
  title text not null,
  description text,
  category text,                 -- AI/Dev, Tools, Content, Analytics, Platform
  author_handle text,            -- 可选 @handle
  status text not null default 'pending',  -- pending | approved | rejected
  created_at timestamptz default now()
)
votes (
  id uuid pk default gen_random_uuid(),
  idea_id uuid references ideas(id) on delete cascade,
  voter_key text not null,       -- 匿名 cookie + IP 哈希
  created_at timestamptz default now(),
  unique (idea_id, voter_key)
)
```

- 投票数：`count(votes)` 聚合（或视图）。访客内容不翻译。
- RLS：匿名只能读 `approved`；写入走服务端（service key，不在 client 暴露）。

## 9. API 设计

- `GET /api/ideas` → 已通过的想法 + 票数（按票数排序）。
- `POST /api/ideas` → 校验 + 落 `pending`；基础限流（IP）。
- `POST /api/ideas/[id]/vote` → 插 vote，唯一约束防重复；返回新票数。
- `GET/POST /api/admin/ideas` → 列待审 / 通过 / 拒绝；**env secret gated**。

## 10. i18n

- `next-intl`，`messages/{zh,en}.json`；zh 默认，cookie 记忆，**不改 URL**。
- 策展文案、UI 标签全部 key 化；访客 UGC 原样显示。
- `<LocaleToggle/>` 在右上角状态条旁。

## 11. 审核 / admin（可砍项）

提交落 `pending`。默认提供 **极简 `/admin`**：env secret 进入 → 待审列表 → 通过/拒绝（一个 server action + shadcn 表格/按钮，约 1 个小页面）。若不想要，可改为纯 Supabase 后台手动改 `status`，删掉 `/admin` 与 `api/admin`。

## 12. 真实 GitHub 集成

- 服务端 `fetch` GitHub 公开 REST（`/users/{handle}`、`/users/{handle}/repos`、`/users/{handle}/events/public`），`next: { revalidate: 1800 }` 缓存。
- 可选 `GITHUB_TOKEN`（仅服务端）提高额度；无 token 也能跑（公开额度）。
- 映射到原型的 profile 卡 + stats + 活动流结构。

## 13. 响应式 / a11y / 降级

- `scale-to-fit`：设计基准 1600×1150，按视口缩放，工作到笔记本。
- `prefers-reduced-motion`：关漂移/飞入/进场，内容直接呈现。
- DOM 卡片保留语义与键盘可达；Dialog 由 Radix 提供焦点管理。

## 14. 环境变量

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # 仅服务端
GITHUB_HANDLE=fengziaaa
GITHUB_TOKEN=                     # 可选
ADMIN_SECRET=                     # /admin 门禁
```

## 15. 构建顺序（里程碑）

1. **脚手架**：create-next-app + Tailwind v4 + shadcn + next-intl + supabase；移植 token、字体、霓虹面板类。
2. **静态宇宙核心**：Starfield + Field + 连线 + 中心字标 + idea/module 节点（mock 数据先跑通视觉）。
3. **覆盖层**：FlyCard / ModuleDetail / SubmitModal（Dialog + Motion）+ Sonner toast。
4. **看板**：Roadmap（dnd-kit，拖拽 + Advance）。
5. **Tweaks + i18n**：shadcn 控件面板 + LocaleToggle + 双语字典。
6. **后端接线**：Supabase schema + API（提交/投票/列表）+ 审核 + 真实 GitHub。
7. **打磨/部署**：响应式、reduced-motion、空状态/错误态、Vercel 上线。

## 16. 验收标准

- 首页宇宙：拖拽旋转、漂移、点击飞出，与原型视觉一致。
- idea 飞卡 + 6 个模块面板内容/动效到位。
- 看板四列拖拽 + Advance 正常。
- 提交想法 → 落 pending → 审核通过 → 出现在访客列表；投票去重生效（刷新仍在）。
- GitHub 卡显示真实数据。
- 中英一键切换、cookie 记忆。
- 笔记本尺寸可用；reduced-motion 降级正常。

## 17. 非目标（YAGNI）

- 不做用户登录/账号体系（投票匿名去重即可）。
- 不做想法的多语言翻译（UGC 原样）。
- 不做原型里没有的页面/功能；不提前为未发生的需求抽象。
- 不引入第二个做同件事的库。

## 18. 风险

- **宇宙场手感对齐**：投影/漂移/深度模糊需逐项对照原型调参 —— 投影逻辑抽纯函数便于调试。
- **GitHub 公开额度**：无 token 时活动流可能限流 —— 缓存 + 失败回退到精简展示。
- **UGC 滥用**：先审后发 + 限流缓解；必要时加敏感词过滤。
