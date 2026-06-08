/* @ds-bundle: {"format":3,"namespace":"FENGZIAAALabDesignSystem_5e6e06","components":[{"name":"NeonButton","sourcePath":"components/buttons/NeonButton.jsx"},{"name":"QuickTile","sourcePath":"components/buttons/QuickTile.jsx"},{"name":"ConsoleLog","sourcePath":"components/cards/ConsoleLog.jsx"},{"name":"IdeaCard","sourcePath":"components/cards/IdeaCard.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"RadialGauge","sourcePath":"components/data/RadialGauge.jsx"},{"name":"StatItem","sourcePath":"components/data/StatItem.jsx"},{"name":"Waveform","sourcePath":"components/data/Waveform.jsx"},{"name":"HudPanel","sourcePath":"components/panel/HudPanel.jsx"},{"name":"SectionHeader","sourcePath":"components/panel/SectionHeader.jsx"},{"name":"StatusPill","sourcePath":"components/status/StatusPill.jsx"},{"name":"Tag","sourcePath":"components/status/Tag.jsx"}],"sourceHashes":{"components/buttons/NeonButton.jsx":"43b782e4041e","components/buttons/QuickTile.jsx":"9662dfcd410f","components/cards/ConsoleLog.jsx":"ddbd1b190c39","components/cards/IdeaCard.jsx":"e2b5d728f00f","components/data/ProgressBar.jsx":"3963681ead11","components/data/RadialGauge.jsx":"99e5e847b163","components/data/StatItem.jsx":"99374844906f","components/data/Waveform.jsx":"a7956bc9c814","components/panel/HudPanel.jsx":"176c8cf612c1","components/panel/SectionHeader.jsx":"e1507c924afd","components/status/StatusPill.jsx":"5a7c4e9ffb90","components/status/Tag.jsx":"722b4a4b06a7","ui_kits/ideas_board/Board.jsx":"8c0c342850e7","ui_kits/lab_cockpit/Cockpit.jsx":"d112b356b655","ui_kits/lab_cockpit/OrbitalMap.jsx":"939826ef7dd6","ui_kits/lab_cockpit/data.js":"b5d7911b4282","ui_kits/lab_cockpit/hud.jsx":"cb61a44ef028"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FENGZIAAALabDesignSystem_5e6e06 = window.FENGZIAAALabDesignSystem_5e6e06 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/NeonButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;

/**
 * NeonButton — primary HUD action. Variants: solid (filled neon, dark text),
 * outline (glowing border), ghost (text only). `tone` sets the hue.
 */
function NeonButton({
  children,
  variant = 'outline',
  tone = 'var(--cyan)',
  size = 'md',
  icon,
  iconRight,
  disabled = false,
  style,
  ...rest
}) {
  const pads = {
    sm: '6px 12px',
    md: '10px 18px',
    lg: '14px 26px'
  };
  const fonts = {
    sm: 'var(--text-2xs)',
    md: 'var(--text-xs)',
    lg: 'var(--text-sm)'
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-4)',
    padding: pads[size],
    fontFamily: 'var(--font-techno)',
    fontWeight: 600,
    fontSize: fonts[size],
    letterSpacing: 'var(--tracking-wider)',
    textTransform: 'uppercase',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    borderRadius: 'var(--radius-sm)',
    clipPath: 'polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px)',
    transition: 'all var(--dur) var(--ease-hud)',
    userSelect: 'none',
    whiteSpace: 'nowrap'
  };
  const variants = {
    solid: {
      background: tone,
      color: 'var(--text-on-neon)',
      border: 'none',
      boxShadow: `0 0 18px -3px ${tone}`
    },
    outline: {
      background: `color-mix(in srgb, ${tone} 10%, transparent)`,
      color: tone,
      border: `1px solid ${tone}`,
      boxShadow: `0 0 14px -4px ${tone}, inset 0 0 12px -8px ${tone}`,
      textShadow: `0 0 8px ${tone}`
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-dim)',
      border: '1px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), icon, children, iconRight);
}
Object.assign(__ds_scope, { NeonButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/NeonButton.jsx", error: String((e && e.message) || e) }); }

// components/buttons/QuickTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;

/**
 * QuickTile — a square icon launcher used in the Quick Access grid.
 * Glowing outline on hover. Pass an `icon` node (e.g. a Lucide <i>) + label.
 */
function QuickTile({
  icon,
  label,
  tone = 'var(--cyan)',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-4)',
      padding: 'var(--space-6) var(--space-4)',
      background: hover ? `color-mix(in srgb, ${tone} 12%, var(--bg-deep))` : 'var(--bg-deep)',
      border: `1px solid ${hover ? tone : 'var(--line-dim)'}`,
      borderRadius: 'var(--radius-sm)',
      color: hover ? tone : 'var(--text)',
      cursor: 'pointer',
      transition: 'all var(--dur) var(--ease-hud)',
      boxShadow: hover ? `0 0 16px -6px ${tone}` : 'none',
      clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      lineHeight: 0,
      color: hover ? tone : 'var(--text-mono)'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 'var(--text-3xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase'
    }
  }, label));
}
Object.assign(__ds_scope, { QuickTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/QuickTile.jsx", error: String((e && e.message) || e) }); }

// components/cards/ConsoleLog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;
const TAG_COLORS = {
  INFO: 'var(--cyan)',
  OK: 'var(--green)',
  DATA: 'var(--blue-bright)',
  SYNC: 'var(--purple)',
  WARN: 'var(--amber)',
  ERR: 'var(--red)'
};

/**
 * ConsoleLog — a terminal log stream. Pass `lines` of { time, tag, msg }.
 * Tags are color-coded; an optional blinking prompt sits at the bottom.
 */
function ConsoleLog({
  lines = [],
  prompt,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "fz-scroll",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      lineHeight: 1.8,
      ...style
    }
  }, rest), lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)'
    }
  }, l.time), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TAG_COLORS[l.tag] || 'var(--text-mono)',
      minWidth: 48
    }
  }, "[", l.tag, "]"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text)'
    }
  }, l.msg))), prompt && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      color: 'var(--green)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cyan)'
    }
  }, ">"), " ", prompt, /*#__PURE__*/React.createElement("span", {
    style: {
      animation: 'fz-blink 1s steps(1) infinite'
    }
  }, "\u258B")));
}
Object.assign(__ds_scope, { ConsoleLog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ConsoleLog.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;

/**
 * ProgressBar — thin neon track with glowing fill. Used in idea rows + mission
 * stats. Pass `value` 0–100, a `tone`, and optionally show the % label.
 */
function ProgressBar({
  value = 0,
  tone = 'var(--green)',
  height = 5,
  showValue = false,
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height,
      background: 'var(--bg-deep)',
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden',
      boxShadow: 'inset 0 0 0 1px var(--line-faint)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      background: tone,
      borderRadius: 'var(--radius-pill)',
      boxShadow: `0 0 10px -1px ${tone}`,
      transition: 'width var(--dur-slow) var(--ease-hud)'
    }
  })), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: tone,
      minWidth: 34,
      textAlign: 'right'
    }
  }, pct, "%"));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/RadialGauge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;

/**
 * RadialGauge — circular progress ring with a big centered numeral.
 * The "63 / 100" mission dial. SVG-based, animates the arc on mount.
 */
