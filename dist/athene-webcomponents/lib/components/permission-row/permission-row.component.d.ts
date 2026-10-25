import * as i0 from "@angular/core";
/**
 * One permission in a roles editor: icon, name, a one-line explanation and,
 * on the right, the control (projected: an `ath-toggle` on a role, an
 * `ath-tri-state` in an override).
 *
 * With `interactive` (a toggle) the whole row is the mouse target: a click
 * anywhere outside the control emits `activate`, which the page wires to
 * the same change as the toggle. A click on the control itself is left to
 * the control, so nothing toggles twice. Keyboard users reach the control
 * directly; the row adds no tab stop of its own.
 *
 * `disabledReason` is the tooltip of a disabled row ("Gäste können das nie")
 * and is read out with it. Below 480px the control moves under the text.
 *
 * @example
 * <ath-permission-row [icon]="FolderPlus" label="Projekte anlegen"
 *   description="Neue Projekte im Workspace erstellen" [interactive]="true"
 *   (activate)="toggle('project.create')">
 *   <ath-toggle ariaLabel="Projekte anlegen" [checked]="on" (toggled)="set($event)" />
 * </ath-permission-row>
 */
export declare class AthPermissionRowComponent {
    readonly icon: import("@angular/core").InputSignal<import("node_modules/lucide-angular/icons/types").LucideIconData | null>;
    readonly label: import("@angular/core").InputSignal<string>;
    /** One line in `--fg-3`, cut with an ellipsis (the full text as tooltip). */
    readonly description: import("@angular/core").InputSignal<string | null>;
    /** Where the value comes from, e.g. "✓ von Rolle Developer geerbt". */
    readonly inheritedHint: import("@angular/core").InputSignal<string | null>;
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Why it is disabled: tooltip and screen-reader text. */
    readonly disabledReason: import("@angular/core").InputSignal<string | null>;
    /** The whole row toggles (only with a two-state control). */
    readonly interactive: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** A click on the row outside the control (with `interactive`). */
    readonly activate: import("@angular/core").OutputEmitterRef<void>;
    /** Ids a projected control can point `aria-describedby` at. */
    readonly labelId: string;
    readonly descriptionId: string;
    private readonly control;
    protected onClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthPermissionRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthPermissionRowComponent, "ath-permission-row", never, { "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": true; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; "inheritedHint": { "alias": "inheritedHint"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "disabledReason": { "alias": "disabledReason"; "required": false; "isSignal": true; }; "interactive": { "alias": "interactive"; "required": false; "isSignal": true; }; }, { "activate": "activate"; }, never, ["*"], true, never>;
}
