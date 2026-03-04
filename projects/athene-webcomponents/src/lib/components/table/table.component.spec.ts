import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthTableComponent } from './table.component';

@Component({
  standalone: true,
  imports: [AthTableComponent],
  template: `
    <ath-table>
      <thead>
        <tr><th>Name</th></tr>
      </thead>
      <tbody>
        <tr><td>Item</td></tr>
      </tbody>
    </ath-table>
  `,
})
class HostComponent {}

describe('AthTableComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders projected table content', () => {
    const table = fixture.nativeElement.querySelector('.ath-table__table') as HTMLTableElement;
    expect(table).not.toBeNull();
    expect(table.textContent).toContain('Name');
    expect(table.textContent).toContain('Item');
  });
});
