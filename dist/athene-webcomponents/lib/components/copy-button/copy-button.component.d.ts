import * as i0 from "@angular/core";
/**
 * Athene Copy Button Component
 *
 * One-click copy-to-clipboard with success feedback.
 *
 * @example
 * <ath-copy-button [value]="apiKey" />
 * <ath-copy-button [value]="secretToken" label="Copy token" />
 */
export declare class AthCopyButtonComponent {
    protected readonly labels: import("dist/athene-webcomponents/core/labels").AthLabels;
    /** Value to copy to clipboard */
    readonly value: import("@angular/core").InputSignal<string>;
    /** Optional tooltip/label */
    readonly label: import("@angular/core").InputSignal<string | null>;
    protected readonly copied: import("@angular/core").WritableSignal<boolean>;
    protected readonly copyIcon: import("lucide").IconNode;
    protected readonly checkIcon: import("lucide").IconNode;
    private resetTimeout;
    constructor();
    copy(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthCopyButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthCopyButtonComponent, "ath-copy-button", never, { "value": { "alias": "value"; "required": true; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
