import { Injectable } from '@angular/core';
import { RestfulService } from "../core/http/restful.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiEndPointEnum } from "../enums/api-endpiont.enum";
import { Observable } from 'rxjs';
import { ResponseDTO } from '../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService extends RestfulService {

  constructor(http: HttpClient) {
    super(http);
  }

  getUrl(): string {
    return ApiEndPointEnum.LEAVE_REQUEST;
  }

  getTodayLeaves(params?: HttpParams): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(ApiEndPointEnum.TODAY_LEAVE, { params });
  }

  getPendingLeaves(params?: HttpParams): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(ApiEndPointEnum.PENDING_LEAVE, { params });
  }

  cancel(requestId: number, comment: string): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${ApiEndPointEnum.CANCEL_LEAVE_REQUEST}/${requestId}`, { comment });
  }

  calculateDays(payload: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(ApiEndPointEnum.CALCULATE_LEAVE_DAY, payload);
  }

  reject(requestId: number, comment: string): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${ApiEndPointEnum.REJECT_LEAVE_REQUEST}/${requestId}`, { comment });
  }

  approve(requestId: number, comment: string): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${ApiEndPointEnum.APPROVE_LEAVE_REQUEST}/${requestId}`, { comment });
  }

}
