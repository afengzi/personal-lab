/* FENGZIAAA Lab — app shell.
   HOME = the cosmos: a clean starfield with your ideas floating around you.
   Detail stays hidden until you click an idea — then its full card flies to the
   front. A minimal HUD (brand · status · submit · roadmap) is all that shows.
   ROADMAP = the connected Ideas Kanban. */
const { useState: useS, useEffect: useE, useRef: useR } = React;

const DESIGN_W = 1600, DESIGN_H = 1150;
const ACCENTS = { Cyan: '#2ee6f6', Magenta: '#ff2d9b', Purple: '#b06bff', Green: '#2bff88' };
const STAR_COUNT = { sparse: 130, medium: 240, dense: 380 };

function stageOf(p) {
  if (p >= 100) return { label: 'Shipped', tone: 'var(--green)' };
  if (p >= 50) return { label: 'Building', tone: 'var(--amber)' };
  if (p > 0) return { label: 'Exploring', tone: 'var(--purple)' };
  return { label: 'Backlog', tone: 'var(--cyan)' };
}

/* ---------- fly-to-front idea detail (revealed on click) ---------- */
function FlyCard({ node, origin, onClose }) {
  const ref = useR(null);
  const st = stageOf(node.progress);
  useE(() => { window.lucide && window.lucide.createIcons(); });
  useE(() => {
    const el = ref.current;
    if (!el || !el.animate) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ox = origin ? origin.cx : window.innerWidth / 2;
    const oy = origin ? origin.cy : window.innerHeight / 2;
    const dx = Math.round(ox - window.innerWidth / 2), dy = Math.round(oy - window.innerHeight / 2);
    el.animate([{ transform: `translate(${dx}px,${dy}px) scale(0.16)`, opacity: 0.4 }, { transform: 'translate(0,0) scale(1)', opacity: 1 }],
      { duration: 500, easing: 'cubic-bezier(.22,1,.36,1)' });
  }, [node.id]);

  return (
    <div className="fz-fly-scrim" onClick={onClose}>
      <div ref={ref} className="fz-fly-card" onClick={(e) => e.stopPropagation()} style={{ '--frame': `color-mix(in srgb, ${node.tone} 60%, var(--line))` }}>
        <div className="fz-fly-glow" style={{ background: `radial-gradient(120% 150% at 8% 0%, color-mix(in srgb, ${node.tone} 28%, transparent), transparent 58%)` }} />
        <div className="fz-fly-edge" style={{ background: node.hex, boxShadow: `0 0 16px 1px ${node.hex}` }} />
        <button type="button" className="fz-fly-close" onClick={onClose}><i data-lucide="x" style={{ width: 16, height: 16 }}></i></button>
        <div style={{ position: 'relative', padding: '30px 32px 28px' }}>
          <div style={{ fontFamily: 'var(--font-techno)', fontWeight: 600, fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: node.tone }}>{node.cat}</div>
          <div style={{ fontFamily: 'var(--font-techno)', fontWeight: 700, fontSize: 34, color: '#fff', textShadow: `0 0 18px ${node.hex}`, lineHeight: 1.05, margin: '6px 0 0' }}>{node.title}</div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14.5, lineHeight: 1.65, color: 'var(--text)', margin: '18px 0 22px', maxWidth: 480 }}>{node.blurb}</p>
          <div className="fz-fly-stats">
            <div><div className="k">Stage</div><div className="v" style={{ color: st.tone, textShadow: `0 0 10px ${st.tone}` }}>{st.label}</div></div>
            <div><div className="k">Progress</div><div className="v" style={{ color: node.hex }}>{node.progress}%</div></div>
            <div><div className="k">Stars</div><div className="v" style={{ color: 'var(--amber)' }}>{node.stars}</div></div>
            <div><div className="k">Updated</div><div className="v" style={{ color: 'var(--cyan)' }}>{node.updated} ago</div></div>
          </div>
          <div style={{ margin: '18px 0 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontFamily: 'var(--font-techno)', fontWeight: 600, fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Build Progress</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: node.tone }}>{node.progress}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 999, background: 'var(--bg-deep)', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px var(--line-faint)' }}>
              <div style={{ width: node.progress + '%', height: '100%', borderRadius: 999, background: node.tone, boxShadow: `0 0 12px -1px ${node.tone}` }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginBottom: 18 }}>
            {node.sub.map((s) => (
              <a key={s.l} href={s.href} onClick={(e) => e.preventDefault()} className="fz-sub" style={{ '--hex': node.hex, borderColor: `color-mix(in srgb, ${node.hex} 55%, transparent)`, fontSize: 11, padding: '6px 11px' }}>
                <span className="fz-sub-dot" style={{ background: node.hex, boxShadow: `0 0 7px -1px ${node.hex}` }} />{s.l}
                <i data-lucide="arrow-up-right" style={{ width: 11, height: 11, opacity: .7 }}></i>
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <NeonButton variant="solid" tone={node.tone} iconRight={<Icon n="arrow-up-right" size={15} />}>Open project</NeonButton>
            <NeonButton variant="ghost" onClick={onClose} icon={<Icon n="arrow-left" size={14} />}>Back to orbit</NeonButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- submit idea modal ---------- */
const TAGS = [
  { l: 'AI / Dev', tone: 'var(--purple)' }, { l: 'Tools', tone: 'var(--green)' },
  { l: 'Content', tone: 'var(--magenta)' }, { l: 'Analytics', tone: 'var(--cyan)' }, { l: 'Platform', tone: 'var(--amber)' },
];
function SubmitModal({ onClose, onSubmit }) {
  const [title, setTitle] = useS('');
  const [desc, setDesc] = useS('');
  const [tag, setTag] = useS('AI / Dev');
  useE(() => { window.lucide && window.lucide.createIcons(); });
  const submit = () => { if (!title.trim()) return; onSubmit({ title: title.trim(), desc, tag }); };
  return (
    <div className="fz-fly-scrim" onClick={onClose}>
      <div className="fz-fly-card" onClick={(e) => e.stopPropagation()} style={{ '--frame': 'color-mix(in srgb, var(--green) 55%, var(--line))', width: 'min(520px,92vw)' }}>
        <div className="fz-fly-glow" style={{ background: 'radial-gradient(120% 150% at 8% 0%, color-mix(in srgb, var(--green) 22%, transparent), transparent 58%)' }} />
        <div className="fz-fly-edge" style={{ background: 'var(--green)', boxShadow: '0 0 16px 1px var(--green)' }} />
        <button type="button" className="fz-fly-close" onClick={onClose}><i data-lucide="x" style={{ width: 16, height: 16 }}></i></button>
        <div style={{ position: 'relative', padding: '30px 32px 28px' }}>
          <div style={{ fontFamily: 'var(--font-techno)', fontWeight: 600, fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--green)' }}>New Submission</div>
          <div style={{ fontFamily: 'var(--font-techno)', fontWeight: 700, fontSize: 30, color: '#fff', textShadow: '0 0 16px var(--green)', lineHeight: 1.05, margin: '6px 0 4px' }}>Have an idea?</div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-dim)', margin: '0 0 20px' }}>Share it. Build it. Change something.</p>
          <div className="field"><label>Idea title</label><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. One-click dev environment" autoFocus /></div>
          <div className="field"><label>What should it do?</label><textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="A sentence or two on the vibe…" /></div>
          <div className="field"><label>Category</label>
            <div className="chiprow">
              {TAGS.map((tg) => (
                <button type="button" key={tg.l} className={'chip' + (tag === tg.l ? ' on' : '')} onClick={() => setTag(tg.l)} style={tag === tg.l ? { background: tg.tone, borderColor: tg.tone } : null}>{tg.l}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <NeonButton variant="solid" tone="var(--green)" iconRight={<Icon n="arrow-right" size={15} />} onClick={submit}>Submit your idea</NeonButton>
            <NeonButton variant="ghost" onClick={onClose}>Cancel</NeonButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- the cosmos (home) ---------- */
function Cosmos({ d, drift, stars, sel, onSelect }) {
  useE(() => { window.lucide && window.lucide.createIcons(); });
  return (
    <div className="fz-lab">
      <Starfield count={stars} />
      <main className="fz-lab-stage">
        <Field nodes={d.nodes} modules={d.modules} selectedId={sel} onSelect={onSelect} drift={drift} />
      </main>
    </div>
  );
}

/* ---------- app ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "Cyan",
  "stars": "medium",
  "drift": true,
  "scanlines": true
}/*EDITMODE-END*/;

function App() {
  const d = window.FZ_DATA;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useS('home');
  const [sel, setSel] = useS(null);      // { id, origin }
  const [submit, setSubmit] = useS(false);
  const [toast, setToast] = useS(null);
  const [scale, setScale] = useS(1);

  useE(() => {
    const fit = () => setScale(Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H));
    fit(); window.addEventListener('resize', fit); return () => window.removeEventListener('resize', fit);
  }, []);
  useE(() => { window.lucide && window.lucide.createIcons(); });

  const accentHex = ACCENTS[t.accent] || ACCENTS.Cyan;
  const ideaNode = sel && d.nodes.find((n) => n.id === sel.id);
  const moduleNode = sel && d.modules.find((m) => m.id === sel.id);
  const showToast = (m) => { setToast(m); setTimeout(() => setToast(null), 2600); };
  const onSubmitIdea = (i) => { setSubmit(false); showToast(`Idea "${i.title}" launched into orbit`); };
  const detailOpen = !!sel;
  const onNav = (id) => {
    if (id === 'roadmap') { setScreen('roadmap'); setSel(null); return; }
    const q = d.quick.find((x) => x.id === id);
    showToast(`${q ? q.label : id} module · coming online`);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, ['--accent']: accentHex }}>
      {/* ===== HOME : COSMOS ===== */}
      {screen === 'home' && (
        <React.Fragment>
          <Cosmos d={d} drift={t.drift} stars={STAR_COUNT[t.stars] || 240} sel={sel && sel.id} onSelect={(id, origin) => setSel({ id, origin })} />

          {/* top-right status + nav */}
          <div className="hud-top" style={{ visibility: detailOpen ? 'hidden' : 'visible', zIndex: 62 }}>
            <span className="hud-status"><span className="fz-dot is-live" style={{ background: 'var(--green)', color: 'var(--green)' }} />{d.nodes.length} Ideas · {d.modules.length} Modules</span>
            <button type="button" className="nav-btn active"><Icon n="orbit" size={13} /> Cockpit</button>
            <button type="button" className="nav-btn" onClick={() => setScreen('roadmap')}><Icon n="map" size={13} /> Roadmap</button>
          </div>

          {/* bottom-center submit */}
          <div className="hud-submit" style={{ visibility: detailOpen ? 'hidden' : 'visible' }}>
            <NeonButton variant="outline" tone="var(--green)" size="md" icon={<Icon n="plus" size={14} />} iconRight={<Icon n="arrow-right" size={14} />} onClick={() => setSubmit(true)}>Have an idea? Submit it</NeonButton>
          </div>
        </React.Fragment>
      )}

      {/* ===== ROADMAP : KANBAN ===== */}
      {screen === 'roadmap' && (
        <div className="fz-fit" style={{ width: DESIGN_W, height: DESIGN_H, transform: `translate(-50%,-50%) scale(${scale})` }}>
          <div className="appnav" style={{ top: 18, left: 20 }}>
            <button type="button" className="nav-btn" onClick={() => setScreen('home')}><Icon n="orbit" size={13} /> Cockpit</button>
            <button type="button" className="nav-btn active"><Icon n="map" size={13} /> Roadmap</button>
          </div>
          <BoardScreen d={d} onNewIdea={() => setSubmit(true)} />
        </div>
      )}

      {/* scanline veil */}
      {t.scanlines && <div className="fz-scanlines" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 80 }} />}

      {/* overlays */}
      {ideaNode && <FlyCard node={ideaNode} origin={sel.origin} onClose={() => setSel(null)} />}
      {moduleNode && <ModuleDetail node={moduleNode} d={d} onClose={() => setSel(null)} onNav={onNav} onOpenSubmit={() => { setSel(null); setSubmit(true); }} />}
      {submit && <SubmitModal onClose={() => setSubmit(false)} onSubmit={onSubmitIdea} />}
      {toast && <div className="toast"><Icon n="rocket" size={15} color="var(--green)" /> {toast}</div>}

      {/* tweaks */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Atmosphere" />
        <TweakColor label="Accent" value={accentHex} options={[ACCENTS.Cyan, ACCENTS.Magenta, ACCENTS.Purple, ACCENTS.Green]}
          onChange={(hex) => setTweak('accent', Object.keys(ACCENTS).find((k) => ACCENTS[k] === hex) || 'Cyan')} />
        <TweakRadio label="Star field" value={t.stars} options={['sparse', 'medium', 'dense']} onChange={(v) => setTweak('stars', v)} />
        <TweakToggle label="Idle drift" value={t.drift} onChange={(v) => setTweak('drift', v)} />
        <TweakToggle label="Scanlines" value={t.scanlines} onChange={(v) => setTweak('scanlines', v)} />
      </TweaksPanel>
    </div>
  );
}

window.App = App;
