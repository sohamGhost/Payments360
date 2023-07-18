import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonType } from 'src/app/common/constant/constant';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-zellesetup-payment',
  templateUrl: './zellesetup-payment.component.html',
  styleUrls: ['./zellesetup-payment.component.scss']
})
export class ZellesetupPaymentComponent implements OnInit {
  buttonType = ButtonType;
  route = RoutingLinks;
  header: any = {};
  literal: any = {};
  public accountList: Array<any> = [];

  constructor(
    private _api: ApiService,
    private _data: DataService,
    private _router: Router
  ) { 
    this._api
    .getZelleSetuppaymentHeaderData()
    .subscribe((data: any) => {
      this.header = data;
    });

    this._api
    .getZelleSetuppaymentData()
    .subscribe((data: any) => {
      this.accountList = data.accountSelection.primaryAccountList;
    });

    this._api
    .getZelleSetuppaymentLiteralData()
    .subscribe((data: any) => {
      this.literal = data;
    });
  }

  ngOnInit(): void {
  }
 
  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }
}
