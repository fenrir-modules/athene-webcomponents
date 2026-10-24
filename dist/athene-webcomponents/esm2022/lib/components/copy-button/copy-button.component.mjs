import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Copy, Check } from 'lucide-angular';
import { injectAthLabels } from '../../i18n/labels';
import * as i0 from "@angular/core";
import * as i1 from "lucide-angular";
/**
 * Athene Copy Button Component
 *
 * One-click copy-to-clipboard with success feedback.
 *
 * @example
 * <ath-copy-button [value]="apiKey" />
 * <ath-copy-button [value]="secretToken" label="Copy token" />
 */
export class AthCopyButtonComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.labels = injectAthLabels();
        /** Value to copy to clipboard */
        this.value = '';
        /** Optional tooltip/label */
        this.label = null;
        this.copied = false;
        this.copyIcon = Copy;
        this.checkIcon = Check;
        this.resetTimeout = null;
    }
    async copy() {
        try {
            await navigator.clipboard.writeText(this.value);
            this.copied = true;
            this.cdr.markForCheck();
            if (this.resetTimeout)
                clearTimeout(this.resetTimeout);
            this.resetTimeout = setTimeout(() => {
                this.copied = false;
                this.cdr.markForCheck();
            }, 2000);
        }
        catch {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = this.value;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.copied = true;
            this.cdr.markForCheck();
            if (this.resetTimeout)
                clearTimeout(this.resetTimeout);
            this.resetTimeout = setTimeout(() => {
                this.copied = false;
                this.cdr.markForCheck();
            }, 2000);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCopyButtonComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthCopyButtonComponent, isStandalone: true, selector: "ath-copy-button", inputs: { value: "value", label: "label" }, ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-copy-button\"\n  [class.ath-copy-button--copied]=\"copied\"\n  [attr.aria-label]=\"copied ? labels.copied() : (label ?? labels.copy())\"\n  (click)=\"copy()\"\n>\n  <lucide-icon [img]=\"copied ? checkIcon : copyIcon\" [size]=\"16\" />\n</button>\n", styles: [".ath-copy-button{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--fg-3);background:none;border:1px solid var(--border);border-radius:var(--r-sm);cursor:pointer;transition:all var(--t-fast)}.ath-copy-button:hover{color:var(--fg);border-color:var(--border-strong);background-color:var(--bg-2)}.ath-copy-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--accent)}.ath-copy-button--copied{color:var(--green);border-color:var(--green)}.ath-copy-button--copied:hover{color:var(--green)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCopyButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-copy-button', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"ath-copy-button\"\n  [class.ath-copy-button--copied]=\"copied\"\n  [attr.aria-label]=\"copied ? labels.copied() : (label ?? labels.copy())\"\n  (click)=\"copy()\"\n>\n  <lucide-icon [img]=\"copied ? checkIcon : copyIcon\" [size]=\"16\" />\n</button>\n", styles: [".ath-copy-button{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--fg-3);background:none;border:1px solid var(--border);border-radius:var(--r-sm);cursor:pointer;transition:all var(--t-fast)}.ath-copy-button:hover{color:var(--fg);border-color:var(--border-strong);background-color:var(--bg-2)}.ath-copy-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--accent)}.ath-copy-button--copied{color:var(--green);border-color:var(--green)}.ath-copy-button--copied:hover{color:var(--green)}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { value: [{
                type: Input,
                args: [{ required: true }]
            }], label: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2NvcHktYnV0dG9uL2NvcHktYnV0dG9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9jb3B5LWJ1dHRvbi9jb3B5LWJ1dHRvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0YsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7QUFFcEQ7Ozs7Ozs7O0dBUUc7QUFTSCxNQUFNLE9BQU8sc0JBQXNCO0lBZWpDLFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBZHZCLFdBQU0sR0FBRyxlQUFlLEVBQUUsQ0FBQztRQUU5QyxpQ0FBaUM7UUFDTixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRXRDLDZCQUE2QjtRQUNwQixVQUFLLEdBQWtCLElBQUksQ0FBQztRQUUzQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ04sYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRTdCLGlCQUFZLEdBQXlDLElBQUksQ0FBQztJQUVyQixDQUFDO0lBRTlDLEtBQUssQ0FBQyxJQUFJO1FBQ1IsSUFBSSxDQUFDO1lBQ0gsTUFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUV4QixJQUFJLElBQUksQ0FBQyxZQUFZO2dCQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMxQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQUMsTUFBTSxDQUFDO1lBQ1AsOEJBQThCO1lBQzlCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEQsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzVCLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUNsQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUV4QixJQUFJLElBQUksQ0FBQyxZQUFZO2dCQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMxQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDWCxDQUFDO0lBQ0gsQ0FBQzsrR0FoRFUsc0JBQXNCO21HQUF0QixzQkFBc0IsdUhDdEJuQyxtU0FTQSwrbEJEUVksWUFBWSw4QkFBRSxtQkFBbUI7OzRGQUtoQyxzQkFBc0I7a0JBUmxDLFNBQVM7K0JBQ0UsaUJBQWlCLGNBQ2YsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDLG1CQUMzQix1QkFBdUIsQ0FBQyxNQUFNO3NGQVFwQixLQUFLO3NCQUEvQixLQUFLO3VCQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtnQkFHaEIsS0FBSztzQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTHVjaWRlQW5ndWxhck1vZHVsZSwgQ29weSwgQ2hlY2sgfSBmcm9tICdsdWNpZGUtYW5ndWxhcic7XG5pbXBvcnQgeyBpbmplY3RBdGhMYWJlbHMgfSBmcm9tICcuLi8uLi9pMThuL2xhYmVscyc7XG5cbi8qKlxuICogQXRoZW5lIENvcHkgQnV0dG9uIENvbXBvbmVudFxuICpcbiAqIE9uZS1jbGljayBjb3B5LXRvLWNsaXBib2FyZCB3aXRoIHN1Y2Nlc3MgZmVlZGJhY2suXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtY29weS1idXR0b24gW3ZhbHVlXT1cImFwaUtleVwiIC8+XG4gKiA8YXRoLWNvcHktYnV0dG9uIFt2YWx1ZV09XCJzZWNyZXRUb2tlblwiIGxhYmVsPVwiQ29weSB0b2tlblwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1jb3B5LWJ1dHRvbicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEx1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvcHktYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2NvcHktYnV0dG9uLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoQ29weUJ1dHRvbkNvbXBvbmVudCB7XG4gIHByb3RlY3RlZCByZWFkb25seSBsYWJlbHMgPSBpbmplY3RBdGhMYWJlbHMoKTtcblxuICAvKiogVmFsdWUgdG8gY29weSB0byBjbGlwYm9hcmQgKi9cbiAgQElucHV0KHsgcmVxdWlyZWQ6IHRydWUgfSkgdmFsdWUgPSAnJztcblxuICAvKiogT3B0aW9uYWwgdG9vbHRpcC9sYWJlbCAqL1xuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgcHJvdGVjdGVkIGNvcGllZCA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29weUljb24gPSBDb3B5O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY2hlY2tJY29uID0gQ2hlY2s7XG5cbiAgcHJpdmF0ZSByZXNldFRpbWVvdXQ6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIGFzeW5jIGNvcHkoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRoaXMudmFsdWUpO1xuICAgICAgdGhpcy5jb3BpZWQgPSB0cnVlO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgIGlmICh0aGlzLnJlc2V0VGltZW91dCkgY2xlYXJUaW1lb3V0KHRoaXMucmVzZXRUaW1lb3V0KTtcbiAgICAgIHRoaXMucmVzZXRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY29waWVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSwgMjAwMCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBGYWxsYmFjayBmb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgIHRleHRhcmVhLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIHRleHRhcmVhLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgIHRleHRhcmVhLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRleHRhcmVhKTtcbiAgICAgIHRleHRhcmVhLnNlbGVjdCgpO1xuICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGV4dGFyZWEpO1xuXG4gICAgICB0aGlzLmNvcGllZCA9IHRydWU7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgaWYgKHRoaXMucmVzZXRUaW1lb3V0KSBjbGVhclRpbWVvdXQodGhpcy5yZXNldFRpbWVvdXQpO1xuICAgICAgdGhpcy5yZXNldFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jb3BpZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxidXR0b25cbiAgdHlwZT1cImJ1dHRvblwiXG4gIGNsYXNzPVwiYXRoLWNvcHktYnV0dG9uXCJcbiAgW2NsYXNzLmF0aC1jb3B5LWJ1dHRvbi0tY29waWVkXT1cImNvcGllZFwiXG4gIFthdHRyLmFyaWEtbGFiZWxdPVwiY29waWVkID8gbGFiZWxzLmNvcGllZCgpIDogKGxhYmVsID8/IGxhYmVscy5jb3B5KCkpXCJcbiAgKGNsaWNrKT1cImNvcHkoKVwiXG4+XG4gIDxsdWNpZGUtaWNvbiBbaW1nXT1cImNvcGllZCA/IGNoZWNrSWNvbiA6IGNvcHlJY29uXCIgW3NpemVdPVwiMTZcIiAvPlxuPC9idXR0b24+XG4iXX0=