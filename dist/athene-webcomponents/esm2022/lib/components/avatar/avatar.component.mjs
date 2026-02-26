import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        if (!this.name)
            return '?';
        const parts = this.name.trim().split(/\s+/);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return parts[0].substring(0, 2).toUpperCase();
    }
    onImageError(event) {
        event.target.style.display = 'none';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthAvatarComponent, isStandalone: true, selector: "ath-avatar", inputs: { name: "name", src: "src", size: "size" }, ngImport: i0, template: "<div [class]=\"avatarClasses\" [attr.aria-label]=\"name\">\n  @if (src) {\n    <img [src]=\"src\" [alt]=\"name\" class=\"ath-avatar__image\" (error)=\"onImageError($event)\" />\n  }\n  <span class=\"ath-avatar__initials\">{{ initials }}</span>\n</div>\n", styles: [".ath-avatar{position:relative;display:inline-flex;align-items:center;justify-content:center;border-radius:var(--ath-border-radius-full);background:linear-gradient(135deg,var(--ath-color-primary),var(--ath-color-primary-hover));color:var(--ath-text-inverse);font-weight:var(--ath-font-weight-semibold);overflow:hidden;flex-shrink:0;-webkit-user-select:none;user-select:none}.ath-avatar--sm{width:28px;height:28px;font-size:var(--ath-font-size-xs)}.ath-avatar--md{width:36px;height:36px;font-size:var(--ath-font-size-sm)}.ath-avatar--lg{width:44px;height:44px;font-size:var(--ath-font-size-md)}.ath-avatar--xl{width:56px;height:56px;font-size:var(--ath-font-size-lg)}.ath-avatar__image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.ath-avatar__initials{position:relative;z-index:1;letter-spacing:.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAvatarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-avatar', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"avatarClasses\" [attr.aria-label]=\"name\">\n  @if (src) {\n    <img [src]=\"src\" [alt]=\"name\" class=\"ath-avatar__image\" (error)=\"onImageError($event)\" />\n  }\n  <span class=\"ath-avatar__initials\">{{ initials }}</span>\n</div>\n", styles: [".ath-avatar{position:relative;display:inline-flex;align-items:center;justify-content:center;border-radius:var(--ath-border-radius-full);background:linear-gradient(135deg,var(--ath-color-primary),var(--ath-color-primary-hover));color:var(--ath-text-inverse);font-weight:var(--ath-font-weight-semibold);overflow:hidden;flex-shrink:0;-webkit-user-select:none;user-select:none}.ath-avatar--sm{width:28px;height:28px;font-size:var(--ath-font-size-xs)}.ath-avatar--md{width:36px;height:36px;font-size:var(--ath-font-size-sm)}.ath-avatar--lg{width:44px;height:44px;font-size:var(--ath-font-size-md)}.ath-avatar--xl{width:56px;height:56px;font-size:var(--ath-font-size-lg)}.ath-avatar__image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.ath-avatar__initials{position:relative;z-index:1;letter-spacing:.5px}\n"] }]
        }], propDecorators: { name: [{
                type: Input
            }], src: [{
                type: Input
            }], size: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9hdmF0YXIvYXZhdGFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9hdmF0YXIvYXZhdGFyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFPL0M7Ozs7Ozs7O0dBUUc7QUFTSCxNQUFNLE9BQU8sa0JBQWtCO0lBUi9CO1FBU0UsNENBQTRDO1FBQ25DLFNBQUksR0FBRyxFQUFFLENBQUM7UUFFbkIseUJBQXlCO1FBQ2hCLFFBQUcsR0FBRyxFQUFFLENBQUM7UUFFbEIsa0JBQWtCO1FBQ1QsU0FBSSxHQUFlLElBQUksQ0FBQztLQWtCbEM7SUFoQkMsSUFBSSxhQUFhO1FBQ2YsT0FBTywwQkFBMEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUMzQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xFLENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRCxZQUFZLENBQUMsS0FBWTtRQUN0QixLQUFLLENBQUMsTUFBMkIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUM1RCxDQUFDOytHQXpCVSxrQkFBa0I7bUdBQWxCLGtCQUFrQiwwSEN6Qi9CLCtQQU1BLCsyQkRjWSxZQUFZOzs0RkFLWCxrQkFBa0I7a0JBUjlCLFNBQVM7K0JBQ0UsWUFBWSxjQUNWLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxtQkFDTix1QkFBdUIsQ0FBQyxNQUFNOzhCQU10QyxJQUFJO3NCQUFaLEtBQUs7Z0JBR0csR0FBRztzQkFBWCxLQUFLO2dCQUdHLElBQUk7c0JBQVosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIEF2YXRhciBzaXplIHZhcmlhbnRzXG4gKi9cbmV4cG9ydCB0eXBlIEF2YXRhclNpemUgPSAnc20nIHwgJ21kJyB8ICdsZycgfCAneGwnO1xuXG4vKipcbiAqIEF0aGVuZSBBdmF0YXIgQ29tcG9uZW50XG4gKlxuICogVXNlciBhdmF0YXIgd2l0aCBpbml0aWFscyBmYWxsYmFjay5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1hdmF0YXIgbmFtZT1cIkpvaG4gRG9lXCIgLz5cbiAqIDxhdGgtYXZhdGFyIG5hbWU9XCJBZG1pblwiIHNpemU9XCJsZ1wiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1hdmF0YXInLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9hdmF0YXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vYXZhdGFyLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoQXZhdGFyQ29tcG9uZW50IHtcbiAgLyoqIFVzZXIgZGlzcGxheSBuYW1lICh1c2VkIGZvciBpbml0aWFscykgKi9cbiAgQElucHV0KCkgbmFtZSA9ICcnO1xuXG4gIC8qKiBPcHRpb25hbCBpbWFnZSBVUkwgKi9cbiAgQElucHV0KCkgc3JjID0gJyc7XG5cbiAgLyoqIEF2YXRhciBzaXplICovXG4gIEBJbnB1dCgpIHNpemU6IEF2YXRhclNpemUgPSAnbWQnO1xuXG4gIGdldCBhdmF0YXJDbGFzc2VzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBhdGgtYXZhdGFyIGF0aC1hdmF0YXItLSR7dGhpcy5zaXplfWA7XG4gIH1cblxuICBnZXQgaW5pdGlhbHMoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMubmFtZSkgcmV0dXJuICc/JztcbiAgICBjb25zdCBwYXJ0cyA9IHRoaXMubmFtZS50cmltKCkuc3BsaXQoL1xccysvKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID49IDIpIHtcbiAgICAgIHJldHVybiAocGFydHNbMF1bMF0gKyBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXVswXSkudG9VcHBlckNhc2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnRzWzBdLnN1YnN0cmluZygwLCAyKS50b1VwcGVyQ2FzZSgpO1xuICB9XG5cbiAgb25JbWFnZUVycm9yKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEltYWdlRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxufVxuIiwiPGRpdiBbY2xhc3NdPVwiYXZhdGFyQ2xhc3Nlc1wiIFthdHRyLmFyaWEtbGFiZWxdPVwibmFtZVwiPlxuICBAaWYgKHNyYykge1xuICAgIDxpbWcgW3NyY109XCJzcmNcIiBbYWx0XT1cIm5hbWVcIiBjbGFzcz1cImF0aC1hdmF0YXJfX2ltYWdlXCIgKGVycm9yKT1cIm9uSW1hZ2VFcnJvcigkZXZlbnQpXCIgLz5cbiAgfVxuICA8c3BhbiBjbGFzcz1cImF0aC1hdmF0YXJfX2luaXRpYWxzXCI+e3sgaW5pdGlhbHMgfX08L3NwYW4+XG48L2Rpdj5cbiJdfQ==