//all screen sholud be under screenfloder////done
//interface pipe sholud be under common folder////done
//routing .ts  sholud be renamed to screen-names.ts///done
//create folder constants//done

import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { BillType, ButtonType } from '../../common/constant/constant';
import { DataService } from '../../service/data.service';
import { environment } from 'src/environments/environment';

import { IBillType, ILiteral, IHeaders } from '../../common/interface/interface';
import { RoutingLinks } from '../../screen-name';
import Utils from 'src/assets/utilities/util';

@Component({
  selector: 'app-amount-to-pay',
  templateUrl: './amount-to-pay.component.html',
  styleUrls: ['./amount-to-pay.component.scss'],
})
export class AmountToPayComponent {
  accountNo: string;
  amount: string;
  bill: IBillType;
  buttonType = ButtonType;
  header: IHeaders;
  imagePath = '';
  literal: ILiteral;
  paymentMode: string;
  paymentType = BillType;
  route = RoutingLinks;
  subUserLogo: string = environment.imagePath;
  util: Utils;

  constructor(
    private _api: ApiService,
    private _changeDetector: ChangeDetectorRef,
    private _data: DataService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    //this.paymentMode = this._data.user;
    //this._paymentDetails(this.paymentMode);
    // this.subUserLogo += this._data.subUserLogo;
    this.util = Utils;
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.paymentMode = params['paymentMode'];
      if (!this.paymentMode) {
        this.paymentMode = this._data.user;
      }
      this._paymentDetails(this.paymentMode);
    });

    this.subUserLogo += this._data.subUserLogo;
    //console.log(this._data.subUserLogo);
    console.log(this.paymentMode);
  }

  private _paymentDetails(payMode): void {
    switch (payMode) {
      case BillType.BILLER: {
        this._api
          .getBillerData()
          .subscribe((data: IBillType) => (this.bill = data));
        this._api
          .getBillerHeaderData()
          .subscribe((data: IHeaders) => (this.header = data));
        this._api
          .getBillerLiteralData()
          .subscribe((data: ILiteral) => (this.literal = data));
        break;
      }
      case BillType.SENDER: {
        this._api
          .getSenderData()
          .subscribe((data: IBillType) => (this.bill = data));
        this._api
          .getSenderHeaderData()
          .subscribe((data: IHeaders) => (this.header = data));
        this._api
          .getSenderLiteralData()
          .subscribe((data: ILiteral) => (this.literal = data));
        break;
      }

      case BillType.REQUESTOR: {
        this._api
          .getRequestorData()
          .subscribe((data: IBillType) => (this.bill = data));
        this._api
          .getRequestorHeaderData()
          .subscribe((data: IHeaders) => (this.header = data));
        this._api
          .getRequestorLiteralData()
          .subscribe((data: ILiteral) => (this.literal = data));
      }
    }
  }

  public onSubmit(routeLink): void {
    this._data.accountNo = this.bill.accountNo; //name should be same
    this._data.accountList = this.bill.accountList;
    this._data.amount = this.bill.amount;
    this._data.bankLogo = this.bill.bankLogo;
    this._data.balance = this.bill.balance;
    this._data.cardNo = this.bill.cardNo;
    this._data.confirmation = this.bill.confirmation;
    this._data.dropDownDetails = this.bill.dropDownDetails;
    this._data.dueDate = this.bill.dueDate;
    this._data.enrolledAs = this.bill.enrolledAs;
    this._data.fee = this.bill.fee;
    this._data.mobile = this.bill.mobile;
    this._data.paymentType = this.bill.paymentType;
    this._data.recipient = this.bill.recipient;
    this._data.subUserLogo = this.bill.subUserLogo;
    this._data.tickImage = this.bill.tickImage;
    this._data.userLogo = this.bill.userLogo;
    this._data.zelleImage = this.bill.zelleImage;
    this._router.navigate([routeLink]);
  }

  public getImage(): string {
    if (this.bill) {
      this.imagePath = environment.imagePath + this.bill.userLogo;
    }
    this.subUserLogo = this._data.subUserLogo;
    this._changeDetector.markForCheck();
    return this.imagePath;
  }
  public getMobile(): string {
    return Utils.getMobile(this.bill?.mobile);
  }
}
