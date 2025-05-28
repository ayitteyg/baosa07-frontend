import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentListComponent } from './payment-list.component';

describe('PaymentsListComponent', () => {
  let component: PaymentListComponent;
  let fixture: ComponentFixture<PaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
