"use client";

import { useEffect, useMemo, useRef, type CSSProperties, type MouseEvent, type PointerEvent } from "react";
import type { IdeaNode, ModuleNode as ModuleNodeData } from "@/content/types";
import { fibonacciSphere, project, type Vec3 } from "./projection";
import { IdeaCard, type CardOrigin } from "./IdeaCard";
import { ModuleNode } from "./ModuleNode";
import { SubChip } from "./SubChip";

const R = 620;
const P = 2200;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

type SubPoint = { pi: number; pid: string; subKey: string; href: string; hex: string; pos: Vec3 };

export function Field({
  nodes,
  modules,
  selectedId,
  onSelect,
  drift = true,
}: {
  nodes: IdeaNode[];
  modules: ModuleNodeData[];
  selectedId: string | null;
  onSelect: (id: string, origin: CardOrigin) => void;
  drift?: boolean;
}) {
  const sysRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const subRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rot = useRef({ x: -6, y: 14 });
  const vel = useRef({ y: 0.05 });
  const drag = useRef<{ x: number; y: number } | null>(null);
  const moved = useRef(0);
  const hoverRef = useRef<string | null>(null);

  const pts = useMemo(() => {
    const sphere = fibonacciSphere(nodes.length, R);
    return nodes.map((n, i) => ({ pos: sphere[i], rgb: hexToRgb(n.hex) }));
  }, [nodes]);

  const subs = useMemo<SubPoint[]>(() => {
    const out: SubPoint[] = [];
    nodes.forEach((n, pi) => {
      const p = pts[pi].pos;
      const list = n.sub || [];
      list.forEach((item, j) => {
        const ang = (j / Math.max(1, list.length)) * Math.PI * 2 + pi * 1.2;
        const rr = 168;
        out.push({
          pi,
          pid: n.id,
          subKey: item.key,
          href: item.href,
          hex: n.hex,
          pos: {
            x: p.x + Math.cos(ang) * rr,
            y: p.y + Math.sin(ang) * rr * 0.66,
            z: p.z + Math.sin(ang * 1.7) * rr * 0.8,
          },
        });
      });
    });
    return out;
  }, [nodes, pts]);

  const mpts = useMemo(() => {
    const sphere = fibonacciSphere(modules.length, R * 0.72, { yScale: 0.55, thetaOffset: 0.9 });
    return modules.map((m, i) => ({ pos: sphere[i], rgb: hexToRgb(m.hex) }));
  }, [modules]);

  useEffect(() => {
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const lc = linesRef.current;
    if (!lc) return;
    const lctx = lc.getContext("2d");
    if (!lctx) return;
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
    window.addEventListener("resize", resize);

    const tick = () => {
      if (!drag.current && drift && !reduce) {
        vel.current.y += (0.05 - vel.current.y) * 0.03;
        rot.current.y += vel.current.y;
        rot.current.x += (-6 - rot.current.x) * 0.012;
      }
      const ry = rot.current.y;
      const rx = rot.current.x;
      const sys = sysRef.current;
      if (sys) {
        sys.style.setProperty("--ry", ry.toFixed(2) + "deg");
        sys.style.setProperty("--rx", rx.toFixed(2) + "deg");
      }
      const view = { ry, rx, W, H, R, P };
      const hubX = W / 2;
      const hubY = 0.52 * H;
      const now = reduce ? 0 : performance.now();

      lctx.clearRect(0, 0, W, H);

      const proj = pts.map((p) => project(p.pos, view));
      const sproj = subs.map((s) => project(s.pos, view));
      const mproj = mpts.map((p) => project(p.pos, view));

      // hub -> card lines (far first)
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
        lctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, a + 0.2)})`;
        lctx.beginPath();
        lctx.arc(pr.sx, pr.sy, hovered ? 3 : 1.6 + pr.t, 0, 6.2832);
        lctx.fill();
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

      // card -> own sub-links
      subs.forEach((s, j) => {
        const cp = sproj[j];
        const pp = proj[s.pi];
        const hovered = hoverRef.current === s.pid || selectedId === s.pid;
        const [r, g, b] = hexToRgb(s.hex);
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

      // hub -> module lines (dashed)
      mproj.forEach((pr, i) => {
        const [r, g, b] = mpts[i].rgb;
        const hovered = hoverRef.current === modules[i].id || selectedId === modules[i].id;
        const a = hovered ? 0.85 : 0.08 + pr.t * 0.34;
        lctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
        lctx.lineWidth = hovered ? 1.5 : 0.5 + pr.t * 0.7;
        lctx.setLineDash([3, 4]);
        lctx.beginPath();
        lctx.moveTo(hubX, hubY);
        lctx.lineTo(pr.sx, pr.sy);
        lctx.stroke();
        lctx.setLineDash([]);
        lctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, a + 0.2)})`;
        lctx.beginPath();
        lctx.arc(pr.sx, pr.sy, hovered ? 2.6 : 1.4 + pr.t, 0, 6.2832);
        lctx.fill();
        const frac = (now / 2200 + i * 0.21) % 1;
        const px = hubX + (pr.sx - hubX) * frac;
        const py = hubY + (pr.sy - hubY) * frac;
        const pa = (hovered ? 1 : 0.25 + pr.t * 0.5) * (0.5 + 0.5 * Math.sin(frac * Math.PI));
        lctx.fillStyle = `rgba(${r},${g},${b},${pa})`;
        lctx.shadowColor = `rgb(${r},${g},${b})`;
        lctx.shadowBlur = hovered ? 9 : 5;
        lctx.beginPath();
        lctx.arc(px, py, hovered ? 2.3 : 1.6, 0, 6.2832);
        lctx.fill();
        lctx.shadowBlur = 0;
      });

      // hub core glow
      lctx.fillStyle = "rgba(46,230,246,.9)";
      lctx.shadowColor = "rgba(46,230,246,1)";
      lctx.shadowBlur = 16;
      lctx.beginPath();
      lctx.arc(hubX, hubY, 3, 0, 6.2832);
      lctx.fill();
      lctx.shadowBlur = 0;

      // card depth styling
      proj.forEach((pr, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const hovered = hoverRef.current === nodes[i].id || selectedId === nodes[i].id;
        el.style.opacity = hovered ? "1" : (0.16 + pr.t * 0.84).toFixed(3);
        el.style.zIndex = String(Math.round(pr.z2) + 1000);
        el.style.filter = hovered ? "none" : pr.t < 0.45 ? `blur(${((0.45 - pr.t) * 4).toFixed(1)}px)` : "none";
        el.style.pointerEvents = pr.t < 0.32 ? "none" : "auto";
      });

      // sub depth styling
      sproj.forEach((cp, j) => {
        const el = subRefs.current[j];
        if (!el) return;
        const hovered = hoverRef.current === subs[j].pid || selectedId === subs[j].pid;
        el.style.opacity = hovered ? "1" : (0.1 + cp.t * 0.42).toFixed(3);
        el.style.zIndex = String(Math.round(cp.z2) + 1000);
        const chip = el.firstChild as HTMLElement | null;
        if (chip) {
          chip.style.transform = hovered ? "scale(1.1)" : "scale(1)";
          chip.style.pointerEvents = cp.t > 0.46 ? "auto" : "none";
        }
      });

      // module depth styling
      mproj.forEach((pr, i) => {
        const el = modRefs.current[i];
        if (!el) return;
        const hovered = hoverRef.current === modules[i].id || selectedId === modules[i].id;
        el.style.opacity = hovered ? "1" : (0.2 + pr.t * 0.8).toFixed(3);
        el.style.zIndex = String(Math.round(pr.z2) + 1000);
        el.style.filter = hovered ? "none" : pr.t < 0.42 ? `blur(${((0.42 - pr.t) * 3.5).toFixed(1)}px)` : "none";
        el.style.pointerEvents = pr.t < 0.3 ? "none" : "auto";
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [pts, subs, mpts, selectedId, nodes, modules, drift]);

  const onDown = (e: PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY };
    moved.current = 0;
  };
  const onMove = (e: PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
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

  const onHover = (id: string | null) => {
    hoverRef.current = id;
  };

  const guardOpen = (id: string, origin: CardOrigin) => {
    if (moved.current > 6) return;
    onSelect(id, origin);
  };
  const guardSubClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (moved.current > 6) e.preventDefault();
    else e.stopPropagation();
  };

  return (
    <div className="fz-field" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
      <canvas ref={linesRef} className="fz-lines" />
      <div ref={sysRef} className="fz-system" style={{ "--ry": "14deg", "--rx": "-6deg" } as CSSProperties}>
        {nodes.map((n, i) => (
          <div
            key={n.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="fz-cardpos"
            style={{ "--x": `${pts[i].pos.x}px`, "--y": `${pts[i].pos.y}px`, "--z": `${pts[i].pos.z}px` } as CSSProperties}
          >
            <IdeaCard node={n} onHover={onHover} onOpen={guardOpen} />
          </div>
        ))}

        {subs.map((s, j) => (
          <div
            key={`${s.pid}-${s.subKey}`}
            ref={(el) => {
              subRefs.current[j] = el;
            }}
            className="fz-subpos"
            style={{ "--x": `${s.pos.x}px`, "--y": `${s.pos.y}px`, "--z": `${s.pos.z}px` } as CSSProperties}
          >
            <SubChip pid={s.pid} subKey={s.subKey} href={s.href} hex={s.hex} onHover={onHover} onGuardClick={guardSubClick} />
          </div>
        ))}

        {modules.map((m, i) => (
          <div
            key={m.id}
            ref={(el) => {
              modRefs.current[i] = el;
            }}
            className="fz-modpos"
            style={{ "--x": `${mpts[i].pos.x}px`, "--y": `${mpts[i].pos.y}px`, "--z": `${mpts[i].pos.z}px` } as CSSProperties}
          >
            <ModuleNode node={m} selected={selectedId === m.id} onHover={onHover} onOpen={guardOpen} />
          </div>
        ))}
      </div>
    </div>
  );
}
