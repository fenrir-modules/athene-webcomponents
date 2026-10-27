import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { supportsTopLayer, type FloatingVirtualAnchor } from '../floating/floating';
import { AthPopoverComponent, AthPopoverContentDirective } from './popover.component';
import { AthPopoverTriggerDirective } from './popover-trigger.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthPopoverComponent, AthPopoverTriggerDirective, AthPopoverContentDirective],
  template: `
    <div style="overflow:hidden;height:40px;position:relative">
      <button type="button" class="trigger" [athPopoverTrigger]="pop">Open</button>
      <ath-popover #pop ariaLabel="Details" [trapFocus]="trap()" arrow (closed)="reason = $event">
        <button type="button" class="first">First</button>
        <button type="button" class="nested-trigger" [athPopoverTrigger]="inner">More</button>
        <ath-popover #inner ariaLabel="More">
          <ng-template athPopoverContent>
            <button type="button" class="inner-btn">Inner</button>
          </ng-template>
        </ath-popover>
        <button type="button" class="last">Last</button>
      </ath-popover>
    </div>
    <button type="button" class="outside">Outside</button>
  `,
})
class PopoverHostComponent {
  readonly trap = signal(false);
  reason: string | null = null;
  readonly pop = viewChild.required<AthPopoverComponent>('pop');
  readonly inner = viewChild.required<AthPopoverComponent>('inner');
}

const wait = (ms = 0): Promise<void> => new Promise((r) => setTimeout(r, ms));

describe('AthPopoverComponent', () => {
  let fixture: ComponentFixture<PopoverHostComponent>;
  let root: HTMLElement;
  const q = <T extends HTMLElement = HTMLElement>(sel: string): T | null =>
    root.querySelector<T>(sel);

  async function open(): Promise<HTMLElement> {
    const trigger = q('.trigger')!;
    trigger.focus();
    trigger.click();
    fixture.detectChanges();
    await wait();
    fixture.detectChanges();
    return q('.ath-popover__panel')!;
  }

  function press(
    key: string,
    target: Element = document.activeElement ?? document.body,
    shift = false
  ): KeyboardEvent {
    const event = new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      cancelable: true,
      shiftKey: shift,
    });
    target.dispatchEvent(event);
    fixture.detectChanges();
    return event;
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverHostComponent);
    root = fixture.nativeElement as HTMLElement;
    document.body.appendChild(root);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    root.remove();
  });

  it('opens from its trigger with dialog semantics and moves focus in', async () => {
    const trigger = q('.trigger')!;
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    const panel = await open();
    expect(panel).not.toBeNull();
    expect(panel.getAttribute('role')).toBe('dialog');
    expect(panel.getAttribute('aria-label')).toBe('Details');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('aria-controls')).toBe(panel.id);
    expect(document.activeElement).toBe(q('.first'));
  });

  it('renders in the top layer, so a clipping container does not cut it', async () => {
    const panel = await open();
    if (supportsTopLayer()) expect(panel.matches(':popover-open')).toBe(true);
    expect(panel.classList).toContain('ath-popover__panel--md');
    expect(panel.getBoundingClientRect().width).toBe(280);
    // The [popover] UA defaults (medium border, 0.25em padding, centring) are reset.
    const style = getComputedStyle(panel);
    expect(style.borderTopWidth).toBe('1px');
    expect(style.paddingTop).toBe('12px');
    panel.getAnimations().forEach((a) => a.finish());
    const trigger = q('.trigger')!.getBoundingClientRect();
    expect(Math.round(panel.getBoundingClientRect().top)).toBe(Math.round(trigger.bottom + 6));
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    await open();
    press('Escape');
    expect(q('.ath-popover__panel')).toBeNull();
    expect(fixture.componentInstance.reason).toBe('escape');
    expect(document.activeElement).toBe(q('.trigger'));
  });

  it('closes on an outside pointer-down but not on one inside', async () => {
    await open();
    q('.first')!.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
    fixture.detectChanges();
    expect(q('.ath-popover__panel')).not.toBeNull();

    q('.outside')!.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, composed: true })
    );
    fixture.detectChanges();
    expect(q('.ath-popover__panel')).toBeNull();
    expect(fixture.componentInstance.reason).toBe('outside');
  });

  it('toggles closed from the trigger', async () => {
    await open();
    q('.trigger')!.click();
    fixture.detectChanges();
    expect(q('.ath-popover__panel')).toBeNull();
  });

  it('traps Tab when trapFocus is set', async () => {
    fixture.componentInstance.trap.set(true);
    fixture.detectChanges();
    const panel = await open();
    expect(panel.getAttribute('aria-modal')).toBe('true');
    q('.last')!.focus();
    const tab = press('Tab');
    expect(tab.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(q('.first'));
    press('Tab', q('.first')!, true);
    expect(document.activeElement).toBe(q('.last'));
  });

  it('closes when focus tabs out (no trap) without pulling focus back', async () => {
    await open();
    const outside = q('.outside')!;
    q('.last')!.dispatchEvent(
      new FocusEvent('focusout', { bubbles: true, relatedTarget: outside })
    );
    fixture.detectChanges();
    expect(q('.ath-popover__panel')).toBeNull();
    expect(fixture.componentInstance.reason).toBe('tab');
  });

  it('closes only the topmost of nested popovers on Escape', async () => {
    await open();
    q('.nested-trigger')!.click();
    fixture.detectChanges();
    await wait();
    fixture.detectChanges();
    expect(q('.inner-btn')).not.toBeNull();
    expect(document.activeElement).toBe(q('.inner-btn'));

    press('Escape');
    expect(q('.inner-btn')).toBeNull();
    expect(q('.ath-popover__panel')).not.toBeNull();
    expect(document.activeElement).toBe(q('.nested-trigger'));

    press('Escape');
    expect(q('.ath-popover__panel')).toBeNull();
  });

  it('keeps a nested popover open when clicking inside it', async () => {
    await open();
    q('.nested-trigger')!.click();
    fixture.detectChanges();
    q('.inner-btn')!.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, composed: true })
    );
    fixture.detectChanges();
    expect(q('.inner-btn')).not.toBeNull();
    expect(fixture.componentInstance.pop().open()).toBe(true);
  });

  it('opens and closes programmatically', async () => {
    const pop = fixture.componentInstance.pop();
    pop.show(q('.trigger'));
    fixture.detectChanges();
    await wait();
    expect(q('.ath-popover__panel')).not.toBeNull();
    pop.hide();
    fixture.detectChanges();
    expect(q('.ath-popover__panel')).toBeNull();
    expect(fixture.componentInstance.reason).toBe('programmatic');
  });

  it('renders lazy content only while open', async () => {
    expect(q('.inner-btn')).toBeNull();
    await open();
    expect(q('.inner-btn')).toBeNull();
  });
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthPopoverComponent],
  template: `
    <div
      #row
      class="row"
      tabindex="0"
      style="position:fixed;top:40px;left:10px;width:600px;height:30px"
    >
      row
    </div>
    <ath-popover
      [anchor]="spot"
      [(open)]="open"
      autoFocus="none"
      size="sm"
      ariaLabel="Card"
      (closed)="reason = $event"
    >
      <p class="card">Card</p>
    </ath-popover>
  `,
})
class VirtualAnchorHostComponent {
  readonly open = signal(false);
  reason: string | null = null;
  private readonly row = viewChild.required<ElementRef<HTMLElement>>('row');
  /** The spot the pointer rests on, inside the wide row. */
  readonly spot: FloatingVirtualAnchor = {
    getBoundingClientRect: () => {
      const r = this.row().nativeElement.getBoundingClientRect();
      return new DOMRect(400, r.top, 1, r.height);
    },
    get contextElement() {
      return document.querySelector<HTMLElement>('.row');
    },
  };
}

