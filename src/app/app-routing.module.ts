import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmountToPayComponent } from './screen/amount-to-pay/amount-to-pay.component';
import { ConfirmationComponent } from './screen/confirmation/confirmation.component';
import { MakeAPaymentComponent } from './screen/make-a-payment/make-a-payment.component';
import { OtpScreenComponent } from './screen/otp-screen/otp-screen.component';
import { HomeComponent } from './screen/home/home.component';
import { AddBillsComponent } from './screen/add-bills/add-bills.component';
import { SelectPrimaryAccountComponent } from './screen/select-primary-account/select-primary-account.component';
import { TodoComponent } from './screen/todos/todo-summary/todo.component';
import { PermissionsComponent } from './screen/permissions/permissions.component';
import { ZellepermissionsComponent } from './screen/zellepermissions/zellepermissions.component';
import { StartScreenComponent } from './screen/start-screen/start-screen.component';
import { ZelleStartscreenComponent } from './screen/zelle-startscreen/zelle-startscreen.component';
import { SetupPaymentComponent } from './screen/setup-payment/setup-payment.component';
import { ZellesetupPaymentComponent } from './screen/zellesetup-payment/zellesetup-payment.component';
import { FindMoreBillsComponent } from './screen/find-more-bills/find-more-bills.component';
import { SelectAddBillsComponent } from './screen/select-add-bills/select-add-bills.component';
import { SuccessFailureScreenComponent } from './screen/success-failure-screen/success-failure-screen.component';
import { DashboardComponent } from './screen/dashboard/dashboard.component';
import { SuccessScreenComponent } from './screen/success-screen/success-screen.component';
import { GeneralOnboardingSuccessComponent } from './screen/general-onboarding-success/general-onboarding-success.component';
import { BillerConfirmationComponent } from './screen/biller-confirmation/biller-confirmation.component';
import { ZellePayAuthenticationComponent } from './screen/zelle-pay-authentication/zelle-pay-authentication.component';
import { BillPayAuthenticationComponent } from './screen/bill-pay-authentication/bill-pay-authentication.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'amountToPay', component: AmountToPayComponent },
  { path: 'amountToPay/:paymentMode', component: AmountToPayComponent },
  { path: 'makeapayment', component: MakeAPaymentComponent },
  { path: 'otpscreen', redirectTo: '/otpscreen', pathMatch: 'full' },
  { path: 'otpscreen', component: OtpScreenComponent },
  { path: 'makeapayment', redirectTo: '/makepayment', pathMatch: 'full' },
  { path: 'confirmation', redirectTo: '/confirmation', pathMatch: 'full' },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'selectprimaryaccount', component: SelectPrimaryAccountComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'startscreen', component: StartScreenComponent },
  { path: 'permissions', component: PermissionsComponent },
  // {path:'permissions', redirectTo:'/permissions', pathMatch:'full'},
  { path: 'setuppayment', component: SetupPaymentComponent },
  // {path:'setuppayment', redirectTo:'/setuppayment', pathMatch:'full'},
  { path: 'zellepermissions', component: ZellepermissionsComponent },
  { path: 'zellestartscreen', component: ZelleStartscreenComponent },
  { path: 'zellesetuppayment', component: ZellesetupPaymentComponent },
  { path: 'findmorebills', component: FindMoreBillsComponent },
  { path: 'selectaddbills', component: SelectAddBillsComponent },
  { path: 'addbills', component: AddBillsComponent },
  { path: 'successfailure', component: SuccessFailureScreenComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'successscreen', component: SuccessScreenComponent },
  { path: 'generalonboardingsuccessscreen', component: GeneralOnboardingSuccessComponent },
  { path: 'billerconfirmation', component:BillerConfirmationComponent},
  { path: 'zellepayauthentication', component:ZellePayAuthenticationComponent},
  { path: 'billpayauthentication', component:BillPayAuthenticationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
