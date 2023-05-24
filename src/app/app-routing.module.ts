import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmountToPayComponent} from './screen/amount-to-pay/amount-to-pay.component';
import { ConfirmationComponent } from './screen/confirmation/confirmation.component';
import { MakeAPaymentComponent } from './screen/make-a-payment/make-a-payment.component';
import { OtpScreenComponent } from './screen/otp-screen/otp-screen.component';
import { HomeComponent } from './screen/home/home.component';
import { AddBillsComponent } from './screen/add-bills/add-bills.component';
import { SelectPrimaryAccountComponent } from './screen/select-primary-account/select-primary-account.component';
import { TodoComponent } from './screen/todo/todo.component';

const routes: Routes = [
  {path:'home' , component:HomeComponent},
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'amountToPay' , component:AmountToPayComponent},
  {path:'makeapayment',  component:MakeAPaymentComponent},
  {path:'otp', redirectTo:'/otpscreen', pathMatch:'full'},
  {path:'otpscreen',component:OtpScreenComponent},
  {path:'confirmation', redirectTo:'/confirmation', pathMatch:'full'},
  {path:'makeapayment', redirectTo:'/makepayment', pathMatch:'full'},
  {path:'confirmation', component:ConfirmationComponent},
  {path:'addbills', component:AddBillsComponent},
  {path:'selectprimaryaccount', component:SelectPrimaryAccountComponent},
  {path:'todo', component:TodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
