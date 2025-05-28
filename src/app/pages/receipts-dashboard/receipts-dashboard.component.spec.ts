import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsDashboardComponent } from './receipts-dashboard.component';

describe('ReceiptsDashboardComponent', () => {
  let component: ReceiptsDashboardComponent;
  let fixture: ComponentFixture<ReceiptsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
