import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Colored project-key badge (e.g., `FNR`, `WEB`, `AUT`).
 *
 * Colors are tinted from the provided `color` (project's brand color).
 *
 * @example
 * <ath-project-key-badge projectKey="WEB" color="#e9b864" />
 * <ath-project-key-badge projectKey="FNR" color="#7aa9f5" size="lg" />
 */
export class AthProjectKeyBadgeComponent {
    constructor() {
        /** Hex color (e.g., `#e9b864`). Used to tint border + background. */
        this.color = '#6b7280';
        this.size = 'md';
    }
    get hostSize() {
        return this.size;
    }
    get cssColor() {
        return this.color;
    }
    get cssBorder() {
        // 25% alpha
        return this.color + '40';
    }
    get cssBg() {
        // ~7% alpha
        return this.color + '12';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthProjectKeyBadgeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthProjectKeyBadgeComponent, isStandalone: true, selector: "ath-project-key-badge", inputs: { projectKey: "projectKey", color: "color", size: "size" }, host: { properties: { "attr.data-size": "this.hostSize", "style.--pkey-color": "this.cssColor", "style.--pkey-border": "this.cssBorder", "style.--pkey-bg": "this.cssBg" } }, ngImport: i0, template: "<span class=\"ath-pkey\">{{ projectKey }}</span>\n", styles: [":host{display:inline-flex;align-items:center;justify-content:center;--pkey-color: var(--fg-3);--pkey-border: var(--border);--pkey-bg: transparent}.ath-pkey{display:inline-flex;align-items:center;justify-content:center;padding:1px 6px;font-family:var(--font-mono);font-feature-settings:\"ss01\",\"zero\",\"tnum\";font-weight:600;letter-spacing:0;text-transform:uppercase;border-radius:var(--r-sm);color:var(--pkey-color);background:var(--pkey-bg);border:1px solid var(--pkey-border);line-height:1.3;white-space:nowrap}:host([data-size=sm]) .ath-pkey{font-size:10px;padding:1px 5px;border-radius:4px}:host([data-size=md]) .ath-pkey{font-size:11.5px}:host([data-size=lg]) .ath-pkey{font-size:14px;padding:3px 8px;font-weight:700}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthProjectKeyBadgeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-project-key-badge', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"ath-pkey\">{{ projectKey }}</span>\n", styles: [":host{display:inline-flex;align-items:center;justify-content:center;--pkey-color: var(--fg-3);--pkey-border: var(--border);--pkey-bg: transparent}.ath-pkey{display:inline-flex;align-items:center;justify-content:center;padding:1px 6px;font-family:var(--font-mono);font-feature-settings:\"ss01\",\"zero\",\"tnum\";font-weight:600;letter-spacing:0;text-transform:uppercase;border-radius:var(--r-sm);color:var(--pkey-color);background:var(--pkey-bg);border:1px solid var(--pkey-border);line-height:1.3;white-space:nowrap}:host([data-size=sm]) .ath-pkey{font-size:10px;padding:1px 5px;border-radius:4px}:host([data-size=md]) .ath-pkey{font-size:11.5px}:host([data-size=lg]) .ath-pkey{font-size:14px;padding:3px 8px;font-weight:700}\n"] }]
        }], propDecorators: { projectKey: [{
                type: Input,
                args: [{ required: true }]
            }], color: [{
                type: Input
            }], size: [{
                type: Input
            }], hostSize: [{
                type: HostBinding,
                args: ['attr.data-size']
            }], cssColor: [{
                type: HostBinding,
                args: ['style.--pkey-color']
            }], cssBorder: [{
                type: HostBinding,
                args: ['style.--pkey-border']
            }], cssBg: [{
                type: HostBinding,
                args: ['style.--pkey-bg']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1rZXktYmFkZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3Byb2plY3Qta2V5LWJhZGdlL3Byb2plY3Qta2V5LWJhZGdlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9wcm9qZWN0LWtleS1iYWRnZS9wcm9qZWN0LWtleS1iYWRnZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUkvQzs7Ozs7Ozs7R0FRRztBQVNILE1BQU0sT0FBTywyQkFBMkI7SUFSeEM7UUFXRSxxRUFBcUU7UUFDNUQsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUVsQixTQUFJLEdBQW1CLElBQUksQ0FBQztLQXNCdEM7SUFwQkMsSUFBbUMsUUFBUTtRQUN6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFDSSxTQUFTO1FBQ1gsWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQ0ksS0FBSztRQUNQLFlBQVk7UUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7K0dBM0JVLDJCQUEyQjttR0FBM0IsMkJBQTJCLG1VQ3RCeEMsb0RBQ0EsaXhCRGdCWSxZQUFZOzs0RkFLWCwyQkFBMkI7a0JBUnZDLFNBQVM7K0JBQ0UsdUJBQXVCLGNBQ3JCLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxtQkFDTix1QkFBdUIsQ0FBQyxNQUFNOzhCQUtwQixVQUFVO3NCQUFwQyxLQUFLO3VCQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtnQkFHaEIsS0FBSztzQkFBYixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFNkIsUUFBUTtzQkFBMUMsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBS3pCLFFBQVE7c0JBRFgsV0FBVzt1QkFBQyxvQkFBb0I7Z0JBTTdCLFNBQVM7c0JBRFosV0FBVzt1QkFBQyxxQkFBcUI7Z0JBTzlCLEtBQUs7c0JBRFIsV0FBVzt1QkFBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCB0eXBlIFByb2plY3RLZXlTaXplID0gJ3NtJyB8ICdtZCcgfCAnbGcnO1xuXG4vKipcbiAqIENvbG9yZWQgcHJvamVjdC1rZXkgYmFkZ2UgKGUuZy4sIGBGTlJgLCBgV0VCYCwgYEFVVGApLlxuICpcbiAqIENvbG9ycyBhcmUgdGludGVkIGZyb20gdGhlIHByb3ZpZGVkIGBjb2xvcmAgKHByb2plY3QncyBicmFuZCBjb2xvcikuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtcHJvamVjdC1rZXktYmFkZ2UgcHJvamVjdEtleT1cIldFQlwiIGNvbG9yPVwiI2U5Yjg2NFwiIC8+XG4gKiA8YXRoLXByb2plY3Qta2V5LWJhZGdlIHByb2plY3RLZXk9XCJGTlJcIiBjb2xvcj1cIiM3YWE5ZjVcIiBzaXplPVwibGdcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtcHJvamVjdC1rZXktYmFkZ2UnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9qZWN0LWtleS1iYWRnZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9wcm9qZWN0LWtleS1iYWRnZS5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFByb2plY3RLZXlCYWRnZUNvbXBvbmVudCB7XG4gIEBJbnB1dCh7IHJlcXVpcmVkOiB0cnVlIH0pIHByb2plY3RLZXkhOiBzdHJpbmc7XG5cbiAgLyoqIEhleCBjb2xvciAoZS5nLiwgYCNlOWI4NjRgKS4gVXNlZCB0byB0aW50IGJvcmRlciArIGJhY2tncm91bmQuICovXG4gIEBJbnB1dCgpIGNvbG9yID0gJyM2YjcyODAnO1xuXG4gIEBJbnB1dCgpIHNpemU6IFByb2plY3RLZXlTaXplID0gJ21kJztcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGF0YS1zaXplJykgZ2V0IGhvc3RTaXplKCk6IFByb2plY3RLZXlTaXplIHtcbiAgICByZXR1cm4gdGhpcy5zaXplO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS4tLXBrZXktY29sb3InKVxuICBnZXQgY3NzQ29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb2xvcjtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuLS1wa2V5LWJvcmRlcicpXG4gIGdldCBjc3NCb3JkZXIoKTogc3RyaW5nIHtcbiAgICAvLyAyNSUgYWxwaGFcbiAgICByZXR1cm4gdGhpcy5jb2xvciArICc0MCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLi0tcGtleS1iZycpXG4gIGdldCBjc3NCZygpOiBzdHJpbmcge1xuICAgIC8vIH43JSBhbHBoYVxuICAgIHJldHVybiB0aGlzLmNvbG9yICsgJzEyJztcbiAgfVxufVxuIiwiPHNwYW4gY2xhc3M9XCJhdGgtcGtleVwiPnt7IHByb2plY3RLZXkgfX08L3NwYW4+XG4iXX0=