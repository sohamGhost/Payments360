import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import util from '../../../../assets/utilities/util';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  override transform(value: any, args?: any): any {
    let myDate = super.transform(value, 'MMMM d');
    return myDate?.split(' ')[0] + ' ' + util.getDate(myDate?.split(' ')[1]);
  }
}
