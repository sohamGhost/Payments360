import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmountToPayComponent } from './screen/amount-to-pay/amount-to-pay.component';
import { MakeAPaymentComponent } from './screen/make-a-payment/make-a-payment.component';
import { OtpScreenComponent } from './screen/otp-screen/otp-screen.component';
import { ConfirmationComponent } from './screen/confirmation/confirmation.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './screen/home/home.component';
import { ButtonComponent } from './common/button/button.component';
import { DatePipe } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatPipe } from './common/pipe/date-pipe/date-pipe.pipe';
import { AddBillsComponent } from './screen/add-bills/add-bills.component';
import { SearchBarComponent } from './common/search-bar/search-bar.component';
import { SelectPrimaryAccountComponent } from './screen/select-primary-account/select-primary-account.component';
import { TodoComponent } from './screen/todos/todo-summary/todo.component';
import { TodoDueSoonComponent } from './screen/todos/todo-due-soon/todo-due-soon.component';
import { TodoUpcomingComponent } from './screen/todos/todo-upcoming/todo-upcoming.component';
import { SelectedItemsService } from './service/selected-items.service';
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
import { BillPayAuthenticationComponent } from './screen/bill-pay-authentication/bill-pay-authentication.component';
import { ZellePayAuthenticationComponent } from './screen/zelle-pay-authentication/zelle-pay-authentication.component';
import { SelectedBillerService } from './service/selected-biller.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    AmountToPayComponent,
    MakeAPaymentComponent,
    OtpScreenComponent,
    ConfirmationComponent,
    HeaderComponent,
    HomeComponent,
    ButtonComponent,
    DateFormatPipe,
    AddBillsComponent,
    SearchBarComponent,
    SelectPrimaryAccountComponent,
    TodoComponent,
    TodoDueSoonComponent,
    TodoUpcomingComponent,
    PermissionsComponent,
    ZellepermissionsComponent,
    StartScreenComponent,
    ZelleStartscreenComponent,
    SetupPaymentComponent,
    ZellesetupPaymentComponent,
    FindMoreBillsComponent,
    SelectAddBillsComponent,
    SuccessFailureScreenComponent,
    DashboardComponent,
    SuccessScreenComponent,
    GeneralOnboardingSuccessComponent,
    BillerConfirmationComponent,
    BillPayAuthenticationComponent,
    ZellePayAuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    OverlayModule,
    NgbModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: (http:HttpClient) => {return new TranslateHttpLoader(http, './assets/i18n/', '.json');},
          deps: [HttpClient]
        }
      }
    )
  ],
  providers: [SelectedItemsService,SelectedBillerService],
  bootstrap: [AppComponent],
})
export class AppModule { }

