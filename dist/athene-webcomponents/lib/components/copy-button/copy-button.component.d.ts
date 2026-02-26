import { ChangeDetectorRef } from '@angular/core';
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
    private cdr;
    /** Value to copy to clipboard */
    value: string;
    /** Optional tooltip/label */
    label: string;
    protected copied: boolean;
    protected readonly copyIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly checkIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    private resetTimeout;
    constructor(cdr: ChangeDetectorRef);
    copy(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthCopyButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthCopyButtonComponent, "ath-copy-button", never, { "value": { "alias": "value"; "required": true; }; "label": { "alias": "label"; "required": false; }; }, {}, never, never, true, never>;
}
