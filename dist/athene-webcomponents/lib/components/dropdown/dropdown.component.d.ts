import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Dropdown menu item
 */
export interface DropdownItem {
    id: string;
    label: string;
    icon?: any;
    variant?: 'default' | 'danger';
    disabled?: boolean;
    divider?: boolean;
}
/**
 * Horizontal alignment hint.
 * `'auto'` picks left or right based on available viewport space.
 */
export type DropdownAlign = 'left' | 'right' | 'auto';
/**
 * Athene Dropdown Component
 *
 * Smart-positioning action menu.
 * Automatically opens upward/downward and left/right depending
 * on where the trigger sits in the viewport.
 *
 * @example
 * <ath-dropdown [items]="menuItems" (itemClicked)="onAction($event)">
 *   <ath-button variant="ghost">Actions</ath-button>
 * </ath-dropdown>
 */
export declare class AthDropdownComponent {
    private readonly el;
    private readonly cdr;
    /** Menu items */
    items: DropdownItem[];
    /**
     * Horizontal alignment hint.
     * - `'left'`  – menu anchored to the left edge of trigger
     * - `'right'` – menu anchored to the right edge of trigger
     * - `'auto'`  – pick best side based on viewport space
     *
     * Vertical direction is always auto-detected.
     */
    align: DropdownAlign;
    /** Item click event */
    itemClicked: EventEmitter<string>;
    /** Emits `true` when the menu opens, `false` when it closes. */
    openChange: EventEmitter<boolean>;
    protected isOpen: boolean;
    protected placementX: 'left' | 'right';
    protected placementY: 'down' | 'up';
    onDocumentClick(event: MouseEvent): void;
    onEscapeKey(): void;
    toggle(): void;
    selectItem(item: DropdownItem): void;
    private close;
    getItemClasses(item: DropdownItem): string;
    /** Determine where to place the menu based on trigger position */
    private computePlacement;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthDropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthDropdownComponent, "ath-dropdown", never, { "items": { "alias": "items"; "required": false; }; "align": { "alias": "align"; "required": false; }; }, { "itemClicked": "itemClicked"; "openChange": "openChange"; }, never, ["*"], true, never>;
}
