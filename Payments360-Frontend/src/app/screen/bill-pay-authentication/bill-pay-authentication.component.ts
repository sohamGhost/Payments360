import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonType } from 'src/app/common/constant/constant';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { HttpClient } from '@angular/common/http';
import Utils from 'src/assets/utilities/util';
import { FormControl, Validators } from '@angular/forms';
import { IApiData, IOtpToken } from 'src/app/common/interface/interface';
import { debounceTime, first, interval, Subject, Subscription, takeUntil, takeWhile } from 'rxjs';

@Component({
  selector: 'app-bill-pay-authentication',
  templateUrl: './bill-pay-authentication.component.html',
  styleUrls: ['./bill-pay-authentication.component.scss']
})
export class BillPayAuthenticationComponent implements OnInit, AfterViewInit, OnDestroy {
  buttonType = ButtonType;
  header: any = {};
  literal: any = {};
  data: IApiData = null;
  mobile: string;
  paymentMode: string;
  route = RoutingLinks;
  fc: FormControl = new FormControl(null, Validators.required);
  otp: number = null;
  userName: string="";
  otpMismatch: boolean = false;
  countdown:number = 30;
  countdownActive:boolean = true;
  private resendSubject:Subject<void> = new Subject<void>();
  private countdownIntervalSubscription: Subscription;
  
  constructor(
    private _api: ApiService, 
    private _data: DataService,    
    private _router: Router,
    private http: HttpClient) {

    //this.paymentMode = this._data.user;
    //this._paymentDetails(this.paymentMode);    
  }

  ngOnInit(): void {
    this._api.getBillerHeaderData()
    .subscribe((data) => {
      this.header = data
    });

    this._api.getBillerLiteralData()
    .subscribe((data) => {
      this.literal = data
    });
    
    this._api.getUserData()
    .subscribe((data:IApiData) => {
      if(data){
        this.data = data;
        this.userName = this.data.userName;
      }
    });

    this.fc.valueChanges.subscribe((value:number)=>{
      this.otp = value;
    });

    //countdown timer with debouncer
     this.resendSubject.pipe(debounceTime(1000)).subscribe(() => {
        this.clearCountdownInterval();
        this.resendCode();
        console.log("debouncing...");
      });  
      this.startCountdown();
  }

  ngAfterViewInit(): void {
    this._api.getOtpData()
    .subscribe((data:IOtpToken) => {
    });
  }

  ngOnDestroy(): void{
    this.clearCountdownInterval();
  }

  private clearCountdownInterval(): void {
    if(this.countdownIntervalSubscription) {
      this.countdownIntervalSubscription.unsubscribe();
    }
  }

  public startCountdown(): void {
    this.countdown = 30;
    this.countdownActive = true;
    this.countdownIntervalSubscription = interval(1000)
    .pipe(takeWhile(() => this.countdown > 0 && this.countdownActive))
    .subscribe(() => {
      this.countdown--;
      if (this.countdown == 0) {
        this.countdownActive = false;
      }
    });
  }

  public clickHandler(): void {
    this.otpMismatch = false;
    this.resendSubject.next();
  }

  public resendCode(): void {
    this._api.getOtpData().pipe(first())
      .subscribe((data:IOtpToken) => {
    });
    this.countdown = 30;
    this.countdownActive = true;
    this.startCountdown();
  }

  public getMobile(): string {
    return Utils.getMobile(parseInt(this.data.phone,10));
  }
  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }

  public getBillPayAuthenticate(){
    let OtpToken:IOtpToken = {
      userName: this.userName,
      otp: this.otp,
      blnValidateFlag: false
    };
    return this.http.post("http://localhost:9080/auth/otpVerification",OtpToken)
    .subscribe((res:IOtpToken) => {
      console.log("Respone received", res);

      if(res.blnValidateFlag){
        console.log("validation passed");
        this.otpMismatch = false;
        this.onSubmit(this.route.SUCCESSFAILURE);
      }
    },
    (error)=>{
      this.otpMismatch=true;
      this.countdownActive = false;
    }
    );
  }
}