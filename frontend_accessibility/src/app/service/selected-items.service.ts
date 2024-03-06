import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()

export class SelectedItemsService {
  private selectItemListDueSoon: Array<any> = [];
  private selectedItemListUpcoming: Array<any> = [];
  private selectedItemList: Array<any> = [];

  private selectedItemsDueSoon: Subject<any[]> = new Subject<any[]>();
  private selectedItemsUpcoming: Subject<any[]> = new Subject<any[]>();
  private selectedItems: Subject<any[]> = new Subject<any[]>();

  selectedItemsDueSoon$: Observable<any[]> = this.selectedItemsDueSoon.asObservable();
  selectedItemsUpcoming$: Observable<any[]> = this.selectedItemsUpcoming.asObservable();
  selectedItems$: Observable<any[]> = this.selectedItems.asObservable();

  public updateSelectedItemsDueSoon(item: any): void {
    if(item.isSelected){
      this.selectItemListDueSoon.push(item);
      this.selectedItemList.push(item);
    }
    else{
      this.selectItemListDueSoon = this.selectItemListDueSoon.filter((e) => e.recipient !== item.recipient);
      this.selectedItemList = this.selectedItemList.filter((e) => e.recipient !== item.recipient);
    }
    this.selectedItemsDueSoon.next(this.selectItemListDueSoon);
    this.selectedItems.next(this.selectedItemList);
  }


  public updateSelectedItemsUpcoming(item: any): void {
    if(item.isSelected){
      this.selectedItemListUpcoming.push(item);
      this.selectedItemList.push(item);
    }
    else{
      this.selectedItemListUpcoming = this.selectedItemListUpcoming.filter((e) => e.recipient !== item.recipient);
      this.selectedItemList = this.selectedItemList.filter((e) => e.recipient !== item.recipient);
    }
    this.selectedItemsUpcoming.next(this.selectedItemListUpcoming);
    this.selectedItems.next(this.selectedItemList);
  }

  public setSelectedItems(items: any[]): void {
    this.selectItemListDueSoon = items;
    this.selectedItemListUpcoming = items;
    this.selectedItemList = items;
    this.selectedItemsDueSoon.next(this.selectItemListDueSoon);
    this.selectedItemsUpcoming.next(this.selectedItemListUpcoming);
    this.selectedItems.next(this.selectedItemList);
  }

}
