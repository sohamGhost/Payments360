import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ApiService } from 'src/app/service/api.service';
import { ButtonType } from 'src/app/common/constant/constant';
import { Router } from '@angular/router';
import { RoutingLinks } from 'src/app/screen-name';
import Utils from 'src/assets/utilities/util';
import { IAccountType, IBillType } from 'src/app/common/interface/interface';
@Component({
  selector: 'app-setup-payment',
  templateUrl: './setup-payment.component.html',
  styleUrls: ['./setup-payment.component.scss']
})
export class SetupPaymentComponent implements OnInit {
  displayStyle = 'none';
acountType: IAccountType[];
bill: IBillType;
header: any={};
literal:any={};
util: Utils;
data:any={};
model: any={};
selectedData: any;
mobile: string;
isOpen = false;
buttonType = ButtonType;
route = RoutingLinks;
checkbox1=false;
checkbox2=false;
checkbox3=false;
isDropdownOpen = false;
public dropDownDetails: Array<any> = [];
public isButtonDisabled: boolean = true;

  constructor(
    private _api: ApiService,
    private _data: DataService,
    private _router: Router,
  ) {


  }

  ngOnInit(): void {
   this._api
   .getUserData()
   .subscribe((data:any)=>{
     this.data=data;
     this.dropDownDetails = data.dropDownDetails;
     this.dropDownDetails.map((data) => {
      if (data.selected === true) {
        this.selectedData = data.paymentType + " " + data.balance;
        // console.log(this.selectedData);
      }
    });
   });

   this._api
   .getUserHeaderData()
   .subscribe((data:any)=>{
     this.header=data;
   });

   this._api
   .getUserLiteralData()
   .subscribe((data:any)=>{
     this.literal=data;
   });

  }

  public onDropDownClick(item): void {
    item.selected = true;
    this.dropDownDetails.map((data) => {
      if (data.paymentType !== item.paymentType) {
        data.selected = false;
      }
    });
    this.selectedData = item.paymentType+ "  " + item.balance;
    console.log(this.selectedData);
  }

  public openPopup(): void {
    this.displayStyle = 'block';
  }

  public closePopup(): void {
    this.displayStyle = 'none';
  }

  public getMobile(): string {
    return Utils.getMobile(this.data.mobile);
  }

  public cancelSelection(): void {
    this.checkbox1 = false;
    this.checkbox2 = false;
    this.checkbox3 = false;
    this.isButtonDisabled = true;
  }
  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }

  }

