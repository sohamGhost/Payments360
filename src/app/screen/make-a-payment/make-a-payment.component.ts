import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { ApiService } from '../../service/api.service';
import {
  BillType,
  Month,
  WeekDays,
  ButtonType,
} from '../../common/constant/constant';
import { DataService } from '../../service/data.service';
import { environment } from 'src/environments/environment';

import { IAccountType, IBillType } from '../../common/interface/interface';
import { RoutingLinks } from '../../screen-name';
import Utils from 'src/assets/utilities/util';

@Component({
  selector: 'app-make-a-payment',
  templateUrl: './make-a-payment.component.html',
  styleUrls: ['./make-a-payment.component.scss'],
})
export class MakeAPaymentComponent implements OnInit {
  accountDetails: DataService;
  acountType: IAccountType[];
  amount: string;
  buttonType = ButtonType;
  dueDate: string;
  bill: IBillType;
  displayStyle = 'none';
  header: any = {};
  isOpen = false;
  isOpenDateTime = false;
  literal: any = {};
  maxPickerDate: { year: number; month: number; day: number };
  minPickerDate = { year: 0, month: 0, day: 0 };
  paymentMode: string;
  paymentType = BillType;
  private _model: NgbDate;
  route = RoutingLinks;
  selectedDay: string = '';
  selectedMonth: string = '';
  subUserLogo: string = environment.imagePath;
  userLogo: string = environment.imagePath;
  util: Utils;
  zelleImage: string = environment.imagePath;
  dropDownDetails: any[];
  selectedData: any;

  constructor(
    private _api: ApiService,
    private _calender: NgbCalendar,
    private _data: DataService,
    private _router: Router
  ) {
    this.paymentMode = this._data.user;
    this._paymentDetails(this.paymentMode);
  }

  ngOnInit(): void {
    this.selectToday();
    this.accountDetails = this._data;
    this.dropDownDetails = this._data.dropDownDetails;
    this.amount = '$  ' + this._data.amount;
    this.dueDate = this._data.dueDate;
    const futureDate = new Date().setDate(new Date().getDate() + 90);
    this.maxPickerDate = {
      year: new Date(futureDate).getFullYear(),
      month: new Date(futureDate).getMonth() + 1,
      day: new Date(futureDate).getDate(),
    };
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    };
    this.userLogo += this._data.userLogo;
    this.zelleImage += this._data.zelleImage;
    this.subUserLogo += this._data.subUserLogo;
    this.dropDownDetails.map((data) => {
      if (data.selected === true) {
        this.selectedData = data.paymentType + data.balance;
      }
    });
  }

  private _paymentDetails(payMode): void {
    switch (payMode) {
      case BillType.BILLER: {
        this._api
          .getBillerHeaderData()
          .subscribe((data) => (this.header = data));
        this._api
          .getBillerLiteralData()
          .subscribe((data) => (this.literal = data));
        break;
      }
      case BillType.SENDER: {
        this._api
          .getSenderHeaderData()
          .subscribe((data) => (this.header = data));
        this._api
          .getSenderLiteralData()
          .subscribe((data) => (this.literal = data));
        break;
      }
      case BillType.REQUESTOR: {
        this._api
          .getRequestorHeaderData()
          .subscribe((data) => (this.header = data));
        this._api
          .getRequestorLiteralData()
          .subscribe((data) => (this.literal = data));
      }
    }
  }

  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }

  public set model(val) {
    this._model = val;
    this.selectedDay = WeekDays[this._calender.getWeekday(this.model)];
    this.selectedMonth = Month[this.model.month];
  }

  public get model() {
    return this._model;
  }

  public selectToday(): void {
    this.model = this._calender.getToday();
  }

  public openPopup(): void {
    this.displayStyle = 'block';
  }

  public closePopup(): void {
    this.displayStyle = 'none';
  }

  public getMobile(): string {
    return Utils.getMobile(this._data.mobile);
  }

  public onDropDownClick(item): void {
    item.selected = true;
    this.dropDownDetails.map((data) => {
      if (data.paymentType !== item.paymentType) {
        data.selected = false;
      }
    });
    this.selectedData = item.paymentType + item.balance;
  }
}
