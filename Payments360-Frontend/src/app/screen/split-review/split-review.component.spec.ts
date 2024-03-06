import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitReviewComponent } from './split-review.component';

describe('SplitReviewComponent', () => {
  let component: SplitReviewComponent;
  let fixture: ComponentFixture<SplitReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
