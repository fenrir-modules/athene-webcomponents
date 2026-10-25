import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ATH_LABELS } from '../../i18n/labels';
import { AthSearchInputComponent } from './search-input.component';

describe('AthSearchInputComponent', () => {
  let fixture: ComponentFixture<AthSearchInputComponent>;
  let seen: string[];
  const field = () => (fixture.nativeElement as HTMLElement).querySelector('input')!;
  const type = (value: string) => {
    field().value = value;
    field().dispatchEvent(new Event('input'));
  };

  beforeEach(() => {
    jasmine.clock().install();
    fixture = TestBed.createComponent(AthSearchInputComponent);
    seen = [];
    fixture.componentInstance.searched.subscribe((v) => seen.push(v));
  });

  afterEach(() => jasmine.clock().uninstall());

  it('debounces with the bound [debounce], not the default (FE-09)', () => {
    fixture.componentRef.setInput('debounce', 50);
    fixture.detectChanges();
    type('ath');
    jasmine.clock().tick(49);
    expect(seen).toEqual([]);
    jasmine.clock().tick(1);
    expect(seen).toEqual(['ath']);
  });

  it('emits once per settled value and clears with the ✕', () => {
    fixture.detectChanges();
    type('a');
    type('ab');
    jasmine.clock().tick(300);
    expect(seen).toEqual(['ab']);
    fixture.detectChanges();
    const clear = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '.ath-search-input__clear'
    )!;
    clear.click();
    fixture.detectChanges();
    jasmine.clock().tick(300);
    expect(seen).toEqual(['ab', '']);
    expect(field().value).toBe('');
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('.ath-search-input__clear')
    ).toBeNull();
  });

  it('takes its placeholder from ATH_LABELS when none is given (UX-031)', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: ATH_LABELS, useValue: { searchPlaceholder: () => 'Suchen…' } }],
    });
    const f = TestBed.createComponent(AthSearchInputComponent);
    f.detectChanges();
    const input = (f.nativeElement as HTMLElement).querySelector('input')!;
    expect(input.placeholder).toBe('Suchen…');
  });
});
