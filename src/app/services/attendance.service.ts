import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ResponseDTO } from "../models/response-dto";
import { ApiEndPointEnum } from "../enums/api-endpiont.enum";
import { Observable } from "rxjs";
import { IRequestOptions } from "../core/http/restful.service";
import { DateRange } from '../models/date-range';
import { ExportTypeEnum } from '../enums/export-type.enum';
import { QrCodeAttendant } from '../models/qr-code-attendant';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private http: HttpClient,
  ) { }

  list(option?: IRequestOptions): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(ApiEndPointEnum.ATTENDANCE, option);
  }

  getAttendantsAsCalendar(dateRange: DateRange, params: HttpParams = new HttpParams()): Observable<ResponseDTO> {
    params = params
      .set('fromDate', dateRange.fromDate.toISOString())
      .set('toDate', dateRange.toDate.toISOString())
    return this.http.get<ResponseDTO>(ApiEndPointEnum.ATTENDANT_AS_CALENDAR, { params });
  }

  export(type: ExportTypeEnum, dateRange: DateRange, params: HttpParams = new HttpParams()): Observable<Blob> {
    params = params
      .set('type', type)
      .set('fromDate', dateRange.fromDate.toISOString())
      .set('toDate', dateRange.toDate.toISOString())
    return this.http.get(ApiEndPointEnum.ATTENDANT_EXPORT, { params, responseType: 'blob' });
  }

  checkIn(): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(ApiEndPointEnum.CHECK_IN, {});
  }

  checkOut(): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(ApiEndPointEnum.CHECK_OUT, {});
  }

  generateQrCode(payload: QrCodeAttendant) {
    return this.http.post(ApiEndPointEnum.QR_CODE_ATTENDENT, payload, { responseType: 'arraybuffer' });
  }

}
