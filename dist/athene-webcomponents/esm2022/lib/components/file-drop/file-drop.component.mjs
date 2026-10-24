import { ChangeDetectionStrategy, Component, booleanAttribute, input, numberAttribute, output, signal, viewChild, } from '@angular/core';
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
        this.accept = input(null);
        this.multiple = input(true, { transform: booleanAttribute });
        /** Reject files larger than this (in MB). 0 = no limit. */
        this.maxSizeMb = input(0, { transform: numberAttribute });
        this.disabled = input(false, { transform: booleanAttribute });
        /** Custom prompt text. Defaults to "Drop files or click to browse". */
        this.prompt = input(null);
        this.filesPicked = output();
        /** Emits when files are rejected (size limit, wrong type). */
        this.rejected = output();
        this.uploadIcon = Upload;
        this.dragging = signal(false);
        this.fileInput = viewChild.required('fileInput');
    }
    onDragOver(event) {
        if (this.disabled())
            return;
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'copy';
        }
        this.dragging.set(true);
    }
    onDragLeave(event) {
        if (this.disabled())
            return;
        event.preventDefault();
        event.stopPropagation();
        // Only flip off if leaving the host, not a child element
        if (!event.currentTarget.contains(event.relatedTarget)) {
            this.dragging.set(false);
        }
    }
    onDrop(event) {
        if (this.disabled())
            return;
        event.preventDefault();
        event.stopPropagation();
        this.dragging.set(false);
        const files = Array.from(event.dataTransfer?.files ?? []);
        this.handle(files);
    }
    openPicker() {
        if (this.disabled())
            return;
        this.fileInput().nativeElement.click();
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
        const maxSizeMb = this.maxSizeMb();
        for (const file of files) {
            if (maxSizeMb > 0 && file.size > maxSizeMb * 1024 * 1024) {
                rejected.push({ file, reason: 'size' });
                continue;
            }
            if (this.accept() && !this.matchesAccept(file)) {
                rejected.push({ file, reason: 'type' });
                continue;
            }
            accepted.push(file);
        }
        if (rejected.length > 0) {
            this.rejected.emit(rejected);
        }
        if (accepted.length > 0) {
            this.filesPicked.emit(this.multiple() ? accepted : [accepted[0]]);
        }
    }
    matchesAccept(file) {
        const accept = this.accept();
        if (!accept)
            return true;
        const patterns = accept.split(',').map((p) => p.trim().toLowerCase());
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthFileDropComponent, isStandalone: true, selector: "ath-file-drop", inputs: { accept: { classPropertyName: "accept", publicName: "accept", isSignal: true, isRequired: false, transformFunction: null }, multiple: { classPropertyName: "multiple", publicName: "multiple", isSignal: true, isRequired: false, transformFunction: null }, maxSizeMb: { classPropertyName: "maxSizeMb", publicName: "maxSizeMb", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, prompt: { classPropertyName: "prompt", publicName: "prompt", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { filesPicked: "filesPicked", rejected: "rejected" }, host: { listeners: { "dragover": "onDragOver($event)", "dragleave": "onDragLeave($event)", "drop": "onDrop($event)" } }, viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true, isSignal: true }], ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-fdrop\"\n  [class.ath-fdrop--dragging]=\"dragging()\"\n  [disabled]=\"disabled()\"\n  (click)=\"openPicker()\"\n>\n  <span class=\"ath-fdrop__icon\" aria-hidden=\"true\">\n    <lucide-icon [img]=\"uploadIcon\" [size]=\"20\" />\n  </span>\n  <span class=\"ath-fdrop__prompt\">\n    <ng-content>{{ prompt() ?? labels.fileDropPrompt() }}</ng-content>\n  </span>\n  @if (accept() || maxSizeMb() > 0) {\n    <span class=\"ath-fdrop__hint\">\n      @if (accept()) {\n        <span>{{ accept() }}</span>\n      }\n      @if (accept() && maxSizeMb() > 0) {\n        <span aria-hidden=\"true\">\u00B7</span>\n      }\n      @if (maxSizeMb() > 0) {\n        <span>max {{ maxSizeMb() }} MB</span>\n      }\n    </span>\n  }\n</button>\n<input\n  #fileInput\n  type=\"file\"\n  class=\"ath-fdrop__input\"\n  [accept]=\"accept() ?? ''\"\n  [multiple]=\"multiple()\"\n  (change)=\"onPickerChange($event)\"\n  hidden\n/>\n", styles: [":host{display:block}.ath-fdrop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;min-height:120px;padding:20px 16px;background:var(--bg-1);border:1.5px dashed var(--border-strong);border-radius:var(--r-lg);color:var(--fg-3);cursor:pointer;transition:background var(--t-base),border-color var(--t-base),color var(--t-base)}.ath-fdrop:hover:not(:disabled){background:var(--bg-2);border-color:var(--accent-dim);color:var(--fg-2)}.ath-fdrop--dragging{background:var(--accent-faint);border-color:var(--accent);border-style:solid;color:var(--accent-text)}.ath-fdrop:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fdrop:disabled{opacity:.5;cursor:not-allowed}.ath-fdrop__icon{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:999px;background:var(--bg-2);color:inherit}.ath-fdrop--dragging .ath-fdrop__icon{background:var(--accent-faint);color:var(--accent)}.ath-fdrop__prompt{font-family:var(--font-sans);font-size:13px;font-weight:500;text-align:center}.ath-fdrop__hint{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--fg-4)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFileDropComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-file-drop', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '(dragover)': 'onDragOver($event)',
                        '(dragleave)': 'onDragLeave($event)',
                        '(drop)': 'onDrop($event)',
                    }, template: "<button\n  type=\"button\"\n  class=\"ath-fdrop\"\n  [class.ath-fdrop--dragging]=\"dragging()\"\n  [disabled]=\"disabled()\"\n  (click)=\"openPicker()\"\n>\n  <span class=\"ath-fdrop__icon\" aria-hidden=\"true\">\n    <lucide-icon [img]=\"uploadIcon\" [size]=\"20\" />\n  </span>\n  <span class=\"ath-fdrop__prompt\">\n    <ng-content>{{ prompt() ?? labels.fileDropPrompt() }}</ng-content>\n  </span>\n  @if (accept() || maxSizeMb() > 0) {\n    <span class=\"ath-fdrop__hint\">\n      @if (accept()) {\n        <span>{{ accept() }}</span>\n      }\n      @if (accept() && maxSizeMb() > 0) {\n        <span aria-hidden=\"true\">\u00B7</span>\n      }\n      @if (maxSizeMb() > 0) {\n        <span>max {{ maxSizeMb() }} MB</span>\n      }\n    </span>\n  }\n</button>\n<input\n  #fileInput\n  type=\"file\"\n  class=\"ath-fdrop__input\"\n  [accept]=\"accept() ?? ''\"\n  [multiple]=\"multiple()\"\n  (change)=\"onPickerChange($event)\"\n  hidden\n/>\n", styles: [":host{display:block}.ath-fdrop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;min-height:120px;padding:20px 16px;background:var(--bg-1);border:1.5px dashed var(--border-strong);border-radius:var(--r-lg);color:var(--fg-3);cursor:pointer;transition:background var(--t-base),border-color var(--t-base),color var(--t-base)}.ath-fdrop:hover:not(:disabled){background:var(--bg-2);border-color:var(--accent-dim);color:var(--fg-2)}.ath-fdrop--dragging{background:var(--accent-faint);border-color:var(--accent);border-style:solid;color:var(--accent-text)}.ath-fdrop:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fdrop:disabled{opacity:.5;cursor:not-allowed}.ath-fdrop__icon{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:999px;background:var(--bg-2);color:inherit}.ath-fdrop--dragging .ath-fdrop__icon{background:var(--accent-faint);color:var(--accent)}.ath-fdrop__prompt{font-family:var(--font-sans);font-size:13px;font-weight:500;text-align:center}.ath-fdrop__hint{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--fg-4)}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kcm9wLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9maWxlLWRyb3AvZmlsZS1kcm9wLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9maWxlLWRyb3AvZmlsZS1kcm9wLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULGdCQUFnQixFQUNoQixLQUFLLEVBQ0wsZUFBZSxFQUNmLE1BQU0sRUFDTixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7QUFFcEQ7Ozs7Ozs7Ozs7OztHQVlHO0FBY0gsTUFBTSxPQUFPLG9CQUFvQjtJQWJqQztRQWNxQixXQUFNLEdBQUcsZUFBZSxFQUFFLENBQUM7UUFFOUMseURBQXlEO1FBQ2hELFdBQU0sR0FBRyxLQUFLLENBQWdCLElBQUksQ0FBQyxDQUFDO1FBRXBDLGFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUVqRSwyREFBMkQ7UUFDbEQsY0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztRQUVyRCxhQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMs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QUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFckMsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDekIsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFBRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7K0dBMUdVLG9CQUFvQjttR0FBcEIsb0JBQW9CLGlnQ0N6Q2pDLHU3QkFvQ0EscXVDRExZLFlBQVksOEJBQUUsbUJBQW1COzs0RkFVaEMsb0JBQW9CO2tCQWJoQyxTQUFTOytCQUNFLGVBQWUsY0FDYixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUMsbUJBQzNCLHVCQUF1QixDQUFDLE1BQU0sUUFHekM7d0JBQ0osWUFBWSxFQUFFLG9CQUFvQjt3QkFDbEMsYUFBYSxFQUFFLHFCQUFxQjt3QkFDcEMsUUFBUSxFQUFFLGdCQUFnQjtxQkFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBib29sZWFuQXR0cmlidXRlLFxuICBpbnB1dCxcbiAgbnVtYmVyQXR0cmlidXRlLFxuICBvdXRwdXQsXG4gIHNpZ25hbCxcbiAgdmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBMdWNpZGVBbmd1bGFyTW9kdWxlLCBVcGxvYWQgfSBmcm9tICdsdWNpZGUtYW5ndWxhcic7XG5pbXBvcnQgeyBpbmplY3RBdGhMYWJlbHMgfSBmcm9tICcuLi8uLi9pMThuL2xhYmVscyc7XG5cbi8qKlxuICogRHJhZy1hbmQtZHJvcCBmaWxlIHVwbG9hZCB6b25lIHdpdGggY2xpY2stdG8tYnJvd3NlIGZhbGxiYWNrLlxuICpcbiAqIEVtaXRzIHJhdyBgRmlsZVtdYCDigJQgYWN0dWFsIHVwbG9hZGluZyBpcyB0aGUgY2FsbGVyJ3Mgam9iICh0eXBpY2FsbHlcbiAqIHJvdXRlZCB2aWEgYGZpbGUtc2VydmljZWApLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLWZpbGUtZHJvcCBhY2NlcHQ9XCJpbWFnZS8qLC5wZGZcIiAoZmlsZXNQaWNrZWQpPVwidXBsb2FkKCRldmVudClcIiAvPlxuICogPGF0aC1maWxlLWRyb3AgW211bHRpcGxlXT1cImZhbHNlXCIgW21heFNpemVNYl09XCIyMFwiIChyZWplY3RlZCk9XCJzaG93RXJyb3IoJGV2ZW50KVwiXG4gKiAgICAgICAgICAgICAgICAoZmlsZXNQaWNrZWQpPVwib25QaWNrKCRldmVudClcIj5cbiAqICAgRHJvcCB5b3VyIGF2YXRhciBoZXJlXG4gKiA8L2F0aC1maWxlLWRyb3A+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1maWxlLWRyb3AnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBMdWNpZGVBbmd1bGFyTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWxlLWRyb3AuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vZmlsZS1kcm9wLmNvbXBvbmVudC5zY3NzJyxcbiAgaG9zdDoge1xuICAgICcoZHJhZ292ZXIpJzogJ29uRHJhZ092ZXIoJGV2ZW50KScsXG4gICAgJyhkcmFnbGVhdmUpJzogJ29uRHJhZ0xlYXZlKCRldmVudCknLFxuICAgICcoZHJvcCknOiAnb25Ecm9wKCRldmVudCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBBdGhGaWxlRHJvcENvbXBvbmVudCB7XG4gIHByb3RlY3RlZCByZWFkb25seSBsYWJlbHMgPSBpbmplY3RBdGhMYWJlbHMoKTtcblxuICAvKiogRmlsdGVyIGZvciB0aGUgZmlsZSBwaWNrZXIgKGUuZy4sIGBpbWFnZS8qLC5wZGZgKS4gKi9cbiAgcmVhZG9ubHkgYWNjZXB0ID0gaW5wdXQ8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgcmVhZG9ubHkgbXVsdGlwbGUgPSBpbnB1dCh0cnVlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcblxuICAvKiogUmVqZWN0IGZpbGVzIGxhcmdlciB0aGFuIHRoaXMgKGluIE1CKS4gMCA9IG5vIGxpbWl0LiAqL1xuICByZWFkb25seSBtYXhTaXplTWIgPSBpbnB1dCgwLCB7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pO1xuXG4gIHJlYWRvbmx5IGRpc2FibGVkID0gaW5wdXQoZmFsc2UsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuXG4gIC8qKiBDdXN0b20gcHJvbXB0IHRleHQuIERlZmF1bHRzIHRvIFwiRHJvcCBmaWxlcyBvciBjbGljayB0byBicm93c2VcIi4gKi9cbiAgcmVhZG9ubHkgcHJvbXB0ID0gaW5wdXQ8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgcmVhZG9ubHkgZmlsZXNQaWNrZWQgPSBvdXRwdXQ8RmlsZVtdPigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIGZpbGVzIGFyZSByZWplY3RlZCAoc2l6ZSBsaW1pdCwgd3JvbmcgdHlwZSkuICovXG4gIHJlYWRvbmx5IHJlamVjdGVkID0gb3V0cHV0PHsgZmlsZTogRmlsZTsgcmVhc29uOiAnc2l6ZScgfCAndHlwZScgfVtdPigpO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSB1cGxvYWRJY29uID0gVXBsb2FkO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZHJhZ2dpbmcgPSBzaWduYWwoZmFsc2UpO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZmlsZUlucHV0ID0gdmlld0NoaWxkLnJlcXVpcmVkPEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4+KCdmaWxlSW5wdXQnKTtcblxuICBvbkRyYWdPdmVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCgpKSByZXR1cm47XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyKSB7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgICB9XG4gICAgdGhpcy5kcmFnZ2luZy5zZXQodHJ1ZSk7XG4gIH1cblxuICBvbkRyYWdMZWF2ZShldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQoKSkgcmV0dXJuO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgLy8gT25seSBmbGlwIG9mZiBpZiBsZWF2aW5nIHRoZSBob3N0LCBub3QgYSBjaGlsZCBlbGVtZW50XG4gICAgaWYgKCEoZXZlbnQuY3VycmVudFRhcmdldCBhcyBOb2RlKS5jb250YWlucyhldmVudC5yZWxhdGVkVGFyZ2V0IGFzIE5vZGUpKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nLnNldChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgb25Ecm9wKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCgpKSByZXR1cm47XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmRyYWdnaW5nLnNldChmYWxzZSk7XG4gICAgY29uc3QgZmlsZXMgPSBBcnJheS5mcm9tKGV2ZW50LmRhdGFUcmFuc2Zlcj8uZmlsZXMgPz8gW10pO1xuICAgIHRoaXMuaGFuZGxlKGZpbGVzKTtcbiAgfVxuXG4gIG9wZW5QaWNrZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQoKSkgcmV0dXJuO1xuICAgIHRoaXMuZmlsZUlucHV0KCkubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICB9XG5cbiAgb25QaWNrZXJDaGFuZ2UoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgaW5wdXQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCBmaWxlcyA9IEFycmF5LmZyb20oaW5wdXQuZmlsZXMgPz8gW10pO1xuICAgIHRoaXMuaGFuZGxlKGZpbGVzKTtcbiAgICBpbnB1dC52YWx1ZSA9ICcnOyAvLyBhbGxvdyByZS1waWNraW5nIHRoZSBzYW1lIGZpbGVcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlKGZpbGVzOiBGaWxlW10pOiB2b2lkIHtcbiAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICBjb25zdCBhY2NlcHRlZDogRmlsZVtdID0gW107XG4gICAgY29uc3QgcmVqZWN0ZWQ6IHsgZmlsZTogRmlsZTsgcmVhc29uOiAnc2l6ZScgfCAndHlwZScgfVtdID0gW107XG5cbiAgICBjb25zdCBtYXhTaXplTWIgPSB0aGlzLm1heFNpemVNYigpO1xuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgaWYgKG1heFNpemVNYiA+IDAgJiYgZmlsZS5zaXplID4gbWF4U2l6ZU1iICogMTAyNCAqIDEwMjQpIHtcbiAgICAgICAgcmVqZWN0ZWQucHVzaCh7IGZpbGUsIHJlYXNvbjogJ3NpemUnIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmFjY2VwdCgpICYmICF0aGlzLm1hdGNoZXNBY2NlcHQoZmlsZSkpIHtcbiAgICAgICAgcmVqZWN0ZWQucHVzaCh7IGZpbGUsIHJlYXNvbjogJ3R5cGUnIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGFjY2VwdGVkLnB1c2goZmlsZSk7XG4gICAgfVxuXG4gICAgaWYgKHJlamVjdGVkLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucmVqZWN0ZWQuZW1pdChyZWplY3RlZCk7XG4gICAgfVxuICAgIGlmIChhY2NlcHRlZC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmZpbGVzUGlja2VkLmVtaXQodGhpcy5tdWx0aXBsZSgpID8gYWNjZXB0ZWQgOiBbYWNjZXB0ZWRbMF1dKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1hdGNoZXNBY2NlcHQoZmlsZTogRmlsZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGFjY2VwdCA9IHRoaXMuYWNjZXB0KCk7XG4gICAgaWYgKCFhY2NlcHQpIHJldHVybiB0cnVlO1xuICAgIGNvbnN0IHBhdHRlcm5zID0gYWNjZXB0LnNwbGl0KCcsJykubWFwKChwKSA9PiBwLnRyaW0oKS50b0xvd2VyQ2FzZSgpKTtcbiAgICBjb25zdCB0eXBlID0gZmlsZS50eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgbmFtZSA9IGZpbGUubmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgcmV0dXJuIHBhdHRlcm5zLnNvbWUoKHApID0+IHtcbiAgICAgIGlmIChwLnN0YXJ0c1dpdGgoJy4nKSkgcmV0dXJuIG5hbWUuZW5kc1dpdGgocCk7XG4gICAgICBpZiAocC5lbmRzV2l0aCgnLyonKSkgcmV0dXJuIHR5cGUuc3RhcnRzV2l0aChwLnNsaWNlKDAsIC0xKSk7XG4gICAgICByZXR1cm4gdHlwZSA9PT0gcDtcbiAgICB9KTtcbiAgfVxufVxuIiwiPGJ1dHRvblxuICB0eXBlPVwiYnV0dG9uXCJcbiAgY2xhc3M9XCJhdGgtZmRyb3BcIlxuICBbY2xhc3MuYXRoLWZkcm9wLS1kcmFnZ2luZ109XCJkcmFnZ2luZygpXCJcbiAgW2Rpc2FibGVkXT1cImRpc2FibGVkKClcIlxuICAoY2xpY2spPVwib3BlblBpY2tlcigpXCJcbj5cbiAgPHNwYW4gY2xhc3M9XCJhdGgtZmRyb3BfX2ljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICA8bHVjaWRlLWljb24gW2ltZ109XCJ1cGxvYWRJY29uXCIgW3NpemVdPVwiMjBcIiAvPlxuICA8L3NwYW4+XG4gIDxzcGFuIGNsYXNzPVwiYXRoLWZkcm9wX19wcm9tcHRcIj5cbiAgICA8bmctY29udGVudD57eyBwcm9tcHQoKSA/PyBsYWJlbHMuZmlsZURyb3BQcm9tcHQoKSB9fTwvbmctY29udGVudD5cbiAgPC9zcGFuPlxuICBAaWYgKGFjY2VwdCgpIHx8IG1heFNpemVNYigpID4gMCkge1xuICAgIDxzcGFuIGNsYXNzPVwiYXRoLWZkcm9wX19oaW50XCI+XG4gICAgICBAaWYgKGFjY2VwdCgpKSB7XG4gICAgICAgIDxzcGFuPnt7IGFjY2VwdCgpIH19PC9zcGFuPlxuICAgICAgfVxuICAgICAgQGlmIChhY2NlcHQoKSAmJiBtYXhTaXplTWIoKSA+IDApIHtcbiAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+wrc8L3NwYW4+XG4gICAgICB9XG4gICAgICBAaWYgKG1heFNpemVNYigpID4gMCkge1xuICAgICAgICA8c3Bhbj5tYXgge3sgbWF4U2l6ZU1iKCkgfX0gTUI8L3NwYW4+XG4gICAgICB9XG4gICAgPC9zcGFuPlxuICB9XG48L2J1dHRvbj5cbjxpbnB1dFxuICAjZmlsZUlucHV0XG4gIHR5cGU9XCJmaWxlXCJcbiAgY2xhc3M9XCJhdGgtZmRyb3BfX2lucHV0XCJcbiAgW2FjY2VwdF09XCJhY2NlcHQoKSA/PyAnJ1wiXG4gIFttdWx0aXBsZV09XCJtdWx0aXBsZSgpXCJcbiAgKGNoYW5nZSk9XCJvblBpY2tlckNoYW5nZSgkZXZlbnQpXCJcbiAgaGlkZGVuXG4vPlxuIl19