import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthAvatarComponent } from '../avatar';
import { AthComboboxComponent } from '../combobox';
import { injectAthLabels } from '../../i18n/labels';
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
        this.labels = injectAthLabels();
        this._users = signal([]);
        this.value = null;
        this.placeholder = null;
        this.searchPlaceholder = null;
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
        return this.allowUnassigned ? (this.placeholder ?? this.labels.userPickerPlaceholder()) : '—';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthUserPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthUserPickerComponent, isStandalone: true, selector: "ath-user-picker", inputs: { users: "users", value: "value", placeholder: "placeholder", searchPlaceholder: "searchPlaceholder", disabled: "disabled", clearable: "clearable", allowUnassigned: "allowUnassigned", showEmail: "showEmail" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<ath-combobox\n  [options]=\"options()\"\n  [value]=\"value\"\n  [placeholder]=\"placeholder ?? labels.userPickerPlaceholder()\"\n  [searchPlaceholder]=\"searchPlaceholder ?? labels.userPickerSearch()\"\n  [disabled]=\"disabled\"\n  [clearable]=\"clearable && allowUnassigned\"\n  (valueChange)=\"onValueChange($event)\"\n/>\n", styles: [":host{display:inline-block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthComboboxComponent, selector: "ath-combobox", inputs: ["options", "value", "placeholder", "searchPlaceholder", "disabled", "clearable", "loading", "bare", "optionTpl"], outputs: ["valueChange", "queryChange", "opened", "closed"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthUserPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-user-picker', standalone: true, imports: [CommonModule, AthAvatarComponent, AthComboboxComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ath-combobox\n  [options]=\"options()\"\n  [value]=\"value\"\n  [placeholder]=\"placeholder ?? labels.userPickerPlaceholder()\"\n  [searchPlaceholder]=\"searchPlaceholder ?? labels.userPickerSearch()\"\n  [disabled]=\"disabled\"\n  [clearable]=\"clearable && allowUnassigned\"\n  (valueChange)=\"onValueChange($event)\"\n/>\n", styles: [":host{display:inline-block}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3VzZXItcGlja2VyL3VzZXItcGlja2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy91c2VyLXBpY2tlci91c2VyLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQWtCLE1BQU0sYUFBYSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFTcEQ7Ozs7Ozs7OztHQVNHO0FBU0gsTUFBTSxPQUFPLHNCQUFzQjtJQVJuQztRQVNxQixXQUFNLEdBQUcsZUFBZSxFQUFFLENBQUM7UUFFN0IsV0FBTSxHQUFHLE1BQU0sQ0FBZSxFQUFFLENBQUMsQ0FBQztRQVUxQyxVQUFLLEdBQWtCLElBQUksQ0FBQztRQUM1QixnQkFBVyxHQUFrQixJQUFJLENBQUM7UUFDbEMsc0JBQWlCLEdBQWtCLElBQUksQ0FBQztRQUN4QyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFaEMsa0NBQWtDO1FBQ3pCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFaEIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUV2QyxZQUFPLEdBQUcsUUFBUSxDQUEyQixHQUFHLEVBQUUsQ0FDbkUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN4QixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDWCxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUk7WUFDYixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUztTQUMvQyxDQUFDLENBQUMsQ0FDSixDQUFDO1FBRWlCLGlCQUFZLEdBQUcsUUFBUSxDQUFvQixHQUFHLEVBQUUsQ0FDakUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUN2RCxDQUFDO0tBWUg7SUExQ0MsSUFDSSxLQUFLLENBQUMsS0FBc0M7UUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBMEJELGFBQWEsQ0FBQyxDQUFnQjtRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFjLFlBQVk7UUFDeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JDLElBQUksUUFBUTtZQUFFLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ2hHLENBQUM7K0dBOUNVLHNCQUFzQjttR0FBdEIsc0JBQXNCLDhVQy9CbkMsd1VBU0Esc0ZEaUJZLFlBQVksK0JBQXNCLG9CQUFvQjs7NEZBS3JELHNCQUFzQjtrQkFSbEMsU0FBUzsrQkFDRSxpQkFBaUIsY0FDZixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLENBQUMsbUJBQ2hELHVCQUF1QixDQUFDLE1BQU07OEJBVTNDLEtBQUs7c0JBRFIsS0FBSztnQkFRRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBR0csU0FBUztzQkFBakIsS0FBSztnQkFFSSxXQUFXO3NCQUFwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBjb21wdXRlZCwgc2lnbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQXRoQXZhdGFyQ29tcG9uZW50IH0gZnJvbSAnLi4vYXZhdGFyJztcbmltcG9ydCB7IEF0aENvbWJvYm94Q29tcG9uZW50LCBDb21ib2JveE9wdGlvbiB9IGZyb20gJy4uL2NvbWJvYm94JztcbmltcG9ydCB7IGluamVjdEF0aExhYmVscyB9IGZyb20gJy4uLy4uL2kxOG4vbGFiZWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBVc2VyT3B0aW9uIHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBlbWFpbD86IHN0cmluZztcbiAgYXZhdGFyU3JjPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFVzZXIgcGlja2VyIOKAlCB3cmFwcyBgPGF0aC1jb21ib2JveD5gIHdpdGggYXZhdGFyIHJlbmRlcmluZyBvbiB0aGUgdHJpZ2dlclxuICogYW5kIGluIG9wdGlvbnMuIFVzZSBmb3IgQXNzaWduZWUsIFJlcG9ydGVyLCBXYXRjaGVycywgTWVudGlvbnMsIGV0Yy5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC11c2VyLXBpY2tlclxuICogICBbdXNlcnNdPVwid29ya3NwYWNlTWVtYmVyc1wiXG4gKiAgIFsodmFsdWUpXT1cImFzc2lnbmVlSWRcIlxuICogICBwbGFjZWhvbGRlcj1cIlVuYXNzaWduZWRcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtdXNlci1waWNrZXInLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBBdGhBdmF0YXJDb21wb25lbnQsIEF0aENvbWJvYm94Q29tcG9uZW50XSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi91c2VyLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi91c2VyLXBpY2tlci5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFVzZXJQaWNrZXJDb21wb25lbnQge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbGFiZWxzID0gaW5qZWN0QXRoTGFiZWxzKCk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfdXNlcnMgPSBzaWduYWw8VXNlck9wdGlvbltdPihbXSk7XG5cbiAgQElucHV0KClcbiAgc2V0IHVzZXJzKHZhbHVlOiBVc2VyT3B0aW9uW10gfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fdXNlcnMuc2V0KHZhbHVlID8/IFtdKTtcbiAgfVxuICBnZXQgdXNlcnMoKTogVXNlck9wdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fdXNlcnMoKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBzZWFyY2hQbGFjZWhvbGRlcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGNsZWFyYWJsZSA9IHRydWU7XG4gIEBJbnB1dCgpIGFsbG93VW5hc3NpZ25lZCA9IHRydWU7XG5cbiAgLyoqIFNob3cgZW1haWwgdW5kZXIgZWFjaCBuYW1lLiAqL1xuICBASW5wdXQoKSBzaG93RW1haWwgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVsbD4oKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9ucyA9IGNvbXB1dGVkPENvbWJvYm94T3B0aW9uPHN0cmluZz5bXT4oKCkgPT5cbiAgICB0aGlzLl91c2VycygpLm1hcCgodSkgPT4gKHtcbiAgICAgIHZhbHVlOiB1LmlkLFxuICAgICAgbGFiZWw6IHUubmFtZSxcbiAgICAgIHN1YmxhYmVsOiB0aGlzLnNob3dFbWFpbCA/IHUuZW1haWwgOiB1bmRlZmluZWQsXG4gICAgfSkpLFxuICApO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBzZWxlY3RlZFVzZXIgPSBjb21wdXRlZDxVc2VyT3B0aW9uIHwgbnVsbD4oKCkgPT5cbiAgICB0aGlzLl91c2VycygpLmZpbmQoKHUpID0+IHUuaWQgPT09IHRoaXMudmFsdWUpID8/IG51bGwsXG4gICk7XG5cbiAgb25WYWx1ZUNoYW5nZSh2OiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHY7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHYpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCB0cmlnZ2VyTGFiZWwoKTogc3RyaW5nIHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWRVc2VyKCk7XG4gICAgaWYgKHNlbGVjdGVkKSByZXR1cm4gc2VsZWN0ZWQubmFtZTtcbiAgICByZXR1cm4gdGhpcy5hbGxvd1VuYXNzaWduZWQgPyAodGhpcy5wbGFjZWhvbGRlciA/PyB0aGlzLmxhYmVscy51c2VyUGlja2VyUGxhY2Vob2xkZXIoKSkgOiAn4oCUJztcbiAgfVxufVxuIiwiPGF0aC1jb21ib2JveFxuICBbb3B0aW9uc109XCJvcHRpb25zKClcIlxuICBbdmFsdWVdPVwidmFsdWVcIlxuICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXIgPz8gbGFiZWxzLnVzZXJQaWNrZXJQbGFjZWhvbGRlcigpXCJcbiAgW3NlYXJjaFBsYWNlaG9sZGVyXT1cInNlYXJjaFBsYWNlaG9sZGVyID8/IGxhYmVscy51c2VyUGlja2VyU2VhcmNoKClcIlxuICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICBbY2xlYXJhYmxlXT1cImNsZWFyYWJsZSAmJiBhbGxvd1VuYXNzaWduZWRcIlxuICAodmFsdWVDaGFuZ2UpPVwib25WYWx1ZUNoYW5nZSgkZXZlbnQpXCJcbi8+XG4iXX0=