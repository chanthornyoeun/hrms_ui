import { Injectable } from '@angular/core';
import { RestfulService } from "../core/http/restful.service";
import { HttpClient } from "@angular/common/http";
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

  cancel(requestId: number): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${ApiEndPointEnum.CANCEL_LEAVE_REQUEST}/${requestId}`, {});
  }

  calculateDays(payload: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(ApiEndPointEnum.CALCULATE_LEAVE_DAY, payload);
  }

}
