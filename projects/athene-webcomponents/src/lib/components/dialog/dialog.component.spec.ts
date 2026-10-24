import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthPopoverComponent } from '../popover/popover.component';
import { AthPopoverTriggerDirective } from '../popover/popover-trigger.directive';
import { AthDialogComponent } from './dialog.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthDialogComponent, AthPopoverComponent, AthPopoverTriggerDirective],
  template: `
    <button type="button" class="opener" (click)="open.set(true)">Open</button>
    <ath-dialog
      [(open)]="open"
      title="Create item"
      description="Fill in the fields"
      [closeOnBackdrop]="backdrop()"
      [closeOnEscape]="escape()"
      (closed)="closedCount = closedCount + 1"
    >
      <input class="field" aria-label="Name" />
      <button type="button" class="pop-trigger" [athPopoverTrigger]="pop">Pick</button>
      <ath-popover #pop ariaLabel="Picker"
        ><button type="button" class="pop-btn">x</button></ath-popover
      >
      <div slot="footer"><button type="button" class="save">Save</button></div>
    </ath-dialog>
  `,
})
class DialogHostComponent {
  readonly open = signal(false);
  readonly backdrop = signal(true);
  readonly escape = signal(true);
  closedCount = 0;
}

const wait = (): Promise<void> => new Promise((r) => setTimeout(r));

describe('AthDialogComponent', () => {
  let fixture: ComponentFixture<DialogHostComponent>;
  let host: DialogHostComponent;
  let root: HTMLElement;
  const q = <T extends HTMLElement = HTMLElement>(sel: string): T | null =>
    root.querySelector<T>(sel);
  const dialog = (): HTMLDialogElement | null => q<HTMLDialogElement>('dialog');

  function openDialog(): HTMLDialogElement {
    const opener = q('.opener')!;
    opener.focus();
    opener.click();
    fixture.detectChanges();
    return dialog()!;
  }

  function cancel(): Event {
    const event = new Event('cancel', { cancelable: true });
    dialog()!.dispatchEvent(event);
    fixture.detectChanges();
    return event;
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHostComponent);
    host = fixture.componentInstance;
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('opens a native modal dialog in the top layer, named and described', () => {
    expect(dialog()).toBeNull();
    const el = openDialog();
    expect(el.open).toBeTrue();
    expect(el.matches(':modal')).toBeTrue();
    expect(document.getElementById(el.getAttribute('aria-labelledby')!)?.textContent).toBe(
      'Create item'
    );
    expect(document.getElementById(el.getAttribute('aria-describedby')!)?.textContent).toBe(
      'Fill in the fields'
    );
    expect(q('.ath-dialog__footer .save')).not.toBeNull();
  });

  it('focuses the first control of the body and returns focus on close', () => {
    openDialog();
    expect(document.activeElement).toBe(q('.field'));
    host.open.set(false);
    fixture.detectChanges();
    expect(dialog()).toBeNull();
    expect(document.activeElement).toBe(q('.opener'));
  });

  it('requests closing with the close button; [(open)] follows', () => {
    openDialog();
    q('.ath-dialog__close')!.click();
    fixture.detectChanges();
    expect(host.closedCount).toBe(1);
    expect(host.open()).toBeFalse();
    expect(dialog()).toBeNull();
  });

  it('closes on Escape (cancel) only when closeOnEscape', () => {
    host.escape.set(false);
    fixture.detectChanges();
    openDialog();
    const ev = cancel();
    expect(ev.defaultPrevented).toBeTrue();
    expect(host.closedCount).toBe(0);
    expect(dialog()).not.toBeNull();

    host.escape.set(true);
    fixture.detectChanges();
    cancel();
    expect(host.closedCount).toBe(1);
    expect(dialog()).toBeNull();
  });

  it('closes on a backdrop click only when closeOnBackdrop', () => {
    const el = openDialog();
    const r = el.getBoundingClientRect();
    const outside = { bubbles: true, clientX: r.left - 5, clientY: r.top - 5 };
    const inside = { bubbles: true, clientX: r.left + 5, clientY: r.top + 5 };

    el.dispatchEvent(new PointerEvent('pointerdown', inside));
    el.dispatchEvent(new MouseEvent('click', inside));
    fixture.detectChanges();
    expect(host.closedCount).toBe(0);

    host.backdrop.set(false);
    fixture.detectChanges();
    el.dispatchEvent(new PointerEvent('pointerdown', outside));
    el.dispatchEvent(new MouseEvent('click', outside));
    fixture.detectChanges();
    expect(host.closedCount).toBe(0);

    host.backdrop.set(true);
    fixture.detectChanges();
    el.dispatchEvent(new PointerEvent('pointerdown', outside));
    el.dispatchEvent(new MouseEvent('click', outside));
    fixture.detectChanges();
    expect(host.closedCount).toBe(1);
  });

  it('keeps Tab inside', () => {
    openDialog();
    const save = q('.save')!;
    save.focus();
    const tab = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    save.dispatchEvent(tab);
    expect(tab.defaultPrevented).toBeTrue();
    // Wraps to the first control of the dialog (the header's close button).
    expect(document.activeElement).toBe(q('.ath-dialog__close'));
  });

  it('locks page scrolling while open', () => {
    openDialog();
    expect(document.documentElement.style.overflow).toBe('hidden');
    host.open.set(false);
    fixture.detectChanges();
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('raises [data-ath-top-layer] elements (toasts) above the opened dialog', () => {
    const toasts = document.createElement('div');
    toasts.setAttribute('data-ath-top-layer', '');
    document.body.appendChild(toasts);
    try {
      openDialog();
      if ('showPopover' in HTMLElement.prototype) {
        expect(toasts.matches(':popover-open')).toBeTrue();
      }
    } finally {
      toasts.remove();
    }
  });

  it('lets Escape close a popover inside it first', async () => {
    openDialog();
    q('.pop-trigger')!.click();
    fixture.detectChanges();
    await wait();
    fixture.detectChanges();
    expect(q('.pop-btn')).not.toBeNull();

    // The browser fires keydown, then the dialog's cancel for the same press.
    q('.pop-btn')!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
    );
    fixture.detectChanges();
    cancel();
    expect(q('.pop-btn')).toBeNull();
    expect(host.closedCount).toBe(0);
    expect(dialog()).not.toBeNull();

    await wait();
    cancel();
    expect(host.closedCount).toBe(1);
  });
});
