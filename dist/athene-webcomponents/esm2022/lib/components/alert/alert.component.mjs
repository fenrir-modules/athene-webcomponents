import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Athene Alert Component
 *
 * Display feedback messages.
 *
 * @example
 * <ath-alert variant="error" message="Something went wrong" />
 * <ath-alert variant="success" message="Saved successfully" [dismissible]="true" />
 */
export class AthAlertComponent {
    constructor() {
        /** Alert variant */
        this.variant = 'info';
        /** Alert message */
        this.message = '';
        /** Show dismiss button */
        this.dismissible = false;
        /** Dismiss event */
        this.dismissed = new EventEmitter();
    }
    get alertClasses() {
        return ['ath-alert', `ath-alert--${this.variant}`].join(' ');
    }
    dismiss() {
        this.dismissed.emit();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAlertComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthAlertComponent, isStandalone: true, selector: "ath-alert", inputs: { variant: "variant", message: "message", dismissible: "dismissible" }, outputs: { dismissed: "dismissed" }, ngImport: i0, template: "<div [class]=\"alertClasses\" role=\"alert\">\n  <span class=\"ath-alert__message\">{{ message }}</span>\n  @if (dismissible) {\n    <button class=\"ath-alert__dismiss\" (click)=\"dismiss()\" aria-label=\"Dismiss\">\n      \u00D7\n    </button>\n  }\n</div>\n", styles: [".ath-alert{display:flex;align-items:center;justify-content:space-between;gap:var(--ath-space-3);padding:var(--ath-space-3) var(--ath-space-4);border-radius:var(--ath-border-radius-md);font-size:var(--ath-font-size-sm)}.ath-alert__message{flex:1}.ath-alert__dismiss{display:flex;align-items:center;justify-content:center;width:20px;height:20px;padding:0;border:none;border-radius:var(--ath-border-radius-sm);background:transparent;color:inherit;font-size:16px;line-height:1;cursor:pointer;opacity:.7;transition:opacity var(--ath-transition-fast),background var(--ath-transition-fast)}.ath-alert__dismiss:hover{opacity:1;background:#ffffff1a}.ath-alert--info{background:#3b82f61f;border:1px solid rgba(59,130,246,.25);color:var(--ath-color-info)}.ath-alert--success{background:#22c55e1f;border:1px solid rgba(34,197,94,.25);color:var(--ath-color-success)}.ath-alert--warning{background:#c9963a1f;border:1px solid rgba(201,150,58,.25);color:var(--ath-color-primary)}.ath-alert--error{background:#ef44441f;border:1px solid rgba(239,68,68,.25);color:var(--ath-color-error)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAlertComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-alert', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"alertClasses\" role=\"alert\">\n  <span class=\"ath-alert__message\">{{ message }}</span>\n  @if (dismissible) {\n    <button class=\"ath-alert__dismiss\" (click)=\"dismiss()\" aria-label=\"Dismiss\">\n      \u00D7\n    </button>\n  }\n</div>\n", styles: [".ath-alert{display:flex;align-items:center;justify-content:space-between;gap:var(--ath-space-3);padding:var(--ath-space-3) var(--ath-space-4);border-radius:var(--ath-border-radius-md);font-size:var(--ath-font-size-sm)}.ath-alert__message{flex:1}.ath-alert__dismiss{display:flex;align-items:center;justify-content:center;width:20px;height:20px;padding:0;border:none;border-radius:var(--ath-border-radius-sm);background:transparent;color:inherit;font-size:16px;line-height:1;cursor:pointer;opacity:.7;transition:opacity var(--ath-transition-fast),background var(--ath-transition-fast)}.ath-alert__dismiss:hover{opacity:1;background:#ffffff1a}.ath-alert--info{background:#3b82f61f;border:1px solid rgba(59,130,246,.25);color:var(--ath-color-info)}.ath-alert--success{background:#22c55e1f;border:1px solid rgba(34,197,94,.25);color:var(--ath-color-success)}.ath-alert--warning{background:#c9963a1f;border:1px solid rgba(201,150,58,.25);color:var(--ath-color-primary)}.ath-alert--error{background:#ef44441f;border:1px solid rgba(239,68,68,.25);color:var(--ath-color-error)}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], message: [{
                type: Input,
                args: [{ required: true }]
            }], dismissible: [{
                type: Input
            }], dismissed: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9hbGVydC9hbGVydC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFPL0M7Ozs7Ozs7O0dBUUc7QUFTSCxNQUFNLE9BQU8saUJBQWlCO0lBUjlCO1FBU0Usb0JBQW9CO1FBQ1gsWUFBTyxHQUFpQixNQUFNLENBQUM7UUFFeEMsb0JBQW9CO1FBQ08sWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUV4QywwQkFBMEI7UUFDakIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFN0Isb0JBQW9CO1FBQ1YsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7S0FTaEQ7SUFQQyxJQUFJLFlBQVk7UUFDZCxPQUFPLENBQUMsV0FBVyxFQUFFLGNBQWMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDOytHQW5CVSxpQkFBaUI7bUdBQWpCLGlCQUFpQiwwTEN6QjlCLHFRQVFBLHVtQ0RZWSxZQUFZOzs0RkFLWCxpQkFBaUI7a0JBUjdCLFNBQVM7K0JBQ0UsV0FBVyxjQUNULElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxtQkFDTix1QkFBdUIsQ0FBQyxNQUFNOzhCQU10QyxPQUFPO3NCQUFmLEtBQUs7Z0JBR3FCLE9BQU87c0JBQWpDLEtBQUs7dUJBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO2dCQUdoQixXQUFXO3NCQUFuQixLQUFLO2dCQUdJLFNBQVM7c0JBQWxCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogQWxlcnQgdmFyaWFudCB0eXBlc1xuICovXG5leHBvcnQgdHlwZSBBbGVydFZhcmlhbnQgPSAnaW5mbycgfCAnc3VjY2VzcycgfCAnd2FybmluZycgfCAnZXJyb3InO1xuXG4vKipcbiAqIEF0aGVuZSBBbGVydCBDb21wb25lbnRcbiAqXG4gKiBEaXNwbGF5IGZlZWRiYWNrIG1lc3NhZ2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLWFsZXJ0IHZhcmlhbnQ9XCJlcnJvclwiIG1lc3NhZ2U9XCJTb21ldGhpbmcgd2VudCB3cm9uZ1wiIC8+XG4gKiA8YXRoLWFsZXJ0IHZhcmlhbnQ9XCJzdWNjZXNzXCIgbWVzc2FnZT1cIlNhdmVkIHN1Y2Nlc3NmdWxseVwiIFtkaXNtaXNzaWJsZV09XCJ0cnVlXCIgLz5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLWFsZXJ0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vYWxlcnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vYWxlcnQuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhBbGVydENvbXBvbmVudCB7XG4gIC8qKiBBbGVydCB2YXJpYW50ICovXG4gIEBJbnB1dCgpIHZhcmlhbnQ6IEFsZXJ0VmFyaWFudCA9ICdpbmZvJztcblxuICAvKiogQWxlcnQgbWVzc2FnZSAqL1xuICBASW5wdXQoeyByZXF1aXJlZDogdHJ1ZSB9KSBtZXNzYWdlID0gJyc7XG5cbiAgLyoqIFNob3cgZGlzbWlzcyBidXR0b24gKi9cbiAgQElucHV0KCkgZGlzbWlzc2libGUgPSBmYWxzZTtcblxuICAvKiogRGlzbWlzcyBldmVudCAqL1xuICBAT3V0cHV0KCkgZGlzbWlzc2VkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIGdldCBhbGVydENsYXNzZXMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gWydhdGgtYWxlcnQnLCBgYXRoLWFsZXJ0LS0ke3RoaXMudmFyaWFudH1gXS5qb2luKCcgJyk7XG4gIH1cblxuICBkaXNtaXNzKCk6IHZvaWQge1xuICAgIHRoaXMuZGlzbWlzc2VkLmVtaXQoKTtcbiAgfVxufVxuIiwiPGRpdiBbY2xhc3NdPVwiYWxlcnRDbGFzc2VzXCIgcm9sZT1cImFsZXJ0XCI+XG4gIDxzcGFuIGNsYXNzPVwiYXRoLWFsZXJ0X19tZXNzYWdlXCI+e3sgbWVzc2FnZSB9fTwvc3Bhbj5cbiAgQGlmIChkaXNtaXNzaWJsZSkge1xuICAgIDxidXR0b24gY2xhc3M9XCJhdGgtYWxlcnRfX2Rpc21pc3NcIiAoY2xpY2spPVwiZGlzbWlzcygpXCIgYXJpYS1sYWJlbD1cIkRpc21pc3NcIj5cbiAgICAgIMOXXG4gICAgPC9idXR0b24+XG4gIH1cbjwvZGl2PlxuIl19