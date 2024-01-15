  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { ButtonType } from 'src/app/common/constant/constant';
  import { RoutingLinks } from 'src/app/screen-name';
  import { ApiService } from 'src/app/service/api.service';
  import { DataService } from 'src/app/service/data.service';
  import { IAccount, IApiData } from 'src/app/common/interface/interface';

  @Component({
    selector: 'app-select-primary-account',
    templateUrl: './select-primary-account.component.html',
    styleUrls: ['./select-primary-account.component.scss']
  })
  export class SelectPrimaryAccountComponent implements OnInit {
    buttonType = ButtonType;
    route = RoutingLinks;
    header: any = {};
    literal: any = {};
    data: IApiData = null;
    public accountList: Array<any> = [];

    constructor(
      private _api: ApiService,
      private _data: DataService,
      private _router: Router

    ) {
    }

    ngOnInit(): void {
      this._api
      .getZelleOnboardingHeaderData()
      .subscribe((data: any) => {
        this.header = data;
      });

      this._api
      .getUserData()
      .subscribe((data: IApiData) => {
        this.data=data;
      this.accountList = data.accounts;
      console.log(this.data);
      });

      this._api
      .getZelleOnboardingLiteralData()
      .subscribe((data: any) => {
        this.literal = data;
      });
    }

    public onSubmit(routerLink): void {
      this._router.navigate([routerLink]);
    }

  }
