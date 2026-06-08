# FENGZIAAA Lab — Design System

A cyberpunk **lab-cockpit** design language for **fengziaaa** (fengziaaa.com) — a
"Vibecoding Personal Lab." The site is one part portfolio, one part idea
collector, one part mission-control board: scatter your projects across a live
3D map, rotate to browse, click to expand, and watch ideas move from a spark to
shipped.

This system encodes that world: neon-on-void HUD panels, glowing signal hues,
terminal typography, and a signature interactive **Ideas Orbital Map**.

> **Brief from the owner (paraphrased):** a personal homepage to showcase work,
> collect ideas, and roll those ideas into a task board with status + progress —
> high information density, cyberpunk, dynamic interactions, modeled on the
> attached "LAB COCKPIT" reference mockup.

**Source material:** one reference image (`uploads/pasted-1780909153987-0.png`) —
the LAB COCKPIT v1.0.0 dashboard. No external codebase or Figma was provided;
this system was authored from scratch to match that reference. The brand "F"
monogram is original (defined here in `assets/logo-mark.svg`).

---

## Content fundamentals — how FENGZIAAA writes

- **Voice:** first-person builder, present-tense, "building in public." Confident
  but not corporate. Examples: *"Building in public. Ship daily."* ·
  *"Build 100 ideas. Inspire millions."* · *"Share it. Build it. Change something."*
- **Casing:** UPPERCASE for labels, system tags, and nav (`PERSONAL IDEAS`,
  `SYSTEM STATUS`, `VIEW ALL`), widely letter-spaced. Sentence/Title case for
  human-facing copy inside cards.
- **Register:** light sci-fi / mission-control framing. Sections are "modules,"
  status is "ONLINE," logs read like a console, progress is a "mission." Lean in,
  but keep it legible — the metaphor decorates, it never obscures the content.
- **Numbers as texture:** counts, percentages, uptimes and timestamps are part of
  the look (`63 / 100`, `42.7 MB/s`, `7D 14H 22M`). Use real, specific values.
- **Pronouns:** "I" for the owner's bio/notes; "you" when addressing a visitor
  ("Have an idea?"). Visitor-submitted content keeps `@handles`.
- **Emoji:** essentially none. The vocabulary is line-icons + status dots, not
  emoji. A lone `●`/`▲`/`▋` glyph as a status/console accent is on-brand.
- **Vibe in three words:** *electric · in-progress · alive.*

---

## Visual foundations

**Palette.** Deep blue-black voids (`--void #04070e` → `--bg-elevated #111a2c`)
under a fixed set of neon signal hues: **cyan** (primary, `#2ee6f6`), **magenta**
(secondary, `#ff2d9b`), **purple** `#b06bff`, **acid green** `#2bff88`, **amber**
`#ffae3a`, plus a red alarm. Each orbital node owns one hue (`--node-ai` purple,
`--node-flow` green, `--node-radar` cyan, `--node-blog` magenta, `--node-os`
amber) and carries it everywhere it appears.

**Type.** Three families: **Orbitron** (wide geometric display — the FENGZIAAA
wordmark and big numerals), **Chakra Petch** (squared techno — uppercase labels,
headings, UI), **Share Tech Mono** (the connective tissue — all data, console,
body copy). Labels are tracked wide (`.2–.28em`) and uppercased; the HUD runs
small and dense (10–13px is normal; 24px+ for display).

**Backgrounds.** A dark base painted with a faint 40px **grid**, a cool radial
glow at the top and a warm magenta wash at the bottom (dimmed so panels stay
readable). Optional `.fz-scanlines` veil for CRT texture on full-bleed screens.
No photographic imagery; the "art" is the glow and the grid.

**Panels (the signature object).** Dark **glass** fill (`--grad-panel`, ~98%
opaque navy) clipped with **cut corners** (`clip-path` notch on top-left +
bottom-right) and edged with a **1px neon hairline** drawn as an inset shadow
(`--frame` recolors it per accent — the inset is clipped by the notch, so the cut
corners read as broken HUD edges). Headers are an uppercase tracked label with an
optional live status dot and a right-aligned count/link. Radii are otherwise
small (2–8px); only orbs and gauges are circular.

**Glow system.** Two tiers: `--glow-*` (text shadow halos for neon type) and
`--halo-*` (box glow for active/interactive surfaces). Buttons, orbs, progress
fills, and the reactor core all emit a colored bloom matching their hue. Glows
are tight (6–34px), never a foggy gradient soup.

**Depth & transparency.** Real elevation is rare — the cockpit is mostly flat
panels on a void. Translucency + `backdrop-filter: blur(6px)` appears only on the
glass panels and modal scrims. Avoid drop-shadow stacks; light *is* the depth cue.

