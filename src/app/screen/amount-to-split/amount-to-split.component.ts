import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonType } from 'src/app/common/constant/constant';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-amount-to-split',
  templateUrl: './amount-to-split.component.html',
  styleUrls: ['./amount-to-split.component.scss']
})
export class AmountToSplitComponent implements OnInit {

  buttonType = ButtonType;
  route = RoutingLinks;
  userLogo: string = environment.imagePath;
  zelleImage: string = environment.imagePath;
  header: any = {}
  literal: any = {}
  public transactionAmount: number;
  public totalRecipient:number;
  public splitAmount:number;
  public amountToSplitList: Array<any> = [];

  constructor(
    private _api: ApiService,
    private _router: Router,
  ) {
    this._api.getAmountToSplitLiteralData()
      .subscribe((data: any) => {
        this.literal = data;
      });

    this._api.getAmountToSplitHeaderData()
      .subscribe((data: any) => {
        this.header = data;
      });
  }

  ngOnInit(): void {
    this.fetchAmountToSplitData();
  }

  public fetchAmountToSplitData(): void {
    this._api.getAmountToSplitData()
      .subscribe((data: any) => {
        this.amountToSplitList = data.recipients;
        this.zelleImage = this.zelleImage+data.zelleLogo; 
        this.totalRecipient=data.recipients.length-1;
        this.transactionAmount=data.transactionAmount
       this.splitAmount=this.transactionAmount/(this.totalRecipient+1);

       console.log("SPLIT AMOUNT:"+this.splitAmount);
        this.amountToSplitList.forEach(
          item => item.userLogo = this.userLogo + item.userLogo);
      });
  }


  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }
}
