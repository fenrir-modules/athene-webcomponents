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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3VzZXItcGlja2VyL3VzZXItcGlja2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy91c2VyLXBpY2tlci91c2VyLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFTcEQ7Ozs7Ozs7OztHQVNHO0FBU0gsTUFBTSxPQUFPLHNCQUFzQjtJQVJuQztRQVNxQixXQUFNLEdBQUcsZUFBZSxFQUFFLENBQUM7UUFFN0IsV0FBTSxHQUFHLE1BQU0sQ0FBZSxFQUFFLENBQUMsQ0FBQztRQVUxQyxVQUFLLEdBQWtCLElBQUksQ0FBQztRQUM1QixnQkFBVyxHQUFrQixJQUFJLENBQUM7UUFDbEMsc0JBQWlCLEdBQWtCLElBQUksQ0FBQztRQUN4QyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFaEMsa0NBQWtDO1FBQ3pCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFaEIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUV2QyxZQUFPLEdBQUcsUUFBUSxDQUEwQixHQUFHLEVBQUUsQ0FDbEUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN4QixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDWCxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUk7WUFDYixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUztTQUMvQyxDQUFDLENBQUMsQ0FDSixDQUFDO1FBRWlCLGlCQUFZLEdBQUcsUUFBUSxDQUN4QyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQzdELENBQUM7S0FZSDtJQTFDQyxJQUNJLEtBQUssQ0FBQyxLQUFzQztRQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUEwQkQsYUFBYSxDQUFDLENBQWdCO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQWMsWUFBWTtRQUN4QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckMsSUFBSSxRQUFRO1lBQUUsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDaEcsQ0FBQzsrR0E5Q1Usc0JBQXNCO21HQUF0QixzQkFBc0IsOFVDeENuQyx3VUFTQSxzRkQwQlksWUFBWSwrQkFBc0Isb0JBQW9COzs0RkFLckQsc0JBQXNCO2tCQVJsQyxTQUFTOytCQUNFLGlCQUFpQixjQUNmLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsQ0FBQyxtQkFDaEQsdUJBQXVCLENBQUMsTUFBTTs4QkFVM0MsS0FBSztzQkFEUixLQUFLO2dCQVFHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQUVJLFdBQVc7c0JBQXBCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIGNvbXB1dGVkLFxuICBzaWduYWwsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEF0aEF2YXRhckNvbXBvbmVudCB9IGZyb20gJy4uL2F2YXRhcic7XG5pbXBvcnQgeyBBdGhDb21ib2JveENvbXBvbmVudCB9IGZyb20gJy4uL2NvbWJvYm94JztcbmltcG9ydCB0eXBlIHsgTGlzdGJveE9wdGlvbiB9IGZyb20gJy4uL2xpc3Rib3gvbGlzdGJveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgaW5qZWN0QXRoTGFiZWxzIH0gZnJvbSAnLi4vLi4vaTE4bi9sYWJlbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJPcHRpb24ge1xuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGVtYWlsPzogc3RyaW5nO1xuICBhdmF0YXJTcmM/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogVXNlciBwaWNrZXIg4oCUIHdyYXBzIGA8YXRoLWNvbWJvYm94PmAgd2l0aCBhdmF0YXIgcmVuZGVyaW5nIG9uIHRoZSB0cmlnZ2VyXG4gKiBhbmQgaW4gb3B0aW9ucy4gVXNlIGZvciBBc3NpZ25lZSwgUmVwb3J0ZXIsIFdhdGNoZXJzLCBNZW50aW9ucywgZXRjLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXVzZXItcGlja2VyXG4gKiAgIFt1c2Vyc109XCJ3b3Jrc3BhY2VNZW1iZXJzXCJcbiAqICAgWyh2YWx1ZSldPVwiYXNzaWduZWVJZFwiXG4gKiAgIHBsYWNlaG9sZGVyPVwiVW5hc3NpZ25lZFwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC11c2VyLXBpY2tlcicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEF0aEF2YXRhckNvbXBvbmVudCwgQXRoQ29tYm9ib3hDb21wb25lbnRdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3VzZXItcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL3VzZXItcGlja2VyLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoVXNlclBpY2tlckNvbXBvbmVudCB7XG4gIHByb3RlY3RlZCByZWFkb25seSBsYWJlbHMgPSBpbmplY3RBdGhMYWJlbHMoKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IF91c2VycyA9IHNpZ25hbDxVc2VyT3B0aW9uW10+KFtdKTtcblxuICBASW5wdXQoKVxuICBzZXQgdXNlcnModmFsdWU6IFVzZXJPcHRpb25bXSB8IG51bGwgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl91c2Vycy5zZXQodmFsdWUgPz8gW10pO1xuICB9XG4gIGdldCB1c2VycygpOiBVc2VyT3B0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLl91c2VycygpO1xuICB9XG5cbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHNlYXJjaFBsYWNlaG9sZGVyOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgY2xlYXJhYmxlID0gdHJ1ZTtcbiAgQElucHV0KCkgYWxsb3dVbmFzc2lnbmVkID0gdHJ1ZTtcblxuICAvKiogU2hvdyBlbWFpbCB1bmRlciBlYWNoIG5hbWUuICovXG4gIEBJbnB1dCgpIHNob3dFbWFpbCA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBudWxsPigpO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zID0gY29tcHV0ZWQ8TGlzdGJveE9wdGlvbjxzdHJpbmc+W10+KCgpID0+XG4gICAgdGhpcy5fdXNlcnMoKS5tYXAoKHUpID0+ICh7XG4gICAgICB2YWx1ZTogdS5pZCxcbiAgICAgIGxhYmVsOiB1Lm5hbWUsXG4gICAgICBzdWJsYWJlbDogdGhpcy5zaG93RW1haWwgPyB1LmVtYWlsIDogdW5kZWZpbmVkLFxuICAgIH0pKVxuICApO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBzZWxlY3RlZFVzZXIgPSBjb21wdXRlZDxVc2VyT3B0aW9uIHwgbnVsbD4oXG4gICAgKCkgPT4gdGhpcy5fdXNlcnMoKS5maW5kKCh1KSA9PiB1LmlkID09PSB0aGlzLnZhbHVlKSA/PyBudWxsXG4gICk7XG5cbiAgb25WYWx1ZUNoYW5nZSh2OiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHY7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHYpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCB0cmlnZ2VyTGFiZWwoKTogc3RyaW5nIHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWRVc2VyKCk7XG4gICAgaWYgKHNlbGVjdGVkKSByZXR1cm4gc2VsZWN0ZWQubmFtZTtcbiAgICByZXR1cm4gdGhpcy5hbGxvd1VuYXNzaWduZWQgPyAodGhpcy5wbGFjZWhvbGRlciA/PyB0aGlzLmxhYmVscy51c2VyUGlja2VyUGxhY2Vob2xkZXIoKSkgOiAn4oCUJztcbiAgfVxufVxuIiwiPGF0aC1jb21ib2JveFxuICBbb3B0aW9uc109XCJvcHRpb25zKClcIlxuICBbdmFsdWVdPVwidmFsdWVcIlxuICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXIgPz8gbGFiZWxzLnVzZXJQaWNrZXJQbGFjZWhvbGRlcigpXCJcbiAgW3NlYXJjaFBsYWNlaG9sZGVyXT1cInNlYXJjaFBsYWNlaG9sZGVyID8/IGxhYmVscy51c2VyUGlja2VyU2VhcmNoKClcIlxuICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICBbY2xlYXJhYmxlXT1cImNsZWFyYWJsZSAmJiBhbGxvd1VuYXNzaWduZWRcIlxuICAodmFsdWVDaGFuZ2UpPVwib25WYWx1ZUNoYW5nZSgkZXZlbnQpXCJcbi8+XG4iXX0=