import { Pipe, PipeTransform } from '@angular/core';
import { environment } from "../../../environments/environment";
import { DatePipe } from "@angular/common";

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {
  }

  transform(date: Date | string): string | null {
    return this.datePipe.transform(date, environment.timeFormat);
  }

}
