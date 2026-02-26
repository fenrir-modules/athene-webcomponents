import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Copy, Check } from 'lucide-angular';
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
        /** Value to copy to clipboard */
        this.value = '';
        /** Optional tooltip/label */
        this.label = 'Copy';
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthCopyButtonComponent, isStandalone: true, selector: "ath-copy-button", inputs: { value: "value", label: "label" }, ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-copy-button\"\n  [class.ath-copy-button--copied]=\"copied\"\n  [attr.aria-label]=\"copied ? 'Copied' : label\"\n  (click)=\"copy()\"\n>\n  <lucide-icon [img]=\"copied ? checkIcon : copyIcon\" [size]=\"16\" />\n</button>\n", styles: [".ath-copy-button{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:all var(--ath-transition-fast)}.ath-copy-button:hover{color:var(--ath-text-primary);border-color:var(--ath-border-color-hover);background-color:var(--ath-bg-tertiary)}.ath-copy-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-border-color-focus)}.ath-copy-button--copied{color:var(--ath-color-success);border-color:var(--ath-color-success)}.ath-copy-button--copied:hover{color:var(--ath-color-success)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCopyButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-copy-button', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"ath-copy-button\"\n  [class.ath-copy-button--copied]=\"copied\"\n  [attr.aria-label]=\"copied ? 'Copied' : label\"\n  (click)=\"copy()\"\n>\n  <lucide-icon [img]=\"copied ? checkIcon : copyIcon\" [size]=\"16\" />\n</button>\n", styles: [".ath-copy-button{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:all var(--ath-transition-fast)}.ath-copy-button:hover{color:var(--ath-text-primary);border-color:var(--ath-border-color-hover);background-color:var(--ath-bg-tertiary)}.ath-copy-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-border-color-focus)}.ath-copy-button--copied{color:var(--ath-color-success);border-color:var(--ath-color-success)}.ath-copy-button--copied:hover{color:var(--ath-color-success)}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { value: [{
                type: Input,
                args: [{ required: true }]
            }], label: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2NvcHktYnV0dG9uL2NvcHktYnV0dG9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9jb3B5LWJ1dHRvbi9jb3B5LWJ1dHRvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0YsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUVsRTs7Ozs7Ozs7R0FRRztBQVNILE1BQU0sT0FBTyxzQkFBc0I7SUFhakMsWUFBb0IsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFaMUMsaUNBQWlDO1FBQ04sVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUV0Qyw2QkFBNkI7UUFDcEIsVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUVkLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDTixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFN0IsaUJBQVksR0FBeUMsSUFBSSxDQUFDO0lBRXJCLENBQUM7SUFFOUMsS0FBSyxDQUFDLElBQUk7UUFDUixJQUFJLENBQUM7WUFDSCxNQUFNLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBRXhCLElBQUksSUFBSSxDQUFDLFlBQVk7Z0JBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzFCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNYLENBQUM7UUFBQyxNQUFNLENBQUM7WUFDUCw4QkFBOEI7WUFDOUIsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwRCxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDNUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQ2xDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBRXhCLElBQUksSUFBSSxDQUFDLFlBQVk7Z0JBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzFCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNYLENBQUM7SUFDSCxDQUFDOytHQTlDVSxzQkFBc0I7bUdBQXRCLHNCQUFzQix1SENyQm5DLHlRQVNBLHl1QkRPWSxZQUFZLDhCQUFFLG1CQUFtQjs7NEZBS2hDLHNCQUFzQjtrQkFSbEMsU0FBUzsrQkFDRSxpQkFBaUIsY0FDZixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUMsbUJBQzNCLHVCQUF1QixDQUFDLE1BQU07c0ZBTXBCLEtBQUs7c0JBQS9CLEtBQUs7dUJBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO2dCQUdoQixLQUFLO3NCQUFiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBMdWNpZGVBbmd1bGFyTW9kdWxlLCBDb3B5LCBDaGVjayB9IGZyb20gJ2x1Y2lkZS1hbmd1bGFyJztcblxuLyoqXG4gKiBBdGhlbmUgQ29weSBCdXR0b24gQ29tcG9uZW50XG4gKlxuICogT25lLWNsaWNrIGNvcHktdG8tY2xpcGJvYXJkIHdpdGggc3VjY2VzcyBmZWVkYmFjay5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1jb3B5LWJ1dHRvbiBbdmFsdWVdPVwiYXBpS2V5XCIgLz5cbiAqIDxhdGgtY29weS1idXR0b24gW3ZhbHVlXT1cInNlY3JldFRva2VuXCIgbGFiZWw9XCJDb3B5IHRva2VuXCIgLz5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLWNvcHktYnV0dG9uJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTHVjaWRlQW5ndWxhck1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vY29weS1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vY29weS1idXR0b24uY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhDb3B5QnV0dG9uQ29tcG9uZW50IHtcbiAgLyoqIFZhbHVlIHRvIGNvcHkgdG8gY2xpcGJvYXJkICovXG4gIEBJbnB1dCh7IHJlcXVpcmVkOiB0cnVlIH0pIHZhbHVlID0gJyc7XG5cbiAgLyoqIE9wdGlvbmFsIHRvb2x0aXAvbGFiZWwgKi9cbiAgQElucHV0KCkgbGFiZWwgPSAnQ29weSc7XG5cbiAgcHJvdGVjdGVkIGNvcGllZCA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29weUljb24gPSBDb3B5O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY2hlY2tJY29uID0gQ2hlY2s7XG5cbiAgcHJpdmF0ZSByZXNldFRpbWVvdXQ6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIGFzeW5jIGNvcHkoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRoaXMudmFsdWUpO1xuICAgICAgdGhpcy5jb3BpZWQgPSB0cnVlO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgIGlmICh0aGlzLnJlc2V0VGltZW91dCkgY2xlYXJUaW1lb3V0KHRoaXMucmVzZXRUaW1lb3V0KTtcbiAgICAgIHRoaXMucmVzZXRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY29waWVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSwgMjAwMCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBGYWxsYmFjayBmb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgIHRleHRhcmVhLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIHRleHRhcmVhLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgIHRleHRhcmVhLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRleHRhcmVhKTtcbiAgICAgIHRleHRhcmVhLnNlbGVjdCgpO1xuICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGV4dGFyZWEpO1xuXG4gICAgICB0aGlzLmNvcGllZCA9IHRydWU7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgaWYgKHRoaXMucmVzZXRUaW1lb3V0KSBjbGVhclRpbWVvdXQodGhpcy5yZXNldFRpbWVvdXQpO1xuICAgICAgdGhpcy5yZXNldFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jb3BpZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxidXR0b25cbiAgdHlwZT1cImJ1dHRvblwiXG4gIGNsYXNzPVwiYXRoLWNvcHktYnV0dG9uXCJcbiAgW2NsYXNzLmF0aC1jb3B5LWJ1dHRvbi0tY29waWVkXT1cImNvcGllZFwiXG4gIFthdHRyLmFyaWEtbGFiZWxdPVwiY29waWVkID8gJ0NvcGllZCcgOiBsYWJlbFwiXG4gIChjbGljayk9XCJjb3B5KClcIlxuPlxuICA8bHVjaWRlLWljb24gW2ltZ109XCJjb3BpZWQgPyBjaGVja0ljb24gOiBjb3B5SWNvblwiIFtzaXplXT1cIjE2XCIgLz5cbjwvYnV0dG9uPlxuIl19