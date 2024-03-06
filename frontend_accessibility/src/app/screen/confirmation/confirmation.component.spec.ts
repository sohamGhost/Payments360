import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  RouterTestingModule
} from '@angular/router/testing';
import {
  of
} from 'rxjs';
import {
  ButtonComponent
} from 'src/app/common/button/button.component';
import {
  HeaderComponent
} from 'src/app/common/header/header.component';
import {
  ApiService
} from 'src/app/service/api.service';
import {
  ConfirmationComponent
} from './confirmation.component';
import Utils from 'src/assets/utilities/util';
import {
  BillType
} from 'src/app/common/constant/constant';
describe('ConfirmationComponent',
  () => {
     let component: ConfirmationComponent;
     let fixture: ComponentFixture < ConfirmationComponent > ;
     let apiService: ApiService;
     beforeEach(async () => {
        await TestBed.configureTestingModule({
           declarations: [
              ConfirmationComponent,
              HeaderComponent,
              ButtonComponent
           ],
           imports: [
              RouterTestingModule,
              HttpClientTestingModule
           ],
           providers: [
              ApiService
           ],
        }).compileComponents();
     });
     beforeEach(() => {
        apiService = TestBed.inject(ApiService);
        spyOn(apiService, 'getRequestorHeaderData').and.returnValue(of({
           "screen1": "Amount to Request",
           "screen2": "Request a Payment",
           "screen3": "OTP Screen",
           "screen4": "Confirmation"
        }));
        spyOn(apiService, 'getSenderLiteralData').and.returnValue(of({
           "amountTitle": "Amount due",
           "inputPlaceHolder": "Enter an amount to pay",
           "amountSubTitle": "Imported from Statement",
           "payButton": "Pay",
           "backButton": "Back",
           "amount": "Amount",
           "placeholder": "Enter Amount",
           "withdrawFrom": "Withdraw from",
           "choose": "Choose how you'd like to pay",
           "arrivesIn": "Arrives in minutes",
           "selected": "Currently selected",
           "arrivesMinutes": "Arrives in 1-3 days",
           "deliveryBy": "Delivery by",
           "memo": "Memo(optional)",
           "reason": "Reason for......",
           "recurringPayment": "Make Recurring Payment",
           "modalRecipient": "You are sending money to the recipient you assed as  ",
           "enrolledAs": "is enrolled with Zelle* as Kat Simmons",
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
           "btnDone": "Done"
        }));
        // spyOn(apiService, 'getBillerHeaderData').and.returnValue(of({
        //   "screen1": "Amount Due",
        //   "screen2": "Make a Payment",
        //   "screen3": "OTP Screen",
        //   "screen4": "Confirmation",
        //   "authenticate": "Authenticate"
        // }));
        // spyOn(apiService, 'getBillerLiteralData').and.returnValue(of({
        //   "amountTitle": "Amount due",
        //   "inputPlaceHolder": "Enter an amount to pay",
        //   "amountSubTitle": "Imported from Statement",
        //   "due": "Due date",
        //   "account": "Account Number",
        //   "viewStatement": "View current statement",
        //   "selectionMethod": "Click to start selection for Payment method",
        //   "amountPayButton": "Make a Payment",
        //   "payButton": "Pay",
        //   "backButton": "Back",
        //   "amount": "Amount",
        //   "placeholder": "Enter Amount",
        //   "withdrawFrom": "Withdraw from",
        //   "choose": "Choose how you'd like to pay",
        //   "faster": "⚡ Fastest option Available",
        //   "arrivesIn": "Arrives in minutes",
        //   "selected": "Currently selected",
        //   "arrivesMinutes": "Arrives in 1-3 days",
        //   "deliveryBy": "Delivery by",
        //   "reason": "Reason for......",
        //   "memo": "Memo(optional)",
        //   "recurringPayment": "Make Recurring Payment",
        //   "modalRecipient": "You are sending money to the recipient you assed as  ",
        //   "enrolledAs": "is enrolled with Zelle* as AT&T",
        //   "continue": "If this looks right to you, select continue",
        //   "btnCancel": "Cancel",
        //   "btnContinue": "continue",
        //   "verify": "Verify Number",
        //   "securityCode": "We sent a one-time security code to",
        //   "enterMobile": "Please Enter the code below",
        //   "sms": "Re-send via text",
        //   "phoneCall": "Re-send via phone call",
        //   "verifyBtn": "Verify",
        //   "enterOtp": "Enter OTP Here",
        //   "paymentSent": "Payment sent",
        //   "you": "You",
        //   "arrives": "Arrives",
        //   "confirm": "Confirmation",
        //   "btnDone": "Done",
        //   "authenticateTxt": "Enter then 6-digit verification code ",
        //   "continueBtn": "Continue",
        //   "resendCode": "Resend Code"  
        // }));
        fixture = TestBed.createComponent(ConfirmationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
     });
     it('should fetch header data from API and populate the  Requestor header object',
        () => {
           component._paymentDetails(BillType.BILLER);
           component._paymentDetails(BillType.REQUESTOR);
           expect(apiService.getRequestorHeaderData).toHaveBeenCalled();
           expect(apiService.getBillerHeaderData).toHaveBeenCalled();
           expect(component.header).toEqual({
              "screen1": "Amount to Request",
              "screen2": "Request a Payment",
              "screen3": "OTP Screen",
              "screen4": "Confirmation"
           });
        });
     it('should fetch literal data from API and populate the  Sender literal object', async () => {
        expect(apiService.getSenderLiteralData).toHaveBeenCalled();
        const literalData = {
           "amountTitle": "Amount due",
           "inputPlaceHolder": "Enter an amount to pay",
           "amountSubTitle": "Imported from Statement",
           "payButton": "Pay",
           "backButton": "Back",
           "amount": "Amount",
           "placeholder": "Enter Amount",
           "withdrawFrom": "Withdraw from",
           "choose": "Choose how you'd like to pay",
           "arrivesIn": "Arrives in minutes",
           "selected": "Currently selected",
           "arrivesMinutes": "Arrives in 1-3 days",
           "deliveryBy": "Delivery by",
           "memo": "Memo(optional)",
           "reason": "Reason for......",
           "recurringPayment": "Make Recurring Payment",
           "modalRecipient": "You are sending money to the recipient you assed as  ",
           "enrolledAs": "is enrolled with Zelle* as Kat Simmons",
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
           "btnDone": "Done"
        };
        await fixture.whenStable();
        fixture.detectChanges();
        expect(component.literal).toEqual(literalData);
     });
     it('should navigate to the specified route when onSubmit method is called',
        () => {
           const routerSpy = spyOn(component['_router'], 'navigate');
           const routerLink = 'dashboard';
           component.onSubmit(routerLink);
           expect(routerSpy).toHaveBeenCalledWith(
              [routerLink]);
        });
     it('should return the mobile number from Utils',
        () => {
           const mobile = '1234567890';
           const data = {
              mobile
           };
           spyOn(Utils, 'getMobile').and.returnValue(mobile);
           const result = component.getMobile();
           expect(result).toEqual(mobile);
        });
     it('should create', () => {
        expect(component).toBeTruthy();
     });
     it('should call the appropriate API methods for BillType.BILLER',
        () => {
           spyOn < any > (component, '_paymentDetails').and.callThrough();
           component.ngOnInit();
           expect(component['_paymentDetails']).toHaveBeenCalledWith(BillType.BILLER);
           expect(apiService.getBillerHeaderData).toHaveBeenCalled();
           expect(apiService.getBillerLiteralData).toHaveBeenCalled();
           expect(apiService.getRequestorHeaderData).not.toHaveBeenCalled();
           expect(apiService.getRequestorLiteralData).not.toHaveBeenCalled();
        });
  });