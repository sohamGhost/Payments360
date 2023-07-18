import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SetupPaymentComponent } from './setup-payment.component';

import { ApiService } from 'src/app/service/api.service';

import { DataService } from 'src/app/service/data.service';

import { of } from 'rxjs';

import { HeaderComponent } from 'src/app/common/header/header.component';

import { ButtonComponent } from 'src/app/common/button/button.component';

import { Router } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';




describe('SetupPaymentComponent', () => {

  //creating aliases

  let component: SetupPaymentComponent;

  let fixture: ComponentFixture<SetupPaymentComponent>;

  let apiService: ApiService;

  let dataService: DataService;

  let router: Router;

  // let httpMock: HttpTestingController;




  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [SetupPaymentComponent, HeaderComponent, ButtonComponent],

      imports: [RouterTestingModule, HttpClientTestingModule, OverlayModule],

      providers: [ApiService, DataService],

    }).compileComponents();

  });




  beforeEach(() => {

    apiService = TestBed.inject(ApiService);

    spyOn(apiService, 'getUserHeaderData').and.returnValue(of({ screen1: 'Set up Payments 360 profile' }));

    spyOn(apiService, 'getUserLiteralData').and.returnValue(of({

        skip:'Skip',

        zelleText: 'What contact method would you like people to use when sending you money with Zelle®?',

        handleText: 'Think of it like a handle',

        createText: '+ Add new email or mobile number',

        choose: 'Choose where you would like to receive your money',

        changeText: 'You can always change this later',

        sendReceiveText: 'Send and receive from',

        faster: '⚡ Fastest option Available',

        arrivesIn: 'Arrives in minutes',

        selected: 'Currently selected',

        arrivesMinutes: 'Arrives in 1-3 days',

        smsText1: 'I consent to receive calls and/or text (SMS) message from us or our service providers at that number. Please review our ',

        smsText2:' for more information.',

        emailText1: 'I consent to receive email from us or our service providers at that emailId. Please review our ',

        emailText2: 'for more information.',

        tagText1: 'I consent to create a Zelle Tag from us or our service providers at that number. Please review our ',

        tagText2:' for more information.',

        privacypolicy:'Privacy Policy',

        placeholder:'Main Chec...(*0723)  $4,164.98 available',

        btnContinue: 'continue',

        btnCancel: 'Cancel'

      }));

    spyOn(apiService, 'getUserData').and.returnValue(of({

      emailId: 'johndoe@gmail.com',

      mobile: '7185551234',

      tag:'Create a Zelle® Tag',

      dropDownDetails:[

     {

      paymentType:'CREDIT CARD.',

      cardNo:'2246',

      fee:'(2.3% fee)',

      balance: '$365.27 available',

      arrives:'Arrives in minutes',

      faster: '⚡ Fastest option Available',

      selected:'false'

    },

    {

      paymentType:'MAIN CHECKING.',

      cardNo:'*4738',

      fee:'',

      balance: '$4,164.98 available',

      arrives:'Arrives in 1-3 days',

      faster: '',

      selected :'true'

    }

  ]

    }));




    fixture = TestBed.createComponent(SetupPaymentComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });




  it('should fetch header data from API and populate the header object', () => {

    expect(apiService.getUserHeaderData).toHaveBeenCalled();

    expect(component.header).toEqual({ screen1: 'Set up Payments 360 profile' });

  });




  it('should fetch literal data from API and populate the literal object', async () => {

    expect(apiService.getUserLiteralData).toHaveBeenCalled();




    const literalData = {

      skip:'Skip',

      zelleText: 'What contact method would you like people to use when sending you money with Zelle®?',

      handleText: 'Think of it like a handle',

      createText: '+ Add new email or mobile number',

      choose: 'Choose where you would like to receive your money',

      changeText: 'You can always change this later',

      sendReceiveText: 'Send and receive from',

      faster: '⚡ Fastest option Available',

      arrivesIn: 'Arrives in minutes',

      selected: 'Currently selected',

      arrivesMinutes: 'Arrives in 1-3 days',

      smsText1: 'I consent to receive calls and/or text (SMS) message from us or our service providers at that number. Please review our ',

      smsText2:' for more information.',

      emailText1: 'I consent to receive email from us or our service providers at that emailId. Please review our ',

      emailText2: 'for more information.',

      tagText1: 'I consent to create a Zelle Tag from us or our service providers at that number. Please review our ',

      tagText2:' for more information.',

      privacypolicy:'Privacy Policy',

      placeholder:'Main Chec...(*0723)  $4,164.98 available',

      btnContinue: 'continue',

      btnCancel: 'Cancel'

    };




    await fixture.whenStable();

    fixture.detectChanges();




    expect(component.literal).toEqual(literalData);

  });




  it('should fetch account list from API and populate the accountList array', async () => {

    expect(apiService.getUserData).toHaveBeenCalled();




    const accountListData = {

      emailId: 'johndoe@gmail.com',

      mobile: '7185551234',

      tag:'Create a Zelle® Tag',

      dropDownDetails:[

     {

      paymentType:'CREDIT CARD.',

      cardNo:'2246',

      fee:'(2.3% fee)',

      balance: '$365.27 available',

      arrives:'Arrives in minutes',

      faster: '⚡ Fastest option Available',

      selected:'false'

    },

    {

      paymentType:'MAIN CHECKING.',

      cardNo:'*4738',

      fee:'',

      balance: '$4,164.98 available',

      arrives:'Arrives in 1-3 days',

      faster: '',

      selected :'true'

    }

  ]

    };




    await fixture.whenStable();

    fixture.detectChanges();




  });

  it('should set the selected item and update the selectedData when onDropDownClick is called', () => {
    const item = {
      paymentType: 'CREDIT CARD.',
      cardNo: '2246',
      fee: '(2.3% fee)',
      balance: '$365.27 available',
      arrives: 'Arrives in minutes',
      faster: '⚡ Fastest option Available',
      selected: false
    };

    component.onDropDownClick(item);

    expect(item.selected).toBe(true);
    expect(component.selectedData).toBe('CREDIT CARD.  $365.27 available');
  });







  it('should set the displayStyle property to "block" when openPopup is called', () => {
    component.openPopup();
    expect(component.displayStyle).toBe('block');
  });

  it('should set the displayStyle property to "none" when closePopup is called', () => {
    component.closePopup();
    expect(component.displayStyle).toBe('none');
  });

  it('should reset checkbox properties and isButtonDisabled to true when cancelSelection is called', () => {
    component.checkbox1 = true;
    component.checkbox2 = true;
    component.checkbox3 = true;
    component.isButtonDisabled = false;

    component.cancelSelection();

    expect(component.checkbox1).toBeFalse();
    expect(component.checkbox2).toBeFalse();
    expect(component.checkbox3).toBeFalse();
    expect(component.isButtonDisabled).toBeTrue();
  });


  it('should navigate to the specified route when onSubmit method is called', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');
    const routerLink = 'successscreen';

    component.onSubmit(routerLink);

    expect(routerSpy).toHaveBeenCalledWith([routerLink]);
  });

});
