import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  input,
  numberAttribute,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { AthIconComponent } from '../icon/icon.component';
import { Upload } from 'lucide';
import { injectAthLabels } from '../../i18n/labels';

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
@Component({
  selector: 'ath-file-drop',
  imports: [AthIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './file-drop.component.html',
  styleUrl: './file-drop.component.scss',
  host: {
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'onDrop($event)',
  },
})
export class AthFileDropComponent {
  protected readonly labels = injectAthLabels();

  /** Filter for the file picker (e.g., `image/*,.pdf`). */
  readonly accept = input<string | null>(null);

  readonly multiple = input(true, { transform: booleanAttribute });

  /** Reject files larger than this (in MB). 0 = no limit. */
  readonly maxSizeMb = input(0, { transform: numberAttribute });

  readonly disabled = input(false, { transform: booleanAttribute });

  /** Custom prompt text. Defaults to "Drop files or click to browse". */
  readonly prompt = input<string | null>(null);

  readonly filesPicked = output<File[]>();

  /** Emits when files are rejected (size limit, wrong type). */
  readonly rejected = output<{ file: File; reason: 'size' | 'type' }[]>();

  protected readonly uploadIcon = Upload;
  protected readonly dragging = signal(false);

  private readonly fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  onDragOver(event: DragEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
    this.dragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    event.stopPropagation();
    // Only flip off if leaving the host, not a child element
    if (!(event.currentTarget as Node).contains(event.relatedTarget as Node)) {
      this.dragging.set(false);
    }
  }

  onDrop(event: DragEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    event.stopPropagation();
    this.dragging.set(false);
    const files = Array.from(event.dataTransfer?.files ?? []);
    this.handle(files);
  }

  openPicker(): void {
    if (this.disabled()) return;
    this.fileInput().nativeElement.click();
  }

  onPickerChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    this.handle(files);
    input.value = ''; // allow re-picking the same file
  }

  private handle(files: File[]): void {
    if (files.length === 0) return;

    const accepted: File[] = [];
    const rejected: { file: File; reason: 'size' | 'type' }[] = [];

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

  private matchesAccept(file: File): boolean {
    const accept = this.accept();
    if (!accept) return true;
    const patterns = accept.split(',').map((p) => p.trim().toLowerCase());
    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();

    return patterns.some((p) => {
      if (p.startsWith('.')) return name.endsWith(p);
      if (p.endsWith('/*')) return type.startsWith(p.slice(0, -1));
      return type === p;
    });
  }
}
