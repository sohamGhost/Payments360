import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountToSplitComponent } from './amount-to-split.component';

describe('AmountToSplitComponent', () => {
  let component: AmountToSplitComponent;
  let fixture: ComponentFixture<AmountToSplitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountToSplitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmountToSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
