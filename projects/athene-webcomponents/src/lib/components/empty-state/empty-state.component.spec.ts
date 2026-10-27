import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Inbox } from 'lucide';
import { AthEmptyStateComponent } from './empty-state.component';

describe('AthEmptyStateComponent', () => {
  let fixture: ComponentFixture<AthEmptyStateComponent>;
  const el = () => fixture.nativeElement as HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AthEmptyStateComponent] }).compileComponents();
    fixture = TestBed.createComponent(AthEmptyStateComponent);
    fixture.componentRef.setInput('message', 'Nothing here');
  });

  it('keeps the default centred layout', () => {
    fixture.detectChanges();
    expect(el().querySelector('.ath-empty-state--compact')).toBeNull();
    expect(el().querySelector('.ath-empty-state__message')?.textContent).toContain('Nothing here');
  });

  it('renders the compact layout with tile, hints and actions', () => {
    fixture.componentRef.setInput('size', 'compact');
    fixture.componentRef.setInput('icon', Inbox);
    fixture.componentRef.setInput('hints', [
      { label: 'Mentions', sub: 'When someone mentions you' },
      { label: 'Assignments' },
    ]);
    fixture.componentRef.setInput('actionLabel', 'Open');
    fixture.componentRef.setInput('secondaryActionLabel', 'Later');
    fixture.detectChanges();
    expect(el().querySelector('.ath-empty-state--compact')).not.toBeNull();
    expect(el().querySelector('.ath-empty-state__tile')).not.toBeNull();
    expect(el().querySelectorAll('.ath-empty-state__hint').length).toBe(2);
    let primary = 0;
    let secondary = 0;
    fixture.componentInstance.action.subscribe(() => primary++);
    fixture.componentInstance.secondaryAction.subscribe(() => secondary++);
    const buttons = el().querySelectorAll<HTMLButtonElement>('.ath-empty-state__actions button');
    buttons[0].click();
    buttons[1].click();
    expect([secondary, primary]).toEqual([1, 1]);
  });

  it('accepts a bare attribute and a lucide icon without casts', () => {
    fixture.componentRef.setInput('bare', '');
    fixture.componentRef.setInput('icon', Inbox);
    fixture.detectChanges();
    expect(fixture.componentInstance.bare()).toBe(true);
    expect(el().querySelector('.ath-empty-state--bare')).not.toBeNull();
  });
});
