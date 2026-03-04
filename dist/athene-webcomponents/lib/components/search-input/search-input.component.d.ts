import { EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Athene Search Input Component
 *
 * Search field with debounce, clear button, and search icon.
 *
 * @example
 * <ath-search-input placeholder="Search flags..." (searched)="onSearch($event)" />
 */
export declare class AthSearchInputComponent implements OnDestroy {
    private cdr;
    /** Placeholder text */
    placeholder: string;
    /** Debounce time in ms */
    debounce: number;
    /** Search event emitter */
    searched: EventEmitter<string>;
    protected value: string;
    protected readonly searchIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly clearIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    private searchSubject;
    private destroy$;
    constructor(cdr: ChangeDetectorRef);
    ngOnDestroy(): void;
    onInput(event: Event): void;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSearchInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSearchInputComponent, "ath-search-input", never, { "placeholder": { "alias": "placeholder"; "required": false; }; "debounce": { "alias": "debounce"; "required": false; }; }, { "searched": "searched"; }, never, never, true, never>;
}