function RadialGauge({
  value = 0,
  max = 100,
  size = 150,
  stroke = 9,
  tone = 'var(--green)',
  label,
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      width: size,
      height: size,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--bg-deep)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: tone,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: c * (1 - pct),
    style: {
      filter: `drop-shadow(0 0 6px ${tone})`,
      transition: 'stroke-dashoffset var(--dur-slow) var(--ease-hud)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: size * 0.3,
      color: tone,
      textShadow: `0 0 12px ${tone}`,
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-dim)',
      marginTop: 2
    }
  }, label || `/${max}`)));
}
Object.assign(__ds_scope, { RadialGauge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/RadialGauge.jsx", error: String((e && e.message) || e) }); }

// components/data/StatItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;

/**
 * StatItem — a label-over-value (or value-over-label) data readout. Used in the
 * top status strip and the GitHub stat row. `tone` colors the value.
 */
function StatItem({
  label,
  value,
  tone = 'var(--text-bright)',
  align = 'left',
  reverse = false,
  glow = false,
  style,
  ...rest
}) {
  const labelEl = /*#__PURE__*/React.createElement("span", {
    key: "l",
    style: {
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 'var(--text-3xs)',
      letterSpacing: 'var(--tracking-widest)',
      textTransform: 'uppercase',
      color: 'var(--text-dim)'
    }
  }, label);
  const valueEl = /*#__PURE__*/React.createElement("span", {
    key: "v",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-md)',
      color: tone,
      textShadow: glow ? `0 0 10px ${tone}` : 'none',
      lineHeight: 1.1
    }
  }, value);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      alignItems: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start',
      ...style
    }
  }, rest), reverse ? [valueEl, labelEl] : [labelEl, valueEl]);
}
Object.assign(__ds_scope, { StatItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatItem.jsx", error: String((e && e.message) || e) }); }

// components/data/Waveform.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;

/**
 * Waveform — a live signal readout (equalizer bars). Decorative telemetry for
 * DATA INTAKE / VIBE LEVEL strips. Animated unless `static` is set.
 */
function Waveform({
  bars = 40,
  tone = 'var(--green)',
  height = 32,
  animated = true,
  seed = 7,
  style,
  ...rest
}) {
  // deterministic pseudo-random heights so SSR/preview is stable
  const heights = React.useMemo(() => {
    let s = seed;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({
      length: bars
    }, () => 0.25 + rnd() * 0.75);
  }, [bars, seed]);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 2,
      height,
      ...style
    }
  }, rest), heights.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: `${h * 100}%`,
      background: tone,
      borderRadius: 1,
      opacity: 0.85,
      boxShadow: `0 0 6px -2px ${tone}`,
      transformOrigin: 'bottom',
      animation: animated ? `fz-pulse ${1 + i % 5 * 0.18}s ease-in-out ${i * 0.03}s infinite` : 'none'
    }
  })));
}
Object.assign(__ds_scope, { Waveform });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Waveform.jsx", error: String((e && e.message) || e) }); }

// components/panel/SectionHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;

/**
 * SectionHeader — the uppercase techno label bar that tops every HUD panel.
 * Optional status dot, live pulse, and a right-aligned slot (link / count).
 */
function SectionHeader({
  label,
  accent = 'var(--cyan)',
  dot = false,
  live = false,
  right,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-5)',
      padding: '10px var(--panel-pad)',
      borderBottom: '1px solid var(--line-dim)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)'
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    className: live ? 'fz-dot is-live' : 'fz-dot',
    style: {
      background: accent,
      color: accent
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-widest)',
      textTransform: 'uppercase',
      color: 'var(--text-dim)'
    }
  }, label)), right != null && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: accent
    }
  }, right));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/panel/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/panel/HudPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;
/**
 * HudPanel — the signature notched, glass HUD frame. Wraps any content.
 * Pass `label` to render a SectionHeader; `accent` recolors the frame +
 * header dot. Uses the global `.fz-panel` class for the cut-corner border.
 */
