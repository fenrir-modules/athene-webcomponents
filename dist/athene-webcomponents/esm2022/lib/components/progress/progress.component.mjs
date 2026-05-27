import { ChangeDetectionStrategy, Component, HostBinding, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Generic progress bar. Used for milestones, subtasks, sprint burn,
 * upload progress, etc.
 *
 * @example
 * <ath-progress [value]="62" />
 * <ath-progress [value]="80" tone="warning" size="md" [showLabel]="true" />
 * <ath-progress [value]="40" [total]="50" [showLabel]="true" />
 */
export class AthProgressComponent {
    constructor() {
        this._value = signal(0);
        /** Total (denominator). If unset, `value` is a percent. */
        this.total = null;
        this.tone = 'accent';
        this.size = 'sm';
        /** Show a small `X / Y` (or `X%`) label next to the bar. */
        this.showLabel = false;
        /** Optional aria-label for screen readers. */
        this.ariaLabel = null;
        this.pct = computed(() => {
            const v = this._value();
            if (this.total != null && this.total > 0) {
                return Math.min(100, (v / this.total) * 100);
            }
            return Math.min(100, v);
        });
        this.label = computed(() => {
            if (this.total != null) {
                return `${Math.round(this._value())} / ${this.total}`;
            }
            return `${Math.round(this.pct())}%`;
        });
    }
    /** Current value. When `total` is unset, treated as a percentage (0..100). */
    set value(v) {
        this._value.set(Math.max(0, v));
    }
    get value() {
        return this._value();
    }
    get hostTone() {
        return this.tone;
    }
    get hostSize() {
        return this.size;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthProgressComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthProgressComponent, isStandalone: true, selector: "ath-progress", inputs: { value: "value", total: "total", tone: "tone", size: "size", showLabel: "showLabel", ariaLabel: "ariaLabel" }, host: { properties: { "attr.data-tone": "this.hostTone", "attr.data-size": "this.hostSize" } }, ngImport: i0, template: "<div\n  class=\"ath-progress__track\"\n  role=\"progressbar\"\n  [attr.aria-label]=\"ariaLabel\"\n  [attr.aria-valuenow]=\"pct()\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div class=\"ath-progress__fill\" [style.width.%]=\"pct()\"></div>\n</div>\n@if (showLabel) {\n  <span class=\"ath-progress__label\">{{ label() }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:8px;width:100%}.ath-progress__track{flex:1;background:var(--bg-2);border-radius:999px;overflow:hidden;min-width:40px}.ath-progress__fill{height:100%;border-radius:999px;background:var(--accent);transition:width var(--t-slow),background-color var(--t-base)}.ath-progress__label{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11.5px;color:var(--fg-3);white-space:nowrap;flex-shrink:0}:host([data-size=xs]) .ath-progress__track{height:3px}:host([data-size=sm]) .ath-progress__track{height:4px}:host([data-size=md]) .ath-progress__track{height:6px}:host([data-tone=accent]) .ath-progress__fill{background:var(--accent)}:host([data-tone=success]) .ath-progress__fill{background:var(--green)}:host([data-tone=warning]) .ath-progress__fill{background:var(--amber)}:host([data-tone=danger]) .ath-progress__fill{background:var(--red)}:host([data-tone=neutral]) .ath-progress__fill{background:var(--fg-3)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthProgressComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-progress', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"ath-progress__track\"\n  role=\"progressbar\"\n  [attr.aria-label]=\"ariaLabel\"\n  [attr.aria-valuenow]=\"pct()\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div class=\"ath-progress__fill\" [style.width.%]=\"pct()\"></div>\n</div>\n@if (showLabel) {\n  <span class=\"ath-progress__label\">{{ label() }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:8px;width:100%}.ath-progress__track{flex:1;background:var(--bg-2);border-radius:999px;overflow:hidden;min-width:40px}.ath-progress__fill{height:100%;border-radius:999px;background:var(--accent);transition:width var(--t-slow),background-color var(--t-base)}.ath-progress__label{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11.5px;color:var(--fg-3);white-space:nowrap;flex-shrink:0}:host([data-size=xs]) .ath-progress__track{height:3px}:host([data-size=sm]) .ath-progress__track{height:4px}:host([data-size=md]) .ath-progress__track{height:6px}:host([data-tone=accent]) .ath-progress__fill{background:var(--accent)}:host([data-tone=success]) .ath-progress__fill{background:var(--green)}:host([data-tone=warning]) .ath-progress__fill{background:var(--amber)}:host([data-tone=danger]) .ath-progress__fill{background:var(--red)}:host([data-tone=neutral]) .ath-progress__fill{background:var(--fg-3)}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], total: [{
                type: Input
            }], tone: [{
                type: Input
            }], size: [{
                type: Input
            }], showLabel: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], hostTone: [{
                type: HostBinding,
                args: ['attr.data-tone']
            }], hostSize: [{
                type: HostBinding,
                args: ['attr.data-size']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3Byb2dyZXNzL3Byb2dyZXNzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9wcm9ncmVzcy9wcm9ncmVzcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBSy9DOzs7Ozs7OztHQVFHO0FBU0gsTUFBTSxPQUFPLG9CQUFvQjtJQVJqQztRQVNtQixXQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBV3BDLDJEQUEyRDtRQUNsRCxVQUFLLEdBQWtCLElBQUksQ0FBQztRQUU1QixTQUFJLEdBQWlCLFFBQVEsQ0FBQztRQUM5QixTQUFJLEdBQWlCLElBQUksQ0FBQztRQUVuQyw0REFBNEQ7UUFDbkQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUUzQiw4Q0FBOEM7UUFDckMsY0FBUyxHQUFrQixJQUFJLENBQUM7UUFVdEIsUUFBRyxHQUFHLFFBQVEsQ0FBUyxHQUFHLEVBQUU7WUFDN0MsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDekMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUNELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFFZ0IsVUFBSyxHQUFHLFFBQVEsQ0FBUyxHQUFHLEVBQUU7WUFDL0MsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUN2QixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEQsQ0FBQztZQUNELE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQTNDQyw4RUFBOEU7SUFDOUUsSUFDSSxLQUFLLENBQUMsQ0FBUztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBY0QsSUFBbUMsUUFBUTtRQUN6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQW1DLFFBQVE7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7K0dBOUJVLG9CQUFvQjttR0FBcEIsb0JBQW9CLGdTQ3ZCakMseVZBYUEsa2dDREtZLFlBQVk7OzRGQUtYLG9CQUFvQjtrQkFSaEMsU0FBUzsrQkFDRSxjQUFjLGNBQ1osSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLG1CQUNOLHVCQUF1QixDQUFDLE1BQU07OEJBUzNDLEtBQUs7c0JBRFIsS0FBSztnQkFTRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQUdHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRTZCLFFBQVE7c0JBQTFDLFdBQVc7dUJBQUMsZ0JBQWdCO2dCQUlNLFFBQVE7c0JBQTFDLFdBQVc7dUJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBjb21wdXRlZCwgc2lnbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgdHlwZSBQcm9ncmVzc1RvbmUgPSAnYWNjZW50JyB8ICdzdWNjZXNzJyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInIHwgJ25ldXRyYWwnO1xuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NTaXplID0gJ3hzJyB8ICdzbScgfCAnbWQnO1xuXG4vKipcbiAqIEdlbmVyaWMgcHJvZ3Jlc3MgYmFyLiBVc2VkIGZvciBtaWxlc3RvbmVzLCBzdWJ0YXNrcywgc3ByaW50IGJ1cm4sXG4gKiB1cGxvYWQgcHJvZ3Jlc3MsIGV0Yy5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1wcm9ncmVzcyBbdmFsdWVdPVwiNjJcIiAvPlxuICogPGF0aC1wcm9ncmVzcyBbdmFsdWVdPVwiODBcIiB0b25lPVwid2FybmluZ1wiIHNpemU9XCJtZFwiIFtzaG93TGFiZWxdPVwidHJ1ZVwiIC8+XG4gKiA8YXRoLXByb2dyZXNzIFt2YWx1ZV09XCI0MFwiIFt0b3RhbF09XCI1MFwiIFtzaG93TGFiZWxdPVwidHJ1ZVwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1wcm9ncmVzcycsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb2dyZXNzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL3Byb2dyZXNzLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoUHJvZ3Jlc3NDb21wb25lbnQge1xuICBwcml2YXRlIHJlYWRvbmx5IF92YWx1ZSA9IHNpZ25hbCgwKTtcblxuICAvKiogQ3VycmVudCB2YWx1ZS4gV2hlbiBgdG90YWxgIGlzIHVuc2V0LCB0cmVhdGVkIGFzIGEgcGVyY2VudGFnZSAoMC4uMTAwKS4gKi9cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKHY6IG51bWJlcikge1xuICAgIHRoaXMuX3ZhbHVlLnNldChNYXRoLm1heCgwLCB2KSk7XG4gIH1cbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlKCk7XG4gIH1cblxuICAvKiogVG90YWwgKGRlbm9taW5hdG9yKS4gSWYgdW5zZXQsIGB2YWx1ZWAgaXMgYSBwZXJjZW50LiAqL1xuICBASW5wdXQoKSB0b3RhbDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgQElucHV0KCkgdG9uZTogUHJvZ3Jlc3NUb25lID0gJ2FjY2VudCc7XG4gIEBJbnB1dCgpIHNpemU6IFByb2dyZXNzU2l6ZSA9ICdzbSc7XG5cbiAgLyoqIFNob3cgYSBzbWFsbCBgWCAvIFlgIChvciBgWCVgKSBsYWJlbCBuZXh0IHRvIHRoZSBiYXIuICovXG4gIEBJbnB1dCgpIHNob3dMYWJlbCA9IGZhbHNlO1xuXG4gIC8qKiBPcHRpb25hbCBhcmlhLWxhYmVsIGZvciBzY3JlZW4gcmVhZGVycy4gKi9cbiAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGF0YS10b25lJykgZ2V0IGhvc3RUb25lKCk6IFByb2dyZXNzVG9uZSB7XG4gICAgcmV0dXJuIHRoaXMudG9uZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5kYXRhLXNpemUnKSBnZXQgaG9zdFNpemUoKTogUHJvZ3Jlc3NTaXplIHtcbiAgICByZXR1cm4gdGhpcy5zaXplO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHBjdCA9IGNvbXB1dGVkPG51bWJlcj4oKCkgPT4ge1xuICAgIGNvbnN0IHYgPSB0aGlzLl92YWx1ZSgpO1xuICAgIGlmICh0aGlzLnRvdGFsICE9IG51bGwgJiYgdGhpcy50b3RhbCA+IDApIHtcbiAgICAgIHJldHVybiBNYXRoLm1pbigxMDAsICh2IC8gdGhpcy50b3RhbCkgKiAxMDApO1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5taW4oMTAwLCB2KTtcbiAgfSk7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGxhYmVsID0gY29tcHV0ZWQ8c3RyaW5nPigoKSA9PiB7XG4gICAgaWYgKHRoaXMudG90YWwgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGAke01hdGgucm91bmQodGhpcy5fdmFsdWUoKSl9IC8gJHt0aGlzLnRvdGFsfWA7XG4gICAgfVxuICAgIHJldHVybiBgJHtNYXRoLnJvdW5kKHRoaXMucGN0KCkpfSVgO1xuICB9KTtcbn1cbiIsIjxkaXZcbiAgY2xhc3M9XCJhdGgtcHJvZ3Jlc3NfX3RyYWNrXCJcbiAgcm9sZT1cInByb2dyZXNzYmFyXCJcbiAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxuICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cInBjdCgpXCJcbiAgYXJpYS12YWx1ZW1pbj1cIjBcIlxuICBhcmlhLXZhbHVlbWF4PVwiMTAwXCJcbj5cbiAgPGRpdiBjbGFzcz1cImF0aC1wcm9ncmVzc19fZmlsbFwiIFtzdHlsZS53aWR0aC4lXT1cInBjdCgpXCI+PC9kaXY+XG48L2Rpdj5cbkBpZiAoc2hvd0xhYmVsKSB7XG4gIDxzcGFuIGNsYXNzPVwiYXRoLXByb2dyZXNzX19sYWJlbFwiPnt7IGxhYmVsKCkgfX08L3NwYW4+XG59XG4iXX0=