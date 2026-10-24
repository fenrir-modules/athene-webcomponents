import { ChangeDetectionStrategy, Component, HostBinding, Input, computed, signal, } from '@angular/core';
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthAvatarStackComponent, isStandalone: true, selector: "ath-avatar-stack", inputs: { users: "users", max: "max", size: "size" }, host: { properties: { "attr.data-size": "this.hostSize" } }, ngImport: i0, template: "@for (user of visible(); track trackByName($index, user)) {\n  <ath-avatar [name]=\"user.name\" [src]=\"user.src ?? ''\" [size]=\"size\" class=\"ath-stack__item\" />\n}\n@if (overflowCount() > 0) {\n  <span class=\"ath-stack__more\">+{{ overflowCount() }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center}.ath-stack__item{display:inline-flex}.ath-stack__item+.ath-stack__item,.ath-stack__item+.ath-stack__more{margin-left:-6px}:host ath-avatar{border-radius:999px;box-shadow:0 0 0 1.5px var(--bg-1)}.ath-stack__more{display:inline-flex;align-items:center;justify-content:center;margin-left:-6px;border-radius:999px;background:var(--bg-2);color:var(--fg-3);font-family:var(--font-sans);font-weight:600;border:1.5px solid var(--bg-1);letter-spacing:0}:host([data-size=sm]) .ath-stack__more{width:20px;height:20px;font-size:9px}:host([data-size=md]) .ath-stack__more{width:24px;height:24px;font-size:10px}:host([data-size=lg]) .ath-stack__more{width:36px;height:36px;font-size:12px}:host([data-size=xl]) .ath-stack__more{width:48px;height:48px;font-size:14px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthAvatarComponent, selector: "ath-avatar", inputs: ["person", "name", "src", "id", "size", "unassigned", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLXN0YWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9hdmF0YXItc3RhY2svYXZhdGFyLXN0YWNrLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9hdmF0YXItc3RhY2svYXZhdGFyLXN0YWNrLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFdBQVcsRUFDWCxLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGtCQUFrQixFQUFjLE1BQU0sV0FBVyxDQUFDOztBQVMzRDs7Ozs7O0dBTUc7QUFTSCxNQUFNLE9BQU8sdUJBQXVCO0lBUnBDO1FBU21CLFdBQU0sR0FBRyxNQUFNLENBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBVTNDLFFBQUcsR0FBRyxDQUFDLENBQUM7UUFDUixTQUFJLEdBQWUsSUFBSSxDQUFDO1FBTWQsWUFBTyxHQUFHLFFBQVEsQ0FBZ0IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUUsa0JBQWEsR0FBRyxRQUFRLENBQVMsR0FBRyxFQUFFO1lBQ3ZELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDbkMsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztRQUVILGdCQUFXLEdBQUcsQ0FBQyxDQUFTLEVBQUUsSUFBaUIsRUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUNuRTtJQXRCQyxJQUNJLEtBQUssQ0FBQyxLQUF1QztRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFLRCxJQUFtQyxRQUFRO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDOytHQWhCVSx1QkFBdUI7bUdBQXZCLHVCQUF1QiwrTENqQ3BDLDZRQU1BLHUxQkRzQlksWUFBWSwrQkFBRSxrQkFBa0I7OzRGQUsvQix1QkFBdUI7a0JBUm5DLFNBQVM7K0JBQ0Usa0JBQWtCLGNBQ2hCLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxtQkFDMUIsdUJBQXVCLENBQUMsTUFBTTs4QkFRM0MsS0FBSztzQkFEUixLQUFLO2dCQVFHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRTZCLFFBQVE7c0JBQTFDLFdBQVc7dUJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBjb21wdXRlZCxcbiAgc2lnbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBdGhBdmF0YXJDb21wb25lbnQsIEF2YXRhclNpemUgfSBmcm9tICcuLi9hdmF0YXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YWNrZWRVc2VyIHtcbiAgLyoqIERpc3BsYXkgbmFtZSAoYWxzbyB1c2VkIGZvciBpbml0aWFscykuICovXG4gIG5hbWU6IHN0cmluZztcbiAgLyoqIE9wdGlvbmFsIGF2YXRhciBpbWFnZSBVUkwuICovXG4gIHNyYz86IHN0cmluZztcbn1cblxuLyoqXG4gKiBPdmVybGFwcGluZyBhdmF0YXJzIHdpdGggYSBgK05gIGNoaXAgd2hlbiB0aGUgbGlzdCBleGNlZWRzIGBtYXhgLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLWF2YXRhci1zdGFjayBbdXNlcnNdPVwiW3tuYW1lOidKb2VsJ30se25hbWU6J01pcmEnfSx7bmFtZTonVG9tJ30se25hbWU6J1NhcmEnfV1cIiAvPlxuICogPGF0aC1hdmF0YXItc3RhY2sgW3VzZXJzXT1cIndhdGNoZXJzXCIgW21heF09XCI1XCIgc2l6ZT1cIm1kXCIgLz5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLWF2YXRhci1zdGFjaycsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEF0aEF2YXRhckNvbXBvbmVudF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vYXZhdGFyLXN0YWNrLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2F2YXRhci1zdGFjay5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aEF2YXRhclN0YWNrQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSByZWFkb25seSBfdXNlcnMgPSBzaWduYWw8U3RhY2tlZFVzZXJbXT4oW10pO1xuXG4gIEBJbnB1dCgpXG4gIHNldCB1c2Vycyh2YWx1ZTogU3RhY2tlZFVzZXJbXSB8IG51bGwgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl91c2Vycy5zZXQodmFsdWUgPz8gW10pO1xuICB9XG4gIGdldCB1c2VycygpOiBTdGFja2VkVXNlcltdIHtcbiAgICByZXR1cm4gdGhpcy5fdXNlcnMoKTtcbiAgfVxuXG4gIEBJbnB1dCgpIG1heCA9IDQ7XG4gIEBJbnB1dCgpIHNpemU6IEF2YXRhclNpemUgPSAnc20nO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5kYXRhLXNpemUnKSBnZXQgaG9zdFNpemUoKTogQXZhdGFyU2l6ZSB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZWFkb25seSB2aXNpYmxlID0gY29tcHV0ZWQ8U3RhY2tlZFVzZXJbXT4oKCkgPT4gdGhpcy5fdXNlcnMoKS5zbGljZSgwLCB0aGlzLm1heCkpO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgb3ZlcmZsb3dDb3VudCA9IGNvbXB1dGVkPG51bWJlcj4oKCkgPT4ge1xuICAgIGNvbnN0IHRvdGFsID0gdGhpcy5fdXNlcnMoKS5sZW5ndGg7XG4gICAgcmV0dXJuIHRvdGFsID4gdGhpcy5tYXggPyB0b3RhbCAtIHRoaXMubWF4IDogMDtcbiAgfSk7XG5cbiAgdHJhY2tCeU5hbWUgPSAoXzogbnVtYmVyLCB1c2VyOiBTdGFja2VkVXNlcik6IHN0cmluZyA9PiB1c2VyLm5hbWU7XG59XG4iLCJAZm9yICh1c2VyIG9mIHZpc2libGUoKTsgdHJhY2sgdHJhY2tCeU5hbWUoJGluZGV4LCB1c2VyKSkge1xuICA8YXRoLWF2YXRhciBbbmFtZV09XCJ1c2VyLm5hbWVcIiBbc3JjXT1cInVzZXIuc3JjID8/ICcnXCIgW3NpemVdPVwic2l6ZVwiIGNsYXNzPVwiYXRoLXN0YWNrX19pdGVtXCIgLz5cbn1cbkBpZiAob3ZlcmZsb3dDb3VudCgpID4gMCkge1xuICA8c3BhbiBjbGFzcz1cImF0aC1zdGFja19fbW9yZVwiPit7eyBvdmVyZmxvd0NvdW50KCkgfX08L3NwYW4+XG59XG4iXX0=