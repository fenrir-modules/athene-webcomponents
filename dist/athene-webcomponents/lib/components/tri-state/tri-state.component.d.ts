import type { AthIconData } from '../floating/icon';
import * as i0 from "@angular/core";
/** An override's state: forbid, take the inherited value, or allow. */
export type TriStateValue = 'deny' | 'inherit' | 'allow';
/**
 * Three segments *Deny · Inherit · Allow* for one permission in an
 * override. A radio group (WAI-ARIA radio pattern), not `ath-segment`
 * (which is a tab list): one tab stop on the chosen segment, the arrow keys
 * move and choose, Home/End jump, Space/Enter choose.
 *
 * `inherited` is the value the "Inherit" segment currently stands for; it
 * is read out with it ("Inherit (currently allowed)"). `compact` shows the
 * icons only (each still named); below 480px the segments are icons only
 * anyway.
 *
 * @example
 * <ath-tri-state label="Tickets bearbeiten" [(value)]="state" [inherited]="true" />
 */
export declare class AthTriStateComponent {
    private readonly labels;
    private readonly host;
    readonly value: import("@angular/core").ModelSignal<TriStateValue>;
    /** The value "Inherit" stands for now; `null`: unknown. */
    readonly inherited: import("@angular/core").InputSignal<boolean | null>;
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** The permission's name: the group's accessible name. */
    readonly label: import("@angular/core").InputSignal<string>;
    /** Icons only (each segment keeps its accessible name). */
    readonly compact: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected readonly segments: import("@angular/core").Signal<{
        state: TriStateValue;
        icon: AthIconData;
        text: string;
        name: string;
    }[]>;
    protected select(state: TriStateValue): void;
    protected onKey(event: KeyboardEvent, index: number): void;
    private textOf;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthTriStateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthTriStateComponent, "ath-tri-state", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "inherited": { "alias": "inherited"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": true; "isSignal": true; }; "compact": { "alias": "compact"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}
