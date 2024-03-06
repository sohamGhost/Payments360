import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountToPayComponent } from './amount-to-pay.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('AmountToPayComponent', () => {
  //arrange
  let component: AmountToPayComponent;
  let fixture: ComponentFixture<AmountToPayComponent>;

  //act
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountToPayComponent ],
      imports: [HttpClientTestingModule],
      providers: [ActivatedRoute]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountToPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //assert
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
