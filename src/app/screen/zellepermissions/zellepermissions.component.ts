import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ButtonType } from 'src/app/common/constant/constant';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { IContents } from 'src/app/common/interface/interface';

@Component({
  selector: 'app-zellepermissions',
  templateUrl: './zellepermissions.component.html',
  styleUrls: ['./zellepermissions.component.scss']
})
export class ZellepermissionsComponent implements OnInit {
  header: any = [];
  literal: any = [];
  checkbox = false;
  buttonType = ButtonType;

  continueButtonDisabled: boolean = true;
  contentliteral1: IContents = null;
  contentliteral2: IContents = null;
  route = RoutingLinks;

  enableContinueButton(event: Event): void {

    this.continueButtonDisabled = !(event.target as HTMLInputElement).checked;
  }


  constructor(
    private _api: ApiService,
    private _data: DataService,
    private _router: Router,
  ) {
    this._api

      .getzellepermissionsheaderData()

      .subscribe((data: any) => {

        this.header = data;

      });

    this._api

      .getzellepermissionsliteralData()

      .subscribe((data: any) => {

        this.literal = data;

      });

      this._api.getPermissionsDataZelle().subscribe((data:IContents)=>{
        console.log(data);
        this.contentliteral1=data;
      });

      this._api.getZellePermissionsUserConsent().subscribe((data:IContents)=>{
        this.contentliteral2=data;
      })
  }

  ngOnInit(): void {
  }

  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }
}

