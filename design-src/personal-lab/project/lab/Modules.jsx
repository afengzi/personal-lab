/* FENGZIAAA Lab — module detail overlays.
   Each system module is a node in the cosmos; click it and its full panel flies
   to the front. One overlay shell, a different body per module id. */
const { useState: useM, useEffect: useME, useRef: useMR } = React;

function pad2m(n) { return String(n).padStart(2, '0'); }

function useClockM() {
  const [now, setNow] = useM(() => new Date('2025-05-23T22:48:36'));
  useME(() => { const id = setInterval(() => setNow((d) => new Date(d.getTime() + 1000)), 1000); return () => clearInterval(id); }, []);
  const time = `${pad2m(now.getHours())}:${pad2m(now.getMinutes())}:${pad2m(now.getSeconds())}`;
  return `2025-05-23 ${time}`;
}
function useConsoleM(seed, stream) {
  const [lines, setLines] = useM(seed);
  const i = useMR(0);
  useME(() => {
    const id = setInterval(() => {
      const s = stream[i.current % stream.length]; i.current++;
      const t = new Date();
      setLines((ls) => [...ls.slice(-7), { time: `${pad2m(t.getHours())}:${pad2m(t.getMinutes())}:${pad2m(t.getSeconds())}`, tag: s.tag, msg: s.msg }]);
    }, 2200);
    return () => clearInterval(id);
  }, []);
  return lines;
}
function EqM({ tone, n = 30 }) {
  return (
    <div className="eq">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ height: '100%', background: tone, opacity: .85, boxShadow: `0 0 6px -2px ${tone}`, animation: `eqbar ${0.7 + (i % 6) * 0.13}s ease-in-out ${i * 0.04}s infinite alternate` }} />
      ))}
    </div>
  );
}

const SectionLabel = ({ children, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '4px 0 10px' }}>
    <span className="fz-label">{children}</span>{color}
  </div>
);

/* ---------- per-module bodies ---------- */
function GithubBody({ d }) {
  const o = d.owner;
  return (
    <div>
      <div className="gh-profile">
        <div className="gh-avatar"><img src="assets/logo-mark.svg" alt="fz" /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="gh-name">{o.handle}</div>
          <div className="gh-bio">{o.tagline}</div>
          <div className="gh-meta">
            <span><Icon n="map-pin" size={11} color="var(--text-dim)" />{o.location}</span>
            <span><Icon n="link" size={11} color="var(--text-dim)" />{o.url}</span>
          </div>
        </div>
        <StatusPill tone="var(--green)" live>Live</StatusPill>
      </div>
      <div className="gh-stats">
        <div className="gh-stat"><div className="n">{o.repos}</div><div className="l">Repos</div></div>
        <div className="gh-stat"><div className="n">{o.followers}</div><div className="l">Followers</div></div>
        <div className="gh-stat"><div className="n">{o.following}</div><div className="l">Following</div></div>
        <div className="gh-stat"><div className="n">{o.contributions}</div><div className="l">Commits</div></div>
      </div>
      <SectionLabel>Recent Activity</SectionLabel>
      {d.activity.map((a, i) => (
        <div className="act-row" key={i}>
          <div className="act-ico"><Icon n={a.icon} size={12} color={a.tone} /></div>
          <div className="act-main"><div className="act-t">{a.title}</div><div className="act-s">{a.sub}</div></div>
          <div className="act-time">{a.time}</div>
        </div>
      ))}
    </div>
  );
}

function ConsoleBody({ d }) {
  const lines = useConsoleM(d.console, d.consoleStream);
  const date = useClockM();
  return (
    <div>
      <SectionLabel>Log Stream · {date}</SectionLabel>
      <div className="fz-panel" style={{ '--notch-size': '8px', padding: '14px 16px', background: 'var(--bg-deep)' }}>
        <ConsoleLog lines={lines} prompt="vibe mode: ENABLED" />
      </div>
    </div>
  );
}

function MissionBody({ d }) {
  const [g, setG] = useM(0);
  useME(() => { const t = setTimeout(() => setG(d.mission.value), 250); return () => clearTimeout(t); }, []);
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, alignItems: 'center' }}>
        <RadialGauge value={g} max={100} size={150} stroke={11} tone="var(--green)" label="/100" />
        <div className="mission-stats">
          <div className="ms-row"><span className="ms-k">Mission Progress</span><span className="ms-v" style={{ color: 'var(--green)' }}>{d.mission.value}%</span></div>
          <div className="ms-row"><span className="ms-k">Ideas Received</span><span className="ms-v">{d.mission.received}</span></div>
          <div className="ms-row"><span className="ms-k">Ideas Completed</span><span className="ms-v" style={{ color: 'var(--green)' }}>{d.mission.completed}</span></div>
          <div className="ms-row"><span className="ms-k">In Progress</span><span className="ms-v" style={{ color: 'var(--amber)' }}>{d.mission.inProgress}</span></div>
        </div>
      </div>
      <div style={{ margin: '18px 0 6px' }}><Waveform bars={40} tone="var(--green)" height={34} animated /></div>
      <div className="mission-foot">Build 100 ideas. Inspire millions.</div>
    </div>
  );
}

