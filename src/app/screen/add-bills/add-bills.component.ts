import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { ApiService } from 'src/app/service/api.service';
import { BillType, ButtonType } from 'src/app/common/constant/constant';

import { DataService } from 'src/app/service/data.service';
import { IBillType } from 'src/app/common/interface/interface';
import { RoutingLinks } from 'src/app/screen-name';
import { environment } from 'src/environments/environment';
import { SelectedBillerService } from 'src/app/service/selected-biller.service';
import { HttpClient } from '@angular/common/http';

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
  selectedItems: any[] = [];

  //disableButton = true;

  constructor(
    private _api: ApiService,
    private _data: DataService,
    private _router: Router,
    public selectedBillerService: SelectedBillerService,
    private router: ActivatedRoute,
    private http: HttpClient
  ) {
    this.fetchMoreRecipientList();

  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(queryParams => {
      if (queryParams['selectedItems']) {
        const selectedItems = JSON.parse(queryParams['selectedItems']);
        this.selectedItems = selectedItems;
        console.log(this.selectedItems);
        // Update the bills array with selectedItems
        this.updateBillsWithSelectedItems().then(() => {
          this.fetchRecipientList(); // Fetch the updated recipientList
        });
      } else {
        this.fetchRecipientList(); // Fetch the recipientList when there are no selectedItems
      }
    });

    
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
  }

  public async updateBillsWithSelectedItems(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._api.getOnboardingData().subscribe((data: any) => {
        const onboardingData = data;
        const selectedBills = onboardingData.onboardingAddBills.bills;

        // Loop through the selectedItems and add/update them in the bills array
        this.selectedItems.forEach((selectedItem) => {
          const existingBill = selectedBills.find((bill) => bill.recipient === selectedItem.recipient);
          if (existingBill) {
            // If the bill already exists, update the isSelected property
            existingBill.isSelected = true;
          } else {
            // If the bill doesn't exist, add it to the bills array
            selectedBills.push({
              recipient: selectedItem.recipient,
              userLogo: selectedItem.userLogo.split("/").pop(),
              billerAmount: selectedItem.billerAmount,
              isSelected: false
            });
          }
        });

        // Save the updated data
        this.http.put('http://localhost:3000/onboarding', onboardingData).subscribe(() => {
          console.log('Data saved successfully!');
          // Perform any other actions after saving the data
          resolve();
        }, (error) => {
          console.error('Error saving data:', error);
          reject();
        });
      });
    });
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
    if (this.activeTab === 1) {
      if (item.isSelected) {
        this.selectedBillerService.addSelectedBiller(item);
        this.selectedBillerDetails = [...this.selectedBillerDetails, item];
        item.timestamp = new Date().getTime();
      } else {
        this.selectedBillerService.removeSelectedBiller(item);
        this.selectedBillerDetails = this.selectedBillerDetails.filter((selectedItem) => selectedItem !== item);
      }
    } else if (this.activeTab === 2) {
      if (item.isSelected) {
        this.selectedBillerService.addSelectedBiller(item);
        this.selectedMoreBillerDetails = [...this.selectedMoreBillerDetails, item];
        item.timestamp = new Date().getTime();
      } else {
        this.selectedBillerService.removeSelectedBiller(item);
        this.selectedMoreBillerDetails = this.selectedMoreBillerDetails.filter((selectedItem) => selectedItem !== item);
      }
    }

    this.isButtonDisabled = this.selectedBillerDetails.length === 0 && this.selectedMoreBillerDetails.length === 0;
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

  public fetchRecipientList(): void {
    this._api.getOnboardingData().subscribe((data: any) => {
      this.recipientList = data.onboardingAddBills.bills;
      console.log(this.recipientList);
      this.recipientList.forEach(item => item.userLogo = this.userLogo + item.userLogo);

      // Add the logic to update the selectedBillerDetails array based on the recipientList
      this.selectedBillerDetails = this.recipientList.filter(item => item.isSelected);

      // Update the button disabled state based on the selected billers
      this.isButtonDisabled = this.selectedBillerDetails.length === 0 && this.selectedMoreBillerDetails.length === 0;
    });
  }

  public fetchMoreRecipientList(): void {
    this._api.getOnboardingData().subscribe((data: any) => {
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
