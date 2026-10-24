import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Upload } from 'lucide-angular';
import { injectAthLabels } from '../../i18n/labels';
import * as i0 from "@angular/core";
import * as i1 from "lucide-angular";
/**
 * Drag-and-drop file upload zone with click-to-browse fallback.
 *
 * Emits raw `File[]` — actual uploading is the caller's job (typically
 * routed via `file-service`).
 *
 * @example
 * <ath-file-drop accept="image/*,.pdf" (filesPicked)="upload($event)" />
 * <ath-file-drop [multiple]="false" [maxSizeMb]="20" (rejected)="showError($event)"
 *                (filesPicked)="onPick($event)">
 *   Drop your avatar here
 * </ath-file-drop>
 */
export class AthFileDropComponent {
    constructor() {
        this.labels = injectAthLabels();
        /** Filter for the file picker (e.g., `image/*,.pdf`). */
        this.accept = null;
        this.multiple = true;
        /** Reject files larger than this (in MB). 0 = no limit. */
        this.maxSizeMb = 0;
        this.disabled = false;
        /** Custom prompt text. Defaults to "Drop files or click to browse". */
        this.prompt = null;
        this.filesPicked = new EventEmitter();
        /** Emits when files are rejected (size limit, wrong type). */
        this.rejected = new EventEmitter();
        this.uploadIcon = Upload;
        this.dragging = signal(false);
    }
    onDragOver(event) {
        if (this.disabled)
            return;
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'copy';
        }
        this.dragging.set(true);
    }
    onDragLeave(event) {
        if (this.disabled)
            return;
        event.preventDefault();
        event.stopPropagation();
        // Only flip off if leaving the host, not a child element
        if (!event.currentTarget.contains(event.relatedTarget)) {
            this.dragging.set(false);
        }
    }
    onDrop(event) {
        if (this.disabled)
            return;
        event.preventDefault();
        event.stopPropagation();
        this.dragging.set(false);
        const files = Array.from(event.dataTransfer?.files ?? []);
        this.handle(files);
    }
    openPicker() {
        if (this.disabled)
            return;
        this.fileInput.nativeElement.click();
    }
    onPickerChange(event) {
        const input = event.target;
        const files = Array.from(input.files ?? []);
        this.handle(files);
        input.value = ''; // allow re-picking the same file
    }
    handle(files) {
        if (files.length === 0)
            return;
        const accepted = [];
        const rejected = [];
        for (const file of files) {
            if (this.maxSizeMb > 0 && file.size > this.maxSizeMb * 1024 * 1024) {
                rejected.push({ file, reason: 'size' });
                continue;
            }
            if (this.accept && !this.matchesAccept(file)) {
                rejected.push({ file, reason: 'type' });
                continue;
            }
            accepted.push(file);
        }
        if (rejected.length > 0) {
            this.rejected.emit(rejected);
        }
        if (accepted.length > 0) {
            this.filesPicked.emit(this.multiple ? accepted : [accepted[0]]);
        }
    }
    matchesAccept(file) {
        if (!this.accept)
            return true;
        const patterns = this.accept.split(',').map((p) => p.trim().toLowerCase());
        const type = file.type.toLowerCase();
        const name = file.name.toLowerCase();
        return patterns.some((p) => {
            if (p.startsWith('.'))
                return name.endsWith(p);
            if (p.endsWith('/*'))
                return type.startsWith(p.slice(0, -1));
            return type === p;
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFileDropComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthFileDropComponent, isStandalone: true, selector: "ath-file-drop", inputs: { accept: "accept", multiple: "multiple", maxSizeMb: "maxSizeMb", disabled: "disabled", prompt: "prompt" }, outputs: { filesPicked: "filesPicked", rejected: "rejected" }, host: { listeners: { "dragover": "onDragOver($event)", "dragleave": "onDragLeave($event)", "drop": "onDrop($event)" } }, viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true }], ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-fdrop\"\n  [class.ath-fdrop--dragging]=\"dragging()\"\n  [disabled]=\"disabled\"\n  (click)=\"openPicker()\"\n>\n  <span class=\"ath-fdrop__icon\" aria-hidden=\"true\">\n    <lucide-icon [img]=\"uploadIcon\" [size]=\"20\" />\n  </span>\n  <span class=\"ath-fdrop__prompt\">\n    <ng-content>{{ prompt ?? labels.fileDropPrompt() }}</ng-content>\n  </span>\n  @if (accept || maxSizeMb > 0) {\n    <span class=\"ath-fdrop__hint\">\n      @if (accept) {\n        <span>{{ accept }}</span>\n      }\n      @if (accept && maxSizeMb > 0) {\n        <span aria-hidden=\"true\">\u00B7</span>\n      }\n      @if (maxSizeMb > 0) {\n        <span>max {{ maxSizeMb }} MB</span>\n      }\n    </span>\n  }\n</button>\n<input\n  #fileInput\n  type=\"file\"\n  class=\"ath-fdrop__input\"\n  [accept]=\"accept ?? ''\"\n  [multiple]=\"multiple\"\n  (change)=\"onPickerChange($event)\"\n  hidden\n/>\n", styles: [":host{display:block}.ath-fdrop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;min-height:120px;padding:20px 16px;background:var(--bg-1);border:1.5px dashed var(--border-strong);border-radius:var(--r-lg);color:var(--fg-3);cursor:pointer;transition:background var(--t-base),border-color var(--t-base),color var(--t-base)}.ath-fdrop:hover:not(:disabled){background:var(--bg-2);border-color:var(--accent-dim);color:var(--fg-2)}.ath-fdrop--dragging{background:var(--accent-faint);border-color:var(--accent);border-style:solid;color:var(--accent)}.ath-fdrop:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fdrop:disabled{opacity:.5;cursor:not-allowed}.ath-fdrop__icon{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:999px;background:var(--bg-2);color:inherit}.ath-fdrop--dragging .ath-fdrop__icon{background:var(--accent-faint);color:var(--accent)}.ath-fdrop__prompt{font-family:var(--font-sans);font-size:13px;font-weight:500;text-align:center}.ath-fdrop__hint{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--fg-4)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFileDropComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-file-drop', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"ath-fdrop\"\n  [class.ath-fdrop--dragging]=\"dragging()\"\n  [disabled]=\"disabled\"\n  (click)=\"openPicker()\"\n>\n  <span class=\"ath-fdrop__icon\" aria-hidden=\"true\">\n    <lucide-icon [img]=\"uploadIcon\" [size]=\"20\" />\n  </span>\n  <span class=\"ath-fdrop__prompt\">\n    <ng-content>{{ prompt ?? labels.fileDropPrompt() }}</ng-content>\n  </span>\n  @if (accept || maxSizeMb > 0) {\n    <span class=\"ath-fdrop__hint\">\n      @if (accept) {\n        <span>{{ accept }}</span>\n      }\n      @if (accept && maxSizeMb > 0) {\n        <span aria-hidden=\"true\">\u00B7</span>\n      }\n      @if (maxSizeMb > 0) {\n        <span>max {{ maxSizeMb }} MB</span>\n      }\n    </span>\n  }\n</button>\n<input\n  #fileInput\n  type=\"file\"\n  class=\"ath-fdrop__input\"\n  [accept]=\"accept ?? ''\"\n  [multiple]=\"multiple\"\n  (change)=\"onPickerChange($event)\"\n  hidden\n/>\n", styles: [":host{display:block}.ath-fdrop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;min-height:120px;padding:20px 16px;background:var(--bg-1);border:1.5px dashed var(--border-strong);border-radius:var(--r-lg);color:var(--fg-3);cursor:pointer;transition:background var(--t-base),border-color var(--t-base),color var(--t-base)}.ath-fdrop:hover:not(:disabled){background:var(--bg-2);border-color:var(--accent-dim);color:var(--fg-2)}.ath-fdrop--dragging{background:var(--accent-faint);border-color:var(--accent);border-style:solid;color:var(--accent)}.ath-fdrop:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fdrop:disabled{opacity:.5;cursor:not-allowed}.ath-fdrop__icon{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:999px;background:var(--bg-2);color:inherit}.ath-fdrop--dragging .ath-fdrop__icon{background:var(--accent-faint);color:var(--accent)}.ath-fdrop__prompt{font-family:var(--font-sans);font-size:13px;font-weight:500;text-align:center}.ath-fdrop__hint{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--fg-4)}\n"] }]
        }], propDecorators: { accept: [{
                type: Input
            }], multiple: [{
                type: Input
            }], maxSizeMb: [{
                type: Input
            }], disabled: [{
                type: Input
            }], prompt: [{
                type: Input
            }], filesPicked: [{
                type: Output
            }], rejected: [{
                type: Output
            }], fileInput: [{
                type: ViewChild,
                args: ['fileInput']
            }], onDragOver: [{
                type: HostListener,
                args: ['dragover', ['$event']]
            }], onDragLeave: [{
                type: HostListener,
                args: ['dragleave', ['$event']]
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kcm9wLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9maWxlLWRyb3AvZmlsZS1kcm9wLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9maWxlLWRyb3AvZmlsZS1kcm9wLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0ksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7OztBQUVwRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFTSCxNQUFNLE9BQU8sb0JBQW9CO0lBUmpDO1FBU3FCLFdBQU0sR0FBRyxlQUFlLEVBQUUsQ0FBQztRQUU5Qyx5REFBeUQ7UUFDaEQsV0FBTSxHQUFrQixJQUFJLENBQUM7UUFFN0IsYUFBUSxHQUFHLElBQUksQ0FBQztRQUV6QiwyREFBMkQ7UUFDbEQsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUVkLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUIsdUVBQXVFO1FBQzlELFdBQU0sR0FBa0IsSUFBSSxDQUFDO1FBRTVCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVuRCw4REFBOEQ7UUFDcEQsYUFBUSxHQUFHLElBQUksWUFBWSxFQUE2QyxDQUFDO1FBRWhF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LENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7K0dBM0dVLG9CQUFvQjttR0FBcEIsb0JBQW9CLDZkQzFCakMsKzVCQW9DQSxndUNEZlksWUFBWSw4QkFBRSxtQkFBbUI7OzRGQUtoQyxvQkFBb0I7a0JBUmhDLFNBQVM7K0JBQ0UsZUFBZSxjQUNiLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQyxtQkFDM0IsdUJBQXVCLENBQUMsTUFBTTs4QkFRdEMsTUFBTTtzQkFBZCxLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBR0csU0FBUztzQkFBakIsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUdHLE1BQU07c0JBQWQsS0FBSztnQkFFSSxXQUFXO3NCQUFwQixNQUFNO2dCQUdHLFFBQVE7c0JBQWpCLE1BQU07Z0JBS3lCLFNBQVM7c0JBQXhDLFNBQVM7dUJBQUMsV0FBVztnQkFHdEIsVUFBVTtzQkFEVCxZQUFZO3VCQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFZcEMsV0FBVztzQkFEVixZQUFZO3VCQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFZckMsTUFBTTtzQkFETCxZQUFZO3VCQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIHNpZ25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEx1Y2lkZUFuZ3VsYXJNb2R1bGUsIFVwbG9hZCB9IGZyb20gJ2x1Y2lkZS1hbmd1bGFyJztcbmltcG9ydCB7IGluamVjdEF0aExhYmVscyB9IGZyb20gJy4uLy4uL2kxOG4vbGFiZWxzJztcblxuLyoqXG4gKiBEcmFnLWFuZC1kcm9wIGZpbGUgdXBsb2FkIHpvbmUgd2l0aCBjbGljay10by1icm93c2UgZmFsbGJhY2suXG4gKlxuICogRW1pdHMgcmF3IGBGaWxlW11gIOKAlCBhY3R1YWwgdXBsb2FkaW5nIGlzIHRoZSBjYWxsZXIncyBqb2IgKHR5cGljYWxseVxuICogcm91dGVkIHZpYSBgZmlsZS1zZXJ2aWNlYCkuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtZmlsZS1kcm9wIGFjY2VwdD1cImltYWdlLyosLnBkZlwiIChmaWxlc1BpY2tlZCk9XCJ1cGxvYWQoJGV2ZW50KVwiIC8+XG4gKiA8YXRoLWZpbGUtZHJvcCBbbXVsdGlwbGVdPVwiZmFsc2VcIiBbbWF4U2l6ZU1iXT1cIjIwXCIgKHJlamVjdGVkKT1cInNob3dFcnJvcigkZXZlbnQpXCJcbiAqICAgICAgICAgICAgICAgIChmaWxlc1BpY2tlZCk9XCJvblBpY2soJGV2ZW50KVwiPlxuICogICBEcm9wIHlvdXIgYXZhdGFyIGhlcmVcbiAqIDwvYXRoLWZpbGUtZHJvcD5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLWZpbGUtZHJvcCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEx1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtZHJvcC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9maWxlLWRyb3AuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhGaWxlRHJvcENvbXBvbmVudCB7XG4gIHByb3RlY3RlZCByZWFkb25seSBsYWJlbHMgPSBpbmplY3RBdGhMYWJlbHMoKTtcblxuICAvKiogRmlsdGVyIGZvciB0aGUgZmlsZSBwaWNrZXIgKGUuZy4sIGBpbWFnZS8qLC5wZGZgKS4gKi9cbiAgQElucHV0KCkgYWNjZXB0OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBASW5wdXQoKSBtdWx0aXBsZSA9IHRydWU7XG5cbiAgLyoqIFJlamVjdCBmaWxlcyBsYXJnZXIgdGhhbiB0aGlzIChpbiBNQikuIDAgPSBubyBsaW1pdC4gKi9cbiAgQElucHV0KCkgbWF4U2l6ZU1iID0gMDtcblxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKiBDdXN0b20gcHJvbXB0IHRleHQuIERlZmF1bHRzIHRvIFwiRHJvcCBmaWxlcyBvciBjbGljayB0byBicm93c2VcIi4gKi9cbiAgQElucHV0KCkgcHJvbXB0OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBAT3V0cHV0KCkgZmlsZXNQaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVbXT4oKTtcblxuICAvKiogRW1pdHMgd2hlbiBmaWxlcyBhcmUgcmVqZWN0ZWQgKHNpemUgbGltaXQsIHdyb25nIHR5cGUpLiAqL1xuICBAT3V0cHV0KCkgcmVqZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHsgZmlsZTogRmlsZTsgcmVhc29uOiAnc2l6ZScgfCAndHlwZScgfVtdPigpO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSB1cGxvYWRJY29uID0gVXBsb2FkO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZHJhZ2dpbmcgPSBzaWduYWwoZmFsc2UpO1xuXG4gIEBWaWV3Q2hpbGQoJ2ZpbGVJbnB1dCcpIHByaXZhdGUgZmlsZUlucHV0ITogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIG9uRHJhZ092ZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyKSB7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgICB9XG4gICAgdGhpcy5kcmFnZ2luZy5zZXQodHJ1ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKVxuICBvbkRyYWdMZWF2ZShldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIC8vIE9ubHkgZmxpcCBvZmYgaWYgbGVhdmluZyB0aGUgaG9zdCwgbm90IGEgY2hpbGQgZWxlbWVudFxuICAgIGlmICghKGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgTm9kZSkuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCBhcyBOb2RlKSkge1xuICAgICAgdGhpcy5kcmFnZ2luZy5zZXQoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICBvbkRyb3AoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmRyYWdnaW5nLnNldChmYWxzZSk7XG4gICAgY29uc3QgZmlsZXMgPSBBcnJheS5mcm9tKGV2ZW50LmRhdGFUcmFuc2Zlcj8uZmlsZXMgPz8gW10pO1xuICAgIHRoaXMuaGFuZGxlKGZpbGVzKTtcbiAgfVxuXG4gIG9wZW5QaWNrZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICB0aGlzLmZpbGVJbnB1dC5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gIH1cblxuICBvblBpY2tlckNoYW5nZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IGZpbGVzID0gQXJyYXkuZnJvbShpbnB1dC5maWxlcyA/PyBbXSk7XG4gICAgdGhpcy5oYW5kbGUoZmlsZXMpO1xuICAgIGlucHV0LnZhbHVlID0gJyc7IC8vIGFsbG93IHJlLXBpY2tpbmcgdGhlIHNhbWUgZmlsZVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGUoZmlsZXM6IEZpbGVbXSk6IHZvaWQge1xuICAgIGlmIChmaWxlcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIGNvbnN0IGFjY2VwdGVkOiBGaWxlW10gPSBbXTtcbiAgICBjb25zdCByZWplY3RlZDogeyBmaWxlOiBGaWxlOyByZWFzb246ICdzaXplJyB8ICd0eXBlJyB9W10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgaWYgKHRoaXMubWF4U2l6ZU1iID4gMCAmJiBmaWxlLnNpemUgPiB0aGlzLm1heFNpemVNYiAqIDEwMjQgKiAxMDI0KSB7XG4gICAgICAgIHJlamVjdGVkLnB1c2goeyBmaWxlLCByZWFzb246ICdzaXplJyB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5hY2NlcHQgJiYgIXRoaXMubWF0Y2hlc0FjY2VwdChmaWxlKSkge1xuICAgICAgICByZWplY3RlZC5wdXNoKHsgZmlsZSwgcmVhc29uOiAndHlwZScgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgYWNjZXB0ZWQucHVzaChmaWxlKTtcbiAgICB9XG5cbiAgICBpZiAocmVqZWN0ZWQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5yZWplY3RlZC5lbWl0KHJlamVjdGVkKTtcbiAgICB9XG4gICAgaWYgKGFjY2VwdGVkLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZmlsZXNQaWNrZWQuZW1pdCh0aGlzLm11bHRpcGxlID8gYWNjZXB0ZWQgOiBbYWNjZXB0ZWRbMF1dKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1hdGNoZXNBY2NlcHQoZmlsZTogRmlsZSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hY2NlcHQpIHJldHVybiB0cnVlO1xuICAgIGNvbnN0IHBhdHRlcm5zID0gdGhpcy5hY2NlcHQuc3BsaXQoJywnKS5tYXAoKHApID0+IHAudHJpbSgpLnRvTG93ZXJDYXNlKCkpO1xuICAgIGNvbnN0IHR5cGUgPSBmaWxlLnR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBuYW1lID0gZmlsZS5uYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICByZXR1cm4gcGF0dGVybnMuc29tZSgocCkgPT4ge1xuICAgICAgaWYgKHAuc3RhcnRzV2l0aCgnLicpKSByZXR1cm4gbmFtZS5lbmRzV2l0aChwKTtcbiAgICAgIGlmIChwLmVuZHNXaXRoKCcvKicpKSByZXR1cm4gdHlwZS5zdGFydHNXaXRoKHAuc2xpY2UoMCwgLTEpKTtcbiAgICAgIHJldHVybiB0eXBlID09PSBwO1xuICAgIH0pO1xuICB9XG59XG4iLCI8YnV0dG9uXG4gIHR5cGU9XCJidXR0b25cIlxuICBjbGFzcz1cImF0aC1mZHJvcFwiXG4gIFtjbGFzcy5hdGgtZmRyb3AtLWRyYWdnaW5nXT1cImRyYWdnaW5nKClcIlxuICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAoY2xpY2spPVwib3BlblBpY2tlcigpXCJcbj5cbiAgPHNwYW4gY2xhc3M9XCJhdGgtZmRyb3BfX2ljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICA8bHVjaWRlLWljb24gW2ltZ109XCJ1cGxvYWRJY29uXCIgW3NpemVdPVwiMjBcIiAvPlxuICA8L3NwYW4+XG4gIDxzcGFuIGNsYXNzPVwiYXRoLWZkcm9wX19wcm9tcHRcIj5cbiAgICA8bmctY29udGVudD57eyBwcm9tcHQgPz8gbGFiZWxzLmZpbGVEcm9wUHJvbXB0KCkgfX08L25nLWNvbnRlbnQ+XG4gIDwvc3Bhbj5cbiAgQGlmIChhY2NlcHQgfHwgbWF4U2l6ZU1iID4gMCkge1xuICAgIDxzcGFuIGNsYXNzPVwiYXRoLWZkcm9wX19oaW50XCI+XG4gICAgICBAaWYgKGFjY2VwdCkge1xuICAgICAgICA8c3Bhbj57eyBhY2NlcHQgfX08L3NwYW4+XG4gICAgICB9XG4gICAgICBAaWYgKGFjY2VwdCAmJiBtYXhTaXplTWIgPiAwKSB7XG4gICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPsK3PC9zcGFuPlxuICAgICAgfVxuICAgICAgQGlmIChtYXhTaXplTWIgPiAwKSB7XG4gICAgICAgIDxzcGFuPm1heCB7eyBtYXhTaXplTWIgfX0gTUI8L3NwYW4+XG4gICAgICB9XG4gICAgPC9zcGFuPlxuICB9XG48L2J1dHRvbj5cbjxpbnB1dFxuICAjZmlsZUlucHV0XG4gIHR5cGU9XCJmaWxlXCJcbiAgY2xhc3M9XCJhdGgtZmRyb3BfX2lucHV0XCJcbiAgW2FjY2VwdF09XCJhY2NlcHQgPz8gJydcIlxuICBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICAoY2hhbmdlKT1cIm9uUGlja2VyQ2hhbmdlKCRldmVudClcIlxuICBoaWRkZW5cbi8+XG4iXX0=