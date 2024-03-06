import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitPaymentConfirmationComponent } from './split-payment-confirmation.component';

describe('SplitPaymentConfirmationComponent', () => {
  let component: SplitPaymentConfirmationComponent;
  let fixture: ComponentFixture<SplitPaymentConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitPaymentConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitPaymentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
