/* Pure geometry for the cosmos: fibonacci-sphere node layout + perspective
   projection. Extracted from the prototype's Field so it can be unit-tested
   and reasoned about independently of the render loop. */

export type Vec3 = { x: number; y: number; z: number };
export type Projected = { sx: number; sy: number; z2: number; t: number };

const DEG = Math.PI / 180;
const GOLDEN_ANGLE = Math.PI * (1 + Math.sqrt(5));

export type SphereOpts = {
  /** vertical flattening of the sphere (ideas 0.6, modules 0.55) */
  yScale?: number;
  /** rotate the spiral so module/idea rings don't overlap (modules 0.9) */
  thetaOffset?: number;
};

/** Evenly distribute `n` points on a (flattened) sphere of radius `R`. */
export function fibonacciSphere(n: number, R: number, opts: SphereOpts = {}): Vec3[] {
  const { yScale = 0.6, thetaOffset = 0 } = opts;
  return Array.from({ length: n }, (_, i) => {
    const k = i + 0.5;
    const phi = Math.acos(1 - (2 * k) / n);
    const theta = GOLDEN_ANGLE * k + thetaOffset;
    return {
      x: Math.sin(phi) * Math.cos(theta) * R,
      y: Math.cos(phi) * R * yScale,
      z: Math.sin(phi) * Math.sin(theta) * R,
    };
  });
}

export type ProjectView = {
  /** rotation about Y (deg) */
  ry: number;
  /** rotation about X (deg) */
  rx: number;
  /** viewport width / height in px */
  W: number;
  H: number;
  /** sphere radius (for normalizing depth t) */
  R: number;
  /** perspective distance */
  P: number;
  /** hub vertical position as a fraction of H (default 0.52) */
  hubYFactor?: number;
};

/** Project a rotating-frame point to screen space + a 0..1 depth `t`
    (0 = far/back, 1 = near/front) used to drive opacity/blur/z-index. */
export function project(p: Vec3, v: ProjectView): Projected {
  const { ry, rx, W, H, R, P, hubYFactor = 0.52 } = v;
  const cosY = Math.cos(ry * DEG);
  const sinY = Math.sin(ry * DEG);
  const cosX = Math.cos(rx * DEG);
  const sinX = Math.sin(rx * DEG);
  const Ox = W / 2;
  const Oy = H / 2;
  const hubY = hubYFactor * H;

  const x1 = p.x * cosY + p.z * sinY;
  const z1 = -p.x * sinY + p.z * cosY;
  const y2 = p.y * cosX - z1 * sinX;
  const z2 = p.y * sinX + z1 * cosX;
  const f = P / (P - z2);

  return {
    sx: Ox + x1 * f,
    sy: Oy + (hubY - Oy + y2) * f,
    z2,
    t: (z2 + R) / (2 * R),
  };
}