describe('AthPopoverComponent with a virtual anchor', () => {
  it('hangs at the rectangle and treats its context element as the trigger', async () => {
    const fixture = TestBed.createComponent(VirtualAnchorHostComponent);
    const root = fixture.nativeElement as HTMLElement;
    document.body.appendChild(root);
    fixture.detectChanges();
    fixture.componentInstance.open.set(true);
    fixture.detectChanges();
    await wait();
    const panel = root.querySelector<HTMLElement>('.ath-popover__panel')!;
    // The placed position (the entry animation offsets the box for a moment).
    expect(panel.style.left).toBe('400px');
    expect(panel.style.top).toBe(`${40 + 30 + 6}px`);

    // A press on the row (the context element) is not "outside".
    root.querySelector('.row')!.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open()).toBe(true);

    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.open()).toBe(false);
    expect(fixture.componentInstance.reason).toBe('outside');
    fixture.destroy();
    root.remove();
  });
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthPopoverComponent, AthPopoverTriggerDirective],
  template: `
    <div style="text-align:right;white-space:nowrap;font-weight:700;text-transform:uppercase">
      <button type="button" class="trigger" [athPopoverTrigger]="pop">Open</button>
      <ath-popover #pop ariaLabel="Picker"><p class="inside">Option</p></ath-popover>
    </div>
  `,
})
class InheritingHostComponent {}

describe('AthPopoverComponent inside a styled spot', () => {
  it('does not inherit the text styles of where it sits in the DOM', async () => {
    const fixture = TestBed.createComponent(InheritingHostComponent);
    const root = fixture.nativeElement as HTMLElement;
    document.body.appendChild(root);
    fixture.detectChanges();
    root.querySelector<HTMLElement>('.trigger')!.click();
    fixture.detectChanges();
    await wait();
    const style = getComputedStyle(root.querySelector('.inside')!);
    expect(['start', 'left']).toContain(style.textAlign);
    expect(style.whiteSpace).toBe('normal');
    expect(style.fontWeight).toBe('400');
    expect(style.textTransform).toBe('none');
    fixture.destroy();
    root.remove();
  });
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthPopoverComponent],
  template: `
    <button type="button" class="trigger" (click)="pop.toggle($any($event.currentTarget))">
      Open
    </button>
    <ath-popover #pop ariaLabel="Details"><input class="field" aria-label="Field" /></ath-popover>
  `,
})
class HandCheckedPopoverHostComponent {}

// A view outside ApplicationRef (a fixture without autoDetect, a view checked
// by hand): an app render does not include it. Focus must wait for the
// panel itself, not for "the next render" (VERIFY 4.1, app PersonPicker spec).
describe('AthPopoverComponent in a view checked by hand', () => {
  it('moves focus in when its panel renders, not on an app render without it', async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: false }],
    });
    const fixture = TestBed.createComponent(HandCheckedPopoverHostComponent);
    const root = fixture.nativeElement as HTMLElement;
    document.body.appendChild(root);
    const render = () => fixture.componentRef.changeDetectorRef.detectChanges();
    render();
    const trigger = root.querySelector<HTMLElement>('.trigger')!;
    trigger.focus();
    trigger.click();
    TestBed.inject(ApplicationRef).tick();
    expect(root.querySelector('.ath-popover__panel')).toBeNull();
    render();
    await fixture.whenStable();
    expect(document.activeElement).toBe(root.querySelector('.field'));
    fixture.destroy();
    root.remove();
  });
});
