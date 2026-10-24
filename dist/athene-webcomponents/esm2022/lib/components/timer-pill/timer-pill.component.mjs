import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, computed, signal, } from '@angular/core';
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
        return this._seconds() >= 24 * 3600 ? 'alert' : this._seconds() >= 8 * 3600 ? 'warn' : null;
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthTimerPillComponent, isStandalone: true, selector: "ath-timer-pill", inputs: { active: "active", seconds: "seconds", ticketKey: "ticketKey", tooltip: "tooltip" }, outputs: { toggled: "toggled" }, host: { properties: { "attr.data-active": "this.hostActive", "attr.data-warning": "this.hostWarning" } }, ngImport: i0, template: "<button type=\"button\" class=\"ath-tpill\" [title]=\"effectiveTooltip\" (click)=\"onToggle()\">\n  <span class=\"ath-tpill__dot\" aria-hidden=\"true\"></span>\n  <span class=\"ath-tpill__time\">{{ time() }}</span>\n  @if (ticketKey) {\n    <span class=\"ath-tpill__sep\" aria-hidden=\"true\">\u00B7</span>\n    <span class=\"ath-tpill__key\">{{ ticketKey }}</span>\n  }\n</button>\n", styles: [":host{display:inline-block}.ath-tpill{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-mono);font-feature-settings:\"tnum\";cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);color:var(--fg-2);font-size:12px;font-weight:500;letter-spacing:0}.ath-tpill:hover{background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-tpill:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-tpill__dot{width:6px;height:6px;border-radius:999px;background:var(--fg-4);flex-shrink:0}.ath-tpill__time{font-size:12px;font-weight:400;color:var(--fg);letter-spacing:0}.ath-tpill__sep{color:var(--fg-4);margin:0 -1px}.ath-tpill__key{font-size:11.5px;font-weight:400;color:var(--fg-3);letter-spacing:0}:host([data-active=true]) .ath-tpill__dot{background:var(--red);animation:ath-tpill-rec 2s ease-in-out infinite}@media (prefers-reduced-motion: reduce){:host([data-active=true]) .ath-tpill__dot{animation:none}}:host([data-warning=warn]) .ath-tpill{background:var(--amber-tint);border-color:color-mix(in srgb,var(--amber) 30%,transparent);color:var(--fg)}:host([data-warning=warn]) .ath-tpill__dot{background:var(--amber)}:host([data-warning=alert]) .ath-tpill{background:var(--red-tint);border-color:color-mix(in srgb,var(--red) 35%,transparent);color:var(--fg);animation:ath-tpill-alert 1.2s ease-in-out infinite}:host([data-warning=alert]) .ath-tpill__dot{background:var(--red)}@keyframes ath-tpill-rec{0%,to{opacity:1}50%{opacity:.35}}@keyframes ath-tpill-alert{0%,to{transform:scale(1)}50%{transform:scale(1.02)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimerPillComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-timer-pill', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button type=\"button\" class=\"ath-tpill\" [title]=\"effectiveTooltip\" (click)=\"onToggle()\">\n  <span class=\"ath-tpill__dot\" aria-hidden=\"true\"></span>\n  <span class=\"ath-tpill__time\">{{ time() }}</span>\n  @if (ticketKey) {\n    <span class=\"ath-tpill__sep\" aria-hidden=\"true\">\u00B7</span>\n    <span class=\"ath-tpill__key\">{{ ticketKey }}</span>\n  }\n</button>\n", styles: [":host{display:inline-block}.ath-tpill{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-mono);font-feature-settings:\"tnum\";cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);color:var(--fg-2);font-size:12px;font-weight:500;letter-spacing:0}.ath-tpill:hover{background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-tpill:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-tpill__dot{width:6px;height:6px;border-radius:999px;background:var(--fg-4);flex-shrink:0}.ath-tpill__time{font-size:12px;font-weight:400;color:var(--fg);letter-spacing:0}.ath-tpill__sep{color:var(--fg-4);margin:0 -1px}.ath-tpill__key{font-size:11.5px;font-weight:400;color:var(--fg-3);letter-spacing:0}:host([data-active=true]) .ath-tpill__dot{background:var(--red);animation:ath-tpill-rec 2s ease-in-out infinite}@media (prefers-reduced-motion: reduce){:host([data-active=true]) .ath-tpill__dot{animation:none}}:host([data-warning=warn]) .ath-tpill{background:var(--amber-tint);border-color:color-mix(in srgb,var(--amber) 30%,transparent);color:var(--fg)}:host([data-warning=warn]) .ath-tpill__dot{background:var(--amber)}:host([data-warning=alert]) .ath-tpill{background:var(--red-tint);border-color:color-mix(in srgb,var(--red) 35%,transparent);color:var(--fg);animation:ath-tpill-alert 1.2s ease-in-out infinite}:host([data-warning=alert]) .ath-tpill__dot{background:var(--red)}@keyframes ath-tpill-rec{0%,to{opacity:1}50%{opacity:.35}}@keyframes ath-tpill-alert{0%,to{transform:scale(1)}50%{transform:scale(1.02)}}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItcGlsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvdGltZXItcGlsbC90aW1lci1waWxsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy90aW1lci1waWxsL3RpbWVyLXBpbGwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFFBQVEsRUFDUixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUUvQzs7Ozs7Ozs7Ozs7OztHQWFHO0FBU0gsTUFBTSxPQUFPLHFCQUFxQjtJQVJsQztRQVNtQixhQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFVZixjQUFTLEdBQWtCLElBQUksQ0FBQztRQUV6Qyx5REFBeUQ7UUFDaEQsWUFBTyxHQUFrQixJQUFJLENBQUM7UUFFN0IsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFXMUIsU0FBSSxHQUFHLFFBQVEsQ0FBUyxHQUFHLEVBQUU7WUFDOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzlCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDaEQsTUFBTSxPQUFPLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUMzQixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM1QyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM1QyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDZCxPQUFPLEdBQUcsS0FBSyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNoQyxDQUFDO1lBQ0QsT0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztLQVlKO0lBL0NDLElBQ0ksT0FBTyxDQUFDLEtBQWE7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUNELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFTRCxJQUFxQyxVQUFVO1FBQzdDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDeEMsQ0FBQztJQUVELElBQXNDLFdBQVc7UUFDL0MsNERBQTREO1FBQzVELE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzlGLENBQUM7SUFlRCxJQUFjLGdCQUFnQjtRQUM1QixJQUFJLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU8sdUJBQXVCLENBQUM7UUFDakQsSUFBSSxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU8sWUFBWSxJQUFJLENBQUMsU0FBUyxtQkFBbUIsQ0FBQztRQUN6RSxPQUFPLHNCQUFzQixDQUFDO0lBQ2hDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QixDQUFDOytHQW5EVSxxQkFBcUI7bUdBQXJCLHFCQUFxQixtVENsQ2xDLGlZQVFBLDJ4RERxQlksWUFBWTs7NEZBS1gscUJBQXFCO2tCQVJqQyxTQUFTOytCQUNFLGdCQUFnQixjQUNkLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxtQkFDTix1QkFBdUIsQ0FBQyxNQUFNOzhCQU90QyxNQUFNO3NCQUFkLEtBQUs7Z0JBR0YsT0FBTztzQkFEVixLQUFLO2dCQVFHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBR0csT0FBTztzQkFBZixLQUFLO2dCQUVJLE9BQU87c0JBQWhCLE1BQU07Z0JBRThCLFVBQVU7c0JBQTlDLFdBQVc7dUJBQUMsa0JBQWtCO2dCQUlPLFdBQVc7c0JBQWhELFdBQVc7dUJBQUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgY29tcHV0ZWQsXG4gIHNpZ25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIExpdmUgdGltZS10cmFja2luZyBwaWxsIGZvciB0aGUgdG9wYmFyLiAqKlN0YXRlbGVzcyBhYm91dCB0aWNraW5nKiog4oCUXG4gKiB0aGUgY29uc3VtZXIgKFRpbWVUcmFja2luZ1NlcnZpY2UpIGZlZWRzIGBzZWNvbmRzYCBhbmQgcmVhY3RzIHRvIGB0b2dnbGVkYC5cbiAqXG4gKiBUaGlzIGtlZXBzIHRoZSBjb21wb25lbnQgcHVyZSAodGVzdGFibGUpIHdoaWxlIGxldHRpbmcgdGhlIHNlcnZpY2Ugc3RheVxuICogYXV0aG9yaXRhdGl2ZSBhYm91dCB0aGUgcmVhbCBydW5uaW5nIHRpbWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtdGltZXItcGlsbFxuICogICBbYWN0aXZlXT1cInRpbWVyLnJ1bm5pbmcoKVwiXG4gKiAgIFtzZWNvbmRzXT1cInRpbWVyLmVsYXBzZWQoKVwiXG4gKiAgIFt0aWNrZXRLZXldPVwidGltZXIudGlja2V0S2V5KClcIlxuICogICAodG9nZ2xlZCk9XCJ0aW1lci50b2dnbGUoKVwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC10aW1lci1waWxsJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vdGltZXItcGlsbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi90aW1lci1waWxsLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoVGltZXJQaWxsQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSByZWFkb25seSBfc2Vjb25kcyA9IHNpZ25hbCgwKTtcblxuICBASW5wdXQoKSBhY3RpdmUgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBzZXQgc2Vjb25kcyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2Vjb25kcy5zZXQoTWF0aC5tYXgoMCwgTWF0aC5mbG9vcih2YWx1ZSkpKTtcbiAgfVxuICBnZXQgc2Vjb25kcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zZWNvbmRzKCk7XG4gIH1cblxuICBASW5wdXQoKSB0aWNrZXRLZXk6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBUb29sdGlwIG92ZXJyaWRlOyBvdGhlcndpc2UgYXV0by1idWlsdCBmcm9tIHN0YXRlLiAqL1xuICBASW5wdXQoKSB0b29sdGlwOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBAT3V0cHV0KCkgdG9nZ2xlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGF0YS1hY3RpdmUnKSBnZXQgaG9zdEFjdGl2ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZSA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGF0YS13YXJuaW5nJykgZ2V0IGhvc3RXYXJuaW5nKCk6IHN0cmluZyB8IG51bGwge1xuICAgIC8vIEFmdGVyIDhoIHN1cmZhY2VzIGEgd2FybiBjb2xvcjsgYWZ0ZXIgMjRoLCBhbiBhbGVydCBjb2xvclxuICAgIHJldHVybiB0aGlzLl9zZWNvbmRzKCkgPj0gMjQgKiAzNjAwID8gJ2FsZXJ0JyA6IHRoaXMuX3NlY29uZHMoKSA+PSA4ICogMzYwMCA/ICd3YXJuJyA6IG51bGw7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdGltZSA9IGNvbXB1dGVkPHN0cmluZz4oKCkgPT4ge1xuICAgIGNvbnN0IHRvdGFsID0gdGhpcy5fc2Vjb25kcygpO1xuICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcih0b3RhbCAvIDM2MDApO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0b3RhbCAlIDM2MDApIC8gNjApO1xuICAgIGNvbnN0IHNlY29uZHMgPSB0b3RhbCAlIDYwO1xuICAgIGNvbnN0IG1tID0gU3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgY29uc3Qgc3MgPSBTdHJpbmcoc2Vjb25kcykucGFkU3RhcnQoMiwgJzAnKTtcbiAgICBpZiAoaG91cnMgPiAwKSB7XG4gICAgICByZXR1cm4gYCR7aG91cnN9OiR7bW19OiR7c3N9YDtcbiAgICB9XG4gICAgcmV0dXJuIGAke21tfToke3NzfWA7XG4gIH0pO1xuXG4gIHByb3RlY3RlZCBnZXQgZWZmZWN0aXZlVG9vbHRpcCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnRvb2x0aXApIHJldHVybiB0aGlzLnRvb2x0aXA7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZSkgcmV0dXJuICdDbGljayB0byByZXN1bWUgdGltZXInO1xuICAgIGlmICh0aGlzLnRpY2tldEtleSkgcmV0dXJuIGBUcmFja2luZyAke3RoaXMudGlja2V0S2V5fSDCtyBjbGljayB0byBwYXVzZWA7XG4gICAgcmV0dXJuICdDbGljayB0byBwYXVzZSB0aW1lcic7XG4gIH1cblxuICBvblRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRvZ2dsZWQuZW1pdCgpO1xuICB9XG59XG4iLCI8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImF0aC10cGlsbFwiIFt0aXRsZV09XCJlZmZlY3RpdmVUb29sdGlwXCIgKGNsaWNrKT1cIm9uVG9nZ2xlKClcIj5cbiAgPHNwYW4gY2xhc3M9XCJhdGgtdHBpbGxfX2RvdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgPHNwYW4gY2xhc3M9XCJhdGgtdHBpbGxfX3RpbWVcIj57eyB0aW1lKCkgfX08L3NwYW4+XG4gIEBpZiAodGlja2V0S2V5KSB7XG4gICAgPHNwYW4gY2xhc3M9XCJhdGgtdHBpbGxfX3NlcFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPsK3PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiYXRoLXRwaWxsX19rZXlcIj57eyB0aWNrZXRLZXkgfX08L3NwYW4+XG4gIH1cbjwvYnV0dG9uPlxuIl19