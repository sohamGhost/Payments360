import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonType } from 'src/app/common/constant/constant';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-split-payment',
  templateUrl: './split-payment.component.html',
  styleUrls: ['./split-payment.component.scss']
})
export class SplitPaymentComponent implements OnInit {

  route = RoutingLinks;
  header: any = {};
  literal: any = {};
  userLogo: string = environment.imagePath;
  subUserLogo: string = environment.imagePath;
  zelleImage: string = environment.imagePath;
  item:any;
  billClicked=false;
  selectedItem: any;
  public suggestedRecipientsList: Array <any> = [];
  buttonType=ButtonType;


  constructor(
    private _router: Router,
    private _api: ApiService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._api
    .getAmountToSplitHeaderData()
    .subscribe((data: any) => {
      this.header = data
    });

    this._api.getSplitData()
    .subscribe((data: any) => {
    
      this.zelleImage = this.zelleImage + data.zelleImage;
      this.suggestedRecipientsList = data.suggestedRecipientsList;
      this.suggestedRecipientsList.forEach(item => item.userLogo = this.userLogo + item.userLogo);
      console.log(this.suggestedRecipientsList);
    });

    this._api.getAmountToSplitLiteralData()
    .subscribe((data: any) => {
      this.literal = data;
    });

    this._route.queryParams.subscribe(params => {
     this.item=JSON.parse(params['item']);
      
    })
  }

  public onSubmit(routerLink): void{
    this._router.navigate([routerLink]);
  }

  onSelectionChange(item): void {
    
   // const selectedItems = this.todoBillsList.filter((item) => item.isSelected);
   // this.selectedItemsService.updateSelectedItemsDueSoon(selectedItems);
   // console.log(this.selectedItems);
 }

 onBillClicked():void{
  this.billClicked=!this.billClicked
 }
}