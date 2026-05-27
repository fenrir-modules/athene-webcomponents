import * as i0 from "@angular/core";
export type ProjectKeySize = 'sm' | 'md' | 'lg';
/**
 * Colored project-key badge (e.g., `FNR`, `WEB`, `AUT`).
 *
 * Colors are tinted from the provided `color` (project's brand color).
 *
 * @example
 * <ath-project-key-badge projectKey="WEB" color="#e9b864" />
 * <ath-project-key-badge projectKey="FNR" color="#7aa9f5" size="lg" />
 */
export declare class AthProjectKeyBadgeComponent {
    projectKey: string;
    /** Hex color (e.g., `#e9b864`). Used to tint border + background. */
    color: string;
    size: ProjectKeySize;
    get hostSize(): ProjectKeySize;
    get cssColor(): string;
    get cssBorder(): string;
    get cssBg(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthProjectKeyBadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthProjectKeyBadgeComponent, "ath-project-key-badge", never, { "projectKey": { "alias": "projectKey"; "required": true; }; "color": { "alias": "color"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, {}, never, never, true, never>;
}
