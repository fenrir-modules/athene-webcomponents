import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Live time-tracking pill for the topbar. **Stateless about ticking** —
 * the consumer (TimeTrackingService) feeds `seconds` and reacts to `toggled`.
 *
 * This keeps the component pure (testable) while letting the service stay
 * authoritative about the real running time.
 *
 * @example
 * <ath-timer-pill
 *   [active]="timer.running()"
 *   [seconds]="timer.elapsed()"
 *   [ticketKey]="timer.ticketKey()"
 *   (toggled)="timer.toggle()" />
 */
export class AthTimerPillComponent {
    constructor() {
        this._seconds = signal(0);
        this.active = false;
        this.ticketKey = null;
        /** Tooltip override; otherwise auto-built from state. */
        this.tooltip = null;
        this.toggled = new EventEmitter();
        this.time = computed(() => {
            const total = this._seconds();
            const hours = Math.floor(total / 3600);
            const minutes = Math.floor((total % 3600) / 60);
            const seconds = total % 60;
            const mm = String(minutes).padStart(2, '0');
            const ss = String(seconds).padStart(2, '0');
            if (hours > 0) {
                return `${hours}:${mm}:${ss}`;
            }
            return `${mm}:${ss}`;
        });
    }
    set seconds(value) {
        this._seconds.set(Math.max(0, Math.floor(value)));
    }
    get seconds() {
        return this._seconds();
    }
    get hostActive() {
        return this.active ? 'true' : 'false';
    }
    get hostWarning() {
        // After 8h surfaces a warn color; after 24h, an alert color
        return this._seconds() >= 24 * 3600 ? 'alert'
            : this._seconds() >= 8 * 3600 ? 'warn'
                : null;
    }
    get effectiveTooltip() {
        if (this.tooltip)
            return this.tooltip;
        if (!this.active)
            return 'Click to resume timer';
        if (this.ticketKey)
            return `Tracking ${this.ticketKey} · click to pause`;
        return 'Click to pause timer';
    }
    onToggle() {
        this.toggled.emit();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimerPillComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthTimerPillComponent, isStandalone: true, selector: "ath-timer-pill", inputs: { active: "active", seconds: "seconds", ticketKey: "ticketKey", tooltip: "tooltip" }, outputs: { toggled: "toggled" }, host: { properties: { "attr.data-active": "this.hostActive", "attr.data-warning": "this.hostWarning" } }, ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-tpill\"\n  [title]=\"effectiveTooltip\"\n  (click)=\"onToggle()\"\n>\n  <span class=\"ath-tpill__dot\" aria-hidden=\"true\"></span>\n  <span class=\"ath-tpill__time\">{{ time() }}</span>\n  @if (ticketKey) {\n    <span class=\"ath-tpill__sep\" aria-hidden=\"true\">\u00B7</span>\n    <span class=\"ath-tpill__key\">{{ ticketKey }}</span>\n  }\n</button>\n", styles: [":host{display:inline-block}.ath-tpill{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;background:var(--bg-1);border:1px solid var(--border);border-radius:999px;font-family:var(--font-sans);cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);color:var(--fg-2);font-size:12px;font-weight:500;letter-spacing:0}.ath-tpill:hover{background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-tpill:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-tpill__dot{width:7px;height:7px;border-radius:999px;background:var(--fg-4);flex-shrink:0}.ath-tpill__time{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11.5px;color:var(--fg);letter-spacing:0}.ath-tpill__sep{color:var(--fg-4);margin:0 -1px}.ath-tpill__key{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11px;color:var(--fg-3);letter-spacing:0}:host([data-active=true]) .ath-tpill{background:var(--green-tint);border-color:color-mix(in srgb,var(--green) 30%,transparent)}:host([data-active=true]) .ath-tpill__dot{background:var(--green);box-shadow:0 0 0 3px color-mix(in srgb,var(--green) 18%,transparent);animation:ath-tpill-pulse 1.6s ease-in-out infinite}:host([data-warning=warn]) .ath-tpill{background:var(--amber-tint);border-color:color-mix(in srgb,var(--amber) 30%,transparent);color:var(--fg)}:host([data-warning=warn]) .ath-tpill__dot{background:var(--amber)}:host([data-warning=alert]) .ath-tpill{background:var(--red-tint);border-color:color-mix(in srgb,var(--red) 35%,transparent);color:var(--fg);animation:ath-tpill-alert 1.2s ease-in-out infinite}:host([data-warning=alert]) .ath-tpill__dot{background:var(--red)}@keyframes ath-tpill-pulse{0%,to{box-shadow:0 0 0 3px color-mix(in srgb,var(--green) 18%,transparent)}50%{box-shadow:0 0 0 5px color-mix(in srgb,var(--green) 10%,transparent)}}@keyframes ath-tpill-alert{0%,to{transform:scale(1)}50%{transform:scale(1.02)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimerPillComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-timer-pill', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"ath-tpill\"\n  [title]=\"effectiveTooltip\"\n  (click)=\"onToggle()\"\n>\n  <span class=\"ath-tpill__dot\" aria-hidden=\"true\"></span>\n  <span class=\"ath-tpill__time\">{{ time() }}</span>\n  @if (ticketKey) {\n    <span class=\"ath-tpill__sep\" aria-hidden=\"true\">\u00B7</span>\n    <span class=\"ath-tpill__key\">{{ ticketKey }}</span>\n  }\n</button>\n", styles: [":host{display:inline-block}.ath-tpill{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;background:var(--bg-1);border:1px solid var(--border);border-radius:999px;font-family:var(--font-sans);cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);color:var(--fg-2);font-size:12px;font-weight:500;letter-spacing:0}.ath-tpill:hover{background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-tpill:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-tpill__dot{width:7px;height:7px;border-radius:999px;background:var(--fg-4);flex-shrink:0}.ath-tpill__time{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11.5px;color:var(--fg);letter-spacing:0}.ath-tpill__sep{color:var(--fg-4);margin:0 -1px}.ath-tpill__key{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11px;color:var(--fg-3);letter-spacing:0}:host([data-active=true]) .ath-tpill{background:var(--green-tint);border-color:color-mix(in srgb,var(--green) 30%,transparent)}:host([data-active=true]) .ath-tpill__dot{background:var(--green);box-shadow:0 0 0 3px color-mix(in srgb,var(--green) 18%,transparent);animation:ath-tpill-pulse 1.6s ease-in-out infinite}:host([data-warning=warn]) .ath-tpill{background:var(--amber-tint);border-color:color-mix(in srgb,var(--amber) 30%,transparent);color:var(--fg)}:host([data-warning=warn]) .ath-tpill__dot{background:var(--amber)}:host([data-warning=alert]) .ath-tpill{background:var(--red-tint);border-color:color-mix(in srgb,var(--red) 35%,transparent);color:var(--fg);animation:ath-tpill-alert 1.2s ease-in-out infinite}:host([data-warning=alert]) .ath-tpill__dot{background:var(--red)}@keyframes ath-tpill-pulse{0%,to{box-shadow:0 0 0 3px color-mix(in srgb,var(--green) 18%,transparent)}50%{box-shadow:0 0 0 5px color-mix(in srgb,var(--green) 10%,transparent)}}@keyframes ath-tpill-alert{0%,to{transform:scale(1)}50%{transform:scale(1.02)}}\n"] }]
        }], propDecorators: { active: [{
                type: Input
            }], seconds: [{
                type: Input
            }], ticketKey: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], toggled: [{
                type: Output
            }], hostActive: [{
                type: HostBinding,
                args: ['attr.data-active']
            }], hostWarning: [{
                type: HostBinding,
                args: ['attr.data-warning']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItcGlsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvdGltZXItcGlsbC90aW1lci1waWxsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy90aW1lci1waWxsL3RpbWVyLXBpbGwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRS9DOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFTSCxNQUFNLE9BQU8scUJBQXFCO0lBUmxDO1FBU21CLGFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0IsV0FBTSxHQUFHLEtBQUssQ0FBQztRQVVmLGNBQVMsR0FBa0IsSUFBSSxDQUFDO1FBRXpDLHlEQUF5RDtRQUNoRCxZQUFPLEdBQWtCLElBQUksQ0FBQztRQUU3QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQWExQixTQUFJLEdBQUcsUUFBUSxDQUFTLEdBQUcsRUFBRTtZQUM5QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDOUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDdkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNoRCxNQUFNLE9BQU8sR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQzNCLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUNkLE9BQU8sR0FBRyxLQUFLLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ2hDLENBQUM7WUFDRCxPQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0tBWUo7SUFqREMsSUFDSSxPQUFPLENBQUMsS0FBYTtRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQVNELElBQXFDLFVBQVU7UUFDN0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBc0MsV0FBVztRQUMvQyw0REFBNEQ7UUFDNUQsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTztZQUN4QyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU07Z0JBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBZUQsSUFBYyxnQkFBZ0I7UUFDNUIsSUFBSSxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFPLHVCQUF1QixDQUFDO1FBQ2pELElBQUksSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPLFlBQVksSUFBSSxDQUFDLFNBQVMsbUJBQW1CLENBQUM7UUFDekUsT0FBTyxzQkFBc0IsQ0FBQztJQUNoQyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQzsrR0FyRFUscUJBQXFCO21HQUFyQixxQkFBcUIsbVRDekJsQywrWUFhQSw0aUVET1ksWUFBWTs7NEZBS1gscUJBQXFCO2tCQVJqQyxTQUFTOytCQUNFLGdCQUFnQixjQUNkLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxtQkFDTix1QkFBdUIsQ0FBQyxNQUFNOzhCQU90QyxNQUFNO3NCQUFkLEtBQUs7Z0JBR0YsT0FBTztzQkFEVixLQUFLO2dCQVFHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBR0csT0FBTztzQkFBZixLQUFLO2dCQUVJLE9BQU87c0JBQWhCLE1BQU07Z0JBRThCLFVBQVU7c0JBQTlDLFdBQVc7dUJBQUMsa0JBQWtCO2dCQUlPLFdBQVc7c0JBQWhELFdBQVc7dUJBQUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE91dHB1dCwgY29tcHV0ZWQsIHNpZ25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLyoqXG4gKiBMaXZlIHRpbWUtdHJhY2tpbmcgcGlsbCBmb3IgdGhlIHRvcGJhci4gKipTdGF0ZWxlc3MgYWJvdXQgdGlja2luZyoqIOKAlFxuICogdGhlIGNvbnN1bWVyIChUaW1lVHJhY2tpbmdTZXJ2aWNlKSBmZWVkcyBgc2Vjb25kc2AgYW5kIHJlYWN0cyB0byBgdG9nZ2xlZGAuXG4gKlxuICogVGhpcyBrZWVwcyB0aGUgY29tcG9uZW50IHB1cmUgKHRlc3RhYmxlKSB3aGlsZSBsZXR0aW5nIHRoZSBzZXJ2aWNlIHN0YXlcbiAqIGF1dGhvcml0YXRpdmUgYWJvdXQgdGhlIHJlYWwgcnVubmluZyB0aW1lLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXRpbWVyLXBpbGxcbiAqICAgW2FjdGl2ZV09XCJ0aW1lci5ydW5uaW5nKClcIlxuICogICBbc2Vjb25kc109XCJ0aW1lci5lbGFwc2VkKClcIlxuICogICBbdGlja2V0S2V5XT1cInRpbWVyLnRpY2tldEtleSgpXCJcbiAqICAgKHRvZ2dsZWQpPVwidGltZXIudG9nZ2xlKClcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtdGltZXItcGlsbCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWVyLXBpbGwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vdGltZXItcGlsbC5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFRpbWVyUGlsbENvbXBvbmVudCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3NlY29uZHMgPSBzaWduYWwoMCk7XG5cbiAgQElucHV0KCkgYWN0aXZlID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgc2V0IHNlY29uZHModmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3NlY29uZHMuc2V0KE1hdGgubWF4KDAsIE1hdGguZmxvb3IodmFsdWUpKSk7XG4gIH1cbiAgZ2V0IHNlY29uZHMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2Vjb25kcygpO1xuICB9XG5cbiAgQElucHV0KCkgdGlja2V0S2V5OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvKiogVG9vbHRpcCBvdmVycmlkZTsgb3RoZXJ3aXNlIGF1dG8tYnVpbHQgZnJvbSBzdGF0ZS4gKi9cbiAgQElucHV0KCkgdG9vbHRpcDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgQE91dHB1dCgpIHRvZ2dsZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmRhdGEtYWN0aXZlJykgZ2V0IGhvc3RBY3RpdmUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmUgPyAndHJ1ZScgOiAnZmFsc2UnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmRhdGEtd2FybmluZycpIGdldCBob3N0V2FybmluZygpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAvLyBBZnRlciA4aCBzdXJmYWNlcyBhIHdhcm4gY29sb3I7IGFmdGVyIDI0aCwgYW4gYWxlcnQgY29sb3JcbiAgICByZXR1cm4gdGhpcy5fc2Vjb25kcygpID49IDI0ICogMzYwMCA/ICdhbGVydCdcbiAgICAgICAgIDogdGhpcy5fc2Vjb25kcygpID49IDggKiAzNjAwID8gJ3dhcm4nXG4gICAgICAgICA6IG51bGw7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdGltZSA9IGNvbXB1dGVkPHN0cmluZz4oKCkgPT4ge1xuICAgIGNvbnN0IHRvdGFsID0gdGhpcy5fc2Vjb25kcygpO1xuICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcih0b3RhbCAvIDM2MDApO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0b3RhbCAlIDM2MDApIC8gNjApO1xuICAgIGNvbnN0IHNlY29uZHMgPSB0b3RhbCAlIDYwO1xuICAgIGNvbnN0IG1tID0gU3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgY29uc3Qgc3MgPSBTdHJpbmcoc2Vjb25kcykucGFkU3RhcnQoMiwgJzAnKTtcbiAgICBpZiAoaG91cnMgPiAwKSB7XG4gICAgICByZXR1cm4gYCR7aG91cnN9OiR7bW19OiR7c3N9YDtcbiAgICB9XG4gICAgcmV0dXJuIGAke21tfToke3NzfWA7XG4gIH0pO1xuXG4gIHByb3RlY3RlZCBnZXQgZWZmZWN0aXZlVG9vbHRpcCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnRvb2x0aXApIHJldHVybiB0aGlzLnRvb2x0aXA7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZSkgcmV0dXJuICdDbGljayB0byByZXN1bWUgdGltZXInO1xuICAgIGlmICh0aGlzLnRpY2tldEtleSkgcmV0dXJuIGBUcmFja2luZyAke3RoaXMudGlja2V0S2V5fSDCtyBjbGljayB0byBwYXVzZWA7XG4gICAgcmV0dXJuICdDbGljayB0byBwYXVzZSB0aW1lcic7XG4gIH1cblxuICBvblRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRvZ2dsZWQuZW1pdCgpO1xuICB9XG59XG4iLCI8YnV0dG9uXG4gIHR5cGU9XCJidXR0b25cIlxuICBjbGFzcz1cImF0aC10cGlsbFwiXG4gIFt0aXRsZV09XCJlZmZlY3RpdmVUb29sdGlwXCJcbiAgKGNsaWNrKT1cIm9uVG9nZ2xlKClcIlxuPlxuICA8c3BhbiBjbGFzcz1cImF0aC10cGlsbF9fZG90XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cImF0aC10cGlsbF9fdGltZVwiPnt7IHRpbWUoKSB9fTwvc3Bhbj5cbiAgQGlmICh0aWNrZXRLZXkpIHtcbiAgICA8c3BhbiBjbGFzcz1cImF0aC10cGlsbF9fc2VwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+wrc8L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJhdGgtdHBpbGxfX2tleVwiPnt7IHRpY2tldEtleSB9fTwvc3Bhbj5cbiAgfVxuPC9idXR0b24+XG4iXX0=