function HudPanel({
  label,
  accent,
  dot = false,
  live = false,
  right,
  notch = 'var(--notch)',
  pad = 'var(--panel-pad)',
  className = '',
  style,
  bodyStyle,
  children,
  ...rest
}) {
  const frame = accent ? `color-mix(in srgb, ${accent} 55%, var(--line))` : undefined;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `fz-panel ${className}`,
    style: {
      '--notch-size': notch,
      ...(frame ? {
        '--frame': frame
      } : null),
      ...style
    }
  }, rest), label != null && /*#__PURE__*/React.createElement(__ds_scope.SectionHeader, {
    label: label,
    accent: accent || 'var(--cyan)',
    dot: dot,
    live: live,
    right: right
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: pad,
      ...bodyStyle
    }
  }, children));
}
Object.assign(__ds_scope, { HudPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/panel/HudPanel.jsx", error: String((e && e.message) || e) }); }

// components/status/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;

/**
 * StatusPill — small capsule with a glowing dot + label. Signals system state
 * (ONLINE / SYNCING / OFFLINE) or any tagged status.
 */
function StatusPill({
  children,
  tone = 'var(--green)',
  dot = true,
  live = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: '3px 9px',
      borderRadius: 'var(--radius-pill)',
      background: `color-mix(in srgb, ${tone} 12%, transparent)`,
      border: `1px solid color-mix(in srgb, ${tone} 45%, transparent)`,
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 'var(--text-3xs)',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase',
      color: tone,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: live ? 'fz-dot is-live' : 'fz-dot',
    style: {
      background: tone,
      color: tone,
      width: 6,
      height: 6
    }
  }), children);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/status/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;

/**
 * Tag — a tiny squared category chip (AI/TOOLS, CONTENT, ANALYTICS…).
 * Sharper than StatusPill; no dot. Use to label ideas and projects.
 */
function Tag({
  children,
  tone = 'var(--cyan)',
  solid = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 7px',
      borderRadius: 'var(--radius-xs)',
      background: solid ? tone : `color-mix(in srgb, ${tone} 10%, transparent)`,
      border: `1px solid color-mix(in srgb, ${tone} 40%, transparent)`,
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 'var(--text-3xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: solid ? 'var(--text-on-neon)' : tone,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/Tag.jsx", error: String((e && e.message) || e) }); }

// components/cards/IdeaCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;
/**
 * IdeaCard — a row in the Personal Ideas list: glowing node orb, title +
 * subtitle, category Tag, and a progress track. The core content unit.
 */
function IdeaCard({
  title,
  subtitle,
  tag,
  tone = 'var(--cyan)',
  progress,
  onClick,
  active = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      padding: '10px var(--space-5)',
      borderRadius: 'var(--radius-sm)',
      background: hover || active ? 'var(--bg-elevated)' : 'transparent',
      border: `1px solid ${active ? `color-mix(in srgb, ${tone} 50%, transparent)` : 'transparent'}`,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all var(--dur) var(--ease-hud)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: `radial-gradient(circle at 38% 34%, #fff6, ${tone} 50%, color-mix(in srgb, ${tone} 30%, #04070e))`,
      boxShadow: `0 0 10px -1px ${tone}`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-bright)',
      letterSpacing: '0.02em'
    }
  }, title), tag && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: tone
  }, tag)), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-dim)',
      marginTop: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, subtitle), progress != null && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 7
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ProgressBar, {
    value: progress,
    tone: tone,
    showValue: true,
    height: 4
  }))));
}
Object.assign(__ds_scope, { IdeaCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/IdeaCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ideas_board/Board.jsx
try { (() => {
/* FENGZIAAA Lab — Ideas Kanban Board. Drag cards between mission stages. */
const {
  useState,
  useRef
} = React;
const COLUMNS = [{
  id: 'backlog',
  label: 'Backlog',
  tone: 'var(--cyan)',
  hex: '#2ee6f6',
  icon: 'inbox'
}, {
  id: 'explore',
  label: 'Exploring',
  tone: 'var(--purple)',
  hex: '#b06bff',
  icon: 'compass'
}, {
  id: 'build',
  label: 'Building',
  tone: 'var(--amber)',
  hex: '#ffae3a',
  icon: 'hammer'
}, {
  id: 'shipped',
  label: 'Shipped',
  tone: 'var(--green)',
  hex: '#2bff88',
  icon: 'rocket'
}];
const SEED = [{
  id: 'i1',
  title: 'AI Copilot',
  tag: 'AI / Dev',
  tone: 'var(--node-ai)',
  hex: '#b06bff',
  progress: 60,
  stage: 'build',
  votes: 34,
  note: 'Context-aware pair programmer'
}, {
  id: 'i2',
  title: 'Flowcraft',
  tag: 'AI / Tools',
  tone: 'var(--node-flow)',
  hex: '#2bff88',
  progress: 75,
  stage: 'build',
  votes: 28,
  note: 'Visual AI workflow builder'
}, {
  id: 'i3',
  title: 'Dev Radar',
  tag: 'Analytics',
  tone: 'var(--node-radar)',
  hex: '#2ee6f6',
  progress: 40,
  stage: 'explore',
  votes: 19,
  note: 'Real-time dev insights'
}, {
  id: 'i4',
  title: 'Neon Blog',
  tag: 'Content',
  tone: 'var(--node-blog)',
  hex: '#ff2d9b',
  progress: 80,
  stage: 'build',
  votes: 22,
  note: 'Thoughts on code & AI'
}, {
  id: 'i5',
  title: 'Open Source Hub',
  tag: 'Platform',
  tone: 'var(--node-os)',
  hex: '#ffae3a',
  progress: 30,
  stage: 'explore',
  votes: 15,
  note: 'Developer resources platform'
}, {
  id: 'i6',
  title: 'Visual Git Graph',
  tag: 'Tooling',
  tone: 'var(--cyan)',
  hex: '#2ee6f6',
  progress: 0,
  stage: 'backlog',
  votes: 12,
  note: 'See history in 3D'
}, {
  id: 'i7',
  title: 'Prompt Library',
  tag: 'AI / Tools',
  tone: 'var(--purple)',
  hex: '#b06bff',
  progress: 0,
  stage: 'backlog',
  votes: 9,
  note: 'Reusable prompt snippets'
}, {
  id: 'i8',
  title: 'Time Machine',
  tag: 'Tooling',
  tone: 'var(--magenta)',
  hex: '#ff2d9b',
  progress: 0,
  stage: 'backlog',
  votes: 7,
  note: 'Replay any project state'
}, {
  id: 'i9',
  title: 'Personal Cockpit',
  tag: 'Web',
  tone: 'var(--green)',
  hex: '#2bff88',
  progress: 100,
  stage: 'shipped',
  votes: 41,
  note: 'This very dashboard'
}, {
  id: 'i10',
  title: 'Dotfiles Sync',
  tag: 'DevOps',
  tone: 'var(--green)',
  hex: '#2bff88',
  progress: 100,
  stage: 'shipped',
  votes: 16,
  note: 'One command, any machine'
}];
function Card({
  card,
  onDragStart,
  onAdvance
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    draggable: true,
    onDragStart: e => onDragStart(e, card.id),
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    className: "fz-panel",
    style: {
      '--notch-size': '9px',
      '--frame': `color-mix(in srgb, ${card.tone} 50%, var(--line))`,
      padding: '11px 12px',
      marginBottom: 9,
      cursor: 'grab',
      transition: 'transform .15s var(--ease-hud)',
      transform: h ? 'translateY(-2px)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fz-orb",
    style: {
      '--hex': card.hex,
      width: 11,
      height: 11,
      boxShadow: `0 0 9px -1px ${card.hex}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 13,
      color: 'var(--text-bright)',
      flex: 1
    }
  }, card.title), /*#__PURE__*/React.createElement(Tag, {
    tone: card.tone
  }, card.tag)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-dim)',
      marginBottom: 9
    }
  }, card.note), card.progress > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 9
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: card.progress,
    tone: card.tone,
    height: 4,
    showValue: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--green)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "chevron-up",
    size: 12,
    color: "var(--green)"
  }), card.votes), card.stage !== 'shipped' && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => onAdvance(card.id),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: 'none',
      border: '1px solid var(--line-dim)',
      color: 'var(--text-dim)',
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 9,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      padding: '3px 7px',
      borderRadius: 3,
      cursor: 'pointer'
    }
  }, "Advance ", /*#__PURE__*/React.createElement(Icon, {
    n: "arrow-right",
    size: 11,
    color: "var(--text-dim)"
  }))));
}
function Column({
  col,
  cards,
  onDrop,
  onDragStart,
  onAdvance
}) {
  const [over, setOver] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onDragOver: e => {
      e.preventDefault();
      setOver(true);
    },
    onDragLeave: () => setOver(false),
    onDrop: e => {
      setOver(false);
      onDrop(e, col.id);
    },
    className: "fz-panel fz-scroll",
    style: {
      '--notch-size': '12px',
      '--frame': over ? col.tone : `color-mix(in srgb, ${col.tone} 38%, var(--line))`,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      transition: 'box-shadow .2s',
      boxShadow: over ? `inset 0 0 0 1px ${col.tone}, 0 0 26px -8px ${col.tone}` : undefined
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '11px 13px',
      borderBottom: '1px solid var(--line-dim)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: col.tone
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: col.icon,
    size: 14,
    color: col.tone
  }), col.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-dim)'
    }
  }, cards.length)), /*#__PURE__*/React.createElement("div", {
    className: "fz-scroll",
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '11px'
    }
  }, cards.map(c => /*#__PURE__*/React.createElement(Card, {
    key: c.id,
    card: c,
    onDragStart: onDragStart,
    onAdvance: onAdvance
  })), cards.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '24px 0',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-faint)',
      border: '1px dashed var(--line-faint)',
      borderRadius: 4
    }
  }, "drop ideas here")));
}
function Board() {
  const [cards, setCards] = useState(SEED);
  const dragId = useRef(null);
  const onDragStart = (e, id) => {
    dragId.current = id;
    e.dataTransfer.effectAllowed = 'move';
  };
  const onDrop = (e, stage) => {
    const id = dragId.current;
    if (!id) return;
    setCards(cs => cs.map(c => c.id === id ? {
      ...c,
      stage,
      progress: stage === 'shipped' ? 100 : c.progress
    } : c));
    dragId.current = null;
  };
  const onAdvance = id => {
    const order = COLUMNS.map(c => c.id);
    setCards(cs => cs.map(c => {
      if (c.id !== id) return c;
      const next = order[Math.min(order.length - 1, order.indexOf(c.stage) + 1)];
      return {
        ...c,
        stage: next,
        progress: next === 'shipped' ? 100 : c.progress
      };
    }));
  };
  React.useEffect(() => {
    window.lucide && window.lucide.createIcons();
  });
  const counts = COLUMNS.map(col => cards.filter(c => c.stage === col.id).length);
  const shipped = cards.filter(c => c.stage === 'shipped').length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      width: 1440,
      height: 900,
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.svg",
    alt: "fz",
    style: {
      width: 40,
      height: 40,
      filter: 'drop-shadow(0 0 10px rgba(46,230,246,.4))'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "fz-wordmark",
    style: {
      fontSize: 26,
      letterSpacing: '.14em'
    }
  }, "IDEAS BOARD"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-dim)'
    }
  }, "100 ideas mission \xB7 drag a card to change its stage"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 26
    }
  }, /*#__PURE__*/React.createElement(StatItem, {
    label: "Total Ideas",
    value: cards.length,
    tone: "var(--cyan)",
    glow: true,
    align: "right"
  }), /*#__PURE__*/React.createElement(StatItem, {
    label: "Shipped",
    value: shipped,
    tone: "var(--green)",
    glow: true,
    align: "right"
  }), /*#__PURE__*/React.createElement(StatItem, {
    label: "Mission",
    value: "63 / 100",
    tone: "var(--magenta)",
    glow: true,
    align: "right"
  }), /*#__PURE__*/React.createElement(NeonButton, {
    variant: "outline",
    tone: "var(--green)",
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: "plus",
      size: 14
    })
  }, "New Idea"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14,
      flex: 1,
      minHeight: 0
    }
  }, COLUMNS.map(col => /*#__PURE__*/React.createElement(Column, {
    key: col.id,
    col: col,
    cards: cards.filter(c => c.stage === col.id),
    onDrop: onDrop,
    onDragStart: onDragStart,
    onAdvance: onAdvance
  }))));
}
window.Board = Board;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ideas_board/Board.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lab_cockpit/Cockpit.jsx
try { (() => {
/* FENGZIAAA Lab — the cosmos shell. Starfield + floating idea field +
   fly-to-front detail. You are a small point; your ideas drift around you. */
const {
  useState,
  useEffect
} = React;
function stageOf(p) {
  if (p >= 100) return {
    label: 'Shipped',
    tone: 'var(--green)'
  };
  if (p >= 50) return {
    label: 'Building',
    tone: 'var(--amber)'
  };
  if (p > 0) return {
    label: 'Exploring',
    tone: 'var(--purple)'
  };
  return {
    label: 'Backlog',
    tone: 'var(--cyan)'
  };
}
function FlyCard({
  node,
  origin,
  onClose
}) {
  const ref = React.useRef(null);
  const st = stageOf(node.progress);
  useEffect(() => {
    window.lucide && window.lucide.createIcons();
  });
  useEffect(() => {
    const el = ref.current;
    if (!el || !origin || !el.animate) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const dx = Math.round(origin.cx - window.innerWidth / 2);
    const dy = Math.round(origin.cy - window.innerHeight / 2);
    el.animate([{
      transform: `translate(${dx}px, ${dy}px) scale(0.16)`,
      opacity: 0.4
    }, {
      transform: 'translate(0,0) scale(1)',
      opacity: 1
    }], {
      duration: 500,
      easing: 'cubic-bezier(.22,1,.36,1)'
    });
  }, [node.id]);
  return /*#__PURE__*/React.createElement("div", {
    className: "fz-fly-scrim",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    key: node.id,
    className: "fz-fly-card",
    onClick: e => e.stopPropagation(),
    style: {
      '--frame': `color-mix(in srgb, ${node.tone} 60%, var(--line))`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fz-fly-glow",
    style: {
      background: `radial-gradient(120% 150% at 8% 0%, color-mix(in srgb, ${node.tone} 28%, transparent), transparent 58%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fz-fly-edge",
    style: {
      background: node.hex,
      boxShadow: `0 0 16px 1px ${node.hex}`
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "fz-fly-close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    style: {
      width: 16,
      height: 16
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '30px 32px 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 10,
      letterSpacing: '.2em',
      textTransform: 'uppercase',
      color: node.tone
    }
  }, node.cat), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-techno)',
      fontWeight: 700,
      fontSize: 34,
      letterSpacing: '.01em',
      color: '#fff',
      textShadow: `0 0 18px ${node.hex}`,
      lineHeight: 1.05,
      margin: '6px 0 0'
    }
  }, node.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14.5,
      lineHeight: 1.65,
      color: 'var(--text)',
      margin: '18px 0 22px',
      maxWidth: 480
    }
  }, node.blurb), /*#__PURE__*/React.createElement("div", {
    className: "fz-fly-stats"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Stage"), /*#__PURE__*/React.createElement("div", {
    className: "v",
    style: {
      color: st.tone,
      textShadow: `0 0 10px ${st.tone}`
    }
  }, st.label)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Progress"), /*#__PURE__*/React.createElement("div", {
    className: "v",
    style: {
      color: node.hex
    }
  }, node.progress, "%")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Stars"), /*#__PURE__*/React.createElement("div", {
    className: "v",
    style: {
      color: 'var(--amber)'
    }
  }, node.stars)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Updated"), /*#__PURE__*/React.createElement("div", {
    className: "v",
    style: {
      color: 'var(--cyan)'
    }
  }, node.updated, " ago"))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '18px 0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 9,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: 'var(--text-dim)'
    }
  }, "Build Progress"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: node.tone
    }
  }, node.progress, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 999,
      background: 'var(--bg-deep)',
      overflow: 'hidden',
      boxShadow: 'inset 0 0 0 1px var(--line-faint)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: node.progress + '%',
      height: '100%',
      borderRadius: 999,
      background: node.tone,
      boxShadow: `0 0 12px -1px ${node.tone}`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(NeonButton, {
    variant: "solid",
    tone: node.tone,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      n: "arrow-up-right",
      size: 15
    })
  }, "Open project"), /*#__PURE__*/React.createElement(NeonButton, {
    variant: "ghost",
    onClick: onClose,
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: "arrow-left",
      size: 14
    })
  }, "Back to orbit")))));
}
function Cockpit() {
  const nodes = window.FZ_DATA.nodes;
  const [sel, setSel] = useState(null); // { id, origin }
  const node = sel && nodes.find(n => n.id === sel.id);
  useEffect(() => {
    window.lucide && window.lucide.createIcons();
  });
  const hidden = sel ? 'hidden' : 'visible';
  return /*#__PURE__*/React.createElement("div", {
    className: "fz-lab"
  }, /*#__PURE__*/React.createElement(Starfield, null), /*#__PURE__*/React.createElement("div", {
    className: "fz-lab-tag",
    style: {
      visibility: hidden
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fz-dot is-live",
    style: {
      background: 'var(--green)',
      color: 'var(--green)'
    }
  }), nodes.length, " IDEAS IN ORBIT"), /*#__PURE__*/React.createElement("main", {
    className: "fz-lab-stage",
    style: {
      visibility: hidden
    }
  }, /*#__PURE__*/React.createElement(Field, {
    nodes: nodes,
    selectedId: sel && sel.id,
    onSelect: (id, origin) => setSel({
      id,
      origin
    })
  })), node && /*#__PURE__*/React.createElement(FlyCard, {
    node: node,
    origin: sel.origin,
    onClose: () => setSel(null)
  }));
}
window.Cockpit = Cockpit;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lab_cockpit/Cockpit.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lab_cockpit/OrbitalMap.jsx
try { (() => {
/* FENGZIAAA Lab — the cosmos.
   A starfield you drift through; your ideas float around you as content cards,
   each wired back to the central FENGZIAAA hub by a glowing connection line with
   a data-pulse traveling along it. Drag to look around, click a card to expand. */
const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

/* ---------- particle starfield (canvas) ---------- */
function Starfield() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, cx, cy, raf;
    const N = 240;
    const palette = ['255,255,255', '46,230,246', '255,45,155', '176,107,255', '43,255,136'];
    const spawn = z => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: z != null ? z : Math.random() * 0.9 + 0.1,
      t: Math.random(),
      c: palette[Math.random() * palette.length | 0]
    });
    const stars = Array.from({
      length: N
    }, () => spawn());
    const resize = () => {
      w = cv.width = cv.offsetWidth * dpr;
      h = cv.height = cv.offsetHeight * dpr;
      cx = w / 2;
      cy = h / 2;
    };
    resize();
    window.addEventListener('resize', resize);
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const now = performance.now();
      for (const s of stars) {
        s.z -= 0.0015;
        if (s.z <= 0.04) Object.assign(s, spawn(1));
        const k = 0.62 / s.z;
        const sx = cx + s.x * k * cx,
          sy = cy + s.y * k * cy;
        if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) continue;
        const size = (1 - s.z) * 2.4 * dpr + 0.35 * dpr;
        const tw = 0.55 + 0.45 * Math.sin(now / 600 + s.t * 6.28);
        ctx.globalAlpha = Math.min(1, (1 - s.z) * 0.95 * tw + 0.08);
        ctx.fillStyle = 'rgb(' + s.c + ')';
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    className: "fz-stars"
  });
}

