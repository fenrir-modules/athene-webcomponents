import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal, } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3VzZXItcGlja2VyL3VzZXItcGlja2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy91c2VyLXBpY2tlci91c2VyLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFrQixNQUFNLGFBQWEsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBU3BEOzs7Ozs7Ozs7R0FTRztBQVNILE1BQU0sT0FBTyxzQkFBc0I7SUFSbkM7UUFTcUIsV0FBTSxHQUFHLGVBQWUsRUFBRSxDQUFDO1FBRTdCLFdBQU0sR0FBRyxNQUFNLENBQWUsRUFBRSxDQUFDLENBQUM7UUFVMUMsVUFBSyxHQUFrQixJQUFJLENBQUM7UUFDNUIsZ0JBQVcsR0FBa0IsSUFBSSxDQUFDO1FBQ2xDLHNCQUFpQixHQUFrQixJQUFJLENBQUM7UUFDeEMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBRWhDLGtDQUFrQztRQUN6QixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRWhCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFFdkMsWUFBTyxHQUFHLFFBQVEsQ0FBMkIsR0FBRyxFQUFFLENBQ25FLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEIsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ1gsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJO1lBQ2IsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDL0MsQ0FBQyxDQUFDLENBQ0osQ0FBQztRQUVpQixpQkFBWSxHQUFHLFFBQVEsQ0FDeEMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUM3RCxDQUFDO0tBWUg7SUExQ0MsSUFDSSxLQUFLLENBQUMsS0FBc0M7UUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBMEJELGFBQWEsQ0FBQyxDQUFnQjtRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFjLFlBQVk7UUFDeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JDLElBQUksUUFBUTtZQUFFLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ2hHLENBQUM7K0dBOUNVLHNCQUFzQjttR0FBdEIsc0JBQXNCLDhVQ3ZDbkMsd1VBU0Esc0ZEeUJZLFlBQVksK0JBQXNCLG9CQUFvQjs7NEZBS3JELHNCQUFzQjtrQkFSbEMsU0FBUzsrQkFDRSxpQkFBaUIsY0FDZixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLENBQUMsbUJBQ2hELHVCQUF1QixDQUFDLE1BQU07OEJBVTNDLEtBQUs7c0JBRFIsS0FBSztnQkFRRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBR0csU0FBUztzQkFBakIsS0FBSztnQkFFSSxXQUFXO3NCQUFwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBjb21wdXRlZCxcbiAgc2lnbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBdGhBdmF0YXJDb21wb25lbnQgfSBmcm9tICcuLi9hdmF0YXInO1xuaW1wb3J0IHsgQXRoQ29tYm9ib3hDb21wb25lbnQsIENvbWJvYm94T3B0aW9uIH0gZnJvbSAnLi4vY29tYm9ib3gnO1xuaW1wb3J0IHsgaW5qZWN0QXRoTGFiZWxzIH0gZnJvbSAnLi4vLi4vaTE4bi9sYWJlbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJPcHRpb24ge1xuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGVtYWlsPzogc3RyaW5nO1xuICBhdmF0YXJTcmM/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogVXNlciBwaWNrZXIg4oCUIHdyYXBzIGA8YXRoLWNvbWJvYm94PmAgd2l0aCBhdmF0YXIgcmVuZGVyaW5nIG9uIHRoZSB0cmlnZ2VyXG4gKiBhbmQgaW4gb3B0aW9ucy4gVXNlIGZvciBBc3NpZ25lZSwgUmVwb3J0ZXIsIFdhdGNoZXJzLCBNZW50aW9ucywgZXRjLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXVzZXItcGlja2VyXG4gKiAgIFt1c2Vyc109XCJ3b3Jrc3BhY2VNZW1iZXJzXCJcbiAqICAgWyh2YWx1ZSldPVwiYXNzaWduZWVJZFwiXG4gKiAgIHBsYWNlaG9sZGVyPVwiVW5hc3NpZ25lZFwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC11c2VyLXBpY2tlcicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEF0aEF2YXRhckNvbXBvbmVudCwgQXRoQ29tYm9ib3hDb21wb25lbnRdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3VzZXItcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL3VzZXItcGlja2VyLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoVXNlclBpY2tlckNvbXBvbmVudCB7XG4gIHByb3RlY3RlZCByZWFkb25seSBsYWJlbHMgPSBpbmplY3RBdGhMYWJlbHMoKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IF91c2VycyA9IHNpZ25hbDxVc2VyT3B0aW9uW10+KFtdKTtcblxuICBASW5wdXQoKVxuICBzZXQgdXNlcnModmFsdWU6IFVzZXJPcHRpb25bXSB8IG51bGwgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl91c2Vycy5zZXQodmFsdWUgPz8gW10pO1xuICB9XG4gIGdldCB1c2VycygpOiBVc2VyT3B0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLl91c2VycygpO1xuICB9XG5cbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHNlYXJjaFBsYWNlaG9sZGVyOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgY2xlYXJhYmxlID0gdHJ1ZTtcbiAgQElucHV0KCkgYWxsb3dVbmFzc2lnbmVkID0gdHJ1ZTtcblxuICAvKiogU2hvdyBlbWFpbCB1bmRlciBlYWNoIG5hbWUuICovXG4gIEBJbnB1dCgpIHNob3dFbWFpbCA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBudWxsPigpO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zID0gY29tcHV0ZWQ8Q29tYm9ib3hPcHRpb248c3RyaW5nPltdPigoKSA9PlxuICAgIHRoaXMuX3VzZXJzKCkubWFwKCh1KSA9PiAoe1xuICAgICAgdmFsdWU6IHUuaWQsXG4gICAgICBsYWJlbDogdS5uYW1lLFxuICAgICAgc3VibGFiZWw6IHRoaXMuc2hvd0VtYWlsID8gdS5lbWFpbCA6IHVuZGVmaW5lZCxcbiAgICB9KSlcbiAgKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc2VsZWN0ZWRVc2VyID0gY29tcHV0ZWQ8VXNlck9wdGlvbiB8IG51bGw+KFxuICAgICgpID0+IHRoaXMuX3VzZXJzKCkuZmluZCgodSkgPT4gdS5pZCA9PT0gdGhpcy52YWx1ZSkgPz8gbnVsbFxuICApO1xuXG4gIG9uVmFsdWVDaGFuZ2Uodjogc3RyaW5nIHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2O1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgdHJpZ2dlckxhYmVsKCk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkVXNlcigpO1xuICAgIGlmIChzZWxlY3RlZCkgcmV0dXJuIHNlbGVjdGVkLm5hbWU7XG4gICAgcmV0dXJuIHRoaXMuYWxsb3dVbmFzc2lnbmVkID8gKHRoaXMucGxhY2Vob2xkZXIgPz8gdGhpcy5sYWJlbHMudXNlclBpY2tlclBsYWNlaG9sZGVyKCkpIDogJ+KAlCc7XG4gIH1cbn1cbiIsIjxhdGgtY29tYm9ib3hcbiAgW29wdGlvbnNdPVwib3B0aW9ucygpXCJcbiAgW3ZhbHVlXT1cInZhbHVlXCJcbiAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyID8/IGxhYmVscy51c2VyUGlja2VyUGxhY2Vob2xkZXIoKVwiXG4gIFtzZWFyY2hQbGFjZWhvbGRlcl09XCJzZWFyY2hQbGFjZWhvbGRlciA/PyBsYWJlbHMudXNlclBpY2tlclNlYXJjaCgpXCJcbiAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgW2NsZWFyYWJsZV09XCJjbGVhcmFibGUgJiYgYWxsb3dVbmFzc2lnbmVkXCJcbiAgKHZhbHVlQ2hhbmdlKT1cIm9uVmFsdWVDaGFuZ2UoJGV2ZW50KVwiXG4vPlxuIl19