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
import { TodoComponent } from './screen/todo/todo.component';
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
