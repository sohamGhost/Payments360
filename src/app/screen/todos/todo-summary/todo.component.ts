import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonType } from 'src/app/common/constant/constant';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { SelectedItemsService } from 'src/app/service/selected-items.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  buttonType = ButtonType;
  route = RoutingLinks;
  userLogo: String = environment.imagePath;
  header: any = {};
  literal: any = {};
  todoDueCount: number;
  otherData: any[] = [];
  public activeTab: number = 2;
  public todoBillsList: Array<any> = [];

  selectedItems: any[] = [];
  // selectedItemsDueSoon: any[] = [];
  // selectedItemsUpcoming: any[] = [];

  showButtons = false;



  constructor(
    private _api: ApiService,
    private _data: DataService,
    private _router: Router,
    public selectedItemsService: SelectedItemsService
  ) {

    // this.fetchTodoData();

    
  }


  ngOnInit(): void {
    this._api
      .getTodoHeaderData()
      .subscribe((data: any) => {
        this.header = data;
      });

    this._api
      .getTodoLiteralData()
      .subscribe((data: any) => {
        this.literal = data;
      });

     this.fetchTodoData();

    //  this.selectedItemsService.selectedItemsDueSoon$.subscribe((items) => {
    //     this.selectedItemsDueSoon = items  ;
    //     this.selectedItems = [...this.selectedItemsDueSoon, ...this.selectedItemsUpcoming];
    //     console.log(this.selectedItems);
    //  });

    //  this.selectedItemsService.selectedItemsUpcoming$.subscribe((items) => {
    //   this.selectedItemsUpcoming = items;
    //   this.selectedItems = [...this.selectedItemsDueSoon, ...this.selectedItemsUpcoming];
    //   console.log(this.selectedItems);
    //  });

    this.selectedItemsService.selectedItems$.subscribe((item) => {
      this.selectedItems = item;
      console.log(this.selectedItems);
    });


    }

  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
    this.showButtons = true;
  }


  private fetchTodoData(): void {
    this._api.getTodoData().subscribe((data: any) => {
      this.todoBillsList = data.todoSummmary.billPay;
      // this.todoBillsList.forEach(item => item.userLogo = this.userLogo + item.userLogo);
      this.todoDueCount =  this.todoBillsList.filter(item => !item.todoDue).length;
      console.log(this.todoBillsList);
    });
  }

  public selectTab(tab: number) {
    this.activeTab = tab;
  }

  toggleRadioButtons(): void {
    this.showButtons = !this.showButtons;
  }


}
// onItemSelect(item: any) {
//   const index = this.selectedItems.indexOf(item);

//   if (index > -1) {
  //     // Item already selected, remove it
  //     this.selectedItems.splice(index, 1);
  //   } else {
    //     // Item not selected, add it
    //     this.selectedItems.push(item);
    //   }
    // }

// onPayTodosClick(): void {
  //   // Add the logic to handle the selection of todos and adding them to a list
    //   if (this.selectedItems) {
    //     // Add the selected todo to the list
    //     // Example code: this.selectedItemsList.push(this.selectedItem);
    //     // console.log('Selected Item:', this.selectedItems);
    //   }
    // }
