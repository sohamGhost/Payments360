import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { ApiService } from 'src/app/service/api.service';

import { DataService } from 'src/app/service/data.service';




import { SuccessScreenComponent } from './success-screen.component';




describe('SuccessScreenComponent', () => {

  let component: SuccessScreenComponent;

  let fixture: ComponentFixture<SuccessScreenComponent>;

  let apiService: ApiService;




  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [SuccessScreenComponent],

      imports: [RouterTestingModule, HttpClientTestingModule],

      providers: [ApiService, DataService],

    })

      .compileComponents();

  });





  beforeEach(() => {

    apiService = TestBed.inject(ApiService);

    spyOn(apiService, 'getSuccessScreenHeaderData').and.returnValue(of({ "congratulations": "Congratulations" }));

    spyOn(apiService, 'getSuccessScreenLiteralData').and.returnValue(of({

      "successTxt": "You are all set to send and receive money using alex.davis@gmail.com Zelle QR Code",

      "pendingTransactions": "Pending Transactions",

      "footerBtnTxt": "Finish Paying Connor",

      "dueTimeTxt": "Request via Zelle",

      "zelleSuccessTxt": "You are Successfully Onboarded!!",

      "zelleFooterBtnTxt": "Let's get Started"

    }));

    spyOn(apiService, 'getSuccessScreenData').and.returnValue(of({

      "userLogo": "katsimmons.png",

      "recipient": "Kat Simmons",

      "dueTime": 4,

      "amount": 88

    }));




    fixture = TestBed.createComponent(SuccessScreenComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });




  it('should create', () => {

    expect(component).toBeTruthy();

  });





 

  it('should fetch header data from API and populate the header object', () => {

    expect(apiService.getSuccessScreenHeaderData).toHaveBeenCalled();

    expect(component.header).toEqual({"congratulations": "Congratulations"  });

  });




  it('should fetch literal data from API and populate the literal object', async () => {

    expect(apiService.getSuccessScreenLiteralData).toHaveBeenCalled();




    const literalData = {

      "successTxt": "You are all set to send and receive money using alex.davis@gmail.com Zelle QR Code",

      "pendingTransactions": "Pending Transactions",

      "footerBtnTxt": "Finish Paying Connor",

      "dueTimeTxt": "Request via Zelle",

      "zelleSuccessTxt": "You are Successfully Onboarded!!",

      "zelleFooterBtnTxt": "Let's get Started"

    };




    await fixture.whenStable();

    fixture.detectChanges();




    expect(component.literal).toEqual(literalData);

  });




  it('should fetch account list from API and populate the success-screen list array', async () => {

    expect(apiService.getSuccessScreenData).toHaveBeenCalled();




    const mockSuccessScreenData = {

      "userLogo": "katsimmons.png",

      "recipient": "Kat Simmons",

      "dueTime": 4,

      "amount": 88

    };




    await fixture.whenStable();

    fixture.detectChanges();




    expect(component.data).toEqual(mockSuccessScreenData);




    expect(component.data.userLogo).toBe(component.userLogo+mockSuccessScreenData.userLogo)

  });




  it('should navigate to the specified route when onSubmit method is called', () => {

    const routerSpy = spyOn(component['_router'], 'navigate');

    const routerLink = 'dashboard';




    component.onSubmit(routerLink);




    expect(routerSpy).toHaveBeenCalledWith([routerLink]);

  });




});