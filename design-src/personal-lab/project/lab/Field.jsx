/* FENGZIAAA Lab — the cosmos.
   A starfield you drift through; your ideas float around you as content cards,
   each wired back to the central FENGZIAAA hub by a glowing connection line with
   a data-pulse traveling along it. Drag to look around, click a card to expand. */
const { useState, useEffect, useRef, useMemo } = React;

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

/* ---------- particle starfield (canvas) ---------- */
function Starfield({ count = 240 }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, cx, cy, raf;
    const N = count;
    const palette = ['255,255,255', '46,230,246', '255,45,155', '176,107,255', '43,255,136'];
    const spawn = (z) => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: z != null ? z : Math.random() * 0.9 + 0.1, t: Math.random(), c: palette[(Math.random() * palette.length) | 0] });
    const stars = Array.from({ length: N }, () => spawn());
    const resize = () => { w = cv.width = cv.offsetWidth * dpr; h = cv.height = cv.offsetHeight * dpr; cx = w / 2; cy = h / 2; };
    resize();
    window.addEventListener('resize', resize);
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const now = performance.now();
      for (const s of stars) {
        s.z -= 0.0015;
        if (s.z <= 0.04) Object.assign(s, spawn(1));
        const k = 0.62 / s.z;
        const sx = cx + s.x * k * cx, sy = cy + s.y * k * cy;
        if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) continue;
        const size = (1 - s.z) * 2.4 * dpr + 0.35 * dpr;
        const tw = 0.55 + 0.45 * Math.sin(now / 600 + s.t * 6.28);
        ctx.globalAlpha = Math.min(1, (1 - s.z) * 0.95 * tw + 0.08);
        ctx.fillStyle = 'rgb(' + s.c + ')';
        ctx.beginPath(); ctx.arc(sx, sy, size, 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [count]);
  return <canvas ref={ref} className="fz-stars" />;
}

