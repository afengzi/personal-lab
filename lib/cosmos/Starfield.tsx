"use client";

import { useEffect, useRef } from "react";

const PALETTE = ["255,255,255", "46,230,246", "255,45,155", "176,107,255", "43,255,136"];

type Star = { x: number; y: number; z: number; t: number; c: string };

/* Particle starfield drifting toward the viewer (canvas 2D). Honors
   prefers-reduced-motion by painting a single static frame. */
export function Starfield({ count = 240 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let w = 0,
      h = 0,
      cx = 0,
      cy = 0,
      raf = 0;

    const spawn = (z?: number): Star => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: z != null ? z : Math.random() * 0.9 + 0.1,
      t: Math.random(),
      c: PALETTE[(Math.random() * PALETTE.length) | 0],
    });
    const stars: Star[] = Array.from({ length: count }, () => spawn());

    const resize = () => {
      w = cv.width = cv.offsetWidth * dpr;
      h = cv.height = cv.offsetHeight * dpr;
      cx = w / 2;
      cy = h / 2;
    };
    resize();
    window.addEventListener("resize", resize);

    const paint = (animate: boolean) => {
      ctx.clearRect(0, 0, w, h);
      const now = performance.now();
      for (const s of stars) {
        if (animate) {
          s.z -= 0.0015;
          if (s.z <= 0.04) Object.assign(s, spawn(1));
        }
        const k = 0.62 / s.z;
        const sx = cx + s.x * k * cx;
        const sy = cy + s.y * k * cy;
        if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) continue;
        const size = (1 - s.z) * 2.4 * dpr + 0.35 * dpr;
        const tw = animate ? 0.55 + 0.45 * Math.sin(now / 600 + s.t * 6.28) : 0.9;
        ctx.globalAlpha = Math.min(1, (1 - s.z) * 0.95 * tw + 0.08);
        ctx.fillStyle = "rgb(" + s.c + ")";
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    if (reduce) {
      paint(false);
    } else {
      const tick = () => {
        paint(true);
        raf = requestAnimationFrame(tick);
      };
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return <canvas ref={ref} className="fz-stars" />;
}
