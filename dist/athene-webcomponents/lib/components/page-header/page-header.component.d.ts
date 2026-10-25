import * as i0 from "@angular/core";
/** Heading level of the page head's title. */
export type PageHeaderLevel = 1 | 2;
/**
 * The page head every app page uses: H1, one muted meta line, actions on
 * the right, a hairline underneath. The breadcrumb lives in the shell's
 * topbar, so this component starts at the page gutter like every other.
 *
 * - Meta: `subItems` strings render with `·` separators. Anything richer
 *   (a health pill, an avatar) goes in an `[athPageMeta]` child, which
 *   continues the same line.
 * - Leading: an `[athPageLeading]` child (e.g. a project key tile) sits
 *   left of the title block.
 * - Actions: default content. At most one primary; the topbar's "New" is
 *   already the view's primary on most pages.
 * - `divider`: the hairline. Turn it off only when the next element draws
 *   its own rule directly under the head (an underline tab bar).
 * - Height: a page head (level 1) is one height whatever it holds — the
 *   meta line keeps its room while it is empty or still loading, so a late
 *   meta never pushes the page down. `loading` draws title and meta as
 *   skeleton bars. A section head (level 2) folds an empty meta line.
 *
 * @example
 * <ath-page-header title="Tickets" [subItems]="['12 of 45', 'across 6 projects']">
 *   <ath-button variant="secondary" size="sm">Filter</ath-button>
 * </ath-page-header>
 */
export declare class AthPageHeaderComponent {
    /** Page title. */
    readonly title: import("@angular/core").InputSignal<string>;
    /** Multi-segment sub-row, rendered with bullet (•) separators. */
    readonly subItems: import("@angular/core").InputSignal<string[]>;
    /** Legacy free-form description (single paragraph). Falls back if subItems empty. */
    readonly description: import("@angular/core").InputSignal<string>;
    /** Hairline under the head. On by default: it is part of the contract. */
    readonly divider: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /**
     * Heading level of the title. 1 for a page; 2 for a section head inside a
     * page that already has its h1 (the settings sub-pages under "Settings").
     */
    readonly level: import("@angular/core").InputSignal<PageHeaderLevel>;
    /**
     * The page's object is still loading (a project, a doc): the title and
     * the meta line draw as skeleton bars of their final height, so the head
     * stands from the first frame and nothing below it moves when the data
     * arrives. Actions and leading content still render.
     */
    readonly loading: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /**
     * The sub-items worth separating.
     *
     * Callers build this array inline from conditionals, so a fact that
     * does not apply arrives as `''` rather than being left out — and a
     * blank segment still earned its bullet, leaving headers reading
     * "All open tickets ·" with nothing after the separator.
     */
    protected readonly visibleSubItems: import("@angular/core").Signal<string[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthPageHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthPageHeaderComponent, "ath-page-header", never, { "title": { "alias": "title"; "required": true; "isSignal": true; }; "subItems": { "alias": "subItems"; "required": false; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; "divider": { "alias": "divider"; "required": false; "isSignal": true; }; "level": { "alias": "level"; "required": false; "isSignal": true; }; "loading": { "alias": "loading"; "required": false; "isSignal": true; }; }, {}, never, ["[athPageLeading]", "[athPageMeta]", "*"], true, never>;
}
