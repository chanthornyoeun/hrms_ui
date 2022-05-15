import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from "@angular/common";
import { environment } from "../../../environments/environment";

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {
  }

  transform(date: Date | string): string | null {
    return this.datePipe.transform(date, environment.dateFormat);
  }

}
