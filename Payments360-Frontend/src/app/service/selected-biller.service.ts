import { Injectable } from '@angular/core';

@Injectable()
export class SelectedBillerService {
  selectedBillerDetails: Array<any> = [];

  constructor() { }

  public addSelectedBiller(item: any): void {
    this.selectedBillerDetails = [...this.selectedBillerDetails, item];
  }

  public removeSelectedBiller(item: any): void {
    this.selectedBillerDetails = this.selectedBillerDetails.filter((selectedItem) => selectedItem !== item);
  }

  public clearSelectedBillers(): void {
    this.selectedBillerDetails = [];
  }

  public getMergedSelectedBillers(): Array<any> {
    return this.selectedBillerDetails;
  }
}
