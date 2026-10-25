import { type AiMarkGeometry } from './ai-mark.geometry';
import * as i0 from "@angular/core";
/**
 * - `color`: the body in the current text colour, the spark in `--accent`
 *   (hints, rows, nav).
 * - `mono`: everything in the current text colour (one-colour contexts).
 * - `gradient`: body and spark in `--ai-gradient`'s two steps (hero areas,
 *   24 px and up).
 */
export type AiMarkVariant = 'color' | 'mono' | 'gradient';
/**
 * The Athene AI mark ("Perch"), optionally with the wordmark.
 *
 * Decorative unless it carries a `label` (then `role="img"` with that
 * name). With `wordmark`, the text "Athene AI" follows the mark and is
 * what screen readers read; the mark itself is then hidden from them.
 *
 * @example
 * <ath-ai-mark />                                   <!-- 16 px, decorative -->
 * <ath-ai-mark [size]="48" variant="gradient" />
 * <ath-ai-mark [size]="20" wordmark />
 * <ath-ai-mark label="Athene AI" />
 */
export declare class AthAiMarkComponent {
    /** Edge length in px; the drawing switches to its small optical size up to 20. */
    readonly size: import("@angular/core").InputSignal<number>;
    readonly variant: import("@angular/core").InputSignal<AiMarkVariant>;
    /** Accessible name of the mark alone; empty = decorative. Ignored with `wordmark`. */
    readonly label: import("@angular/core").InputSignal<string>;
    /** Show "Athene AI" next to the mark. */
    readonly wordmark: import("@angular/core").InputSignalWithTransform<boolean, boolean | "" | null | undefined>;
    /** Unique per instance: two gradients on one page must not share an id. */
    protected readonly gradientId: string;
    protected readonly fillUrl: string;
    protected readonly shape: import("@angular/core").Signal<AiMarkGeometry>;
    /** The name the image carries, when it stands alone. */
    protected readonly imageName: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthAiMarkComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthAiMarkComponent, "ath-ai-mark", never, { "size": { "alias": "size"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "wordmark": { "alias": "wordmark"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
