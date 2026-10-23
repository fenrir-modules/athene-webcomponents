import { InjectionToken } from '@angular/core';
/**
 * The few words the library itself puts on screen for assistive tech.
 *
 * Defaults are English. An app provides `ATH_LABELS` (anywhere above the
 * components, e.g. its shell) with functions that return the translated
 * text; a component input, where one exists, wins over both.
 */
export interface AthLabels {
    closeDialog: () => string;
    showPassword: () => string;
    hidePassword: () => string;
    breadcrumb: () => string;
}
export declare const ATH_DEFAULT_LABELS: AthLabels;
export declare const ATH_LABELS: InjectionToken<Partial<AthLabels>>;