**Motion.** Restrained but alive. Easing is `--ease-hud`
(`cubic-bezier(.22,1,.36,1)`) — a swift settle. Status dots **pulse**, console
cursors **blink**, signal bars run a staggered **equalizer**, the orbital map
**drifts** and is drag-spun, the reactor core **breathes**, panels/cards rise on
hover (`translateY(-2px)`). Entrances animate from a transform (never from
`opacity:0` alone) so throttled tabs, print and reduced-motion still show content.
No bouncy overshoot, no infinite spinners on content.

**Hover / press.** Hover = brighten + thin neon outline + faint colored box-glow
(and a 2px lift on cards/tiles). Press/active = the element fills with its hue
(solid buttons) or its outline saturates. Disabled = 40% opacity.

**Corners, borders, cards.** Cut-corner notch is the house shape. Borders are 1px
neon hairlines, never heavy. Cards = a mini notched panel with the accent frame +
a leading node orb. There is no soft "rounded card with colored left border"
pattern here — the language is angular and edge-lit.

---

## Iconography

- **System:** [Lucide](https://lucide.dev) — thin (≈1.5px) line icons, loaded from
  CDN (`unpkg.com/lucide`). It matches the reference's hairline neon glyphs
  exactly (octocat-style git icons, `map-pin`, `link`, `code-xml`, `gamepad-2`,
  `database`, `settings`, `mail`, `rocket`, `compass`, `hammer`, …). *This is a
  substitution* — the reference was a static render with no icon source attached;
  Lucide is the closest open match. Swap freely if you adopt a paid set.
- **Color & glow:** icons inherit their context's signal hue and may carry a soft
  `drop-shadow`/`text-shadow` glow when they're the focal accent.
- **Status glyphs:** small filled **dots** (`.fz-dot`, optionally pulsing) signal
  live/online/building/offline. Unicode accents `●  ▲  ▋  →  ↑` appear inline in
  console/data contexts. **No emoji.**
- **Logo:** the **F monogram** (`assets/logo-mark.svg`) — a geometric F with a
  cyan→magenta gradient and a chromatic cyan/magenta offset "ghost." Pair with the
  Orbitron `FENGZIAAA` wordmark + `fengziaaa.com` in magenta.
- Usage in components: pass a Lucide node, e.g. `icon={<i data-lucide="rocket"></i>}`,
  then call `lucide.createIcons()` after render.

---

## Index / manifest

**Root**
- `styles.css` — global entry (import-only). Consumers link this.
- `readme.md` — this guide. · `SKILL.md` — Agent-Skill front matter.
- `assets/logo-mark.svg` — the F monogram.

**Tokens** (`tokens/`, all `@import`ed by `styles.css`)
- `fonts.css` (Google Fonts) · `colors.css` · `typography.css` · `spacing.css`
  · `effects.css` (glows, gradients, motion, keyframes) · `base.css` (reset,
  `.fz-panel`, `.fz-scanlines`, helpers).

**Components** (`components/`, 12 primitives → `window.<Namespace>`)
- `panel/` — **HudPanel**, **SectionHeader**
- `buttons/` — **NeonButton**, **QuickTile**
- `data/` — **ProgressBar**, **RadialGauge**, **StatItem**, **Waveform**
- `status/` — **StatusPill**, **Tag**
- `cards/` — **IdeaCard**, **ConsoleLog**

**UI kits** (`ui_kits/`)
- `lab_cockpit/` — the flagship homepage: **a cosmos you drift through.** A
  particle starfield with your ideas floating around you as content cards (no
  orbs / core / ring) and a tiny "you are here" point at the center. Drag to
  drift, grab a card, **click to fly its full detail to the front.** (`index.html`,
  `data.js`, `hud.jsx`, `OrbitalMap.jsx` + `orbital.css`, `Cockpit.jsx`.)
- `ideas_board/` — the **Ideas Kanban**: drag ideas across Backlog → Exploring →
  Building → Shipped, each card with tag, votes, and progress. (`index.html`,
  `Board.jsx`; reuses the cockpit's `hud.jsx`.)

**Guidelines** (`guidelines/`) — foundation specimen cards shown in the Design
System tab (colors, type, spacing, effects, brand).

### Notes for builders
- Components run on `window.React` + the compiled `_ds_bundle.js`; that bundle is
  served inside the **Design System tab** (not in raw file preview). The UI kits
  are deliberately **self-contained** (inline primitives in `hud.jsx`) so they
  render anywhere.
- Recolor anything by passing a `tone` / `accent` hue — prefer a `var(--node-*)`
  or core signal token over a raw hex.
