import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonType } from 'src/app/common/constant/constant';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-general-onboarding-success',
  templateUrl: './general-onboarding-success.component.html',
  styleUrls: ['./general-onboarding-success.component.scss']
})
export class GeneralOnboardingSuccessComponent implements OnInit {


  buttonType = ButtonType;

  header: any = {};
  literal: any = {};

  route = RoutingLinks;


  constructor(
    private _api: ApiService,
    private _router: Router
  ) {

    this._api

      .getSuccessScreenHeaderData()
      .subscribe((data: any) => {
        this.header = data;

      });


    this._api
      .getSuccessScreenLiteralData()
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
