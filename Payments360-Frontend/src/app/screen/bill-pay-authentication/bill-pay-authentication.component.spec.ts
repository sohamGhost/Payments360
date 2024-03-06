import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ButtonComponent } from 'src/app/common/button/button.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { ApiService } from 'src/app/service/api.service';

import { BillPayAuthenticationComponent } from './bill-pay-authentication.component';

describe('BillPayAuthenticationComponent', () => {
  let component: BillPayAuthenticationComponent;
  let fixture: ComponentFixture<BillPayAuthenticationComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillPayAuthenticationComponent, HeaderComponent, ButtonComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ApiService]
    }).compileComponents();
  });

  beforeEach(async () => {
    apiService = TestBed.inject(ApiService);

    spyOn(apiService, 'getBillerHeaderData').and.returnValue(of({
      screen1: 'Amount Due',
      screen2: 'Make a Payment',
      screen3: 'OTP Screen',
      screen4: "Confirmation",
      authenticate: "Authenticate"
    }));

    spyOn(apiService, 'getBillerLiteralData').and.returnValue(of({
      "amountTitle": "Amount due",
      "inputPlaceHolder": "Enter an amount to pay",
      "amountSubTitle": "Imported from Statement",
      "due": "Due date",
      "account": "Account Number",
      "viewStatement": "View current statement",
      "selectionMethod": "Click to start selection for Payment method",
      "amountPayButton": "Make a Payment",
      "payButton": "Pay",
      "backButton": "Back",
      "amount": "Amount",
      "placeholder": "Enter Amount",
      "withdrawFrom": "Withdraw from",
      "choose": "Choose how you'd like to pay",
      "faster": "⚡ Fastest option Available",
      "arrivesIn": "Arrives in minutes",
      "selected": "Currently selected",
      "arrivesMinutes": "Arrives in 1-3 days",
      "deliveryBy": "Delivery by",
      "reason": "Reason for......",
      "memo": "Memo(optional)",
      "recurringPayment": "Make Recurring Payment",
      "modalRecipient": "You are sending money to the recipient you assed as  ",
      "enrolledAs": "is enrolled with Zelle* as AT&T",
      "continue": "If this looks right to you, select continue",
      "btnCancel": "Cancel",
      "btnContinue": "continue",
      "verify": "Verify Number",
      "securityCode": "We sent a one-time security code to",
      "enterMobile": "Please Enter the code below",
      "sms": "Re-send via text",
      "phoneCall": "Re-send via phone call",
      "verifyBtn": "Verify",
      "enterOtp": "Enter OTP Here",
      "paymentSent": "Payment sent",
      "you": "You",
      "arrives": "Arrives",
      "confirm": "Confirmation",
      "btnDone": "Done",
      "authenticateTxt": "Enter then 6-digit verification code ",
      "continueBtn": "Continue",
      "resendCode": "Resend Code"
     }));

     spyOn(apiService,'getUserData').and.returnValue(of({
      "emailId": "johndoe@gmail.com",
      "mobile": 7185551234,
      "tag": "Create a Zelle® Tag",
      "dropDownDetails": [
        {
          "paymentType": "CREDIT CARD.",
          "cardNo": 2246,
          "fee": "(2.3% fee)",
          "balance": "$365.27 available",
          "arrives": "Arrives in minutes",
          "faster": "⚡ Fastest option Available",
          "selected": false
        },
        {
          "paymentType": "MAIN CHECKING.",
          "cardNo": "*4738",
          "fee": "",
          "balance": "$4,164.98 available",
          "arrives": "Arrives in 1-3 days",
          "faster": "",
          "selected": true
        }
      ]
     }));

    fixture = TestBed.createComponent(BillPayAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch header data from API and populate the header object', async () => {
    expect(apiService.getBillerHeaderData).toHaveBeenCalled();
    const headerData = {
      screen1: 'Amount Due',
      screen2: 'Make a Payment',
      screen3: 'OTP Screen',
      screen4: "Confirmation",
      authenticate: "Authenticate"
    }
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.header).toEqual(headerData);
    });

    it('should fetch the literal data from api and populate the literal object', async () => {
      expect(apiService.getBillerLiteralData).toHaveBeenCalled();
      const literalData = {
        "amountTitle": "Amount due",
        "inputPlaceHolder": "Enter an amount to pay",
        "amountSubTitle": "Imported from Statement",
        "due": "Due date",
        "account": "Account Number",
        "viewStatement": "View current statement",
        "selectionMethod": "Click to start selection for Payment method",
        "amountPayButton": "Make a Payment",
        "payButton": "Pay",
        "backButton": "Back",
        "amount": "Amount",
        "placeholder": "Enter Amount",
        "withdrawFrom": "Withdraw from",
        "choose": "Choose how you'd like to pay",
        "faster": "⚡ Fastest option Available",
        "arrivesIn": "Arrives in minutes",
        "selected": "Currently selected",
        "arrivesMinutes": "Arrives in 1-3 days",
        "deliveryBy": "Delivery by",
        "reason": "Reason for......",
        "memo": "Memo(optional)",
        "recurringPayment": "Make Recurring Payment",
        "modalRecipient": "You are sending money to the recipient you assed as  ",
        "enrolledAs": "is enrolled with Zelle* as AT&T",
        "continue": "If this looks right to you, select continue",
        "btnCancel": "Cancel",
        "btnContinue": "continue",
        "verify": "Verify Number",
        "securityCode": "We sent a one-time security code to",
        "enterMobile": "Please Enter the code below",
        "sms": "Re-send via text",
        "phoneCall": "Re-send via phone call",
        "verifyBtn": "Verify",
        "enterOtp": "Enter OTP Here",
        "paymentSent": "Payment sent",
        "you": "You",
        "arrives": "Arrives",
        "confirm": "Confirmation",
        "btnDone": "Done",
        "authenticateTxt": "Enter then 6-digit verification code ",
        "continueBtn": "Continue",
        "resendCode": "Resend Code"
      }

      await fixture.whenStable();
      fixture.detectChanges();
      expect(component.literal).toEqual(literalData);
    });

    it('should fetch the user data from api and populate the user object', async () => {
      expect(apiService.getUserData).toHaveBeenCalled();
      const userData = {
        "emailId": "johndoe@gmail.com",
        "mobile": 7185551234,
        "tag": "Create a Zelle® Tag",
        "dropDownDetails": [
          {
            "paymentType": "CREDIT CARD.",
            "cardNo": 2246,
            "fee": "(2.3% fee)",
            "balance": "$365.27 available",
            "arrives": "Arrives in minutes",
            "faster": "⚡ Fastest option Available",
            "selected": false
          },
          {
            "paymentType": "MAIN CHECKING.",
            "cardNo": "*4738",
            "fee": "",
            "balance": "$4,164.98 available",
            "arrives": "Arrives in 1-3 days",
            "faster": "",
            "selected": true
          }
        ]
      }
      await fixture.whenStable();
      fixture.detectChanges();
      expect(component.data).toEqual(userData);
    });

    it('should navigate to the specified route when onSubmit method is called', () => {
      const routerSpy = spyOn(component['_router'], 'navigate');
      const routerLink = 'successfailure';
  
      component.onSubmit(routerLink);
  
      expect(routerSpy).toHaveBeenCalledWith([routerLink]);
    });
});
