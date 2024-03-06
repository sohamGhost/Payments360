import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ButtonType } from 'src/app/common/constant/constant';

import { RoutingLinks } from 'src/app/screen-name';

import { ApiService } from 'src/app/service/api.service';

import { environment } from 'src/environments/environment';




@Component({

  selector: 'app-success-screen',

  templateUrl: './success-screen.component.html',

  styleUrls: ['./success-screen.component.scss']

})

export class SuccessScreenComponent implements OnInit {




  buttonType = ButtonType;




  userLogo: string = environment.imagePath;

  header: any = {};

  literal: any = {};

  data:any={};

  route = RoutingLinks;

 





  constructor(

    private _api: ApiService,

    private _router: Router

  ) {




    this._api

      .getSuccessScreenData()

      .subscribe((data: any) => {

        this.data = data;

         data.userLogo = this.userLogo + data.userLogo;

        console.log(this.data);

      });




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