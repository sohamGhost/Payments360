import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonType } from 'src/app/common/constant/constant';
import { RoutingLinks } from 'src/app/screen-name';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
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
  otherData: any[] = [];
  public activeTab: number = 2;
  public todoBillsList: Array<any> = [];
  //public todoZelleBillsList: Array<any> = [];

  constructor(
    private _api: ApiService,
    private _data: DataService,
    private _router: Router

  ) {

    this.fetchTodoData();

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
  }


  ngOnInit(): void {
  }

  public onSubmit(routerLink): void {
    this._router.navigate([routerLink]);
  }

  private fetchTodoData(): void {
    this._api.getTodoData().subscribe((data: any) => {
      this.todoBillsList = data.todoSummmary.billPay;
      // this.todoZelleBillsList = data.todoSummmary.zelleBills;
      this.todoBillsList.forEach(item => item.userLogo = this.userLogo + item.userLogo);
      // this.todoZelleBillsList.forEach(item => item.userLogo = this.userLogo + item.userLogo);
      console.log(this.todoBillsList);
      // console.log(this.todoZelleBillsList);
    });
  }

  public selectTab(tab: number) {
    this.activeTab = tab;
  }

}
