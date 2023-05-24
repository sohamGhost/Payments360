import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountToPayComponent } from './amount-to-pay.component';

describe('AmountToPayComponent', () => {
  let component: AmountToPayComponent;
  let fixture: ComponentFixture<AmountToPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountToPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmountToPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
