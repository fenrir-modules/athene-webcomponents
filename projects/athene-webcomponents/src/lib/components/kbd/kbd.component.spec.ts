import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AthKbdComponent } from './kbd.component';

@Component({
  standalone: true,
  imports: [AthKbdComponent],
  template: `<ath-kbd class="a" label="⌘K" size="sm" /><ath-kbd class="b">Esc</ath-kbd>`,
})
class HostComponent {}

describe('AthKbdComponent', () => {
  it('renders keys from either the label input or projected content', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.a kbd')?.textContent?.trim()).toBe('⌘K');
    expect(el.querySelector('.b kbd')?.textContent?.trim()).toBe('Esc');
  });
});
