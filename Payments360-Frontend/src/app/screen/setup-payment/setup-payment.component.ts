import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ApiService } from 'src/app/service/api.service';
import { ButtonType } from 'src/app/common/constant/constant';
import { Router } from '@angular/router';
import { RoutingLinks } from 'src/app/screen-name';
import Utils from 'src/assets/utilities/util';
import { IAccountType, IApiData, IBillType } from 'src/app/common/interface/interface';

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
literal2:any={};
util: Utils;
data:IApiData=null;
model: any={};
selectedData: string;
mobile: string;
isOpen = false;
buttonType = ButtonType;
route = RoutingLinks;
checkbox1=false;
checkbox2=false;
checkbox3=false;
isDropdownOpen = false;
public accountDetails: Array<any> = [];
public isButtonDisabled: boolean = true;

  constructor(
    private _api: ApiService,
    private _data: DataService,
    private _router: Router,
  ) {


  }

  ngOnInit(): void {
    this._api.getUserDataZelleHelp().subscribe((data:any)=>{
      this.literal2 = data;
      console.log(this.literal2);
    });


   this._api
   .getUserData()
   .subscribe((data:IApiData)=>{
     this.data=data;
     this.accountDetails = data.accounts.filter(data => data.accountStatus === "ACTIVE");
     this.accountDetails.map((data) => {
      if (data.preferred === "Y") {
        this.selectedData = data.accountNickname + "  *("+ data.accountNumber.slice(data.accountNumber.length-4) + ")  $" + data.availableBalance;
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
    item.preferred = "Y";
    this.accountDetails.map((data) => {
      if (data.accountNickname !== item.accountNickname) {
        data.preferred = "N";
      }
    });
    this.selectedData = item.accountNickname + "  *("+ item.accountNumber.slice(item.accountNumber.length-4) + ")  $" + item.availableBalance;
    console.log(this.selectedData);
  }

  public openPopup(): void {
    this.displayStyle = 'block';
  }

  public closePopup(): void {
    this.displayStyle = 'none';
  }

  public getMobile(): string {
    return Utils.getMobile(parseInt(this.data.phone,10));
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