/* ---------- floating field of idea cards + connection lines ---------- */
function Field({
  nodes,
  selectedId,
  onSelect
}) {
  const sysRef = useRef(null);
  const linesRef = useRef(null);
  const cardRefs = useRef([]);
  const subRefs = useRef([]);
  const rot = useRef({
    x: -6,
    y: 14
  });
  const vel = useRef({
    y: 0.05
  });
  const drag = useRef(null);
  const moved = useRef(0);
  const hoverRef = useRef(null);
  const P = 2200;
  const R = 620;
  const pts = useMemo(() => nodes.map((n, i) => {
    const k = i + 0.5;
    const phi = Math.acos(1 - 2 * k / nodes.length);
    const theta = Math.PI * (1 + Math.sqrt(5)) * k;
    return {
      x: Math.sin(phi) * Math.cos(theta) * R,
      y: Math.cos(phi) * R * 0.6,
      z: Math.sin(phi) * Math.sin(theta) * R,
      rgb: hexToRgb(n.hex)
    };
  }), [nodes, R]);

  // sub-nodes: each card's own specific content, clustered around it
  const subs = useMemo(() => {
    const out = [];
    nodes.forEach((n, pi) => {
      const p = pts[pi];
      const list = n.sub || [];
      list.forEach((item, j) => {
        const ang = j / Math.max(1, list.length) * Math.PI * 2 + pi * 1.2;
        const rr = 168;
        out.push({
          pi,
          pid: n.id,
          label: item.l,
          href: item.href,
          rgb: hexToRgb(n.hex),
          hex: n.hex,
          tone: n.tone,
          x: p.x + Math.cos(ang) * rr,
          y: p.y + Math.sin(ang) * rr * 0.66,
          z: p.z + Math.sin(ang * 1.7) * rr * 0.8
        });
      });
    });
    return out;
  }, [nodes, pts]);
  useEffect(() => {
    let raf;
    const D = Math.PI / 180;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const lc = linesRef.current;
    const lctx = lc.getContext('2d');
    let W = 0,
      H = 0;
    const resize = () => {
      W = lc.offsetWidth;
      H = lc.offsetHeight;
      lc.width = W * dpr;
      lc.height = H * dpr;
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const tick = () => {
      if (!drag.current) {
        vel.current.y += (0.05 - vel.current.y) * 0.03;
        rot.current.y += vel.current.y;
        rot.current.x += (-6 - rot.current.x) * 0.012;
      }
      const ry = rot.current.y,
        rx = rot.current.x;
      const sys = sysRef.current;
      if (sys) {
        sys.style.setProperty('--ry', ry.toFixed(2) + 'deg');
        sys.style.setProperty('--rx', rx.toFixed(2) + 'deg');
      }
      const ryr = ry * D,
        rxr = rx * D;
      const cosY = Math.cos(ryr),
        sinY = Math.sin(ryr),
        cosX = Math.cos(rxr),
        sinX = Math.sin(rxr);

      // hub (center) in screen space
      const Ox = W / 2,
        Oy = H / 2;
      const hubX = W / 2,
        hubY = 0.52 * H;
      const now = performance.now();
      lctx.clearRect(0, 0, W, H);
      const project = p => {
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const f = P / (P - z2);
        return {
          sx: Ox + x1 * f,
          sy: Oy + (hubY - Oy + y2) * f,
          z2,
          t: (z2 + R) / (2 * R)
        };
      };

      // first pass: geometry per card
      const proj = pts.map(project);
      const sproj = subs.map(project);

      // draw hub -> card connection lines (far first)
      const order = proj.map((_, i) => i).sort((a, b) => proj[a].z2 - proj[b].z2);
      for (const i of order) {
        const pr = proj[i];
        const hovered = hoverRef.current === nodes[i].id || selectedId === nodes[i].id;
        const a = hovered ? 0.85 : 0.08 + pr.t * 0.4;
        const [r, g, b] = pts[i].rgb;
        lctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
        lctx.lineWidth = hovered ? 1.6 : 0.5 + pr.t * 0.9;
        lctx.beginPath();
        lctx.moveTo(hubX, hubY);
        lctx.lineTo(pr.sx, pr.sy);
        lctx.stroke();
        // anchor dot at the card end
        lctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, a + 0.2)})`;
        lctx.beginPath();
        lctx.arc(pr.sx, pr.sy, hovered ? 3 : 1.6 + pr.t, 0, 6.2832);
        lctx.fill();
        // travelling data-pulse hub -> card
        const frac = (now / 2600 + i * 0.137) % 1;
        const px = hubX + (pr.sx - hubX) * frac;
        const py = hubY + (pr.sy - hubY) * frac;
        const pa = (hovered ? 1 : 0.25 + pr.t * 0.6) * (0.5 + 0.5 * Math.sin(frac * Math.PI));
        lctx.fillStyle = `rgba(${r},${g},${b},${pa})`;
        lctx.shadowColor = `rgb(${r},${g},${b})`;
        lctx.shadowBlur = hovered ? 10 : 6;
        lctx.beginPath();
        lctx.arc(px, py, hovered ? 2.6 : 1.8, 0, 6.2832);
        lctx.fill();
        lctx.shadowBlur = 0;
      }

      // draw card -> own-content lines (each card is its own hub)
      subs.forEach((s, j) => {
        const cp = sproj[j];
        const pp = proj[s.pi];
        const hovered = hoverRef.current === s.pid || selectedId === s.pid;
        const [r, g, b] = s.rgb;
        const a = hovered ? 0.8 : 0.05 + cp.t * 0.22;
        lctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
        lctx.lineWidth = hovered ? 1.2 : 0.6;
        lctx.beginPath();
        lctx.moveTo(pp.sx, pp.sy);
        lctx.lineTo(cp.sx, cp.sy);
        lctx.stroke();
        lctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, a + 0.25)})`;
        lctx.beginPath();
        lctx.arc(cp.sx, cp.sy, hovered ? 2.4 : 1.3, 0, 6.2832);
        lctx.fill();
        if (hovered) {
          const frac = (now / 1600 + j * 0.19) % 1;
          const px = pp.sx + (cp.sx - pp.sx) * frac;
          const py = pp.sy + (cp.sy - pp.sy) * frac;
          lctx.fillStyle = `rgba(${r},${g},${b},${0.6 + 0.4 * Math.sin(frac * Math.PI)})`;
          lctx.shadowColor = `rgb(${r},${g},${b})`;
          lctx.shadowBlur = 8;
          lctx.beginPath();
          lctx.arc(px, py, 1.8, 0, 6.2832);
          lctx.fill();
          lctx.shadowBlur = 0;
        }
      });

      // hub core glow
      lctx.fillStyle = 'rgba(46,230,246,.9)';
      lctx.shadowColor = 'rgba(46,230,246,1)';
      lctx.shadowBlur = 16;
      lctx.beginPath();
      lctx.arc(hubX, hubY, 3, 0, 6.2832);
      lctx.fill();
      lctx.shadowBlur = 0;

      // second pass: card depth styling
      proj.forEach((pr, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const hovered = hoverRef.current === nodes[i].id || selectedId === nodes[i].id;
        el.style.opacity = hovered ? '1' : (0.16 + pr.t * 0.84).toFixed(3);
        el.style.zIndex = String(Math.round(pr.z2) + 1000);
        el.style.filter = hovered ? 'none' : pr.t < 0.45 ? 'blur(' + ((0.45 - pr.t) * 4).toFixed(1) + 'px)' : 'none';
        el.style.pointerEvents = pr.t < 0.32 ? 'none' : 'auto';
      });

      // sub-node depth styling
      sproj.forEach((cp, j) => {
        const el = subRefs.current[j];
        if (!el) return;
        const hovered = hoverRef.current === subs[j].pid || selectedId === subs[j].pid;
        el.style.opacity = hovered ? '1' : (0.1 + cp.t * 0.42).toFixed(3);
        el.style.zIndex = String(Math.round(cp.z2) + 1000);
        const chip = el.firstChild;
        if (chip) {
          chip.style.transform = hovered ? 'scale(1.1)' : 'scale(1)';
          // only clickable when near enough to read
          chip.style.pointerEvents = cp.t > 0.46 ? 'auto' : 'none';
        }
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [pts, subs, selectedId, nodes, R]);
  const onDown = e => {
    drag.current = {
      x: e.clientX,
      y: e.clientY
    };
    moved.current = 0;
  };
  const onMove = e => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x,
      dy = e.clientY - drag.current.y;
    drag.current.x = e.clientX;
    drag.current.y = e.clientY;
    moved.current += Math.abs(dx) + Math.abs(dy);
    rot.current.y += dx * 0.28;
    vel.current.y = dx * 0.28;
    rot.current.x = Math.max(-48, Math.min(48, rot.current.x + dy * 0.18));
  };
  const onUp = () => {
    drag.current = null;
  };
  const onCardClick = (e, n) => {
    if (moved.current > 6) return;
    const r = e.currentTarget.getBoundingClientRect();
    onSelect(n.id, {
      cx: r.left + r.width / 2,
      cy: r.top + r.height / 2
    });
  };
  const stat = (icon, val, color) => /*#__PURE__*/React.createElement("span", {
    className: "fz-card-m"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 10,
      height: 10,
      color
    }
  }), val);
  return /*#__PURE__*/React.createElement("div", {
    className: "fz-field",
    onPointerDown: onDown,
    onPointerMove: onMove,
    onPointerUp: onUp,
    onPointerLeave: onUp
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: linesRef,
    className: "fz-lines"
  }), /*#__PURE__*/React.createElement("div", {
    ref: sysRef,
    className: "fz-system",
    style: {
      '--ry': '14deg',
      '--rx': '-6deg'
    }
  }, nodes.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: n.id,
    ref: el => cardRefs.current[i] = el,
    className: "fz-cardpos",
    style: {
      '--x': pts[i].x + 'px',
      '--y': pts[i].y + 'px',
      '--z': pts[i].z + 'px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "fz-card",
    style: {
      '--c': n.tone,
      '--hex': n.hex,
      '--frame': `color-mix(in srgb, ${n.tone} 46%, var(--line))`
    },
    onMouseEnter: () => hoverRef.current = n.id,
    onMouseLeave: () => {
      if (hoverRef.current === n.id) hoverRef.current = null;
    },
    onClick: e => onCardClick(e, n)
  }, /*#__PURE__*/React.createElement("span", {
    className: "fz-card-edge"
  }), /*#__PURE__*/React.createElement("span", {
    className: "fz-card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fz-card-cat"
  }, n.cat), /*#__PURE__*/React.createElement("span", {
    className: "fz-card-stage",
    style: {
      color: n.hex,
      borderColor: `color-mix(in srgb, ${n.hex} 45%, transparent)`
    }
  }, n.progress >= 100 ? 'SHIPPED' : n.progress >= 50 ? 'BUILDING' : n.progress > 0 ? 'EXPLORING' : 'BACKLOG')), /*#__PURE__*/React.createElement("span", {
    className: "fz-card-title"
  }, n.title), /*#__PURE__*/React.createElement("span", {
    className: "fz-card-desc"
  }, n.desc), /*#__PURE__*/React.createElement("span", {
    className: "fz-card-meta"
  }, stat('circle', n.lang, n.hex), stat('git-commit-horizontal', n.commits, 'var(--text-mono)'), stat('star', n.stars, 'var(--amber)'), stat('circle-dot', n.issues, 'var(--text-dim)')), /*#__PURE__*/React.createElement("span", {
    className: "fz-card-bar"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: n.progress + '%',
      background: n.hex,
      boxShadow: `0 0 8px -1px ${n.hex}`
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "fz-card-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fz-card-pct",
    style: {
      color: n.hex
    }
  }, n.progress, "% BUILT"), /*#__PURE__*/React.createElement("span", {
    className: "fz-card-open"
  }, "OPEN ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "maximize-2",
    style: {
      width: 10,
      height: 10
    }
  })))))), subs.map((s, j) => /*#__PURE__*/React.createElement("div", {
    key: s.pid + '-' + j,
    ref: el => subRefs.current[j] = el,
    className: "fz-subpos",
    style: {
      '--x': s.x + 'px',
      '--y': s.y + 'px',
      '--z': s.z + 'px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "fz-sub",
    href: s.href,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      '--hex': s.hex,
      borderColor: `color-mix(in srgb, ${s.hex} 55%, transparent)`
    },
    onMouseEnter: () => hoverRef.current = s.pid,
    onMouseLeave: () => {
      if (hoverRef.current === s.pid) hoverRef.current = null;
    },
    onClick: e => {
      if (moved.current > 6) {
        e.preventDefault();
      } else {
        e.stopPropagation();
      }
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fz-sub-dot",
    style: {
      background: s.hex,
      boxShadow: `0 0 7px -1px ${s.hex}`
    }
  }), s.label, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-up-right",
    style: {
      width: 9,
      height: 9,
      opacity: 0.7
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "fz-center-id"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fz-center-wm"
  }, "FENGZIAAA"), /*#__PURE__*/React.createElement("div", {
    className: "fz-center-dm"
  }, "fengziaaa.com")), /*#__PURE__*/React.createElement("div", {
    className: "fz-map-hint"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "move-3d",
    style: {
      width: 13,
      height: 13
    }
  }), " drag to drift \xB7 grab a card \xB7 click to open"));
}
window.Starfield = Starfield;
window.Field = Field;
window.OrbitalMap = Field; /* back-compat */
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lab_cockpit/OrbitalMap.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lab_cockpit/data.js
try { (() => {
/* Content for the FENGZIAAA cosmos — the ideas that float around you. */
window.FZ_DATA = {
  nodes: [{
    id: 'ai',
    title: 'AI Copilot',
    cat: 'AI / Dev',
    tone: 'var(--node-ai)',
    hex: '#b06bff',
    progress: 60,
    stars: '1.2k',
    updated: '2d',
    lang: 'TypeScript',
    commits: 342,
    issues: 12,
    sub: [{
      l: 'Repo Memory',
      href: 'https://github.com/fengziaaa/ai-copilot'
    }, {
      l: 'Inline Review',
      href: 'https://github.com/fengziaaa/ai-copilot/pulls'
    }, {
      l: 'Test Gen',
      href: 'https://github.com/fengziaaa/ai-copilot#test-gen'
    }],
    desc: 'Context-aware pair programmer',
    blurb: 'A pair programmer that reads your whole repo, remembers the thread, and ships diffs you can actually trust. Inline review, test generation, and a memory of every decision you have made.'
  }, {
    id: 'flow',
    title: 'Flowcraft',
    cat: 'AI / Tools',
    tone: 'var(--node-flow)',
    hex: '#2bff88',
    progress: 75,
    stars: '860',
    updated: '5h',
    lang: 'Rust',
    commits: 489,
    issues: 7,
    sub: [{
      l: 'Node Canvas',
      href: 'https://github.com/fengziaaa/flowcraft'
    }, {
      l: 'Tool Routing',
      href: 'https://github.com/fengziaaa/flowcraft#routing'
    }, {
      l: 'Run Replay',
      href: 'https://github.com/fengziaaa/flowcraft#replay'
    }],
    desc: 'Visual AI workflow builder',
    blurb: 'Drag nodes, wire prompts, watch data flow. Build agentic pipelines without leaving the canvas — branch on model output, fan out to tools, and replay any run step by step.'
  }, {
    id: 'radar',
    title: 'Dev Radar',
    cat: 'Analytics',
    tone: 'var(--node-radar)',
    hex: '#2ee6f6',
    progress: 40,
    stars: '410',
    updated: '1d',
    lang: 'Go',
    commits: 211,
    issues: 23,
    sub: [{
      l: 'Live Feed',
      href: 'https://github.com/fengziaaa/dev-radar'
    }, {
      l: 'Repo Health',
      href: 'https://github.com/fengziaaa/dev-radar#health'
    }, {
      l: 'Trends',
      href: 'https://github.com/fengziaaa/dev-radar#trends'
    }],
    desc: 'Real-time dev insights',
    blurb: 'Live telemetry across every repo — what shipped, what broke, what is trending in your stack. A single pane that turns scattered GitHub signals into a heartbeat.'
  }, {
    id: 'blog',
    title: 'Neon Blog',
    cat: 'Content',
    tone: 'var(--node-blog)',
    hex: '#ff2d9b',
    progress: 80,
    stars: '2.4k',
    updated: '8h',
    lang: 'MDX',
    commits: 156,
    issues: 3,
    sub: [{
      l: 'Building in Public',
      href: 'https://fengziaaa.com/blog/building-in-public'
    }, {
      l: 'AI Notes',
      href: 'https://fengziaaa.com/blog/ai'
    }, {
      l: 'RSS Feed',
      href: 'https://fengziaaa.com/rss.xml'
    }],
    desc: 'Thoughts on code, AI & the future',
    blurb: 'Long-form notes from building in public. Code, AI, and the occasional 2am idea — written raw, shipped fast, and indexed so future-me can actually find them.'
  }, {
    id: 'os',
    title: 'Open Source Hub',
    cat: 'Platform',
    tone: 'var(--node-os)',
    hex: '#ffae3a',
    progress: 30,
    stars: '320',
    updated: '3d',
    lang: 'Various',
    commits: 98,
    issues: 41,
    sub: [{
      l: 'Templates',
      href: 'https://github.com/fengziaaa?tab=repositories'
    }, {
      l: 'Bounty Board',
      href: 'https://fengziaaa.com/open-source/bounties'
    }, {
      l: 'Snippets',
      href: 'https://fengziaaa.com/snippets'
    }],
    desc: 'Developer resources platform',
    blurb: 'A hub of reusable building blocks — give back to the community, one commit at a time. Templates, starters, and battle-tested snippets with a bounty board on top.'
  }, {
    id: 'git3d',
    title: 'Visual Git 3D',
    cat: 'Tooling',
    tone: 'var(--node-radar)',
    hex: '#2ee6f6',
    progress: 18,
    stars: '95',
    updated: '6d',
    lang: 'WebGL',
    commits: 64,
    issues: 9,
    sub: [{
      l: 'Branch Orbits',
      href: 'https://github.com/fengziaaa/visual-git-3d#orbits'
    }, {
      l: 'Commit Stars',
      href: 'https://github.com/fengziaaa/visual-git-3d#stars'
    }, {
      l: 'Fly-through',
      href: 'https://github.com/fengziaaa/visual-git-3d#flythrough'
    }],
    desc: 'See your history in 3D',
    blurb: 'Branches as orbits, commits as stars. Fly through your repository history in a spatial graph and finally understand that merge from six months ago.'
  }, {
    id: 'prompt',
    title: 'Prompt Library',
    cat: 'AI / Tools',
    tone: 'var(--node-ai)',
    hex: '#b06bff',
    progress: 52,
    stars: '640',
    updated: '12h',
    lang: 'Python',
    commits: 178,
    issues: 5,
    sub: [{
      l: 'Versioning',
      href: 'https://github.com/fengziaaa/prompt-library#versioning'
    }, {
      l: 'A/B Test',
      href: 'https://github.com/fengziaaa/prompt-library#ab-test'
    }, {
      l: 'Export',
      href: 'https://github.com/fengziaaa/prompt-library#export'
    }],
    desc: 'Reusable prompt snippets',
    blurb: 'A versioned, taggable home for the prompts that actually work. Fork, test against models side by side, and drop the winner straight into your codebase.'
  }, {
    id: 'time',
    title: 'Time Machine',
    cat: 'Tooling',
    tone: 'var(--node-blog)',
    hex: '#ff2d9b',
    progress: 12,
    stars: '48',
    updated: '9d',
    lang: 'TypeScript',
    commits: 41,
    issues: 14,
    sub: [{
      l: 'Snapshots',
      href: 'https://github.com/fengziaaa/time-machine#snapshots'
    }, {
      l: 'Diff View',
      href: 'https://github.com/fengziaaa/time-machine#diff'
    }, {
      l: 'Restore',
      href: 'https://github.com/fengziaaa/time-machine#restore'
    }],
    desc: 'Replay any project state',
    blurb: 'Scrub your project like a video. Jump to any past state, diff two moments in time, and resurrect that file you deleted three refactors ago.'
  }, {
    id: 'stack',
    title: 'Vibe Stack',
    cat: 'DevOps',
    tone: 'var(--node-flow)',
    hex: '#2bff88',
    progress: 100,
    stars: '1.6k',
    updated: '1d',
    lang: 'Shell',
    commits: 523,
    issues: 2,
    sub: [{
      l: 'Dotfiles',
      href: 'https://github.com/fengziaaa/vibe-stack'
    }, {
      l: 'Secrets',
      href: 'https://github.com/fengziaaa/vibe-stack#secrets'
    }, {
      l: 'One-Command',
      href: 'https://github.com/fengziaaa/vibe-stack#install'
    }],
    desc: 'One command, any machine',
    blurb: 'Dotfiles, environments, and secrets that follow you everywhere. One command spins up a fresh machine into your exact setup — shipped and battle-tested daily.'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lab_cockpit/data.js", error: String((e && e.message) || e) }); }

// ui_kits/lab_cockpit/hud.jsx
try { (() => {
/* FENGZIAAA Lab Cockpit — shared HUD primitives (window-attached) */
const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;
const Icon = ({
  n,
  size = 16,
  color,
  style
}) => /*#__PURE__*/React.createElement("i", {
  "data-lucide": n,
  style: {
    width: size,
    height: size,
    color,
    ...style
  }
});
function Panel({
  label,
  accent = 'var(--cyan)',
  dot,
  live,
  right,
  notch = 'var(--notch)',
  pad = 'var(--panel-pad)',
  style,
  bodyStyle,
  children
}) {
  const frame = accent ? `color-mix(in srgb, ${accent} 55%, var(--line))` : undefined;
  return /*#__PURE__*/React.createElement("div", {
    className: "fz-panel",
    style: {
      '--notch-size': notch,
      '--frame': frame,
      ...style
    }
  }, label != null && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      padding: '9px 14px',
      borderBottom: '1px solid var(--line-dim)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    className: live ? 'fz-dot is-live' : 'fz-dot',
    style: {
      background: accent,
      color: accent,
      width: 6,
      height: 6
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 10,
      letterSpacing: '.24em',
      textTransform: 'uppercase',
      color: 'var(--text-dim)'
    }
  }, label)), right != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 10,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: accent
    }
  }, right)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: pad,
      ...bodyStyle
    }
  }, children));
}
function StatusPill({
  children,
  tone = 'var(--green)',
  live,
  dot = true
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '3px 9px',
      borderRadius: 999,
      background: `color-mix(in srgb, ${tone} 12%, transparent)`,
      border: `1px solid color-mix(in srgb, ${tone} 45%, transparent)`,
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 9,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: tone
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    className: live ? 'fz-dot is-live' : 'fz-dot',
    style: {
      background: tone,
      color: tone,
      width: 6,
      height: 6
    }
  }), children);
}
function Tag({
  children,
  tone = 'var(--cyan)',
  solid
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 7px',
      borderRadius: 2,
      background: solid ? tone : `color-mix(in srgb, ${tone} 10%, transparent)`,
      border: `1px solid color-mix(in srgb, ${tone} 40%, transparent)`,
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 9,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: solid ? 'var(--text-on-neon)' : tone,
      whiteSpace: 'nowrap'
    }
  }, children);
}
function ProgressBar({
  value = 0,
  tone = 'var(--green)',
  height = 5,
  showValue
}) {
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height,
      background: 'var(--bg-deep)',
      borderRadius: 999,
      overflow: 'hidden',
      boxShadow: 'inset 0 0 0 1px var(--line-faint)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      background: tone,
      borderRadius: 999,
      boxShadow: `0 0 10px -1px ${tone}`,
      transition: 'width .5s var(--ease-hud)'
    }
  })), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: tone,
      minWidth: 32,
      textAlign: 'right'
    }
  }, pct, "%"));
}
function StatItem({
  label,
  value,
  tone = 'var(--text-bright)',
  glow,
  align = 'left'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      alignItems: align === 'right' ? 'flex-end' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 9,
      letterSpacing: '.2em',
      textTransform: 'uppercase',
      color: 'var(--text-dim)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 15,
      color: tone,
      textShadow: glow ? `0 0 10px ${tone}` : 'none'
    }
  }, value));
}
function RadialGauge({
  value = 0,
  max = 100,
  size = 150,
  stroke = 9,
  tone = 'var(--green)',
  label
}) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = (size - stroke) / 2,
    c = 2 * Math.PI * r;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--bg-deep)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: tone,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: c * (1 - pct),
    style: {
      filter: `drop-shadow(0 0 6px ${tone})`,
      transition: 'stroke-dashoffset 1s var(--ease-hud)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: size * 0.3,
      color: tone,
      textShadow: `0 0 12px ${tone}`,
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-dim)',
      marginTop: 2
    }
  }, label || `/${max}`)));
}
function Waveform({
  bars = 40,
  tone = 'var(--green)',
  height = 30,
  seed = 7,
  animated = true
}) {
  const heights = useMemo(() => {
    let s = seed;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({
      length: bars
    }, () => 0.22 + rnd() * 0.78);
  }, [bars, seed]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 2,
      height
    }
  }, heights.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: `${h * 100}%`,
      background: tone,
      borderRadius: 1,
      opacity: 0.85,
      boxShadow: `0 0 6px -2px ${tone}`,
      transformOrigin: 'bottom',
      animation: animated ? `fz-pulse ${1 + i % 5 * 0.18}s ease-in-out ${i * 0.03}s infinite` : 'none'
    }
  })));
}
const LOG_COLORS = {
  INFO: 'var(--cyan)',
  OK: 'var(--green)',
  DATA: 'var(--blue-bright)',
  SYNC: 'var(--purple)',
  WARN: 'var(--amber)',
  ERR: 'var(--red)'
};
function ConsoleLog({
  lines = [],
  prompt
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      lineHeight: 1.85
    }
  }, lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)'
    }
  }, l.time), /*#__PURE__*/React.createElement("span", {
    style: {
      color: LOG_COLORS[l.tag] || 'var(--text-mono)',
      minWidth: 46
    }
  }, "[", l.tag, "]"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text)'
    }
  }, l.msg))), prompt && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      color: 'var(--green)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cyan)'
    }
  }, ">"), " ", prompt, /*#__PURE__*/React.createElement("span", {
    style: {
      animation: 'fz-blink 1s steps(1) infinite'
    }
  }, "\u258B")));
}
function QuickTile({
  icon,
  label,
  tone = 'var(--cyan)',
  onClick
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '14px 6px',
      background: h ? `color-mix(in srgb, ${tone} 12%, var(--bg-deep))` : 'var(--bg-deep)',
      border: `1px solid ${h ? tone : 'var(--line-dim)'}`,
      color: h ? tone : 'var(--text)',
      cursor: 'pointer',
      transition: 'all .2s var(--ease-hud)',
      boxShadow: h ? `0 0 16px -6px ${tone}` : 'none',
      clipPath: 'polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: icon,
    size: 19,
    color: h ? tone : 'var(--text-mono)'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-techno)',
      fontWeight: 600,
      fontSize: 9,
      letterSpacing: '.08em',
      textTransform: 'uppercase'
    }
  }, label));
}
function NeonButton({
  children,
  variant = 'outline',
  tone = 'var(--cyan)',
  size = 'md',
  icon,
  iconRight,
  onClick,
  style
}) {
  const [h, setH] = useState(false);
  const pads = {
    sm: '6px 12px',
    md: '11px 20px',
    lg: '15px 28px'
  };
  const fonts = {
    sm: 9,
    md: 11,
    lg: 12
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: pads[size],
    fontFamily: 'var(--font-techno)',
    fontWeight: 600,
    fontSize: fonts[size],
    letterSpacing: '.16em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    borderRadius: 3,
    clipPath: 'polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)',
    transition: 'all .2s var(--ease-hud)',
    whiteSpace: 'nowrap'
  };
  const variants = {
    solid: {
      background: tone,
      color: 'var(--text-on-neon)',
      border: 'none',
      boxShadow: h ? `0 0 24px -2px ${tone}` : `0 0 18px -3px ${tone}`
    },
    outline: {
      background: h ? `color-mix(in srgb, ${tone} 18%, transparent)` : `color-mix(in srgb, ${tone} 8%, transparent)`,
      color: tone,
      border: `1px solid ${tone}`,
      boxShadow: `0 0 14px -4px ${tone}`,
      textShadow: `0 0 8px ${tone}`
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-dim)',
      border: '1px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, icon, children, iconRight);
}
Object.assign(window, {
  Icon,
  Panel,
  StatusPill,
  Tag,
  ProgressBar,
  StatItem,
  RadialGauge,
  Waveform,
  ConsoleLog,
  QuickTile,
  NeonButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lab_cockpit/hud.jsx", error: String((e && e.message) || e) }); }

__ds_ns.NeonButton = __ds_scope.NeonButton;

__ds_ns.QuickTile = __ds_scope.QuickTile;

__ds_ns.ConsoleLog = __ds_scope.ConsoleLog;

__ds_ns.IdeaCard = __ds_scope.IdeaCard;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.RadialGauge = __ds_scope.RadialGauge;

__ds_ns.StatItem = __ds_scope.StatItem;

__ds_ns.Waveform = __ds_scope.Waveform;

__ds_ns.HudPanel = __ds_scope.HudPanel;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.Tag = __ds_scope.Tag;

})();