function VisitorBody({ d, onOpenSubmit }) {
  const [votes, setVotes] = useM(() => Object.fromEntries(d.visitor.map((v) => [v.id, { n: v.votes, on: false }])));
  const vote = (id) => setVotes((v) => { const c = v[id]; return { ...v, [id]: { n: c.on ? c.n - 1 : c.n + 1, on: !c.on } }; });
  return (
    <div>
      <SectionLabel>{d.visitor.length} Submissions · ↑ 7 New</SectionLabel>
      {d.visitor.map((v) => (
        <div className="vi-row" key={v.id}>
          <div className="vi-ico"><Icon n="lightbulb" size={14} color="var(--amber)" /></div>
          <div className="vi-main"><div className="vi-title">{v.title}</div><div className="vi-handle">{v.handle}</div></div>
          <div className="vi-time">{v.time}</div>
          <button type="button" className={'vote-btn' + (votes[v.id].on ? ' voted' : '')} onClick={() => vote(v.id)}>
            <Icon n="chevron-up" size={13} color="var(--green)" /><span>{votes[v.id].n}</span>
          </button>
        </div>
      ))}
      <div style={{ marginTop: 16 }}><NeonButton variant="outline" tone="var(--green)" icon={<Icon n="plus" size={14} />} onClick={onOpenSubmit}>Submit your idea</NeonButton></div>
    </div>
  );
}

function QuickBody({ d, onNav }) {
  return (
    <div>
      <SectionLabel>Jump to any module</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 11 }}>
        {d.quick.map((q) => <QuickTile key={q.id} icon={q.icon} label={q.label} tone={q.tone} onClick={() => onNav(q.id)} />)}
      </div>
    </div>
  );
}

function TelemetryBody() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="fz-panel" style={{ '--notch-size': '8px', padding: 0 }}><div className="foot-panel" style={{ height: 66 }}><div className="foot-l"><span className="foot-k">Data Intake</span><span className="foot-v" style={{ color: 'var(--green)' }}>▲ 42.7 MB/s</span></div><div className="foot-wave"><Waveform bars={46} tone="var(--green)" height={30} animated /></div></div></div>
      <div className="fz-panel" style={{ '--notch-size': '8px', padding: 0 }}><div className="foot-panel" style={{ height: 66 }}><div className="foot-l"><span className="foot-k">Lab Signal</span><span className="foot-v" style={{ color: 'var(--cyan)' }}>STRONG</span></div><EqM tone="var(--cyan)" n={32} /></div></div>
      <div className="fz-panel" style={{ '--notch-size': '8px', padding: 0 }}><div className="foot-panel" style={{ height: 66 }}><div className="foot-l"><span className="foot-k">Vibe Level</span><span className="foot-v" style={{ color: 'var(--magenta)' }}>HIGH</span></div><div className="foot-wave"><Waveform bars={46} tone="var(--magenta)" height={30} seed={19} animated /></div></div></div>
    </div>
  );
}

const MOD_WIDTH = { github: 530, console: 560, mission: 600, visitor: 530, quick: 560, telemetry: 600 };

function ModuleDetail({ node, d, onClose, onNav, onOpenSubmit }) {
  const ref = useMR(null);
  useME(() => { window.lucide && window.lucide.createIcons(); });
  useME(() => {
    const el = ref.current;
    if (!el || !el.animate) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.animate([{ transform: 'scale(.82)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 360, easing: 'cubic-bezier(.22,1,.36,1)' });
  }, [node.id]);

  const w = MOD_WIDTH[node.id] || 540;
  let Body = null;
  if (node.id === 'github') Body = <GithubBody d={d} />;
  else if (node.id === 'console') Body = <ConsoleBody d={d} />;
  else if (node.id === 'mission') Body = <MissionBody d={d} />;
  else if (node.id === 'visitor') Body = <VisitorBody d={d} onOpenSubmit={onOpenSubmit} />;
  else if (node.id === 'quick') Body = <QuickBody d={d} onNav={onNav} />;
  else if (node.id === 'telemetry') Body = <TelemetryBody />;

  return (
    <div className="fz-fly-scrim" onClick={onClose}>
      <div ref={ref} className="fz-fly-card" onClick={(e) => e.stopPropagation()} style={{ width: `min(${w}px, 94vw)`, '--hex': node.hex, '--frame': `color-mix(in srgb, ${node.tone} 60%, var(--line))` }}>
        <div className="fz-fly-glow" style={{ background: `radial-gradient(120% 150% at 8% 0%, color-mix(in srgb, ${node.tone} 26%, transparent), transparent 58%)` }} />
        <div className="fz-fly-edge" style={{ background: node.hex, boxShadow: `0 0 16px 1px ${node.hex}` }} />
        <button type="button" className="fz-fly-close" onClick={onClose}><i data-lucide="x" style={{ width: 16, height: 16 }}></i></button>
        <div style={{ position: 'relative', padding: '28px 30px 28px' }}>
          <div className="mod-detail-head">
            <div className="mod-detail-ic" style={{ '--hex': node.hex }}><Icon n={node.icon} size={24} color={node.hex} /></div>
            <div><div className="mod-detail-cat">System Module</div><div className="mod-detail-title" style={{ textShadow: `0 0 16px ${node.hex}` }}>{node.title}</div></div>
          </div>
          <div className="mod-body fz-scroll">{Body}</div>
        </div>
      </div>
    </div>
  );
}

window.ModuleDetail = ModuleDetail;
