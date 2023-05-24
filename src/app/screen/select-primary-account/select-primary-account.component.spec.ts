import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPrimaryAccountComponent } from './select-primary-account.component';

describe('SelectPrimaryAccountComponent', () => {
  let component: SelectPrimaryAccountComponent;
  let fixture: ComponentFixture<SelectPrimaryAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPrimaryAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPrimaryAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
