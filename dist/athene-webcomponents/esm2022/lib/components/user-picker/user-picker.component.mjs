import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthAvatarComponent } from '../avatar';
import { AthComboboxComponent } from '../combobox';
import * as i0 from "@angular/core";
/**
 * User picker — wraps `<ath-combobox>` with avatar rendering on the trigger
 * and in options. Use for Assignee, Reporter, Watchers, Mentions, etc.
 *
 * @example
 * <ath-user-picker
 *   [users]="workspaceMembers"
 *   [(value)]="assigneeId"
 *   placeholder="Unassigned" />
 */
export class AthUserPickerComponent {
    constructor() {
        this._users = signal([]);
        this.value = null;
        this.placeholder = 'Pick user';
        this.searchPlaceholder = 'Search people';
        this.disabled = false;
        this.clearable = true;
        this.allowUnassigned = true;
        /** Show email under each name. */
        this.showEmail = true;
        this.valueChange = new EventEmitter();
        this.options = computed(() => this._users().map((u) => ({
            value: u.id,
            label: u.name,
            sublabel: this.showEmail ? u.email : undefined,
        })));
        this.selectedUser = computed(() => this._users().find((u) => u.id === this.value) ?? null);
    }
    set users(value) {
        this._users.set(value ?? []);
    }
    get users() {
        return this._users();
    }
    onValueChange(v) {
        this.value = v;
        this.valueChange.emit(v);
    }
    get triggerLabel() {
        const selected = this.selectedUser();
        if (selected)
            return selected.name;
        return this.allowUnassigned ? this.placeholder : '—';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthUserPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthUserPickerComponent, isStandalone: true, selector: "ath-user-picker", inputs: { users: "users", value: "value", placeholder: "placeholder", searchPlaceholder: "searchPlaceholder", disabled: "disabled", clearable: "clearable", allowUnassigned: "allowUnassigned", showEmail: "showEmail" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<ath-combobox\n  [options]=\"options()\"\n  [value]=\"value\"\n  [placeholder]=\"placeholder\"\n  [searchPlaceholder]=\"searchPlaceholder\"\n  [disabled]=\"disabled\"\n  [clearable]=\"clearable && allowUnassigned\"\n  (valueChange)=\"onValueChange($event)\"\n/>\n", styles: [":host{display:inline-block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthComboboxComponent, selector: "ath-combobox", inputs: ["options", "value", "placeholder", "searchPlaceholder", "disabled", "clearable", "loading", "bare", "optionTpl"], outputs: ["valueChange", "queryChange", "opened", "closed"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthUserPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-user-picker', standalone: true, imports: [CommonModule, AthAvatarComponent, AthComboboxComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ath-combobox\n  [options]=\"options()\"\n  [value]=\"value\"\n  [placeholder]=\"placeholder\"\n  [searchPlaceholder]=\"searchPlaceholder\"\n  [disabled]=\"disabled\"\n  [clearable]=\"clearable && allowUnassigned\"\n  (valueChange)=\"onValueChange($event)\"\n/>\n", styles: [":host{display:inline-block}\n"] }]
        }], propDecorators: { users: [{
                type: Input
            }], value: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], searchPlaceholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], clearable: [{
                type: Input
            }], allowUnassigned: [{
                type: Input
            }], showEmail: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3VzZXItcGlja2VyL3VzZXItcGlja2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy91c2VyLXBpY2tlci91c2VyLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQWtCLE1BQU0sYUFBYSxDQUFDOztBQVNuRTs7Ozs7Ozs7O0dBU0c7QUFTSCxNQUFNLE9BQU8sc0JBQXNCO0lBUm5DO1FBU21CLFdBQU0sR0FBRyxNQUFNLENBQWUsRUFBRSxDQUFDLENBQUM7UUFVMUMsVUFBSyxHQUFrQixJQUFJLENBQUM7UUFDNUIsZ0JBQVcsR0FBRyxXQUFXLENBQUM7UUFDMUIsc0JBQWlCLEdBQUcsZUFBZSxDQUFDO1FBQ3BDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixvQkFBZSxHQUFHLElBQUksQ0FBQztRQUVoQyxrQ0FBa0M7UUFDekIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUVoQixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBRXZDLFlBQU8sR0FBRyxRQUFRLENBQTJCLEdBQUcsRUFBRSxDQUNuRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3hCLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRTtZQUNYLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSTtZQUNiLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTO1NBQy9DLENBQUMsQ0FBQyxDQUNKLENBQUM7UUFFaUIsaUJBQVksR0FBRyxRQUFRLENBQW9CLEdBQUcsRUFBRSxDQUNqRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQ3ZELENBQUM7S0FZSDtJQTFDQyxJQUNJLEtBQUssQ0FBQyxLQUFzQztRQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUEwQkQsYUFBYSxDQUFDLENBQWdCO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQWMsWUFBWTtRQUN4QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckMsSUFBSSxRQUFRO1lBQUUsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3ZELENBQUM7K0dBNUNVLHNCQUFzQjttR0FBdEIsc0JBQXNCLDhVQzlCbkMseVFBU0Esc0ZEZ0JZLFlBQVksK0JBQXNCLG9CQUFvQjs7NEZBS3JELHNCQUFzQjtrQkFSbEMsU0FBUzsrQkFDRSxpQkFBaUIsY0FDZixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLENBQUMsbUJBQ2hELHVCQUF1QixDQUFDLE1BQU07OEJBUTNDLEtBQUs7c0JBRFIsS0FBSztnQkFRRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBR0csU0FBUztzQkFBakIsS0FBSztnQkFFSSxXQUFXO3NCQUFwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBjb21wdXRlZCwgc2lnbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQXRoQXZhdGFyQ29tcG9uZW50IH0gZnJvbSAnLi4vYXZhdGFyJztcbmltcG9ydCB7IEF0aENvbWJvYm94Q29tcG9uZW50LCBDb21ib2JveE9wdGlvbiB9IGZyb20gJy4uL2NvbWJvYm94JztcblxuZXhwb3J0IGludGVyZmFjZSBVc2VyT3B0aW9uIHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBlbWFpbD86IHN0cmluZztcbiAgYXZhdGFyU3JjPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFVzZXIgcGlja2VyIOKAlCB3cmFwcyBgPGF0aC1jb21ib2JveD5gIHdpdGggYXZhdGFyIHJlbmRlcmluZyBvbiB0aGUgdHJpZ2dlclxuICogYW5kIGluIG9wdGlvbnMuIFVzZSBmb3IgQXNzaWduZWUsIFJlcG9ydGVyLCBXYXRjaGVycywgTWVudGlvbnMsIGV0Yy5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC11c2VyLXBpY2tlclxuICogICBbdXNlcnNdPVwid29ya3NwYWNlTWVtYmVyc1wiXG4gKiAgIFsodmFsdWUpXT1cImFzc2lnbmVlSWRcIlxuICogICBwbGFjZWhvbGRlcj1cIlVuYXNzaWduZWRcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtdXNlci1waWNrZXInLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBBdGhBdmF0YXJDb21wb25lbnQsIEF0aENvbWJvYm94Q29tcG9uZW50XSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi91c2VyLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi91c2VyLXBpY2tlci5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFVzZXJQaWNrZXJDb21wb25lbnQge1xuICBwcml2YXRlIHJlYWRvbmx5IF91c2VycyA9IHNpZ25hbDxVc2VyT3B0aW9uW10+KFtdKTtcblxuICBASW5wdXQoKVxuICBzZXQgdXNlcnModmFsdWU6IFVzZXJPcHRpb25bXSB8IG51bGwgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl91c2Vycy5zZXQodmFsdWUgPz8gW10pO1xuICB9XG4gIGdldCB1c2VycygpOiBVc2VyT3B0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLl91c2VycygpO1xuICB9XG5cbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdQaWNrIHVzZXInO1xuICBASW5wdXQoKSBzZWFyY2hQbGFjZWhvbGRlciA9ICdTZWFyY2ggcGVvcGxlJztcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgY2xlYXJhYmxlID0gdHJ1ZTtcbiAgQElucHV0KCkgYWxsb3dVbmFzc2lnbmVkID0gdHJ1ZTtcblxuICAvKiogU2hvdyBlbWFpbCB1bmRlciBlYWNoIG5hbWUuICovXG4gIEBJbnB1dCgpIHNob3dFbWFpbCA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBudWxsPigpO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zID0gY29tcHV0ZWQ8Q29tYm9ib3hPcHRpb248c3RyaW5nPltdPigoKSA9PlxuICAgIHRoaXMuX3VzZXJzKCkubWFwKCh1KSA9PiAoe1xuICAgICAgdmFsdWU6IHUuaWQsXG4gICAgICBsYWJlbDogdS5uYW1lLFxuICAgICAgc3VibGFiZWw6IHRoaXMuc2hvd0VtYWlsID8gdS5lbWFpbCA6IHVuZGVmaW5lZCxcbiAgICB9KSksXG4gICk7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHNlbGVjdGVkVXNlciA9IGNvbXB1dGVkPFVzZXJPcHRpb24gfCBudWxsPigoKSA9PlxuICAgIHRoaXMuX3VzZXJzKCkuZmluZCgodSkgPT4gdS5pZCA9PT0gdGhpcy52YWx1ZSkgPz8gbnVsbCxcbiAgKTtcblxuICBvblZhbHVlQ2hhbmdlKHY6IHN0cmluZyB8IG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdjtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodik7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IHRyaWdnZXJMYWJlbCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZFVzZXIoKTtcbiAgICBpZiAoc2VsZWN0ZWQpIHJldHVybiBzZWxlY3RlZC5uYW1lO1xuICAgIHJldHVybiB0aGlzLmFsbG93VW5hc3NpZ25lZCA/IHRoaXMucGxhY2Vob2xkZXIgOiAn4oCUJztcbiAgfVxufVxuIiwiPGF0aC1jb21ib2JveFxuICBbb3B0aW9uc109XCJvcHRpb25zKClcIlxuICBbdmFsdWVdPVwidmFsdWVcIlxuICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICBbc2VhcmNoUGxhY2Vob2xkZXJdPVwic2VhcmNoUGxhY2Vob2xkZXJcIlxuICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICBbY2xlYXJhYmxlXT1cImNsZWFyYWJsZSAmJiBhbGxvd1VuYXNzaWduZWRcIlxuICAodmFsdWVDaGFuZ2UpPVwib25WYWx1ZUNoYW5nZSgkZXZlbnQpXCJcbi8+XG4iXX0=