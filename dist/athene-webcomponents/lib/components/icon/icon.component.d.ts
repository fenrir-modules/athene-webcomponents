import { type LucideIconData } from '@lucide/angular';
import type { IconNode } from 'lucide';
import * as i0 from "@angular/core";
/**
 * A Lucide icon: the plain data from `@athene/webcomponents/icons`
 * (`import { Users } from '@athene/webcomponents/icons'`), or a named icon
 * object of your own (`{ name, node }`, the `name` becomes the svg's
 * `lucide-<name>` class).
 */
export type AthIconData = IconNode | LucideIconData;
/**
 * Draws a Lucide icon (quality package W4-A, successor of `lucide-angular`'s
 * `<ath-icon>`, which allows Angular up to 21 only and is deprecated).
 *
 * Same shape as before: an inline `<ath-icon>` host with the `<svg>` inside,
 * so styles on the host, toggled host classes, `role`, `aria-label` and
 * `title` keep working. The inputs are the old ones (`img`, `size`,
 * `strokeWidth`, `color`, `absoluteStrokeWidth`); `class` goes to the svg as
 * well. The svg is drawn by `@lucide/angular`'s `LucideDynamicIcon` and is
 * `aria-hidden`; name the host when the icon carries meaning.
 *
 * The per-icon components of `@lucide/angular` are not used: each carries
 * its own copy of the icon template, 2–3 kB per icon in a bundle.
 */
export declare class AthIconComponent {
    readonly img: import("@angular/core").InputSignal<AthIconData>;
    /** Width and height in px (default 24). */
    readonly size: import("@angular/core").InputSignal<string | number | null>;
    /** Default 2; the library's reset draws 2 at `--icon-stroke`. */
    readonly strokeWidth: import("@angular/core").InputSignal<string | number | null>;
    /** Stroke colour (default `currentColor`). */
    readonly color: import("@angular/core").InputSignal<string | null>;
    readonly absoluteStrokeWidth: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Classes for the svg too (the host keeps its own `class` attribute). */
    readonly class: import("@angular/core").InputSignal<string | null>;
    protected readonly data: import("@angular/core").Signal<LucideIconData>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthIconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthIconComponent, "ath-icon", never, { "img": { "alias": "img"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "strokeWidth": { "alias": "strokeWidth"; "required": false; "isSignal": true; }; "color": { "alias": "color"; "required": false; "isSignal": true; }; "absoluteStrokeWidth": { "alias": "absoluteStrokeWidth"; "required": false; "isSignal": true; }; "class": { "alias": "class"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
