import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Upload } from 'lucide-angular';
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
        /** Filter for the file picker (e.g., `image/*,.pdf`). */
        this.accept = null;
        this.multiple = true;
        /** Reject files larger than this (in MB). 0 = no limit. */
        this.maxSizeMb = 0;
        this.disabled = false;
        /** Custom prompt text. Defaults to "Drop files or click to browse". */
        this.prompt = 'Drop files or click to browse';
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthFileDropComponent, isStandalone: true, selector: "ath-file-drop", inputs: { accept: "accept", multiple: "multiple", maxSizeMb: "maxSizeMb", disabled: "disabled", prompt: "prompt" }, outputs: { filesPicked: "filesPicked", rejected: "rejected" }, host: { listeners: { "dragover": "onDragOver($event)", "dragleave": "onDragLeave($event)", "drop": "onDrop($event)" } }, viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true }], ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-fdrop\"\n  [class.ath-fdrop--dragging]=\"dragging()\"\n  [disabled]=\"disabled\"\n  (click)=\"openPicker()\"\n>\n  <span class=\"ath-fdrop__icon\" aria-hidden=\"true\">\n    <lucide-icon [img]=\"uploadIcon\" [size]=\"20\" />\n  </span>\n  <span class=\"ath-fdrop__prompt\">\n    <ng-content>{{ prompt }}</ng-content>\n  </span>\n  @if (accept || maxSizeMb > 0) {\n    <span class=\"ath-fdrop__hint\">\n      @if (accept) {\n        <span>{{ accept }}</span>\n      }\n      @if (accept && maxSizeMb > 0) {\n        <span aria-hidden=\"true\">\u00B7</span>\n      }\n      @if (maxSizeMb > 0) {\n        <span>max {{ maxSizeMb }} MB</span>\n      }\n    </span>\n  }\n</button>\n<input\n  #fileInput\n  type=\"file\"\n  class=\"ath-fdrop__input\"\n  [accept]=\"accept ?? ''\"\n  [multiple]=\"multiple\"\n  (change)=\"onPickerChange($event)\"\n  hidden\n/>\n", styles: [":host{display:block}.ath-fdrop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;min-height:120px;padding:20px 16px;background:var(--bg-1);border:1.5px dashed var(--border-strong);border-radius:var(--r-lg);color:var(--fg-3);cursor:pointer;transition:background var(--t-base),border-color var(--t-base),color var(--t-base)}.ath-fdrop:hover:not(:disabled){background:var(--bg-2);border-color:var(--accent-dim);color:var(--fg-2)}.ath-fdrop--dragging{background:var(--accent-faint);border-color:var(--accent);border-style:solid;color:var(--accent)}.ath-fdrop:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fdrop:disabled{opacity:.5;cursor:not-allowed}.ath-fdrop__icon{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:999px;background:var(--bg-2);color:inherit}.ath-fdrop--dragging .ath-fdrop__icon{background:var(--accent-faint);color:var(--accent)}.ath-fdrop__prompt{font-family:var(--font-sans);font-size:13px;font-weight:500;text-align:center}.ath-fdrop__hint{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--fg-4)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFileDropComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-file-drop', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"ath-fdrop\"\n  [class.ath-fdrop--dragging]=\"dragging()\"\n  [disabled]=\"disabled\"\n  (click)=\"openPicker()\"\n>\n  <span class=\"ath-fdrop__icon\" aria-hidden=\"true\">\n    <lucide-icon [img]=\"uploadIcon\" [size]=\"20\" />\n  </span>\n  <span class=\"ath-fdrop__prompt\">\n    <ng-content>{{ prompt }}</ng-content>\n  </span>\n  @if (accept || maxSizeMb > 0) {\n    <span class=\"ath-fdrop__hint\">\n      @if (accept) {\n        <span>{{ accept }}</span>\n      }\n      @if (accept && maxSizeMb > 0) {\n        <span aria-hidden=\"true\">\u00B7</span>\n      }\n      @if (maxSizeMb > 0) {\n        <span>max {{ maxSizeMb }} MB</span>\n      }\n    </span>\n  }\n</button>\n<input\n  #fileInput\n  type=\"file\"\n  class=\"ath-fdrop__input\"\n  [accept]=\"accept ?? ''\"\n  [multiple]=\"multiple\"\n  (change)=\"onPickerChange($event)\"\n  hidden\n/>\n", styles: [":host{display:block}.ath-fdrop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;min-height:120px;padding:20px 16px;background:var(--bg-1);border:1.5px dashed var(--border-strong);border-radius:var(--r-lg);color:var(--fg-3);cursor:pointer;transition:background var(--t-base),border-color var(--t-base),color var(--t-base)}.ath-fdrop:hover:not(:disabled){background:var(--bg-2);border-color:var(--accent-dim);color:var(--fg-2)}.ath-fdrop--dragging{background:var(--accent-faint);border-color:var(--accent);border-style:solid;color:var(--accent)}.ath-fdrop:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fdrop:disabled{opacity:.5;cursor:not-allowed}.ath-fdrop__icon{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:999px;background:var(--bg-2);color:inherit}.ath-fdrop--dragging .ath-fdrop__icon{background:var(--accent-faint);color:var(--accent)}.ath-fdrop__prompt{font-family:var(--font-sans);font-size:13px;font-weight:500;text-align:center}.ath-fdrop__hint{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--fg-4)}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kcm9wLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9maWxlLWRyb3AvZmlsZS1kcm9wLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9maWxlLWRyb3AvZmlsZS1kcm9wLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0ksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRTdEOzs7Ozs7Ozs7Ozs7R0FZRztBQVNILE1BQU0sT0FBTyxvQkFBb0I7SUFSakM7UUFTRSx5REFBeUQ7UUFDaEQsV0FBTSxHQUFrQixJQUFJLENBQUM7UUFFN0IsYUFBUSxHQUFHLElBQUksQ0FBQztRQUV6QiwyREFBMkQ7UUFDbEQsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUVkLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUIsdUVBQXVFO1FBQzlELFdBQU0sR0FBRywrQkFBK0IsQ0FBQztRQUV4QyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFbkQsOERBQThEO1FBQ3BELGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBNkMsQ0FBQztRQUVoRSxlQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLGFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FzRjdDO0lBakZD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QUksS0FBSyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOytHQXpHVSxvQkFBb0I7bUdBQXBCLG9CQUFvQiw2ZEN6QmpDLG80QkFvQ0EsZ3VDRGhCWSxZQUFZLDhCQUFFLG1CQUFtQjs7NEZBS2hDLG9CQUFvQjtrQkFSaEMsU0FBUzsrQkFDRSxlQUFlLGNBQ2IsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDLG1CQUMzQix1QkFBdUIsQ0FBQyxNQUFNOzhCQU10QyxNQUFNO3NCQUFkLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBR0csTUFBTTtzQkFBZCxLQUFLO2dCQUVJLFdBQVc7c0JBQXBCLE1BQU07Z0JBR0csUUFBUTtzQkFBakIsTUFBTTtnQkFLeUIsU0FBUztzQkFBeEMsU0FBUzt1QkFBQyxXQUFXO2dCQUd0QixVQUFVO3NCQURULFlBQVk7dUJBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVlwQyxXQUFXO3NCQURWLFlBQVk7dUJBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVlyQyxNQUFNO3NCQURMLFlBQVk7dUJBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgc2lnbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTHVjaWRlQW5ndWxhck1vZHVsZSwgVXBsb2FkIH0gZnJvbSAnbHVjaWRlLWFuZ3VsYXInO1xuXG4vKipcbiAqIERyYWctYW5kLWRyb3AgZmlsZSB1cGxvYWQgem9uZSB3aXRoIGNsaWNrLXRvLWJyb3dzZSBmYWxsYmFjay5cbiAqXG4gKiBFbWl0cyByYXcgYEZpbGVbXWAg4oCUIGFjdHVhbCB1cGxvYWRpbmcgaXMgdGhlIGNhbGxlcidzIGpvYiAodHlwaWNhbGx5XG4gKiByb3V0ZWQgdmlhIGBmaWxlLXNlcnZpY2VgKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1maWxlLWRyb3AgYWNjZXB0PVwiaW1hZ2UvKiwucGRmXCIgKGZpbGVzUGlja2VkKT1cInVwbG9hZCgkZXZlbnQpXCIgLz5cbiAqIDxhdGgtZmlsZS1kcm9wIFttdWx0aXBsZV09XCJmYWxzZVwiIFttYXhTaXplTWJdPVwiMjBcIiAocmVqZWN0ZWQpPVwic2hvd0Vycm9yKCRldmVudClcIlxuICogICAgICAgICAgICAgICAgKGZpbGVzUGlja2VkKT1cIm9uUGljaygkZXZlbnQpXCI+XG4gKiAgIERyb3AgeW91ciBhdmF0YXIgaGVyZVxuICogPC9hdGgtZmlsZS1kcm9wPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtZmlsZS1kcm9wJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTHVjaWRlQW5ndWxhck1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vZmlsZS1kcm9wLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2ZpbGUtZHJvcC5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aEZpbGVEcm9wQ29tcG9uZW50IHtcbiAgLyoqIEZpbHRlciBmb3IgdGhlIGZpbGUgcGlja2VyIChlLmcuLCBgaW1hZ2UvKiwucGRmYCkuICovXG4gIEBJbnB1dCgpIGFjY2VwdDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgQElucHV0KCkgbXVsdGlwbGUgPSB0cnVlO1xuXG4gIC8qKiBSZWplY3QgZmlsZXMgbGFyZ2VyIHRoYW4gdGhpcyAoaW4gTUIpLiAwID0gbm8gbGltaXQuICovXG4gIEBJbnB1dCgpIG1heFNpemVNYiA9IDA7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKiogQ3VzdG9tIHByb21wdCB0ZXh0LiBEZWZhdWx0cyB0byBcIkRyb3AgZmlsZXMgb3IgY2xpY2sgdG8gYnJvd3NlXCIuICovXG4gIEBJbnB1dCgpIHByb21wdCA9ICdEcm9wIGZpbGVzIG9yIGNsaWNrIHRvIGJyb3dzZSc7XG5cbiAgQE91dHB1dCgpIGZpbGVzUGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlW10+KCk7XG5cbiAgLyoqIEVtaXRzIHdoZW4gZmlsZXMgYXJlIHJlamVjdGVkIChzaXplIGxpbWl0LCB3cm9uZyB0eXBlKS4gKi9cbiAgQE91dHB1dCgpIHJlamVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjx7IGZpbGU6IEZpbGU7IHJlYXNvbjogJ3NpemUnIHwgJ3R5cGUnIH1bXT4oKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdXBsb2FkSWNvbiA9IFVwbG9hZDtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGRyYWdnaW5nID0gc2lnbmFsKGZhbHNlKTtcblxuICBAVmlld0NoaWxkKCdmaWxlSW5wdXQnKSBwcml2YXRlIGZpbGVJbnB1dCE6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD47XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxuICBvbkRyYWdPdmVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKGV2ZW50LmRhdGFUcmFuc2Zlcikge1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG4gICAgfVxuICAgIHRoaXMuZHJhZ2dpbmcuc2V0KHRydWUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSlcbiAgb25EcmFnTGVhdmUoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAvLyBPbmx5IGZsaXAgb2ZmIGlmIGxlYXZpbmcgdGhlIGhvc3QsIG5vdCBhIGNoaWxkIGVsZW1lbnRcbiAgICBpZiAoIShldmVudC5jdXJyZW50VGFyZ2V0IGFzIE5vZGUpLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcuc2V0KGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgb25Ecm9wKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5kcmFnZ2luZy5zZXQoZmFsc2UpO1xuICAgIGNvbnN0IGZpbGVzID0gQXJyYXkuZnJvbShldmVudC5kYXRhVHJhbnNmZXI/LmZpbGVzID8/IFtdKTtcbiAgICB0aGlzLmhhbmRsZShmaWxlcyk7XG4gIH1cblxuICBvcGVuUGlja2VyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XG4gICAgdGhpcy5maWxlSW5wdXQubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICB9XG5cbiAgb25QaWNrZXJDaGFuZ2UoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgaW5wdXQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCBmaWxlcyA9IEFycmF5LmZyb20oaW5wdXQuZmlsZXMgPz8gW10pO1xuICAgIHRoaXMuaGFuZGxlKGZpbGVzKTtcbiAgICBpbnB1dC52YWx1ZSA9ICcnOyAvLyBhbGxvdyByZS1waWNraW5nIHRoZSBzYW1lIGZpbGVcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlKGZpbGVzOiBGaWxlW10pOiB2b2lkIHtcbiAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICBjb25zdCBhY2NlcHRlZDogRmlsZVtdID0gW107XG4gICAgY29uc3QgcmVqZWN0ZWQ6IHsgZmlsZTogRmlsZTsgcmVhc29uOiAnc2l6ZScgfCAndHlwZScgfVtdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgIGlmICh0aGlzLm1heFNpemVNYiA+IDAgJiYgZmlsZS5zaXplID4gdGhpcy5tYXhTaXplTWIgKiAxMDI0ICogMTAyNCkge1xuICAgICAgICByZWplY3RlZC5wdXNoKHsgZmlsZSwgcmVhc29uOiAnc2l6ZScgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYWNjZXB0ICYmICF0aGlzLm1hdGNoZXNBY2NlcHQoZmlsZSkpIHtcbiAgICAgICAgcmVqZWN0ZWQucHVzaCh7IGZpbGUsIHJlYXNvbjogJ3R5cGUnIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGFjY2VwdGVkLnB1c2goZmlsZSk7XG4gICAgfVxuXG4gICAgaWYgKHJlamVjdGVkLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucmVqZWN0ZWQuZW1pdChyZWplY3RlZCk7XG4gICAgfVxuICAgIGlmIChhY2NlcHRlZC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmZpbGVzUGlja2VkLmVtaXQodGhpcy5tdWx0aXBsZSA/IGFjY2VwdGVkIDogW2FjY2VwdGVkWzBdXSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtYXRjaGVzQWNjZXB0KGZpbGU6IEZpbGUpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYWNjZXB0KSByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCBwYXR0ZXJucyA9IHRoaXMuYWNjZXB0LnNwbGl0KCcsJykubWFwKChwKSA9PiBwLnRyaW0oKS50b0xvd2VyQ2FzZSgpKTtcbiAgICBjb25zdCB0eXBlID0gZmlsZS50eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgbmFtZSA9IGZpbGUubmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgcmV0dXJuIHBhdHRlcm5zLnNvbWUoKHApID0+IHtcbiAgICAgIGlmIChwLnN0YXJ0c1dpdGgoJy4nKSkgcmV0dXJuIG5hbWUuZW5kc1dpdGgocCk7XG4gICAgICBpZiAocC5lbmRzV2l0aCgnLyonKSkgcmV0dXJuIHR5cGUuc3RhcnRzV2l0aChwLnNsaWNlKDAsIC0xKSk7XG4gICAgICByZXR1cm4gdHlwZSA9PT0gcDtcbiAgICB9KTtcbiAgfVxufVxuIiwiPGJ1dHRvblxuICB0eXBlPVwiYnV0dG9uXCJcbiAgY2xhc3M9XCJhdGgtZmRyb3BcIlxuICBbY2xhc3MuYXRoLWZkcm9wLS1kcmFnZ2luZ109XCJkcmFnZ2luZygpXCJcbiAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgKGNsaWNrKT1cIm9wZW5QaWNrZXIoKVwiXG4+XG4gIDxzcGFuIGNsYXNzPVwiYXRoLWZkcm9wX19pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgPGx1Y2lkZS1pY29uIFtpbWddPVwidXBsb2FkSWNvblwiIFtzaXplXT1cIjIwXCIgLz5cbiAgPC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cImF0aC1mZHJvcF9fcHJvbXB0XCI+XG4gICAgPG5nLWNvbnRlbnQ+e3sgcHJvbXB0IH19PC9uZy1jb250ZW50PlxuICA8L3NwYW4+XG4gIEBpZiAoYWNjZXB0IHx8IG1heFNpemVNYiA+IDApIHtcbiAgICA8c3BhbiBjbGFzcz1cImF0aC1mZHJvcF9faGludFwiPlxuICAgICAgQGlmIChhY2NlcHQpIHtcbiAgICAgICAgPHNwYW4+e3sgYWNjZXB0IH19PC9zcGFuPlxuICAgICAgfVxuICAgICAgQGlmIChhY2NlcHQgJiYgbWF4U2l6ZU1iID4gMCkge1xuICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj7Ctzwvc3Bhbj5cbiAgICAgIH1cbiAgICAgIEBpZiAobWF4U2l6ZU1iID4gMCkge1xuICAgICAgICA8c3Bhbj5tYXgge3sgbWF4U2l6ZU1iIH19IE1CPC9zcGFuPlxuICAgICAgfVxuICAgIDwvc3Bhbj5cbiAgfVxuPC9idXR0b24+XG48aW5wdXRcbiAgI2ZpbGVJbnB1dFxuICB0eXBlPVwiZmlsZVwiXG4gIGNsYXNzPVwiYXRoLWZkcm9wX19pbnB1dFwiXG4gIFthY2NlcHRdPVwiYWNjZXB0ID8/ICcnXCJcbiAgW211bHRpcGxlXT1cIm11bHRpcGxlXCJcbiAgKGNoYW5nZSk9XCJvblBpY2tlckNoYW5nZSgkZXZlbnQpXCJcbiAgaGlkZGVuXG4vPlxuIl19