import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillerConfirmationComponent } from './biller-confirmation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SelectedBillerService } from 'src/app/service/selected-biller.service';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { ButtonComponent } from 'src/app/common/button/button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/service/api.service';
import { of } from 'rxjs';

describe('BillerConfirmationComponent', () => {
  let component: BillerConfirmationComponent;
  let fixture: ComponentFixture<BillerConfirmationComponent>;
  let selectedBillerService: SelectedBillerService;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillerConfirmationComponent, HeaderComponent, ButtonComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [SelectedBillerService, ApiService]
    }).compileComponents();
  });
  
  beforeEach(() => {
    apiService = TestBed.inject(ApiService);
    spyOn(apiService,'getBillerConfirmationHeaderData').and.returnValue(of({
      "congratulations":"Congratulations"
    }));
    spyOn(apiService,'getBillerConfirmationLiteralData').and.returnValue(of({
      "congratulationTxt":"You have finally added all the Bills.",

      "finish":"Finish Add Bills"
    }));

    fixture = TestBed.createComponent(BillerConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch header data from API and populate the header object', async () =>{
    expect(apiService.getBillerConfirmationHeaderData).toHaveBeenCalled();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.header).toEqual({"congratulations":"Congratulations"});
  });

  it('should fetch the literal data from API and populate the literal object', async () => {
    expect(apiService.getBillerConfirmationLiteralData).toHaveBeenCalled();
    
    const literalData = {
      "congratulationTxt":"You have finally added all the Bills.",

      "finish":"Finish Add Bills"
    };
    
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.literal).toEqual(literalData);
  });

  it('should navigate to the specified route when onSubmit method is called', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');
    const routerLink = 'dashboard';

    component.onSubmit(routerLink);

    expect(routerSpy).toHaveBeenCalledWith([routerLink]);
  });

});
