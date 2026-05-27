import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Mini line chart, no axes, no labels.
 *
 * @example
 * <ath-sparkline [data]="[12, 14, 13, 18, 22, 20, 24]" color="var(--accent)" />
 * <ath-sparkline [data]="trend" [width]="86" [height]="28" [showArea]="false" />
 */
export class AthSparklineComponent {
    constructor() {
        this._data = signal([]);
        /** Width in px. */
        this.width = 86;
        /** Height in px. */
        this.height = 28;
        /** Stroke color — any CSS color (e.g., `var(--accent)`, `#16a34a`). */
        this.color = 'var(--accent)';
        /** Show a dot at the most recent value. */
        this.showDot = true;
        /** Render a translucent filled area below the line. */
        this.showArea = true;
        /** Stroke width in px. */
        this.strokeWidth = 1.5;
        this.geometry = computed(() => {
            const values = this._data();
            if (values.length < 2) {
                return null;
            }
            const w = this.width;
            const h = this.height;
            const min = Math.min(...values);
            const max = Math.max(...values);
            const range = max - min || 1;
            const points = values.map((v, i) => {
                const x = (i / (values.length - 1)) * (w - 2) + 1;
                const y = h - 2 - ((v - min) / range) * (h - 4);
                return [x, y];
            });
            const linePath = points
                .map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1))
                .join(' ');
            const areaPath = `${linePath} L ${w - 1},${h - 1} L 1,${h - 1} Z`;
            const last = points[points.length - 1];
            return { linePath, areaPath, lastX: last[0], lastY: last[1] };
        });
    }
    /** Numeric values to plot. Minimum 2 points; fewer renders nothing. */
    set data(value) {
        this._data.set(value ?? []);
    }
    get data() {
        return this._data();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSparklineComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSparklineComponent, isStandalone: true, selector: "ath-sparkline", inputs: { data: "data", width: "width", height: "height", color: "color", showDot: "showDot", showArea: "showArea", strokeWidth: "strokeWidth" }, ngImport: i0, template: "@if (geometry(); as g) {\n  <svg\n    class=\"ath-sparkline\"\n    [attr.width]=\"width\"\n    [attr.height]=\"height\"\n    [attr.viewBox]=\"'0 0 ' + width + ' ' + height\"\n    aria-hidden=\"true\"\n  >\n    @if (showArea) {\n      <path class=\"ath-sparkline__area\" [attr.d]=\"g.areaPath\" [attr.fill]=\"color\" />\n    }\n    <path\n      class=\"ath-sparkline__line\"\n      [attr.d]=\"g.linePath\"\n      [attr.stroke]=\"color\"\n      [attr.stroke-width]=\"strokeWidth\"\n    />\n    @if (showDot) {\n      <circle\n        class=\"ath-sparkline__dot\"\n        [attr.cx]=\"g.lastX\"\n        [attr.cy]=\"g.lastY\"\n        r=\"2\"\n        [attr.fill]=\"color\"\n      />\n    }\n  </svg>\n}\n", styles: [":host{display:inline-flex;align-items:center}.ath-sparkline{display:block;overflow:visible}.ath-sparkline__area{opacity:.1;stroke:none}.ath-sparkline__line{fill:none;stroke-linecap:round;stroke-linejoin:round}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSparklineComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-sparkline', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (geometry(); as g) {\n  <svg\n    class=\"ath-sparkline\"\n    [attr.width]=\"width\"\n    [attr.height]=\"height\"\n    [attr.viewBox]=\"'0 0 ' + width + ' ' + height\"\n    aria-hidden=\"true\"\n  >\n    @if (showArea) {\n      <path class=\"ath-sparkline__area\" [attr.d]=\"g.areaPath\" [attr.fill]=\"color\" />\n    }\n    <path\n      class=\"ath-sparkline__line\"\n      [attr.d]=\"g.linePath\"\n      [attr.stroke]=\"color\"\n      [attr.stroke-width]=\"strokeWidth\"\n    />\n    @if (showDot) {\n      <circle\n        class=\"ath-sparkline__dot\"\n        [attr.cx]=\"g.lastX\"\n        [attr.cy]=\"g.lastY\"\n        r=\"2\"\n        [attr.fill]=\"color\"\n      />\n    }\n  </svg>\n}\n", styles: [":host{display:inline-flex;align-items:center}.ath-sparkline{display:block;overflow:visible}.ath-sparkline__area{opacity:.1;stroke:none}.ath-sparkline__line{fill:none;stroke-linecap:round;stroke-linejoin:round}\n"] }]
        }], propDecorators: { data: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], color: [{
                type: Input
            }], showDot: [{
                type: Input
            }], showArea: [{
                type: Input
            }], strokeWidth: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhcmtsaW5lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zcGFya2xpbmUvc3BhcmtsaW5lLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zcGFya2xpbmUvc3BhcmtsaW5lLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUUvQzs7Ozs7O0dBTUc7QUFTSCxNQUFNLE9BQU8scUJBQXFCO0lBUmxDO1FBU21CLFVBQUssR0FBRyxNQUFNLENBQVcsRUFBRSxDQUFDLENBQUM7UUFXOUMsbUJBQW1CO1FBQ1YsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVwQixvQkFBb0I7UUFDWCxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBRXJCLHVFQUF1RTtRQUM5RCxVQUFLLEdBQUcsZUFBZSxDQUFDO1FBRWpDLDJDQUEyQztRQUNsQyxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXhCLHVEQUF1RDtRQUM5QyxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXpCLDBCQUEwQjtRQUNqQixnQkFBVyxHQUFHLEdBQUcsQ0FBQztRQUVSLGFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFO1lBQzFDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3RCLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDckIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN0QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDaEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBRTdCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBVSxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxRQUFRLEdBQUcsTUFBTTtpQkFDcEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzlFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNiLE1BQU0sUUFBUSxHQUFHLEdBQUcsUUFBUSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDbEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFdkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQXBEQyx1RUFBdUU7SUFDdkUsSUFDSSxJQUFJLENBQUMsS0FBa0M7UUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QixDQUFDOytHQVZVLHFCQUFxQjttR0FBckIscUJBQXFCLDJOQ2xCbEMsZ3NCQTRCQSw0UURmWSxZQUFZOzs0RkFLWCxxQkFBcUI7a0JBUmpDLFNBQVM7K0JBQ0UsZUFBZSxjQUNiLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxtQkFDTix1QkFBdUIsQ0FBQyxNQUFNOzhCQVMzQyxJQUFJO3NCQURQLEtBQUs7Z0JBU0csS0FBSztzQkFBYixLQUFLO2dCQUdHLE1BQU07c0JBQWQsS0FBSztnQkFHRyxLQUFLO3NCQUFiLEtBQUs7Z0JBR0csT0FBTztzQkFBZixLQUFLO2dCQUdHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBR0csV0FBVztzQkFBbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBjb21wdXRlZCwgc2lnbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIE1pbmkgbGluZSBjaGFydCwgbm8gYXhlcywgbm8gbGFiZWxzLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXNwYXJrbGluZSBbZGF0YV09XCJbMTIsIDE0LCAxMywgMTgsIDIyLCAyMCwgMjRdXCIgY29sb3I9XCJ2YXIoLS1hY2NlbnQpXCIgLz5cbiAqIDxhdGgtc3BhcmtsaW5lIFtkYXRhXT1cInRyZW5kXCIgW3dpZHRoXT1cIjg2XCIgW2hlaWdodF09XCIyOFwiIFtzaG93QXJlYV09XCJmYWxzZVwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1zcGFya2xpbmUnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9zcGFya2xpbmUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vc3BhcmtsaW5lLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoU3BhcmtsaW5lQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSByZWFkb25seSBfZGF0YSA9IHNpZ25hbDxudW1iZXJbXT4oW10pO1xuXG4gIC8qKiBOdW1lcmljIHZhbHVlcyB0byBwbG90LiBNaW5pbXVtIDIgcG9pbnRzOyBmZXdlciByZW5kZXJzIG5vdGhpbmcuICovXG4gIEBJbnB1dCgpXG4gIHNldCBkYXRhKHZhbHVlOiBudW1iZXJbXSB8IG51bGwgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl9kYXRhLnNldCh2YWx1ZSA/PyBbXSk7XG4gIH1cbiAgZ2V0IGRhdGEoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhKCk7XG4gIH1cblxuICAvKiogV2lkdGggaW4gcHguICovXG4gIEBJbnB1dCgpIHdpZHRoID0gODY7XG5cbiAgLyoqIEhlaWdodCBpbiBweC4gKi9cbiAgQElucHV0KCkgaGVpZ2h0ID0gMjg7XG5cbiAgLyoqIFN0cm9rZSBjb2xvciDigJQgYW55IENTUyBjb2xvciAoZS5nLiwgYHZhcigtLWFjY2VudClgLCBgIzE2YTM0YWApLiAqL1xuICBASW5wdXQoKSBjb2xvciA9ICd2YXIoLS1hY2NlbnQpJztcblxuICAvKiogU2hvdyBhIGRvdCBhdCB0aGUgbW9zdCByZWNlbnQgdmFsdWUuICovXG4gIEBJbnB1dCgpIHNob3dEb3QgPSB0cnVlO1xuXG4gIC8qKiBSZW5kZXIgYSB0cmFuc2x1Y2VudCBmaWxsZWQgYXJlYSBiZWxvdyB0aGUgbGluZS4gKi9cbiAgQElucHV0KCkgc2hvd0FyZWEgPSB0cnVlO1xuXG4gIC8qKiBTdHJva2Ugd2lkdGggaW4gcHguICovXG4gIEBJbnB1dCgpIHN0cm9rZVdpZHRoID0gMS41O1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBnZW9tZXRyeSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLl9kYXRhKCk7XG4gICAgaWYgKHZhbHVlcy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgdyA9IHRoaXMud2lkdGg7XG4gICAgY29uc3QgaCA9IHRoaXMuaGVpZ2h0O1xuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLnZhbHVlcyk7XG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4udmFsdWVzKTtcbiAgICBjb25zdCByYW5nZSA9IG1heCAtIG1pbiB8fCAxO1xuXG4gICAgY29uc3QgcG9pbnRzID0gdmFsdWVzLm1hcCgodiwgaSkgPT4ge1xuICAgICAgY29uc3QgeCA9IChpIC8gKHZhbHVlcy5sZW5ndGggLSAxKSkgKiAodyAtIDIpICsgMTtcbiAgICAgIGNvbnN0IHkgPSBoIC0gMiAtICgodiAtIG1pbikgLyByYW5nZSkgKiAoaCAtIDQpO1xuICAgICAgcmV0dXJuIFt4LCB5XSBhcyBjb25zdDtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxpbmVQYXRoID0gcG9pbnRzXG4gICAgICAubWFwKChwLCBpKSA9PiAoaSA9PT0gMCA/ICdNJyA6ICdMJykgKyBwWzBdLnRvRml4ZWQoMSkgKyAnLCcgKyBwWzFdLnRvRml4ZWQoMSkpXG4gICAgICAuam9pbignICcpO1xuICAgIGNvbnN0IGFyZWFQYXRoID0gYCR7bGluZVBhdGh9IEwgJHt3IC0gMX0sJHtoIC0gMX0gTCAxLCR7aCAtIDF9IFpgO1xuICAgIGNvbnN0IGxhc3QgPSBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdO1xuXG4gICAgcmV0dXJuIHsgbGluZVBhdGgsIGFyZWFQYXRoLCBsYXN0WDogbGFzdFswXSwgbGFzdFk6IGxhc3RbMV0gfTtcbiAgfSk7XG59XG4iLCJAaWYgKGdlb21ldHJ5KCk7IGFzIGcpIHtcbiAgPHN2Z1xuICAgIGNsYXNzPVwiYXRoLXNwYXJrbGluZVwiXG4gICAgW2F0dHIud2lkdGhdPVwid2lkdGhcIlxuICAgIFthdHRyLmhlaWdodF09XCJoZWlnaHRcIlxuICAgIFthdHRyLnZpZXdCb3hdPVwiJzAgMCAnICsgd2lkdGggKyAnICcgKyBoZWlnaHRcIlxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gID5cbiAgICBAaWYgKHNob3dBcmVhKSB7XG4gICAgICA8cGF0aCBjbGFzcz1cImF0aC1zcGFya2xpbmVfX2FyZWFcIiBbYXR0ci5kXT1cImcuYXJlYVBhdGhcIiBbYXR0ci5maWxsXT1cImNvbG9yXCIgLz5cbiAgICB9XG4gICAgPHBhdGhcbiAgICAgIGNsYXNzPVwiYXRoLXNwYXJrbGluZV9fbGluZVwiXG4gICAgICBbYXR0ci5kXT1cImcubGluZVBhdGhcIlxuICAgICAgW2F0dHIuc3Ryb2tlXT1cImNvbG9yXCJcbiAgICAgIFthdHRyLnN0cm9rZS13aWR0aF09XCJzdHJva2VXaWR0aFwiXG4gICAgLz5cbiAgICBAaWYgKHNob3dEb3QpIHtcbiAgICAgIDxjaXJjbGVcbiAgICAgICAgY2xhc3M9XCJhdGgtc3BhcmtsaW5lX19kb3RcIlxuICAgICAgICBbYXR0ci5jeF09XCJnLmxhc3RYXCJcbiAgICAgICAgW2F0dHIuY3ldPVwiZy5sYXN0WVwiXG4gICAgICAgIHI9XCIyXCJcbiAgICAgICAgW2F0dHIuZmlsbF09XCJjb2xvclwiXG4gICAgICAvPlxuICAgIH1cbiAgPC9zdmc+XG59XG4iXX0=