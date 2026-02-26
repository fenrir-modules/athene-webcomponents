import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Dialog size variants
 */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';
/**
 * Athene Dialog Component
 *
 * Modal dialog for confirmations, forms, and content overlays.
 *
 * @example
 * <ath-dialog [open]="isOpen" title="Create Item" (closed)="isOpen = false">
 *   <p>Dialog content here</p>
 *   <div slot="footer">
 *     <ath-button variant="secondary" (clicked)="isOpen = false">Cancel</ath-button>
 *     <ath-button (clicked)="save()">Save</ath-button>
 *   </div>
 * </ath-dialog>
 */
export declare class AthDialogComponent {
    /** Whether the dialog is open */
    open: boolean;
    /** Dialog title */
    title: string;
    /** Dialog description */
    description: string;
    /** Dialog size */
    size: DialogSize;
    /** Whether clicking the backdrop closes the dialog */
    closeOnBackdrop: boolean;
    /** Whether pressing Escape closes the dialog */
    closeOnEscape: boolean;
    /** Close event */
    closed: EventEmitter<void>;
    protected readonly closeIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    onEscapeKey(): void;
    get dialogClasses(): string;
    close(): void;
    onBackdropClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthDialogComponent, "ath-dialog", never, { "open": { "alias": "open"; "required": false; }; "title": { "alias": "title"; "required": false; }; "description": { "alias": "description"; "required": false; }; "size": { "alias": "size"; "required": false; }; "closeOnBackdrop": { "alias": "closeOnBackdrop"; "required": false; }; "closeOnEscape": { "alias": "closeOnEscape"; "required": false; }; }, { "closed": "closed"; }, never, ["*", "[slot=footer]"], true, never>;
}
