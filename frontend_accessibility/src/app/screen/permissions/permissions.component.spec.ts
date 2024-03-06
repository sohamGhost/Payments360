import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';

import { PermissionsComponent } from './permissions.component';

describe('PermissionsComponent', () => {
  let component: PermissionsComponent;
  let fixture: ComponentFixture<PermissionsComponent>;
  let apiService: ApiService;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermissionsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ApiService, DataService],
    })
      .compileComponents();
  });


  beforeEach(() => {
    apiService = TestBed.inject(ApiService);
    spyOn(apiService, 'getPermissionsHeaderData').and.returnValue(of({ "screen1": "Your Permission, please" }));
    spyOn(apiService, 'getPermissionsLiteralData').and.returnValue(of({
      "title": "Payment 360 Terms of Service",
      "general": "GENERALS TERMS FOR EACH SERVICE ",
      "btncancel": "Cancel",
      "btnContinue": "continue",
      "passage1": " 1.Introduction. This Terms of service document(here in after Agreement) is a contract between you and [Please insert the variable for the name of the FI] (hereinafter we or us) in connection with each service that is described in the rest of this agreement thap applies services you use from us, as applicable (each, a Services)offered through our online banking site or mobile applications(the site).The agreement consists of these General Terms for each service referred to as General Terms), and each set of terms that follows after the general terms that applies to the specefic service tou are using from us.This agreement applies to your use of service and the portion of the site through which the service os offered.",
      "passage2": "2.Service Providers. We are offering you the service througn one or more service providers that you have engaged to rener some or all the service to you on our behalf.However,notwithstanding that we have engaged such a service provider to render some or all of ther service to you,we are the soul party Some areas of this Site may be subject to additional terms and conditions, which you should read carefully before making any use of those areas. Such additional terms will not change or replace these Terms regarding use of this Site, unless otherwise expressly stated.",
      "zellepassage": " Terms of service documentI am a little late to the game here but there is an alternative and shorter way to do it if you're mainly interested in making intellisense work.You can extend the base class and then redeclare the members you want to omit as private. This will generate a typescript error ignore will clear it up and shouldn't affect compilation.This is my preferred way to do it when things are simple. No real overhead here or challenging type syntax. The only real downside here is that adding  above the extending class could prevent you from receiving other error messages related to incorrectly extending the Base class. The one advantage to this approach over the accepted pickConstructor approach is that this method doesn't generate any extra code. Whereas pickConstructor literally exists as a function after compilation that runs during class definition.",
      "terms": "I have read the terms and conditions for both Zelle® and Bill Pay.",
      "billpay": "Bill Pay",
      "zelle": "Zelle®"
    }));


    fixture = TestBed.createComponent(PermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });



  it('should fetch header data from API and populate the header object', () => {
    expect(apiService.getPermissionsHeaderData).toHaveBeenCalled();
    expect(component.header).toEqual({ "screen1": "Your Permission, please" });
  });

  it('should fetch literal data from API and populate the literal object', async () => {
    expect(apiService.getPermissionsLiteralData).toHaveBeenCalled();

    const literalData = {
      "title": "Payment 360 Terms of Service",
      "general": "GENERALS TERMS FOR EACH SERVICE ",
      "btncancel": "Cancel",
      "btnContinue": "continue",
      "passage1": " 1.Introduction. This Terms of service document(here in after Agreement) is a contract between you and [Please insert the variable for the name of the FI] (hereinafter we or us) in connection with each service that is described in the rest of this agreement thap applies services you use from us, as applicable (each, a Services)offered through our online banking site or mobile applications(the site).The agreement consists of these General Terms for each service referred to as General Terms), and each set of terms that follows after the general terms that applies to the specefic service tou are using from us.This agreement applies to your use of service and the portion of the site through which the service os offered.",
      "passage2": "2.Service Providers. We are offering you the service througn one or more service providers that you have engaged to rener some or all the service to you on our behalf.However,notwithstanding that we have engaged such a service provider to render some or all of ther service to you,we are the soul party Some areas of this Site may be subject to additional terms and conditions, which you should read carefully before making any use of those areas. Such additional terms will not change or replace these Terms regarding use of this Site, unless otherwise expressly stated.",
      "zellepassage": " Terms of service documentI am a little late to the game here but there is an alternative and shorter way to do it if you're mainly interested in making intellisense work.You can extend the base class and then redeclare the members you want to omit as private. This will generate a typescript error ignore will clear it up and shouldn't affect compilation.This is my preferred way to do it when things are simple. No real overhead here or challenging type syntax. The only real downside here is that adding  above the extending class could prevent you from receiving other error messages related to incorrectly extending the Base class. The one advantage to this approach over the accepted pickConstructor approach is that this method doesn't generate any extra code. Whereas pickConstructor literally exists as a function after compilation that runs during class definition.",
      "terms": "I have read the terms and conditions for both Zelle® and Bill Pay.",
      "billpay": "Bill Pay",
      "zelle": "Zelle®"
    };

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.literal).toEqual(literalData);
  });


  it('should navigate to the specified route when onSubmit method is called', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');
    const routerLink = 'setuppayment';

    component.onSubmit(routerLink);

    expect(routerSpy).toHaveBeenCalledWith([routerLink]);
  });

  it('should select the selectedButton poperty',()=>{
    expect(component.selectedButton).toBe(1);
    component.selectButton(2);
    expect(component.selectedButton).toBe(2);
    component.selectButton(1);
    expect(component.selectedButton).toBe(1);
  })


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
