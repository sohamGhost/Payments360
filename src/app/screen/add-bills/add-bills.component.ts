import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ApiService } from 'src/app/service/api.service';
import { BillType, ButtonType } from 'src/app/common/constant/constant';

import { DataService } from 'src/app/service/data.service';
import { IBillType } from 'src/app/common/interface/interface';
import { RoutingLinks } from 'src/app/screen-name';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-bills',
  templateUrl: './add-bills.component.html',
  styleUrls: ['./add-bills.component.scss']
})
export class AddBillsComponent implements OnInit {
  bill: any;
  buttonType = ButtonType;
  userLogo: string = environment.imagePath;
  header: any = {};
  literal: any = {};
  route = RoutingLinks;
  //selectedTab: string = 'tab1';
  otherData: any[] = [];
  public activeTab: number = 1;
  public isButtonDisabled: boolean = true;
  public selectedBillerDetails: Array<any> = [];
  public selectedMoreBillerDetails: Array<any> = [];
  public recipientList: Array<any> = [];
  public moreRecipientList: Array<any> = [];
  //disableButton = true;



  constructor(
    private _api: ApiService,
    private _data: DataService,
    private _router: Router
  ) {

    this.fetchRecipientList();
    this.fetchMoreRecipientList();

    this._api
      .getOnboardingHeaderData()
      .subscribe((data: any) => {
        this.header = data;
      });

    this._api
      .getOnboardingLiteralData()
      .subscribe((data: any) => {
        this.literal = data;
      });

    // this.selectedBillerDetails = this.recipientList.filter(item => {return item.isSelected});

  }
  ngOnInit(): void {

  }

  searchText: string = '';
  public onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue.trim();
  }

  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }

  public onSelectedItems(event: Event, item: any): void {
    event.stopPropagation();
    item.isSelected = !item.isSelected;
    if(this.activeTab === 1){
      if (item.isSelected) {
        this.selectedBillerDetails = [...this.selectedBillerDetails, item];
      } else {
        this.selectedBillerDetails = this.selectedBillerDetails.filter((selectedItem) => selectedItem !== item);
      }
      //this.selectedBillerDetails = this.recipientList.filter(item => { return item.isSelected });
    }
    else if(this.activeTab === 2) {
      if (item.isSelected) {
        this.selectedMoreBillerDetails = [...this.selectedMoreBillerDetails, item];
      } else {
        this.selectedMoreBillerDetails = this.selectedMoreBillerDetails.filter((selectedItem) => selectedItem !== item);
      }
      //this.selectedMoreBillerDetails = this.moreRecipientList.filter(item => { return item.isSelected });
    }

    this.isButtonDisabled = this.selectedBillerDetails.length === 0 && this.selectedMoreBillerDetails.length === 0;

    //this.isButtonDisabled = this.selectedBillerDetails.length === 0;
    //this.isButtonDisabled = this.selectedMoreBillerDetails.length === 0;
    //console.log(this.selectedBillerDetails);
  }

  public cancelSelection(): void {
    this.selectedBillerDetails = [];
    this.recipientList.forEach(item => item.isSelected = false );
    this.selectedMoreBillerDetails = [];
    this.moreRecipientList.forEach(item => item.isSelected = false);
    this.isButtonDisabled = true;
  }

  public selectTab(tab: number) {
    this.activeTab = tab;
    //Perform data population logic based on the selected tab
  }

  private fetchRecipientList(): void {
    this._api
      .getOnboardingData()
      .subscribe((data: any) => {
        //this.bill = data;
        this.recipientList = data.onboardingAddBills.bills;
        console.log(this.recipientList);
        this.recipientList.forEach(item => item.userLogo = this.userLogo + item.userLogo);
      });
  }

  private fetchMoreRecipientList(): void {
    this._api
      .getOnboardingData()
      .subscribe((data: any) => {
        this.moreRecipientList = data.onboardingAddBills.moreBills;
        console.log(this.moreRecipientList);
        this.moreRecipientList.forEach(item => item.userLogo = this.userLogo + item.userLogo);
      });
  }

  public clearSelectedData(): void {
    this.selectedBillerDetails = [];
    this.recipientList = [];
    this.fetchRecipientList();
    this.selectedMoreBillerDetails = [];
    this.moreRecipientList = [];
    this.fetchMoreRecipientList();
  }

}
