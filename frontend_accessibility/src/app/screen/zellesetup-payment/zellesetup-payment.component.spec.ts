import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ZellesetupPaymentComponent } from './zellesetup-payment.component';

import { ApiService } from 'src/app/service/api.service';

import { DataService } from 'src/app/service/data.service';

import { of } from 'rxjs';

import { HeaderComponent } from 'src/app/common/header/header.component';

import { ButtonComponent } from 'src/app/common/button/button.component';

import { Router } from '@angular/router';




describe('ZellesetupPaymentComponent', () => {

  //creating aliases

  let component: ZellesetupPaymentComponent;

  let fixture: ComponentFixture<ZellesetupPaymentComponent>;

  let apiService: ApiService;

  let dataService: DataService;

  let router: Router;

  // let httpMock: HttpTestingController;




  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [ZellesetupPaymentComponent, HeaderComponent, ButtonComponent],

      imports: [RouterTestingModule, HttpClientTestingModule],

      providers: [ApiService, DataService],

    }).compileComponents();

  });




  beforeEach(() => {

    apiService = TestBed.inject(ApiService);

    spyOn(apiService, 'getZelleSetuppaymentHeaderData').and.returnValue(of({ screen1: 'Choose How to Receive Money' }));

    spyOn(apiService, 'getZelleSetuppaymentLiteralData').and.returnValue(of({

      accountSelectionText: 'You need an email, U.S. mobile number, or Zelle® tag to send and receive money',

      learnmore: 'Learn More',

      new:'Add a new U.S. mobile number or email',

      btnContinue: 'continue'

    }));

    spyOn(apiService, 'getZelleSetuppaymentData').and.returnValue(of({

      accountSelection: {

        primaryAccountList: [

          { accountType: 'Phone', accountNo: '917-222-4367' },

          { accountType: 'Email', accountNo: 'alex.davis@gmail.com' },

          { accountType: 'Create Zelle® Tag' },

        ],

      },

    }));




    fixture = TestBed.createComponent(ZellesetupPaymentComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });




  it('should fetch header data from API and populate the header object', () => {

    expect(apiService.getZelleSetuppaymentHeaderData).toHaveBeenCalled();

    expect(component.header).toEqual({ screen1: 'Choose How to Receive Money' });

  });




  it('should fetch literal data from API and populate the literal object', async () => {

    expect(apiService.getZelleSetuppaymentLiteralData).toHaveBeenCalled();




    const literalData = {

      accountSelectionText: 'You need an email, U.S. mobile number, or Zelle® tag to send and receive money',

      learnmore: 'Learn More',

      new:'Add a new U.S. mobile number or email',

      btnContinue: 'continue'

    };




    await fixture.whenStable();

    fixture.detectChanges();




    expect(component.literal).toEqual(literalData);

  });




  it('should fetch account list from API and populate the accountList array', async () => {

    expect(apiService.getZelleSetuppaymentData).toHaveBeenCalled();




    const accountListData = {

      accountSelection: {

        primaryAccountList: [

          { accountType: 'Phone', accountNo: '917-222-4367' },

          { accountType: 'Email', accountNo: 'alex.davis@gmail.com' },

          { accountType: 'Create Zelle® Tag' },

        ],

      },

    };




    await fixture.whenStable();

    fixture.detectChanges();




    expect(component.accountList).toEqual(accountListData.accountSelection.primaryAccountList);

  });




  it('should navigate to the specified route when onSubmit method is called', () => {

    const routerSpy = spyOn(component['_router'], 'navigate');

    const routerLink = 'successscreen';




    component.onSubmit(routerLink);




    expect(routerSpy).toHaveBeenCalledWith([routerLink]);

  });

 

});