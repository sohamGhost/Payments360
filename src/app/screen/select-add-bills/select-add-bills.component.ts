import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillType, ButtonType } from 'src/app/common/constant/constant';
import { IBillType } from 'src/app/common/interface/interface';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-select-add-bills',
  templateUrl: './select-add-bills.component.html',
  styleUrls: ['./select-add-bills.component.scss']
})
export class SelectAddBillsComponent implements OnInit {

  userLogo: string = environment.imagePath;
  paymentType=BillType;
  bill:IBillType;
  route = RoutingLinks;
  buttonType = ButtonType;
  data: any = {};
  billerNetworkList: Array<any> = [];
  creditReportList: Array<any> = [];
  literal: any = {};
  header: any = {};
  checkbox1 = false;
  checkbox2 = false;
  checkbox3 = false;
  checkbox4 = false;
  public isButtonDisabled: boolean = true;
  public continueButtonDisabled: boolean = true;
  public selectedItems: any[] = [];

  //@Output() selectedItems: EventEmitter<any[]> = new EventEmitter<any[]>();

  enableContinueButton(event: Event): void {
    this.continueButtonDisabled = !(event.target as HTMLInputElement).checked;
  }

  constructor(
    private _router: Router,
    private _api: ApiService,
    private _data: DataService,
    private _route: ActivatedRoute) {
    //this._api.getSelectAddBillsData().subscribe((data: any) => { this.data = data });


  }

  ngOnInit(): void {
    this._api.getSelectAddBillsData()
      .subscribe((data: any) => {
        this.billerNetworkList = data.addBillsList.billerNetwork;
        this.creditReportList = data.addBillsList.creditReport;

        this.billerNetworkList.forEach(item => item.userLogo = this.userLogo + item.userLogo);
        this.creditReportList.forEach(item => item.userLogo = this.userLogo + item.userLogo);

        const queryParams = this._route.snapshot.queryParams;
        this['checkbox1'] = queryParams['checkbox1'] === 'true';
        this['checkbox2'] = queryParams['checkbox2'] === 'true';

        if (this['checkbox1'] && !this['checkbox2']) {
          this.creditReportList = [];
        } else if (!this['checkbox1'] && this['checkbox2']) {
          this.billerNetworkList = [];
        }
      });

      this._api.getSelectAddBillsLiteralData().subscribe((data: any) => { this.literal = data });

      this._api.getSelectAddBillsHeaderData().subscribe((data: any) => { this.header = data });
  }

  public addSelectedBills(): void {
    this.updateSelectedItems();

    const queryParams = {
      selectedItems: JSON.stringify(this.selectedItems)
    };
    console.log(this.selectedItems);
    this._router.navigate(['/addbills'], { queryParams: queryParams });
  }

  onCheckboxChange(): void {
    this.updateSelectedItems();
  }

  public updateSelectedItems(): void {
    this.selectedItems = [
      ...this.billerNetworkList.filter(item => item['isSelected']),
      ...this.creditReportList.filter(item => item['isSelected'])
    ];
  }

  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }


  public cancelSelection(): void {
    this.checkbox1 = true;
    this.checkbox2 = false;
    this.checkbox3 = false;
    this.isButtonDisabled = true;
  }

  // Continue(){
  //   this._router.navigate(['/sucessfailure']);
  // }

  public onSelectionChange(item: any) {
    item.isSelected = !item.isSelected;
  }
}
