import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { BillType,ButtonType } from '../../common/constant/constant';
import { DataService } from '../../service/data.service';

import { RoutingLinks } from '../../screen-name';
import Utils from 'src/assets/utilities/util';

@Component({
  selector: 'app-otp-screen',
  templateUrl: './otp-screen.component.html',
  styleUrls: ['./otp-screen.component.scss']
})

export class OtpScreenComponent implements OnInit {
  buttonType = ButtonType;
  header: any = {};
  literal: any = {};
  mobile: string;
  paymentMode: string;
  route = RoutingLinks;
  
  constructor(
    private _api: ApiService, 
    private _data: DataService,    
    private _router: Router) {

    this.paymentMode = this._data.user;
    //this._paymentDetails(this.paymentMode);
    // this._api.getBillerHeaderData().subscribe((data) => (this.header = data));
    // this._api.getBillerLiteralData().subscribe((data) => (this.literal = data));
    
    
  }

  ngOnInit(): void {
    // this.mobile =this._data.mobile.toString().replace(/^(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    this._api.getBillerHeaderData().subscribe((data) => (this.header = data));
    this._api.getBillerLiteralData().subscribe((data) => (this.literal = data));
  }

  private _paymentDetails(payMode): void {
    // switch (payMode) {
    //   case BillType.BILLER: {
    //     this._api.getBillerHeaderData().subscribe((data) => (this.header = data));
    //     this._api.getBillerLiteralData().subscribe((data) => (this.literal = data));
    //     break;
    //   }
    //   case BillType.SENDER: {
    //     this._api.getSenderHeaderData().subscribe((data) => (this.header = data));
    //     this._api.getSenderLiteralData().subscribe((data) => (this.literal = data));
    //     break;
    //   }
    //   case BillType.REQUESTOR: {
    //     this._api.getRequestorHeaderData().subscribe((data) => (this.header = data));
    //     this._api.getRequestorLiteralData().subscribe((data) => (this.literal = data));
    //   }
    // }
  }
  public getMobile(): string {
    return Utils.getMobile(this._data.mobile);
  }
  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }
}