import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DateFormatService {

    constructor(private datePipe: DatePipe) {}

    format(date: Date, format: string = 'yyyy-MM-dd'): string | null {
        return this.datePipe.transform(date, format);
    }

}
