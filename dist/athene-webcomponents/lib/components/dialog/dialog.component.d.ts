import { OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Dialog size variants: max widths 400 / 520 / 680 / 860px, `full` = the
 * viewport minus a margin.
 */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
/**
 * Athene Dialog: the one modal of the library, on a native `<dialog>`
 * opened with `showModal()`. That puts it in the top layer (no z-index, no
 * clipping), makes the rest of the page inert and gives a `::backdrop`
 * (`--scrim`). On top: Tab stays inside, page scroll is locked, Escape and
 * backdrop clicks follow `closeOnEscape` / `closeOnBackdrop`, and focus goes
 * back to where it was when the dialog closes.
 *
 * Controlled: a close request (✕, Escape, backdrop) emits `closed` and
 * `openChange(false)`; the dialog closes when `open` becomes false, so a
 * parent can refuse (unsaved changes). `[(open)]` works.
 *
 * Content: the default slot is the scrolling body; `[slot=header]` (or
 * `[athDialogHeader]`) goes into the header under the title,
 * `[slot=footer]` (or `[athDialogFooter]`) into the footer. Initial focus:
 * an element with `autofocus`, else the first control in the body/footer,
 * else the close button.
 *
 * `bare`: no header, footer, close button or surface. The dialog is a
 * transparent layer over the viewport and the content draws and places its
 * own surface (a palette at the top, a bottom sheet, a composer with its own
 * head); a click on the layer around it counts as a backdrop click. Top
 * layer, inert page, scrim, focus trap, Escape and focus return stay. Name it
 * with `ariaLabel`.
 *
 * @example
 * <ath-dialog [(open)]="isOpen" title="Create item" (closed)="onClose()">
 *   <p>Dialog content here</p>
 *   <div slot="footer">
 *     <ath-button variant="secondary" (clicked)="isOpen = false">Cancel</ath-button>
 *     <ath-button (clicked)="save()">Save</ath-button>
 *   </div>
 * </ath-dialog>
 */
export declare class AthDialogComponent implements OnChanges, OnDestroy {
    private readonly stack;
    private readonly labels;
    /** Ids that name and describe the dialog (`aria-labelledby/-describedby`). */
    protected readonly titleId: string;
    protected readonly descriptionId: string;
    /** Whether the dialog is open. Two-way: `[(open)]`. */
    readonly open: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Dialog title (names the dialog). */
    readonly title: import("@angular/core").InputSignal<string>;
    /** Dialog description (describes the dialog). */
    readonly description: import("@angular/core").InputSignal<string>;
    readonly size: import("@angular/core").InputSignal<DialogSize>;
    /** Whether clicking the backdrop requests closing. */
    readonly closeOnBackdrop: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Whether Escape requests closing. */
    readonly closeOnEscape: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Show the ✕ button in the header. */
    readonly showClose: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Accessible name of the close button; defaults to `ATH_LABELS.closeDialog`. */
    readonly closeLabel: import("@angular/core").InputSignal<string | null>;
    /** Accessible name when there is no visible `title`. */
    readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
    /** `alertdialog` for confirmations that interrupt. */
    readonly role: import("@angular/core").InputSignal<"dialog" | "alertdialog">;
    /**
     * Only the content, on a transparent full-viewport layer: the content is
     * the surface and places itself (see the class comment). `title`,
     * `description`, `size` and `showClose` do not apply.
     */
    readonly bare: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** The user asked to close (✕, Escape, backdrop). */
    readonly closed: import("@angular/core").OutputEmitterRef<void>;
    /** Two-way partner of `open`; emits `false` on a close request. */
    readonly openChange: import("@angular/core").OutputEmitterRef<boolean>;
    /** The dialog is shown (after `showModal()`). */
    readonly opened: import("@angular/core").OutputEmitterRef<void>;
    protected readonly closeIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly closeText: import("@angular/core").Signal<string>;
    private dialogEl;
    private returnFocus;
    private pressedOnBackdrop;
    private locked;
    private readonly entry;
    private set dialogRef(value);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /** Requests closing, as the ✕ button does. */
    close(): void;
    protected onKeydown(event: KeyboardEvent): void;
    /** Escape: the browser's close request. Always prevented; the parent decides. */
    protected onCancel(event: Event): void;
    /** The browser closed it anyway (e.g. a forced close request). */
    protected onNativeClose(): void;
    protected onPointerDown(event: PointerEvent): void;
    protected onClick(event: MouseEvent): void;
    private requestClose;
    /**
     * A press on the `::backdrop`: it targets the dialog, outside its box. In
     * `bare` mode the dialog is the transparent layer around the content, so
     * any press on the dialog element itself is one.
     */
    private isBackdropEvent;
    private present;
    private focusInitial;
    private teardown;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthDialogComponent, "ath-dialog", never, { "open": { "alias": "open"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "closeOnBackdrop": { "alias": "closeOnBackdrop"; "required": false; "isSignal": true; }; "closeOnEscape": { "alias": "closeOnEscape"; "required": false; "isSignal": true; }; "showClose": { "alias": "showClose"; "required": false; "isSignal": true; }; "closeLabel": { "alias": "closeLabel"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "role": { "alias": "role"; "required": false; "isSignal": true; }; "bare": { "alias": "bare"; "required": false; "isSignal": true; }; }, { "closed": "closed"; "openChange": "openChange"; "opened": "opened"; }, never, ["*", "[slot=header],[athDialogHeader]", "[slot=footer],[athDialogFooter]"], true, never>;
}
