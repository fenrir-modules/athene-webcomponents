import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
const LABELS = {
    open: 'Open',
    prog: 'In Progress',
    review: 'In Review',
    done: 'Done',
    blocked: 'Blocked',
    closed: 'Closed',
};
/**
 * Status indicator for a ticket: colored inner-ring dot + label.
 *
 * @example
 * <ath-status-pill status="open" />
 * <ath-status-pill status="prog" [showLabel]="false" />
 * <ath-status-pill status="done" size="sm" />
 */
export class AthStatusPillComponent {
    constructor() {
        this.status = 'open';
        this.showDot = true;
        this.showLabel = true;
        this.size = 'md';
        /** Optional override label (otherwise the default label for the status is used). */
        this.label = null;
    }
    get hostStatus() {
        return this.status;
    }
    get hostSize() {
        return this.size;
    }
    get computedLabel() {
        return this.label ?? LABELS[this.status] ?? this.status;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatusPillComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthStatusPillComponent, isStandalone: true, selector: "ath-status-pill", inputs: { status: "status", showDot: "showDot", showLabel: "showLabel", size: "size", label: "label" }, host: { properties: { "attr.data-status": "this.hostStatus", "attr.data-size": "this.hostSize" } }, ngImport: i0, template: "@if (showDot) {\n  <i class=\"ath-status-pill__dot\" aria-hidden=\"true\"></i>\n}\n@if (showLabel) {\n  <span class=\"ath-status-pill__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--fg-2);white-space:nowrap;line-height:1;letter-spacing:0}:host([data-size=sm]){font-size:11.5px;gap:5px}:host([data-size=sm]) .ath-status-pill__dot{width:6px;height:6px}.ath-status-pill__dot{width:8px;height:8px;border-radius:999px;flex-shrink:0;background:var(--fg-4);box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor;color:var(--fg-4)}.ath-status-pill__label{font-family:var(--font-sans)}:host([data-status=open]) .ath-status-pill__dot{background:var(--red);color:var(--red)}:host([data-status=prog]) .ath-status-pill__dot{background:var(--amber);color:var(--amber)}:host([data-status=review]) .ath-status-pill__dot{background:var(--blue);color:var(--blue)}:host([data-status=done]) .ath-status-pill__dot{background:var(--green);color:var(--green)}:host([data-status=blocked]) .ath-status-pill__dot{background:var(--purple);color:var(--purple)}:host([data-status=closed]){color:var(--fg-3)}:host([data-status=closed]) .ath-status-pill__dot{background:var(--fg-4);color:var(--fg-4)}[data-theme=dark] :host .ath-status-pill__dot{box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatusPillComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-status-pill', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (showDot) {\n  <i class=\"ath-status-pill__dot\" aria-hidden=\"true\"></i>\n}\n@if (showLabel) {\n  <span class=\"ath-status-pill__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--fg-2);white-space:nowrap;line-height:1;letter-spacing:0}:host([data-size=sm]){font-size:11.5px;gap:5px}:host([data-size=sm]) .ath-status-pill__dot{width:6px;height:6px}.ath-status-pill__dot{width:8px;height:8px;border-radius:999px;flex-shrink:0;background:var(--fg-4);box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor;color:var(--fg-4)}.ath-status-pill__label{font-family:var(--font-sans)}:host([data-status=open]) .ath-status-pill__dot{background:var(--red);color:var(--red)}:host([data-status=prog]) .ath-status-pill__dot{background:var(--amber);color:var(--amber)}:host([data-status=review]) .ath-status-pill__dot{background:var(--blue);color:var(--blue)}:host([data-status=done]) .ath-status-pill__dot{background:var(--green);color:var(--green)}:host([data-status=blocked]) .ath-status-pill__dot{background:var(--purple);color:var(--purple)}:host([data-status=closed]){color:var(--fg-3)}:host([data-status=closed]) .ath-status-pill__dot{background:var(--fg-4);color:var(--fg-4)}[data-theme=dark] :host .ath-status-pill__dot{box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor}\n"] }]
        }], propDecorators: { status: [{
                type: Input
            }], showDot: [{
                type: Input
            }], showLabel: [{
                type: Input
            }], size: [{
                type: Input
            }], label: [{
                type: Input
            }], hostStatus: [{
                type: HostBinding,
                args: ['attr.data-status']
            }], hostSize: [{
                type: HostBinding,
                args: ['attr.data-size']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLXBpbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3N0YXR1cy1waWxsL3N0YXR1cy1waWxsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zdGF0dXMtcGlsbC9zdGF0dXMtcGlsbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUsvQyxNQUFNLE1BQU0sR0FBMkM7SUFDckQsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsYUFBYTtJQUNuQixNQUFNLEVBQUUsV0FBVztJQUNuQixJQUFJLEVBQUUsTUFBTTtJQUNaLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLE1BQU0sRUFBRSxRQUFRO0NBQ2pCLENBQUM7QUFFRjs7Ozs7OztHQU9HO0FBU0gsTUFBTSxPQUFPLHNCQUFzQjtJQVJuQztRQVNXLFdBQU0sR0FBaUIsTUFBTSxDQUFDO1FBQzlCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLFNBQUksR0FBbUIsSUFBSSxDQUFDO1FBRXJDLG9GQUFvRjtRQUMzRSxVQUFLLEdBQWtCLElBQUksQ0FBQztLQWF0QztJQVhDLElBQXFDLFVBQVU7UUFDN0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFtQyxRQUFRO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBYyxhQUFhO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDMUQsQ0FBQzsrR0FuQlUsc0JBQXNCO21HQUF0QixzQkFBc0IsdVJDL0JuQyxnTEFNQSwydUNEb0JZLFlBQVk7OzRGQUtYLHNCQUFzQjtrQkFSbEMsU0FBUzsrQkFDRSxpQkFBaUIsY0FDZixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsbUJBQ04sdUJBQXVCLENBQUMsTUFBTTs4QkFLdEMsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFHRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRStCLFVBQVU7c0JBQTlDLFdBQVc7dUJBQUMsa0JBQWtCO2dCQUlJLFFBQVE7c0JBQTFDLFdBQVc7dUJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgdHlwZSBUaWNrZXRTdGF0dXMgPSAnb3BlbicgfCAncHJvZycgfCAncmV2aWV3JyB8ICdkb25lJyB8ICdibG9ja2VkJyB8ICdjbG9zZWQnO1xuZXhwb3J0IHR5cGUgU3RhdHVzUGlsbFNpemUgPSAnc20nIHwgJ21kJztcblxuY29uc3QgTEFCRUxTOiBSZWFkb25seTxSZWNvcmQ8VGlja2V0U3RhdHVzLCBzdHJpbmc+PiA9IHtcbiAgb3BlbjogJ09wZW4nLFxuICBwcm9nOiAnSW4gUHJvZ3Jlc3MnLFxuICByZXZpZXc6ICdJbiBSZXZpZXcnLFxuICBkb25lOiAnRG9uZScsXG4gIGJsb2NrZWQ6ICdCbG9ja2VkJyxcbiAgY2xvc2VkOiAnQ2xvc2VkJyxcbn07XG5cbi8qKlxuICogU3RhdHVzIGluZGljYXRvciBmb3IgYSB0aWNrZXQ6IGNvbG9yZWQgaW5uZXItcmluZyBkb3QgKyBsYWJlbC5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1zdGF0dXMtcGlsbCBzdGF0dXM9XCJvcGVuXCIgLz5cbiAqIDxhdGgtc3RhdHVzLXBpbGwgc3RhdHVzPVwicHJvZ1wiIFtzaG93TGFiZWxdPVwiZmFsc2VcIiAvPlxuICogPGF0aC1zdGF0dXMtcGlsbCBzdGF0dXM9XCJkb25lXCIgc2l6ZT1cInNtXCIgLz5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLXN0YXR1cy1waWxsJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vc3RhdHVzLXBpbGwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vc3RhdHVzLXBpbGwuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhTdGF0dXNQaWxsQ29tcG9uZW50IHtcbiAgQElucHV0KCkgc3RhdHVzOiBUaWNrZXRTdGF0dXMgPSAnb3Blbic7XG4gIEBJbnB1dCgpIHNob3dEb3QgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93TGFiZWwgPSB0cnVlO1xuICBASW5wdXQoKSBzaXplOiBTdGF0dXNQaWxsU2l6ZSA9ICdtZCc7XG5cbiAgLyoqIE9wdGlvbmFsIG92ZXJyaWRlIGxhYmVsIChvdGhlcndpc2UgdGhlIGRlZmF1bHQgbGFiZWwgZm9yIHRoZSBzdGF0dXMgaXMgdXNlZCkuICovXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGF0YS1zdGF0dXMnKSBnZXQgaG9zdFN0YXR1cygpOiBUaWNrZXRTdGF0dXMge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5kYXRhLXNpemUnKSBnZXQgaG9zdFNpemUoKTogU3RhdHVzUGlsbFNpemUge1xuICAgIHJldHVybiB0aGlzLnNpemU7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IGNvbXB1dGVkTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sYWJlbCA/PyBMQUJFTFNbdGhpcy5zdGF0dXNdID8/IHRoaXMuc3RhdHVzO1xuICB9XG59XG4iLCJAaWYgKHNob3dEb3QpIHtcbiAgPGkgY2xhc3M9XCJhdGgtc3RhdHVzLXBpbGxfX2RvdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbn1cbkBpZiAoc2hvd0xhYmVsKSB7XG4gIDxzcGFuIGNsYXNzPVwiYXRoLXN0YXR1cy1waWxsX19sYWJlbFwiPnt7IGNvbXB1dGVkTGFiZWwgfX08L3NwYW4+XG59XG4iXX0=