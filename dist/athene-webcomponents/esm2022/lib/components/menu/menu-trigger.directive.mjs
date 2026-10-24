import { Directive, input } from '@angular/core';
import { AthOverlayTriggerBase } from '../floating/trigger';
import * as i0 from "@angular/core";
/**
 * Makes a button the menu button of an `ath-menu`: click, Enter and Space
 * open it on the first item, ArrowDown on the first, ArrowUp on the last.
 * `aria-haspopup="menu"`, `aria-expanded` and `aria-controls` go on the real
 * control (the inner `<button>` of an `<ath-button>`), and the menu is
 * labelled by it.
 *
 * @example
 * <button type="button" [athMenuTrigger]="menu" aria-label="Actions">⋯</button>
 */
export class AthMenuTriggerDirective extends AthOverlayTriggerBase {
    constructor() {
        super(...arguments);
        this.menu = input.required({ alias: 'athMenuTrigger' });
    }
    popupKind() {
        return 'menu';
    }
    isOpen() {
        return this.menu().open();
    }
    popupId() {
        return this.menu().panelId;
    }
    onClick() {
        const menu = this.menu();
        menu.labelFrom(this.controlId());
        menu.toggle(this.host, 'first');
    }
    onKeydown(event) {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')
            return;
        event.preventDefault();
        const menu = this.menu();
        menu.labelFrom(this.controlId());
        menu.show(this.host, event.key === 'ArrowUp' ? 'last' : 'first');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuTriggerDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "18.2.14", type: AthMenuTriggerDirective, isStandalone: true, selector: "[athMenuTrigger]", inputs: { menu: { classPropertyName: "menu", publicName: "athMenuTrigger", isSignal: true, isRequired: true, transformFunction: null } }, host: { listeners: { "click": "onClick()", "keydown": "onKeydown($event)" } }, exportAs: ["athMenuTrigger"], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[athMenuTrigger]',
                    standalone: true,
                    exportAs: 'athMenuTrigger',
                    host: {
                        '(click)': 'onClick()',
                        '(keydown)': 'onKeydown($event)',
                    },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS10cmlnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9tZW51L21lbnUtdHJpZ2dlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBRzVEOzs7Ozs7Ozs7R0FTRztBQVVILE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxxQkFBcUI7SUFUbEU7O1FBVVcsU0FBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQW1CLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztLQTJCL0U7SUF6QlcsU0FBUztRQUNqQixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRVMsTUFBTTtRQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFUyxPQUFPO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQzdCLENBQUM7SUFFUyxPQUFPO1FBQ2YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFUyxTQUFTLENBQUMsS0FBb0I7UUFDdEMsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLFdBQVcsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLFNBQVM7WUFBRSxPQUFPO1FBQ2pFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkUsQ0FBQzsrR0EzQlUsdUJBQXVCO21HQUF2Qix1QkFBdUI7OzRGQUF2Qix1QkFBdUI7a0JBVG5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLElBQUksRUFBRTt3QkFDSixTQUFTLEVBQUUsV0FBVzt3QkFDdEIsV0FBVyxFQUFFLG1CQUFtQjtxQkFDakM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIGlucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdGhPdmVybGF5VHJpZ2dlckJhc2UgfSBmcm9tICcuLi9mbG9hdGluZy90cmlnZ2VyJztcbmltcG9ydCB7IEF0aE1lbnVDb21wb25lbnQgfSBmcm9tICcuL21lbnUuY29tcG9uZW50JztcblxuLyoqXG4gKiBNYWtlcyBhIGJ1dHRvbiB0aGUgbWVudSBidXR0b24gb2YgYW4gYGF0aC1tZW51YDogY2xpY2ssIEVudGVyIGFuZCBTcGFjZVxuICogb3BlbiBpdCBvbiB0aGUgZmlyc3QgaXRlbSwgQXJyb3dEb3duIG9uIHRoZSBmaXJzdCwgQXJyb3dVcCBvbiB0aGUgbGFzdC5cbiAqIGBhcmlhLWhhc3BvcHVwPVwibWVudVwiYCwgYGFyaWEtZXhwYW5kZWRgIGFuZCBgYXJpYS1jb250cm9sc2AgZ28gb24gdGhlIHJlYWxcbiAqIGNvbnRyb2wgKHRoZSBpbm5lciBgPGJ1dHRvbj5gIG9mIGFuIGA8YXRoLWJ1dHRvbj5gKSwgYW5kIHRoZSBtZW51IGlzXG4gKiBsYWJlbGxlZCBieSBpdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW2F0aE1lbnVUcmlnZ2VyXT1cIm1lbnVcIiBhcmlhLWxhYmVsPVwiQWN0aW9uc1wiPuKLrzwvYnV0dG9uPlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXRoTWVudVRyaWdnZXJdJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgZXhwb3J0QXM6ICdhdGhNZW51VHJpZ2dlcicsXG4gIGhvc3Q6IHtcbiAgICAnKGNsaWNrKSc6ICdvbkNsaWNrKCknLFxuICAgICcoa2V5ZG93biknOiAnb25LZXlkb3duKCRldmVudCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBBdGhNZW51VHJpZ2dlckRpcmVjdGl2ZSBleHRlbmRzIEF0aE92ZXJsYXlUcmlnZ2VyQmFzZSB7XG4gIHJlYWRvbmx5IG1lbnUgPSBpbnB1dC5yZXF1aXJlZDxBdGhNZW51Q29tcG9uZW50Pih7IGFsaWFzOiAnYXRoTWVudVRyaWdnZXInIH0pO1xuXG4gIHByb3RlY3RlZCBwb3B1cEtpbmQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ21lbnUnO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tZW51KCkub3BlbigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBvcHVwSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tZW51KCkucGFuZWxJZDtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkNsaWNrKCk6IHZvaWQge1xuICAgIGNvbnN0IG1lbnUgPSB0aGlzLm1lbnUoKTtcbiAgICBtZW51LmxhYmVsRnJvbSh0aGlzLmNvbnRyb2xJZCgpKTtcbiAgICBtZW51LnRvZ2dsZSh0aGlzLmhvc3QsICdmaXJzdCcpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC5rZXkgIT09ICdBcnJvd0Rvd24nICYmIGV2ZW50LmtleSAhPT0gJ0Fycm93VXAnKSByZXR1cm47XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBtZW51ID0gdGhpcy5tZW51KCk7XG4gICAgbWVudS5sYWJlbEZyb20odGhpcy5jb250cm9sSWQoKSk7XG4gICAgbWVudS5zaG93KHRoaXMuaG9zdCwgZXZlbnQua2V5ID09PSAnQXJyb3dVcCcgPyAnbGFzdCcgOiAnZmlyc3QnKTtcbiAgfVxufVxuIl19