import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ButtonType } from 'src/app/common/constant/constant';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-find-more-bills',
  templateUrl: './find-more-bills.component.html',
  styleUrls: ['./find-more-bills.component.scss']
})
export class FindMoreBillsComponent implements OnInit {


  checkbox1 = false;
  checkbox2 = false;
  route = RoutingLinks;
  buttonType = ButtonType;
  header: any = {};
  literal: any = {};

  public isButtonDisabled: boolean = true;

  constructor(
    private _router: Router,
    private _api: ApiService,
    private _data: DataService,


  ) {
   
  }

  ngOnInit(): void {
    this._api
    .getFindMoreBillsHeaderData()
    .subscribe((data: any) => {
      this.header = data;
    });
  this._api.getFindMoreBillsLiteralData()
    .subscribe((data: any) => {
      this.literal = data;
    });
  }


  onSubmit(routeLink: string): void {
    const queryParams = {
      checkbox1: this.checkbox1.toString(),
      checkbox2: this.checkbox2.toString()
    };
    this._router.navigate([routeLink], { queryParams });
  }



  public cancelSelection(): void {
    this.checkbox1 = false;
    this.checkbox2 = false;
    this.isButtonDisabled = true;
  }

  onCheckbox1Change(): void {
    // Toggle checkbox1 value
    this.checkbox1 = !this.checkbox1;
  }

  onCheckbox2Change(): void {
    // Toggle checkbox2 value
    this.checkbox2 = !this.checkbox2;
  }

}


