import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss']
})
export class RecentActivityComponent implements OnInit {
  userLogo: string = environment.imagePath;
  header: any = {}
  literal: any = {}
  showButtons = false;
  filterButton = false;
  public activeTab: number = 2;
  route = RoutingLinks;
  public billerAmount: number = 0;
  public recentActivityList: Array<any> = [];
  searchTerm: string = '';
  filteredItems: Array<any>;

  constructor(
    private _api: ApiService,
    private _router: Router,
    private _route: ActivatedRoute,
    private meta: Meta
  ) {

    this._api.getRecentActivityHeaderData()
      .subscribe((data: any) => {
        this.header = data;
      });

      this._api.getDashboardLiteralData()
      .subscribe((data: any) => {
        this.literal = data;
      });
      this.meta
      .addTag({ name: 'recentactivity', content: 'This is the recent activity component which display  the recent activity data' });
  }

  ngOnInit(): void {
    this.fetchRecentActivityData();
    this.filteredItems = [...this.recentActivityList];
  }


  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }

  public fetchRecentActivityData(): void {
    this._api.getRecentActivityData()
      .subscribe((data: any) => {
        this.recentActivityList = data.payments;
        console.log(this.recentActivityList);
        this.recentActivityList.forEach(
          item => item.userLogo = this.userLogo + item.userLogo);

        this.recentActivityList.forEach((item) => {
          this.billerAmount += item.amount;
          this.billerAmount = parseFloat(this.billerAmount.toFixed(2));
        });
      });
  }


  public selectTab(tab: number) {
    this.activeTab = tab;
  }

  onSearchValueChanged(): void {
    if (!this.searchTerm) {
      this.filteredItems = [...this.recentActivityList];
    } else {
      this.filteredItems = this.recentActivityList.filter(item =>
        item.recipientName.toLowerCase().startsWith(this.searchTerm.toLowerCase())
      );
    }
  }


  toggleFilterButton(): void {
    this.filterButton = !this.filterButton;
  }


  sortByName() {
    this.recentActivityList.sort((a, b) => a.recipientName.localeCompare(b.recipientName));
  }

  sortByAmount() {
    this.recentActivityList.sort((a, b) => a.transactionAmount - b.transactionAmount);
  }

  sortByDate() {
    this.recentActivityList.sort((a, b) => new Date(a.paymentDate).getTime() - new Date(b.paymentDate).getTime());
  }
  

  public onItemClick(item: any){
    console.log('Clicked item', item);

    this._router.navigate(['/splitpayment'], {
      queryParams: {
        item: JSON.stringify(item)
      }
    });
  }

}

