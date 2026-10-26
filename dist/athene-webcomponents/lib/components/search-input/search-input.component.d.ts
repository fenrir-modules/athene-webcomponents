import * as i0 from "@angular/core";
/**
 * Athene Search Input Component
 *
 * Search field with debounce, clear button, and search icon.
 *
 * @example
 * <ath-search-input placeholder="Search flags..." (searched)="onSearch($event)" />
 */
export declare class AthSearchInputComponent {
    protected readonly labels: import("dist/athene-webcomponents/core/labels").AthLabels;
    /** Placeholder text; left out, the app's `searchPlaceholder` label (`ATH_LABELS`). */
    readonly placeholder: import("@angular/core").InputSignal<string | undefined>;
    protected readonly placeholderText: import("@angular/core").Signal<string>;
    /** Debounce time in ms; read per keystroke, so a change applies to the next one. */
    readonly debounce: import("@angular/core").InputSignalWithTransform<number, unknown>;
    /** Search event emitter */
    readonly searched: import("@angular/core").OutputEmitterRef<string>;
    protected readonly value: import("@angular/core").WritableSignal<string>;
    protected readonly searchIcon: import("lucide").IconNode;
    protected readonly clearIcon: import("lucide").IconNode;
    private readonly query$;
    constructor();
    onInput(event: Event): void;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSearchInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSearchInputComponent, "ath-search-input", never, { "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "debounce": { "alias": "debounce"; "required": false; "isSignal": true; }; }, { "searched": "searched"; }, never, never, true, never>;
}
