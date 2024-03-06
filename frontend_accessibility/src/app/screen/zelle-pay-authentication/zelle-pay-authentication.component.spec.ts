import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZellePayAuthenticationComponent } from './zelle-pay-authentication.component';

describe('ZellePayAuthenticationComponent', () => {
  let component: ZellePayAuthenticationComponent;
  let fixture: ComponentFixture<ZellePayAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZellePayAuthenticationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZellePayAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
