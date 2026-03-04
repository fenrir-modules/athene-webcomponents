import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthDropdownComponent, DropdownItem } from './dropdown.component';

describe('AthDropdownComponent', () => {
  let fixture: ComponentFixture<AthDropdownComponent>;
  let component: AthDropdownComponent;

  const items: DropdownItem[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'logout', label: 'Logout', variant: 'danger' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AthDropdownComponent);
    component = fixture.componentInstance;
    component.items = items;
    fixture.detectChanges();
  });

  it('opens and closes when toggled', () => {
    const trigger = fixture.nativeElement.querySelector('.ath-dropdown__trigger') as HTMLElement;
    trigger.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ath-dropdown__menu')).not.toBeNull();

    trigger.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ath-dropdown__menu')).toBeNull();
  });

  it('emits clicked item id', () => {
    const clicked = jasmine.createSpy('clicked');
    component.itemClicked.subscribe(clicked);

    const trigger = fixture.nativeElement.querySelector('.ath-dropdown__trigger') as HTMLElement;
    trigger.click();
    fixture.detectChanges();

    const firstItem = fixture.nativeElement.querySelector('.ath-dropdown__item') as HTMLButtonElement;
    firstItem.click();
    expect(clicked).toHaveBeenCalledWith('profile');
  });

  it('supports keyboard toggle from trigger', () => {
    const trigger = fixture.nativeElement.querySelector('.ath-dropdown__trigger') as HTMLElement;
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ath-dropdown__menu')).not.toBeNull();
  });
});
