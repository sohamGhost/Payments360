import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonType } from 'src/app/common/constant/constant';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-split-review',
  templateUrl: './split-review.component.html',
  styleUrls: ['./split-review.component.scss']
})
export class SplitReviewComponent implements OnInit {

  buttonType = ButtonType;
  route = RoutingLinks;
  userLogo: string = environment.imagePath;
  zelleImage: string = environment.imagePath;
  literal: any = {}
  header:any={}
  public transactionAmount: number;
  public splitAmount: number;
  public totalRecipient: number;
  public recipientNumber:number;
  public phoneNumber: number;
  public suggestedRecipientsList: Array <any> = [];

  constructor(
    private _api: ApiService,
    private _router: Router,
  ) {
    this._api.getAmountToSplitLiteralData ()
      .subscribe((data: any) => {
        this.literal = data;
      });

      this._api.getAmountToSplitHeaderData()
      .subscribe((data:any)=>{
        this.header=data;
      })

  }

  ngOnInit(): void {
    this.fetchSplitReviewData();
  }

  public fetchSplitReviewData(): void {
    this._api.getSplitData()
      .subscribe((data: any) => {
        this.transactionAmount = data.transactionAmount;
        this.totalRecipient = data.suggestedRecipientsList.length;
        this.splitAmount = this.transactionAmount / (this.totalRecipient);
        this.recipientNumber=this.totalRecipient/2;
        this.zelleImage = this.zelleImage + data.zelleImage;
        this.suggestedRecipientsList = data.suggestedRecipientsList;
        console.log(this.suggestedRecipientsList);
        this.suggestedRecipientsList.forEach(item => item.userLogo = this.userLogo + item.userLogo);
      });
  }

  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }

}

