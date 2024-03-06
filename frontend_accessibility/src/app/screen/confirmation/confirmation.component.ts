import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { BillType, ButtonType } from '../../common/constant/constant';
import { DataService } from '../../service/data.service';
import { environment } from 'src/environments/environment';

import { DatePipe } from '@angular/common';
import { RoutingLinks } from '../../screen-name';
import Utils from 'src/assets/utilities/util';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  providers: [DatePipe],
})

export class ConfirmationComponent implements OnInit {

  accountDetails: DataService;
  amount: string;
  bankLogo: string = environment.imagePath;
  buttonType = ButtonType;
  data: any = {};
  dueDate: string;
  header:any={};
  literal: any = {};
  mobile: string;
  myDate: any = new Date();
  paymentMode: string;
  paymentType = BillType;
  route = RoutingLinks;
  subUserLogo: string = environment.imagePath;
  tickImage: string = environment.imagePath;
  userLogo: string = environment.imagePath;
  util: Utils;
  // dropDownDetails: any;
  item: any;

  public recentActivityList: Array<any> = [];

  

  constructor(
    private _api: ApiService,
    private _data: DataService,
    private _datepipe: DatePipe,
    private _router: Router,
    ) {

    this.myDate = this._datepipe.transform(this.myDate, 'EEEE, MMM d, y');// use util method
    this.paymentMode = this._data.user;
    this._paymentDetails(this.paymentMode);
    console.log(this.paymentMode);
    this.subUserLogo += this._data.subUserLogo;

    this._api.getRequestorHeaderData().subscribe((data)=>(this.header=data));
    this._api.getSenderLiteralData().subscribe((data) => (this.literal = data));
  }

  ngOnInit(): void {

    this.accountDetails = this._data;
    this.amount = '$  ' + this._data.amount;
    this.bankLogo += this._data.bankLogo;
    this.dueDate=this._data.dueDate;
    this.tickImage += this._data.tickImage;
    this.userLogo += this._data.userLogo;
    this.subUserLogo += this.subUserLogo;

  }

  public _paymentDetails(payMode):void {

    switch (payMode) {
      case BillType.BILLER: {
        this._api.getBillerHeaderData().subscribe((data)=>(this.header=data));
        this._api.getBillerLiteralData().subscribe((data) => this.literal = data);
        break;
      }
        // case BillType.SENDER: {
        //   this._api.getRequestorHeaderData().subscribe((data)=>(this.header=data));
        //   this._api.getSenderLiteralData().subscribe((data) => (this.literal = data));
        //   break;
        // }
      case BillType.REQUESTOR: {
        this._api.getRequestorHeaderData().subscribe((data)=>(this.header=data));
        this._api.getRequestorLiteralData().subscribe((data) => (this.literal = data));
      }
    }

  }

  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }
   public getMobile(): string {
    return Utils.getMobile(this._data.mobile);
  }
}
