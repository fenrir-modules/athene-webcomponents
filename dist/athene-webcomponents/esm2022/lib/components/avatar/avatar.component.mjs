import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { avatarInitials, avatarTone } from './avatar-tone';
import * as i0 from "@angular/core";
/**
 * Athene Avatar Component
 *
 * User avatar with initials fallback.
 *
 * @example
 * <ath-avatar name="John Doe" />
 * <ath-avatar name="Admin" size="lg" />
 */
export class AthAvatarComponent {
    constructor() {
        /** User display name (used for initials) */
        this.name = '';
        /** Optional image URL */
        this.src = '';
        /** Avatar size */
        this.size = 'md';
    }
    get avatarClasses() {
        return `ath-avatar ath-avatar--${this.size}`;
    }
    get initials() {
        return avatarInitials(this.name);
    }
    /** Per-person colour tone; '?' (no name) stays on the neutral tone. */
    get tone() {
        return this.name.trim() ? avatarTone(this.name) : null;
    }
    onImageError(event) {
        event.target.style.display = 'none';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthAvatarComponent, isStandalone: true, selector: "ath-avatar", inputs: { name: "name", src: "src", size: "size" }, ngImport: i0, template: "<div [class]=\"avatarClasses\" [attr.data-tone]=\"tone\" [attr.aria-label]=\"name\">\n  @if (src) {\n    <img [src]=\"src\" [alt]=\"name\" class=\"ath-avatar__image\" (error)=\"onImageError($event)\" />\n  }\n  <span class=\"ath-avatar__initials\">{{ initials }}</span>\n</div>\n", styles: [".ath-avatar{position:relative;display:inline-flex;align-items:center;justify-content:center;border-radius:var(--ath-border-radius-full);background:var(--avatar-neutral-bg);color:var(--avatar-neutral-fg);font-weight:var(--ath-font-weight-semibold);overflow:hidden;flex-shrink:0;-webkit-user-select:none;user-select:none}.ath-avatar--sm{width:28px;height:28px;font-size:var(--ath-font-size-xs)}.ath-avatar--md{width:36px;height:36px;font-size:var(--ath-font-size-sm)}.ath-avatar--lg{width:44px;height:44px;font-size:var(--ath-font-size-md)}.ath-avatar--xl{width:56px;height:56px;font-size:var(--ath-font-size-lg)}.ath-avatar__image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.ath-avatar[data-tone=\"1\"]{background:var(--avatar-1-bg);color:var(--avatar-1-fg)}.ath-avatar[data-tone=\"2\"]{background:var(--avatar-2-bg);color:var(--avatar-2-fg)}.ath-avatar[data-tone=\"3\"]{background:var(--avatar-3-bg);color:var(--avatar-3-fg)}.ath-avatar[data-tone=\"4\"]{background:var(--avatar-4-bg);color:var(--avatar-4-fg)}.ath-avatar[data-tone=\"5\"]{background:var(--avatar-5-bg);color:var(--avatar-5-fg)}.ath-avatar[data-tone=\"6\"]{background:var(--avatar-6-bg);color:var(--avatar-6-fg)}.ath-avatar[data-tone=\"7\"]{background:var(--avatar-7-bg);color:var(--avatar-7-fg)}.ath-avatar[data-tone=\"8\"]{background:var(--avatar-8-bg);color:var(--avatar-8-fg)}.ath-avatar__initials{position:relative;z-index:1;letter-spacing:.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAvatarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-avatar', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"avatarClasses\" [attr.data-tone]=\"tone\" [attr.aria-label]=\"name\">\n  @if (src) {\n    <img [src]=\"src\" [alt]=\"name\" class=\"ath-avatar__image\" (error)=\"onImageError($event)\" />\n  }\n  <span class=\"ath-avatar__initials\">{{ initials }}</span>\n</div>\n", styles: [".ath-avatar{position:relative;display:inline-flex;align-items:center;justify-content:center;border-radius:var(--ath-border-radius-full);background:var(--avatar-neutral-bg);color:var(--avatar-neutral-fg);font-weight:var(--ath-font-weight-semibold);overflow:hidden;flex-shrink:0;-webkit-user-select:none;user-select:none}.ath-avatar--sm{width:28px;height:28px;font-size:var(--ath-font-size-xs)}.ath-avatar--md{width:36px;height:36px;font-size:var(--ath-font-size-sm)}.ath-avatar--lg{width:44px;height:44px;font-size:var(--ath-font-size-md)}.ath-avatar--xl{width:56px;height:56px;font-size:var(--ath-font-size-lg)}.ath-avatar__image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.ath-avatar[data-tone=\"1\"]{background:var(--avatar-1-bg);color:var(--avatar-1-fg)}.ath-avatar[data-tone=\"2\"]{background:var(--avatar-2-bg);color:var(--avatar-2-fg)}.ath-avatar[data-tone=\"3\"]{background:var(--avatar-3-bg);color:var(--avatar-3-fg)}.ath-avatar[data-tone=\"4\"]{background:var(--avatar-4-bg);color:var(--avatar-4-fg)}.ath-avatar[data-tone=\"5\"]{background:var(--avatar-5-bg);color:var(--avatar-5-fg)}.ath-avatar[data-tone=\"6\"]{background:var(--avatar-6-bg);color:var(--avatar-6-fg)}.ath-avatar[data-tone=\"7\"]{background:var(--avatar-7-bg);color:var(--avatar-7-fg)}.ath-avatar[data-tone=\"8\"]{background:var(--avatar-8-bg);color:var(--avatar-8-fg)}.ath-avatar__initials{position:relative;z-index:1;letter-spacing:.5px}\n"] }]
        }], propDecorators: { name: [{
                type: Input
            }], src: [{
                type: Input
            }], size: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9hdmF0YXIvYXZhdGFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9hdmF0YXIvYXZhdGFyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFPM0Q7Ozs7Ozs7O0dBUUc7QUFTSCxNQUFNLE9BQU8sa0JBQWtCO0lBUi9CO1FBU0UsNENBQTRDO1FBQ25DLFNBQUksR0FBRyxFQUFFLENBQUM7UUFFbkIseUJBQXlCO1FBQ2hCLFFBQUcsR0FBRyxFQUFFLENBQUM7UUFFbEIsa0JBQWtCO1FBQ1QsU0FBSSxHQUFlLElBQUksQ0FBQztLQWtCbEM7SUFoQkMsSUFBSSxhQUFhO1FBQ2YsT0FBTywwQkFBMEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELHVFQUF1RTtJQUN2RSxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN6RCxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQVk7UUFDdEIsS0FBSyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDNUQsQ0FBQzsrR0F6QlUsa0JBQWtCO21HQUFsQixrQkFBa0IsMEhDMUIvQix5UkFNQSx5OUNEZVksWUFBWTs7NEZBS1gsa0JBQWtCO2tCQVI5QixTQUFTOytCQUNFLFlBQVksY0FDVixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsbUJBQ04sdUJBQXVCLENBQUMsTUFBTTs4QkFNdEMsSUFBSTtzQkFBWixLQUFLO2dCQUdHLEdBQUc7c0JBQVgsS0FBSztnQkFHRyxJQUFJO3NCQUFaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGF2YXRhckluaXRpYWxzLCBhdmF0YXJUb25lIH0gZnJvbSAnLi9hdmF0YXItdG9uZSc7XG5cbi8qKlxuICogQXZhdGFyIHNpemUgdmFyaWFudHNcbiAqL1xuZXhwb3J0IHR5cGUgQXZhdGFyU2l6ZSA9ICdzbScgfCAnbWQnIHwgJ2xnJyB8ICd4bCc7XG5cbi8qKlxuICogQXRoZW5lIEF2YXRhciBDb21wb25lbnRcbiAqXG4gKiBVc2VyIGF2YXRhciB3aXRoIGluaXRpYWxzIGZhbGxiYWNrLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLWF2YXRhciBuYW1lPVwiSm9obiBEb2VcIiAvPlxuICogPGF0aC1hdmF0YXIgbmFtZT1cIkFkbWluXCIgc2l6ZT1cImxnXCIgLz5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLWF2YXRhcicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL2F2YXRhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9hdmF0YXIuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhBdmF0YXJDb21wb25lbnQge1xuICAvKiogVXNlciBkaXNwbGF5IG5hbWUgKHVzZWQgZm9yIGluaXRpYWxzKSAqL1xuICBASW5wdXQoKSBuYW1lID0gJyc7XG5cbiAgLyoqIE9wdGlvbmFsIGltYWdlIFVSTCAqL1xuICBASW5wdXQoKSBzcmMgPSAnJztcblxuICAvKiogQXZhdGFyIHNpemUgKi9cbiAgQElucHV0KCkgc2l6ZTogQXZhdGFyU2l6ZSA9ICdtZCc7XG5cbiAgZ2V0IGF2YXRhckNsYXNzZXMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGF0aC1hdmF0YXIgYXRoLWF2YXRhci0tJHt0aGlzLnNpemV9YDtcbiAgfVxuXG4gIGdldCBpbml0aWFscygpOiBzdHJpbmcge1xuICAgIHJldHVybiBhdmF0YXJJbml0aWFscyh0aGlzLm5hbWUpO1xuICB9XG5cbiAgLyoqIFBlci1wZXJzb24gY29sb3VyIHRvbmU7ICc/JyAobm8gbmFtZSkgc3RheXMgb24gdGhlIG5ldXRyYWwgdG9uZS4gKi9cbiAgZ2V0IHRvbmUoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMubmFtZS50cmltKCkgPyBhdmF0YXJUb25lKHRoaXMubmFtZSkgOiBudWxsO1xuICB9XG5cbiAgb25JbWFnZUVycm9yKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEltYWdlRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxufVxuIiwiPGRpdiBbY2xhc3NdPVwiYXZhdGFyQ2xhc3Nlc1wiIFthdHRyLmRhdGEtdG9uZV09XCJ0b25lXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJuYW1lXCI+XG4gIEBpZiAoc3JjKSB7XG4gICAgPGltZyBbc3JjXT1cInNyY1wiIFthbHRdPVwibmFtZVwiIGNsYXNzPVwiYXRoLWF2YXRhcl9faW1hZ2VcIiAoZXJyb3IpPVwib25JbWFnZUVycm9yKCRldmVudClcIiAvPlxuICB9XG4gIDxzcGFuIGNsYXNzPVwiYXRoLWF2YXRhcl9faW5pdGlhbHNcIj57eyBpbml0aWFscyB9fTwvc3Bhbj5cbjwvZGl2PlxuIl19