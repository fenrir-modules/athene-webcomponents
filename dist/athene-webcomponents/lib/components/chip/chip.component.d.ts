import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Chip variant types
 */
export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
/**
 * Athene Chip Component
 *
 * Tags and categories with optional remove action.
 *
 * @example
 * <ath-chip>authentication</ath-chip>
 * <ath-chip variant="primary" [removable]="true" (removed)="onRemove()">beta</ath-chip>
 */
export declare class AthChipComponent {
    /** Chip variant */
    variant: ChipVariant;
    /** Whether the chip can be removed */
    removable: boolean;
    /** Remove event */
    removed: EventEmitter<void>;
    protected readonly removeIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    get chipClasses(): string;
    remove(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthChipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthChipComponent, "ath-chip", never, { "variant": { "alias": "variant"; "required": false; }; "removable": { "alias": "removable"; "required": false; }; }, { "removed": "removed"; }, never, ["*"], true, never>;
}
