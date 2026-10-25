/**
 * The Athene AI mark, drawn on a 24-unit grid (AI1).
 *
 * "Perch": a solid, rounded A — the A of Athene and a perched little owl
 * (Athene noctua) at once — with two round eyes cut out of it, the notch
 * between its feet, and a four-point spark beside its head.
 *
 * Two optical sizes: below 21 px the eyes sit wider apart and are a little
 * smaller, so they never run together, and the spark grows so it still
 * reads as a spark rather than a dot.
 */
export interface AiMarkGeometry {
    /** The body with both eyes cut out (fill-rule even-odd). */
    readonly body: string;
    readonly spark: string;
}
/** 21 px and up (24, 32, 48 …). */
export declare const AI_MARK_REGULAR: AiMarkGeometry;
/** Up to 20 px (16, 20). */
export declare const AI_MARK_SMALL: AiMarkGeometry;
/** The largest size that still uses the small drawing. */
export declare const AI_MARK_SMALL_MAX = 20;
