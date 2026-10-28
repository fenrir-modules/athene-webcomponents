/**
 * The Athenos AI mark, drawn on a 24-unit grid (AI1).
 *
 * "Perch": a solid, rounded A — the A of Athenos and a perched little owl
 * (Athenos noctua) at once — with two round eyes cut out of it, the notch
 * between its feet, and a four-point spark beside its head.
 *
 * Two optical sizes: below 21 px the eyes sit wider apart and are a little
 * smaller, so they never run together, and the spark grows so it still
 * reads as a spark rather than a dot.
 */

/** The body: rounded apex, rounded base corners, the notch between the feet. */
const BODY =
  'M10.5 4.5Q12 2.2 13.5 4.5L20.25 18.55Q21.45 21 18.75 21H15.1Q14.6 21 14.3 20.6' +
  'L12 17.3 9.7 20.6Q9.4 21 8.9 21H5.25Q2.55 21 3.75 18.55Z';

/** Two decimals at most, so the path data stays clean (13.7 + 1.7). */
const n = (v: number) => +v.toFixed(2);

/** A circle as a sub-path (cut out of the body by the even-odd rule). */
function eye(cx: number, cy: number, r: number): string {
  return `M${n(cx)} ${n(cy + r)}a${n(r)} ${n(r)} 0 1 0 0-${n(2 * r)}a${n(r)} ${n(r)} 0 0 0 0 ${n(2 * r)}Z`;
}

/** A four-point spark with concave sides. */
function spark(cx: number, cy: number, rx: number, ry: number, c: number): string {
  return (
    `M${n(cx)} ${n(cy - ry)}Q${n(cx + c)} ${n(cy - c)} ${n(cx + rx)} ${n(cy)}` +
    `Q${n(cx + c)} ${n(cy + c)} ${n(cx)} ${n(cy + ry)}` +
    `Q${n(cx - c)} ${n(cy + c)} ${n(cx - rx)} ${n(cy)}` +
    `Q${n(cx - c)} ${n(cy - c)} ${n(cx)} ${n(cy - ry)}Z`
  );
}

export interface AiMarkGeometry {
  /** The body with both eyes cut out (fill-rule even-odd). */
  readonly body: string;
  readonly spark: string;
}

/** 21 px and up (24, 32, 48 …). */
export const AI_MARK_REGULAR: AiMarkGeometry = {
  body: BODY + eye(9.5, 13.5, 1.95) + eye(14.5, 13.5, 1.95),
  spark: spark(18.9, 5.1, 2, 2.75, 0.4),
};

/** Up to 20 px (16, 20). */
export const AI_MARK_SMALL: AiMarkGeometry = {
  body: BODY + eye(9.3, 13.7, 1.7) + eye(14.7, 13.7, 1.7),
  spark: spark(18.9, 5, 2.4, 3.2, 0.5),
};

/** The largest size that still uses the small drawing. */
export const AI_MARK_SMALL_MAX = 20;
