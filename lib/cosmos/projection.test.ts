import { describe, test, expect } from "vitest";
import { fibonacciSphere, project } from "./projection";

describe("fibonacciSphere", () => {
  test("returns N points within the radius band", () => {
    const pts = fibonacciSphere(9, 620);
    expect(pts).toHaveLength(9);
    for (const p of pts) {
      // x^2 + z^2 = sin^2(phi) * R^2 <= R^2
      expect(Math.hypot(p.x, p.z)).toBeLessThanOrEqual(620 + 1e-6);
      expect(Math.abs(p.y)).toBeLessThanOrEqual(620 * 0.6 + 1e-6);
    }
  });

  test("is deterministic", () => {
    expect(fibonacciSphere(6, 100)).toEqual(fibonacciSphere(6, 100));
  });

  test("thetaOffset + yScale change the layout", () => {
    const a = fibonacciSphere(6, 100);
    const b = fibonacciSphere(6, 100, { thetaOffset: 0.9, yScale: 0.55 });
    expect(b[0]).not.toEqual(a[0]);
  });
});

describe("project", () => {
  const view = { ry: 0, rx: 0, W: 1000, H: 800, R: 620, P: 2200 };

  test("maps the origin to horizontal center with mid depth", () => {
    const r = project({ x: 0, y: 0, z: 0 }, view);
    expect(r.sx).toBeCloseTo(500);
    expect(r.t).toBeCloseTo(0.5);
  });

  test("t stays within [0,1] across the sphere surface", () => {
    for (const p of fibonacciSphere(40, 620, { thetaOffset: 1.1 })) {
      const r = project(p, view);
      expect(r.t).toBeGreaterThanOrEqual(0);
      expect(r.t).toBeLessThanOrEqual(1);
    }
  });

  test("nearer points (greater z2) get a larger t and perspective scale", () => {
    const near = project({ x: 0, y: 0, z: 600 }, view);
    const far = project({ x: 0, y: 0, z: -600 }, view);
    expect(near.z2).toBeGreaterThan(far.z2);
    expect(near.t).toBeGreaterThan(far.t);
  });
});
