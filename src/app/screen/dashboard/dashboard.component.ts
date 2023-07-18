import { Component, Input, OnInit } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { find } from 'rxjs';
import { ButtonType } from 'src/app/common/constant/constant';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { SelectedBillerService } from 'src/app/service/selected-biller.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  buttonType = ButtonType;
  route = RoutingLinks;
  paymentMode: string;
  header: any = {};
  literal: any = {};
  userLogo: string = environment.imagePath;
  searchLogo: string = environment.imagePath;
  public activeTab: number = 2;
  public favouritesList: Array<any> = [];
  public selectedBillerDetails: Array<any> = [];
  public todoListLength: number;
  public billerAmount: number = 0;
  //public billerList: Array<any> = [];
  //billAmt: number;
  //@Input() todoListLength: number;
  supportedLanguages = ['en-US', 'es'];

  constructor(
    private _api: ApiService,
    private _data: DataService,
    private _router: Router,
    public selectedBillerService: SelectedBillerService,
    private translateService: TranslateService
  ) {

    this.translateService.addLangs(this.supportedLanguages);
    this.translateService.setDefaultLang('en-US');

    const browserlang = this.translateService.getBrowserLang();
    this.translateService.use(browserlang);

  }

  ngOnInit(): void {
    this._api
    .getTodoData()
    .pipe(find(e => e !== undefined)).subscribe((data: any) => {
      this.todoListLength = data.todoSummmary.billPay.length;
    });
    //console.log(this.todoListLength);

    this.selectedBillerDetails = this.selectedBillerService.selectedBillerDetails;
    console.log(this.selectedBillerDetails);

    this.selectedBillerDetails.forEach((item) => {
      this.billerAmount += item.billerAmount;
      this.billerAmount = parseFloat(this.billerAmount.toFixed(2));
    });
    console.log(this.billerAmount);

    this._api
    .getDashboardHeaderData()
    .subscribe((data: any) => {
      this.header = data;
    });

    this._api.getSpanishLiteralData()
    .subscribe((data: any) => {
      this.literal = data;
    });

  this.fetchFavouritesList();
  }


  private fetchFavouritesList(): void {
    this._api
      .getDashboardData()
      .subscribe((data: any) => {
        this.favouritesList = data.favourites;
        this.favouritesList.forEach(item => item.userLogo = this.userLogo + item.userLogo);
        this.searchLogo = this.searchLogo + data.searchImg;
        //this.billAmt = data.billAmount;
      });
  }

  // private fetchAddBillsList(): void {
  //   this._api
  //   .getOnboardingData()
  //   .subscribe((data: any) => {
  //     this.billerList = data.onboardingAddBills.bills;
  //     this.billerList.forEach(item => item.userLogo = this.userLogo + item.userLogo);
  //   });
  // }

  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }

  public onClick(route: string, paymentMode: string): void{
    this._router.navigate([route,paymentMode]);
  }

  public selectTab(tab: number) {
    this.activeTab = tab;
  }

}
