import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export type BannerTone = 'info' | 'warning' | 'danger' | 'success';
/**
 * Page-level banner for system-wide notices (maintenance, trial-ending,
 * plan-limit, deprecation, etc.).
 *
 * Lives at the top of a layout — typically full-width. For inline alerts
 * within forms or cards use `<ath-alert>`.
 *
 * @example
 * <ath-banner tone="warning" title="Maintenance scheduled">
 *   Athene will be unavailable on Sat 22:00–22:30 CET.
 * </ath-banner>
 * <ath-banner tone="danger" title="Trial ends in 2 days" [dismissible]="true"
 *             (dismissed)="hide()">
 *   Add a payment method to keep your Pro features.
 * </ath-banner>
 */
export declare class AthBannerComponent {
    tone: BannerTone;
    title: string | null;
    dismissible: boolean;
    dismissed: EventEmitter<void>;
    get hostTone(): BannerTone;
    get hostRole(): 'status' | 'alert';
    protected readonly closeIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected get icon(): import("node_modules/lucide-angular/icons/types").LucideIconData;
    onDismiss(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthBannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthBannerComponent, "ath-banner", never, { "tone": { "alias": "tone"; "required": false; }; "title": { "alias": "title"; "required": false; }; "dismissible": { "alias": "dismissible"; "required": false; }; }, { "dismissed": "dismissed"; }, never, ["*", "[banner-action]"], true, never>;
}
