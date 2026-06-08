/* FENGZIAAA Lab Cockpit — shared HUD primitives (window-attached) */
const { useState, useEffect, useMemo, useRef } = React;

const Icon = ({ n, size = 16, color, style }) => (
  <i data-lucide={n} style={{ width: size, height: size, color, ...style }}></i>
);

function Panel({ label, accent = 'var(--cyan)', dot, live, right, notch = 'var(--notch)', pad = 'var(--panel-pad)', style, bodyStyle, children }) {
  const frame = accent ? `color-mix(in srgb, ${accent} 55%, var(--line))` : undefined;
  return (
    <div className="fz-panel" style={{ '--notch-size': notch, '--frame': frame, ...style }}>
      {label != null && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '9px 14px', borderBottom: '1px solid var(--line-dim)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {dot && <span className={live ? 'fz-dot is-live' : 'fz-dot'} style={{ background: accent, color: accent, width: 6, height: 6 }} />}
            <span style={{ fontFamily: 'var(--font-techno)', fontWeight: 600, fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{label}</span>
          </div>
          {right != null && <span style={{ fontFamily: 'var(--font-techno)', fontWeight: 600, fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: accent }}>{right}</span>}
        </div>
      )}
      <div style={{ padding: pad, ...bodyStyle }}>{children}</div>
    </div>
  );
}

function StatusPill({ children, tone = 'var(--green)', live, dot = true }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 9px', borderRadius: 999, background: `color-mix(in srgb, ${tone} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${tone} 45%, transparent)`, fontFamily: 'var(--font-techno)', fontWeight: 600, fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: tone }}>
      {dot && <span className={live ? 'fz-dot is-live' : 'fz-dot'} style={{ background: tone, color: tone, width: 6, height: 6 }} />}
      {children}
    </span>
  );
}

function Tag({ children, tone = 'var(--cyan)', solid }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 7px', borderRadius: 2, background: solid ? tone : `color-mix(in srgb, ${tone} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${tone} 40%, transparent)`, fontFamily: 'var(--font-techno)', fontWeight: 600, fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', color: solid ? 'var(--text-on-neon)' : tone, whiteSpace: 'nowrap' }}>{children}</span>
  );
}

function ProgressBar({ value = 0, tone = 'var(--green)', height = 5, showValue }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height, background: 'var(--bg-deep)', borderRadius: 999, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px var(--line-faint)' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: tone, borderRadius: 999, boxShadow: `0 0 10px -1px ${tone}`, transition: 'width .5s var(--ease-hud)' }} />
      </div>
      {showValue && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: tone, minWidth: 32, textAlign: 'right' }}>{pct}%</span>}
    </div>
  );
}

function StatItem({ label, value, tone = 'var(--text-bright)', glow, align = 'left' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: align === 'right' ? 'flex-end' : 'flex-start' }}>
      <span style={{ fontFamily: 'var(--font-techno)', fontWeight: 600, fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: tone, textShadow: glow ? `0 0 10px ${tone}` : 'none' }}>{value}</span>
    </div>
  );
}

function RadialGauge({ value = 0, max = 100, size = 150, stroke = 9, tone = 'var(--green)', label }) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg-deep)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={tone} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} style={{ filter: `drop-shadow(0 0 6px ${tone})`, transition: 'stroke-dashoffset 1s var(--ease-hud)' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: size * 0.3, color: tone, textShadow: `0 0 12px ${tone}`, lineHeight: 1 }}>{value}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>{label || `/${max}`}</span>
      </div>
    </div>
  );
}

function Waveform({ bars = 40, tone = 'var(--green)', height = 30, seed = 7, animated = true }) {
  const heights = useMemo(() => {
    let s = seed; const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    return Array.from({ length: bars }, () => 0.22 + rnd() * 0.78);
  }, [bars, seed]);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height }}>
      {heights.map((h, i) => (
        <div key={i} style={{ flex: 1, height: `${h * 100}%`, background: tone, borderRadius: 1, opacity: 0.85, boxShadow: `0 0 6px -2px ${tone}`, transformOrigin: 'bottom', animation: animated ? `fz-pulse ${1 + (i % 5) * 0.18}s ease-in-out ${i * 0.03}s infinite` : 'none' }} />
      ))}
    </div>
  );
}

const LOG_COLORS = { INFO: 'var(--cyan)', OK: 'var(--green)', DATA: 'var(--blue-bright)', SYNC: 'var(--purple)', WARN: 'var(--amber)', ERR: 'var(--red)' };
function ConsoleLog({ lines = [], prompt }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.85 }}>
      {lines.map((l, i) => (
        <div key={i} style={{ display: 'flex', gap: 8 }}>
          <span style={{ color: 'var(--text-faint)' }}>{l.time}</span>
          <span style={{ color: LOG_COLORS[l.tag] || 'var(--text-mono)', minWidth: 46 }}>[{l.tag}]</span>
          <span style={{ color: 'var(--text)' }}>{l.msg}</span>
        </div>
      ))}
      {prompt && <div style={{ marginTop: 6, color: 'var(--green)' }}><span style={{ color: 'var(--cyan)' }}>&gt;</span> {prompt}<span style={{ animation: 'fz-blink 1s steps(1) infinite' }}>▋</span></div>}
    </div>
  );
}

function QuickTile({ icon, label, tone = 'var(--cyan)', onClick }) {
  const [h, setH] = useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 6px', background: h ? `color-mix(in srgb, ${tone} 12%, var(--bg-deep))` : 'var(--bg-deep)', border: `1px solid ${h ? tone : 'var(--line-dim)'}`, color: h ? tone : 'var(--text)', cursor: 'pointer', transition: 'all .2s var(--ease-hud)', boxShadow: h ? `0 0 16px -6px ${tone}` : 'none', clipPath: 'polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)' }}>
      <Icon n={icon} size={19} color={h ? tone : 'var(--text-mono)'} />
      <span style={{ fontFamily: 'var(--font-techno)', fontWeight: 600, fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</span>
    </button>
  );
}

function NeonButton({ children, variant = 'outline', tone = 'var(--cyan)', size = 'md', icon, iconRight, onClick, style }) {
  const [h, setH] = useState(false);
  const pads = { sm: '6px 12px', md: '11px 20px', lg: '15px 28px' };
  const fonts = { sm: 9, md: 11, lg: 12 };
  const base = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: pads[size], fontFamily: 'var(--font-techno)', fontWeight: 600, fontSize: fonts[size], letterSpacing: '.16em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 3, clipPath: 'polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)', transition: 'all .2s var(--ease-hud)', whiteSpace: 'nowrap' };
  const variants = {
    solid: { background: tone, color: 'var(--text-on-neon)', border: 'none', boxShadow: h ? `0 0 24px -2px ${tone}` : `0 0 18px -3px ${tone}` },
    outline: { background: h ? `color-mix(in srgb, ${tone} 18%, transparent)` : `color-mix(in srgb, ${tone} 8%, transparent)`, color: tone, border: `1px solid ${tone}`, boxShadow: `0 0 14px -4px ${tone}`, textShadow: `0 0 8px ${tone}` },
    ghost: { background: 'transparent', color: 'var(--text-dim)', border: '1px solid transparent' },
  };
  return <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ ...base, ...variants[variant], ...style }}>{icon}{children}{iconRight}</button>;
}

Object.assign(window, { Icon, Panel, StatusPill, Tag, ProgressBar, StatItem, RadialGauge, Waveform, ConsoleLog, QuickTile, NeonButton });
