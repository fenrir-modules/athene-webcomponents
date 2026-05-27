import { ChangeDetectionStrategy, Component, HostBinding, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthAvatarComponent } from '../avatar';
import * as i0 from "@angular/core";
/**
 * Overlapping avatars with a `+N` chip when the list exceeds `max`.
 *
 * @example
 * <ath-avatar-stack [users]="[{name:'Joel'},{name:'Mira'},{name:'Tom'},{name:'Sara'}]" />
 * <ath-avatar-stack [users]="watchers" [max]="5" size="md" />
 */
export class AthAvatarStackComponent {
    constructor() {
        this._users = signal([]);
        this.max = 4;
        this.size = 'sm';
        this.visible = computed(() => this._users().slice(0, this.max));
        this.overflowCount = computed(() => {
            const total = this._users().length;
            return total > this.max ? total - this.max : 0;
        });
        this.trackByName = (_, user) => user.name;
    }
    set users(value) {
        this._users.set(value ?? []);
    }
    get users() {
        return this._users();
    }
    get hostSize() {
        return this.size;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAvatarStackComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthAvatarStackComponent, isStandalone: true, selector: "ath-avatar-stack", inputs: { users: "users", max: "max", size: "size" }, host: { properties: { "attr.data-size": "this.hostSize" } }, ngImport: i0, template: "@for (user of visible(); track trackByName($index, user)) {\n  <ath-avatar [name]=\"user.name\" [src]=\"user.src ?? ''\" [size]=\"size\" class=\"ath-stack__item\" />\n}\n@if (overflowCount() > 0) {\n  <span class=\"ath-stack__more\">+{{ overflowCount() }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center}.ath-stack__item{display:inline-flex}.ath-stack__item+.ath-stack__item,.ath-stack__item+.ath-stack__more{margin-left:-6px}:host ath-avatar{border-radius:999px;box-shadow:0 0 0 1.5px var(--bg-1)}.ath-stack__more{display:inline-flex;align-items:center;justify-content:center;margin-left:-6px;border-radius:999px;background:var(--bg-2);color:var(--fg-3);font-family:var(--font-sans);font-weight:600;border:1.5px solid var(--bg-1);letter-spacing:0}:host([data-size=sm]) .ath-stack__more{width:20px;height:20px;font-size:9px}:host([data-size=md]) .ath-stack__more{width:24px;height:24px;font-size:10px}:host([data-size=lg]) .ath-stack__more{width:36px;height:36px;font-size:12px}:host([data-size=xl]) .ath-stack__more{width:48px;height:48px;font-size:14px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthAvatarComponent, selector: "ath-avatar", inputs: ["name", "src", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAvatarStackComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-avatar-stack', standalone: true, imports: [CommonModule, AthAvatarComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@for (user of visible(); track trackByName($index, user)) {\n  <ath-avatar [name]=\"user.name\" [src]=\"user.src ?? ''\" [size]=\"size\" class=\"ath-stack__item\" />\n}\n@if (overflowCount() > 0) {\n  <span class=\"ath-stack__more\">+{{ overflowCount() }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center}.ath-stack__item{display:inline-flex}.ath-stack__item+.ath-stack__item,.ath-stack__item+.ath-stack__more{margin-left:-6px}:host ath-avatar{border-radius:999px;box-shadow:0 0 0 1.5px var(--bg-1)}.ath-stack__more{display:inline-flex;align-items:center;justify-content:center;margin-left:-6px;border-radius:999px;background:var(--bg-2);color:var(--fg-3);font-family:var(--font-sans);font-weight:600;border:1.5px solid var(--bg-1);letter-spacing:0}:host([data-size=sm]) .ath-stack__more{width:20px;height:20px;font-size:9px}:host([data-size=md]) .ath-stack__more{width:24px;height:24px;font-size:10px}:host([data-size=lg]) .ath-stack__more{width:36px;height:36px;font-size:12px}:host([data-size=xl]) .ath-stack__more{width:48px;height:48px;font-size:14px}\n"] }]
        }], propDecorators: { users: [{
                type: Input
            }], max: [{
                type: Input
            }], size: [{
                type: Input
            }], hostSize: [{
                type: HostBinding,
                args: ['attr.data-size']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLXN0YWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9hdmF0YXItc3RhY2svYXZhdGFyLXN0YWNrLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9hdmF0YXItc3RhY2svYXZhdGFyLXN0YWNrLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQWMsTUFBTSxXQUFXLENBQUM7O0FBUzNEOzs7Ozs7R0FNRztBQVNILE1BQU0sT0FBTyx1QkFBdUI7SUFScEM7UUFTbUIsV0FBTSxHQUFHLE1BQU0sQ0FBZ0IsRUFBRSxDQUFDLENBQUM7UUFVM0MsUUFBRyxHQUFHLENBQUMsQ0FBQztRQUNSLFNBQUksR0FBZSxJQUFJLENBQUM7UUFNZCxZQUFPLEdBQUcsUUFBUSxDQUFnQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMxRSxrQkFBYSxHQUFHLFFBQVEsQ0FBUyxHQUFHLEVBQUU7WUFDdkQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNuQyxPQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO1FBRUgsZ0JBQVcsR0FBRyxDQUFDLENBQVMsRUFBRSxJQUFpQixFQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ25FO0lBdEJDLElBQ0ksS0FBSyxDQUFDLEtBQXVDO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUtELElBQW1DLFFBQVE7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7K0dBaEJVLHVCQUF1QjttR0FBdkIsdUJBQXVCLCtMQzFCcEMsNlFBTUEsdTFCRGVZLFlBQVksK0JBQUUsa0JBQWtCOzs0RkFLL0IsdUJBQXVCO2tCQVJuQyxTQUFTOytCQUNFLGtCQUFrQixjQUNoQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLENBQUMsbUJBQzFCLHVCQUF1QixDQUFDLE1BQU07OEJBUTNDLEtBQUs7c0JBRFIsS0FBSztnQkFRRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUU2QixRQUFRO3NCQUExQyxXQUFXO3VCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgY29tcHV0ZWQsIHNpZ25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEF0aEF2YXRhckNvbXBvbmVudCwgQXZhdGFyU2l6ZSB9IGZyb20gJy4uL2F2YXRhcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhY2tlZFVzZXIge1xuICAvKiogRGlzcGxheSBuYW1lIChhbHNvIHVzZWQgZm9yIGluaXRpYWxzKS4gKi9cbiAgbmFtZTogc3RyaW5nO1xuICAvKiogT3B0aW9uYWwgYXZhdGFyIGltYWdlIFVSTC4gKi9cbiAgc3JjPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIE92ZXJsYXBwaW5nIGF2YXRhcnMgd2l0aCBhIGArTmAgY2hpcCB3aGVuIHRoZSBsaXN0IGV4Y2VlZHMgYG1heGAuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtYXZhdGFyLXN0YWNrIFt1c2Vyc109XCJbe25hbWU6J0pvZWwnfSx7bmFtZTonTWlyYSd9LHtuYW1lOidUb20nfSx7bmFtZTonU2FyYSd9XVwiIC8+XG4gKiA8YXRoLWF2YXRhci1zdGFjayBbdXNlcnNdPVwid2F0Y2hlcnNcIiBbbWF4XT1cIjVcIiBzaXplPVwibWRcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtYXZhdGFyLXN0YWNrJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQXRoQXZhdGFyQ29tcG9uZW50XSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9hdmF0YXItc3RhY2suY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vYXZhdGFyLXN0YWNrLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoQXZhdGFyU3RhY2tDb21wb25lbnQge1xuICBwcml2YXRlIHJlYWRvbmx5IF91c2VycyA9IHNpZ25hbDxTdGFja2VkVXNlcltdPihbXSk7XG5cbiAgQElucHV0KClcbiAgc2V0IHVzZXJzKHZhbHVlOiBTdGFja2VkVXNlcltdIHwgbnVsbCB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX3VzZXJzLnNldCh2YWx1ZSA/PyBbXSk7XG4gIH1cbiAgZ2V0IHVzZXJzKCk6IFN0YWNrZWRVc2VyW10ge1xuICAgIHJldHVybiB0aGlzLl91c2VycygpO1xuICB9XG5cbiAgQElucHV0KCkgbWF4ID0gNDtcbiAgQElucHV0KCkgc2l6ZTogQXZhdGFyU2l6ZSA9ICdzbSc7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmRhdGEtc2l6ZScpIGdldCBob3N0U2l6ZSgpOiBBdmF0YXJTaXplIHtcbiAgICByZXR1cm4gdGhpcy5zaXplO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHZpc2libGUgPSBjb21wdXRlZDxTdGFja2VkVXNlcltdPigoKSA9PiB0aGlzLl91c2VycygpLnNsaWNlKDAsIHRoaXMubWF4KSk7XG4gIHByb3RlY3RlZCByZWFkb25seSBvdmVyZmxvd0NvdW50ID0gY29tcHV0ZWQ8bnVtYmVyPigoKSA9PiB7XG4gICAgY29uc3QgdG90YWwgPSB0aGlzLl91c2VycygpLmxlbmd0aDtcbiAgICByZXR1cm4gdG90YWwgPiB0aGlzLm1heCA/IHRvdGFsIC0gdGhpcy5tYXggOiAwO1xuICB9KTtcblxuICB0cmFja0J5TmFtZSA9IChfOiBudW1iZXIsIHVzZXI6IFN0YWNrZWRVc2VyKTogc3RyaW5nID0+IHVzZXIubmFtZTtcbn1cbiIsIkBmb3IgKHVzZXIgb2YgdmlzaWJsZSgpOyB0cmFjayB0cmFja0J5TmFtZSgkaW5kZXgsIHVzZXIpKSB7XG4gIDxhdGgtYXZhdGFyIFtuYW1lXT1cInVzZXIubmFtZVwiIFtzcmNdPVwidXNlci5zcmMgPz8gJydcIiBbc2l6ZV09XCJzaXplXCIgY2xhc3M9XCJhdGgtc3RhY2tfX2l0ZW1cIiAvPlxufVxuQGlmIChvdmVyZmxvd0NvdW50KCkgPiAwKSB7XG4gIDxzcGFuIGNsYXNzPVwiYXRoLXN0YWNrX19tb3JlXCI+K3t7IG92ZXJmbG93Q291bnQoKSB9fTwvc3Bhbj5cbn1cbiJdfQ==