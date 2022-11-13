import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';
import { DateRange } from '../models/date-range';
import { ResponseDTO } from '../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  getEvents(dateRange: DateRange, params: HttpParams = new HttpParams()) {
    params = params.set('fromDate', dateRange.fromDate.toISOString()).set('toDate', dateRange.toDate.toISOString());
    return this.http.get<ResponseDTO>(ApiEndPointEnum.CALENDAR, { params });
  }

}
