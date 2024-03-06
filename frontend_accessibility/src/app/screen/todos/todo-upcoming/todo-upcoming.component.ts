import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { SelectedItemsService } from 'src/app/service/selected-items.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-todo-upcoming',
  templateUrl: './todo-upcoming.component.html',
  styleUrls: ['./todo-upcoming.component.scss']
})
export class TodoUpcomingComponent implements OnInit {

  @Input() showButtons: boolean = false;
  selectedItem: any;
  userLogo: String = environment.imagePath;
  literal: any = {};
  paymentMode: string;
  route = RoutingLinks;
  public todoBillsList: Array<any> = [];
  //selectedItems: Array<any> = []


  constructor(
    private _api: ApiService,
    private _data: DataService,
    private _router: Router,
    private selectedItemsService: SelectedItemsService
  ) {

    //this.fetchTodoData();

    this._api
      .getTodoLiteralData()
      .subscribe((data: any) => {
        this.literal = data;
      });

  }

  ngOnInit(): void {
    this.fetchTodoData();
  }

  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
    this.showButtons = true;
  }
  public onSubmit2(route: string, paymentMode: string): void{
    this._router.navigate([route, paymentMode]);
  }

  public fetchTodoData(): void {
    this._api.getTodoData().subscribe((data: any) => {
      this.todoBillsList = data.todoSummmary.billPay;
      this.todoBillsList.forEach(item => item.userLogo = this.userLogo + item.userLogo);
      console.log(this.todoBillsList);
    });
  }

  onSelectionChange(item): void {
     item.isSelected = !item.isSelected;
    // const selectedItems = this.todoBillsList.filter((item) => item.isSelected);
    // this.selectedItemsService.updateSelectedItemsUpcoming(selectedItems);
    //console.log(this.selectedItems);
    this.selectedItemsService.updateSelectedItemsUpcoming(item);
  }
}
