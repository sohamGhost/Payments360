import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAPaymentComponent } from './make-a-payment.component';

describe('MakeAPaymentComponent', () => {
  let component: MakeAPaymentComponent;
  let fixture: ComponentFixture<MakeAPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeAPaymentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeAPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
