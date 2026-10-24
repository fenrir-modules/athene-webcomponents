import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, signal, } from '@angular/core';
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
    constructor() {
        this.labels = injectAthLabels();
        /** Value to copy to clipboard */
        this.value = input.required();
        /** Optional tooltip/label */
        this.label = input(null);
        this.copied = signal(false);
        this.copyIcon = Copy;
        this.checkIcon = Check;
        inject(DestroyRef).onDestroy(() => clearTimeout(this.resetTimeout));
    }
    async copy() {
        const value = this.value();
        try {
            await navigator.clipboard.writeText(value);
        }
        catch {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = value;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
        this.copied.set(true);
        // Feedback timer, not change detection: the signal schedules the render.
        clearTimeout(this.resetTimeout);
        this.resetTimeout = setTimeout(() => this.copied.set(false), 2000);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCopyButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.14", type: AthCopyButtonComponent, isStandalone: true, selector: "ath-copy-button", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-copy-button\"\n  [class.ath-copy-button--copied]=\"copied()\"\n  [attr.aria-label]=\"copied() ? labels.copied() : (label() ?? labels.copy())\"\n  (click)=\"copy()\"\n>\n  <lucide-icon [img]=\"copied() ? checkIcon : copyIcon\" [size]=\"16\" />\n</button>\n", styles: [".ath-copy-button{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--fg-3);background:none;border:1px solid var(--border);border-radius:var(--r-sm);cursor:pointer;transition:all var(--t-fast)}.ath-copy-button:hover{color:var(--fg);border-color:var(--border-strong);background-color:var(--bg-2)}.ath-copy-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--accent)}.ath-copy-button--copied{color:var(--green);border-color:var(--green)}.ath-copy-button--copied:hover{color:var(--green)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCopyButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-copy-button', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"ath-copy-button\"\n  [class.ath-copy-button--copied]=\"copied()\"\n  [attr.aria-label]=\"copied() ? labels.copied() : (label() ?? labels.copy())\"\n  (click)=\"copy()\"\n>\n  <lucide-icon [img]=\"copied() ? checkIcon : copyIcon\" [size]=\"16\" />\n</button>\n", styles: [".ath-copy-button{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--fg-3);background:none;border:1px solid var(--border);border-radius:var(--r-sm);cursor:pointer;transition:all var(--t-fast)}.ath-copy-button:hover{color:var(--fg);border-color:var(--border-strong);background-color:var(--bg-2)}.ath-copy-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--accent)}.ath-copy-button--copied{color:var(--green);border-color:var(--green)}.ath-copy-button--copied:hover{color:var(--green)}\n"] }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2NvcHktYnV0dG9uL2NvcHktYnV0dG9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9jb3B5LWJ1dHRvbi9jb3B5LWJ1dHRvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7QUFFcEQ7Ozs7Ozs7O0dBUUc7QUFTSCxNQUFNLE9BQU8sc0JBQXNCO0lBZWpDO1FBZG1CLFdBQU0sR0FBRyxlQUFlLEVBQUUsQ0FBQztRQUU5QyxpQ0FBaUM7UUFDeEIsVUFBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQVUsQ0FBQztRQUUxQyw2QkFBNkI7UUFDcEIsVUFBSyxHQUFHLEtBQUssQ0FBZ0IsSUFBSSxDQUFDLENBQUM7UUFFekIsV0FBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFLbkMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJO1FBQ1IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQztZQUNILE1BQU0sU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUFDLE1BQU0sQ0FBQztZQUNQLDhCQUE4QjtZQUM5QixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BELFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUNsQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLHlFQUF5RTtRQUN6RSxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7K0dBdENVLHNCQUFzQjttR0FBdEIsc0JBQXNCLHNVQzdCbkMsMlNBU0EsK2xCRGVZLFlBQVksOEJBQUUsbUJBQW1COzs0RkFLaEMsc0JBQXNCO2tCQVJsQyxTQUFTOytCQUNFLGlCQUFpQixjQUNmLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQyxtQkFDM0IsdUJBQXVCLENBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIERlc3Ryb3lSZWYsXG4gIGluamVjdCxcbiAgaW5wdXQsXG4gIHNpZ25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTHVjaWRlQW5ndWxhck1vZHVsZSwgQ29weSwgQ2hlY2sgfSBmcm9tICdsdWNpZGUtYW5ndWxhcic7XG5pbXBvcnQgeyBpbmplY3RBdGhMYWJlbHMgfSBmcm9tICcuLi8uLi9pMThuL2xhYmVscyc7XG5cbi8qKlxuICogQXRoZW5lIENvcHkgQnV0dG9uIENvbXBvbmVudFxuICpcbiAqIE9uZS1jbGljayBjb3B5LXRvLWNsaXBib2FyZCB3aXRoIHN1Y2Nlc3MgZmVlZGJhY2suXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtY29weS1idXR0b24gW3ZhbHVlXT1cImFwaUtleVwiIC8+XG4gKiA8YXRoLWNvcHktYnV0dG9uIFt2YWx1ZV09XCJzZWNyZXRUb2tlblwiIGxhYmVsPVwiQ29weSB0b2tlblwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1jb3B5LWJ1dHRvbicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEx1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvcHktYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2NvcHktYnV0dG9uLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoQ29weUJ1dHRvbkNvbXBvbmVudCB7XG4gIHByb3RlY3RlZCByZWFkb25seSBsYWJlbHMgPSBpbmplY3RBdGhMYWJlbHMoKTtcblxuICAvKiogVmFsdWUgdG8gY29weSB0byBjbGlwYm9hcmQgKi9cbiAgcmVhZG9ubHkgdmFsdWUgPSBpbnB1dC5yZXF1aXJlZDxzdHJpbmc+KCk7XG5cbiAgLyoqIE9wdGlvbmFsIHRvb2x0aXAvbGFiZWwgKi9cbiAgcmVhZG9ubHkgbGFiZWwgPSBpbnB1dDxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29waWVkID0gc2lnbmFsKGZhbHNlKTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvcHlJY29uID0gQ29weTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGNoZWNrSWNvbiA9IENoZWNrO1xuXG4gIHByaXZhdGUgcmVzZXRUaW1lb3V0OiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBpbmplY3QoRGVzdHJveVJlZikub25EZXN0cm95KCgpID0+IGNsZWFyVGltZW91dCh0aGlzLnJlc2V0VGltZW91dCkpO1xuICB9XG5cbiAgYXN5bmMgY29weSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWUoKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodmFsdWUpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gRmFsbGJhY2sgZm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICBjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgICB0ZXh0YXJlYS52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGV4dGFyZWEuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgdGV4dGFyZWEuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGV4dGFyZWEpO1xuICAgICAgdGV4dGFyZWEuc2VsZWN0KCk7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0ZXh0YXJlYSk7XG4gICAgfVxuICAgIHRoaXMuY29waWVkLnNldCh0cnVlKTtcbiAgICAvLyBGZWVkYmFjayB0aW1lciwgbm90IGNoYW5nZSBkZXRlY3Rpb246IHRoZSBzaWduYWwgc2NoZWR1bGVzIHRoZSByZW5kZXIuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzZXRUaW1lb3V0KTtcbiAgICB0aGlzLnJlc2V0VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jb3BpZWQuc2V0KGZhbHNlKSwgMjAwMCk7XG4gIH1cbn1cbiIsIjxidXR0b25cbiAgdHlwZT1cImJ1dHRvblwiXG4gIGNsYXNzPVwiYXRoLWNvcHktYnV0dG9uXCJcbiAgW2NsYXNzLmF0aC1jb3B5LWJ1dHRvbi0tY29waWVkXT1cImNvcGllZCgpXCJcbiAgW2F0dHIuYXJpYS1sYWJlbF09XCJjb3BpZWQoKSA/IGxhYmVscy5jb3BpZWQoKSA6IChsYWJlbCgpID8/IGxhYmVscy5jb3B5KCkpXCJcbiAgKGNsaWNrKT1cImNvcHkoKVwiXG4+XG4gIDxsdWNpZGUtaWNvbiBbaW1nXT1cImNvcGllZCgpID8gY2hlY2tJY29uIDogY29weUljb25cIiBbc2l6ZV09XCIxNlwiIC8+XG48L2J1dHRvbj5cbiJdfQ==