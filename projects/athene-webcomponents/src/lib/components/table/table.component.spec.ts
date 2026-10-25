import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthTableComponent } from './table.component';

@Component({
  imports: [AthTableComponent],
  template: `
    <ath-table [flush]="flush()">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Item</td>
        </tr>
      </tbody>
    </ath-table>
  `,
})
class HostComponent {
  readonly flush = signal(false);
}

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

  it('draws its frame unless flush', () => {
    const frame = () =>
      (fixture.nativeElement as HTMLElement).querySelector('.ath-table') as HTMLElement;
    expect(frame().classList).not.toContain('ath-table--flush');
    fixture.componentInstance.flush.set(true);
    fixture.detectChanges();
    expect(frame().classList).toContain('ath-table--flush');
  });
});
