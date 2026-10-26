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
    protected readonly labels: import("dist/athene-webcomponents/core/labels").AthLabels;
    /** Filter for the file picker (e.g., `image/*,.pdf`). */
    readonly accept: import("@angular/core").InputSignal<string | null>;
    readonly multiple: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Reject files larger than this (in MB). 0 = no limit. */
    readonly maxSizeMb: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Custom prompt text. Defaults to "Drop files or click to browse". */
    readonly prompt: import("@angular/core").InputSignal<string | null>;
    readonly filesPicked: import("@angular/core").OutputEmitterRef<File[]>;
    /** Emits when files are rejected (size limit, wrong type). */
    readonly rejected: import("@angular/core").OutputEmitterRef<{
        file: File;
        reason: "size" | "type";
    }[]>;
    protected readonly uploadIcon: import("lucide").IconNode;
    protected readonly dragging: import("@angular/core").WritableSignal<boolean>;
    private readonly fileInput;
    onDragOver(event: DragEvent): void;
    onDragLeave(event: DragEvent): void;
    onDrop(event: DragEvent): void;
    openPicker(): void;
    onPickerChange(event: Event): void;
    private handle;
    private matchesAccept;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthFileDropComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthFileDropComponent, "ath-file-drop", never, { "accept": { "alias": "accept"; "required": false; "isSignal": true; }; "multiple": { "alias": "multiple"; "required": false; "isSignal": true; }; "maxSizeMb": { "alias": "maxSizeMb"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "prompt": { "alias": "prompt"; "required": false; "isSignal": true; }; }, { "filesPicked": "filesPicked"; "rejected": "rejected"; }, never, ["*"], true, never>;
}
