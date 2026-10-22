import { TestBed } from '@angular/core/testing';
import { AthToastContainerComponent, AthToastService } from './toast.component';

describe('AthToastService', () => {
  let service: AthToastService;

  beforeEach(() => {
    jasmine.clock().install();
    service = TestBed.inject(AthToastService);
  });

  afterEach(() => jasmine.clock().uninstall());

  it('keeps the old (message, duration) signature', () => {
    service.success('Saved', 1000);
    expect(service.toasts()[0].duration).toBe(1000);
    jasmine.clock().tick(1001);
    expect(service.toasts().length).toBe(0);
  });

  it('gives a toast with an action at least 8s by default', () => {
    service.success('ATH-9 created', { action: { label: 'Open', run: () => undefined } });
    expect(service.toasts()[0].duration).toBe(8000);
  });

  it('runs the action and closes the toast', () => {
    const run = jasmine.createSpy('run');
    service.info('ATH-9 created', { duration: 0, action: { label: 'Open', run } });
    service.runAction(service.toasts()[0].id);
    expect(run).toHaveBeenCalled();
    expect(service.toasts().length).toBe(0);
  });
});

describe('AthToastContainerComponent', () => {
  it('renders the action as a keyboard-reachable button', () => {
    const fixture = TestBed.createComponent(AthToastContainerComponent);
    const service = TestBed.inject(AthToastService);
    const run = jasmine.createSpy('run');
    service.success('ATH-9 created', { duration: 0, action: { label: 'Open', run } });
    fixture.detectChanges();
    const button = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '.ath-toast__action'
    );
    expect(button?.tagName).toBe('BUTTON');
    expect(button?.textContent?.trim()).toBe('Open');
    button?.click();
    expect(run).toHaveBeenCalled();
    expect(service.toasts().length).toBe(0);
  });
});