/* ---------- floating field of idea cards + connection lines ---------- */
function Field({ nodes, modules = [], selectedId, onSelect, drift = true }) {
  const sysRef = useRef(null);
  const linesRef = useRef(null);
  const cardRefs = useRef([]);
  const subRefs = useRef([]);
  const modRefs = useRef([]);
  const rot = useRef({ x: -6, y: 14 });
  const vel = useRef({ y: 0.05 });
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
      rgb: hexToRgb(n.hex),
    };
  }), [nodes, R]);

  // sub-nodes: each card's own specific content, clustered around it
  const subs = useMemo(() => {
    const out = [];
    nodes.forEach((n, pi) => {
      const p = pts[pi];
      const list = n.sub || [];
      list.forEach((item, j) => {
        const ang = (j / Math.max(1, list.length)) * Math.PI * 2 + pi * 1.2;
        const rr = 168;
        out.push({
          pi, pid: n.id, label: item.l, href: item.href, rgb: hexToRgb(n.hex), hex: n.hex, tone: n.tone,
          x: p.x + Math.cos(ang) * rr,
          y: p.y + Math.sin(ang) * rr * 0.66,
          z: p.z + Math.sin(ang * 1.7) * rr * 0.8,
        });
      });
    });
    return out;
  }, [nodes, pts]);

  // module nodes: system modules, on their own inner sphere, wired to the hub
  const mpts = useMemo(() => modules.map((m, i) => {
    const k = i + 0.5;
    const phi = Math.acos(1 - 2 * k / Math.max(1, modules.length));
    const theta = Math.PI * (1 + Math.sqrt(5)) * k + 0.9;
    const Rm = R * 0.72;
    return {
      x: Math.sin(phi) * Math.cos(theta) * Rm,
      y: Math.cos(phi) * Rm * 0.55,
      z: Math.sin(phi) * Math.sin(theta) * Rm,
      rgb: hexToRgb(m.hex),
    };
  }), [modules, R]);

  useEffect(() => {
    let raf;
    const D = Math.PI / 180;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const lc = linesRef.current;
    const lctx = lc.getContext('2d');
    let W = 0, H = 0;
    const resize = () => { W = lc.offsetWidth; H = lc.offsetHeight; lc.width = W * dpr; lc.height = H * dpr; lctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    window.addEventListener('resize', resize);

    const tick = () => {
      if (!drag.current && drift) {
        vel.current.y += (0.05 - vel.current.y) * 0.03;
        rot.current.y += vel.current.y;
        rot.current.x += (-6 - rot.current.x) * 0.012;
      }
      const ry = rot.current.y, rx = rot.current.x;
      const sys = sysRef.current;
      if (sys) { sys.style.setProperty('--ry', ry.toFixed(2) + 'deg'); sys.style.setProperty('--rx', rx.toFixed(2) + 'deg'); }
      const ryr = ry * D, rxr = rx * D;
      const cosY = Math.cos(ryr), sinY = Math.sin(ryr), cosX = Math.cos(rxr), sinX = Math.sin(rxr);

      // hub (center) in screen space
      const Ox = W / 2, Oy = H / 2;
      const hubX = W / 2, hubY = 0.52 * H;
      const now = performance.now();

      lctx.clearRect(0, 0, W, H);

      const project = (p) => {
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const f = P / (P - z2);
        return { sx: Ox + x1 * f, sy: Oy + (hubY - Oy + y2) * f, z2, t: (z2 + R) / (2 * R) };
      };

      // first pass: geometry per card
      const proj = pts.map(project);
      const sproj = subs.map(project);
      const mproj = mpts.map(project);

      // draw hub -> card connection lines (far first)
      const order = proj.map((_, i) => i).sort((a, b) => proj[a].z2 - proj[b].z2);
      for (const i of order) {
        const pr = proj[i];
        const hovered = hoverRef.current === nodes[i].id || selectedId === nodes[i].id;
        const a = hovered ? 0.85 : (0.08 + pr.t * 0.4);
        const [r, g, b] = pts[i].rgb;
        lctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
        lctx.lineWidth = hovered ? 1.6 : (0.5 + pr.t * 0.9);
        lctx.beginPath();
        lctx.moveTo(hubX, hubY);
        lctx.lineTo(pr.sx, pr.sy);
        lctx.stroke();
        // anchor dot at the card end
        lctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, a + 0.2)})`;
        lctx.beginPath(); lctx.arc(pr.sx, pr.sy, hovered ? 3 : 1.6 + pr.t, 0, 6.2832); lctx.fill();
        // travelling data-pulse hub -> card
        const frac = ((now / 2600) + i * 0.137) % 1;
        const px = hubX + (pr.sx - hubX) * frac;
        const py = hubY + (pr.sy - hubY) * frac;
        const pa = (hovered ? 1 : 0.25 + pr.t * 0.6) * (0.5 + 0.5 * Math.sin(frac * Math.PI));
        lctx.fillStyle = `rgba(${r},${g},${b},${pa})`;
        lctx.shadowColor = `rgb(${r},${g},${b})`;
        lctx.shadowBlur = hovered ? 10 : 6;
        lctx.beginPath(); lctx.arc(px, py, hovered ? 2.6 : 1.8, 0, 6.2832); lctx.fill();
        lctx.shadowBlur = 0;
      }

      // draw card -> own-content lines (each card is its own hub)
      subs.forEach((s, j) => {
        const cp = sproj[j];
        const pp = proj[s.pi];
        const hovered = hoverRef.current === s.pid || selectedId === s.pid;
        const [r, g, b] = s.rgb;
        const a = hovered ? 0.8 : (0.05 + cp.t * 0.22);
        lctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
        lctx.lineWidth = hovered ? 1.2 : 0.6;
        lctx.beginPath();
        lctx.moveTo(pp.sx, pp.sy);
        lctx.lineTo(cp.sx, cp.sy);
        lctx.stroke();
        lctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, a + 0.25)})`;
        lctx.beginPath(); lctx.arc(cp.sx, cp.sy, hovered ? 2.4 : 1.3, 0, 6.2832); lctx.fill();
        if (hovered) {
          const frac = ((now / 1600) + j * 0.19) % 1;
          const px = pp.sx + (cp.sx - pp.sx) * frac;
          const py = pp.sy + (cp.sy - pp.sy) * frac;
          lctx.fillStyle = `rgba(${r},${g},${b},${0.6 + 0.4 * Math.sin(frac * Math.PI)})`;
          lctx.shadowColor = `rgb(${r},${g},${b})`; lctx.shadowBlur = 8;
          lctx.beginPath(); lctx.arc(px, py, 1.8, 0, 6.2832); lctx.fill();
          lctx.shadowBlur = 0;
        }
      });

      // draw hub -> module connection lines (dashed)
      mproj.forEach((pr, i) => {
        const [r, g, b] = mpts[i].rgb;
        const hovered = hoverRef.current === modules[i].id || selectedId === modules[i].id;
        const a = hovered ? 0.85 : (0.08 + pr.t * 0.34);
        lctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
        lctx.lineWidth = hovered ? 1.5 : (0.5 + pr.t * 0.7);
        lctx.setLineDash([3, 4]);
        lctx.beginPath(); lctx.moveTo(hubX, hubY); lctx.lineTo(pr.sx, pr.sy); lctx.stroke();
        lctx.setLineDash([]);
        lctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, a + 0.2)})`;
        lctx.beginPath(); lctx.arc(pr.sx, pr.sy, hovered ? 2.6 : 1.4 + pr.t, 0, 6.2832); lctx.fill();
        const frac = ((now / 2200) + i * 0.21) % 1;
        const px = hubX + (pr.sx - hubX) * frac, py = hubY + (pr.sy - hubY) * frac;
        const pa = (hovered ? 1 : 0.25 + pr.t * 0.5) * (0.5 + 0.5 * Math.sin(frac * Math.PI));
        lctx.fillStyle = `rgba(${r},${g},${b},${pa})`;
        lctx.shadowColor = `rgb(${r},${g},${b})`; lctx.shadowBlur = hovered ? 9 : 5;
        lctx.beginPath(); lctx.arc(px, py, hovered ? 2.3 : 1.6, 0, 6.2832); lctx.fill();
        lctx.shadowBlur = 0;
      });

      // hub core glow
      lctx.fillStyle = 'rgba(46,230,246,.9)';
      lctx.shadowColor = 'rgba(46,230,246,1)';
      lctx.shadowBlur = 16;
      lctx.beginPath(); lctx.arc(hubX, hubY, 3, 0, 6.2832); lctx.fill();
      lctx.shadowBlur = 0;

      // second pass: card depth styling
      proj.forEach((pr, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const hovered = hoverRef.current === nodes[i].id || selectedId === nodes[i].id;
        el.style.opacity = hovered ? '1' : (0.16 + pr.t * 0.84).toFixed(3);
        el.style.zIndex = String(Math.round(pr.z2) + 1000);
        el.style.filter = hovered ? 'none' : (pr.t < 0.45 ? 'blur(' + ((0.45 - pr.t) * 4).toFixed(1) + 'px)' : 'none');
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

      // module-node depth styling
      mproj.forEach((pr, i) => {
        const el = modRefs.current[i];
        if (!el) return;
        const hovered = hoverRef.current === modules[i].id || selectedId === modules[i].id;
        el.style.opacity = hovered ? '1' : (0.2 + pr.t * 0.8).toFixed(3);
        el.style.zIndex = String(Math.round(pr.z2) + 1000);
        el.style.filter = hovered ? 'none' : (pr.t < 0.42 ? 'blur(' + ((0.42 - pr.t) * 3.5).toFixed(1) + 'px)' : 'none');
        el.style.pointerEvents = pr.t < 0.3 ? 'none' : 'auto';
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [pts, subs, mpts, selectedId, nodes, modules, R, drift]);

  const onDown = (e) => { drag.current = { x: e.clientX, y: e.clientY }; moved.current = 0; };
  const onMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x, dy = e.clientY - drag.current.y;
    drag.current.x = e.clientX; drag.current.y = e.clientY;
    moved.current += Math.abs(dx) + Math.abs(dy);
    rot.current.y += dx * 0.28;
    vel.current.y = dx * 0.28;
    rot.current.x = Math.max(-48, Math.min(48, rot.current.x + dy * 0.18));
  };
  const onUp = () => { drag.current = null; };
  const onCardClick = (e, n) => {
    if (moved.current > 6) return;
    const r = e.currentTarget.getBoundingClientRect();
    onSelect(n.id, { cx: r.left + r.width / 2, cy: r.top + r.height / 2 });
  };

  const stat = (icon, val, color) => (
    <span className="fz-card-m"><i data-lucide={icon} style={{ width: 10, height: 10, color }}></i>{val}</span>
  );

  return (
    <div className="fz-field" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
      <canvas ref={linesRef} className="fz-lines" />
      <div ref={sysRef} className="fz-system" style={{ '--ry': '14deg', '--rx': '-6deg' }}>
        {nodes.map((n, i) => (
          <div
            key={n.id}
            ref={(el) => (cardRefs.current[i] = el)}
            className="fz-cardpos"
            style={{ '--x': pts[i].x + 'px', '--y': pts[i].y + 'px', '--z': pts[i].z + 'px' }}
          >
            <button
              type="button"
              className="fz-card"
              style={{ '--c': n.tone, '--hex': n.hex, '--frame': `color-mix(in srgb, ${n.tone} 46%, var(--line))` }}
              onMouseEnter={() => (hoverRef.current = n.id)}
              onMouseLeave={() => { if (hoverRef.current === n.id) hoverRef.current = null; }}
              onClick={(e) => onCardClick(e, n)}
            >
              <span className="fz-card-edge" />
              <span className="fz-card-head">
                <span className="fz-card-cat">{n.cat}</span>
                <span className="fz-card-stage" style={{ color: n.hex, borderColor: `color-mix(in srgb, ${n.hex} 45%, transparent)` }}>{n.progress >= 100 ? 'SHIPPED' : n.progress >= 50 ? 'BUILDING' : n.progress > 0 ? 'EXPLORING' : 'BACKLOG'}</span>
              </span>
              <span className="fz-card-title">{n.title}</span>
              <span className="fz-card-desc">{n.desc}</span>
              <span className="fz-card-meta">
                {stat('circle', n.lang, n.hex)}
                {stat('git-commit-horizontal', n.commits, 'var(--text-mono)')}
                {stat('star', n.stars, 'var(--amber)')}
                {stat('circle-dot', n.issues, 'var(--text-dim)')}
              </span>
              <span className="fz-card-bar"><span style={{ width: n.progress + '%', background: n.hex, boxShadow: `0 0 8px -1px ${n.hex}` }} /></span>
              <span className="fz-card-foot">
                <span className="fz-card-pct" style={{ color: n.hex }}>{n.progress}% BUILT</span>
                <span className="fz-card-open">OPEN <i data-lucide="maximize-2" style={{ width: 10, height: 10 }}></i></span>
              </span>
            </button>
          </div>
        ))}

        {subs.map((s, j) => (
          <div
            key={s.pid + '-' + j}
            ref={(el) => (subRefs.current[j] = el)}
            className="fz-subpos"
            style={{ '--x': s.x + 'px', '--y': s.y + 'px', '--z': s.z + 'px' }}
          >
            <a
              className="fz-sub"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ '--hex': s.hex, borderColor: `color-mix(in srgb, ${s.hex} 55%, transparent)` }}
              onMouseEnter={() => (hoverRef.current = s.pid)}
              onMouseLeave={() => { if (hoverRef.current === s.pid) hoverRef.current = null; }}
              onClick={(e) => { if (moved.current > 6) { e.preventDefault(); } else { e.stopPropagation(); } }}
            >
              <span className="fz-sub-dot" style={{ background: s.hex, boxShadow: `0 0 7px -1px ${s.hex}` }} />
              {s.label}
              <i data-lucide="arrow-up-right" style={{ width: 9, height: 9, opacity: 0.7 }}></i>
            </a>
          </div>
        ))}

        {modules.map((m, i) => (
          <div
            key={m.id}
            ref={(el) => (modRefs.current[i] = el)}
            className="fz-modpos"
            style={{ '--x': mpts[i].x + 'px', '--y': mpts[i].y + 'px', '--z': mpts[i].z + 'px' }}
          >
            <button
              type="button"
              className={'fz-mod' + (selectedId === m.id ? ' is-sel' : '')}
              style={{ '--hex': m.hex, '--frame': `color-mix(in srgb, ${m.tone} 50%, var(--line))` }}
              onMouseEnter={() => (hoverRef.current = m.id)}
              onMouseLeave={() => { if (hoverRef.current === m.id) hoverRef.current = null; }}
              onClick={(e) => onCardClick(e, m)}
            >
              <span className="fz-mod-ic"><i data-lucide={m.icon} style={{ width: 17, height: 17 }}></i></span>
              <span className="fz-mod-tx">
                <span className="fz-mod-t">{m.title}</span>
                <span className="fz-mod-d">{m.desc}</span>
              </span>
              <i data-lucide="maximize-2" className="fz-mod-open" style={{ width: 11, height: 11 }}></i>
            </button>
          </div>
        ))}
      </div>

      <div className="fz-center-id">
        <div className="fz-center-wm">FENGZIAAA</div>
        <div className="fz-center-dm">fengziaaa.com</div>
      </div>

      <div className="fz-map-hint"><i data-lucide="move-3d" style={{ width: 13, height: 13 }}></i> drag to drift · grab a card · click to open</div>
    </div>
  );
}

window.Starfield = Starfield;
window.Field = Field;
window.OrbitalMap = Field; /* back-compat */
