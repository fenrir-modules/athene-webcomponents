import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
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
export declare class AthFileDropComponent {
    /** Filter for the file picker (e.g., `image/*,.pdf`). */
    accept: string | null;
    multiple: boolean;
    /** Reject files larger than this (in MB). 0 = no limit. */
    maxSizeMb: number;
    disabled: boolean;
    /** Custom prompt text. Defaults to "Drop files or click to browse". */
    prompt: string;
    filesPicked: EventEmitter<File[]>;
    /** Emits when files are rejected (size limit, wrong type). */
    rejected: EventEmitter<{
        file: File;
        reason: "size" | "type";
    }[]>;
    protected readonly uploadIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly dragging: import("@angular/core").WritableSignal<boolean>;
    private fileInput;
    onDragOver(event: DragEvent): void;
    onDragLeave(event: DragEvent): void;
    onDrop(event: DragEvent): void;
    openPicker(): void;
    onPickerChange(event: Event): void;
    private handle;
    private matchesAccept;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthFileDropComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthFileDropComponent, "ath-file-drop", never, { "accept": { "alias": "accept"; "required": false; }; "multiple": { "alias": "multiple"; "required": false; }; "maxSizeMb": { "alias": "maxSizeMb"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "prompt": { "alias": "prompt"; "required": false; }; }, { "filesPicked": "filesPicked"; "rejected": "rejected"; }, never, ["*"], true, never>;
}
