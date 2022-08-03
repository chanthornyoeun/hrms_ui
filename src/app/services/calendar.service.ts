import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';
import { DateRange } from '../models/date-range';
import { ResponseDTO } from '../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getEvents(dateRange: DateRange, params: HttpParams = new HttpParams()) {
    params = params.set('fromDate', this.formatDate(dateRange.fromDate)!).set('toDate', this.formatDate(dateRange.toDate)!);
    return this.http.get<ResponseDTO>(ApiEndPointEnum.CALENDAR, { params });
  }

  public formatDate(date: Date, format: string = 'yyyy-MM-dd') {
    return this.datePipe.transform(date, format);
  }
  
}
