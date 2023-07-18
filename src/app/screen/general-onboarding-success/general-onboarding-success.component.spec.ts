import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralOnboardingSuccessComponent } from './general-onboarding-success.component';

describe('GeneralOnboardingSuccessComponent', () => {
  let component: GeneralOnboardingSuccessComponent;
  let fixture: ComponentFixture<GeneralOnboardingSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralOnboardingSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralOnboardingSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
