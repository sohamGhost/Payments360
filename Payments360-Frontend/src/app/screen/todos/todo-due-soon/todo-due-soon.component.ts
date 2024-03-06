import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { SelectedItemsService } from 'src/app/service/selected-items.service';
import { environment } from 'src/environments/environment';
import { IPayments } from 'src/app/common/interface/interface';
import { delay } from 'rxjs';

@Component({
  selector: 'app-todo-due-soon',
  templateUrl: './todo-due-soon.component.html',
  styleUrls: ['./todo-due-soon.component.scss']
})
export class TodoDueSoonComponent implements OnInit {

  // apply input() if you are taking billsList from any parent
  // @Input() todoBillsList: any[];
  @Input() showButtons: boolean = false;
  selectedItem: any;
  userLogo: String = environment.imagePath;
  literal: any = {};
  route = RoutingLinks;
  paymentMode: string;
  public todoBillsList: Array<any> = [];
  public todoList: Array<IPayments> = [];
  public todoNewList: IPayments[]= [];
  item: {};
  
  // selectedItems: Array<any> = []

  constructor(
    private _api: ApiService,
    private _data: DataService,
    private _router: Router,
    private selectedItemsService: SelectedItemsService
  ) {

    // this.fetchTodoData();
    this.item = {};
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

  async fetchTodoData() {
    await this._api.getTodoData().subscribe((data: any) => {
      this.todoBillsList = data.todoSummmary.billPay;
      this.todoBillsList.forEach(item => item.userLogo = this.userLogo + item.userLogo);
    });

    //userlogo currently fetched from local list object in json
    //delay and userLogo setup must be removed when its fetched from the backend
    await this._api.getBackendTodoData().pipe(delay(300)).subscribe((data: IPayments[]) => {
        this.todoNewList = data;
        this.todoNewList.forEach((item, index) => {
            item.userLogo = this.todoBillsList[index].userLogo;
        });
        this.todoNewList.forEach(item => {
            this.todoList.push(item);
        });
      console.log(this.todoList);
    });
  }

  onSelectionChange(item): void {
     item.isSelected = !item.isSelected;
    this.selectedItemsService.updateSelectedItemsDueSoon(item);

  }

}
