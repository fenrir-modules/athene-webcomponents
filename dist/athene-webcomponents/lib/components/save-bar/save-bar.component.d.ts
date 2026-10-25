import * as i0 from "@angular/core";
/**
 * The sticky "unsaved changes" bar at the bottom of an editor: a sentence
 * and *Discard* / *Save*. Replaces hand-kept dirty flags per field.
 *
 * - Appearing is announced once (`aria-live="polite"`); the bar is a named
 *   region, so it can be found with a screen reader's landmark keys.
 * - `confirmDiscard`: *Discard* asks first (the button turns into "Really
 *   discard?"); Escape anywhere on the page starts the same question and
 *   moves focus to it, a second Escape takes it back. Escape is left alone
 *   while a dialog, menu or popover is open.
 * - `saving`: *Save* shows its spinner and both buttons wait.
 *
 * Sticky to the bottom of its scroll container; full width on phones.
 *
 * @example
 * <ath-save-bar [open]="dirty()" [saving]="saving()" [confirmDiscard]="true"
 *   (save)="save()" (discard)="reset()" />
 */
export declare class AthSaveBarComponent {
    private readonly labels;
    private readonly host;
    private readonly stack;
    private readonly injector;
    readonly open: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly message: import("@angular/core").InputSignal<string | null>;
    readonly saving: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly saveLabel: import("@angular/core").InputSignal<string | null>;
    readonly discardLabel: import("@angular/core").InputSignal<string | null>;
    /** *Discard* (and Escape) asks before it discards. */
    readonly confirmDiscard: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly save: import("@angular/core").OutputEmitterRef<void>;
    readonly discard: import("@angular/core").OutputEmitterRef<void>;
    /** The discard question is showing. */
    protected readonly confirming: import("@angular/core").WritableSignal<boolean>;
    /** The live region's text: the message while open, so appearing is read out. */
    protected readonly announcement: import("@angular/core").Signal<string>;
    protected readonly text: import("@angular/core").Signal<string>;
    protected readonly saveText: import("@angular/core").Signal<string>;
    protected readonly discardText: import("@angular/core").Signal<string>;
    constructor();
    protected onSave(): void;
    protected onDiscard(): void;
    protected onDocumentKey(event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSaveBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSaveBarComponent, "ath-save-bar", never, { "open": { "alias": "open"; "required": false; "isSignal": true; }; "message": { "alias": "message"; "required": false; "isSignal": true; }; "saving": { "alias": "saving"; "required": false; "isSignal": true; }; "saveLabel": { "alias": "saveLabel"; "required": false; "isSignal": true; }; "discardLabel": { "alias": "discardLabel"; "required": false; "isSignal": true; }; "confirmDiscard": { "alias": "confirmDiscard"; "required": false; "isSignal": true; }; }, { "save": "save"; "discard": "discard"; }, never, never, true, never>;
}
